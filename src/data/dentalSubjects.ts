export interface DentalSubject {
  id: string;
  nameEn: string;
  nameAr: string;
  code: string;
  descriptionEn: string;
  descriptionAr: string;
  hasQuestions: boolean;
  questionCount?: number;
  badgeEn: string;
  badgeAr: string;
  supabaseFileUrl?: string;
}

export const DENTAL_FACULTY_SUBJECTS: DentalSubject[] = [
  {
    id: 'dental-anatomy',
    nameEn: 'Dental Anatomy',
    nameAr: 'تشريح الأسنان',
    code: 'DENT 101',
    descriptionEn: 'Tooth morphology, deciduous & permanent dentition, pulp cavities, occlusion principles, and root canal anatomy.',
    descriptionAr: 'مورفولوجيا الأسنان، الأسنان اللبنية والدائمة، حجرة اللب، ومبادئ الإطباق والتشريح الجذري.',
    hasQuestions: true,
    questionCount: 100,
    badgeEn: '100 MCQs (4 Sections Active)',
    badgeAr: '100 سؤال (4 أقسام نشطة)',
  },
  {
    id: 'general-human-anatomy',
    nameEn: 'General Human Anatomy',
    nameAr: 'التشريح البشري العام',
    code: 'ANAT 102',
    descriptionEn: 'Systemic human anatomy, head & neck structures, cranial nerves, osteology, mastication muscles, and oral spaces.',
    descriptionAr: 'تشريح أجهزة الجسم، تشريح الرأس والعنق، الأعصاب القحفية، عضلات المضغ، وتجويف الفم.',
    hasQuestions: true,
    questionCount: 125,
    badgeEn: '125 MCQs (5 Sections Active)',
    badgeAr: '125 سؤال (5 أقسام نشطة)',
    supabaseFileUrl: 'https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/public/Quizsmashlib/mcq_cns.txt',
  },
  {
    id: 'medical-terminology',
    nameEn: 'Medical Terminology',
    nameAr: 'المصطلحات الطبية',
    code: 'TERM 103',
    descriptionEn: 'Medical and dental prefixes, suffixes, root words, anatomical planes, combining vowels, and clinical vocabulary.',
    descriptionAr: 'البادئات واللواحق الطبية، الجذور اللغوية، المستويات التشريحية، والمصطلحات الإكلينيكية لطب الأسنان.',
    hasQuestions: true,
    questionCount: 100,
    badgeEn: '100 MCQs (4 Sections Active)',
    badgeAr: '100 سؤال (4 أقسام نشطة)',
    supabaseFileUrl: 'https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/public/Quizsmashlib/Terminology.txt',
  },
  {
    id: 'medical-biology',
    nameEn: 'Medical Biology',
    nameAr: 'علم الأحياء الطبي',
    code: 'BIOL 104',
    descriptionEn: 'Cytology, molecular genetics, oral histology, cellular physiology, and medical microbiology basics.',
    descriptionAr: 'بيولوجيا الخلية، الوراثة الجزيئية، أساسيات الأنسجة الفموية، ووظائف الأعضاء الخلوية وممرضات الفم.',
    hasQuestions: true,
    questionCount: 100,
    badgeEn: '100 MCQs (4 Sections Active)',
    badgeAr: '100 سؤال (4 أقسام نشطة)',
  },
  {
    id: 'medical-chemistry',
    nameEn: 'Medical Chemistry',
    nameAr: 'الكيمياء الطبية',
    code: 'CHEM 105',
    descriptionEn: 'Organic chemistry, biochemistry, dental biomaterials chemistry, buffer solutions, and mineralized hydroxyapatite.',
    descriptionAr: 'الكيمياء العامة والعضوية، الكيمياء الحيوية، مواد الأسنان الحيوية، التمعدن وهيدروكسي أباتيت.',
    hasQuestions: true,
    questionCount: 200,
    badgeEn: '200 MCQs (8 Sections Active)',
    badgeAr: '200 سؤال (8 أقسام نشطة)',
  },
  {
    id: 'medical-physics',
    nameEn: 'Medical Physics',
    nameAr: 'الفيزياء الطبية',
    code: 'PHYS 106',
    descriptionEn: 'Radiation physics, X-ray production, dental radiology, lasers in dentistry, biomechanics, and radiation protection.',
    descriptionAr: 'فيزياء الإشعاع، إنتاج أشعة الأسنان، تطبيقات الليزر، الميكانيكا الحيوية، والوقاية من الإشعاع.',
    hasQuestions: true,
    questionCount: 125,
    badgeEn: '125 MCQs (5 Sections Active)',
    badgeAr: '125 سؤال (5 أقسام نشطة)',
  },
  {
    id: 'computer',
    nameEn: 'Computer',
    nameAr: 'الحاسوب والبرمجيات',
    code: 'COMP 107',
    descriptionEn: 'Computer essentials, hardware, operating systems, dental practice software, networking, and digital literacy.',
    descriptionAr: 'أساسيات الحاسوب، العتاد ونظم التشغيل، برمجيات عيادات طب الأسنان، والمهارات الرقمية.',
    hasQuestions: true,
    questionCount: 60,
    badgeEn: '60 MCQs (Computer Active)',
    badgeAr: '60 سؤال (حاسوب نشط)',
    supabaseFileUrl: 'https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/public/Quizsmashlib/comp%20mcq%20(1-53).txt',
  },
];
