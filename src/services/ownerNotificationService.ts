/**
 * Service to notify the app owner (Dr. Khalil Awad - dr.khalil.awad@gmail.com)
 * whenever a new student registers or signs up in the app.
 */

export const OWNER_EMAIL = 'dr.khalil.awad@gmail.com';
export const OWNER_WHATSAPP = '9647725631342';

export interface StudentRegistrationRecord {
  id: string;
  fullName: string;
  email: string;
  courseName: string;
  courseId?: string;
  timestamp: number;
  formattedDate: string;
  notifiedViaEmail: boolean;
}

const REGISTRATIONS_STORAGE_KEY = 'quiz_smash_owner_registrations_v1';

export class OwnerNotificationService {
  /**
   * Dispatches an email notification to dr.khalil.awad@gmail.com
   * and saves the registration record for the Owner Portal.
   */
  static async notifyNewRegistration(params: {
    email: string;
    fullName: string;
    courseName?: string;
    courseId?: string;
  }): Promise<{ success: boolean; message: string }> {
    const { email, fullName, courseName = 'First Course (المرحلة الأولى - طب الأسنان)', courseId = 'stage-1' } = params;
    const now = Date.now();

    // Format local time in Baghdad timezone (+03:00)
    let baghdadTime = '';
    try {
      baghdadTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Baghdad',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date(now));
    } catch {
      baghdadTime = new Date(now).toLocaleString();
    }

    const registrationRecord: StudentRegistrationRecord = {
      id: `reg_${now}_${Math.random().toString(36).substring(2, 7)}`,
      fullName,
      email,
      courseName,
      courseId,
      timestamp: now,
      formattedDate: `${baghdadTime} (Baghdad Time)`,
      notifiedViaEmail: false,
    };

    // 1. Dispatch Email to dr.khalil.awad@gmail.com via FormSubmit endpoint
    let emailSent = false;
    try {
      const emailPayload = {
        _subject: `🎓 New Student Registration: ${fullName} (${email})`,
        _replyto: email,
        _template: 'table',
        _captcha: 'false',
        _autoresponse: `Thank you for signing up for Quiz Smash! Your account is active. To obtain your 100-login access code, contact Dr. Khalil Awad on WhatsApp: +${OWNER_WHATSAPP}`,
        app_name: 'Quiz Smash (Dental Faculty)',
        owner_email: OWNER_EMAIL,
        student_name: fullName,
        student_email: email,
        selected_course: courseName,
        registration_time: `${baghdadTime} (Baghdad Time)`,
        notes: 'Student registered. 2-Day free trial initiated. Needs 100-login code for extended access.',
      };

      const res = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });

      if (res.ok) {
        emailSent = true;
        registrationRecord.notifiedViaEmail = true;
      }
    } catch (err) {
      console.warn('Direct email dispatch encountered network delay, saving record locally:', err);
    }

    // 2. Persist to Owner Registrations Log
    this.saveRegistrationRecord(registrationRecord);

    return {
      success: true,
      message: emailSent
        ? `Notification sent to ${OWNER_EMAIL}`
        : `Registration recorded for ${OWNER_EMAIL}`,
    };
  }

  /**
   * Saves registration record into storage for viewing inside Owner Admin Portal
   */
  static saveRegistrationRecord(record: StudentRegistrationRecord): void {
    try {
      const existing = this.getRegistrations();
      // Avoid duplicate by email within 5 minutes
      const isDuplicate = existing.some(
        (r) => r.email.toLowerCase() === record.email.toLowerCase() && Math.abs(r.timestamp - record.timestamp) < 300000
      );
      if (!isDuplicate) {
        const updated = [record, ...existing].slice(0, 500); // keep last 500
        localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(updated));
      }
    } catch {
      // Ignore
    }
  }

  /**
   * Retrieves all student registrations for Dr. Khalil's Owner Portal
   */
  static getRegistrations(): StudentRegistrationRecord[] {
    try {
      const raw = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // Ignore
    }
    return [];
  }

  /**
   * Clears registration log (for owner only)
   */
  static clearRegistrations(): void {
    try {
      localStorage.removeItem(REGISTRATIONS_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
}
