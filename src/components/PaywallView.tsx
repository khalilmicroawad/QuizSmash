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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md mx-auto bg-white border-2 border-slate-200 rounded-3xl shadow-xl p-6 sm:p-8 relative text-center text-slate-900">
        {/* SECTION 1: HEADER & LOCK ICON */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl btn-glossy-orange flex items-center justify-center mb-3 text-white shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isRTL ? 'انتهت الفترة التجريبية' : 'Free Trial Expired'}
          </h2>
          <p className="mt-1.5 text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
            {isRTL
              ? `للوصول غير المحدود الدائم، يرجى دفع ${PRICE_IQD} والتواصل عبر واتساب لاستلام كود التفعيل.`
              : `For unlimited lifetime access, pay ${PRICE_IQD} via WhatsApp to receive your code.`}
          </p>
        </div>

        {/* LINE SEPARATING HEADER FROM WHATSAPP SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* SECTION 2: PRIMARY WHATSAPP BUTTON */}
        <div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl btn-glossy-orange text-sm flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>
              {isRTL ? `طلب كود التفعيل عبر واتساب (${PRICE_IQD})` : `Get Code via WhatsApp (${PRICE_IQD})`}
            </span>
          </a>
        </div>

        {/* LINE SEPARATING WHATSAPP FROM CODE ENTRY SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* SECTION 3: CODE ENTRY FORM */}
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-3">
            {isRTL ? 'هل لديك كود تفعيل؟' : 'Have an activation code?'}
          </div>

          <form onSubmit={handleApplyCode} className="flex gap-2.5">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder={isRTL ? 'أدخل كود التفعيل' : 'Enter code'}
              className="flex-1 px-4 py-2.5 text-xs font-mono uppercase tracking-wider rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-orange-500 text-center font-bold"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl btn-glossy-orange text-xs cursor-pointer"
            >
              {isRTL ? 'تفعيل' : 'Unlock'}
            </button>
          </form>

          {errorMessage && (
            <p className="mt-3 text-xs text-rose-700 font-bold bg-rose-50 p-2.5 rounded-2xl border-2 border-rose-300">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="mt-3 text-xs text-emerald-800 font-bold bg-emerald-50 p-2.5 rounded-2xl border-2 border-emerald-300 flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> {successMessage}
            </p>
          )}
        </div>

        {/* LINE SEPARATING CODE ENTRY FROM SETTINGS SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* SECTION 4: WHATSAPP SETTINGS */}
        <div className="flex flex-col items-center justify-center text-xs text-slate-500">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-orange-600 font-bold transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isRTL ? 'تعديل رقم واتساب المستلم' : 'Edit WhatsApp Number'}</span>
          </button>

          {showSettings && (
            <form onSubmit={handleSavePhone} className="mt-3 w-full p-3 bg-slate-50 rounded-2xl border-2 border-slate-200 text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="9647700000000"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-mono text-slate-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl btn-glossy-orange text-xs cursor-pointer"
                >
                  {isRTL ? 'حفظ' : 'Save'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
