import { Question } from '../types/quiz';
import { StorageService } from './storageService';
import { MEDICAL_CHEMISTRY_SECTIONS, MedicalChemistrySection } from '../data/medicalChemistrySectionsData';
import { parseDocxFile } from './docxParser';

/**
 * Returns the list of all 8 Medical Chemistry Sections.
 */
export function getMedicalChemistrySections(): MedicalChemistrySection[] {
  return MEDICAL_CHEMISTRY_SECTIONS;
}

/**
 * Fetches questions for a specific Medical Chemistry section (1 to 8).
 * Per user requirement: In each section load all questions bank (200 MCQs).
 */
export async function fetchMedicalChemistrySectionQuestions(
  sectionIdOrNumber: string | number
): Promise<{ questions: Question[]; count: number; section: MedicalChemistrySection }> {
  const section = MEDICAL_CHEMISTRY_SECTIONS.find(
    (s) => s.id === sectionIdOrNumber || s.sectionNumber === Number(sectionIdOrNumber)
  );

  if (!section) {
    throw new Error(`Medical Chemistry Section ${sectionIdOrNumber} not found.`);
  }

  // Attempt live docx parse if candidate URLs are accessible
  const candidateUrls = [
    `https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/public/Quizsmashlib/MedChemistry/${section.fileName}`,
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
          section.questions = liveQuestions;
          break;
        }
      }
    } catch {
      // Continue to next URL or embedded fallback
    }
  }

  // User requirement: in each section load all questions bank not only 25
  const allQuestions: Question[] = MEDICAL_CHEMISTRY_SECTIONS.flatMap((s) => s.questions);

  // Persist to storage for quiz runner
  StorageService.saveQuestions(allQuestions);

  return {
    questions: allQuestions,
    count: allQuestions.length,
    section,
  };
}

/**
 * Loads all 8 Medical Chemistry sections combined (total 200 questions).
 */
export async function fetchAllMedicalChemistryQuestions(): Promise<{ questions: Question[]; count: number }> {
  const allQuestions: Question[] = MEDICAL_CHEMISTRY_SECTIONS.flatMap((s) => s.questions);
  StorageService.saveQuestions(allQuestions);
  return {
    questions: allQuestions,
    count: allQuestions.length,
  };
}
