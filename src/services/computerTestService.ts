import { Question } from '../types/quiz';
import { StorageService } from './storageService';
import { COMPUTER_SECTIONS, ComputerSection } from '../data/computerSectionsData';
import { parseDocxFile } from './docxParser';

/**
 * Returns the list of all 7 Computer Sections.
 */
export function getComputerSections(): ComputerSection[] {
  return COMPUTER_SECTIONS;
}

/**
 * Fetches or retrieves the questions for a specific Computer section (1 to 7).
 */
export async function fetchComputerSectionQuestions(
  sectionIdOrNumber: string | number
): Promise<{ questions: Question[]; count: number; section: ComputerSection }> {
  const section = COMPUTER_SECTIONS.find(
    (s) => s.id === sectionIdOrNumber || s.sectionNumber === Number(sectionIdOrNumber)
  );

  if (!section) {
    throw new Error(`Computer Section ${sectionIdOrNumber} not found.`);
  }

  let finalQuestions: Question[] = section.questions;

  // If the section has a signed download URL (starts with https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/sign), try live fetch
  if (section.url && section.url.includes('/storage/v1/object/sign/')) {
    try {
      const response = await fetch(section.url, { cache: 'no-cache' });
      if (response.ok) {
        const arrayBuf = await response.arrayBuffer();
        const liveQuestions = await parseDocxFile(arrayBuf, section.id);
        if (liveQuestions.length > 0) {
          finalQuestions = liveQuestions;
        }
      }
    } catch (err) {
      console.warn(`Live docx fetch for ${section.id} fell back to embedded bank:`, err);
    }
  }

  // Persist to storage
  StorageService.saveQuestions(finalQuestions);

  return {
    questions: finalQuestions,
    count: finalQuestions.length,
    section,
  };
}

/**
 * Loads all 7 Computer sections combined (total 175 questions).
 */
export async function fetchAllComputerSectionsQuestions(): Promise<{ questions: Question[]; count: number }> {
  const allQuestions: Question[] = [];
  for (const s of COMPUTER_SECTIONS) {
    allQuestions.push(...s.questions);
  }

  StorageService.saveQuestions(allQuestions);

  return {
    questions: allQuestions,
    count: allQuestions.length,
  };
}

// Backward compatibility alias
export const fetchComputerTestQuestions = fetchAllComputerSectionsQuestions;
