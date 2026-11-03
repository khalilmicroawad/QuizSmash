import { supabase } from '../supabaseClient.js';
import {
  COURSE_1_ACCESS_CODES_100,
  normalizeAccessCode,
  isCourse1AccessCode,
  is13FigureFormat,
} from '../data/course1Codes';

export interface CodeValidationResult {
  isValid: boolean;
  code: string;
  allowedCourse: string;
  courseNameAr: string;
  courseNameEn: string;
  maxLogins: number;
  usedLogins: number;
  remainingLogins: number;
  errorMessage?: string;
  successMessage?: string;
}

/**
 * Service to validate and track 13-figure codes for Course 1.
 */
export class CourseCodeService {
  /**
   * Validate a code specifically for the given courseId.
   * Ensures:
   * 1. If it is a 13-figure code, it MUST belong to the 100 generated codes.
   * 2. The code can ONLY log in / activate Course 1 ('stage-1').
   * 3. Cannot be used for Course 2, 3, 4, 5.
   * 4. Grants 100 login sessions.
   */
  static async validateAndRedeemCode(
    rawCode: string,
    currentCourseId: string,
    userId?: string,
    userEmail?: string
  ): Promise<CodeValidationResult> {
    const code = normalizeAccessCode(rawCode);

    if (!code) {
      return {
        isValid: false,
        code: '',
        allowedCourse: 'stage-1',
        courseNameAr: 'المرحلة الأولى',
        courseNameEn: 'First Course',
        maxLogins: 100,
        usedLogins: 0,
        remainingLogins: 0,
        errorMessage: 'يرجى إدخال الكود المكون من 13 رقماً.',
      };
    }

    const is13Digit = is13FigureFormat(code);
    const isCourse1 = isCourse1AccessCode(code);

    // If it's a 13-digit code but not in our 100-code bank
    if (is13Digit && !isCourse1) {
      return {
        isValid: false,
        code,
        allowedCourse: 'stage-1',
        courseNameAr: 'المرحلة الأولى',
        courseNameEn: 'First Course',
        maxLogins: 100,
        usedLogins: 0,
        remainingLogins: 0,
        errorMessage: 'كود التفعيل غير صالح. تأكد من إدخال الأرقام الـ 13 بشكل صحيح.',
      };
    }

    // If it is in the 100 codes for Course 1
    if (isCourse1) {
      // REQUIREMENT: "Those codes can only login in first course not the other courses"
      if (currentCourseId && currentCourseId !== 'stage-1') {
        return {
          isValid: false,
          code,
          allowedCourse: 'stage-1',
          courseNameAr: 'المرحلة الأولى',
          courseNameEn: 'First Course',
          maxLogins: 100,
          usedLogins: 0,
          remainingLogins: 0,
          errorMessage:
            'عذراً! هذا الكود (13 رقماً) مخصص حصرياً للمرحلة الأولى (First Course) فقط، ولا يعمل على المراحل الأخرى.',
        };
      }

      // Try checking Supabase table 'course_access_codes' if available
      let usedInDb = 0;
      try {
        const { data: dbCode, error: queryError } = await supabase
          .from('course_access_codes')
          .select('*')
          .eq('code', code)
          .maybeSingle();

        if (!queryError && dbCode) {
          if (dbCode.allowed_course && dbCode.allowed_course !== 'stage-1' && currentCourseId !== dbCode.allowed_course) {
            return {
              isValid: false,
              code,
              allowedCourse: dbCode.allowed_course,
              courseNameAr: 'المرحلة الأولى',
              courseNameEn: 'First Course',
              maxLogins: dbCode.max_logins || 100,
              usedLogins: dbCode.used_logins || 0,
              remainingLogins: Math.max(0, (dbCode.max_logins || 100) - (dbCode.used_logins || 0)),
              errorMessage: 'هذا الكود غير مخصص لهذه المرحلة.',
            };
          }

          if (dbCode.used_logins >= (dbCode.max_logins || 100)) {
            return {
              isValid: false,
              code,
              allowedCourse: 'stage-1',
              courseNameAr: 'المرحلة الأولى',
              courseNameEn: 'First Course',
              maxLogins: dbCode.max_logins || 100,
              usedLogins: dbCode.used_logins,
              remainingLogins: 0,
              errorMessage: 'تم استنفاد جميع مرات تسجيل الدخول (100 مرة) لهذا الكود.',
            };
          }

          // Increment in Supabase
          const nextUsed = (dbCode.used_logins || 0) + 1;
          await supabase
            .from('course_access_codes')
            .update({
              used_logins: nextUsed,
              used_by_user_id: userId || dbCode.used_by_user_id,
              used_by_email: userEmail || dbCode.used_by_email,
              last_used_at: new Date().toISOString(),
            })
            .eq('code', code);

          usedInDb = nextUsed;
        }
      } catch (err) {
        // Table may not exist yet in Supabase; fallback seamlessly to local validation
        console.warn('Note: Supabase table course_access_codes not reachable, using local verified bank:', err);
      }

      // Also persist to Supabase user metadata if user is logged in
      if (userId) {
        try {
          await supabase.auth.updateUser({
            data: {
              active_course: 'stage-1',
              activated_code: code,
              max_logins: 100,
              code_type: '13_figure_course1',
            },
          });
        } catch {
          // ignore metadata failure
        }
      }

      return {
        isValid: true,
        code,
        allowedCourse: 'stage-1',
        courseNameAr: 'المرحلة الأولى (كلية طب الأسنان)',
        courseNameEn: 'First Course (First Level)',
        maxLogins: 100,
        usedLogins: Math.max(1, usedInDb),
        remainingLogins: Math.max(0, 100 - Math.max(1, usedInDb)),
        successMessage: 'تم تفعيل كود المرحلة الأولى (100 تسجيل دخول) بنجاح!',
      };
    }

    return {
      isValid: false,
      code,
      allowedCourse: 'stage-1',
      courseNameAr: 'المرحلة الأولى',
      courseNameEn: 'First Course',
      maxLogins: 100,
      usedLogins: 0,
      remainingLogins: 0,
      errorMessage: 'الكود المدخل غير صالح. يرجى التأكد من كود الـ 13 رقماً المخصص للمرحلة الأولى.',
    };
  }
}
