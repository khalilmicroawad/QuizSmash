import { Question } from '../types/quiz';
import { StorageService } from './storageService';
import { HUMAN_ANATOMY_SECTIONS, HumanAnatomySection } from '../data/humanAnatomySectionsData';
import { parseDocxFile } from './docxParser';

/**
 * Returns the list of all 5 Human Anatomy Sections.
 */
export function getHumanAnatomySections(): HumanAnatomySection[] {
  return HUMAN_ANATOMY_SECTIONS;
}

/**
 * Fetches or retrieves the questions for a specific Human Anatomy section (1 to 5).
 * If a live docx file is accessible, it parses it; otherwise it gracefully falls back to the embedded bank.
 */
export async function fetchHumanAnatomySectionQuestions(
  sectionIdOrNumber: string | number
): Promise<{ questions: Question[]; count: number; section: HumanAnatomySection }> {
  const section = HUMAN_ANATOMY_SECTIONS.find(
    (s) => s.id === sectionIdOrNumber || s.sectionNumber === Number(sectionIdOrNumber)
  );

  if (!section) {
    throw new Error(`Human Anatomy Section ${sectionIdOrNumber} not found.`);
  }

  let finalQuestions: Question[] = section.questions;

  // If a public or signed docx URL is available, attempt live fetch & parse
  const candidateUrls = [
    `https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/public/Quizsmashlib/Human%20Anatomy/${section.fileName}`,
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
  const allQuestions: Question[] = HUMAN_ANATOMY_SECTIONS.flatMap((s) => s.questions);

  // Persist to storage for quiz runner
  StorageService.saveQuestions(allQuestions);

  return {
    questions: allQuestions,
    count: allQuestions.length,
    section,
  };
}

/**
 * Loads all 5 Human Anatomy sections combined (total 125 questions).
 */
export async function fetchAllHumanAnatomyQuestions(): Promise<{ questions: Question[]; count: number }> {
  const allQuestions: Question[] = HUMAN_ANATOMY_SECTIONS.flatMap((s) => s.questions);

  StorageService.saveQuestions(allQuestions);
  return {
    questions: allQuestions,
    count: allQuestions.length,
  };
}
