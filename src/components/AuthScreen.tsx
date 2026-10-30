import React, { useState } from 'react';
import { Mail, Lock, Sparkles, ArrowRight, ArrowLeft, Check, ShieldCheck, Zap } from 'lucide-react';
import { supabase } from '../supabaseClient.js';
import { useLanguage } from '../context/LanguageContext';

export const AuthScreen: React.FC = () => {
  const { isRTL, language } = useLanguage();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
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

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMessage(
        isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match'
      );
      return;
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
          if (window.location.pathname === '/login') {
            window.location.href = '/';
          }
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
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

  // Google / Gmail OAuth One-Click Sign In
  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Google sign-in error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">
      <div className="w-full max-w-md mx-auto bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative text-slate-900">
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
              ? 'سجّل الدخول بحساب Gmail الخاص بك أولاً للوصول إلى التجربة المجانية 24 ساعة والدفع.'
              : 'Sign in with your Gmail account first to access the 24-hour trial and full features.'}
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

        {/* LINE SEPARATING MODE SWITCHER FROM GOOGLE SIGN IN */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* SECTION 3: ONE-CLICK GOOGLE / GMAIL SIGN IN */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 px-4 rounded-2xl btn-glossy-orange-outline font-extrabold text-xs flex items-center justify-center gap-3 cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>
              {mode === 'signin'
                ? isRTL
                  ? 'متابعة سريعة بحساب Google'
                  : 'Continue with Google'
                : isRTL
                ? 'إنشاء الحساب عبر Google'
                : 'Sign up with Google'}
            </span>
          </button>
        </div>

        {/* LINE SEPARATING GOOGLE FROM EMAIL/PASSWORD SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* Success Message above the form */}
        {successMessage && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-bold text-center leading-relaxed flex items-center justify-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* SECTION 4: EMAIL & PASSWORD FORM */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5 text-left rtl:text-right">
              {isRTL ? 'حساب Gmail / البريد الإلكتروني:' : 'Gmail / Email Address:'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@gmail.com"
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

          {/* Simple Error Handling Message Under Form */}
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
              ? 'بعد الدخول ستظهر لك شاشة تفعيل التجربة المجانية 24 ساعة أو كود الـ 20,000 دينار.'
              : 'After signing in, you will be directed to the 24-hour trial & 20,000 IQD unlock page.'}
          </span>
        </div>
      </div>
    </div>
  );
};
