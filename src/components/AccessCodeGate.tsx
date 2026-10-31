import React, { useState } from 'react';
import { KeyRound, Sparkles, MessageCircle, Timer, Settings, Check, Zap, ShieldCheck } from 'lucide-react';
import { useAuth, PRICE_IQD, MAX_SUBSCRIPTION_LOGINS } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const AccessCodeGate: React.FC = () => {
  const {
    submitAccessCode,
    activate2DayTrial,
    ownerWhatsApp,
    setOwnerWhatsApp,
    usedLogins,
    maxLogins,
    remainingLogins,
  } = useAuth();
  const { isRTL } = useLanguage();

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
      setErrorMessage(isRTL ? 'يرجى إدخال كود الاشتراك أو التفعيل.' : 'Please enter a subscription code.');
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
    activate2DayTrial();
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    setOwnerWhatsApp(phoneInput);
    setShowSettings(false);
  };

  const whatsappMessage = encodeURIComponent(
    isRTL
      ? `مرحباً، أود الحصول على كود اشتراك تطبيق كويز سماش (100 تسجيل دخول) مقابل ${PRICE_IQD}. ما هي طريقة الدفع؟`
      : `Hello! I would like to purchase the 100-login subscription code for Quiz Smash (${PRICE_IQD}). What is the payment method?`
  );

  const whatsappUrl = `https://wa.me/${ownerWhatsApp}?text=${whatsappMessage}`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md mx-auto bg-white border-2 border-slate-200 rounded-3xl shadow-xl p-6 sm:p-8 relative text-center text-slate-900">
        {/* SECTION 1: BRAND HEADER */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl btn-glossy-orange flex items-center justify-center shadow-md mb-3 text-white">
            <KeyRound className="w-7 h-7" />
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isRTL ? (
              <>كويز <span className="text-orange-500">سماش</span></>
            ) : (
              <>Quiz <span className="text-orange-500">Smash</span></>
            )}
          </h1>

          <p className="mt-1.5 text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
            {isRTL
              ? 'ابدأ التجربة المجانية لمدة يومين (48 ساعة) أو أدخل كود اشتراك 100 تسجيل دخول.'
              : 'Start your 2-day free trial (48 hours) or enter your 100-login subscription code.'}
          </p>
        </div>

        {/* SECTION 1.5: SERVICE USAGE COUNTER (IF ACTIVE) */}
        {usedLogins > 0 && (
          <div className="mt-4 p-3 rounded-2xl bg-orange-50/70 border border-orange-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
              <div className="text-left rtl:text-right">
                <div className="text-[10px] font-extrabold uppercase text-orange-800">
                  {isRTL ? 'رصيد استخدام الخدمة' : 'Service Usage Counter'}
                </div>
                <div className="text-xs font-bold text-slate-700">
                  {isRTL
                    ? `تم استخدام ${usedLogins} من أصل ${maxLogins} تسجيل دخول`
                    : `Used ${usedLogins} of ${maxLogins} logins`}
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-black px-2 py-1 rounded-xl bg-white border border-orange-200 text-orange-600">
              {remainingLogins} {isRTL ? 'متبقي' : 'left'}
            </span>
          </div>
        )}

        {/* LINE SEPARATING HEADER FROM TRIAL SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* SECTION 2: 2-DAY FREE TRIAL (48 HOURS) */}
        <div>
          <button
            type="button"
            onClick={handleStartTrial}
            className="w-full py-3.5 px-4 rounded-2xl btn-glossy-orange text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Timer className="w-5 h-5" />
            <span>{isRTL ? 'بدء تجربة مجانية (يومان / 48 ساعة)' : 'Start 2-Day Free Trial (48 Hours)'}</span>
          </button>
          <p className="mt-1.5 text-[11px] text-slate-500">
            {isRTL
              ? 'تتيح لك حل جميع أسئلة اختبار الجهاز العصبي (105 أسئلة) مجاناً لمدة يومين.'
              : 'Practice all 105 CNS Test questions free for 48 hours.'}
          </p>
        </div>

        {/* LINE SEPARATING TRIAL FROM CODE ENTRY SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* SECTION 3: SUBSCRIPTION CODE (100 LOGINS) */}
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-1.5 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span>{isRTL ? 'كود اشتراك (100 تسجيل دخول):' : 'Subscription Code (100 Logins):'}</span>
          </div>
          <p className="text-[11px] text-slate-500 mb-3">
            {isRTL
              ? 'يمنحك الكود 100 مرة تسجيل دخول للخدمة مع تجديد الدخول اليومي الإجباري.'
              : 'Grants 100 service logins with mandatory daily re-login security.'}
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2.5">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder={isRTL ? 'كود الاشتراك (مثال: SUB100)' : 'Code (e.g. SUB100)'}
              className="flex-1 px-4 py-2.5 text-xs font-mono uppercase tracking-wider rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-orange-500 text-center font-bold"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl btn-glossy-orange text-xs cursor-pointer font-bold"
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

        {/* LINE SEPARATING CODE ENTRY FROM WHATSAPP SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* SECTION 4: DIRECT WHATSAPP LINK FOR SUBSCRIPTION */}
        <div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl btn-glossy-orange-outline text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>
              {isRTL
                ? `طلب كود الاشتراك عبر واتساب (${PRICE_IQD} - 100 دخول)`
                : `Get 100-Login Code via WhatsApp (${PRICE_IQD})`}
            </span>
          </a>
        </div>

        {/* LINE SEPARATING WHATSAPP FROM SETTINGS SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-5" />

        {/* SECTION 5: WHATSAPP SETTINGS */}
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
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-xs focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl btn-glossy-orange text-xs font-bold cursor-pointer"
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
