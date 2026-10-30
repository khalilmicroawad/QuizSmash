import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Download,
  Trash2,
  CheckCircle,
  Search,
  Play,
} from 'lucide-react';
import { Question } from '../types/quiz';
import { parseQuestionBank, exportToTxt, getSampleTxtTemplate } from '../services/questionParser';
import { StorageService } from '../services/storageService';
import { useLanguage } from '../context/LanguageContext';

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
  const { t, isRTL, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || '';
      const result = parseQuestionBank(text);
      if (result.questions.length > 0) {
        StorageService.saveQuestions(result.questions);
        onQuestionsUpdated(result.questions);
        setFeedback({
          success: true,
          message: isRTL
            ? `تم تحميل ${result.questions.length} سؤال بنجاح!`
            : `Successfully loaded ${result.questions.length} questions!`,
        });
      } else {
        setFeedback({
          success: false,
          message: isRTL
            ? 'لم يتم العثور على أسئلة صالحة. تأكد من أن كل إجابة صحيحة تبدأ بعلامة "+".'
            : 'No valid questions found. Ensure correct answers begin with "+".',
        });
      }
    };
    reader.readAsText(file);
  };

  // Download sample .txt file
  const handleDownloadSample = () => {
    const template = getSampleTxtTemplate(language);
    const blob = new Blob([template], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz_sample_${language}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".txt"
        className="hidden"
      />

      {/* Header with Title and Essential Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('bankHeaderTitle')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {questions.length > 0
              ? isRTL
                ? `${questions.length} سؤال متاح`
                : `${questions.length} questions loaded`
              : t('bankEmptySummary')}
          </p>
        </div>

        {/* Top 3 Actions Only: Upload, Sample, Start Quiz */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-orange-500 transition-colors cursor-pointer"
          >
            <Upload className="h-3.5 w-3.5 text-orange-500" />
            <span>{t('uploadBankBtn')}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadSample}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-sky-500 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-sky-500" />
            <span>{t('sampleTxtBtn')}</span>
          </button>

          {questions.length > 0 && (
            <button
              type="button"
              onClick={onLaunchQuiz}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-black shadow-xs cursor-pointer transition-colors"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>{t('navPlay')}</span>
            </button>
          )}
        </div>
      </div>

      {feedback && (
        <div
          className={`mb-4 p-3 rounded-xl text-xs font-bold flex items-center justify-between ${
            feedback.success
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
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
        <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 p-8 sm:p-12 text-center bg-white/60 dark:bg-slate-900/40">
          <div className="mx-auto w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-3">
            <Upload className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            {t('emptyBankTitle')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-5 leading-relaxed">
            {t('emptyBankDesc')}
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm cursor-pointer"
          >
            {t('uploadBankBtn')} (.txt)
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
                className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="button"
              onClick={handleClearBank}
              className="text-xs text-slate-400 hover:text-rose-500 px-2 py-1 transition-colors cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Questions list */}
          <div className="space-y-3">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        #{idx + 1}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {q.questionText}
                    </p>

                    <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = oIdx === q.correctOptionIndex;
                        return (
                          <div
                            key={oIdx}
                            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-2 ${
                              isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold'
                                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <span className="font-mono text-[10px] w-4">{String.fromCharCode(65 + oIdx)}.</span>
                            <span className="truncate">{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <p className="mt-2 text-[11px] text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 p-2 rounded-lg border border-sky-200 dark:border-sky-900">
                        <strong>{t('explanationTitle')}:</strong> {q.explanation}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors p-1 cursor-pointer shrink-0"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
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
