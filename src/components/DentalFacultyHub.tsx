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
} from 'lucide-react';
import { DentalSubject, DENTAL_FACULTY_SUBJECTS } from '../data/dentalSubjects';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Question, UserProfile } from '../types/quiz';
import { fetchTerminologyTestQuestions } from '../services/terminologyTestService';
import { ComputerSectionsModal } from './ComputerSectionsModal';
import { DentalAnatomySectionsModal } from './DentalAnatomySectionsModal';
import { HumanAnatomySectionsModal } from './HumanAnatomySectionsModal';

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
}) => {
  const { isRTL } = useLanguage();
  const {
    remainingAttempts,
    maxAttempts,
  } = useAuth();

  const [loadingSubjectId, setLoadingSubjectId] = useState<string | null>(null);
  const [isComputerModalOpen, setIsComputerModalOpen] = useState<boolean>(false);
  const [isDentalAnatomyModalOpen, setIsDentalAnatomyModalOpen] = useState<boolean>(false);
  const [isHumanAnatomyModalOpen, setIsHumanAnatomyModalOpen] = useState<boolean>(false);
  const [notice, setNotice] = useState<{ message: string; type: 'info' | 'success' } | null>(null);

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
          container: 'bg-gradient-to-br from-rose-400 via-rose-500 to-pink-600 shadow-xs text-white opacity-80',
        };
      case 'medical-chemistry':
        return {
          icon: <FlaskConical className="w-5 h-5 text-white" />,
          container: 'bg-gradient-to-br from-teal-400 via-emerald-500 to-emerald-600 shadow-xs text-white opacity-80',
        };
      case 'medical-physics':
        return {
          icon: <Atom className="w-5 h-5 text-white" />,
          container: 'bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500 shadow-xs text-white opacity-80',
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
    } else if (subject.id === 'medical-terminology') {
      setLoadingSubjectId('medical-terminology');
      try {
        const { questions: termQuestions } = await fetchTerminologyTestQuestions();
        onQuestionsUpdated(termQuestions);
        onLaunchQuiz();
      } catch (err: any) {
        setNotice({
          type: 'info',
          message: err.message || 'Error loading Medical Terminology questions',
        });
      } finally {
        setLoadingSubjectId(null);
      }
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

      {/* GENERAL HUMAN ANATOMY 5 SECTIONS MODAL */}
      <HumanAnatomySectionsModal
        isOpen={isHumanAnatomyModalOpen}
        onClose={() => setIsHumanAnatomyModalOpen(false)}
        onQuestionsLoaded={(newQuestions, sectionName) => {
          onQuestionsUpdated(newQuestions);
          onLaunchQuiz();
        }}
      />
    </div>
  );
};
