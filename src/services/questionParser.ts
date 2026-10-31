import { Question, ParseResult } from '../types/quiz';

/**
 * Parses raw text content from uploaded .txt files into Question objects.
 * Format rules:
 * - A question block starts with the question text line.
 * - Following non-empty lines are options.
 * - The correct option has a '+' in front of it (e.g. "+Mitochondria" or "+ Mars").
 * - Blank lines separate question blocks.
 */
export function parseQuestionBank(rawText: string): ParseResult {
  const lines = rawText.split(/\r?\n/);
  const questions: Question[] = [];
  const errors: string[] = [];
  const warnings: string[] = [];

  let currentQuestionText = '';
  let currentOptions: string[] = [];
  let currentCorrectIndex = -1;
  let currentExplanation = '';
  let questionStartLine = 0;

  const finalizeCurrentQuestion = (endLineNumber: number) => {
    if (!currentQuestionText.trim()) {
      return;
    }

    if (currentOptions.length < 2) {
      errors.push(`Line ${questionStartLine || endLineNumber}: Question "${currentQuestionText.slice(0, 35)}..." must have at least 2 options (found ${currentOptions.length}).`);
      resetQuestion();
      return;
    }

    if (currentCorrectIndex === -1) {
      errors.push(`Line ${questionStartLine || endLineNumber}: Question "${currentQuestionText.slice(0, 35)}..." has no correct answer marked with '+'.`);
      resetQuestion();
      return;
    }

    const uniqueId = `q_${Date.now()}_${questions.length + 1}_${Math.random().toString(36).substring(2, 7)}`;

    // Clean leading question numbering (e.g. "1. ", "105. ")
    const cleanedQuestionText = currentQuestionText.trim().replace(/^[0-9]+[\.\)\-]\s*/, '');

    // Clean leading option letters (e.g. "a) ", "b) ", "A) ", "a. ")
    const cleanedOptions = currentOptions.map((opt) => opt.replace(/^[a-zA-Z][\)\.]\s*/, '').trim());

    questions.push({
      id: uniqueId,
      questionText: cleanedQuestionText || currentQuestionText.trim(),
      options: cleanedOptions,
      correctOptionIndex: currentCorrectIndex,
      explanation: currentExplanation.trim() ? currentExplanation.trim() : undefined,
    });

    resetQuestion();
  };

  const resetQuestion = () => {
    currentQuestionText = '';
    currentOptions = [];
    currentCorrectIndex = -1;
    currentExplanation = '';
    questionStartLine = 0;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    const lineNum = i + 1;

    // Gracefully ignore optional legacy category tags or comments if present
    if (
      trimmed.match(/^\[(?:category|subject):/i) ||
      trimmed.match(/^(?:category|subject):/i) ||
      trimmed.startsWith('//') ||
      trimmed === '---'
    ) {
      if (currentQuestionText) {
        finalizeCurrentQuestion(lineNum);
      }
      continue;
    }

    // Empty line indicates boundary between questions
    if (trimmed === '') {
      if (currentQuestionText) {
        finalizeCurrentQuestion(lineNum);
      }
      continue;
    }

    // If we don't have a question text yet, this line is the question text!
    if (!currentQuestionText) {
      currentQuestionText = trimmed;
      questionStartLine = lineNum;
      continue;
    }

    // Check if line is an explanation
    const expMatch = trimmed.match(/^(?:explanation|explain|exp|شرح|تفسير|توضيح):\s*(.+)$/i);
    if (expMatch) {
      currentExplanation = expMatch[1].trim();
      continue;
    }

    // Otherwise, this line is an option
    const isCorrect = trimmed.startsWith('+');
    const optionText = isCorrect ? trimmed.substring(1).trim() : trimmed;

    if (isCorrect) {
      if (currentCorrectIndex !== -1) {
        warnings.push(`Line ${lineNum}: Multiple '+' markers detected in "${currentQuestionText.slice(0, 30)}...". Overwriting correct answer with "${optionText}".`);
      }
      currentCorrectIndex = currentOptions.length;
    }

    currentOptions.push(optionText);
  }

  // Final question at the end of the file
  finalizeCurrentQuestion(lines.length);

  return {
    questions,
    errors,
    warnings,
  };
}

/**
 * Converts a list of Question objects to the standard .txt format.
 */
export function exportToTxt(questions: Question[]): string {
  return questions
    .map((q) => {
      const optionLines = q.options.map((opt, idx) => {
        return idx === q.correctOptionIndex ? `+${opt}` : opt;
      });
      const explanationLine = q.explanation ? `\nExplanation: ${q.explanation}` : '';
      return `${q.questionText}\n${optionLines.join('\n')}${explanationLine}`;
    })
    .join('\n\n');
}

/**
 * Provides a ready-to-use sample question bank template text in English or Arabic.
 */
export function getSampleTxtTemplate(lang: 'en' | 'ar' = 'en'): string {
  if (lang === 'ar') {
    return `ما هي عاصمة اليابان؟
كيوتو
أوساكا
+طوكيو
هيروشيما
شرح: طوكيو هي العاصمة الرسمية والمركز السياسي والاقتصادي لليابان منذ عام 1868.

ما هو أسرع كائن حي على وجه الأرض؟
الفهد الصياد
+صقر الشاهين
سمكة الشراع
النعامة
شرح: تصل سرعة صقر الشاهين إلى أكثر من 380 كم/ساعة أثناء الانقضاض، مما يجعله أسرع كائن حي على الإطلاق.

ما هو الكوكب المعروف باسم الكوكب الأحمر؟
الزهرة
المشتري
+المريخ
عطارد
شرح: يكتسب المريخ لونه الأحمر المميز بسبب وفرة أكسيد الحديد (الصدأ) على سطحه.

ما هو العنصر الكيميائي الأكثر وفرة في الكون؟
الأكسجين
الكربون
+الهيدروجين
الهيليوم
شرح: يشكل الهيدروجين حوالي 75% من المادة الباريونية في الكون وهو الوقود الرئيسي للنجوم.

في أي عام هبط الإنسان على سطح القمر لأول مرة؟
1965
+1969
1971
1973
شرح: هبطت مهمة أبولو 11 على سطح القمر في 20 يوليو 1969 بقيادة نيل أرمسترونغ.`;
  }

  return `What is the primary function of the mitochondria in eukaryotic cells?
+ATP energy synthesis
Protein synthesis
Lipid digestion
DNA replication
Explanation: Mitochondria are known as the powerhouses of the cell because they generate most of the chemical energy needed to power biochemical reactions via ATP production.

Which data structure operates on a Last-In, First-Out (LIFO) basis?
+Stack
Queue
Linked List
Binary Search Tree
Explanation: A stack stores items where the last element added is the first one to be removed (LIFO), whereas a queue is FIFO.

Which planet in our solar system has the highest surface temperature?
+Venus
Mercury
Mars
Jupiter
Explanation: Although Mercury is closer to the Sun, Venus has a thick carbon dioxide atmosphere that creates an extreme greenhouse effect, trapping heat up to 465°C.

What is the time complexity of searching a sorted array using Binary Search?
+O(log n)
O(n)
O(n log n)
O(1)
Explanation: Binary search divides the search space in half with each comparison, resulting in logarithmic O(log n) time complexity.

Which HTTP status code signifies that a resource was successfully created?
+201 Created
200 OK
204 No Content
301 Moved Permanently
Explanation: HTTP 201 indicates that the request has been fulfilled and has resulted in one or more new resources being created on the server.`;
}


