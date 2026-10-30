import React, { useState } from 'react';
import {
  Monitor,
  Smartphone,
  Download,
  QrCode,
  Copy,
  Check,
  X,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../context/LanguageContext';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const { t, isRTL } = useLanguage();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  if (!isOpen) return null;

  // Use the canonical shared preview URL or window.location.origin
  const appUrl =
    typeof window !== 'undefined' && window.location.origin.includes('run.app')
      ? window.location.origin
      : 'https://ais-pre-mbczawcyxxdsvpvs3zbuq6-464394984811.europe-west2.run.app';

  // QR Code URL using quick QR service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    appUrl
  )}&bgcolor=ffffff&color=4f46e5&margin=1`;

  const pwabuilderUrl = `https://www.pwabuilder.com?site=${encodeURIComponent(appUrl)}`;

  const nativefierCmd = `npx nativefier --name "Quiz Smash" --width 1200 --height 850 "${appUrl}"`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(nativefierCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  const handleInstallClick = async () => {
    await install();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 ltr:right-5 rtl:left-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 shrink-0">
            {activeTab === 'desktop' ? <Monitor className="h-6 w-6" /> : <Smartphone className="h-6 w-6" />}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('installModalTitle')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('installModalSubtitle')}
            </p>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'desktop'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Monitor className="h-4 w-4" />
            <span>{t('tabDesktopPC')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mobile')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'mobile'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>{t('tabMobilePhone')}</span>
          </button>
        </div>

        {/* ===================== TAB 1: COMPUTER / WINDOWS (.EXE) ===================== */}
        {activeTab === 'desktop' && (
          <div className="space-y-4">
            {/* Method 1: Instant Desktop App via Browser */}
            <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/60 dark:from-indigo-950/30 dark:via-slate-900 dark:to-violet-950/30 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                <Sparkles className="h-4 w-4" />
                <span>{t('desktop1Title')}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {t('desktop1Desc')}
              </p>

              {isInstallable ? (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all shadow-md shadow-indigo-600/30 mb-2"
                >
                  <Download className="h-4 w-4" />
                  <span>{t('installDesktopBtn')}</span>
                </button>
              ) : isInstalled ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{t('installedNotice')}</span>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2 mb-2">
                  <Download className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>
                    In <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>, click the <strong>Install icon (computer with down arrow)</strong> inside the right side of the URL address bar.
                  </span>
                </div>
              )}
            </div>

            {/* Method 2: PWABuilder Windows Package */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>{t('desktop2Title')}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {t('desktop2Desc')}
              </p>

              <a
                href={pwabuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-800 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all"
              >
                <Download className="h-4 w-4 text-indigo-500" />
                <span>{t('generateWindowsBtn')}</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
            </div>

            {/* Method 3: 1-Line Command to build Quiz Smash.exe (Nativefier) */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                <Terminal className="h-4 w-4 text-amber-500" />
                <span>{t('desktop3Title')}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2.5">
                {t('desktop3Desc')}
              </p>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto shadow-inner border border-slate-800">
                <span className="text-indigo-400 select-none">$</span>
                <span className="flex-1 truncate select-all">{nativefierCmd}</span>
                <button
                  type="button"
                  onClick={handleCopyCmd}
                  className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-bold shrink-0 flex items-center gap-1"
                >
                  {copiedCmd ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedCmd ? t('commandCopied') : t('copyCommand')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: MOBILE PHONE (APK / IOS) ===================== */}
        {activeTab === 'mobile' && (
          <div className="space-y-4">
            {/* Method 1: Instant Phone PWA */}
            <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/60 dark:from-indigo-950/30 dark:via-slate-900 dark:to-violet-950/30 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                <Sparkles className="h-4 w-4" />
                <span>{t('method1Title')}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {t('method1Desc')}
              </p>

              {isInstallable && (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all shadow-md shadow-indigo-600/30 mb-4"
                >
                  <Download className="h-4 w-4" />
                  <span>{t('installNowBtn')}</span>
                </button>
              )}

              {isInstalled && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{t('installedNotice')}</span>
                </div>
              )}

              {isIOS && (
                <div className="mb-4 p-3 rounded-lg bg-indigo-100/60 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200">
                  <span className="font-bold">iOS / Safari:</span> Tap the <strong>Share</strong> button (square with arrow) at the bottom, then choose <strong>&ldquo;Add to Home Screen&rdquo;</strong>.
                </div>
              )}

              {/* Scan QR Code or Open on Phone */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 border-t border-indigo-100 dark:border-indigo-950/80">
                <div className="p-2 bg-white rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
                  <img
                    src={qrCodeUrl}
                    alt="Quiz Smash QR Code"
                    className="h-28 w-28 rounded-lg"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left rtl:sm:text-right">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start rtl:sm:justify-start gap-1.5 mb-1">
                    <QrCode className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>{t('scanQRTitle')}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2.5">
                    {t('scanQRDesc')}
                  </p>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={appUrl}
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-[11px] font-mono text-slate-600 dark:text-slate-400 truncate"
                    />
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0 flex items-center gap-1 shadow-sm"
                    >
                      {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                      <span>{copiedLink ? t('linkCopied') : t('copyLink')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Android APK generator via PWABuilder */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>{t('method2Title')}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {t('method2Desc')}
              </p>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 font-mono whitespace-pre-line mb-3 leading-relaxed">
                {t('apkSteps')}
              </div>

              <a
                href={pwabuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-800 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all"
              >
                <Download className="h-4 w-4 text-emerald-500" />
                <span>{t('generateApkBtn')}</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {t('closeBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};
