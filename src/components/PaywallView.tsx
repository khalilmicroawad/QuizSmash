import React, { useState } from 'react';
import { Lock, MessageCircle, KeyRound, Check, Settings } from 'lucide-react';
import { useAuth, PRICE_IQD } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const PaywallView: React.FC = () => {
  const { submitAccessCode, ownerWhatsApp, setOwnerWhatsApp } = useAuth();
  const { isRTL } = useLanguage();

  const [inputCode, setInputCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [phoneInput, setPhoneInput] = useState(ownerWhatsApp);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!inputCode.trim()) {
      setErrorMessage(isRTL ? 'يرجى إدخال الكود المستلم عبر واتساب.' : 'Please enter your code.');
      return;
    }

    const result = submitAccessCode(inputCode);
    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    setOwnerWhatsApp(phoneInput);
    setShowSettings(false);
  };

  const whatsappMessage = encodeURIComponent(
    isRTL
      ? 'مرحباً، لقد انتهت الفترة التجريبية (24 ساعة) لتطبيق كويز سماش. أود دفع 20,000 دينار عراقي للحصول على كود التفعيل للوصول غير المحدود.'
      : 'Hello, my 24-hour trial for Quiz Smash has expired. I would like to pay 20,000 IQD to get the activation code for unlimited access.'
  );

  const whatsappUrl = `https://wa.me/${ownerWhatsApp}?text=${whatsappMessage}`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-[#07131e] border border-orange-500/40 rounded-2xl shadow-xl p-6 sm:p-7 relative text-center">
        {/* Lock Icon */}
        <div className="mx-auto w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-3">
          <Lock className="w-6 h-6" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {isRTL ? 'انتهت الفترة التجريبية' : 'Free Trial Expired'}
        </h2>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
          {isRTL
            ? `للوصول غير المحدود الدائم، يرجى دفع ${PRICE_IQD} والتواصل عبر واتساب لاستلام الكود.`
            : `For unlimited lifetime access, pay ${PRICE_IQD} via WhatsApp to receive your code.`}
        </p>

        {/* PRIMARY WHATSAPP BUTTON */}
        <div className="mt-5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-sky-600 hover:from-orange-600 hover:to-sky-700 text-white font-extrabold text-sm shadow-md shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>
              {isRTL ? `طلب كود التفعيل عبر واتساب (${PRICE_IQD})` : `Get Code via WhatsApp (${PRICE_IQD})`}
            </span>
          </a>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
          <span className="bg-white dark:bg-[#07131e] px-2 text-[11px] font-bold text-slate-400 uppercase">
            {isRTL ? 'هل لديك كود؟' : 'have a code?'}
          </span>
        </div>

        {/* CODE ENTRY FORM */}
        <form onSubmit={handleApplyCode} className="flex gap-2">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder={isRTL ? 'أدخل كود التفعيل' : 'Enter code'}
            className="flex-1 px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 text-center"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            {isRTL ? 'تفعيل' : 'Unlock'}
          </button>
        </form>

        {errorMessage && (
          <p className="mt-2 text-xs text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-900">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-200 dark:border-emerald-900 flex items-center justify-center gap-1">
            <Check className="w-3.5 h-3.5" /> {successMessage}
          </p>
        )}

        {/* Quiet Settings */}
        <div className="mt-4 flex items-center justify-center text-[11px] text-slate-400">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            <Settings className="w-3 h-3" />
            <span>{isRTL ? 'إعدادات واتساب' : 'WhatsApp Settings'}</span>
          </button>
        </div>

        {showSettings && (
          <form onSubmit={handleSavePhone} className="mt-2 p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex gap-1.5">
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="9647700000000"
                className="flex-1 px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-orange-500 text-white font-bold text-xs rounded cursor-pointer"
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
