import React, { useState } from 'react';
import { supabase } from './supabaseClient.js';

export default function SignIn({ onSuccess, onNavigateToSignUp, initialEmail = '', initialMessage = '' }) {
  // Pre-fill email from props, URL query parameter (?email=...), or sessionStorage
  const [email, setEmail] = useState(() => {
    if (initialEmail) return initialEmail;
    try {
      const params = new URLSearchParams(window.location.search);
      const urlEmail = params.get('email');
      if (urlEmail) return urlEmail;
      const storedEmail = sessionStorage.getItem('prefill_email');
      if (storedEmail) {
        sessionStorage.removeItem('prefill_email');
        return storedEmail;
      }
    } catch {
      // Ignore
    }
    return '';
  });

  // Success message when redirected from sign up
  const [successMessage, setSuccessMessage] = useState(() => {
    if (initialMessage) return initialMessage;
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('registered') === 'true' || params.get('signup_success') === 'true') {
        return 'Your account has been created. Please check your email and verify your address before logging in.';
      }
      const storedMsg = sessionStorage.getItem('signup_success_msg');
      if (storedMsg) {
        sessionStorage.removeItem('signup_success_msg');
        return storedMsg;
      }
    } catch {
      // Ignore
    }
    return '';
  });

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (data?.session) {
        // Only redirect when a real session exists after login
        if (onSuccess) {
          onSuccess();
        }
        // Redirect the user to the Home page ("/")
        window.location.href = '/';
      } else {
        setErrorMessage('Check your email and confirm your account before logging in.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a1929] border-2 border-sky-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-slate-100">
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-sky-600 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/25 mb-3 text-white">
            ⚡
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Sign In</h2>
          <p className="text-xs text-slate-400 mt-1">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Clear success message above the form when redirected from sign up */}
        {successMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-700/80 text-emerald-300 text-xs font-semibold text-center leading-relaxed">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Simple error message under the form */}
          {errorMessage && (
            <div className="mt-3 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-medium text-center">
              {errorMessage}
            </div>
          )}
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>Don't have an account? </span>
          {onNavigateToSignUp ? (
            <button
              type="button"
              onClick={onNavigateToSignUp}
              className="text-orange-400 hover:text-orange-300 font-bold hover:underline"
            >
              Sign Up
            </button>
          ) : (
            <a href="/signup" className="text-orange-400 hover:text-orange-300 font-bold hover:underline">
              Sign Up
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
