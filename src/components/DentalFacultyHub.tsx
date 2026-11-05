import React, { useState } from 'react';
import {
  GraduationCap,
  Brain,
  Sparkles,
  Microscope,
  FlaskConical,
  Atom,
  Play,
  Zap,
  ArrowRight,
  ArrowLeft,
  BookMarked,
  Monitor,
  CheckCircle2,
  Timer,
  TrendingUp,
  Target,
  Flame,
  Trophy,
  Award,
} from 'lucide-react';
import { DentalSubject, DENTAL_FACULTY_SUBJECTS } from '../data/dentalSubjects';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Question, UserProfile } from '../types/quiz';
import { ComputerSectionsModal } from './ComputerSectionsModal';
import { DentalAnatomySectionsModal } from './DentalAnatomySectionsModal';
import { HumanAnatomySectionsModal } from './HumanAnatomySectionsModal';
import { MedicalBiologySectionsModal } from './MedicalBiologySectionsModal';
import { MedicalPhysicsSectionsModal } from './MedicalPhysicsSectionsModal';
import { MedicalChemistrySectionsModal } from './MedicalChemistrySectionsModal';
import { MedicalTerminologySectionsModal } from './MedicalTerminologySectionsModal';

interface DentalFacultyHubProps {
  onSelectSubject: (subject: DentalSubject) => void;
  onLaunchQuiz: () => void;
  questions: Question[];
  onQuestionsUpdated: (questions: Question[]) => void;
  activeProfile?: UserProfile;
}

export const DentalFacultyHub: React.FC<DentalFacultyHubProps> = ({
  onSelectSubject,
  onLaunchQuiz,
  onQuestionsUpdated,
  activeProfile,
}) => {
  const { isRTL } = useLanguage();
  const {
    remainingAttempts,
    maxAttempts,
    isTrialActive,
    timeLeftFormatted,
  } = useAuth();

  const [loadingSubjectId, setLoadingSubjectId] = useState<string | null>(null);
  const [isComputerModalOpen, setIsComputerModalOpen] = useState<boolean>(false);
  const [isDentalAnatomyModalOpen, setIsDentalAnatomyModalOpen] = useState<boolean>(false);
  const [isHumanAnatomyModalOpen, setIsHumanAnatomyModalOpen] = useState<boolean>(false);
  const [isBiologyModalOpen, setIsBiologyModalOpen] = useState<boolean>(false);
  const [isPhysicsModalOpen, setIsPhysicsModalOpen] = useState<boolean>(false);
  const [isChemistryModalOpen, setIsChemistryModalOpen] = useState<boolean>(false);
  const [isTerminologyModalOpen, setIsTerminologyModalOpen] = useState<boolean>(false);
  const [notice, setNotice] = useState<{ message: string; type: 'info' | 'success' } | null>(null);

  const totalCorrect = activeProfile?.totalCorrect || 0;
  const totalWrong = activeProfile?.totalWrong || 0;
  const totalAnswered = totalCorrect + totalWrong;
  const accuracyPercent = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const bestStreak = activeProfile?.bestStreak || 0;
  const totalQuizzes = activeProfile?.totalQuizzes || 0;
  const highScore = activeProfile?.highScore || 0;

  const getSubjectIconData = (id: string) => {
    switch (id) {
      case 'computer':
        return {
          icon: <Monitor className="w-5 h-5 text-white" />,
          container: 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 shadow-sm shadow-sky-500/30 text-white',
        };
      case 'dental-anatomy':
        return {
          icon: <span className="text-xl leading-none">🦷</span>,
          container: 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-sm shadow-emerald-500/30 text-white',
        };
      case 'general-human-anatomy':
        return {
          icon: <Brain className="w-5 h-5 text-white" />,
          container: 'bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 shadow-sm shadow-purple-500/30 text-white',
        };
      case 'medical-terminology':
        return {
          icon: <BookMarked className="w-5 h-5 text-white" />,
          container: 'bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 shadow-sm shadow-amber-500/30 text-white',
        };
      case 'medical-biology':
        return {
          icon: <Microscope className="w-5 h-5 text-white" />,
          container: 'bg-gradient-to-br from-rose-400 via-rose-500 to-pink-600 shadow-sm shadow-rose-500/30 text-white',
        };
      case 'medical-chemistry':
        return {
          icon: <FlaskConical className="w-5 h-5 text-white" />,
          container: 'bg-gradient-to-br from-teal-400 via-emerald-500 to-emerald-600 shadow-sm shadow-teal-500/30 text-white',
        };
      case 'medical-physics':
        return {
          icon: <Atom className="w-5 h-5 text-white" />,
          container: 'bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500 shadow-sm shadow-blue-500/30 text-white',
        };
      default:
        return {
          icon: <GraduationCap className="w-5 h-5 text-white" />,
          container: 'bg-gradient-to-br from-emerald-500 to-teal-700 shadow-xs text-white',
        };
    }
  };

  const handleSubjectClick = async (subject: DentalSubject) => {
    onSelectSubject(subject);

    if (subject.id === 'computer') {
      setIsComputerModalOpen(true);
      return;
    } else if (subject.id === 'dental-anatomy') {
      setIsDentalAnatomyModalOpen(true);
      return;
    } else if (subject.id === 'general-human-anatomy') {
      setIsHumanAnatomyModalOpen(true);
      return;
    } else if (subject.id === 'medical-biology') {
      setIsBiologyModalOpen(true);
      return;
    } else if (subject.id === 'medical-physics') {
      setIsPhysicsModalOpen(true);
      return;
    } else if (subject.id === 'medical-chemistry') {
      setIsChemistryModalOpen(true);
      return;
    } else if (subject.id === 'medical-terminology') {
      setIsTerminologyModalOpen(true);
      return;
    } else {
      setNotice({
        type: 'info',
        message: isRTL
          ? `مادة ${subject.nameAr} قيد الإعداد وقريباً ستكون متاحة.`
          : `${subject.nameEn} will be available soon.`,
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      {/* SIMPLIFIED HEADER (EMERALD & OLIVE) */}
      <div className="rounded-2xl border border-[#D9E2CE] bg-white p-5 sm:p-6 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F2F5ED] text-[#4D5D28] text-xs font-bold mb-2 border border-[#D9E2CE]">
              <GraduationCap className="w-3.5 h-3.5 text-[#556B2F]" />
              <span>{isRTL ? 'المرحلة الأولى' : 'First Level'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isRTL ? 'كلية طب الأسنان' : 'Dental Faculty'}
            </h1>
            <p className="mt-1 text-xs text-[#556B2F]">
              {isRTL
                ? 'اختر المادة لبدء بنوك الأسئلة مع مؤقت الـ 30 ثانية أو وضع الدراسة'
                : 'Select a subject below to practice or take a 30s timed exam'}
            </p>
          </div>

          {/* Clean Remaining Attempts Badge */}
          <div className="flex items-center gap-2 self-start sm:self-center px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 shrink-0 shadow-xs">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
            <div className="text-xs font-bold">
              <span className="font-mono text-sm font-black text-emerald-700">{remainingAttempts}</span>
              <span className="text-emerald-500 font-normal"> / {maxAttempts} </span>
              <span>{isRTL ? 'محاولة متبقية' : 'Attempts Left'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-DAY FREE TRIAL ACTIVE BANNER */}
      {isTrialActive && (
        <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-[#F2F5ED] to-emerald-50 border border-emerald-300 shadow-xs flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-emerald-950 font-medium">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Timer className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-emerald-900">
                {isRTL ? 'تجربة مجانية شاملة (يومان / 48 ساعة) مفعلة' : '2-Day Full Free Trial Active'}
              </span>
              <span className="hidden sm:inline text-[#4D5D28] mx-1">
                — {isRTL ? 'جميع بنوك أسئلة المرحلة الأولى متاحة لك بالكامل' : 'All Course 1 question banks are fully accessible'}
              </span>
            </div>
          </div>
          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-xl bg-white border border-emerald-200 text-emerald-800 shrink-0">
            {timeLeftFormatted}
          </span>
        </div>
      )}

      {/* NOTICE TOAST */}
      {notice && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-medium flex items-center justify-between gap-3">
          <span>{notice.message}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="w-7 h-7 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="text-sm">✕</span>
          </button>
        </div>
      )}

      {/* VISUAL USER PROGRESS CARD - SIMPLE & SATISFYING */}
      <div className="mb-6 rounded-2xl border border-[#D9E2CE] bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-xs shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 leading-tight">
                {isRTL ? 'إنجازك وتقدمك الدراسي' : 'Your Learning Progress'}
              </h2>
              <p className="text-[11px] text-[#4D5D28]">
                {isRTL
                  ? totalAnswered > 0
                    ? `تم حل ${totalAnswered} سؤالاً عبر بنوك الأسئلة المختلفة`
                    : 'ابدأ حل أي مادة أدناه لبدء تسجيل تقدمك'
                  : totalAnswered > 0
                  ? `${totalAnswered} questions practiced across question banks`
                  : 'Start practicing any subject below to track your progress'}
              </p>
            </div>
          </div>

          {/* Accuracy Badge */}
          <div className="flex items-center gap-2 self-start sm:self-center px-3 py-1.5 rounded-xl bg-[#F2F5ED] border border-[#D9E2CE]">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-black font-mono text-emerald-800">
              {accuracyPercent}%
            </span>
            <span className="text-[10px] text-[#4D5D28] font-bold">
              {isRTL ? 'دقة الإجابة' : 'Accuracy'}
            </span>
          </div>
        </div>

        {/* Smooth Satisfying Progress Track */}
        <div className="w-full bg-[#EAEFE2] h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-[#556B2F] transition-all duration-700 ease-out shadow-xs"
            style={{ width: `${Math.max(accuracyPercent > 0 ? accuracyPercent : totalAnswered > 0 ? 5 : 0, 0)}%` }}
          />
        </div>

        {/* 4 Clean Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3.5 pt-3 border-t border-[#F2F5ED]">
          <div className="p-2.5 rounded-xl bg-[#FAFBF8] border border-[#E6ECDC] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <div className="text-[10px] text-[#556B2F] font-bold">
                {isRTL ? 'إجابات صحيحة' : 'Correct'}
              </div>
              <div className="text-xs font-black font-mono text-slate-900">
                {totalCorrect}
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAFBF8] border border-[#E6ECDC] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            </div>
            <div>
              <div className="text-[10px] text-[#556B2F] font-bold">
                {isRTL ? 'أطول سلسلة' : 'Best Streak'}
              </div>
              <div className="text-xs font-black font-mono text-slate-900">
                {bestStreak}
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAFBF8] border border-[#E6ECDC] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <div className="text-[10px] text-[#556B2F] font-bold">
                {isRTL ? 'أعلى نتيجة' : 'High Score'}
              </div>
              <div className="text-xs font-black font-mono text-slate-900">
                {highScore}
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAFBF8] border border-[#E6ECDC] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-purple-700" />
            </div>
            <div>
              <div className="text-[10px] text-[#556B2F] font-bold">
                {isRTL ? 'جولات مكتملة' : 'Quizzes'}
              </div>
              <div className="text-xs font-black font-mono text-slate-900">
                {totalQuizzes}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUBJECTS GRID - CLEAN & MINIMAL WITH GLOSSY ICON-ONLY BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {DENTAL_FACULTY_SUBJECTS.map((subject) => {
          const isActive = subject.hasQuestions;
          const isLoading = loadingSubjectId === subject.id;

          return (
            <div
              key={subject.id}
              onClick={() => handleSubjectClick(subject)}
              className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between gap-3 ${
                isActive
                  ? 'bg-white border-[#D9E2CE] hover:border-emerald-500 hover:shadow-md'
                  : 'bg-[#FAFBF8] border-slate-200 opacity-60 hover:opacity-80'
              }`}
            >
              {(() => {
                const iconData = getSubjectIconData(subject.id);
                return (
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        iconData.container
                      }`}
                    >
                      {iconData.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#556B2F]">
                          {subject.code}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-200/60 text-slate-500'
                          }`}
                        >
                          {isActive
                            ? isRTL ? subject.badgeAr : subject.badgeEn
                            : isRTL ? 'قريباً' : 'Coming Soon'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                        {isRTL ? subject.nameAr : subject.nameEn}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {isRTL ? subject.descriptionAr : subject.descriptionEn}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {isActive && (
                <div className="pt-2 border-t border-[#F2F5ED] flex items-center justify-end">
                  <button
                    type="button"
                    title={isRTL ? 'فتح' : 'Launch'}
                    aria-label={isRTL ? 'فتح' : 'Launch'}
                    className="w-10 h-10 rounded-xl btn-glossy-emerald flex items-center justify-center cursor-pointer shadow-sm transition-transform active:scale-95"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isRTL ? (
                      <ArrowLeft className="w-5 h-5 text-white" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* COMPUTER 7 SECTIONS MODAL */}
      <ComputerSectionsModal
        isOpen={isComputerModalOpen}
        onClose={() => setIsComputerModalOpen(false)}
        onQuestionsLoaded={(newQuestions, sectionName) => {
          onQuestionsUpdated(newQuestions);
          onLaunchQuiz();
        }}
      />

      {/* DENTAL ANATOMY 4 SECTIONS MODAL */}
      <DentalAnatomySectionsModal
        isOpen={isDentalAnatomyModalOpen}
        onClose={() => setIsDentalAnatomyModalOpen(false)}
        onQuestionsLoaded={(newQuestions, sectionName) => {
          onQuestionsUpdated(newQuestions);
          onLaunchQuiz();
        }}
      />

      {/* MEDICAL BIOLOGY 4 SECTIONS MODAL */}
      <MedicalBiologySectionsModal
        isOpen={isBiologyModalOpen}
        onClose={() => setIsBiologyModalOpen(false)}
        onQuestionsLoaded={(newQuestions, sectionName) => {
          onQuestionsUpdated(newQuestions);
          onLaunchQuiz();
        }}
      />

      {/* MEDICAL PHYSICS 5 SECTIONS MODAL */}
      <MedicalPhysicsSectionsModal
        isOpen={isPhysicsModalOpen}
        onClose={() => setIsPhysicsModalOpen(false)}
        onQuestionsLoaded={(newQuestions, sectionName) => {
          onQuestionsUpdated(newQuestions);
          onLaunchQuiz();
        }}
      />

      {/* MEDICAL CHEMISTRY 8 SECTIONS MODAL */}
      <MedicalChemistrySectionsModal
        isOpen={isChemistryModalOpen}
        onClose={() => setIsChemistryModalOpen(false)}
        onQuestionsLoaded={(newQuestions, sectionName) => {
          onQuestionsUpdated(newQuestions);
          onLaunchQuiz();
        }}
      />

      {/* GENERAL HUMAN ANATOMY 5 SECTIONS MODAL */}
      <HumanAnatomySectionsModal
        isOpen={isHumanAnatomyModalOpen}
        onClose={() => setIsHumanAnatomyModalOpen(false)}
        onQuestionsLoaded={(newQuestions, sectionName) => {
          onQuestionsUpdated(newQuestions);
          onLaunchQuiz();
        }}
      />

      {/* MEDICAL TERMINOLOGY 4 SECTIONS MODAL */}
      <MedicalTerminologySectionsModal
        isOpen={isTerminologyModalOpen}
        onClose={() => setIsTerminologyModalOpen(false)}
        onQuestionsLoaded={(newQuestions, sectionName) => {
          onQuestionsUpdated(newQuestions);
          onLaunchQuiz();
        }}
      />
    </div>
  );
};
