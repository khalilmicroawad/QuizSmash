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
  Award,
  Medal,
  Trophy,
  Star,
  Crown,
  Target,
  BookMarked,
  FileText,
} from 'lucide-react';
import { DentalSubject, DENTAL_FACULTY_SUBJECTS } from '../data/dentalSubjects';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Question, UserProfile } from '../types/quiz';
import { fetchCnsTestQuestions } from '../services/cnsTestService';
import { fetchTerminologyTestQuestions } from '../services/terminologyTestService';
import { MasteryService, SubjectMasteryInfo } from '../services/masteryService';
import { StorageService } from '../services/storageService';

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
  questions,
  onQuestionsUpdated,
  activeProfile,
}) => {
  const { isRTL } = useLanguage();
  const { timeLeftFormatted, isTrialActive, usedLogins, maxLogins, remainingLogins } = useAuth();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('medical-terminology');
  const [loadingSubjectId, setLoadingSubjectId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ message: string; type: 'info' | 'success' } | null>(null);

  // Fallback to active profile in storage if not passed
  const currentProfile = activeProfile || StorageService.getActiveProfile();
  const history = currentProfile?.history || [];

  // Calculate mastery info for all dental faculty subjects based on previous sessions
  const subjectMasteryMap = MasteryService.getAllSubjectsMastery(
    DENTAL_FACULTY_SUBJECTS.map((s) => s.id),
    history
  );

  // Calculate total dental faculty correct answers across all previous sessions
  const totalDentalCorrect = Object.values(subjectMasteryMap).reduce(
    (acc, m) => acc + m.totalCorrect,
    0
  );

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'medical-terminology':
        return <BookMarked className="w-6 h-6 text-orange-500" />;
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

  const getMasteryTierIcon = (level: number) => {
    switch (level) {
      case 5:
        return <Crown className="w-4 h-4 text-amber-200 fill-amber-200" />;
      case 4:
        return <Trophy className="w-4 h-4 text-orange-600" />;
      case 3:
        return <Star className="w-4 h-4 text-amber-600 fill-amber-500" />;
      case 2:
        return <Medal className="w-4 h-4 text-sky-600" />;
      case 1:
        return <Award className="w-4 h-4 text-emerald-600" />;
      default:
        return <Target className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleSubjectClick = async (subject: DentalSubject) => {
    setSelectedSubjectId(subject.id);
    onSelectSubject(subject);

    if (subject.id === 'medical-terminology') {
      // Medical Terminology (Loads 100 MCQs from Terminology.txt link)
      setLoadingSubjectId('medical-terminology');
      try {
        const { questions: termQuestions, count } = await fetchTerminologyTestQuestions();
        onQuestionsUpdated(termQuestions);
        setNotice({
          type: 'success',
          message: isRTL
            ? `تم تحميل ${count} سؤال لمادة المصطلحات الطبية (Terminology) بنجاح!`
            : `Loaded ${count} Medical Terminology MCQs successfully!`,
        });
        onLaunchQuiz();
      } catch (err: any) {
        setNotice({
          type: 'info',
          message: err.message || 'Error loading Medical Terminology questions',
        });
      } finally {
        setLoadingSubjectId(null);
      }
    } else if (subject.id === 'general-human-anatomy') {
      // General Human Anatomy has CNS Test MCQs (105 questions)
      setLoadingSubjectId('general-human-anatomy');
      try {
        const { questions: cnsQuestions, count } = await fetchCnsTestQuestions();
        onQuestionsUpdated(cnsQuestions);
        setNotice({
          type: 'success',
          message: isRTL
            ? `تم تحميل ${count} سؤال لاختبار الجهاز العصبي المركزي (CNS Test) بنجاح!`
            : `Loaded ${count} CNS Test MCQs successfully!`,
        });
        onLaunchQuiz();
      } catch (err: any) {
        setNotice({
          type: 'info',
          message: err.message || 'Error loading CNS questions',
        });
      } finally {
        setLoadingSubjectId(null);
      }
    } else {
      // Other dental faculty subjects ready for attachment
      setNotice({
        type: 'info',
        message: isRTL
          ? `مادة ${subject.nameAr} جاهزة للربط مع بنك أسئلة الـ MCQ قريباً. يمكنك التدريب على المصطلحات الطبية (100 سؤال) أو تشريح الجهاز العصبي (105 أسئلة) حالياً!`
          : `${subject.nameEn} is configured and ready for MCQs attachment. You can practice Medical Terminology (100 MCQs) or CNS Test (105 MCQs) now!`,
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
                {isRTL ? '6 مواد دراسية معتمدة' : '6 Core Dental Subjects'}
              </span>
              {isTrialActive && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    <Clock className="w-3 h-3" />
                    <span>{isRTL ? `تجربة مجانية: ${timeLeftFormatted}` : `2-Day Trial: ${timeLeftFormatted}`}</span>
                  </span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isRTL ? 'كلية طب الأسنان (المرحلة الأولى)' : 'Dental faculty (first level)'}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {isRTL
                ? 'اختر المادة الدراسية لبدء حل أسئلة الاختيار من متعدد (MCQ)، تتبع مستوى الإتقان (Mastery Level) المكتسب من الجولات السابقة، والتدريب على الاختبارات.'
                : 'Select a subject below to start multiple-choice questions (MCQ), track your Mastery Level earned from previous sessions, and train for dental faculty exams.'}
            </p>
          </div>

          {/* Stats: Service Usage Counter, Active MCQs & Total Correct Mastery */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Service Usage Counter */}
            <div className="flex items-center gap-3 bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200 shadow-xs">
              <div className="text-right rtl:text-left">
                <div className="text-[10px] uppercase tracking-wider text-orange-800 font-bold">
                  {isRTL ? 'استخدام الخدمة' : 'Service Usage'}
                </div>
                <div className="font-mono text-lg font-black text-orange-600">
                  {usedLogins} / {maxLogins}
                </div>
                <div className="text-[10px] text-slate-500 font-semibold">
                  {isRTL ? `${remainingLogins} متبقي · دخول يومي` : `${remainingLogins} left · Daily Login`}
                </div>
              </div>
              <Zap className="h-6 w-6 text-orange-500 fill-orange-500 shrink-0" />
            </div>

            {/* Total Mastery Correct in Previous Sessions */}
            <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-right rtl:text-left">
                <div className="text-[10px] uppercase tracking-wider text-slate-700 font-bold">
                  {isRTL ? 'إجمالي الإتقان' : 'Total Mastery'}
                </div>
                <div className="font-mono text-lg font-black text-slate-900">
                  {totalDentalCorrect} <span className="text-xs font-semibold text-slate-500">{isRTL ? 'صحيحة' : 'Correct'}</span>
                </div>
              </div>
              <Trophy className="h-6 w-6 text-orange-500 shrink-0" />
            </div>

            {/* Active Questions */}
            <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-right rtl:text-left">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                  {isRTL ? 'الأسئلة النشطة' : 'Active MCQs'}
                </div>
                <div className="font-mono text-lg font-extrabold text-orange-500">
                  {questions.length > 0 ? questions.length : 100}
                </div>
              </div>
              <Sparkles className="h-6 w-6 text-orange-500 shrink-0" />
            </div>
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

      {/* SECTION 2: SUBJECTS OF DENTAL FACULTIES (FIRST LEVEL) WITH MASTERY LEVEL BADGES */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <span>{isRTL ? 'مواد المرحلة الأولى مع شارة الإتقان (Mastery Level):' : 'First Level Subjects & Mastery Levels:'}</span>
          </h2>
          <span className="text-[11px] font-bold text-slate-400">
            {isRTL ? 'مبنية على عدد الأسئلة المجابة صحيحة في الجلسات السابقة' : 'Based on questions answered correctly in previous sessions'}
          </span>
        </div>

        {/* The Dental Faculty Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DENTAL_FACULTY_SUBJECTS.map((subject) => {
            const isSelected = selectedSubjectId === subject.id;
            const isLoadingThisSubject = loadingSubjectId === subject.id;
            const mastery: SubjectMasteryInfo = subjectMasteryMap[subject.id] || {
              subjectId: subject.id,
              level: 0,
              titleEn: 'Novice',
              titleAr: 'مبتدئ',
              badgeLabelEn: 'Mastery Level 0 · Novice',
              badgeLabelAr: 'مستوى الإتقان 0 · مبتدئ',
              totalCorrect: 0,
              totalAnswered: 0,
              accuracyPercent: 0,
              sessionsCount: 0,
              minCorrect: 0,
              nextTarget: 15,
              progressPercent: 0,
              badgeBg: 'bg-slate-50',
              badgeBorder: 'border-slate-200',
              badgeText: 'text-slate-600',
              badgeIcon: 'seed',
            };

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
                  {/* Top card header with icon, code, and status */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
                      {getSubjectIcon(subject.id)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-slate-100 border border-slate-200 text-slate-600">
                        {subject.code}
                      </span>
                    </div>
                  </div>

                  {/* Subject Title */}
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {isRTL ? subject.nameAr : subject.nameEn}
                  </h3>

                  <div className="text-[11px] font-semibold text-sky-600 mt-0.5">
                    {isRTL ? subject.nameEn : subject.nameAr}
                  </div>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed min-h-[3rem]">
                    {isRTL ? subject.descriptionAr : subject.descriptionEn}
                  </p>

                  {/* Status pill (Questions availability) */}
                  <div className="mt-2.5">
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

                  {/* MASTERY LEVEL BADGE COMPONENT */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-orange-500" />
                        <span>{isRTL ? 'مستوى الإتقان' : 'Mastery Level'}</span>
                      </span>
                      <span className="text-[11px] font-extrabold font-mono text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                        {mastery.totalCorrect} {isRTL ? 'صحيحة' : 'Correct'}
                      </span>
                    </div>

                    {/* Badge Seal with Tier & Level */}
                    <div
                      className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border ${mastery.badgeBg} ${mastery.badgeBorder}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="shrink-0">{getMasteryTierIcon(mastery.level)}</span>
                        <div className="truncate">
                          <div className={`text-xs font-black truncate ${mastery.badgeText}`}>
                            {isRTL ? mastery.badgeLabelAr : mastery.badgeLabelEn}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-extrabold font-mono px-1.5 py-0.5 rounded-md border shrink-0 ${
                          mastery.level === 5
                            ? 'bg-white/20 border-white/40 text-white'
                            : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      >
                        Lv.{mastery.level}
                      </span>
                    </div>

                    {/* Progress Bar towards Next Mastery Milestone */}
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                        <span>
                          {mastery.nextTarget === null
                            ? isRTL
                              ? 'أعلى إتقان تم تحقيقه (100+)'
                              : 'Max Mastery Level Achieved'
                            : isRTL
                            ? `${mastery.totalCorrect} / ${mastery.nextTarget} للمستوى ${mastery.level + 1}`
                            : `${mastery.totalCorrect} / ${mastery.nextTarget} to Lv.${mastery.level + 1}`}
                        </span>
                        <span className="font-mono">{mastery.progressPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500 rounded-full"
                          style={{
                            width: `${Math.max(mastery.totalCorrect > 0 ? 5 : 0, mastery.progressPercent)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Previous sessions summary note */}
                    <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                      <span>
                        {mastery.sessionsCount > 0
                          ? isRTL
                            ? `${mastery.sessionsCount} جلسات سابقة`
                            : `${mastery.sessionsCount} previous sessions`
                          : isRTL
                          ? 'لم تلعب جلسات سابقة'
                          : 'No previous sessions'}
                      </span>
                      {mastery.sessionsCount > 0 && (
                        <span className="text-emerald-600 font-bold">
                          {mastery.accuracyPercent}% {isRTL ? 'دقة' : 'acc'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Orange Glossy Rounded Button for Each Subject */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={isLoadingThisSubject}
                    onClick={() => handleSubjectClick(subject)}
                    className="w-full py-3 px-4 rounded-2xl text-xs font-black btn-glossy-orange flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-70"
                  >
                    {isLoadingThisSubject ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : subject.hasQuestions ? (
                      <Play className="w-3.5 h-3.5 fill-white" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5" />
                    )}
                    <span>{subject.nameEn}</span>
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

      {/* SECTION 3: DIRECT ACCESS CARDS FOR ACTIVE MCQ BANKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Medical Terminology (100 MCQs) */}
        <div className="rounded-2xl border-2 border-orange-300 bg-orange-50/30 p-5 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl btn-glossy-orange flex items-center justify-center text-white shrink-0">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <h4 className="text-sm font-extrabold text-slate-900">
                  {isRTL ? 'المصطلحات الطبية (100 سؤال MCQ)' : 'Medical Terminology (100 MCQs)'}
                </h4>
                {subjectMasteryMap['medical-terminology'] && subjectMasteryMap['medical-terminology'].level > 0 && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 border border-orange-200">
                    <Award className="w-3 h-3 text-orange-500" />
                    <span>
                      Lv.{subjectMasteryMap['medical-terminology'].level} (
                      {subjectMasteryMap['medical-terminology'].totalCorrect} {isRTL ? 'صحيحة' : 'correct'})
                    </span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isRTL
                  ? 'بنك أسئلة الجذور، البادئات، اللواحق، والمصطلحات الطبية والسنية من الرابط المباشر.'
                  : 'Word parts, prefixes, suffixes, root words, and dental terms loaded from Supabase storage.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loadingSubjectId === 'medical-terminology'}
            onClick={() => {
              const term = DENTAL_FACULTY_SUBJECTS.find((s) => s.id === 'medical-terminology');
              if (term) handleSubjectClick(term);
            }}
            className="w-full py-2.5 px-5 rounded-2xl text-xs font-black btn-glossy-orange flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70"
          >
            {loadingSubjectId === 'medical-terminology' ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-white" />
            )}
            <span>{isRTL ? 'بدء اختبار المصطلحات الطبية (100 سؤال)' : 'Start Medical Terminology (100 MCQs)'}</span>
          </button>
        </div>

        {/* Card 2: CNS Test - General Human Anatomy (105 MCQs) */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl btn-glossy-orange flex items-center justify-center text-white shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <h4 className="text-sm font-extrabold text-slate-900">
                  {isRTL ? 'اختبار الجهاز العصبي المركزي (105 أسئلة)' : 'CNS Test - Anatomy (105 MCQs)'}
                </h4>
                {subjectMasteryMap['general-human-anatomy'] && subjectMasteryMap['general-human-anatomy'].level > 0 && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 border border-orange-200">
                    <Award className="w-3 h-3 text-orange-500" />
                    <span>
                      Lv.{subjectMasteryMap['general-human-anatomy'].level} (
                      {subjectMasteryMap['general-human-anatomy'].totalCorrect} {isRTL ? 'صحيحة' : 'correct'})
                    </span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isRTL
                  ? 'مرتبط بمادة التشريح البشري العام ومتاح للبدء الفوري لاختبار معلوماتك.'
                  : 'Linked to General Human Anatomy and ready for instant practice or exam mode.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loadingSubjectId === 'general-human-anatomy'}
            onClick={() => {
              const anat = DENTAL_FACULTY_SUBJECTS.find((s) => s.id === 'general-human-anatomy');
              if (anat) handleSubjectClick(anat);
            }}
            className="w-full py-2.5 px-5 rounded-2xl text-xs font-black btn-glossy-orange flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70"
          >
            {loadingSubjectId === 'general-human-anatomy' ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-white" />
            )}
            <span>{isRTL ? 'بدء اختبار الـ CNS الآن (105 أسئلة)' : 'Start CNS Test Now (105 MCQs)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
