import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Download,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Search,
  Play,
  ArrowRight,
  ArrowLeft,
  Shuffle,
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
  const [activeTab, setActiveTab] = useState<'upload' | 'browse' | 'paste'>('upload');
  const [rawTextInput, setRawTextInput] = useState<string>('');
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const [parseStatus, setParseStatus] = useState<{
    success: boolean;
    message: string;
    errors: string[];
    warnings: string[];
    count: number;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-commit on file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || '';
      setRawTextInput(text);

      const result = parseQuestionBank(text);
      if (result.questions.length > 0) {
        StorageService.saveQuestions(result.questions);
        onQuestionsUpdated(result.questions);
        setParseStatus({
          success: true,
          message: isRTL
            ? `تم تحميل ${result.questions.length} سؤال بنجاح من الملف ${file.name}!`
            : `Successfully loaded ${result.questions.length} questions from ${file.name}!`,
          errors: result.errors,
          warnings: result.warnings,
          count: result.questions.length,
        });
      } else {
        setParseStatus({
          success: false,
          message: isRTL
            ? 'لم يتم العثور على أسئلة صالحة. تأكد من تمييز الإجابة الصحيحة بعلامة "+" في بداية السطر.'
            : 'No valid questions found in this file. Please ensure correct answers have a "+" in front.',
          errors: result.errors,
          warnings: result.warnings,
          count: 0,
        });
      }
    };
    reader.readAsText(file);
  };

  // Direct paste commit
  const handleCommitPastedText = () => {
    if (!rawTextInput.trim()) return;

    const result = parseQuestionBank(rawTextInput);
    if (result.questions.length > 0) {
      StorageService.saveQuestions(result.questions);
      onQuestionsUpdated(result.questions);
      setParseStatus({
        success: true,
        message: isRTL
          ? `تم تحميل ${result.questions.length} سؤال بنجاح!`
          : `Successfully loaded ${result.questions.length} questions!`,
        errors: result.errors,
        warnings: result.warnings,
        count: result.questions.length,
      });
    } else {
      setParseStatus({
        success: false,
        message: isRTL
          ? 'لم يتم العثور على أسئلة صالحة. تأكد من أن كل إجابة صحيحة تبدأ بعلامة "+".'
          : 'No valid questions found. Ensure each correct answer begins with a "+" symbol.',
        errors: result.errors,
        warnings: result.warnings,
        count: 0,
      });
    }
  };

  // Download sample .txt file in active language
  const handleDownloadSample = () => {
    const template = getSampleTxtTemplate(language);
    const blob = new Blob([template], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = language === 'ar' ? 'quiz_smash_sample_ar.txt' : 'sample_quiz_smash.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export current bank to .txt
  const handleExportCurrentBank = () => {
    if (questions.length === 0) {
      return;
    }
    const txt = exportToTxt(questions);
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz_smash_bank_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Clear bank
  const handleClearBank = () => {
    if (confirm(t('clearBankConfirm'))) {
      const cleared = StorageService.clearQuestions();
      onQuestionsUpdated(cleared);
      setParseStatus(null);
      setUploadFileName('');
      setRawTextInput('');
    }
  };

  // Delete a single question
  const handleDeleteQuestion = (id: string) => {
    const updated = questions.filter((q) => q.id !== id);
    StorageService.saveQuestions(updated);
    onQuestionsUpdated(updated);
  };

  // Search filter
  const filteredQuestions = questions.filter((q) => {
    return (
      searchQuery.trim() === '' ||
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.options.some((o) => o.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('bankHeaderTitle')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {questions.length > 0 ? (
              <span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  {t('bankLoadedSummary', { count: questions.length })}
                </strong>
              </span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                {t('bankEmptySummary')}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadSample}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <Download className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{t('sampleTxtBtn')}</span>
          </button>

          {questions.length > 0 && (
            <>
              <button
                type="button"
                onClick={handleExportCurrentBank}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <FileText className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{t('exportBtn')}</span>
              </button>

              <button
                type="button"
                onClick={handleClearBank}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors shadow-sm"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{t('clearBankBtn')}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* INSTANT PLAY BUTTON BANNER WHEN QUESTIONS ARE UPLOADED */}
      {questions.length > 0 && (
        <div className="mb-8 rounded-2xl border-2 border-emerald-500/80 bg-gradient-to-r from-emerald-50 via-white to-indigo-50 dark:from-emerald-950/60 dark:via-slate-900 dark:to-indigo-950/50 p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left rtl:sm:text-right">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40 shrink-0">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400">
                {t('bankReady')}
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {t('readyToPlayBannerTitle', { count: questions.length })}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <Shuffle className="h-3 w-3" />
                <span>{t('readyToPlayBannerDesc')}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLaunchQuiz}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-extrabold text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2.5 shrink-0"
          >
            <Play className="h-5 w-5 fill-white" />
            <span>{t('startQuizSmashBtn')}</span>
            {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-200/80 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 mb-6 max-w-xs">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-md transition-colors ${
            activeTab === 'upload'
              ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          {t('tabUpload')}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('paste')}
          className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-md transition-colors ${
            activeTab === 'paste'
              ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          {t('tabPaste')}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('browse')}
          className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-md transition-colors ${
            activeTab === 'browse'
              ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          {t('tabBrowse')} ({questions.length})
        </button>
      </div>

      {/* TAB 1: UPLOAD .TXT FILE */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>{t('formatGuideTitle')}</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {t('formatGuideDesc')}
            </p>

            <div className="rounded-lg bg-white dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-3 font-mono text-xs text-slate-800 dark:text-slate-300 overflow-x-auto shadow-inner text-left rtl:text-right">
              <pre className="text-slate-800 dark:text-slate-300 leading-relaxed">
{language === 'ar'
  ? `ما هي عاصمة اليابان؟
كيوتو
أوساكا
+طوكيو
هيروشيما

ما هو الكوكب المعروف باسم الكوكب الأحمر؟
الزهرة
المشتري
+المريخ
عطارد`
  : `What is the powerhouse of the cell?
Ribosome
+Mitochondria
Nucleus
Endoplasmic Reticulum

What planet is known as the Red Planet?
Venus
Jupiter
+Mars
Mercury`}
              </pre>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/40 p-10 flex flex-col items-center justify-center text-center hover:border-indigo-500 transition-colors shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 mb-4">
              <Upload className="h-7 w-7" />
            </div>

            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {t('dropFileTitle')}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 max-w-sm">
              {t('dropFileSubtitle')}
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,text/plain"
              onChange={handleFileUpload}
              className="hidden"
              id="file-txt-input"
            />

            <label
              htmlFor="file-txt-input"
              className="cursor-pointer px-6 py-3 text-xs font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30 flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              <span>{t('chooseFileBtn')}</span>
            </label>

            {uploadFileName && (
              <div className="mt-4 text-xs text-indigo-600 dark:text-indigo-300 font-mono">
                {t('loadedFileLabel', { name: uploadFileName })}
              </div>
            )}
          </div>

          {parseStatus && (
            <div
              className={`rounded-xl border p-4 transition-all shadow-sm ${
                parseStatus.success
                  ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/20'
                  : 'border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/20'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {parseStatus.success ? (
                    <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{parseStatus.message}</div>
                    {parseStatus.errors.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {parseStatus.errors.map((err, i) => (
                          <div key={i} className="text-xs text-rose-600 dark:text-rose-300 font-mono">
                            • {err}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {parseStatus.success && parseStatus.count > 0 && (
                  <button
                    type="button"
                    onClick={onLaunchQuiz}
                    className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm flex items-center gap-1.5 shrink-0"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>{t('playNowBtn')}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PASTE TEXT */}
      {activeTab === 'paste' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {t('pasteTitle')}
            </label>
            <button
              type="button"
              onClick={() => {
                const sample = getSampleTxtTemplate(language);
                setRawTextInput(sample);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('insertTemplateBtn')}
            </button>
          </div>

          <textarea
            value={rawTextInput}
            onChange={(e) => setRawTextInput(e.target.value)}
            placeholder={t('pastePlaceholder')}
            rows={12}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 font-mono text-xs text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed shadow-sm text-left rtl:text-right"
          />

          <div className="flex justify-end rtl:justify-start gap-3">
            <button
              type="button"
              onClick={handleCommitPastedText}
              disabled={!rawTextInput.trim()}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2"
            >
              <span>{t('loadPasteBtn')}</span>
              {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: BROWSE BANK */}
      {activeTab === 'browse' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none shadow-sm"
            />
          </div>

          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-8 text-center text-slate-500 dark:text-slate-400 shadow-sm">
                <p className="text-sm">{t('noQuestionsInBank')}</p>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 transition-colors hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                        #{idx + 1}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                        {q.questionText}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = optIdx === q.correctOptionIndex;
                          const letter = isRTL
                            ? ['أ', 'ب', 'ج', 'د', 'هـ', 'و'][optIdx] || String.fromCharCode(65 + optIdx)
                            : String.fromCharCode(65 + optIdx);

                          return (
                            <div
                              key={optIdx}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border ${
                                isCorrect
                                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-400'
                              }`}
                            >
                              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                                {letter}.
                              </span>
                              <span>{opt}</span>
                              {isCorrect && (
                                <span className="ltr:ml-auto rtl:mr-auto text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                                  {t('correctMarkerTag')}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
