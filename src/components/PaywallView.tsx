import React, { useState } from 'react';
import { Lock, MessageCircle, Sparkles, KeyRound, Check, RotateCcw, Settings, ShieldAlert, Zap, Flame, Award, BarChart3 } from 'lucide-react';
import { useAuth, PRICE_IQD } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const PaywallView: React.FC = () => {
  const { submitAccessCode, testResetTrial, ownerWhatsApp, setOwnerWhatsApp } = useAuth();
  const { t, isRTL } = useLanguage();

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
      setErrorMessage(isRTL ? 'يرجى إدخال الكود المستلم عبر واتساب.' : 'Please enter the code you received via WhatsApp.');
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

  // Pre-filled WhatsApp message for paying 20,000 IQD
  const whatsappMessage = encodeURIComponent(
    isRTL
      ? 'مرحباً، لقد انتهت الفترة التجريبية (24 ساعة) لتطبيق كويز سماش. أود دفع 20,000 دينار عراقي للحصول على كود التفعيل للوصول غير المحدود.'
      : 'Hello, my 24-hour trial for Quiz Smash has expired. I would like to pay 20,000 IQD to get the activation code for unlimited access.'
  );

  const whatsappUrl = `https://wa.me/${ownerWhatsApp}?text=${whatsappMessage}`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-[#07131e] border-2 border-orange-500/40 dark:border-orange-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl">
        {/* Glow ambient background decoration in Chromic Orange & Ocean Blue */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Warning Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 text-xs font-black tracking-wide">
            <Lock className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>{isRTL ? 'انتهت الفترة التجريبية (24 ساعة)' : '24-Hour Free Trial Expired'}</span>
          </div>

          <span className="font-mono text-xs font-black text-white px-3 py-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 shadow-sm shadow-orange-500/25">
            {PRICE_IQD}
          </span>
        </div>

        {/* Main Content */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-sky-600 flex items-center justify-center shadow-lg shadow-orange-500/30 text-white text-2xl mb-4">
            ⭐
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {isRTL ? 'للوصول غير المحدود: 20,000 دينار عراقي' : 'For Unlimited Access: 20,000 IQD'}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            {isRTL
              ? 'لقد انتهت فترة الـ 24 ساعة التجريبية. للاستمرار في استخدام التطبيق بجميع ميزاته بدون أي حدود، يرجى دفع 20,000 دينار عراقي والتواصل عبر واتساب لاستلام كود التفعيل الدائم.'
              : 'Your 24-hour trial has expired. To enjoy unlimited lifetime access to all quiz challenges and explanations, please pay 20,000 IQD and contact us on WhatsApp to receive your permanent activation code.'}
          </p>
        </div>

        {/* Features Unlocked with 20,000 IQD */}
        <div className="space-y-2.5 mb-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
            <div className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 font-bold">
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
            <span>{isRTL ? 'وصول دائم مدى الحياة لجميع بنوك الأسئلة والاختبارات' : 'Lifetime permanent access with zero recurring fees'}</span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
            <div className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 font-bold">
              <Zap className="w-4 h-4 text-sky-500" />
            </div>
            <span>{isRTL ? 'وضع التدريب مع الشرح المفصل لكل إجابة صحيحة' : 'Practice mode with full explanations for every question'}</span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
            <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-bold">
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <span>{isRTL ? 'وضع الاختبار المؤقت (30 ثانية) مع صفارة الإنذار ومضاعفات النقاط' : '30s speed exam challenge with buzzer audio feedback'}</span>
          </div>
        </div>

        {/* PRIMARY WHATSAPP BUTTON (Chromic Orange & Ocean Blue Gradient) */}
        <div className="mb-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-sky-600 hover:from-orange-600 hover:to-sky-700 text-white font-black text-sm sm:text-base shadow-xl shadow-orange-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 fill-white" />
            <span>
              {isRTL
                ? `اضغط هنا للتواصل عبر واتساب لدفع ${PRICE_IQD} واستلام الكود`
                : `Chat on WhatsApp to pay ${PRICE_IQD} & get Code`}
            </span>
          </a>
          <p className="mt-2 text-[11px] text-center text-slate-500 dark:text-slate-400">
            {isRTL ? `رقم واتساب: +${ownerWhatsApp}` : `WhatsApp: +${ownerWhatsApp}`}
          </p>
        </div>

        {/* CODE ENTRY FORM */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 text-left rtl:text-right">
            {isRTL ? 'هل استلمت كود التفعيل عبر واتساب؟ أدخله هنا:' : 'Already received your code via WhatsApp? Enter it here:'}
          </label>
          <form onSubmit={handleApplyCode} className="flex gap-2">
            <div className="relative flex-1">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder={isRTL ? 'أدخل كود التفعيل' : 'Enter activation code'}
                className="w-full pl-9 pr-3 py-2.5 text-sm font-mono uppercase tracking-wider rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-center"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs transition-colors cursor-pointer shadow-md"
            >
              {isRTL ? 'تفعيل' : 'Activate'}
            </button>
          </form>

          {errorMessage && (
            <p className="mt-2 text-xs text-rose-500 font-bold text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold text-center flex items-center justify-center gap-1">
              <Check className="w-4 h-4" /> {successMessage}
            </p>
          )}
        </div>

        {/* Owner Settings & Testing Toolbar */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex items-center gap-1 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isRTL ? 'تعديل رقم واتساب المستلم' : 'Edit WhatsApp Number'}</span>
          </button>

          <button
            type="button"
            onClick={testResetTrial}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-sky-500 transition-colors cursor-pointer"
            title="Reset 24h trial for testing"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isRTL ? 'إعادة ضبط 24 ساعة (اختبار)' : 'Reset 24h (Test)'}</span>
          </button>
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
