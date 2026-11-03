import React, { useState } from 'react';
import {
  X,
  Monitor,
  Play,
  FileText,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import { COMPUTER_SECTIONS, ComputerSection } from '../data/computerSectionsData';
import { Question } from '../types/quiz';
import { fetchComputerSectionQuestions, fetchAllComputerSectionsQuestions } from '../services/computerTestService';
import { useLanguage } from '../context/LanguageContext';

interface ComputerSectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionsLoaded: (questions: Question[], sectionName: string) => void;
}

export const ComputerSectionsModal: React.FC<ComputerSectionsModalProps> = ({
  isOpen,
  onClose,
  onQuestionsLoaded,
}) => {
  const { isRTL } = useLanguage();
  const [loadingSectionId, setLoadingSectionId] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectSection = async (section: ComputerSection) => {
    setLoadingSectionId(section.id);
    setErrorNotice(null);

    try {
      const { questions, count } = await fetchComputerSectionQuestions(section.id);
      onQuestionsLoaded(questions, isRTL ? section.titleAr : section.titleEn);
      onClose();
    } catch (err: any) {
      setErrorNotice(err.message || 'Failed to load questions for this section.');
    } finally {
      setLoadingSectionId(null);
    }
  };

  const handleLaunchAllSections = async () => {
    setLoadingSectionId('all');
    setErrorNotice(null);

    try {
      const { questions, count } = await fetchAllComputerSectionsQuestions();
      onQuestionsLoaded(
        questions,
        isRTL ? `الحاسوب (جميع الأقسام الـ 7 - ${count} سؤال)` : `Computer (All 7 Sections - ${count} MCQs)`
      );
      onClose();
    } catch (err: any) {
      setErrorNotice(err.message || 'Failed to load combined questions.');
    } finally {
      setLoadingSectionId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-2 border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-[#FAF9F6]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl btn-glossy-orange text-white flex items-center justify-center shadow-md shrink-0">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-black uppercase mb-1">
                <Layers className="w-3 h-3 text-orange-600" />
                <span>{isRTL ? '7 أقسام معتمدة' : '7 Certified Sections'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {isRTL ? 'أقسام مادة الحاسوب والبرمجيات (COMP 107)' : 'Computer & Software Sections (COMP 107)'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isRTL
                  ? 'اختر القسم المطلوب للتدريب على أسئلته أو ابدأ الاختبار الشامل لجميع الأقسام'
                  : 'Choose a section below to practice its questions or launch the comprehensive bank'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ERROR NOTICE */}
        {errorNotice && (
          <div className="p-3 bg-rose-50 border-b border-rose-200 text-rose-700 text-xs font-bold text-center">
            {errorNotice}
          </div>
        )}

        {/* MASTER BUTTON: ALL SECTIONS COMBINED */}
        <div className="p-4 bg-orange-50/60 border-b border-orange-100 flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="font-black text-slate-900 block">
              {isRTL ? 'الاختبار الشامل لجميع الأقسام (175 سؤال)' : 'Comprehensive All-in-One (175 MCQs)'}
            </span>
            <span className="text-slate-500 text-[11px]">
              {isRTL ? 'دمج الأسئلة من 1 إلى 175 في جولة واحدة' : 'Combines questions 1 to 175 across all 7 sections'}
            </span>
          </div>

          <button
            type="button"
            disabled={loadingSectionId !== null}
            onClick={handleLaunchAllSections}
            className="py-2 px-3.5 rounded-xl btn-glossy-orange text-xs font-black text-white flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-102 transition-transform disabled:opacity-50 shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{loadingSectionId === 'all' ? (isRTL ? 'جاري التحميل...' : 'Loading...') : (isRTL ? 'بدء الكل' : 'Launch All')}</span>
          </button>
        </div>

        {/* SECTIONS LIST */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {COMPUTER_SECTIONS.map((section) => {
            const isLoading = loadingSectionId === section.id;

            return (
              <div
                key={section.id}
                onClick={() => !loadingSectionId && handleSelectSection(section)}
                className="group p-4 rounded-2xl border-2 border-slate-200 hover:border-orange-500 bg-white hover:bg-orange-50/30 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 font-black flex items-center justify-center shrink-0 text-sm group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    {section.sectionNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                        {isRTL ? section.titleAr : section.titleEn}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        {section.questions.length} {isRTL ? 'سؤال' : 'MCQs'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                      {isRTL ? section.descriptionAr : section.descriptionEn}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={loadingSectionId !== null}
                  className="py-2 px-3 rounded-xl bg-slate-100 group-hover:btn-glossy-orange text-slate-700 group-hover:text-white text-xs font-black flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                >
                  <span>
                    {isLoading
                      ? isRTL ? 'تحميل...' : 'Loading...'
                      : isRTL ? 'بدء القسم' : 'Start'}
                  </span>
                  {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
