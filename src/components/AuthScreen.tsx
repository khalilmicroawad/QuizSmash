import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Zap,
  Calendar,
  AlertCircle,
  User,
} from 'lucide-react';
import { supabase } from '../supabaseClient.js';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { CourseStage } from './CourseSelectionView';
import { OwnerNotificationService } from '../services/ownerNotificationService';

interface AuthScreenProps {
  onBackToCourses?: () => void;
  selectedCourse?: CourseStage | null;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onBackToCourses, selectedCourse }) => {
  const { isRTL } = useLanguage();
  const { dailyLoginExpiredNotice, dismissDailyNotice } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim() || !password) {
      setErrorMessage(
        isRTL ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter your email and password'
      );
      return;
    }

    if (mode === 'signup') {
      const trimmedFirst = firstName.trim();
      const trimmedLast = lastName.trim();

      // Mandatory validation
      if (!trimmedFirst) {
        setErrorMessage(
          isRTL
            ? 'الاسم الأول إجباري ويجب إدخاله بالأحرف الإنجليزية فقط'
            : 'First name is mandatory and must be in English letters only'
        );
        return;
      }

      if (!trimmedLast) {
        setErrorMessage(
          isRTL
            ? 'اسم العائلة إجباري ويجب إدخاله بالأحرف الإنجليزية فقط'
            : 'Last name is mandatory and must be in English letters only'
        );
        return;
      }

      // English letters only regex: only Latin A-Z, a-z, spaces, hyphens or apostrophes
      const englishLettersOnlyRegex = /^[A-Za-z]+(?:[' -][A-Za-z]+)*$/;

      if (!englishLettersOnlyRegex.test(trimmedFirst) || trimmedFirst.length < 2) {
        setErrorMessage(
          isRTL
            ? 'يجب أن يتكون الاسم الأول من أحرف إنجليزية فقط (A-Z) ولا يقل عن حرفين'
            : 'First name must contain English letters only (A-Z) and be at least 2 letters long'
        );
        return;
      }

      if (!englishLettersOnlyRegex.test(trimmedLast) || trimmedLast.length < 2) {
        setErrorMessage(
          isRTL
            ? 'يجب أن يتكون اسم العائلة من أحرف إنجليزية فقط (A-Z) ولا يقل عن حرفين'
            : 'Last name must contain English letters only (A-Z) and be at least 2 letters long'
        );
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage(
          isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match'
        );
        return;
      }
    }

    if (password.length < 6) {
      setErrorMessage(
        isRTL ? 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل' : 'Password must be at least 6 characters'
      );
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage(error.message);
        } else if (!data?.session) {
          setErrorMessage(
            isRTL
              ? 'تحقق من بريدك الإلكتروني وقم بتأكيد حسابك قبل تسجيل الدخول.'
              : 'Check your email and confirm your account before logging in.'
          );
        } else {
          // A real session exists after login
          if (dailyLoginExpiredNotice) {
            dismissDailyNotice();
          }
          if (window.location.pathname === '/login') {
            window.location.href = '/';
          }
        }
      } else {
        const formattedFirstName = firstName.trim();
        const formattedLastName = lastName.trim();
        const formattedFullName = `${formattedFirstName} ${formattedLastName}`;

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              first_name: formattedFirstName,
              last_name: formattedLastName,
              full_name: formattedFullName,
            },
          },
        });

        if (error) {
          setErrorMessage(error.message);
        } else {
          // Do NOT auto-login; ensure session is signed out if auto-created
          if (data?.session) {
            try {
              await supabase.auth.signOut();
            } catch {
              // Ignore
            }
          }

          // Switch to Sign In mode and keep/pre-fill the email used during signup
          const signedUpEmail = email.trim();

          // Notify owner Dr. Khalil Awad (dr.khalil.awad@gmail.com) of new registration
          const courseLabel = selectedCourse
            ? isRTL ? selectedCourse.nameAr : selectedCourse.nameEn
            : 'First Course (المرحلة الأولى - طب الأسنان)';

          OwnerNotificationService.notifyNewRegistration({
            email: signedUpEmail,
            fullName: formattedFullName,
            courseName: courseLabel,
            courseId: selectedCourse?.id || 'stage-1',
          }).catch((notifyErr) => {
            console.warn('Owner notification background task:', notifyErr);
          });

          setMode('signin');
          setEmail(signedUpEmail);
          setPassword('');
          setConfirmPassword('');
          setFirstName('');
          setLastName('');
          setSuccessMessage(
            isRTL
              ? 'تم إنشاء حسابك بنجاح. يرجى التحقق من بريدك الإلكتروني وتأكيد عنوانك قبل تسجيل الدخول.'
              : 'Your account has been created. Please check your email and verify your address before logging in.'
          );
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || (isRTL ? 'حدث خطأ، يرجى المحاولة ثانية' : 'An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">
      <div className="w-full max-w-md mx-auto bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative text-slate-900">
        {/* Daily Forced Re-login Notice */}
        {dailyLoginExpiredNotice && (
          <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs font-bold leading-relaxed flex items-start gap-2.5">
            <Calendar className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p>
                {isRTL
                  ? 'بدأ يوم جديد! يتطلب النظام تسجيل الدخول يومياً لتجديد جلستك وتتبع رصيد الاستخدام (100 تسجيل دخول).'
                  : 'A new day has started! Daily login is required to verify your 100-login subscription. Please sign in to continue.'}
              </p>
            </div>
          </div>
        )}

        {/* Selected Course Indicator & Back Button */}
        {onBackToCourses && (
          <div className="mb-4 flex items-center justify-between pb-3 border-b border-[#D9E2CE]">
            <button
              type="button"
              onClick={onBackToCourses}
              title={isRTL ? 'تغيير المرحلة الدراسية' : 'Change Course'}
              aria-label={isRTL ? 'تغيير المرحلة الدراسية' : 'Change Course'}
              className="w-8 h-8 rounded-lg bg-[#F2F5ED] text-[#4D5D28] hover:bg-[#E6ECDC] flex items-center justify-center cursor-pointer transition-colors"
            >
              {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            </button>

            {selectedCourse && (
              <span className="text-[11px] font-bold text-[#4D5D28] bg-[#F2F5ED] px-2.5 py-0.5 rounded-full border border-[#D9E2CE]">
                {isRTL ? selectedCourse.nameAr : selectedCourse.nameEn}
              </span>
            )}
          </div>
        )}

        {/* BRAND HEADER */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs mb-3 bg-white border border-[#D9E2CE] overflow-hidden">
            <img
              src="/assets/aistudio/icon_9d2c6e5c.png"
              alt="Quiz Smash Logo"
              className="w-14 h-14 object-contain"
            />
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {isRTL ? (
              <>كويز <span className="text-emerald-600">سماش</span></>
            ) : (
              <>Quiz <span className="text-emerald-600">Smash</span></>
            )}
          </h1>
          <p className="mt-1 text-xs text-[#556B2F] max-w-xs mx-auto">
            {isRTL
              ? 'سجّل الدخول للمتابعة إلى بنك أسئلة المرحلة الأولى'
              : 'Sign in to access your dental course questions'}
          </p>
        </div>

        {/* MODE SWITCHER TABS */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#F2F5ED] border border-[#D9E2CE] gap-1 my-5">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMessage('');
            }}
            title={isRTL ? 'تسجيل الدخول' : 'Sign In'}
            aria-label={isRTL ? 'تسجيل الدخول' : 'Sign In'}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'signin'
                ? 'btn-glossy-emerald text-white shadow-xs'
                : 'text-[#4D5D28] hover:text-[#283215] bg-transparent'
            }`}
          >
            {isRTL ? 'تسجيل الدخول' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            title={isRTL ? 'إنشاء حساب جديد' : 'Sign Up'}
            aria-label={isRTL ? 'إنشاء حساب جديد' : 'Sign Up'}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'btn-glossy-emerald text-white shadow-xs'
                : 'text-[#4D5D28] hover:text-[#283215] bg-transparent'
            }`}
          >
            {isRTL ? 'إنشاء حساب جديد' : 'Sign Up'}
          </button>
        </div>

        {/* LINE SEPARATING MODE SWITCHER FROM FORM */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* Clear Success Message above the form (e.g. after signup) */}
        {successMessage && (
          <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-xs sm:text-sm font-bold leading-relaxed flex items-center gap-3 shadow-xs">
            <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <p className="flex-1 text-left rtl:text-right">{successMessage}</p>
          </div>
        )}

        {/* SECTION 3: AUTH FORM */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {/* MANDATORY ENGLISH FIRST & LAST NAME ON SIGN UP */}
          {mode === 'signup' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-extrabold text-slate-700 text-left rtl:text-right">
                    {isRTL ? 'الاسم الأول:' : 'First Name:'}
                  </label>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                    {isRTL ? 'إنجليزي إجباري' : 'English Only'}
                  </span>
                </div>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value.replace(/[^a-zA-Z\s'-]/g, ''))}
                    placeholder="e.g. Ahmed"
                    className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 text-sm rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-orange-500 font-sans"
                  />
                </div>
                <p className="mt-1 text-[10px] text-slate-400 text-left rtl:text-right font-medium">
                  {isRTL ? 'أحرف إنجليزية فقط (A-Z)' : 'English letters only (A-Z)'}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-extrabold text-slate-700 text-left rtl:text-right">
                    {isRTL ? 'اسم العائلة:' : 'Last Name:'}
                  </label>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                    {isRTL ? 'إنجليزي إجباري' : 'English Only'}
                  </span>
                </div>
                <div className="relative">
                  <User className="w-4 h-4 text-sky-500 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z\s'-]/g, ''))}
                    placeholder="e.g. Ali"
                    className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
                <p className="mt-1 text-[10px] text-slate-400 text-left rtl:text-right font-medium">
                  {isRTL ? 'أحرف إنجليزية فقط (A-Z)' : 'English letters only (A-Z)'}
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 text-left rtl:text-right">
              {isRTL ? 'البريد الإلكتروني:' : 'Email Address:'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-emerald-500 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 text-xs rounded-xl border border-[#D9E2CE] bg-white text-slate-900 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 text-left rtl:text-right">
              {isRTL ? 'كلمة المرور:' : 'Password:'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-indigo-500 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 text-xs rounded-xl border border-[#D9E2CE] bg-white text-slate-900 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 text-left rtl:text-right">
                {isRTL ? 'تأكيد كلمة المرور:' : 'Confirm Password:'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-purple-500 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 text-xs rounded-xl border border-[#D9E2CE] bg-white text-slate-900 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* GLOSSY EMERALD SUBMIT BUTTON - ICON ONLY */}
          <button
            type="submit"
            disabled={loading}
            title={mode === 'signin' ? (isRTL ? 'تسجيل الدخول' : 'Sign In') : (isRTL ? 'إنشاء الحساب' : 'Sign Up')}
            aria-label={mode === 'signin' ? (isRTL ? 'تسجيل الدخول' : 'Sign In') : (isRTL ? 'إنشاء الحساب' : 'Sign Up')}
            className="w-full py-3.5 px-4 rounded-xl btn-glossy-emerald text-white font-bold flex items-center justify-center cursor-pointer shadow-md disabled:opacity-50 transition-transform active:scale-[0.99]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isRTL ? (
              <ArrowLeft className="w-6 h-6 stroke-[3]" />
            ) : (
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            )}
          </button>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
