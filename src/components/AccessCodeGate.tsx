import React, { useState } from 'react';
import { KeyRound, Sparkles, MessageCircle, ShieldCheck, Timer, Zap, Settings, Check } from 'lucide-react';
import { useAuth, PRICE_IQD } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const AccessCodeGate: React.FC = () => {
  const { submitAccessCode, activate24HourTrial, ownerWhatsApp, setOwnerWhatsApp } = useAuth();
  const { t, isRTL } = useLanguage();

  const [inputCode, setInputCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [phoneInput, setPhoneInput] = useState(ownerWhatsApp);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!inputCode.trim()) {
      setErrorMessage(isRTL ? 'يرجى إدخال كود التفعيل.' : 'Please enter an activation code.');
      return;
    }

    const result = submitAccessCode(inputCode);
    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleStartTrial = () => {
    activate24HourTrial();
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    setOwnerWhatsApp(phoneInput);
    setShowSettings(false);
  };

  // WhatsApp link with pre-filled message
  const whatsappMessage = encodeURIComponent(
    isRTL
      ? 'مرحباً، أود الحصول على كود تفعيل تطبيق كويز سماش (Quiz Smash). ما هي طريقة دفع 20,000 دينار عراقي؟'
      : 'Hello! I would like to get an activation code for Quiz Smash. How can I pay 20,000 IQD for unlimited access?'
  );

  const whatsappUrl = `https://wa.me/${ownerWhatsApp}?text=${whatsappMessage}`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-[#07131e] border-2 border-sky-900/40 dark:border-sky-800/40 rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl text-center">
        {/* Glow ambient background decoration in Chromic Orange & Ocean Blue */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Icon: Chromic Orange Flame & Ocean Blue Key */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-sky-600 flex items-center justify-center shadow-lg shadow-orange-500/30 mb-4 text-white">
          <KeyRound className="w-8 h-8" />
        </div>

        {/* Price & Trial Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/40 text-orange-600 dark:text-orange-400 text-xs font-black mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>{isRTL ? `وصول غير محدود: ${PRICE_IQD}` : `Unlimited Access: ${PRICE_IQD}`}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {isRTL ? (
            <>كويز <span className="text-orange-500">سماش</span></>
          ) : (
            <>Quiz <span className="text-orange-500">Smash</span></>
          )}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
          {isRTL
            ? 'أدخل كود التفعيل لفتح التطبيق لمدة 24 ساعة تجريبية، أو احصل على كود الوصول الدائم غير المحدود.'
            : 'Enter your access code to unlock the app for a 24-hour trial or permanent unlimited access.'}
        </p>

        {/* Simple Code Input Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <div className="relative">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder={isRTL ? 'أدخل كود التفعيل هنا (مثال: TRIAL24)' : 'Enter Code Here (e.g. TRIAL24)'}
              className="w-full text-center px-4 py-3.5 text-base font-mono uppercase tracking-widest rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>{isRTL ? 'تفعيل ودخول التطبيق' : 'Unlock App'}</span>
          </button>
        </form>

        {errorMessage && (
          <p className="mt-3 text-xs text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/50 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" /> {successMessage}
          </p>
        )}

        {/* Quick 24h Free Trial Button in Ocean Blue */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={handleStartTrial}
            className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-sky-300/40 dark:border-sky-800/60"
          >
            <Timer className="w-4 h-4 text-sky-500" />
            <span>{isRTL ? 'بدء تجربة مجانية فورية لمدة 24 ساعة' : 'Start Instant 24-Hour Free Trial'}</span>
          </button>
        </div>

        {/* WhatsApp Request Button (Ocean Blue with Chromic Orange icon/badge) */}
        <div className="mt-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-xs shadow-md shadow-sky-600/25 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isRTL ? `طلب كود غير محدود عبر واتساب (${PRICE_IQD})` : `Request Unlimited Code on WhatsApp (${PRICE_IQD})`}</span>
          </a>
        </div>

        {/* Owner Settings / WhatsApp Number Configuration */}
        <div className="mt-5 flex items-center justify-between text-[11px] text-slate-400">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex items-center gap-1 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isRTL ? 'رقم واتساب صاحب التطبيق' : 'WhatsApp Settings'}</span>
          </button>

          <span className="font-mono text-[10px] text-slate-400">
            WA: +{ownerWhatsApp}
          </span>
        </div>

        {showSettings && (
          <form onSubmit={handleSavePhone} className="mt-3 p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-left rtl:text-right">
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
              {isRTL ? 'أدخل رقم هاتفك لتلقي رسائل واتساب (مع الرمز الدولي 964):' : 'Enter WhatsApp Number (with country code):'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="9647700000000"
                className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                {isRTL ? 'حفظ' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
