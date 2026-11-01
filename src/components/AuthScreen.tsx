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

export const AuthScreen: React.FC = () => {
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

          // Switch to Sign In mode and pre-fill the email
          setMode('signin');
          setPassword('');
          setConfirmPassword('');
          setSuccessMessage(
            isRTL
              ? `تم إنشاء حسابك بنجاح (${formattedFullName}). يرجى التحقق من بريدك الإلكتروني وتأكيد عنوانك قبل تسجيل الدخول.`
              : `Your account has been created successfully (${formattedFullName}). Please check your email and verify your address before logging in.`
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

        {/* SECTION 1: BRAND HEADER */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl btn-glossy-orange flex items-center justify-center shadow-md mb-3 text-white">
            <Zap className="w-8 h-8 fill-white" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 text-xs font-black mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>{isRTL ? 'الخطوة 1: تسجيل الدخول أو حساب جديد' : 'Step 1: Sign In or Register Account'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isRTL ? (
              <>كويز <span className="text-orange-500">سماش</span></>
            ) : (
              <>Quiz <span className="text-orange-500">Smash</span></>
            )}
          </h1>
          <p className="mt-1 text-xs text-slate-600 max-w-xs mx-auto">
            {isRTL
              ? 'سجّل الدخول بحسابك للوصول إلى التجربة المجانية لمدة يومين (48 ساعة) أو تفعيل اشتراك 100 تسجيل دخول.'
              : 'Sign in with your email to access the 2-day free trial or activate your 100-login subscription.'}
          </p>
        </div>

        {/* LINE SEPARATING HEADER FROM MODE SELECTOR */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* SECTION 2: MODE SWITCHER TABS */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              mode === 'signin'
                ? 'btn-glossy-orange'
                : 'text-slate-600 hover:text-slate-900 bg-transparent'
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
            className={`py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'btn-glossy-orange'
                : 'text-slate-600 hover:text-slate-900 bg-transparent'
            }`}
          >
            {isRTL ? 'إنشاء حساب جديد' : 'Sign Up'}
          </button>
        </div>

        {/* LINE SEPARATING MODE SWITCHER FROM FORM */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* Success Message above the form */}
        {successMessage && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-bold text-center leading-relaxed flex items-center justify-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
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
                  <User className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z\s'-]/g, ''))}
                    placeholder="e.g. Ali"
                    className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 text-sm rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-orange-500 font-sans"
                  />
                </div>
                <p className="mt-1 text-[10px] text-slate-400 text-left rtl:text-right font-medium">
                  {isRTL ? 'أحرف إنجليزية فقط (A-Z)' : 'English letters only (A-Z)'}
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5 text-left rtl:text-right">
              {isRTL ? 'البريد الإلكتروني:' : 'Email Address:'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 text-sm rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5 text-left rtl:text-right">
              {isRTL ? 'كلمة المرور:' : 'Password:'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 text-sm rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5 text-left rtl:text-right">
                {isRTL ? 'تأكيد كلمة المرور:' : 'Confirm Password:'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 text-sm rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* ORANGE GLOSSY ROUNDED SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl btn-glossy-orange text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>
              {loading
                ? isRTL
                  ? 'جاري التحقق...'
                  : 'Processing...'
                : mode === 'signin'
                ? isRTL
                  ? 'دخول والمتابعة إلى التطبيق'
                  : 'Sign In & Continue'
                : isRTL
                ? 'إنشاء الحساب والمتابعة'
                : 'Create Account & Continue'}
            </span>
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-700 text-xs font-bold text-center">
              {errorMessage}
            </div>
          )}
        </form>

        {/* LINE SEPARATING FORM FROM NEXT STEP NOTICE */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* Notice of next step */}
        <div className="text-center text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-sky-600" />
          <span>
            {isRTL
              ? 'بعد الدخول ستظهر لك شاشة تفعيل التجربة المجانية لمدة يومين (48 ساعة) أو كود اشتراك 100 تسجيل دخول.'
              : 'After signing in, you will be directed to the 2-day free trial and 100-login subscription page.'}
          </span>
        </div>
      </div>
    </div>
  );
};
