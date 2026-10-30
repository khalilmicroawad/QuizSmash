export type Language = 'en' | 'ar';

export interface Translations {
  // Brand & Nav
  brandName: string;
  brandTagline: string;
  navPlay: string;
  navBank: string;
  navLeaderboard: string;
  navProfile: string;
  quickStart: string;
  soundOnTooltip: string;
  soundOffTooltip: string;
  themeLightTooltip: string;
  themeDarkTooltip: string;
  languageName: string;
  switchLangTooltip: string;
  installOnPhone: string;
  installModalTitle: string;
  installModalSubtitle: string;
  tabDesktopPC: string;
  tabMobilePhone: string;
  desktop1Title: string;
  desktop1Desc: string;
  installDesktopBtn: string;
  desktop2Title: string;
  desktop2Desc: string;
  generateWindowsBtn: string;
  desktop3Title: string;
  desktop3Desc: string;
  copyCommand: string;
  commandCopied: string;
  method1Title: string;
  method1Desc: string;
  installNowBtn: string;
  installedNotice: string;
  scanQRTitle: string;
  scanQRDesc: string;
  copyLink: string;
  linkCopied: string;
  method2Title: string;
  method2Desc: string;
  generateApkBtn: string;
  apkSteps: string;
  closeBtn: string;

  // Lobby
  arenaBadge: string;
  randomizedBadge: string;
  timerChallengesBadge: string;
  arenaTitle: string;
  arenaDescription: string;
  highScore: string;
  emptyBankTitle: string;
  emptyBankDesc: string;
  uploadBankBtn: string;
  loadSampleBtn: string;
  bankReady: string;
  questionsCountLoaded: string; // "{count} Questions Loaded"
  playingWithTimerDesc: string; // "Playing with a {seconds}s timer. Earn {base} base pts + speed bonuses!"
  startQuizSmashBtn: string;
  manageTxtBankBtn: string;
  fixedTimerRuleTitle: string;
  fixedTimerRuleDesc: string;
  backToLobbyBtn: string;
  selectTimerTitle: string;
  selectTimerDesc: string;
  timerMultiplierBadge: string;
  baseSpeedScoreMeta: string; // "Base: {base} pts · +{speed} pts/sec"
  activeSelectionBadge: string;
  randomizationNotice: string;
  modeSelectionTitle: string;
  modePracticeTitle: string;
  modePracticeSubtitle: string;
  modePracticeBadge: string;
  modeExamTitle: string;
  modeExamSubtitle: string;
  modeExamBadge: string;
  explanationTitle: string;
  explanationDesc: string;
  noExplanationGiven: string;
  nextQuestionBtn: string;

  // 3 Timer presets
  timer5sTitle: string;
  timer5sDesc: string;
  timer5sBadge: string;

  timer10sTitle: string;
  timer10sDesc: string;
  timer10sBadge: string;

  timer15sTitle: string;
  timer15sDesc: string;
  timer15sBadge: string;

  // Gameplay HUD & Cards
  bankProgressLabel: string;
  bankProgressCount: string; // "{completed} of {total} Completed"
  bankQuestionsRemaining: string; // "{remaining} remaining"
  finishedLabel: string;
  questionNumberLabel: string; // "Question {current} of {total}"
  comboStreakLabel: string; // "{streak}x Combo!"
  liveStreakLabel: string; // "Streak: {streak}"
  liveStreakBonus: string; // "+{pct}% Combo Bonus"
  streakBroken: string; // "Streak broken!"
  bestStreakHud: string; // "Session Best: {best}"
  totalScoreLabel: string;
  timeLabel: string;
  baseScoreLabel: string;
  speedBonusLabel: string;
  feedbackCorrect: string; // "Correct! +{pts} pts ({mult}x difficulty)"
  feedbackTimeout: string; // "Time Expired! 0 pts. Buzzing & next question..."
  feedbackWrong: string; // "Wrong! 0 pts. Buzzing & next question..."
  keyboardTip: string;

  // Summary
  completedTitle: string;
  difficultyCompletedBadge: string; // "{mult}x Difficulty · {tier}"
  finalScoreLabel: string;
  accuracyLabel: string;
  accuracyCount: string; // "{correct} of {total}"
  bestStreakLabel: string;
  inARowLabel: string;
  pointsMultiplierLabel: string;
  timerPaceLabel: string;
  perQuestionLabel: string;
  playAgainBtn: string;
  changeTimerBtn: string;
  viewLeaderboardBtn: string;
  roundReviewTitle: string;
  yourAnswerLabel: string;
  correctAnswerLabel: string;
  timedOutLabel: string;
  wrongBuzzedLabel: string;

  // Question Bank View
  bankHeaderTitle: string;
  bankLoadedSummary: string; // "{count} questions currently loaded and ready to play."
  bankEmptySummary: string;
  sampleTxtBtn: string;
  exportBtn: string;
  clearBankBtn: string;
  clearBankConfirm: string;
  readyToPlayBannerTitle: string; // "{count} Questions Loaded from Your .txt File"
  readyToPlayBannerDesc: string;
  tabUpload: string;
  tabPaste: string;
  tabBrowse: string;
  formatGuideTitle: string;
  formatGuideDesc: string;
  dropFileTitle: string;
  dropFileSubtitle: string;
  chooseFileBtn: string;
  loadedFileLabel: string; // "Loaded file: {name}"
  playNowBtn: string;
  pasteTitle: string;
  insertTemplateBtn: string;
  pastePlaceholder: string;
  loadPasteBtn: string;
  searchPlaceholder: string;
  noQuestionsInBank: string;
  correctMarkerTag: string;

  // Leaderboard View
  leaderboardTitle: string;
  hallOfFameBadge: string;
  rankingsBadge: string;
  resetLeaderboardBtn: string;
  resetLeaderboardConfirm: string;
  playToRankBtn: string;
  sortByLabel: string;
  sortScore: string;
  sortAccuracy: string;
  sortStreak: string;
  championLabel: string;
  secondPlaceLabel: string;
  thirdPlaceLabel: string;
  colRank: string;
  colPlayer: string;
  colScore: string;
  colAccuracy: string;
  colBestStreak: string;
  colTimerPace: string;
  colDuration: string;
  youBadge: string;

  // Profile View
  profileTitle: string;
  newProfileBtn: string;
  editProfileBtn: string;
  saveChangesBtn: string;
  cancelBtn: string;
  createProfileBtn: string;
  displayNameLabel: string;
  titleLabel: string;
  avatarColorLabel: string;
  switchActiveProfileLabel: string;
  statHighScore: string;
  statPersonalRecord: string;
  statAccuracy: string;
  statCorrectCount: string; // "{count} correct answers"
  statBestStreak: string;
  statConsecutive: string;
  statQuizzesRun: string;
  statRoundsCompleted: string;
  recentAttemptsTitle: string;
  noAttemptsRecorded: string;
  colDate: string;
  performanceChartTitle: string;
  performanceChartSubtitle: string;
  chartCorrect: string;
  chartIncorrect: string;
  chartScore: string;
  chartViewStacked: string;
  chartViewGrouped: string;
  chartAttemptsCount: string;
  chartAttempt: string;
  chartNoDataYet: string;

  // Footer
  footerTagline: string;
  footerFeature1: string;
  footerFeature2: string;
  footerFeature3: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Brand & Nav
    brandName: 'Quiz Smash',
    brandTagline: 'Randomized MCQ Arena with Buzzer Feedback',
    navPlay: 'Play Quiz',
    navBank: 'Upload .txt Bank',
    navLeaderboard: 'Leaderboard',
    navProfile: 'Profile',
    quickStart: 'Start Quiz',
    soundOnTooltip: 'Sound is on (Click to mute buzzer)',
    soundOffTooltip: 'Sound is muted (Click to enable)',
    themeLightTooltip: 'Switch to Dark Mode',
    themeDarkTooltip: 'Switch to Light Mode',
    languageName: 'English',
    switchLangTooltip: 'تغيير اللغة إلى العربية',
    installOnPhone: 'Install App (PC & Phone)',
    installModalTitle: 'Install Quiz Smash on PC or Phone',
    installModalSubtitle:
      'Run Quiz Smash as an independent desktop application on Windows or mobile app on your phone.',
    tabDesktopPC: 'Computer / Windows (.exe)',
    tabMobilePhone: 'Phone (APK / iOS)',
    desktop1Title: 'Method 1: Instant Windows Desktop App (1-Click)',
    desktop1Desc:
      'Installs Quiz Smash directly onto your Windows computer with a desktop icon, Start Menu launcher, and standalone full-screen window without browser clutter.',
    installDesktopBtn: 'Install Desktop App Now',
    desktop2Title: 'Method 2: Export Official Windows Installer (.msix / .exe)',
    desktop2Desc:
      'Want an official Microsoft Windows installer file? Use the free Microsoft PWABuilder tool to package Quiz Smash for Windows 10/11 in 30 seconds:',
    generateWindowsBtn: 'Generate Windows Package on PWABuilder',
    desktop3Title: 'Method 3: Build Portable Quiz Smash.exe (Nativefier)',
    desktop3Desc:
      'If you have Node.js / Command Prompt (CMD) on your PC, you can bundle a standalone Quiz Smash.exe folder with this single command:',
    copyCommand: 'Copy Command',
    commandCopied: 'Copied!',
    method1Title: 'Method 1: Instant 1-Click Install (PWA / WebAPK)',
    method1Desc:
      'Installs Quiz Smash directly onto your phone home screen and app launcher as an independent app without needing Google Play.',
    installNowBtn: 'Install App on This Device',
    installedNotice: 'Quiz Smash is already installed on this device!',
    scanQRTitle: 'Scan QR Code on Your Phone',
    scanQRDesc:
      'Open your phone camera, scan the QR code to open Quiz Smash, then tap "Install" or "Add to Home Screen".',
    copyLink: 'Copy Link',
    linkCopied: 'Copied!',
    method2Title: 'Method 2: Export as Standalone Android .APK',
    method2Desc:
      'Need an official .apk file? You can convert Quiz Smash into a signed APK package for free in 30 seconds with PWABuilder (by Microsoft):',
    generateApkBtn: 'Generate .APK on PWABuilder',
    apkSteps:
      '1. Click the button above (your live URL is pre-filled).\n2. Click "Package for Android" -> "Generate APK".\n3. Download the .apk file and install it directly on your Android phone.',
    closeBtn: 'Close',

    // Lobby
    arenaBadge: 'Quiz Smash',
    randomizedBadge: 'Randomized Questions & Answers',
    timerChallengesBadge: '30s Per Question',
    arenaTitle: 'Quiz Smash Arena',
    arenaDescription:
      'Test your knowledge under pressure! 30 seconds per question with real-time speed bonuses. Questions and answer choices are randomized every round. Wrong answers trigger an immediate buzzer sound and advance to the next question.',
    highScore: 'High Score:',
    emptyBankTitle: 'Upload Your .txt Question Bank',
    emptyBankDesc:
      'Upload a .txt file with your questions. Mark each correct answer with a + sign in front. Questions and answers are automatically randomized!',
    uploadBankBtn: 'Upload .txt Question Bank',
    loadSampleBtn: 'Load Sample Bank',
    bankReady: 'Bank Ready',
    questionsCountLoaded: '{count} Questions Loaded',
    playingWithTimerDesc:
      'Playing with a 30-second timer per question. Earn {base} base pts + speed bonuses for fast answers!',
    startQuizSmashBtn: 'START QUIZ SMASH',
    manageTxtBankBtn: 'Manage .txt bank',
    fixedTimerRuleTitle: 'Fixed 30-Second Challenge',
    fixedTimerRuleDesc:
      'Every question has a strict 30-second timer with instant buzzer feedback on wrong answers. Fast correct answers earn extra speed points!',
    backToLobbyBtn: 'Back to Arena',
    selectTimerTitle: 'Question Timer',
    selectTimerDesc: 'Fixed 30s countdown for every question with speed bonuses:',
    timerMultiplierBadge: '{multiplier}x Multiplier · {tier}',
    baseSpeedScoreMeta: 'Base: {base} pts · +{speed} pts/sec',
    activeSelectionBadge: 'Active Selection',
    randomizationNotice:
      'Questions and all 4 answers shuffle randomly on every start.',
    modeSelectionTitle: 'Choose Your Playing Mode',
    modePracticeTitle: 'Practice Mode',
    modePracticeSubtitle: 'No timer pressure · Includes full explanations for each question to learn at your pace.',
    modePracticeBadge: '🎓 Untimed & Learning',
    modeExamTitle: 'Exam Mode',
    modeExamSubtitle: 'Strict 30 seconds per question · Speed bonuses · Realistic test simulation.',
    modeExamBadge: '⏱️ 30s Timed Exam',
    explanationTitle: 'Answer Explanation',
    explanationDesc: 'Why this is the correct answer:',
    noExplanationGiven: 'This is the verified correct answer for this question.',
    nextQuestionBtn: 'Next Question →',

    // 3 Timer presets
    timer5sTitle: '5s Ultra Blitz',
    timer5sDesc: 'Extreme pace for master reflexes',
    timer5sBadge: 'Insane Reflexes',

    timer10sTitle: '10s Competitive',
    timer10sDesc: 'Tournament standard speed & accuracy',
    timer10sBadge: 'Speed & Precision',

    timer15sTitle: '15s Standard',
    timer15sDesc: 'Thoughtful pace with solid bonuses',
    timer15sBadge: 'Balanced Challenge',

    // Gameplay HUD & Cards
    bankProgressLabel: 'Bank Progress:',
    bankProgressCount: '{completed} of {total} Completed',
    bankQuestionsRemaining: '{remaining} remaining',
    finishedLabel: 'Finished',
    questionNumberLabel: 'Question {current} of {total}',
    comboStreakLabel: '{streak}x Combo!',
    liveStreakLabel: 'Streak: {streak}',
    liveStreakBonus: '+{pct}% Combo Bonus',
    streakBroken: 'Streak broken!',
    bestStreakHud: 'Session Best: {best}',
    totalScoreLabel: 'Total Score',
    timeLabel: 'Time:',
    baseScoreLabel: 'Base:',
    speedBonusLabel: 'Speed Bonus:',
    feedbackCorrect: 'Correct! +{pts} pts ({mult}x difficulty)',
    feedbackTimeout: 'Time Expired! 0 pts. Buzzing & next question...',
    feedbackWrong: 'Wrong! 0 pts. Buzzing & next question...',
    keyboardTip: 'Tip: Press keys 1–4 or A–D',

    // Summary
    completedTitle: 'Quiz Smash Completed!',
    difficultyCompletedBadge: '{mult}x Difficulty · {tier}',
    finalScoreLabel: 'Final Score',
    accuracyLabel: 'Accuracy',
    accuracyCount: '{correct} of {total}',
    bestStreakLabel: 'Best Streak',
    inARowLabel: 'In a row',
    pointsMultiplierLabel: 'Points Multiplier',
    timerPaceLabel: 'Timer Pace',
    perQuestionLabel: 'Per question',
    playAgainBtn: 'Play Again (Shuffled)',
    changeTimerBtn: 'Change Timer',
    viewLeaderboardBtn: 'View Leaderboard',
    roundReviewTitle: 'Round Review & Points',
    yourAnswerLabel: 'Your answer:',
    correctAnswerLabel: 'Correct answer:',
    timedOutLabel: 'Timed Out',
    wrongBuzzedLabel: 'Wrong / Buzzed',

    // Question Bank View
    bankHeaderTitle: 'Upload Question Bank (.txt)',
    bankLoadedSummary: '{count} questions currently loaded and ready to play.',
    bankEmptySummary: 'No questions uploaded yet. Upload a .txt file below to start.',
    sampleTxtBtn: 'Sample .txt',
    exportBtn: 'Export',
    clearBankBtn: 'Clear Bank',
    clearBankConfirm: 'Clear all questions from your bank?',
    readyToPlayBannerTitle: '{count} Questions Loaded from Your .txt File',
    readyToPlayBannerDesc:
      'Questions and answer options will be randomized automatically in Quiz Smash.',
    tabUpload: 'Upload .txt',
    tabPaste: 'Paste Text',
    tabBrowse: 'Bank',
    formatGuideTitle: '.txt File Format',
    formatGuideDesc:
      'Write your question on the first line. Below it, list each answer choice. Put a + sign in front of the correct answer. Blank lines separate questions.',
    dropFileTitle: 'Select or Drop .txt File',
    dropFileSubtitle:
      'Upload your questions file. Quiz Smash will immediately parse your questions and randomize the order.',
    chooseFileBtn: 'Choose .txt File',
    loadedFileLabel: 'Loaded file: {name}',
    playNowBtn: 'Play Now',
    pasteTitle: 'Paste Question Bank Text',
    insertTemplateBtn: 'Insert Sample Template',
    pastePlaceholder:
      'Type or paste questions here. Put + in front of the correct answer...',
    loadPasteBtn: 'Load Questions & Enable Play',
    searchPlaceholder: 'Search questions or answers...',
    noQuestionsInBank: 'No questions in bank. Upload your .txt file to populate.',
    correctMarkerTag: '+CORRECT',

    // Leaderboard View
    leaderboardTitle: 'Leaderboard',
    hallOfFameBadge: 'Quiz Smash Hall of Fame',
    rankingsBadge: 'High Score Rankings',
    resetLeaderboardBtn: 'Reset Standings',
    resetLeaderboardConfirm: 'Reset leaderboard to default baseline challenger scores?',
    playToRankBtn: 'Play to Rank',
    sortByLabel: 'Sort by:',
    sortScore: 'Score',
    sortAccuracy: 'Accuracy',
    sortStreak: 'Streak',
    championLabel: 'Champion',
    secondPlaceLabel: '2nd Place',
    thirdPlaceLabel: '3rd Place',
    colRank: 'Rank',
    colPlayer: 'Player',
    colScore: 'Score',
    colAccuracy: 'Accuracy',
    colBestStreak: 'Best Streak',
    colTimerPace: 'Timer Pace',
    colDuration: 'Duration',
    youBadge: '(You)',

    // Profile View
    profileTitle: 'Profile',
    newProfileBtn: 'New Profile',
    editProfileBtn: 'Edit profile',
    saveChangesBtn: 'Save Changes',
    cancelBtn: 'Cancel',
    createProfileBtn: 'Create Profile',
    displayNameLabel: 'Display Name',
    titleLabel: 'Title',
    avatarColorLabel: 'Avatar Color Theme',
    switchActiveProfileLabel: 'Switch Active Profile:',
    statHighScore: 'High Score',
    statPersonalRecord: 'Personal record',
    statAccuracy: 'Accuracy',
    statCorrectCount: '{count} correct answers',
    statBestStreak: 'Best Streak',
    statConsecutive: 'Consecutive correct',
    statQuizzesRun: 'Quizzes Run',
    statRoundsCompleted: 'Rounds completed',
    recentAttemptsTitle: 'Recent Quiz Attempts',
    noAttemptsRecorded:
      'No quiz rounds recorded yet for this profile. Play a quiz to see your history!',
    colDate: 'Date',
    performanceChartTitle: 'Historical Performance (Correct vs Incorrect)',
    performanceChartSubtitle: 'Visualizing your answer accuracy and progress across quiz attempts over time',
    chartCorrect: 'Correct Answers',
    chartIncorrect: 'Incorrect / Missed',
    chartScore: 'Score',
    chartViewStacked: 'Stacked',
    chartViewGrouped: 'Side-by-Side',
    chartAttemptsCount: 'Past {count} Attempts',
    chartAttempt: 'Attempt',
    chartNoDataYet: 'Complete at least one quiz to view your historical performance chart.',

    // Footer
    footerTagline: 'Randomized MCQ Arena with Buzzer Feedback',
    footerFeature1: '30s Per Question',
    footerFeature2: 'Light & Dark Mode',
    footerFeature3: 'Upload .txt Question Bank',
  },

  ar: {
    // Brand & Nav
    brandName: 'كويز سماش',
    brandTagline: 'ساحة أسئلة متعددة الخيارات عشوائية مع صفارة إنذار فورية',
    navPlay: 'بدء اللعب',
    navBank: 'رفع بنك الأسئلة (.txt)',
    navLeaderboard: 'لوحة الصدارة',
    navProfile: 'الملف الشخصي',
    quickStart: 'ابدأ الكويز',
    soundOnTooltip: 'الصوت مفعّل (انقر لكتم صوت الصفارة)',
    soundOffTooltip: 'الصوت مكتوم (انقر لتفعيل الصوت)',
    themeLightTooltip: 'التبديل إلى الوضع الداكن',
    themeDarkTooltip: 'التبديل إلى الوضع الفاتح',
    languageName: 'العربية',
    switchLangTooltip: 'Switch language to English',
    installOnPhone: 'تثبيت التطبيق (كمبيوتر وهاتف)',
    installModalTitle: 'تثبيت كويز سماش على الكمبيوتر أو الهاتف',
    installModalSubtitle:
      'شغّل كويز سماش كتطبيق مستقل على نظام ويندوز للكمبيوتر أو كتطبيق أصلي على هاتفك.',
    tabDesktopPC: 'الكمبيوتر / ويندوز (.exe)',
    tabMobilePhone: 'الهاتف (APK / iOS)',
    desktop1Title: 'الطريقة 1: تثبيت فوري كتطبيق ويندوز لسطح المكتب (بنقرة واحدة)',
    desktop1Desc:
      'تثبيت كويز سماش مباشرة على جهاز الكمبيوتر الخاص بك، حيث يتم إنشاء أيقونة على سطح المكتب وقائمة ابدأ وفتح التطبيق في نافذة مستقلة كاملة بدون شريط المتصفح.',
    installDesktopBtn: 'تثبيت تطبيق الكمبيوتر الآن',
    desktop2Title: 'الطريقة 2: إنشاء حزمة تثبيت رسمية لويندوز (.msix / .exe)',
    desktop2Desc:
      'هل ترغب بملف تثبيت رسمي لنظام ويندوز 10/11؟ استخدم أداة مايكروسوفت الرسمية PWABuilder لتحزيم التطبيق في 30 ثانية:',
    generateWindowsBtn: 'إنشاء حزمة ويندوز عبر PWABuilder',
    desktop3Title: 'الطريقة 3: إنشاء ملف Quiz Smash.exe محمول (Nativefier)',
    desktop3Desc:
      'إذا كان لديك Node.js في سطر أوامر ويندوز (CMD)، يمكنك بناء مجلد كامل يحتوي على Quiz Smash.exe عبر هذا الأمر المباشر:',
    copyCommand: 'نسخ الأمر',
    commandCopied: 'تم النسخ!',
    method1Title: 'الطريقة 1: التثبيت الفوري بنقرة واحدة (PWA / WebAPK)',
    method1Desc:
      'تثبيت كويز سماش مباشرة على شاشتك الرئيسية وقائمة التطبيقات كتطبيق مستقل وخفيف لا يتطلب متجر تطبيقات.',
    installNowBtn: 'تثبيت التطبيق على هذا الجهاز',
    installedNotice: 'تم تثبيت كويز سماش بالفعل على هذا الجهاز!',
    scanQRTitle: 'امسح رمز QR بكاميرا هاتفك',
    scanQRDesc:
      'افتح كاميرا الهاتف وامسح الرمز لفتح التطبيق، ثم اضغط على "تثبيت" أو "إضافة إلى الشاشة الرئيسية".',
    copyLink: 'نسخ الرابط',
    linkCopied: 'تم النسخ!',
    method2Title: 'الطريقة 2: تصدير ملف APK مخصص للأندرويد',
    method2Desc:
      'هل ترغب بملف تثبيت أندرويد مستقل بصيغة .apk؟ يمكنك إنشاء حزمة APK موقّعة مجاناً في 30 ثانية عبر أداة PWABuilder الرسمية (من مايكروسوفت):',
    generateApkBtn: 'إنشاء ملف .APK عبر PWABuilder',
    apkSteps:
      '1. اضغط على الزر أعلاه (رابط تطبيقك مُعبأ مسبقاً).\n2. اضغط على "Package for Android" ثم "Generate APK".\n3. قم بتحميل ملف .apk وتثبيته مباشرة على هاتفك.',
    closeBtn: 'إغلاق',

    // Lobby
    arenaBadge: 'كويز سماش',
    randomizedBadge: 'أسئلة وخيارات عشوائية',
    timerChallengesBadge: '30 ثانية لكل سؤال',
    arenaTitle: 'ساحة كويز سماش',
    arenaDescription:
      'اختبر معلوماتك وسرعة بديهتك تحت الضغط! 30 ثانية لكل سؤال مع مكافآت السرعة. يتم ترتيب الأسئلة والخيارات عشوائياً في كل جولة. الإجابات الخاطئة تُصدر صوت صفارة إنذار (بزر) فوراً وتنقلك مباشرة إلى السؤال التالي.',
    highScore: 'أعلى نتيجة:',
    emptyBankTitle: 'ارفع بنك الأسئلة بصيغة .txt',
    emptyBankDesc:
      'ارفع ملف .txt يحتوي على أسئلتك. ميّز كل إجابة صحيحة بوضع علامة + أمامها مباشرة. سيتم خلط الأسئلة والخيارات الأربعة عشوائياً في كل مرة!',
    uploadBankBtn: 'رفع بنك الأسئلة (.txt)',
    loadSampleBtn: 'تحميل نموذج أسئلة جاهز',
    bankReady: 'البنك جاهز',
    questionsCountLoaded: 'تم تحميل {count} سؤال',
    playingWithTimerDesc:
      'اللعب بمؤقت 30 ثانية لكل سؤال. اكسب {base} نقطة أساسية + مكافآت السرعة للإجابة السريعة!',
    startQuizSmashBtn: 'ابدأ كويز سماش الآن',
    manageTxtBankBtn: 'إدارة بنك .txt',
    fixedTimerRuleTitle: 'تحدي الـ 30 ثانية الموحد',
    fixedTimerRuleDesc:
      'كل سؤال يحتوي على عد تنازلي مدته 30 ثانية مع صفارة إنذار فورية عند الخطأ. الإجابات السريعة الصحيحة تمنحك نقاط سرعة إضافية!',
    backToLobbyBtn: 'العودة إلى الساحة',
    selectTimerTitle: 'مؤقت الأسئلة',
    selectTimerDesc: 'مؤقت محدد بـ 30 ثانية لكل سؤال مع مكافآت للسرعة:',
    timerMultiplierBadge: 'مضاعف {multiplier}x · {tier}',
    baseSpeedScoreMeta: 'الأساس: {base} نقطة · +{speed} نقطة/ثانية',
    activeSelectionBadge: 'المحدد حالياً',
    randomizationNotice:
      'يتم ترتيب الأسئلة وجميع الخيارات الأربعة عشوائياً عند كل بداية.',
    modeSelectionTitle: 'اختر وضع اللعب',
    modePracticeTitle: 'وضع التدريب (بدون مؤقت)',
    modePracticeSubtitle: 'تعلّم بهدوء دون ضغط الوقت · يشمل شرحاً مفصلاً للإجابة الصحيحة لكل سؤال.',
    modePracticeBadge: '🎓 تدريب وشروحات',
    modeExamTitle: 'وضع الاختبار (30 ثانية)',
    modeExamSubtitle: '30 ثانية صارمة لكل سؤال · مكافآت سرعة · محاكاة واقعية لاختبار حقيقي.',
    modeExamBadge: '⏱️ اختبار مؤقت 30 ثانية',
    explanationTitle: 'تفسير الإجابة الصحيحة',
    explanationDesc: 'لماذا هذه هي الإجابة الصحيحة:',
    noExplanationGiven: 'هذه هي الإجابة النموذجية المعتمدة لهذا السؤال.',
    nextQuestionBtn: 'السؤال التالي ←',

    // 3 Timer presets
    timer5sTitle: '5 ثوانٍ - الخاطف الفائق',
    timer5sDesc: 'وتيرة قصوى لأصحاب ردود الأفعال الخارقة',
    timer5sBadge: 'سرعة خارقة',

    timer10sTitle: '10 ثوانٍ - التنافسي',
    timer10sDesc: 'معيار البطولات التنافسية للسرعة والدقة',
    timer10sBadge: 'سرعة ودقة',

    timer15sTitle: '15 ثانية - القياسي',
    timer15sDesc: 'وتيرة متوازنة تمنح وقتاً كافياً للتفكير',
    timer15sBadge: 'تحدٍ متوازن',

    // Gameplay HUD & Cards
    bankProgressLabel: 'تقدم بنك الأسئلة:',
    bankProgressCount: 'تم إنجاز {completed} من أصل {total}',
    bankQuestionsRemaining: 'متبقي {remaining} أسئلة',
    finishedLabel: 'مكتمل',
    questionNumberLabel: 'السؤال {current} من {total}',
    comboStreakLabel: '{streak}x تتابع ناري!',
    liveStreakLabel: 'التتابع: {streak}',
    liveStreakBonus: '+{pct}% مكافأة تتابع',
    streakBroken: 'انقطع التتابع!',
    bestStreakHud: 'أفضل تتابع بالجلسة: {best}',
    totalScoreLabel: 'مجموع النقاط',
    timeLabel: 'الوقت المتبقي:',
    baseScoreLabel: 'الأساس:',
    speedBonusLabel: 'مكافأة السرعة:',
    feedbackCorrect: 'إجابة صحيحة! +{pts} نقطة (صعوبة {mult}x)',
    feedbackTimeout: 'انتهى الوقت! 0 نقطة. صفارة الإنذار والانتقال للسؤال التالي...',
    feedbackWrong: 'إجابة خاطئة! 0 نقطة. صفارة الإنذار والانتقال للسؤال التالي...',
    keyboardTip: 'تلميح: يمكنك الضغط على الأرقام 1-4 أو الحروف A-D للإجابة السريعة',

    // Summary
    completedTitle: 'اكتملت جولة كويز سماش!',
    difficultyCompletedBadge: 'مضاعف {mult}x · {tier}',
    finalScoreLabel: 'النتيجة النهائية',
    accuracyLabel: 'نسبة الدقة',
    accuracyCount: '{correct} من أصل {total}',
    bestStreakLabel: 'أطول تتابع صحيح',
    inARowLabel: 'إجابات متتالية',
    pointsMultiplierLabel: 'مضاعف الصعوبة',
    timerPaceLabel: 'وتيرة المؤقت',
    perQuestionLabel: 'لكل سؤال',
    playAgainBtn: 'العب مجدداً (خلط عشوائي)',
    changeTimerBtn: 'تغيير المؤقت',
    viewLeaderboardBtn: 'عرض لوحة الصدارة',
    roundReviewTitle: 'مراجعة إجابات الجولة والنقاط',
    yourAnswerLabel: 'إجابتك:',
    correctAnswerLabel: 'الإجابة الصحيحة:',
    timedOutLabel: 'انتهى الوقت',
    wrongBuzzedLabel: 'خاطئة / صفارة إنذار',

    // Question Bank View
    bankHeaderTitle: 'رفع بنك الأسئلة (.txt)',
    bankLoadedSummary: 'يوجد حالياً {count} سؤال في البنك جاهزة للعب.',
    bankEmptySummary: 'لم يتم رفع أسئلة بعد. ارفع ملف .txt أدناه للبدء.',
    sampleTxtBtn: 'نموذج ملف .txt',
    exportBtn: 'تصدير البنك',
    clearBankBtn: 'مسح البنك',
    clearBankConfirm: 'هل أنت متأكد من مسح جميع الأسئلة من البنك؟',
    readyToPlayBannerTitle: 'تم تحميل {count} سؤال بنجاح من ملفك',
    readyToPlayBannerDesc:
      'سيتم خلط الأسئلة وجميع الخيارات عشوائياً تلقائياً عند بدء كويز سماش.',
    tabUpload: 'رفع ملف .txt',
    tabPaste: 'لصق نص مباشر',
    tabBrowse: 'استعراض البنك',
    formatGuideTitle: 'صيغة ملف .txt المطلوبة',
    formatGuideDesc:
      'اكتب السؤال في السطر الأول. وأسفله اكتب كل خيار في سطر مستقل. ضع علامة + في بداية الإجابة الصحيحة مباشرة. اترك سطراً فارغاً بين كل سؤال والآخر.',
    dropFileTitle: 'اختر أو أسقط ملف .txt هنا',
    dropFileSubtitle:
      'ارفع ملف الأسئلة وسيقوم كويز سماش بقراءته فوراً وترتيب الأسئلة عشوائياً.',
    chooseFileBtn: 'اختيار ملف .txt',
    loadedFileLabel: 'الملف الحالي: {name}',
    playNowBtn: 'العب الآن',
    pasteTitle: 'لصق نص بنك الأسئلة مباشرة',
    insertTemplateBtn: 'إدراج نموذج تجريبي',
    pastePlaceholder:
      'اكتب أو الصق الأسئلة هنا. ضع علامة + أمام الإجابة الصحيحة في بداية السطر...',
    loadPasteBtn: 'تحميل الأسئلة والبدء',
    searchPlaceholder: 'ابحث في الأسئلة أو الإجابات...',
    noQuestionsInBank: 'لا توجد أسئلة في البنك. ارفع ملف .txt للبدء.',
    correctMarkerTag: '+صحيحة',

    // Leaderboard View
    leaderboardTitle: 'لوحة الصدارة',
    hallOfFameBadge: 'قاعة مشاهير كويز سماش',
    rankingsBadge: 'ترتيب أعلى النتائج',
    resetLeaderboardBtn: 'إعادة ضبط الترتيب',
    resetLeaderboardConfirm: 'هل تريد إعادة ضبط لوحة الصدارة للقيم الافتراضية؟',
    playToRankBtn: 'العب للتصنيف',
    sortByLabel: 'ترتيب حسب:',
    sortScore: 'النقاط',
    sortAccuracy: 'الدقة',
    sortStreak: 'التتابع',
    championLabel: 'البطل',
    secondPlaceLabel: 'المركز الثاني',
    thirdPlaceLabel: 'المركز الثالث',
    colRank: 'الترتيب',
    colPlayer: 'اللاعب',
    colScore: 'النقاط',
    colAccuracy: 'الدقة',
    colBestStreak: 'أطول تتابع',
    colTimerPace: 'وتيرة المؤقت',
    colDuration: 'المدة',
    youBadge: '(أنت)',

    // Profile View
    profileTitle: 'الملف الشخصي',
    newProfileBtn: 'ملف جديد',
    editProfileBtn: 'تعديل الملف',
    saveChangesBtn: 'حفظ التغييرات',
    cancelBtn: 'إلغاء',
    createProfileBtn: 'إنشاء الملف الشخصي',
    displayNameLabel: 'اسم اللاعب',
    titleLabel: 'اللقب',
    avatarColorLabel: 'لون الصورة الرمزية',
    switchActiveProfileLabel: 'التبديل بين الملفات الشخصية:',
    statHighScore: 'أعلى نتيجة',
    statPersonalRecord: 'الرقم القياسي الشخصي',
    statAccuracy: 'معدل الدقة',
    statCorrectCount: '{count} إجابة صحيحة',
    statBestStreak: 'أفضل تتابع',
    statConsecutive: 'إجابات صحيحة متتالية',
    statQuizzesRun: 'الجولات الملعوبة',
    statRoundsCompleted: 'جولات مكتملة',
    recentAttemptsTitle: 'سجل المحاولات الأخيرة',
    noAttemptsRecorded: 'لا توجد جولات مسجلة بعد لهذا الملف. العب جولة لتسجيل إنجازاتك!',
    colDate: 'التاريخ',
    performanceChartTitle: 'الأداء التاريخي (الإجابات الصحيحة مقابل الخاطئة)',
    performanceChartSubtitle: 'تتبع مستوى دقتك وتوزيع الإجابات عبر المحاولات بمرور الوقت',
    chartCorrect: 'إجابات صحيحة',
    chartIncorrect: 'إجابات خاطئة / فائتة',
    chartScore: 'النقاط',
    chartViewStacked: 'تراكمي',
    chartViewGrouped: 'جنباً إلى جنب',
    chartAttemptsCount: 'آخر {count} محاولات',
    chartAttempt: 'المحاولة',
    chartNoDataYet: 'أكمل جولة اختبار واحدة على الأقل لعرض الرسم البياني للأداء التاريخي.',

    // Footer
    footerTagline: 'ساحة أسئلة متعددة الخيارات عشوائية مع صفارة إنذار فورية',
    footerFeature1: '30 ثانية لكل سؤال',
    footerFeature2: 'الوضع الفاتح والداكن',
    footerFeature3: 'رفع بنك أسئلة بصيغة .txt',
  },
};

/**
 * Helper to interpolate template variables like "{count}" into translated strings.
 */
export function formatString(template: string, vars: Record<string, string | number>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return result;
}
