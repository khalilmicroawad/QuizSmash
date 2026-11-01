import React, { useState } from 'react';
import { Header } from './components/Header';
import { QuizPlayView } from './components/QuizPlayView';
import { QuestionBankView } from './components/QuestionBankView';
import { ProfileView } from './components/ProfileView';
import { PaywallView } from './components/PaywallView';
import { AccessCodeGate } from './components/AccessCodeGate';
import { AuthScreen } from './components/AuthScreen';
import { DentalFacultyHub } from './components/DentalFacultyHub';
import { DentalSubject, DENTAL_FACULTY_SUBJECTS } from './data/dentalSubjects';
import { Question, UserProfile } from './types/quiz';
import { StorageService } from './services/storageService';
import { sound } from './services/soundService';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { InstallModal } from './components/InstallModal';
import { fetchCnsTestQuestions } from './services/cnsTestService';

function QuizSmashApp() {
  const [currentTab, setCurrentTab] = useState<'subjects' | 'play' | 'bank' | 'profile'>('subjects');
  const [currentSubject, setCurrentSubject] = useState<DentalSubject>(DENTAL_FACULTY_SUBJECTS[1]); // General Human Anatomy
  const [questions, setQuestions] = useState<Question[]>(() => StorageService.getQuestions());
  const [activeProfile, setActiveProfile] = useState<UserProfile>(() => StorageService.getActiveProfile());
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sound.isEnabled());
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const { t } = useLanguage();
  const { user, isUnlocked, trialExpiresAt, isLoading } = useAuth();

  // Auto-fetch CNS Test from Supabase if questions are empty
  React.useEffect(() => {
    if (questions.length === 0) {
      fetchCnsTestQuestions()
        .then(({ questions: cnsQuestions }) => {
          setQuestions(cnsQuestions);
        })
        .catch((err) => {
          console.warn('Could not auto-fetch CNS Test:', err);
        });
    }
  }, [questions.length]);

  // Listen for storage updates
  const refreshProfile = () => {
    setActiveProfile(StorageService.getActiveProfile());
  };

  // Sync profile username with Supabase English full name metadata if available
  React.useEffect(() => {
    if (user) {
      const metaFullName =
        user.user_metadata?.full_name ||
        (user.user_metadata?.first_name
          ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`.trim()
          : '');
      if (metaFullName && activeProfile.username !== metaFullName) {
        const updated = { ...activeProfile, username: metaFullName };
        StorageService.saveProfile(updated);
        setActiveProfile(updated);
      }
    }
  }, [user]);

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  const handleQuestionsUpdated = (updated: Question[]) => {
    setQuestions(updated);
  };

  const handleLaunchQuiz = () => {
    setCurrentTab('play');
  };

  const hasTrialExpired = trialExpiresAt !== null && Date.now() >= trialExpiresAt;
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  React.useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      if (!user && window.location.pathname !== '/login') {
        // Protect private pages with supabase.auth.getSession() — if no session, redirect to /login
        window.history.replaceState({}, '', '/login');
        setCurrentPath('/login');
      } else if (user && window.location.pathname === '/login') {
        window.history.replaceState({}, '', '/');
        setCurrentPath('/');
      }
    }
  }, [user, isLoading]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white transition-colors duration-200">
      {/* Universal Top Bar with Quiz Smash & Theme & Language Switcher */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {isLoading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !user ? (
          /* Step 1: First page is Sign Up and Sign In with Gmail account */
          <AuthScreen />
        ) : !isUnlocked ? (
          /* Step 2: Only after registration & sign in, page about 24-hour trial or payment of 20000 IQD */
          hasTrialExpired ? <PaywallView /> : <AccessCodeGate />
        ) : (
          /* Step 3: Unlocked quiz arena (within 24h trial OR permanently activated via 20,000 IQD code) */
          <>
            {currentTab === 'subjects' && (
              <DentalFacultyHub
                onSelectSubject={(subject) => {
                  setCurrentSubject(subject);
                }}
                onLaunchQuiz={() => {
                  setCurrentTab('play');
                }}
                questions={questions}
                onQuestionsUpdated={handleQuestionsUpdated}
                activeProfile={activeProfile}
              />
            )}

            {currentTab === 'play' && (
              <QuizPlayView
                questions={questions}
                activeProfile={activeProfile}
                soundEnabled={soundEnabled}
                onNavigateToBank={() => setCurrentTab('bank')}
                onProfileUpdated={refreshProfile}
                onQuestionsUploaded={handleQuestionsUpdated}
                onOpenInstallModal={() => setIsInstallModalOpen(true)}
                onNavigateToSubjects={() => setCurrentTab('subjects')}
                activeSubjectName={currentSubject?.nameEn}
                activeSubjectId={currentSubject?.id}
              />
            )}

            {currentTab === 'bank' && (
              <QuestionBankView
                questions={questions}
                onQuestionsUpdated={handleQuestionsUpdated}
                onLaunchQuiz={handleLaunchQuiz}
              />
            )}

            {currentTab === 'profile' && (
              <ProfileView
                activeProfile={activeProfile}
                onProfileUpdated={refreshProfile}
                onStartQuiz={() => setCurrentTab('play')}
              />
            )}
          </>
        )}
      </main>

      {/* Footer with clean dividing line */}
      <footer className="border-t-2 border-slate-200 bg-white py-6 text-center text-xs text-slate-500 transition-colors">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">{t('brandName')}</span>
            <span>·</span>
            <span>{t('footerTagline')}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>{t('footerFeature1')}</span>
            <span>·</span>
            <span>{t('footerFeature2')}</span>
            <span>·</span>
            <span>{t('footerFeature3')}</span>
          </div>
        </div>
      </footer>

      {/* Install on Phone / APK Modal */}
      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <QuizSmashApp />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
