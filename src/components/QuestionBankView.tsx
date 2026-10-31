import React, { useState } from 'react';
import {
  Brain,
  Trash2,
  Search,
  Play,
} from 'lucide-react';
import { Question } from '../types/quiz';
import { StorageService } from '../services/storageService';
import { useLanguage } from '../context/LanguageContext';
import { fetchCnsTestQuestions } from '../services/cnsTestService';

interface QuestionBankViewProps {
  questions: Question[];
  onQuestionsUpdated: (questions: Question[]) => void;
  onLaunchQuiz: () => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  questions,
  onQuestionsUpdated,
  onLaunchQuiz,
}) => {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [isLoadingCns, setIsLoadingCns] = useState<boolean>(false);

  // CNS Test Loader (Fetches mcq_cns.txt from Supabase storage)
  const handleLoadCnsTest = async () => {
    setIsLoadingCns(true);
    setFeedback(null);
    try {
      const { questions: cnsQuestions, count } = await fetchCnsTestQuestions();
      onQuestionsUpdated(cnsQuestions);
      setFeedback({
        success: true,
        message: isRTL
          ? `تم بنجاح تحميل اختبار الـ CNS (${count} سؤال) من Supabase!`
          : `Successfully loaded CNS Test (${count} questions) from Supabase!`,
      });
    } catch (err: any) {
      setFeedback({
        success: false,
        message: err.message || 'Failed to download CNS Test file from Supabase.',
      });
    } finally {
      setIsLoadingCns(false);
    }
  };

  // Clear questions
  const handleClearBank = () => {
    if (window.confirm(isRTL ? 'هل أنت متأكد من مسح جميع الأسئلة؟' : 'Clear all questions?')) {
      StorageService.clearQuestions();
      onQuestionsUpdated([]);
      setFeedback(null);
    }
  };

  // Delete a single question
  const handleDeleteQuestion = (id: string) => {
    const updated = questions.filter((q) => q.id !== id);
    StorageService.saveQuestions(updated);
    onQuestionsUpdated(updated);
  };

  const filteredQuestions = questions.filter((q) => {
    return (
      searchQuery.trim() === '' ||
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.options.some((o) => o.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* SECTION 1: HEADER WITH TITLE AND CNS TEST ACTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t('bankHeaderTitle')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {questions.length > 0
              ? isRTL
                ? `${questions.length} سؤال متاح (اختبار CNS)`
                : `${questions.length} questions loaded (CNS Test)`
              : (isRTL ? 'لا توجد أسئلة، اضغط على زر CNS Test لتحميل الاختبار' : 'No questions loaded. Click CNS Test below.')}
          </p>
        </div>

        {/* Top Actions: CNS Test Button & Start Quiz */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            disabled={isLoadingCns}
            onClick={handleLoadCnsTest}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl btn-glossy-orange text-xs font-black cursor-pointer shadow-sm disabled:opacity-50"
          >
            {isLoadingCns ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Brain className="h-4 w-4 fill-white" />
            )}
            <span>{isLoadingCns ? (isRTL ? 'جاري التحميل...' : 'Loading...') : 'CNS Test'}</span>
          </button>

          {questions.length > 0 && (
            <button
              type="button"
              onClick={onLaunchQuiz}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl btn-glossy-orange-outline text-xs font-black cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
              <span>{t('navPlay')}</span>
            </button>
          )}
        </div>
      </div>

      {/* LINE SEPARATING HEADER FROM CONTENT */}
      <div className="w-full border-b-2 border-slate-200 my-6" />

      {feedback && (
        <div
          className={`mb-4 p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between ${
            feedback.success
              ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-300'
              : 'bg-rose-50 text-rose-800 border-2 border-rose-300'
          }`}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content: Either Empty state or Question List */}
      {questions.length === 0 ? (
        <div className="rounded-2xl border-2 border-slate-200 p-8 sm:p-12 text-center bg-white shadow-xs">
          <div className="mx-auto w-14 h-14 rounded-2xl btn-glossy-orange flex items-center justify-center mb-4 text-white shadow-md">
            <Brain className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-1.5">
            CNS Test
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
            {isRTL
              ? 'اضغط أدناه لتحميل اختبار الـ CNS مباشرة من Supabase (105 أسئلة MCQ).'
              : 'Click below to fetch the Central Nervous System MCQ bank (105 questions) directly from Supabase.'}
          </p>

          <button
            type="button"
            disabled={isLoadingCns}
            onClick={handleLoadCnsTest}
            className="px-8 py-3.5 rounded-2xl font-black text-sm btn-glossy-orange flex items-center justify-center gap-2.5 mx-auto cursor-pointer shadow-md disabled:opacity-50"
          >
            {isLoadingCns ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Brain className="h-4 w-4" />
            )}
            <span>{isLoadingCns ? (isRTL ? 'جاري التحميل...' : 'Loading...') : 'CNS Test'}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Search bar & Clear option */}
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRTL ? 'بحث في الأسئلة...' : 'Search questions...'}
                className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 text-xs rounded-2xl border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="button"
              onClick={handleClearBank}
              className="text-xs text-slate-400 hover:text-rose-500 p-2 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Questions list */}
          <div className="space-y-3.5">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="rounded-2xl border-2 border-slate-200 bg-white p-5 transition-colors shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200">
                        #{idx + 1}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 leading-snug">
                      {q.questionText}
                    </p>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = oIdx === q.correctOptionIndex;
                        return (
                          <div
                            key={oIdx}
                            className={`px-3 py-2 rounded-xl border flex items-center gap-2 ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="font-mono text-[10px] w-4 font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                            <span className="truncate">{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <p className="mt-3 text-xs text-sky-800 bg-sky-50 p-2.5 rounded-xl border border-sky-200 leading-relaxed">
                        <strong className="text-sky-700 font-bold">{t('explanationTitle')}:</strong> {q.explanation}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors p-1.5 cursor-pointer shrink-0"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
