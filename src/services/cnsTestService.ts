import { Question } from '../types/quiz';
import { parseQuestionBank } from './questionParser';
import { StorageService } from './storageService';

export const CNS_TEST_URL = 'https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/public/Quizsmashlib/mcq_cns.txt';

/**
 * Fetches the CNS Test MCQ text file from Supabase storage and stores parsed questions in local storage.
 */
export async function fetchCnsTestQuestions(): Promise<{ questions: Question[]; count: number }> {
  const response = await fetch(CNS_TEST_URL, {
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error(`Failed to download CNS Test file from Supabase (Status: ${response.status})`);
  }

  const rawText = await response.text();
  const parseResult = parseQuestionBank(rawText);

  if (parseResult.questions.length === 0) {
    throw new Error('No valid questions could be parsed from the CNS Test file.');
  }

  // Persist to storage
  StorageService.saveQuestions(parseResult.questions);

  return {
    questions: parseResult.questions,
    count: parseResult.questions.length,
  };
}
