import React, { useState, useEffect } from 'react';
import {
  X,
  KeyRound,
  Copy,
  Check,
  Search,
  Download,
  Shield,
  ShieldCheck,
  Database,
  FileCode,
  Zap,
  UserPlus,
  Mail,
  MessageCircle,
  Clock,
  Send,
} from 'lucide-react';
import { COURSE_1_ACCESS_CODES_100 } from '../data/course1Codes';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  OwnerNotificationService,
  StudentRegistrationRecord,
  OWNER_WHATSAPP,
} from '../services/ownerNotificationService';

export const ADMIN_EMAIL = 'dr.khalil.awad@gmail.com';

interface AdminCodesPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminCodesPortal: React.FC<AdminCodesPortalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'codes' | 'registrations' | 'sql'>('codes');
  const [copiedSql, setCopiedSql] = useState(false);
  const [registrations, setRegistrations] = useState<StudentRegistrationRecord[]>(() =>
    OwnerNotificationService.getRegistrations()
  );

  useEffect(() => {
    if (isOpen) {
      setRegistrations(OwnerNotificationService.getRegistrations());
    }
  }, [isOpen]);

  // Strict check: only Dr. Khalil can access this
  const isAuthorized = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  if (!isOpen) return null;

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 text-center border-2 border-rose-300 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-2">
            {isRTL ? 'منطقة خاصة بالمالك فقط' : 'Owner Access Only'}
          </h3>
          <p className="text-xs text-slate-600 mb-4">
            {isRTL
              ? `هذه الصفحة ومستودع الأكواد متاح فقط للمشرف (${ADMIN_EMAIL}).`
              : `This code bank is strictly reserved for the app owner (${ADMIN_EMAIL}).`}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer"
          >
            {isRTL ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    );
  }

  const filteredCodes = COURSE_1_ACCESS_CODES_100.filter((c, idx) => {
    const q = searchQuery.trim();
    if (!q) return true;
    return c.includes(q) || String(idx + 1).includes(q);
  });

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const handleCopyAllCodes = async () => {
    try {
      const text = COURSE_1_ACCESS_CODES_100.map((c, i) => `${i + 1}. ${c}`).join('\n');
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    } catch {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    }
  };

  const handleDownloadTxt = () => {
    const text = [
      '====================================================================',
      'QUIZ SMASH - 100 ACCESS CODES (13 FIGURES)',
      'Owner: Dr. Khalil Awad (dr.khalil.awad@gmail.com)',
      'Course: First Course (First Level) - Dental Faculty',
      'Logins Allowance: 100 Logins per code',
      'Restriction: Works ONLY for Course 1 (First Level)',
      '====================================================================\n',
      ...COURSE_1_ACCESS_CODES_100.map((c, i) => `Code #${String(i + 1).padStart(3, '0')}: ${c}`),
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'QuizSmash_DrKhalil_100_Codes_Course1.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sqlSnippet = `-- Table & 100 Codes for Course 1 in Supabase:
CREATE TABLE IF NOT EXISTS public.course_access_codes (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    allowed_course VARCHAR(50) NOT NULL DEFAULT 'stage-1',
    course_name VARCHAR(100) NOT NULL DEFAULT 'First Course',
    max_logins INTEGER NOT NULL DEFAULT 100,
    used_logins INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- (See complete SQL in supabase_course1_codes.sql)`;

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(sqlSnippet);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    } catch {
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* HEADER */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold tracking-tight">
                  {isRTL ? 'مستودع الأكواد الخاص (د. خليل عواد)' : 'Owner Private Code Bank (Dr. Khalil)'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  100 Codes · 13 Figures
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono">
                {ADMIN_EMAIL} · {isRTL ? 'مخصصة حصرياً للمرحلة الأولى (100 دخول)' : 'Course 1 Only · 100 Logins'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* TABS */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 text-xs font-bold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('codes')}
            className={`py-2 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'codes'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{isRTL ? 'قائمة الـ 100 كود' : '100 Codes List'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('registrations')}
            className={`py-2 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'registrations'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{isRTL ? `تسجيلات الطلاب (${registrations.length})` : `Signups (${registrations.length})`}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sql')}
            className={`py-2 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'sql'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isRTL ? 'قاعدة بيانات Supabase (SQL)' : 'Supabase SQL'}</span>
          </button>
        </div>

        {activeTab === 'codes' ? (
          <>
            {/* SEARCH & ACTIONS BAR */}
            <div className="p-3 sm:p-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRTL ? 'بحث برقم الكود أو التسلسل (مثال: 01 أو 187...)' : 'Search by code or #...'}
                  className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyAllCodes}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                    copiedAll
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  }`}
                >
                  {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAll ? (isRTL ? 'تم نسخ الـ 100 كود!' : '100 Copied!') : (isRTL ? 'نسخ الكل' : 'Copy All')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{isRTL ? 'تنزيل TXT' : 'Download TXT'}</span>
                </button>
              </div>
            </div>

            {/* CODES LIST */}
            <div className="p-3 sm:p-4 overflow-y-auto flex-1 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCodes.map((code) => {
                  const originalIndex = COURSE_1_ACCESS_CODES_100.indexOf(code) + 1;
                  const isCopied = copiedCode === code;

                  return (
                    <div
                      key={code}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/70 hover:bg-indigo-50/20 transition-colors flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-[10px] font-black text-slate-400 font-mono w-7 shrink-0">
                          #{String(originalIndex).padStart(3, '0')}
                        </span>
                        <span className="font-mono text-xs font-black tracking-wider text-slate-900 select-all truncate">
                          {code}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyCode(code)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shrink-0 ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
                        }`}
                        title="Copy Code"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span className="text-[10px]">{isRTL ? 'تم' : 'Done'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[10px]">{isRTL ? 'نسخ' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : activeTab === 'registrations' ? (
          /* REGISTRATIONS TAB */
          <div className="p-4 overflow-y-auto flex-1 space-y-3">
            {/* Owner Email & WhatsApp Status Card */}
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  <span>{isRTL ? 'إشعارات التسجيل الفورية عبر البريد' : 'Instant Email Notifications'}</span>
                </div>
                <div className="text-[11px] text-indigo-800 font-mono mt-0.5">
                  {ADMIN_EMAIL}
                </div>
                <div className="text-[10px] text-indigo-600 mt-1">
                  {isRTL
                    ? `رقم واتساب المعتمد للأكواد: +${OWNER_WHATSAPP}`
                    : `Owner WhatsApp for codes: +${OWNER_WHATSAPP}`}
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-indigo-900 font-bold text-center shrink-0">
                <span className="text-sm font-black font-mono block">{registrations.length}</span>
                <span className="text-[10px] text-slate-500">{isRTL ? 'طالب مسجل' : 'Students'}</span>
              </div>
            </div>

            {registrations.length === 0 ? (
              <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <UserPlus className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-700">
                  {isRTL ? 'لا توجد تسجيلات جديدة حتى الآن' : 'No student registrations yet'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {isRTL
                    ? `عند تسجيل أي طالب جديد في التطبيق، سيصلك إشعار فوري على ${ADMIN_EMAIL} وسيظهر الطالب هنا.`
                    : `When a student signs up, an email notification will be delivered to ${ADMIN_EMAIL} and will appear here.`}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {registrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{reg.fullName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                          {reg.courseName}
                        </span>
                      </div>
                      <div className="text-xs text-indigo-600 font-mono font-medium">{reg.email}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{reg.formattedDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={async () => {
                          await navigator.clipboard.writeText(reg.email);
                          setCopiedEmail(reg.id);
                          setTimeout(() => setCopiedEmail(null), 2000);
                        }}
                        title={isRTL ? 'نسخ البريد الإلكتروني' : 'Copy Email'}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs flex items-center gap-1"
                      >
                        {copiedEmail === reg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[11px]">{copiedEmail === reg.id ? (isRTL ? 'تم النسخ' : 'Copied') : (isRTL ? 'نسخ' : 'Copy')}</span>
                      </button>

                      <a
                        href={`mailto:${reg.email}?subject=Quiz Smash Activation Code&body=Hello ${encodeURIComponent(reg.fullName)},\n\nHere is your Quiz Smash Course 1 activation code (100 logins):\n[CODE HERE]\n\nRegards,\nDr. Khalil Awad (+${OWNER_WHATSAPP})`}
                        title={isRTL ? 'إرسال كود بالبريد' : 'Email Code'}
                        className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors cursor-pointer text-xs flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span className="text-[11px]">{isRTL ? 'إرسال كود' : 'Send Code'}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* SQL TAB */
          <div className="p-4 overflow-y-auto flex-1">
            <div className="p-3 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto relative">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800 text-slate-400">
                <span>supabase_course1_codes.sql</span>
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold cursor-pointer flex items-center gap-1"
                >
                  {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSql ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-[11px] leading-relaxed whitespace-pre-wrap">{sqlSnippet}</pre>
            </div>
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              {isRTL
                ? 'الملف الكامل supabase_course1_codes.sql متوفر في جذر المشروع ويحتوي على إنشاء الجدول مع إدراج جميع الـ 100 كود.'
                : 'The complete SQL file is saved at supabase_course1_codes.sql in the project root.'}
            </p>
          </div>
        )}

        {/* FOOTER */}
        <div className="p-3 sm:p-4 border-t-2 border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-[11px]">
              {isRTL
                ? `خاص بالمشرف: dr.khalil.awad@gmail.com · واتساب: +${OWNER_WHATSAPP}`
                : `Owner: dr.khalil.awad@gmail.com · WhatsApp: +${OWNER_WHATSAPP}`}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
          >
            {isRTL ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
