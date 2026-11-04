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
        <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs mb-3 bg-white border border-slate-200 overflow-hidden">
          <img
            src="/assets/aistudio/icon_9d2c6e5c.png"
            alt="Quiz Smash Logo"
            className="w-14 h-14 object-contain"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {isRTL ? 'اختر مرحلتك الدراسية' : 'Select Your Dental Course'}
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {isRTL
            ? 'حدد المرحلة الدراسية للمتابعة إلى تسجيل الدخول وبدء الأسئلة'
            : 'Select your level to continue to your course quiz bank'}
        </p>
      </div>

      {/* NOTICE TOAST FOR INACTIVE COURSES */}
      {inactiveNotice && (
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-medium flex items-start gap-3 animate-in fade-in">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p>{inactiveNotice}</p>
          </div>
          <button
            type="button"
            onClick={() => setInactiveNotice(null)}
            className="w-6 h-6 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="text-sm">✕</span>
          </button>
        </div>
      )}

      {/* COURSES LIST / GRID */}
      <div className="space-y-3.5">
        {DENTAL_COURSES.map((course) => {
          return (
            <div
              key={course.id}
              onClick={() => handleCardClick(course)}
              className={`rounded-2xl border p-5 transition-all duration-150 cursor-pointer ${
                course.isFunctional
                  ? 'bg-white border-emerald-500 shadow-sm hover:shadow-md ring-2 ring-emerald-50'
                  : 'bg-[#FAFBF8] border-slate-200 opacity-60 hover:opacity-80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-sm font-black shadow-xs ${
                      course.isFunctional
                        ? 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-emerald-500/30'
                        : course.stageNumber === 2
                        ? 'bg-gradient-to-br from-sky-400 to-blue-600 text-white opacity-80'
                        : course.stageNumber === 3
                        ? 'bg-gradient-to-br from-violet-400 to-purple-600 text-white opacity-80'
                        : course.stageNumber === 4
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white opacity-80'
                        : 'bg-gradient-to-br from-rose-400 to-pink-600 text-white opacity-80'
                    }`}
                  >
                    {course.stageNumber}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-base font-bold text-slate-900">
                        {isRTL ? course.nameAr : course.nameEn}
                      </h2>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          course.isFunctional
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {course.isFunctional
                          ? isRTL ? course.statusBadgeAr : course.statusBadgeEn
                          : isRTL ? 'قريباً' : 'Coming Soon'}
                      </span>
                    </div>

                    <p className="text-xs text-[#556B2F] max-w-xl leading-relaxed">
                      {isRTL ? course.subtitleAr : course.subtitleEn}
                    </p>

                    {/* Key subjects preview */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {(isRTL ? course.keySubjectsAr : course.keySubjectsEn).map((sub, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F2F5ED] text-[#4D5D28] border border-[#D9E2CE]"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Action Button - Icon Only */}
                <div className="shrink-0 flex items-center justify-end sm:justify-center">
                  {course.isFunctional ? (
                    <button
                      type="button"
                      title={isRTL ? 'دخول المرحلة الأولى' : 'Select Level 1'}
                      aria-label={isRTL ? 'دخول المرحلة الأولى' : 'Select Level 1'}
                      className="w-11 h-11 rounded-xl btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-sm transition-transform active:scale-95"
                    >
                      {isRTL ? <ArrowLeft className="w-5 h-5 text-white" /> : <ArrowRight className="w-5 h-5 text-white" />}
                    </button>
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center text-slate-400 bg-slate-100 rounded-xl">
                      <Lock className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
