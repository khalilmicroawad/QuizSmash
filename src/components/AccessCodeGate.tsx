import React, { useState } from 'react';
import {
  KeyRound,
  MessageCircle,
  Timer,
  Settings,
  Check,
  Zap,
  ShieldCheck,
  LogOut,
  BookOpen,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useAuth, PRICE_IQD, MAX_SUBSCRIPTION_LOGINS } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { CourseStage } from './CourseSelectionView';

interface AccessCodeGateProps {
  selectedCourse?: CourseStage | null;
  onBackToCourses?: () => void;
}

export const AccessCodeGate: React.FC<AccessCodeGateProps> = ({
  selectedCourse,
  onBackToCourses,
}) => {
  const {
    user,
    submitAccessCode,
    activate2DayTrial,
    ownerWhatsApp,
    setOwnerWhatsApp,
    usedLogins,
    maxLogins,
    remainingLogins,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!inputCode.trim()) {
      setErrorMessage(
        isRTL
          ? 'يرجى إدخال كود الاشتراك المكون من 13 رقماً للمرحلة الأولى.'
          : 'Please enter the 13-figure access code for Course 1.'
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

  const handleStartTrial = () => {
    activate2DayTrial('FREE_TRIAL_2DAYS', courseId);
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    setOwnerWhatsApp(phoneInput);
    setShowSettings(false);
  };

  const whatsappMessage = encodeURIComponent(
    isRTL
      ? `مرحباً دكتور، أود الحصول على كود اشتراك كويز سماش (100 تسجيل دخول للمرحلة الأولى) مقابل ${PRICE_IQD}.\n\nالمرحلة الدراسية:\n${courseName}\n\nالحساب:\n${fullName || userEmail || 'حساب طالب'}`
      : `Hello! I would like to purchase the 100-login code for Quiz Smash (Course 1) for ${PRICE_IQD}.\n\nCourse:\n${courseName}\n\nAccount:\n${fullName || userEmail || 'Student'}`
  );

  const whatsappUrl = `https://wa.me/${ownerWhatsApp}?text=${whatsappMessage}`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-white overflow-x-hidden w-full select-none">
      <div className="w-full max-w-md mx-auto bg-white border-2 border-slate-200 rounded-3xl shadow-xl p-5 sm:p-7 relative text-slate-900 overflow-hidden touch-pan-y">
        {/* COURSE BADGE & SWITCH LINK */}
        <div className="mb-3 flex items-center justify-between text-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[11px]">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>{courseName}</span>
          </div>

          {onBackToCourses && (
            <button
              type="button"
              onClick={onBackToCourses}
              title={isRTL ? 'تغيير المرحلة' : 'Change Course'}
              aria-label={isRTL ? 'تغيير المرحلة' : 'Change Course'}
              className="w-8 h-8 rounded-lg bg-[#F2F5ED] text-[#4D5D28] hover:bg-[#E6ECDC] flex items-center justify-center cursor-pointer transition-colors"
            >
              {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* SECTION 1: BRAND HEADER */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl btn-glossy-emerald flex items-center justify-center shadow-md mb-3 text-white">
            <KeyRound className="w-7 h-7" />
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isRTL ? (
              <>كويز <span className="text-emerald-600">سماش</span></>
            ) : (
              <>Quiz <span className="text-emerald-600">Smash</span></>
            )}
          </h1>

          <p className="mt-1.5 text-xs text-[#556B2F] max-w-xs mx-auto leading-relaxed">
            {isRTL
              ? 'أدخل كود الاشتراك (13 رقماً) المخصص للمرحلة الأولى للحصول على 100 تسجيل دخول، أو ابدأ التجربة المجانية.'
              : 'Enter your 13-figure Course 1 activation code (100 logins) or start your 2-day free trial.'}
          </p>
        </div>

        {/* SERVICE USAGE COUNTER (IF ACTIVE) */}
        {usedLogins > 0 && (
          <div className="mt-4 p-3 rounded-2xl bg-[#F2F5ED] border border-[#D9E2CE] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600 shrink-0" />
              <div className="text-left rtl:text-right">
                <div className="text-[10px] font-bold uppercase text-[#4D5D28]">
                  {isRTL ? 'رصيد استخدام الخدمة' : 'Service Usage Counter'}
                </div>
                <div className="text-xs font-bold text-slate-700">
                  {isRTL
                    ? `تم استخدام ${usedLogins} من أصل ${maxLogins} تسجيل دخول`
                    : `Used ${usedLogins} of ${maxLogins} logins`}
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-bold px-2 py-1 rounded-xl bg-white border border-emerald-200 text-emerald-700 shrink-0">
              {remainingLogins} {isRTL ? 'متبقي' : 'left'}
            </span>
          </div>
        )}

        {/* LINE SEPARATING HEADER FROM TRIAL SECTION */}
        <div className="w-full border-b border-[#D9E2CE] my-4" />

        {/* SECTION 2: 2-DAY FREE TRIAL (48 HOURS) - ICON ONLY */}
        <div>
          <button
            type="button"
            onClick={handleStartTrial}
            title={isRTL ? 'بدء تجربة مجانية (48 ساعة)' : 'Start 2-Day Free Trial (48 Hours)'}
            aria-label={isRTL ? 'بدء تجربة مجانية (48 ساعة)' : 'Start 2-Day Free Trial (48 Hours)'}
            className="w-full py-3.5 px-4 rounded-xl btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-md transition-transform active:scale-[0.99]"
          >
            <Timer className="w-5 h-5" />
          </button>
          <p className="mt-1.5 text-[11px] text-[#556B2F] text-center">
            {isRTL
              ? 'تتيح لك حل جميع أسئلة المرحلة الأولى مجاناً لمدة 48 ساعة.'
              : 'Practice all Course 1 MCQs free for 48h.'}
          </p>
        </div>

        {/* LINE SEPARATING TRIAL FROM CODE ENTRY SECTION */}
        <div className="w-full border-b border-[#D9E2CE] my-4" />

        {/* SECTION 3: 13-FIGURE SUBSCRIPTION CODE (100 LOGINS) */}
        <div>
          <div className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center justify-center gap-1.5 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isRTL ? 'كود الاشتراك (13 رقماً - 100 دخول):' : 'Access Code (13 Figures - 100 Logins):'}</span>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder={isRTL ? 'أدخل كود الـ 13 رقماً' : 'Enter 13-figure code'}
              className="flex-1 px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-xl border border-[#D9E2CE] bg-white text-slate-900 focus:outline-none focus:border-emerald-500 text-center font-bold"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              title={isRTL ? 'تفعيل الكود' : 'Unlock Code'}
              aria-label={isRTL ? 'تفعيل الكود' : 'Unlock Code'}
              className="w-11 h-10 rounded-xl btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-xs disabled:opacity-50 transition-transform active:scale-95 shrink-0"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isRTL ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </form>

          <p className="mt-1.5 text-[10px] text-slate-500 text-center">
            {isRTL
              ? 'ملاحظة: هذا الكود مخصص للمرحلة الأولى فقط ولا يمكن استخدامه للمراحل الأخرى.'
              : 'Notice: This code works strictly for Course 1 (First Level) and not other courses.'}
          </p>

          {errorMessage && (
            <p className="mt-2 text-xs text-rose-700 font-bold bg-rose-50 p-2.5 rounded-xl border-2 border-rose-300">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="mt-2 text-xs text-emerald-800 font-bold bg-emerald-50 p-2.5 rounded-xl border-2 border-emerald-300 flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> {successMessage}
            </p>
          )}
        </div>

        {/* LINE SEPARATING CODE ENTRY FROM WHATSAPP SECTION */}
        <div className="w-full border-b border-[#D9E2CE] my-4" />

        {/* SECTION 4: DIRECT WHATSAPP LINK - ICON ONLY */}
        <div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={isRTL ? `طلب كود الاشتراك عبر واتساب (${PRICE_IQD})` : `Get 100-Login Code via WhatsApp (${PRICE_IQD})`}
            aria-label={isRTL ? `طلب كود الاشتراك عبر واتساب (${PRICE_IQD})` : `Get 100-Login Code via WhatsApp (${PRICE_IQD})`}
            className="w-full py-3.5 px-4 rounded-xl btn-glossy-olive text-white flex items-center justify-center cursor-pointer active:scale-[0.99] shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <p className="mt-1 text-[10px] text-slate-400 text-center">
            {isRTL
              ? `الرقم المعتمد: ${ownerWhatsApp}`
              : `Pre-configured payment: ${ownerWhatsApp}`}
          </p>
        </div>

        {/* LINE SEPARATING WHATSAPP FROM SETTINGS SECTION */}
        <div className="w-full border-b border-[#D9E2CE] my-4" />

        {/* SECTION 5: WHATSAPP SETTINGS */}
        <div className="flex flex-col items-center justify-center text-xs text-slate-500 mb-3">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            title={isRTL ? 'تعديل رقم واتساب المستلم' : 'Edit WhatsApp Number'}
            aria-label={isRTL ? 'تعديل رقم واتساب المستلم' : 'Edit WhatsApp Number'}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>

          {showSettings && (
            <form onSubmit={handleSavePhone} className="mt-2.5 w-full p-3 bg-slate-50 rounded-2xl border border-[#D9E2CE] text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="9647700000000"
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  title={isRTL ? 'حفظ' : 'Save'}
                  aria-label={isRTL ? 'حفظ' : 'Save'}
                  className="w-9 h-8 rounded-xl btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-xs"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* SECTION 6: LOG OUT BUTTON DOWN OF THE PAGE - ICON ONLY */}
        <div className="pt-2 border-t border-[#D9E2CE] flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => signOutUser()}
            title={isRTL ? 'تسجيل الخروج من الحساب' : 'Log Out of Account'}
            aria-label={isRTL ? 'تسجيل الخروج من الحساب' : 'Log Out of Account'}
            className="w-10 h-10 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
