import React, { useState } from 'react';
import {
  GraduationCap,
  Brain,
  Sparkles,
  Microscope,
  FlaskConical,
  Atom,
  ChevronRight,
  ChevronLeft,
  Play,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
} from 'lucide-react';
import { DentalSubject, DENTAL_FACULTY_SUBJECTS } from '../data/dentalSubjects';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Question } from '../types/quiz';
import { fetchCnsTestQuestions } from '../services/cnsTestService';

interface DentalFacultyHubProps {
  onSelectSubject: (subject: DentalSubject) => void;
  onLaunchQuiz: () => void;
  questions: Question[];
  onQuestionsUpdated: (questions: Question[]) => void;
}

export const DentalFacultyHub: React.FC<DentalFacultyHubProps> = ({
  onSelectSubject,
  onLaunchQuiz,
  questions,
  onQuestionsUpdated,
}) => {
  const { isRTL } = useLanguage();
  const { timeLeftFormatted, isTrialActive, isPermanent } = useAuth();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('general-human-anatomy');
  const [isLoadingCns, setIsLoadingCns] = useState<boolean>(false);
  const [notice, setNotice] = useState<{ message: string; type: 'info' | 'success' } | null>(null);

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'dental-anatomy':
        return <Sparkles className="w-6 h-6 text-orange-500" />;
      case 'general-human-anatomy':
        return <Brain className="w-6 h-6 text-orange-500" />;
      case 'medical-biology':
        return <Microscope className="w-6 h-6 text-orange-500" />;
      case 'medical-chemistry':
        return <FlaskConical className="w-6 h-6 text-orange-500" />;
      case 'medical-physics':
        return <Atom className="w-6 h-6 text-orange-500" />;
      default:
        return <BookOpen className="w-6 h-6 text-orange-500" />;
    }
  };

  const handleSubjectClick = async (subject: DentalSubject) => {
    setSelectedSubjectId(subject.id);
    onSelectSubject(subject);

    if (subject.id === 'general-human-anatomy') {
      // General Human Anatomy has CNS Test MCQs (105 questions)
      if (questions.length === 0) {
        setIsLoadingCns(true);
        try {
          const { questions: cnsQuestions, count } = await fetchCnsTestQuestions();
          onQuestionsUpdated(cnsQuestions);
          setNotice({
            type: 'success',
            message: isRTL
              ? `تم تحميل ${count} سؤال لاختبار الجهاز العصبي المركزي (CNS Test) بنجاح!`
              : `Loaded ${count} CNS Test MCQs successfully!`,
          });
        } catch (err: any) {
          setNotice({
            type: 'info',
            message: err.message || 'Error loading CNS questions',
          });
        } finally {
          setIsLoadingCns(false);
        }
      }
      onLaunchQuiz();
    } else {
      // Other 4 dental faculty subjects that will be attached later to MCQs
      setNotice({
        type: 'info',
        message: isRTL
          ? `مادة ${subject.nameAr} جاهزة للربط مع بنك أسئلة الـ MCQ قريباً. يمكنك التدريب على تشريح الجهاز العصبي (CNS Test) حالياً!`
          : `${subject.nameEn} is configured and ready for MCQs attachment. You can practice General Human Anatomy (CNS Test - 105 MCQs) now!`,
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      {/* SECTION 1: HEADER BANNER - DENTAL FACULTY (FIRST LEVEL) */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 font-extrabold text-xs">
                <GraduationCap className="w-4 h-4 text-orange-500" />
                <span>{isRTL ? 'المرحلة الأولى' : 'First Level'}</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-bold text-sky-600">
                {isRTL ? '5 مواد دراسية معتمدة' : '5 Core Dental Subjects'}
              </span>
              {isTrialActive && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    <Clock className="w-3 h-3" />
                    <span>{isRTL ? `تجربة مجانية: ${timeLeftFormatted}` : `24h Trial: ${timeLeftFormatted}`}</span>
                  </span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isRTL ? 'كلية طب الأسنان (المرحلة الأولى)' : 'Dental faculty (first level)'}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {isRTL
                ? 'اختر المادة الدراسية لبدء حل أسئلة الاختيار من متعدد (MCQ)، التدريب الذاتي، أو الاختبارات المؤقتة الخاصة بطلبة طب الأسنان.'
                : 'Select a subject below to start multiple-choice questions (MCQ), self-paced practice, or timed exams for first-year dental students.'}
            </p>
          </div>

          {/* Quick Start / Active Badge */}
          <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs shrink-0">
            <div className="text-right rtl:text-left">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                {isRTL ? 'الأسئلة النشطة' : 'Active MCQs'}
              </div>
              <div className="font-mono text-xl font-extrabold text-orange-500">
                {questions.length > 0 ? questions.length : 105}
              </div>
            </div>
            <Zap className="h-7 w-7 text-orange-500 shrink-0" />
          </div>
        </div>
      </div>

      {/* LINE SEPARATING HEADER FROM SUBJECTS LIST */}
      <div className="w-full border-b-2 border-slate-200 my-6" />

      {/* Notification banner if subject is clicked */}
      {notice && (
        <div
          className={`mb-6 p-4 rounded-2xl border-2 flex items-start justify-between gap-3 ${
            notice.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-orange-50 border-orange-200 text-orange-950'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {notice.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            )}
            <p className="text-xs font-bold leading-relaxed">{notice.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* SECTION 2: SUBJECTS OF DENTAL FACULTIES (FIRST LEVEL) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <span>{isRTL ? 'مواد المرحلة الأولى:' : 'First Level Subjects:'}</span>
          </h2>
          <span className="text-[11px] font-bold text-slate-400">
            {isRTL ? 'اضغط على أي مادة للاختيار' : 'Click any subject to open'}
          </span>
        </div>

        {/* The 5 Dental Faculty Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DENTAL_FACULTY_SUBJECTS.map((subject, idx) => {
            const isSelected = selectedSubjectId === subject.id;

            return (
              <div
                key={subject.id}
                className={`rounded-2xl border-2 bg-white p-5 shadow-xs transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/20'
                    : 'border-slate-200 hover:border-orange-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
                      {getSubjectIcon(subject.id)}
                    </div>
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-slate-100 border border-slate-200 text-slate-600">
                      {subject.code}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {isRTL ? subject.nameAr : subject.nameEn}
                  </h3>

                  <div className="text-[11px] font-semibold text-sky-600 mt-0.5">
                    {isRTL ? subject.nameEn : subject.nameAr}
                  </div>

                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed min-h-[3.5rem]">
                    {isRTL ? subject.descriptionAr : subject.descriptionEn}
                  </p>

                  <div className="mt-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${
                        subject.hasQuestions
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}
                    >
                      {subject.hasQuestions && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      <span>{isRTL ? subject.badgeAr : subject.badgeEn}</span>
                    </span>
                  </div>
                </div>

                {/* Orange Glossy Rounded Button for Each Subject */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={isLoadingCns && subject.id === 'general-human-anatomy'}
                    onClick={() => handleSubjectClick(subject)}
                    className="w-full py-3 px-4 rounded-2xl text-xs font-black btn-glossy-orange flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
                  >
                    {isLoadingCns && subject.id === 'general-human-anatomy' ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : subject.hasQuestions ? (
                      <Play className="w-3.5 h-3.5 fill-white" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {subject.nameEn}
                    </span>
                    {isRTL ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LINE SEPARATING SUBJECTS FROM SUMMARY FOOTER */}
      <div className="w-full border-b-2 border-slate-200 my-6" />

      {/* SECTION 3: QUICK CNS TEST DIRECT LAUNCH */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left rtl:sm:text-right">
          <div className="w-12 h-12 rounded-2xl btn-glossy-orange flex items-center justify-center text-white shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">
              {isRTL ? 'اختبار الجهاز العصبي المركزي (CNS Test - 105 أسئلة)' : 'CNS Test (Central Nervous System - 105 MCQs)'}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {isRTL
                ? 'مرتبط بمادة التشريح البشري العام ومتاح للبدء الفوري.'
                : 'Linked to General Human Anatomy and ready for instant practice or exam.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const anat = DENTAL_FACULTY_SUBJECTS.find((s) => s.id === 'general-human-anatomy');
            if (anat) handleSubjectClick(anat);
          }}
          className="w-full sm:w-auto px-7 py-3 rounded-2xl text-xs font-black btn-glossy-orange flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>{isRTL ? 'بدء اختبار الـ CNS الآن' : 'Start CNS Test Now'}</span>
        </button>
      </div>
    </div>
  );
};
