import React, { useState } from 'react';
import { supabase } from '../supabaseClient.js';
import { loginWithGooglePopup, registerWithEmail, syncFirebaseUserAccess } from '../services/firebase';

interface SignUpProps {
  onSuccess?: () => void;
  onNavigateToSignIn?: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSuccess, onNavigateToSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleGoogleSignUp = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      const fbUser = await loginWithGooglePopup();
      await syncFirebaseUserAccess(fbUser);
      if (onSuccess) {
        onSuccess();
      }
      window.location.href = '/';
    } catch (err: any) {
      setErrorMessage(err.message || 'Google sign-up was cancelled or failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
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

        const successNotice = 'Your account has been created. Please check your email and verify your address before logging in.';

        try {
          sessionStorage.setItem('prefill_email', email);
          sessionStorage.setItem('signup_success_msg', successNotice);
        } catch {
          // Ignore
        }

        if (onNavigateToSignIn) {
          (onNavigateToSignIn as any)(email, successNotice);
        } else {
          const targetPath = window.location.pathname === '/signup' ? '/signin' : '/login';
          window.location.href = `${targetPath}?email=${encodeURIComponent(email)}&registered=true`;
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a1929] border-2 border-sky-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-slate-100">
        {/* Glow ambient background decoration */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-sky-600 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/25 mb-3 text-white">
            ✨
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Create an Account</h2>
          <p className="text-xs text-slate-400 mt-1">
            Sign up to get started with Quiz Smash
          </p>
        </div>

        {/* Google Sign Up via Firebase */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-2.5 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 border-b border-slate-800" />
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">or with email</span>
            <div className="flex-1 border-b border-slate-800" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5" htmlFor="signup-email">
              Email Address
            </label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5" htmlFor="signup-password">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5" htmlFor="signup-confirm-password">
              Confirm Password
            </label>
            <input
              id="signup-confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          {/* Simple error message under the form */}
          {errorMessage && (
            <div className="mt-3 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-medium text-center">
              {errorMessage}
            </div>
          )}

          {/* Success notice */}
          {successMessage && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-medium text-center">
              {successMessage}
            </div>
          )}
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>Already have an account? </span>
          {onNavigateToSignIn ? (
            <button
              type="button"
              onClick={onNavigateToSignIn}
              className="text-orange-400 hover:text-orange-300 font-bold hover:underline"
            >
              Sign In
            </button>
          ) : (
            <a href="/signin" className="text-orange-400 hover:text-orange-300 font-bold hover:underline">
              Sign In
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
