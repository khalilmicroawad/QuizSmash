import { Question } from '../types/quiz';
import { StorageService } from './storageService';
import { DENTAL_ANATOMY_SECTIONS, DentalAnatomySection } from '../data/dentalAnatomySectionsData';
import { parseDocxFile } from './docxParser';

/**
 * Returns the list of all 4 Dental Anatomy Sections.
 */
export function getDentalAnatomySections(): DentalAnatomySection[] {
  return DENTAL_ANATOMY_SECTIONS;
}

/**
 * Fetches or retrieves the questions for a specific Dental Anatomy section (1 to 4).
 * If a live docx file is accessible, it parses it; otherwise it gracefully falls back to the embedded bank.
 */
export async function fetchDentalAnatomySectionQuestions(
  sectionIdOrNumber: string | number
): Promise<{ questions: Question[]; count: number; section: DentalAnatomySection }> {
  const section = DENTAL_ANATOMY_SECTIONS.find(
    (s) => s.id === sectionIdOrNumber || s.sectionNumber === Number(sectionIdOrNumber)
  );

  if (!section) {
    throw new Error(`Dental Anatomy Section ${sectionIdOrNumber} not found.`);
  }

  let finalQuestions: Question[] = section.questions;

  // If a public or signed docx URL is available, attempt live fetch & parse
  const candidateUrls = [
    `https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/public/Quizsmashlib/Dental%20Anatomy/${section.fileName}`,
    section.url
  ];

  for (const url of candidateUrls) {
    if (!url.startsWith('http') || url.includes('supabase.com/dashboard')) continue;
    try {
      const response = await fetch(url, { cache: 'no-cache' });
      if (response.ok) {
        const arrayBuf = await response.arrayBuffer();
        const liveQuestions = await parseDocxFile(arrayBuf, section.id);
        if (liveQuestions.length > 0) {
          finalQuestions = liveQuestions;
          break;
        }
      }
    } catch {
      // Continue to next URL or embedded fallback
    }
  }

  // User requirement: in each section load all questions bank not only 25
  const allQuestions: Question[] = DENTAL_ANATOMY_SECTIONS.flatMap((s) => s.questions);

  // Persist to storage for quiz runner
  StorageService.saveQuestions(allQuestions);

  return {
    questions: allQuestions,
    count: allQuestions.length,
    section,
  };
}

/**
 * Loads all 4 Dental Anatomy sections combined (total 100 questions).
 */
export async function fetchAllDentalAnatomyQuestions(): Promise<{ questions: Question[]; count: number }> {
  const allQuestions: Question[] = DENTAL_ANATOMY_SECTIONS.flatMap((s) => s.questions);

  StorageService.saveQuestions(allQuestions);
  return {
    questions: allQuestions,
    count: allQuestions.length,
  };
}
