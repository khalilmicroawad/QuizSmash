import rawCodes from './course1_access_codes.json';

export interface Course1CodeRecord {
  code: string;
  allowedCourse: string;
  courseNameEn: string;
  courseNameAr: string;
  maxLogins: number;
}

/**
 * 100 Generated 13-figure activation codes strictly dedicated to Course 1 (First Level).
 * Each code provides 100 login sessions.
 */
export const COURSE_1_ACCESS_CODES_100: string[] = rawCodes as string[];

/**
 * Clean and normalize code input (removes dashes, spaces, and trims)
 * Example: '1876-8345-39619' -> '1876834539619'
 */
export function normalizeAccessCode(input: string): string {
  if (!input) return '';
  return input.trim().replace(/[\s\-_]/g, '').toUpperCase();
}

/**
 * Check if the given code is one of the 100 13-figure codes for Course 1
 */
export function isCourse1AccessCode(input: string): boolean {
  const normalized = normalizeAccessCode(input);
  return COURSE_1_ACCESS_CODES_100.includes(normalized);
}

/**
 * Check if the code is in valid 13-figure format
 */
export function is13FigureFormat(input: string): boolean {
  const normalized = normalizeAccessCode(input);
  return /^\d{13}$/.test(normalized);
}

/**
 * Get metadata for a Course 1 code
 */
export function getCourse1CodeMetadata(input: string): Course1CodeRecord | null {
  const normalized = normalizeAccessCode(input);
  if (!COURSE_1_ACCESS_CODES_100.includes(normalized)) {
    return null;
  }
  return {
    code: normalized,
    allowedCourse: 'stage-1',
    courseNameEn: 'First Course (First Level)',
    courseNameAr: 'المرحلة الأولى (كلية طب الأسنان)',
    maxLogins: 100,
  };
}
