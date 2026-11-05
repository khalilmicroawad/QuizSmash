import { Question } from '../types/quiz';
import { StorageService } from './storageService';
import {
  MEDICAL_TERMINOLOGY_SECTIONS,
  MedicalTerminologySection,
} from '../data/medicalTerminologySectionsData';
import { parseQuestionBank } from './questionParser';

/**
 * Returns all 4 Medical Terminology Sections.
 */
export function getMedicalTerminologySections(): MedicalTerminologySection[] {
  return MEDICAL_TERMINOLOGY_SECTIONS;
}

/**
 * Fetches or retrieves questions for a specific Medical Terminology section.
 * Loads the complete 100-question bank into StorageService for the quiz runner.
 */
export async function fetchMedicalTerminologySectionQuestions(
  sectionIdOrNumber: string | number
): Promise<{ questions: Question[]; count: number; section: MedicalTerminologySection }> {
  const section = MEDICAL_TERMINOLOGY_SECTIONS.find(
    (s) => s.id === sectionIdOrNumber || s.sectionNumber === Number(sectionIdOrNumber)
  );

  if (!section) {
    throw new Error(`Medical Terminology Section ${sectionIdOrNumber} not found.`);
  }

  // Flatten all 4 sections to load the complete 100 questions bank
  const allQuestions: Question[] = MEDICAL_TERMINOLOGY_SECTIONS.flatMap((s) => s.questions);

  // Attempt live fetch if possible
  const candidateUrls = [
    'https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/public/Quizsmashlib/Terminology.txt',
  ];

  for (const url of candidateUrls) {
    try {
      const response = await fetch(url, { cache: 'no-cache' });
      if (response.ok) {
        const rawText = await response.text();
        const parsed = parseQuestionBank(rawText);
        if (parsed.questions.length > 0) {
          StorageService.saveQuestions(parsed.questions);
          return {
            questions: parsed.questions,
            count: parsed.questions.length,
            section,
          };
        }
      }
    } catch {
      // Fall through to embedded bank
    }
  }

  // Persist all 100 questions to StorageService
  StorageService.saveQuestions(allQuestions);

  return {
    questions: allQuestions,
    count: allQuestions.length,
    section,
  };
}

/**
 * Loads all 4 Medical Terminology sections combined (total 100 questions).
 */
export async function fetchAllMedicalTerminologyQuestions(): Promise<{
  questions: Question[];
  count: number;
}> {
  const allQuestions: Question[] = MEDICAL_TERMINOLOGY_SECTIONS.flatMap((s) => s.questions);

  StorageService.saveQuestions(allQuestions);
  return {
    questions: allQuestions,
    count: allQuestions.length,
  };
}
