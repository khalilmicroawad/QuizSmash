import { Question } from '../types/quiz';
import { StorageService } from './storageService';
import { MEDICAL_BIOLOGY_SECTIONS, MedicalBiologySection } from '../data/medicalBiologySectionsData';
import { parseDocxFile } from './docxParser';

/**
 * Returns the list of all 4 Medical Biology Sections.
 */
export function getMedicalBiologySections(): MedicalBiologySection[] {
  return MEDICAL_BIOLOGY_SECTIONS;
}

/**
 * Fetches questions for a specific Medical Biology section (1 to 4).
 * Per user requirement: In each section load all questions bank (100 MCQs).
 */
export async function fetchMedicalBiologySectionQuestions(
  sectionIdOrNumber: string | number
): Promise<{ questions: Question[]; count: number; section: MedicalBiologySection }> {
  const section = MEDICAL_BIOLOGY_SECTIONS.find(
    (s) => s.id === sectionIdOrNumber || s.sectionNumber === Number(sectionIdOrNumber)
  );

  if (!section) {
    throw new Error(`Medical Biology Section ${sectionIdOrNumber} not found.`);
  }

  // Attempt live docx parse if candidate URLs are accessible
  const candidateUrls = [
    `https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/public/Quizsmashlib/MedBiology/${section.fileName}`,
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
  const allQuestions: Question[] = MEDICAL_BIOLOGY_SECTIONS.flatMap((s) => s.questions);

  // Persist to storage for quiz runner
  StorageService.saveQuestions(allQuestions);

  return {
    questions: allQuestions,
    count: allQuestions.length,
    section,
  };
}

/**
 * Loads all 4 Medical Biology sections combined (total 100 questions).
 */
export async function fetchAllMedicalBiologyQuestions(): Promise<{ questions: Question[]; count: number }> {
  const allQuestions: Question[] = MEDICAL_BIOLOGY_SECTIONS.flatMap((s) => s.questions);
  StorageService.saveQuestions(allQuestions);
  return {
    questions: allQuestions,
    count: allQuestions.length,
  };
}
