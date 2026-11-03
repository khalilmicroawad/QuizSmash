import JSZip from 'jszip';
import { Question } from '../types/quiz';

/**
 * Parses questions from an ArrayBuffer of a .docx file.
 */
export async function parseDocxFile(arrayBuffer: ArrayBuffer, sectionPrefix = 'comp'): Promise<Question[]> {
  const zip = await JSZip.loadAsync(arrayBuffer);
  const docXmlFile = zip.file('word/document.xml');
  if (!docXmlFile) {
    throw new Error('Invalid .docx file: word/document.xml not found');
  }

  const xmlText = await docXmlFile.async('text');
  const paragraphs = xmlText.match(/<w:p(?:\s[^>]*)?>.*?<\/w:p>/g) || [];
  const lines = paragraphs.map((p) => p.replace(/<[^>]+>/g, '').trim()).filter(Boolean);

  const questions: Question[] = [];

  // Format 1: One-liner questions (Question XQuestion: ... Choices: A) ... B) ... C) ... D) ... Correct Answer: ... Explanation: ...)
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const singleLineMatch = l.match(
      /^Question\s*(\d+)Question:\s*(.*?)(?:Choices:\s*|\s*Choices:\s*)A\)\s*(.*?)B\)\s*(.*?)C\)\s*(.*?)D\)\s*(.*?)(?:Correct Answer:\s*Choice\s*([A-D]))(?:Explanation:\s*(.*))?$/i
    );
    if (singleLineMatch) {
      const qNum = singleLineMatch[1];
      const qText = singleLineMatch[2].trim();
      const optA = singleLineMatch[3].trim();
      const optB = singleLineMatch[4].trim();
      const optC = singleLineMatch[5].trim();
      const optD = singleLineMatch[6].trim();
      const correct = singleLineMatch[7].toUpperCase().charCodeAt(0) - 65;
      const explanation = (singleLineMatch[8] || '').trim();
      questions.push({
        id: `${sectionPrefix}_q${qNum}_${i}`,
        questionText: qText,
        options: [optA, optB, optC, optD],
        correctOptionIndex: correct,
        explanation: explanation || undefined,
      });
    }
  }

  if (questions.length > 0) {
    return questions;
  }

  // Format 2: Multi-line questions with Question / Choices / Correct Answer paragraphs
  let curQ: {
    id: string;
    questionText: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
  } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];

    // Check Question header (e.g. "**Question 1**" or "Question 1" or "Q1. ...")
    const qNumMatch = l.match(/^(?:\*\*Question\s*(\d+)\*\*|Question\s*(\d+)|Q(\d+)\.)(?:\s+(.*))?$/i);
    if (qNumMatch) {
      if (curQ && curQ.questionText && curQ.options.length >= 2) {
        questions.push({
          id: curQ.id,
          questionText: curQ.questionText,
          options: curQ.options,
          correctOptionIndex: curQ.correctOptionIndex >= 0 ? curQ.correctOptionIndex : 0,
          explanation: curQ.explanation || undefined,
        });
      }

      const qNum = qNumMatch[1] || qNumMatch[2] || qNumMatch[3] || `${questions.length + 1}`;
      const inlinePrompt = qNumMatch[4] ? qNumMatch[4].trim() : '';

      curQ = {
        id: `${sectionPrefix}_q${qNum}_${i}`,
        questionText: inlinePrompt,
        options: [],
        correctOptionIndex: -1,
        explanation: '',
      };
      continue;
    }

    if (!curQ) continue;

    // Check "**Question:** ..."
    const promptMatch = l.match(/^\*{0,2}Question:\*{0,2}\s*(.*)$/i);
    if (promptMatch) {
      curQ.questionText = promptMatch[1].trim();
      continue;
    }

    // Ignore "**Choices:**" header line
    if (l.match(/^\*{0,2}Choices:\*{0,2}$/i)) {
      continue;
    }

    // Check combined "A. ... B. ... C. ... D. ..." in one line
    const combinedOpts = l.match(/A[.)]\s*(.*?)B[.)]\s*(.*?)C[.)]\s*(.*?)D[.)]\s*(.*)$/i);
    if (combinedOpts) {
      curQ.options = [combinedOpts[1].trim(), combinedOpts[2].trim(), combinedOpts[3].trim(), combinedOpts[4].trim()];
      continue;
    }

    // Check individual option: "A) ..." or "A. ..."
    const singleOpt = l.match(/^([A-D])[.)]\s*(.*)$/i);
    if (singleOpt) {
      curQ.options.push(singleOpt[2].trim());
      continue;
    }

    // Check Correct Answer: "**Correct Answer:** Choice B" or "Correct Answer: B"
    const ansMatch = l.match(/^\*{0,2}Correct Answer:\*{0,2}\s*(?:Choice\s+)?([A-D])/i);
    if (ansMatch) {
      curQ.correctOptionIndex = ansMatch[1].toUpperCase().charCodeAt(0) - 65;
      continue;
    }

    // Check Explanation: "**Explanation:** ..." or "Explanation: ..."
    const expMatch = l.match(/^\*{0,2}Explanation:\*{0,2}\s*(.*)$/i);
    if (expMatch) {
      curQ.explanation = expMatch[1].trim();
      continue;
    }
  }

  if (curQ && curQ.questionText && curQ.options.length >= 2) {
    questions.push({
      id: curQ.id,
      questionText: curQ.questionText,
      options: curQ.options,
      correctOptionIndex: curQ.correctOptionIndex >= 0 ? curQ.correctOptionIndex : 0,
      explanation: curQ.explanation || undefined,
    });
  }

  return questions;
}
