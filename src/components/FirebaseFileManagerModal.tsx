import React, { useState, useEffect, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  Trash2,
  Download,
  Check,
  X,
  Copy,
  AlertCircle,
  FileCheck,
  FolderOpen,
  Sparkles,
} from 'lucide-react';
import {
  uploadFileToFirebaseStorage,
  deleteFileFromFirebaseStorage,
  db,
  auth,
} from '../services/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface StoredFile {
  fileId: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  uploaderUid: string;
  uploadedAt: string;
}

interface FirebaseFileManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseFileManagerModal: React.FC<FirebaseFileManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isRTL } = useLanguage();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<StoredFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadFiles();
    }
  }, [isOpen]);

  const loadFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const q = query(collection(db, 'files'), limit(50));
      const snap = await getDocs(q);
      const items: StoredFile[] = [];
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (!d.deleted) {
          items.push(d as StoredFile);
        }
      });
      // Sort newest first
      items.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
      setFiles(items);
    } catch {
      // Graceful fallback to local mock list if offline
      const stored = localStorage.getItem('quiz_smash_stored_files_v1');
      if (stored) {
        setFiles(JSON.parse(stored));
      }
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadFileToFirebaseStorage(selectedFile, 'dental_resources');
      const updated = [result as StoredFile, ...files];
      setFiles(updated);
      try {
        localStorage.setItem('quiz_smash_stored_files_v1', JSON.stringify(updated));
      } catch {
        // Ignore
      }
    } catch (err: any) {
      setUploadError(err.message || (isRTL ? 'فشل رفع الملف إلى فايربيس' : 'Upload to Firebase failed'));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (fileId: string) => {
    try {
      await deleteFileFromFirebaseStorage(fileId, `dental_resources/${auth.currentUser?.uid || 'user'}/${fileId}`);
      const updated = files.filter((f) => f.fileId !== fileId);
      setFiles(updated);
      try {
        localStorage.setItem('quiz_smash_stored_files_v1', JSON.stringify(updated));
      } catch {
        // Ignore
      }
    } catch (err) {
      console.warn('Delete error:', err);
    }
  };

  const handleCopyLink = (file: StoredFile) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(file.fileUrl);
      setCopiedId(file.fileId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm select-none">
      <div className="w-full max-w-2xl bg-white rounded-3xl border-2 border-emerald-500/40 shadow-2xl flex flex-col max-h-[88vh] overflow-hidden text-slate-900">
        {/* HEADER */}
        <div className="p-4 sm:p-5 border-b border-[#D9E2CE] bg-[#FAF9F6] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl btn-glossy-emerald text-white flex items-center justify-center shadow-md shrink-0">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {isRTL ? 'مستودع ملفات فايربيس (Firebase Storage)' : 'Firebase Cloud Storage'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  {files.length} {isRTL ? 'ملف' : 'Files'}
                </span>
              </div>
              <p className="text-xs text-[#556B2F]">
                {isRTL
                  ? 'رفع وتخزين ملخصات ومصادر طب الأسنان عبر سحابة فايربيس'
                  : 'Store and access dental lectures, summaries and resources'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            title={isRTL ? 'إغلاق' : 'Close'}
            aria-label={isRTL ? 'إغلاق' : 'Close'}
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* UPLOAD DROP AREA */}
        <div className="p-4 border-b border-[#D9E2CE] bg-gradient-to-r from-emerald-50/70 via-[#F2F5ED] to-white shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            id="firebase-file-input"
          />

          <label
            htmlFor="firebase-file-input"
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-emerald-400 hover:border-emerald-600 rounded-2xl bg-white/80 hover:bg-white cursor-pointer transition-all shadow-xs group"
          >
            <UploadCloud className="w-8 h-8 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-black text-slate-900">
              {isUploading
                ? isRTL
                  ? 'جاري رفع الملف إلى فايربيس...'
                  : 'Uploading to Firebase Storage...'
                : isRTL
                ? 'انقر هنا لاختيار ورفع ملف إلى سحابة فايربيس'
                : 'Click to upload a file to Firebase Storage'}
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">
              {isRTL
                ? 'يدعم الملخصات، الصور، والوثائق الطبية'
                : 'Supports summaries, documents and dental study materials'}
            </span>
          </label>

          {uploadError && (
            <div className="mt-2.5 p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>

        {/* FILES LIST */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-[#FAF9F6]">
          {isLoadingFiles ? (
            <div className="py-12 text-center text-slate-400">
              <div className="w-7 h-7 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-500">
                {isRTL ? 'جاري تحميل الملفات...' : 'Loading files from Firebase...'}
              </p>
            </div>
          ) : files.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <FileText className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-bold text-slate-500">
                {isRTL ? 'لا توجد ملفات مرفوعة حالياً في سحابة فايربيس' : 'No files stored in Firebase Storage yet'}
              </p>
            </div>
          ) : (
            files.map((file) => (
              <div
                key={file.fileId}
                className="p-3 bg-white rounded-2xl border border-[#D9E2CE] shadow-xs flex items-center justify-between gap-3 hover:border-emerald-400 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#F2F5ED] border border-[#D9E2CE] text-emerald-700 flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate" title={file.fileName}>
                      {file.fileName}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                      <span className="font-mono">{formatFileSize(file.fileSize)}</span>
                      <span>•</span>
                      <span className="font-mono">
                        {new Date(file.uploadedAt).toLocaleDateString(isRTL ? 'ar-IQ' : 'en-GB')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS - ICON ONLY */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(file)}
                    title={copiedId === file.fileId ? (isRTL ? 'تم النسخ!' : 'Copied!') : (isRTL ? 'نسخ الرابط' : 'Copy Link')}
                    aria-label={copiedId === file.fileId ? (isRTL ? 'تم النسخ!' : 'Copied!') : (isRTL ? 'نسخ الرابط' : 'Copy Link')}
                    className="w-8 h-8 rounded-lg bg-[#F2F5ED] hover:bg-emerald-100 text-emerald-800 flex items-center justify-center cursor-pointer transition-colors shadow-2xs active:scale-95"
                  >
                    {copiedId === file.fileId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={file.fileName}
                    title={isRTL ? 'تحميل الملف' : 'Download File'}
                    aria-label={isRTL ? 'تحميل الملف' : 'Download File'}
                    className="w-8 h-8 rounded-lg btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDelete(file.fileId)}
                    title={isRTL ? 'حذف الملف' : 'Delete File'}
                    aria-label={isRTL ? 'حذف الملف' : 'Delete File'}
                    className="w-8 h-8 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center cursor-pointer transition-colors shadow-2xs active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-3 bg-[#FAF9F6] border-t border-[#D9E2CE] flex items-center justify-between text-[11px] text-[#4D5D28] font-bold shrink-0">
          <span>Firebase Backend: corded-loop-m6rpq</span>
          <span>Firestore & Storage Active</span>
        </div>
      </div>
    </div>
  );
};
