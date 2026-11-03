import React, { useState } from 'react';
import {
  Lock,
  MessageCircle,
  Settings,
  Zap,
  LogOut,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useAuth, PRICE_IQD } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { CourseStage } from './CourseSelectionView';

interface PaywallViewProps {
  selectedCourse?: CourseStage | null;
  onBackToCourses?: () => void;
}

export const PaywallView: React.FC<PaywallViewProps> = ({
  selectedCourse,
  onBackToCourses,
}) => {
  const {
    user,
    submitAccessCode,
    ownerWhatsApp,
    setOwnerWhatsApp,
    usedLogins,
    maxLogins,
    hasSubscription,
    signOutUser,
  } = useAuth();
  const { isRTL } = useLanguage();

  const [inputCode, setInputCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [phoneInput, setPhoneInput] = useState(ownerWhatsApp);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userEmail = user?.email || '';
  const fullName = user?.user_metadata?.full_name || '';

  const courseId = selectedCourse?.id || 'stage-1';
  const courseName = isRTL
    ? selectedCourse?.nameAr || 'المرحلة الأولى (كلية طب الأسنان)'
    : selectedCourse?.nameEn || 'First Course (First Level)';

  const handleApplyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!inputCode.trim()) {
      setErrorMessage(
        isRTL
          ? 'يرجى إدخال كود الاشتراك المكون من 13 رقماً للمرحلة الأولى.'
          : 'Please enter the 13-figure code for Course 1.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitAccessCode(inputCode, courseId);
      if (result.success) {
        setSuccessMessage(result.message);
      } else {
        setErrorMessage(result.message);
      }
    } catch {
      setErrorMessage(
        isRTL ? 'حدث خطأ أثناء التحقق من الكود.' : 'Error checking code. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    setOwnerWhatsApp(phoneInput);
    setShowSettings(false);
  };

  const isLoginsDepleted = hasSubscription && usedLogins >= maxLogins;

  // Direct WhatsApp link with pre-configured payment number
  const whatsappMessage = encodeURIComponent(
    isRTL
      ? `مرحباً دكتور، أود تفعيل كود اشتراك كويز سماش (100 تسجيل دخول للمرحلة الأولى) مقابل ${PRICE_IQD}.\n\nالمرحلة الدراسية:\n${courseName}\n\nالحساب:\n${fullName || userEmail || 'حساب طالب'}`
      : `Hello, I would like to activate the Quiz Smash 100-login subscription for ${courseName} (${PRICE_IQD}).\n\nAccount:\n${fullName || userEmail || 'Student'}`
  );

  const whatsappUrl = `https://wa.me/${ownerWhatsApp}?text=${whatsappMessage}`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-white overflow-x-hidden w-full select-none">
      <div className="w-full max-w-md mx-auto bg-white border-2 border-slate-200 rounded-3xl shadow-xl p-5 sm:p-7 relative text-slate-900 overflow-hidden touch-pan-y">
        {/* COURSE BADGE & SWITCH LINK */}
        <div className="mb-3 flex items-center justify-between text-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 font-extrabold text-[11px]">
            <BookOpen className="w-3.5 h-3.5 text-orange-500" />
            <span>{courseName}</span>
          </div>

          {onBackToCourses && (
            <button
              type="button"
              onClick={onBackToCourses}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-orange-600 transition-colors cursor-pointer"
            >
              <span>{isRTL ? 'تغيير المرحلة' : 'Change Course'}</span>
              {isRTL ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
            </button>
          )}
        </div>

        {/* SECTION 1: HEADER & LOCK ICON */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl btn-glossy-orange flex items-center justify-center mb-3 text-white shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isLoginsDepleted
              ? isRTL
                ? 'تم استهلاك رصيد تسجيل الدخول'
                : '100 Logins Limit Reached'
              : isRTL
              ? 'انتهت الفترة التجريبية (يومان)'
              : '2-Day Free Trial Expired'}
          </h2>
          <p className="mt-1.5 text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
            {isLoginsDepleted
              ? isRTL
                ? `لقد استخدمت جميع مرات تسجيل الدخول المتاحة (${maxLogins} مرة). يرجى تجديد الاشتراك بـ ${PRICE_IQD}.`
                : `You have reached your 100 logins limit. Please renew your subscription for ${PRICE_IQD}.`
              : isRTL
              ? `للاستمرار في استخدام المنصة، يرجى تفعيل كود الـ 13 رقماً لاشتراك 100 تسجيل دخول مقابل ${PRICE_IQD}.`
              : `To continue using the platform, activate a 13-figure 100-login code for ${PRICE_IQD}.`}
          </p>
        </div>

        {/* SERVICE USAGE COUNTER */}
        <div className="mt-4 p-3 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500 fill-orange-500 shrink-0" />
            <span className="text-xs font-bold text-orange-950">
              {isRTL ? 'مرات استخدام الخدمة:' : 'Service Logins Used:'}
            </span>
          </div>
          <span className="font-mono text-xs font-black text-orange-600 bg-white px-2.5 py-1 rounded-xl border border-orange-200 shrink-0">
            {usedLogins} / {maxLogins}
          </span>
        </div>

        {/* LINE SEPARATING USAGE FROM DIRECT WHATSAPP LINK */}
        <div className="w-full border-b-2 border-slate-200 my-4" />

        {/* SECTION 2: DIRECT WHATSAPP INTEGRATION LINK */}
        <div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl btn-glossy-orange text-sm font-black flex items-center justify-center gap-2.5 cursor-pointer shadow-md active:scale-[0.99]"
          >
            <MessageCircle className="w-5 h-5 fill-white shrink-0" />
            <span>
              {isRTL
                ? `طلب التفعيل عبر واتساب (${PRICE_IQD})`
                : `Activate via WhatsApp (${PRICE_IQD})`}
            </span>
          </a>
          <p className="mt-1 text-[10px] text-slate-400 text-center">
            {isRTL
              ? `الرقم المعتمد: ${ownerWhatsApp}`
              : `Pre-configured payment: ${ownerWhatsApp}`}
          </p>
        </div>

        {/* LINE SEPARATING WHATSAPP FROM CODE ENTRY */}
        <div className="w-full border-b-2 border-slate-200 my-4" />

        {/* SECTION 3: CODE ENTRY FORM */}
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-slate-700 flex items-center justify-center gap-1.5 mb-2">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span>{isRTL ? 'كود الاشتراك (13 رقماً - 100 دخول):' : 'Access Code (13 Figures - 100 Logins):'}</span>
          </div>

          <form onSubmit={handleApplyCode} className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder={isRTL ? 'أدخل كود الـ 13 رقماً' : 'Enter 13-figure code'}
              className="flex-1 px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-xl border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-orange-500 text-center font-bold"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl btn-glossy-orange text-xs cursor-pointer font-bold shrink-0 disabled:opacity-50"
            >
              {isSubmitting ? (isRTL ? 'تحقق...' : 'Checking...') : (isRTL ? 'تفعيل' : 'Unlock')}
            </button>
          </form>

          <p className="mt-1.5 text-[10px] text-slate-500 text-center">
            {isRTL
              ? 'ملاحظة: هذا الكود مخصص للمرحلة الأولى فقط.'
              : 'Notice: This code works strictly for Course 1 (First Level).'}
          </p>

          {errorMessage && (
            <p className="mt-2 text-xs text-rose-700 font-bold bg-rose-50 p-2 rounded-xl border-2 border-rose-300">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="mt-2 text-xs text-emerald-800 font-bold bg-emerald-50 p-2 rounded-xl border-2 border-emerald-300 flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> {successMessage}
            </p>
          )}
        </div>

        {/* LINE SEPARATING CODE ENTRY FROM SETTINGS & LOG OUT */}
        <div className="w-full border-b-2 border-slate-200 my-4" />

        {/* SECTION 4: WHATSAPP SETTINGS */}
        <div className="flex flex-col items-center justify-center text-xs text-slate-500 mb-3">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-orange-600 font-bold transition-colors cursor-pointer text-[11px]"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isRTL ? 'تعديل رقم واتساب المستلم' : 'Edit WhatsApp Number'}</span>
          </button>

          {showSettings && (
            <form onSubmit={handleSavePhone} className="mt-2.5 w-full p-3 bg-slate-50 rounded-2xl border-2 border-slate-200 text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="9647700000000"
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-xs focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl btn-glossy-orange text-xs font-bold cursor-pointer"
                >
                  {isRTL ? 'حفظ' : 'Save'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* SECTION 5: LOG OUT BUTTON DOWN OF THE PAGE */}
        <div className="pt-2 border-t border-slate-100 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => signOutUser()}
            className="w-full py-2.5 px-4 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-300 text-slate-600 hover:text-rose-600 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <LogOut className="w-4 h-4 text-slate-500 group-hover:text-rose-600" />
            <span>{isRTL ? 'تسجيل الخروج من الحساب' : 'Log Out of Account'}</span>
          </button>
          {userEmail && (
            <p className="mt-1 text-[10px] text-slate-400 font-mono truncate max-w-full">
              {userEmail}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
