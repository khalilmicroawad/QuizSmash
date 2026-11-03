import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  BookOpen,
  Info,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface CourseStage {
  id: string;
  stageNumber: number;
  nameEn: string;
  nameAr: string;
  subtitleEn: string;
  subtitleAr: string;
  subjectsCount: number;
  isFunctional: boolean;
  statusBadgeEn: string;
  statusBadgeAr: string;
  keySubjectsEn: string[];
  keySubjectsAr: string[];
}

export const DENTAL_COURSES: CourseStage[] = [
  {
    id: 'stage-1',
    stageNumber: 1,
    nameEn: 'First Course (First Level)',
    nameAr: 'المرحلة الأولى (كلية طب الأسنان)',
    subtitleEn: 'Foundational dental sciences, computer literacy, human anatomy & clinical terminology.',
    subtitleAr: 'العلوم الأساسية لطب الأسنان، مهارات الحاسوب (7 أقسام)، التشريح البشري، والمصطلحات الطبية.',
    subjectsCount: 7,
    isFunctional: true,
    statusBadgeEn: 'Active & Available',
    statusBadgeAr: 'متاح ونشط الآن',
    keySubjectsEn: ['Computer (7 Sections / 175 MCQs)', 'General Anatomy (CNS Test / 105 MCQs)', 'Medical Terminology (100 MCQs)', 'Dental Anatomy'],
    keySubjectsAr: ['الحاسوب (7 أقسام / 175 سؤال)', 'التشريح العام (اختبار CNS / 105 سؤال)', 'المصطلحات الطبية (100 سؤال)', 'تشريح الأسنان'],
  },
  {
    id: 'stage-2',
    stageNumber: 2,
    nameEn: 'Second Course (Second Level)',
    nameAr: 'المرحلة الثانية (طب الأسنان)',
    subtitleEn: 'Oral histology, head and neck anatomy, general pathology, and physiology.',
    subtitleAr: 'الأنسجة الفموية، تشريح الرأس والعنق المتقدم، علم الأمراض العام، ووظائف الأعضاء.',
    subjectsCount: 6,
    isFunctional: false,
    statusBadgeEn: 'Coming Soon · Not Active',
    statusBadgeAr: 'قريباً · غير متاح حالياً',
    keySubjectsEn: ['Oral Histology', 'Head & Neck Anatomy', 'General Pathology', 'Medical Microbiology'],
    keySubjectsAr: ['أنسجة الفم والأسنان', 'تشريح الرأس والعنق', 'علم الأمراض العام', 'الأحياء المجهرية'],
  },
  {
    id: 'stage-3',
    stageNumber: 3,
    nameEn: 'Third Course (Third Level)',
    nameAr: 'المرحلة الثالثة (طب الأسنان)',
    subtitleEn: 'Pharmacology, conservative dentistry, dental radiology, and oral pathology.',
    subtitleAr: 'علم الأدوية، معالجة الأسنان التحفظية، الأشعة التشخيصية، وأمراض الفم.',
    subjectsCount: 6,
    isFunctional: false,
    statusBadgeEn: 'Coming Soon · Not Active',
    statusBadgeAr: 'قريباً · غير متاح حالياً',
    keySubjectsEn: ['Pharmacology', 'Conservative Dentistry', 'Dental Radiology', 'Oral Pathology'],
    keySubjectsAr: ['علم الأدوية', 'طب الأسنان التحفظي', 'أشعة الأسنان', 'أمراض الفم'],
  },
  {
    id: 'stage-4',
    stageNumber: 4,
    nameEn: 'Fourth Course (Fourth Level)',
    nameAr: 'المرحلة الرابعة (طب الأسنان)',
    subtitleEn: 'Periodontology, removable prosthodontics, oral surgery, and orthodontics.',
    subtitleAr: 'طب أمراض اللثة، صناعة الأسنان المتحركة، جراحة الفم والفكين، وتقويم الأسنان.',
    subjectsCount: 7,
    isFunctional: false,
    statusBadgeEn: 'Coming Soon · Not Active',
    statusBadgeAr: 'قريباً · غير متاح حالياً',
    keySubjectsEn: ['Periodontology', 'Oral Surgery', 'Prosthodontics', 'Orthodontics'],
    keySubjectsAr: ['أمراض وجراحة اللثة', 'جراحة الفم الصغرى', 'صناعة الأسنان', 'تقويم الأسنان'],
  },
  {
    id: 'stage-5',
    stageNumber: 5,
    nameEn: 'Fifth Course (Fifth Level)',
    nameAr: 'المرحلة الخامسة (سنة التخرج)',
    subtitleEn: 'Comprehensive clinical care, implantology, pediatric dentistry, and maxillofacial surgery.',
    subtitleAr: 'العلاج السريري الشامل، زراعة الأسنان، طب أسنان الأطفال، وجراحة الوجه والفكين.',
    subjectsCount: 8,
    isFunctional: false,
    statusBadgeEn: 'Coming Soon · Not Active',
    statusBadgeAr: 'قريباً · غير متاح حالياً',
    keySubjectsEn: ['Implantology', 'Pediatric Dentistry', 'Maxillofacial Surgery', 'Clinical Comprehensive'],
    keySubjectsAr: ['زراعة الأسنان', 'طب أسنان الأطفال', 'جراحة الوجه والفكين', 'العيادات الشاملة'],
  },
];

interface CourseSelectionViewProps {
  onSelectCourse: (course: CourseStage) => void;
}

export const CourseSelectionView: React.FC<CourseSelectionViewProps> = ({ onSelectCourse }) => {
  const { isRTL } = useLanguage();
  const [inactiveNotice, setInactiveNotice] = useState<string | null>(null);

  const handleCardClick = (course: CourseStage) => {
    if (course.isFunctional) {
      setInactiveNotice(null);
      onSelectCourse(course);
    } else {
      setInactiveNotice(
        isRTL
          ? `عذراً! ${course.nameAr} قيد الإعداد والتطوير حالياً وغير مفعلة في هذا الإصدار. يرجى اختيار "المرحلة الأولى" المتاحة والنشطة حالياً.`
          : `Notice: ${course.nameEn} is currently under preparation and not active yet. Please select "First Course (First Level)" which is fully functional.`
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* HEADER SECTION */}
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-md mb-3 bg-white border border-slate-200 overflow-hidden">
          <img
            src="/assets/aistudio/icon_9d2c6e5c.png"
            alt="Quiz Smash Logo"
            className="w-16 h-16 object-contain"
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 text-xs font-black mb-2">
          <GraduationCap className="w-3.5 h-3.5 text-orange-500" />
          <span>{isRTL ? 'الخطوة التمهيدية: تحديد المرحلة الدراسية' : 'Preliminary Step: Choose Your Course'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {isRTL ? 'اختر مرحلتك الدراسية في كلية طب الأسنان' : 'Select Your Dental Faculty Course'}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          {isRTL
            ? 'حدد المرحلة الدراسية للمتابعة إلى تسجيل الدخول وبدء تدريبات وامتحانات الاختيار من متعدد (MCQ) مع المؤقت الفوري وحساب رصيد الـ 100 تسجيل دخول.'
            : 'Select your course below to proceed to Sign In / Sign Up and access high-yield MCQ banks with 30s countdown mode and subscription login tracking.'}
        </p>
      </div>

      {/* NOTICE TOAST FOR INACTIVE COURSES */}
      {inactiveNotice && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs sm:text-sm font-bold flex items-start gap-3 shadow-xs animate-in fade-in slide-in-from-top-2">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p>{inactiveNotice}</p>
          </div>
          <button
            type="button"
            onClick={() => setInactiveNotice(null)}
            className="text-amber-700 hover:text-amber-950 text-xs underline cursor-pointer"
          >
            {isRTL ? 'إغلاق' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* COURSES LIST / GRID */}
      <div className="space-y-4">
        {DENTAL_COURSES.map((course) => {
          const isFirst = course.stageNumber === 1;

          return (
            <div
              key={course.id}
              onClick={() => handleCardClick(course)}
              className={`rounded-2xl border-2 p-5 sm:p-6 transition-all duration-200 cursor-pointer relative ${
                course.isFunctional
                  ? 'bg-white border-orange-400 hover:border-orange-500 shadow-md hover:shadow-lg ring-4 ring-orange-100'
                  : 'bg-slate-50/80 border-slate-200 opacity-70 hover:opacity-90 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-base font-black ${
                      course.isFunctional
                        ? 'btn-glossy-orange text-white shadow-md'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {course.stageNumber}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-base sm:text-lg font-black text-slate-900">
                        {isRTL ? course.nameAr : course.nameEn}
                      </h2>
                      <span
                        className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                          course.isFunctional
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-slate-200 text-slate-600 border-slate-300'
                        }`}
                      >
                        {course.isFunctional
                          ? isRTL ? course.statusBadgeAr : course.statusBadgeEn
                          : isRTL ? course.statusBadgeAr : course.statusBadgeEn}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                      {isRTL ? course.subtitleAr : course.subtitleEn}
                    </p>

                    {/* Key subjects preview */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      {(isRTL ? course.keySubjectsAr : course.keySubjectsEn).map((sub, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="shrink-0 flex items-center justify-end sm:justify-center pt-2 sm:pt-0">
                  {course.isFunctional ? (
                    <button
                      type="button"
                      className="py-2.5 px-4 rounded-xl btn-glossy-orange text-xs font-black text-white flex items-center gap-2 cursor-pointer shadow-sm hover:scale-102 transition-transform"
                    >
                      <span>{isRTL ? 'دخول المرحلة الأولى' : 'Select Course 1'}</span>
                      {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isRTL ? 'غير متاح حالياً' : 'Unavailable'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER NOTICE */}
      <div className="mt-8 text-center text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 inline mr-1 text-sky-600" />
        <span>
          {isRTL
            ? 'المرحلة الأولى مفعلة بالكامل مع جميع المواد (7 أقسام حاسوب، تشريح CNS، مصطلحات طبية). المراحل 2 إلى 5 ستتاح تباعاً.'
            : 'First Level is 100% active with all 7 computer sections, CNS test, and terminology. Stages 2 to 5 will roll out soon.'}
        </span>
      </div>
    </div>
  );
};
