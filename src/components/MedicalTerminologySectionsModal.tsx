import React, { useState } from 'react';
import {
  X,
  Play,
  Layers,
  Sparkles,
  BookMarked,
} from 'lucide-react';
import {
  MEDICAL_TERMINOLOGY_SECTIONS,
  MedicalTerminologySection,
} from '../data/medicalTerminologySectionsData';
import { Question } from '../types/quiz';
import {
  fetchMedicalTerminologySectionQuestions,
  fetchAllMedicalTerminologyQuestions,
} from '../services/medicalTerminologyService';
import { useLanguage } from '../context/LanguageContext';

interface MedicalTerminologySectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionsLoaded: (questions: Question[], sectionName: string) => void;
}

export const MedicalTerminologySectionsModal: React.FC<MedicalTerminologySectionsModalProps> = ({
  isOpen,
  onClose,
  onQuestionsLoaded,
}) => {
  const { isRTL } = useLanguage();
  const [loadingSectionId, setLoadingSectionId] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectSection = async (section: MedicalTerminologySection) => {
    setLoadingSectionId(section.id);
    setErrorNotice(null);

    try {
      const { questions } = await fetchMedicalTerminologySectionQuestions(section.id);
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
      const { questions, count } = await fetchAllMedicalTerminologyQuestions();
      onQuestionsLoaded(
        questions,
        isRTL
          ? `المصطلحات الطبية (جميع الأقسام الـ 4 - ${count} سؤال)`
          : `Medical Terminology (All 4 Sections - ${count} MCQs)`
      );
      onClose();
    } catch (err: any) {
      setErrorNotice(err.message || 'Failed to load combined questions.');
    } finally {
      setLoadingSectionId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 border-b border-[#D9E2CE] flex items-start justify-between gap-4 bg-[#FAFBF8]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F2F5ED] text-[#4D5D28] text-[10px] font-bold uppercase mb-1 border border-[#D9E2CE]">
                <Layers className="w-3 h-3 text-[#556B2F]" />
                <span>{isRTL ? '4 أقسام معتمدة' : '4 Certified Sections'}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {isRTL ? 'المصطلحات الطبية (TERM 103)' : 'Medical Terminology (TERM 103)'}
              </h2>
              <p className="text-xs text-[#556B2F] mt-0.5">
                {isRTL
                  ? 'كل قسم يقوم بتحميل بنك الأسئلة الشامل (100 سؤال)'
                  : 'Each section loads the full questions bank (100 MCQs)'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            title={isRTL ? 'إغلاق' : 'Close'}
            aria-label={isRTL ? 'إغلاق' : 'Close'}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ERROR NOTICE */}
        {errorNotice && (
          <div className="p-3 bg-rose-50 border-b border-rose-200 text-rose-700 text-xs font-bold text-center">
            {errorNotice}
          </div>
        )}

        {/* ALL SECTIONS MASTER BUTTON - ICON ONLY */}
        <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {isRTL ? 'الاختبار الشامل لجميع الأقسام (100 سؤال)' : 'All 4 Sections Combined (100 MCQs)'}
            </span>
            <span className="text-[#556B2F] text-[11px]">
              {isRTL
                ? 'تحميل كافة أسئلة المصطلحات الطبية في جولة واحدة'
                : 'Combines all Medical Terminology questions in a single session'}
            </span>
          </div>

          <button
            type="button"
            disabled={loadingSectionId !== null}
            onClick={handleLaunchAllSections}
            title={isRTL ? 'بدء الكل (100 سؤال)' : 'Launch All (100 MCQs)'}
            aria-label={isRTL ? 'بدء الكل (100 سؤال)' : 'Launch All (100 MCQs)'}
            className="w-10 h-10 rounded-xl btn-glossy-emerald flex items-center justify-center cursor-pointer shadow-xs disabled:opacity-50 shrink-0 transition-transform active:scale-95"
          >
            {loadingSectionId === 'all' ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-white" />
            )}
          </button>
        </div>

        {/* SECTIONS LIST */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1">
          {MEDICAL_TERMINOLOGY_SECTIONS.map((section) => {
            const isLoading = loadingSectionId === section.id;

            return (
              <div
                key={section.id}
                onClick={() => !loadingSectionId && handleSelectSection(section)}
                className="group p-3.5 sm:p-4 rounded-2xl border border-[#D9E2CE] hover:border-emerald-500 bg-white hover:bg-emerald-50/20 transition-all duration-150 cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl font-black flex items-center justify-center shrink-0 text-xs shadow-xs text-white ${
                      section.sectionNumber === 1
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                        : section.sectionNumber === 2
                        ? 'bg-gradient-to-br from-yellow-500 to-amber-600'
                        : section.sectionNumber === 3
                        ? 'bg-gradient-to-br from-orange-400 to-rose-500'
                        : 'bg-gradient-to-br from-red-400 to-pink-600'
                    }`}
                  >
                    {section.sectionNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {isRTL ? section.titleAr : section.titleEn}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        100 {isRTL ? 'سؤال' : 'MCQs'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                      {isRTL ? section.descriptionAr : section.descriptionEn}
                    </p>
                  </div>
                </div>

                {/* ICON ONLY BUTTON */}
                <button
                  type="button"
                  disabled={loadingSectionId !== null}
                  title={isRTL ? 'بدء' : 'Start'}
                  aria-label={isRTL ? 'بدء' : 'Start'}
                  className="w-9 h-9 rounded-xl btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-xs disabled:opacity-50 shrink-0 transition-transform active:scale-95"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
