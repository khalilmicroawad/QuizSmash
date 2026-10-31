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
    hasQuestions: false,
    badgeEn: 'Ready for MCQs',
    badgeAr: 'جاهز لربط الأسئلة',
  },
  {
    id: 'general-human-anatomy',
    nameEn: 'General Human Anatomy',
    nameAr: 'التشريح البشري العام',
    code: 'ANAT 102',
    descriptionEn: 'Systemic human anatomy, head & neck structures, Central Nervous System (CNS), cranial nerves, and osteology.',
    descriptionAr: 'تشريح أجهزة الجسم، تشريح الرأس والعنق، الجهاز العصبي المركزي (CNS)، والأعصاب القحفية.',
    hasQuestions: true,
    questionCount: 105,
    badgeEn: '105 MCQs (CNS Test Active)',
    badgeAr: '105 أسئلة (اختبار CNS نشط)',
    supabaseFileUrl: 'https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/public/Quizsmashlib/mcq_cns.txt',
  },
  {
    id: 'medical-biology',
    nameEn: 'Medical Biology',
    nameAr: 'علم الأحياء الطبي',
    code: 'BIOL 103',
    descriptionEn: 'Cytology, molecular genetics, oral histology, cellular physiology, and medical microbiology basics.',
    descriptionAr: 'بيولوجيا الخلية، الوراثة الجزيئية، أساسيات الأنسجة الفموية، ووظائف الأعضاء الخلوية.',
    hasQuestions: false,
    badgeEn: 'Ready for MCQs',
    badgeAr: 'جاهز لربط الأسئلة',
  },
  {
    id: 'medical-chemistry',
    nameEn: 'Medical Chemistry',
    nameAr: 'الكيمياء الطبية',
    code: 'CHEM 104',
    descriptionEn: 'Organic chemistry, biochemistry, dental biomaterials chemistry, buffer solutions, and metabolism.',
    descriptionAr: 'الكيمياء العضوية، الكيمياء الحيوية، المواد الحيوية السنية، ومحاليل التوازن والأيض.',
    hasQuestions: false,
    badgeEn: 'Ready for MCQs',
    badgeAr: 'جاهز لربط الأسئلة',
  },
  {
    id: 'medical-physics',
    nameEn: 'Medical Physics',
    nameAr: 'الفيزياء الطبية',
    code: 'PHYS 105',
    descriptionEn: 'Radiation physics, X-ray production, diagnostic dental imaging, laser applications, and biomechanics.',
    descriptionAr: 'فيزياء الإشعاع، إنتاج الأشعة السينية، التصوير التشخيصي السني، تطبيقات الليزر، والميكانيكا الحيوية.',
    hasQuestions: false,
    badgeEn: 'Ready for MCQs',
    badgeAr: 'جاهز لربط الأسئلة',
  },
];
