import { Question } from '../types/quiz';

export interface DentalAnatomySection {
  id: string;
  sectionNumber: number;
  fileName: string;
  titleEn: string;
  titleAr: string;
  range: string;
  descriptionEn: string;
  descriptionAr: string;
  url: string;
  questions: Question[];
}

export const DENTAL_ANATOMY_SECTIONS: DentalAnatomySection[] = [
  {
    id: 'da-section-1',
    sectionNumber: 1,
    fileName: 'first.docx',
    titleEn: 'Section 1: Nomenclature & Tooth Morphology (first.docx)',
    titleAr: 'القسم الأول: تسمية الأسنان والمصطلحات التشريحية (first.docx)',
    range: '1-25',
    descriptionEn: 'Tooth numbering systems (Universal, Palmer, FDI/ISO), anatomical vs clinical crown/root, surfaces, line & point angles.',
    descriptionAr: 'أنظمة ترقيم الأسنان، التاج والجذر التشريحي والسريري، أسطح الأسنان، والزوايا الخطية والنقطية.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Dental+Anatomy&preview=first.docx',
    questions: [
      {
        id: 'da1_q1',
        questionText: 'Under the Universal Numbering System, what number designates the permanent maxillary right first molar?',
        options: ['#3', '#14', '#19', '#30'],
        correctOptionIndex: 0,
        explanation: 'In the Universal Numbering System, permanent teeth are numbered 1 to 32 starting at the maxillary right third molar (#1). Tooth #3 is the permanent maxillary right first molar.'
      },
      {
        id: 'da1_q2',
        questionText: 'In the FDI (Two-Digit) System, which code represents the primary maxillary left second molar?',
        options: ['55', '65', '75', '85'],
        correctOptionIndex: 1,
        explanation: 'In the FDI system, primary quadrants are 5 (upper right), 6 (upper left), 7 (lower left), 8 (lower right). Tooth 5 is the second molar. Thus, 65 is the primary upper left second molar.'
      },
      {
        id: 'da1_q3',
        questionText: 'What constitutes the anatomical crown of a tooth?',
        options: [
          'The portion of the tooth covered by enamel.',
          'The portion of the tooth exposed in the oral cavity above the gingiva.',
          'The portion from the cementoenamel junction to the alveolar crest.',
          'The portion containing the coronal pulp chamber only.'
        ],
        correctOptionIndex: 0,
        explanation: 'The anatomical crown is defined strictly by anatomy: the part of the tooth covered by enamel, bounded by the cementoenamel junction (CEJ).'
      },
      {
        id: 'da1_q4',
        questionText: 'Which junction represents the line of demarcation separating the enamel of the crown from the cementum of the root?',
        options: [
          'Cementoenamel junction (cervical line)',
          'Dentinoenamel junction (DEJ)',
          'Periodontal attachment line',
          'Mucogingival junction'
        ],
        correctOptionIndex: 0,
        explanation: 'The cementoenamel junction (CEJ), also termed the cervical line, is the anatomical landmark where crown enamel meets root cementum.'
      },
      {
        id: 'da1_q5',
        questionText: 'How many line angles are formed on an anterior tooth crown?',
        options: ['6 line angles', '8 line angles', '4 line angles', '12 line angles'],
        correctOptionIndex: 0,
        explanation: 'Anterior teeth have 6 line angles (mesioincisal and distoincisal angles are rounded into corners rather than full lines, giving 6 distinct line angles: mesiolabial, distolabial, mesiolingual, distolingual, labioincisal, linguoincisal).'
      },
      {
        id: 'da1_q6',
        questionText: 'How many point angles does a posterior tooth possess?',
        options: ['4 point angles', '6 point angles', '8 point angles', '2 point angles'],
        correctOptionIndex: 0,
        explanation: 'A point angle is formed by the junction of three surfaces. Posterior teeth have 4 point angles: mesio-occluso-buccal, disto-occluso-buccal, mesio-occluso-lingual, and disto-occluso-lingual.'
      },
      {
        id: 'da1_q7',
        questionText: 'Which tooth surface is oriented toward the median plane following the curve of the dental arch?',
        options: ['Mesial surface', 'Distal surface', 'Lingual surface', 'Facial surface'],
        correctOptionIndex: 0,
        explanation: 'The mesial surface of any tooth is the proximal surface closest to the median line of the dental arch.'
      },
      {
        id: 'da1_q8',
        questionText: 'Which two adjacent teeth have mesial surfaces that directly contact each other at the midline?',
        options: [
          'Central incisors',
          'Lateral incisor and central incisor',
          'Canine and first premolar',
          'Third molar and second molar'
        ],
        correctOptionIndex: 0,
        explanation: 'Only the two central incisors (both maxillary and mandibular) have mesial surfaces contacting one another across the midline.'
      },
      {
        id: 'da1_q9',
        questionText: 'What is the term for a prominent linear elevation of enamel running across the surface of a crown?',
        options: ['Ridge', 'Cusp', 'Mamelon', 'Tubercle'],
        correctOptionIndex: 0,
        explanation: 'A ridge is any linear elevation of enamel on the surface of a tooth, named according to its location (e.g., marginal, triangular, transverse).'
      },
      {
        id: 'da1_q10',
        questionText: 'What is a triangular ridge on a posterior tooth?',
        options: [
          'A ridge that descends from the cusp tip toward the central part of the occlusal table.',
          'The border ridge that forms the mesial and distal boundaries of the occlusal table.',
          'A ridge running diagonally across the occlusal surface of mandibular molars.',
          'The elevation of enamel found exclusively on the cervical third of anterior teeth.'
        ],
        correctOptionIndex: 0,
        explanation: 'Triangular ridges descend from cusp tips toward the central groove/fossa of posterior teeth, so named because their slopes resemble the sides of a triangle.'
      },
      {
        id: 'da1_q11',
        questionText: 'The union of two triangular ridges across the occlusal surface of a posterior tooth creates what structure?',
        options: ['Transverse ridge', 'Oblique ridge', 'Marginal ridge', 'Supplemental ridge'],
        correctOptionIndex: 0,
        explanation: 'When a buccal and a lingual triangular ridge join across the occlusal surface, they form a transverse ridge.'
      },
      {
        id: 'da1_q12',
        questionText: 'On which permanent tooth is an oblique ridge a key identifying anatomical characteristic?',
        options: [
          'Maxillary first and second molars',
          'Mandibular first molars',
          'Maxillary first premolars',
          'Mandibular second premolars'
        ],
        correctOptionIndex: 0,
        explanation: 'The oblique ridge is unique to maxillary molars, formed by the union of the triangular ridge of the distobuccal cusp and the distal ridge of the mesiolingual cusp.'
      },
      {
        id: 'da1_q13',
        questionText: 'What are mamelons?',
        options: [
          'Three rounded enamel protuberances found on the incisal edge of newly erupted incisors.',
          'Small accessory cusps located on the lingual surface of maxillary molars.',
          'Bulbous convexities forming the cervical third of all canine crowns.',
          'Deep developmental pits located at the bottom of the lingual fossa.'
        ],
        correctOptionIndex: 0,
        explanation: 'Mamelons are three rounded protuberances of enamel on the incisal ridges of newly erupted permanent incisors, representing the three labial developmental lobes.'
      },
      {
        id: 'da1_q14',
        questionText: 'What is the smooth, lingual convexity occupying the cervical third of the crown of anterior teeth called?',
        options: ['Cingulum', 'Lobe', 'Marginal ridge', 'Torque ridge'],
        correctOptionIndex: 0,
        explanation: 'The cingulum is the lingual lobe forming the bulbous cervical convexity on the lingual aspect of all anterior teeth.'
      },
      {
        id: 'da1_q15',
        questionText: 'Which fossa is typically found bounded by marginal ridges and the cingulum on the lingual aspect of maxillary incisors?',
        options: ['Lingual fossa', 'Central fossa', 'Triangular fossa', 'Sulcus'],
        correctOptionIndex: 0,
        explanation: 'The lingual fossa is the broad, shallow depression on the lingual surface of anterior teeth.'
      },
      {
        id: 'da1_q16',
        questionText: 'What separates the developmental lobes of a tooth crown during tooth formation?',
        options: ['Developmental grooves', 'Supplemental grooves', 'Marginal fissures', 'Enamel lamellae'],
        correctOptionIndex: 0,
        explanation: 'Developmental grooves are shallow grooves or lines that mark the junction where primary developmental lobes fused together.'
      },
      {
        id: 'da1_q17',
        questionText: 'In the primary dentition, how many teeth are present in each quadrant?',
        options: ['5 teeth', '8 teeth', '6 teeth', '4 teeth'],
        correctOptionIndex: 0,
        explanation: 'Each primary quadrant contains 5 teeth: central incisor, lateral incisor, canine, first molar, second molar (total 20 primary teeth).'
      },
      {
        id: 'da1_q18',
        questionText: 'Which class of teeth is absent in the primary dentition?',
        options: ['Premolars', 'Canines', 'Molars', 'Incisors'],
        correctOptionIndex: 0,
        explanation: 'The primary dentition has no premolars. Primary molars are succeeded by permanent premolars.'
      },
      {
        id: 'da1_q19',
        questionText: 'What term describes teeth that succeed or replace predecessor primary teeth?',
        options: ['Succedaneous teeth', 'Nonsuccedaneous teeth', 'Accessory teeth', 'Supernumerary teeth'],
        correctOptionIndex: 0,
        explanation: 'Succedaneous teeth are permanent teeth that replace deciduous predecessors (permanent incisors, canines, and premolars).'
      },
      {
        id: 'da1_q20',
        questionText: 'Why are permanent molars classified as nonsuccedaneous teeth?',
        options: [
          'Because they erupt distal to the primary teeth and do not replace any primary teeth.',
          'Because they are shed naturally during adolescence.',
          'Because they lack root canals and pulp chambers.',
          'Because they have five lobes instead of four lobes.'
        ],
        correctOptionIndex: 0,
        explanation: 'Permanent molars are nonsuccedaneous because they erupt posteriorly into newly created dental space, without replacing any deciduous predecessors.'
      },
      {
        id: 'da1_q21',
        questionText: 'What is the highest point of curvature on the facial or lingual surface of a crown referred to as?',
        options: ['Crest of contour (height of contour)', 'Contact area', 'Cusp apex', 'Embrasure space'],
        correctOptionIndex: 0,
        explanation: 'The height of contour (crest of contour) is the point of maximum convexity on the facial or lingual contour in a given plane.'
      },
      {
        id: 'da1_q22',
        questionText: 'What is the triangular space between two adjacent teeth cervical to the interproximal contact area called?',
        options: ['Gingival (cervical) embrasure', 'Incisal embrasure', 'Facial embrasure', 'Lingual embrasure'],
        correctOptionIndex: 0,
        explanation: 'The space cervical to the interproximal contact area is the cervical or gingival embrasure (normally occupied by the interdental papilla).'
      },
      {
        id: 'da1_q23',
        questionText: 'In Palmer Notation, which symbol represents the permanent mandibular right quadrant?',
        options: ['┌ (Upper right)', '┘ (Lower left)', '└ (Lower right)', '┐ (Upper left)'],
        correctOptionIndex: 2,
        explanation: 'In Palmer notation, └ represents the lower right quadrant from the patient’s perspective.'
      },
      {
        id: 'da1_q24',
        questionText: 'Which hard tissue of the tooth is the hardest and most mineralized substance in the human body?',
        options: ['Enamel (approx. 96% mineral)', 'Dentin (approx. 70% mineral)', 'Cementum (approx. 50% mineral)', 'Pulp'],
        correctOptionIndex: 0,
        explanation: 'Enamel is approximately 96% inorganic hydroxyapatite by weight, making it the hardest tissue in the human body.'
      },
      {
        id: 'da1_q25',
        questionText: 'Which tissue forms the bulk of the internal tooth structure and surrounds the dental pulp?',
        options: ['Dentin', 'Enamel', 'Cementum', 'Periodontal ligament'],
        correctOptionIndex: 0,
        explanation: 'Dentin constitutes the greatest bulk of the tooth crown and root, lying beneath the enamel and cementum and surrounding the pulp cavity.'
      }
    ]
  },
  {
    id: 'da-section-2',
    sectionNumber: 2,
    fileName: 'second.docx',
    titleEn: 'Section 2: Maxillary & Mandibular Anterior Dentition (second.docx)',
    titleAr: 'القسم الثاني: تشريح الأسنان الأمامية العلوية والسفلية (second.docx)',
    range: '26-50',
    descriptionEn: 'Anatomical features of maxillary and mandibular incisors and canines, eruption timing, and root cross-sections.',
    descriptionAr: 'المعالم التشريحية لقواطع وأنياب الفك العلوي والسفلي، توقيت البزوغ، ومقاطع الجذور.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Dental+Anatomy&preview=second.docx',
    questions: [
      {
        id: 'da2_q1',
        questionText: 'Which anterior tooth displays the widest crown mesiodistally of all anterior teeth?',
        options: [
          'Permanent maxillary central incisor',
          'Permanent maxillary canine',
          'Permanent mandibular canine',
          'Permanent mandibular central incisor'
        ],
        correctOptionIndex: 0,
        explanation: 'The permanent maxillary central incisor is the widest anterior tooth in the mesiodistal dimension.'
      },
      {
        id: 'da2_q2',
        questionText: 'How does the mesioincisal angle of a maxillary central incisor compare to its distoincisal angle?',
        options: [
          'Mesioincisal is sharp and almost a right angle (90°), while distoincisal is distinctly rounded.',
          'Mesioincisal is very rounded, while distoincisal is a sharp acute angle.',
          'Both incisal angles are equally sharp and acute.',
          'Both incisal angles are identical obtuse angles.'
        ],
        correctOptionIndex: 0,
        explanation: 'The mesioincisal angle of the maxillary central incisor is relatively sharp (nearly 90 degrees), whereas the distoincisal angle is more rounded.'
      },
      {
        id: 'da2_q3',
        questionText: 'Which anterior tooth exhibits the greatest variation in crown anatomy, second only to the third molars?',
        options: [
          'Maxillary lateral incisor (e.g., peg lateral)',
          'Mandibular central incisor',
          'Maxillary canine',
          'Mandibular lateral incisor'
        ],
        correctOptionIndex: 0,
        explanation: 'The permanent maxillary lateral incisor varies in form more than any other tooth except the third molar, often exhibiting a peg-shaped morphology or congenitally missing status.'
      },
      {
        id: 'da2_q4',
        questionText: 'What is the characteristic feature of the lingual surface of a maxillary lateral incisor?',
        options: [
          'A deep lingual pit and prominent palatoradicular groove.',
          'A perfectly flat, smooth surface without any fossa.',
          'Two distinct transverse ridges dividing the lingual surface.',
          'A cusp of Carabelli on the distolingual border.'
        ],
        correctOptionIndex: 0,
        explanation: 'Maxillary lateral incisors commonly feature a deep lingual pit and palatogingival (palatoradicular) developmental groove, clinically predisposed to caries.'
      },
      {
        id: 'da2_q5',
        questionText: 'Which tooth is the smallest tooth in the permanent human dentition?',
        options: [
          'Mandibular central incisor',
          'Mandibular lateral incisor',
          'Maxillary lateral incisor',
          'Maxillary central incisor'
        ],
        correctOptionIndex: 0,
        explanation: 'The permanent mandibular central incisor is the smallest and most symmetrical tooth in the human permanent dentition.'
      },
      {
        id: 'da2_q6',
        questionText: 'From an incisal view, how is the incisal edge of the mandibular central incisor aligned relative to the labiolingual bisecting line?',
        options: [
          'At right angles (90°) to the labiolingual bisector, displaying bilateral symmetry.',
          'Rotated distolingually along the dental arch curve.',
          'Angled at 45 degrees towards the mesial surface.',
          'Positioned completely lingual to the root axis line without straight symmetry.'
        ],
        correctOptionIndex: 0,
        explanation: 'The incisal edge of the mandibular central incisor forms a precise right angle (90°) with the labiolingual line, giving it bilateral symmetry.'
      },
      {
        id: 'da2_q7',
        questionText: 'How can a permanent mandibular lateral incisor be distinguished from a mandibular central incisor from the incisal view?',
        options: [
          'Its incisal ridge curves distolingually to follow the dental arch.',
          'It is perfectly symmetrical bilaterally with identical incisal angles.',
          'Its cingulum is shifted strictly towards the mesial side.',
          'It is substantially narrower mesiodistally than the central incisor.'
        ],
        correctOptionIndex: 0,
        explanation: 'The crown of the mandibular lateral incisor is twisted slightly on its root base, tilting the incisal edge distolingually to conform to the curvature of the dental arch.'
      },
      {
        id: 'da2_q8',
        questionText: 'Which permanent tooth possesses the longest root in the human dentition?',
        options: [
          'Maxillary canine',
          'Mandibular canine',
          'Maxillary central incisor',
          'Maxillary first premolar'
        ],
        correctOptionIndex: 0,
        explanation: 'The maxillary canine has the longest root of any tooth in the mouth, anchoring firmly into the canine eminence of the maxilla.'
      },
      {
        id: 'da2_q9',
        questionText: 'What prominent osseous ridge is produced on the facial surface of the maxilla by the socket of the canine root?',
        options: ['Canine eminence', 'Incisive fossa', 'Mental protuberance', 'Zygomatic arch'],
        correctOptionIndex: 0,
        explanation: 'The robust root of the permanent maxillary canine forms a prominent vertical bony ridge called the canine eminence, supporting facial aesthetics.'
      },
      {
        id: 'da2_q10',
        questionText: 'How do the mesial and distal cusp ridges of a canine compare prior to attrition?',
        options: [
          'Mesial cusp ridge is shorter than the distal cusp ridge.',
          'Distal cusp ridge is shorter than the mesial cusp ridge.',
          'Mesial and distal cusp ridges are precisely equal in length.',
          'Mesial ridge contains two distinct tubercles.'
        ],
        correctOptionIndex: 0,
        explanation: 'On all canines (both maxillary and mandibular), the mesial cusp ridge is shorter than the distal cusp ridge (exception: primary maxillary canine where mesial ridge is longer).'
      },
      {
        id: 'da2_q11',
        questionText: 'Which tooth exhibits the longest overall crown-to-root length in the entire human dentition?',
        options: ['Maxillary canine', 'Maxillary first molar', 'Mandibular first molar', 'Maxillary central incisor'],
        correctOptionIndex: 0,
        explanation: 'The permanent maxillary canine is the longest tooth overall in the human dentition (averaging around 27 mm from incisal tip to root apex).'
      },
      {
        id: 'da2_q12',
        questionText: 'At approximately what age does the permanent maxillary central incisor erupt?',
        options: ['7–8 years', '6–7 years', '8–9 years', '10–12 years'],
        correctOptionIndex: 0,
        explanation: 'The permanent maxillary central incisor typically erupts between 7 and 8 years of age.'
      },
      {
        id: 'da2_q13',
        questionText: 'At approximately what age does the permanent mandibular central incisor erupt?',
        options: ['6–7 years', '7–8 years', '5–6 years', '9–10 years'],
        correctOptionIndex: 0,
        explanation: 'The permanent mandibular central incisor erupts around 6 to 7 years of age, often shortly after or concurrently with the permanent mandibular first molar.'
      },
      {
        id: 'da2_q14',
        questionText: 'At approximately what age does the permanent maxillary canine typically erupt?',
        options: ['11–12 years', '9–10 years', '7–8 years', '13–14 years'],
        correctOptionIndex: 0,
        explanation: 'Maxillary canines typically erupt between 11 and 12 years of age, usually after the maxillary premolars have already erupted.'
      },
      {
        id: 'da2_q15',
        questionText: 'What anomaly may occasionally cause the root of a mandibular canine to bifurcate near its apical third?',
        options: [
          'Bifurcation into facial and lingual root branches.',
          'Bifurcation into mesial and distal root branches.',
          'Trifurcation into three equal rootlets.',
          'Complete fusion with the first premolar root.'
        ],
        correctOptionIndex: 0,
        explanation: 'When a mandibular canine has two roots (found in approx. 1–5% of specimens), they are positioned facial (labial) and lingual.'
      },
      {
        id: 'da2_q16',
        questionText: 'The lingual surface of a maxillary canine is divided into two lingual fossae by what structure?',
        options: ['Lingual ridge', 'Oblique ridge', 'Cingulum depression', 'Central developmental groove'],
        correctOptionIndex: 0,
        explanation: 'A heavy lingual ridge runs vertically from the cingulum to the cusp tip, creating mesiolingual and distolingual fossae on either side.'
      },
      {
        id: 'da2_q17',
        questionText: 'How does the labial outline of the mandibular canine crown compare with that of the maxillary canine from the facial view?',
        options: [
          'The mesial outline of the mandibular canine crown is nearly straight and in line with the root.',
          'The mandibular canine crown is wider mesiodistally and much shorter cervicoincisally.',
          'The mandibular canine has a much more prominent, bulbous labial ridge.',
          'The mandibular canine cusp tip is sharper and more pointed than the maxillary canine.'
        ],
        correctOptionIndex: 0,
        explanation: 'From the facial view, the mesial contour of the mandibular canine crown is almost straight and continuous with the mesial contour of its root.'
      },
      {
        id: 'da2_q18',
        questionText: 'What is the shape of the cervical cross-section of the root of a maxillary central incisor?',
        options: [
          'Triangular with rounded corners and base on the labial.',
          'Oval with broad mesiodistal diameter and narrow labiolingual diameter.',
          'Square with equal measurements in all directions.',
          'Ribbon-like with deep mesial and distal grooves.'
        ],
        correctOptionIndex: 0,
        explanation: 'A cross-section of the maxillary central incisor at the cervix is roughly triangular, with the wide base at the labial aspect and the rounded apex pointing toward the lingual.'
      },
      {
        id: 'da2_q19',
        questionText: 'What root concavity is prominent on both the mesial and distal surfaces of mandibular incisor roots?',
        options: [
          'Deep longitudinal developmental depressions running the length of the root.',
          'Circumferential cervical ridges preventing luxation.',
          'Horizontally oriented developmental grooves near the CEJ.',
          'Prominent apical flanges curving strictly toward the mesial.'
        ],
        correctOptionIndex: 0,
        explanation: 'Mandibular incisor roots possess deep longitudinal depressions on their mesial and distal surfaces, giving them an hourglass or dumbbell shape in mid-root cross-section.'
      },
      {
        id: 'da2_q20',
        questionText: 'Which permanent incisor has the highest frequency of having two root canals within a single root?',
        options: [
          'Mandibular incisors (especially mandibular lateral incisor, approx. 20–40%)',
          'Maxillary central incisor',
          'Maxillary lateral incisor',
          'Maxillary canine'
        ],
        correctOptionIndex: 0,
        explanation: 'Mandibular incisors (central and lateral) frequently exhibit two root canals (labial and lingual), which may join to exit through a single apical foramen.'
      },
      {
        id: 'da2_q21',
        questionText: 'Where is the incisal edge of a newly erupted maxillary central incisor positioned in relation to the long axis of the tooth?',
        options: [
          'Centered on or slightly labial to the long axis.',
          'Markedly lingual to the root axis.',
          'Angled 30 degrees toward the palatal midline.',
          'Displaced apical to the alveolar crest.'
        ],
        correctOptionIndex: 0,
        explanation: 'The incisal edge of maxillary central incisors is positioned on or slightly labial to a line bisecting the long axis of the root.'
      },
      {
        id: 'da2_q22',
        questionText: 'Where is the incisal edge of mandibular incisors positioned relative to the root axis from a proximal view?',
        options: [
          'Lingual to the long axis of the root.',
          'Markedly labial to the long axis of the root.',
          'Directly in line with the buccal cortex.',
          'Centered exactly on the labial crest of contour.'
        ],
        correctOptionIndex: 0,
        explanation: 'From a proximal view, the incisal ridge of mandibular incisors is located lingual to the long axis of the tooth, a critical distinguishing feature from maxillary incisors.'
      },
      {
        id: 'da2_q23',
        questionText: 'The curvature of the cervical line (CEJ) is greatest on which surface of all teeth?',
        options: [
          'Mesial surface of the maxillary central incisor',
          'Distal surface of the maxillary central incisor',
          'Mesial surface of the mandibular first molar',
          'Distal surface of the mandibular canine'
        ],
        correctOptionIndex: 0,
        explanation: 'The curvature of the cervical line is deeper on the mesial surface than on the distal surface of all teeth, and is greatest on the mesial surface of the maxillary central incisor (approx. 3.5 mm).'
      },
      {
        id: 'da2_q24',
        questionText: 'What is a "peg lateral"?',
        options: [
          'A malformed diminutive maxillary lateral incisor with a conical, tapering crown.',
          'A primary tooth retained into adulthood without a permanent successor.',
          'An incisor with an abnormally enlarged pulpal cavity and thin dentin walls.',
          'A tooth exhibiting enamel hypoplasia caused by nutritional deficiency.'
        ],
        correctOptionIndex: 0,
        explanation: 'A peg lateral is a microdontic maxillary lateral incisor characterized by a conical, tapering crown shape resulting from developmental underdevelopment of the mesial and distal lobes.'
      },
      {
        id: 'da2_q25',
        questionText: 'Which permanent anterior tooth has a cingulum that is distinctly offset toward the distal?',
        options: [
          'Maxillary central incisor',
          'Mandibular central incisor',
          'Maxillary canine',
          'Mandibular lateral incisor'
        ],
        correctOptionIndex: 0,
        explanation: 'The cingulum of the permanent maxillary central incisor is distinctly offset to the distal of the center line, aiding in left vs. right identification.'
      }
    ]
  },
  {
    id: 'da-section-3',
    sectionNumber: 3,
    fileName: 'third.docx',
    titleEn: 'Section 3: Premolars & Posterior Occlusal Morphology (third.docx)',
    titleAr: 'القسم الثالث: تشريح الضواحك ومورفولوجيا الإطباق الخلفي (third.docx)',
    range: '51-75',
    descriptionEn: 'Maxillary and mandibular premolars, cuspal anatomy, transverse ridges, mesial developmental depressions, and root variations.',
    descriptionAr: 'ضواحك الفك العلوي والسفلي، تشريح الشرفات، الحواف المستعرضة، الانخفاضات النمائية، وتنوع الجذور.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Dental+Anatomy&preview=third.docx',
    questions: [
      {
        id: 'da3_q1',
        questionText: 'Which premolar typically features two roots (a buccal root and a lingual/palatal root)?',
        options: [
          'Maxillary first premolar (approx. 60–80% bifurcated)',
          'Maxillary second premolar',
          'Mandibular first premolar',
          'Mandibular second premolar'
        ],
        correctOptionIndex: 0,
        explanation: 'The maxillary first premolar is unique among premolars in typically possessing two roots (buccal and palatal) and two root canals.'
      },
      {
        id: 'da3_q2',
        questionText: 'What distinct developmental feature is found on the mesial surface of the crown and root of the maxillary first premolar?',
        options: [
          'Mesial concavity (mesial interdental depression) and mesial marginal developmental groove.',
          'A prominent accessory cusp called the Cusp of Carabelli.',
          'A deep lingual pit with an enamel spur.',
          'A smooth, convex surface devoid of any groove or depression.'
        ],
        correctOptionIndex: 0,
        explanation: 'The maxillary first premolar has a prominent mesial crown and root concavity, traversed by a distinct mesial marginal developmental groove crossing the marginal ridge.'
      },
      {
        id: 'da3_q3',
        questionText: 'On the maxillary first premolar, how does the mesiobuccal cusp ridge compare in length to the distobuccal cusp ridge?',
        options: [
          'Mesiobuccal cusp ridge is longer than the distobuccal cusp ridge.',
          'Mesiobuccal cusp ridge is shorter than the distobuccal cusp ridge.',
          'Both cusp ridges are completely equal in length.',
          'The buccal cusp lacks recognizable cusp ridges.'
        ],
        correctOptionIndex: 0,
        explanation: 'The maxillary first premolar is an exception among posterior teeth: its mesial buccal cusp ridge is longer than its distal buccal cusp ridge.'
      },
      {
        id: 'da3_q4',
        questionText: 'How do the cusps of the permanent maxillary second premolar compare to those of the maxillary first premolar?',
        options: [
          'The buccal and lingual cusps are almost equal in height and size, with a shorter central groove.',
          'The buccal cusp is three times larger than the tiny, non-functional lingual cusp.',
          'It has three distinct functional cusps instead of two cusps.',
          'The lingual cusp is sharp while the buccal cusp is completely flattened.'
        ],
        correctOptionIndex: 0,
        explanation: 'On the maxillary second premolar, the buccal and lingual cusps are nearly equal in height, making the occlusal table more symmetrical with a shorter, more supplemental central groove system.'
      },
      {
        id: 'da3_q5',
        questionText: 'Which premolar has a non-functioning, diminutive lingual cusp that resembles a cingulum or tubercle?',
        options: [
          'Mandibular first premolar',
          'Maxillary first premolar',
          'Mandibular second premolar',
          'Maxillary second premolar'
        ],
        correctOptionIndex: 0,
        explanation: 'The mandibular first premolar has a very small, afunctional lingual cusp, with its heavy buccal cusp carrying virtually all occlusal load.'
      },
      {
        id: 'da3_q6',
        questionText: 'What prominent developmental groove originates in the mesial pit and crosses onto the mesiolingual surface of the mandibular first premolar?',
        options: [
          'Mesiolingual developmental groove',
          'Distolingual groove',
          'Central fissure',
          'Transverse occlusal notch'
        ],
        correctOptionIndex: 0,
        explanation: 'The mesiolingual developmental groove is a pathognomonic identifying feature of the permanent mandibular first premolar.'
      },
      {
        id: 'da3_q7',
        questionText: 'What anatomical structure joins the buccal and lingual cusps of the mandibular first premolar, dividing the occlusal table into mesial and distal fossae?',
        options: ['Unbroken transverse ridge', 'Oblique ridge', 'Central developmental groove', 'Marginal sulcus'],
        correctOptionIndex: 0,
        explanation: 'A heavy, uninterrupted transverse ridge connects the buccal and lingual cusp tips of the mandibular first premolar, separating the mesial and distal triangular fossae.'
      },
      {
        id: 'da3_q8',
        questionText: 'Which permanent premolar commonly develops with three cusps (one buccal and two lingual cusps)?',
        options: [
          'Mandibular second premolar (three-cusp type)',
          'Mandibular first premolar',
          'Maxillary first premolar',
          'Maxillary second premolar'
        ],
        correctOptionIndex: 0,
        explanation: 'The mandibular second premolar frequently exhibits a three-cusp form (one large buccal cusp and two lingual cusps: mesiolingual and distolingual).'
      },
      {
        id: 'da3_q9',
        questionText: 'What is the occlusal groove pattern characteristic of the three-cusp mandibular second premolar?',
        options: ['"Y" pattern', '"H" pattern', '"U" pattern', 'Cruciform cross pattern'],
        correctOptionIndex: 0,
        explanation: 'The three-cusp mandibular second premolar features a "Y"-shaped occlusal groove pattern formed by the junction of the central groove and lingual groove.'
      },
      {
        id: 'da3_q10',
        questionText: 'What is the occlusal groove pattern of the two-cusp mandibular second premolar?',
        options: ['"U" or "H" pattern', '"Y" pattern exclusively', 'Star pattern', 'Circular pattern'],
        correctOptionIndex: 0,
        explanation: 'Two-cusp varieties of the mandibular second premolar present either a crescent-shaped "U" pattern or an "H" groove pattern.'
      },
      {
        id: 'da3_q11',
        questionText: 'Between the two lingual cusps of a three-cusp mandibular second premolar, which cusp is larger?',
        options: [
          'Mesiolingual cusp is larger than the distolingual cusp.',
          'Distolingual cusp is larger than the mesiolingual cusp.',
          'Both lingual cusps are exactly identical in size.',
          'The distolingual cusp is replaced by an accessory marginal tubercle.'
        ],
        correctOptionIndex: 0,
        explanation: 'On the three-cusp mandibular second premolar, the mesiolingual cusp is wider and higher than the smaller distolingual cusp.'
      },
      {
        id: 'da3_q12',
        questionText: 'Why does the occlusal plane of the mandibular first premolar tilt sharply lingually in cross section?',
        options: [
          'Because the crown lingual tilt places the occlusal table at approximately 45 degrees to the long axis.',
          'Because the lingual root resorbs during development.',
          'Because the buccal cusp tip sits outside the bony envelope.',
          'Because the tooth lacks a periodontal ligament.'
        ],
        correctOptionIndex: 0,
        explanation: 'The mandibular first premolar crown tilts sharply lingually on its root base, creating an occlusal table slanting lingually at roughly 45 degrees.'
      },
      {
        id: 'da3_q13',
        questionText: 'Which premolar replaces the deciduous mandibular first molar in the dental arch?',
        options: [
          'Permanent mandibular first premolar',
          'Permanent mandibular second premolar',
          'Permanent mandibular canine',
          'Permanent mandibular first molar'
        ],
        correctOptionIndex: 0,
        explanation: 'The permanent mandibular first premolar is succedaneous to the primary mandibular first molar.'
      },
      {
        id: 'da3_q14',
        questionText: 'Which premolar replaces the deciduous mandibular second molar?',
        options: [
          'Permanent mandibular second premolar',
          'Permanent mandibular first premolar',
          'Permanent mandibular third molar',
          'Permanent mandibular first molar'
        ],
        correctOptionIndex: 0,
        explanation: 'The permanent mandibular second premolar succeeds the primary mandibular second molar.'
      },
      {
        id: 'da3_q15',
        questionText: 'How many developmental lobes participate in the formation of a three-cusp mandibular second premolar?',
        options: ['5 lobes (3 buccal, 2 lingual)', '4 lobes', '3 lobes', '6 lobes'],
        correctOptionIndex: 0,
        explanation: 'The three-cusp mandibular second premolar develops from five lobes: three buccal lobes and two lingual lobes (one for each lingual cusp).'
      },
      {
        id: 'da3_q16',
        questionText: 'Which premolar root canal morphology poses the highest risk of root perforation during post-space preparation due to its proximal concavity?',
        options: [
          'Mesial surface of maxillary first premolar',
          'Distal surface of maxillary second premolar',
          'Buccal surface of mandibular second premolar',
          'Lingual surface of mandibular first premolar'
        ],
        correctOptionIndex: 0,
        explanation: 'The deep mesial developmental depression on the root of the maxillary first premolar creates a thin dentin wall vulnerable to stripping perforation during endodontic or restorative treatment.'
      },
      {
        id: 'da3_q17',
        questionText: 'From the occlusal view, what is the geometric outline of the maxillary first premolar crown?',
        options: ['Hexagonal', 'Rhomboidal', 'Circular', 'Triangular'],
        correctOptionIndex: 0,
        explanation: 'The occlusal outline of the maxillary first premolar crown is hexagonal (six-sided) with angular buccal and lingual projections.'
      },
      {
        id: 'da3_q18',
        questionText: 'From the occlusal view, what is the outline of the maxillary second premolar crown?',
        options: ['More rounded and oval compared to the first premolar', 'Sharply hexagonal', 'Square', 'Trapezoidal'],
        correctOptionIndex: 0,
        explanation: 'The crown outline of the maxillary second premolar is more rounded, oval, and less angular than that of the maxillary first premolar.'
      },
      {
        id: 'da3_q19',
        questionText: 'At what age does the permanent maxillary first premolar normally erupt?',
        options: ['10–11 years', '8–9 years', '12–13 years', '6–7 years'],
        correctOptionIndex: 0,
        explanation: 'The maxillary first premolar erupts between 10 and 11 years of age, preceding the maxillary second premolar (10–12 years).'
      },
      {
        id: 'da3_q20',
        questionText: 'How many root canals are typically present in a maxillary second premolar?',
        options: [
          'One canal (approx. 60%) or two canals (approx. 40%) within a single root.',
          'Three separate canals in three roots.',
          'Four canals always.',
          'Zero canals due to calcification.'
        ],
        correctOptionIndex: 0,
        explanation: 'The maxillary second premolar usually has a single root containing either one single broad canal or two canals that merge.'
      },
      {
        id: 'da3_q21',
        questionText: 'Which cusp of the mandibular first premolar accounts for approximately two-thirds of the occlusal table surface?',
        options: ['Buccal cusp', 'Lingual cusp', 'Mesial cuspule', 'Distal cuspule'],
        correctOptionIndex: 0,
        explanation: 'The large buccal cusp dominates the mandibular first premolar, making up nearly two-thirds of the occlusal surface.'
      },
      {
        id: 'da3_q22',
        questionText: 'Where is the contact area located on the mesial surface of the mandibular first premolar?',
        options: [
          'Middle third of the crown (cervical to the marginal ridge).',
          'Incisal third at the extreme tip.',
          'Apical to the CEJ.',
          'Lingual to the lingual ridge.'
        ],
        correctOptionIndex: 0,
        explanation: 'The mesial contact of the mandibular first premolar is positioned in the middle third of the crown, lower than on adjacent teeth.'
      },
      {
        id: 'da3_q23',
        questionText: 'Which premolar exhibits a central pit situated midway between the buccal and lingual cusps on its occlusal surface?',
        options: [
          'Mandibular second premolar (three-cusp type)',
          'Maxillary first premolar',
          'Mandibular first premolar',
          'Maxillary second premolar'
        ],
        correctOptionIndex: 0,
        explanation: 'The three-cusp mandibular second premolar features a prominent central pit from which the central, mesial, distal, and lingual developmental grooves radiate.'
      },
      {
        id: 'da3_q24',
        questionText: 'Why is the lingual cusp of the maxillary first premolar offset slightly toward the mesial?',
        options: [
          'Because the mesial cusp ridge of the lingual cusp is shorter than its distal cusp ridge.',
          'Because the buccal cusp pushes it distally.',
          'To accommodate the maxillary canine in lateral excursive movement.',
          'Because the root has two apical foramina.'
        ],
        correctOptionIndex: 0,
        explanation: 'The lingual cusp tip of the maxillary first premolar is positioned mesial to the center line of the crown.'
      },
      {
        id: 'da3_q25',
        questionText: 'When comparing mandibular premolars, which one has a larger, more fully developed crown overall?',
        options: [
          'Mandibular second premolar',
          'Mandibular first premolar',
          'Both have identical crown volumes',
          'The mandibular primary first molar'
        ],
        correctOptionIndex: 0,
        explanation: 'Unlike maxillary premolars (where the first is slightly larger), mandibular premolars show the reverse: the mandibular second premolar has a larger crown than the first premolar.'
      }
    ]
  },
  {
    id: 'da-section-4',
    sectionNumber: 4,
    fileName: 'fourth.docx',
    titleEn: 'Section 4: Permanent Molars, Occlusion & Pulp Cavities (fourth.docx)',
    titleAr: 'القسم الرابع: الأرحاء الدائمة، الإطباق، وتشريح الحجرة اللبية (fourth.docx)',
    range: '76-100',
    descriptionEn: 'Molar anatomy, Cusp of Carabelli, roots and canal configurations, Angle classification of occlusion, and pulp chambers.',
    descriptionAr: 'تشريح الأضراس، شرفة كارابيللي، تفريعات الجذور والقنوات، تصنيف آنجل للإطباق، وغرف اللب.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Dental+Anatomy&preview=fourth.docx',
    questions: [
      {
        id: 'da4_q1',
        questionText: 'How many roots does a permanent maxillary first molar typically possess?',
        options: [
          'Three roots: Mesiobuccal (MB), Distobuccal (DB), and Palatal (Lingual)',
          'Two roots: Mesial and Distal',
          'Four roots: MB, ML, DB, DL',
          'One single fused conical root'
        ],
        correctOptionIndex: 0,
        explanation: 'Permanent maxillary molars are trifurcated, possessing three distinct roots: mesiobuccal, distobuccal, and palatal (which is the longest and largest).'
      },
      {
        id: 'da4_q2',
        questionText: 'Which root of the maxillary first molar is the longest, widest, and strongest?',
        options: ['Palatal root', 'Mesiobuccal root', 'Distobuccal root', 'Distopalatal root'],
        correctOptionIndex: 0,
        explanation: 'The palatal root is the largest, longest, and strongest root of the maxillary first molar, often extending palatally beyond the crown outline.'
      },
      {
        id: 'da4_q3',
        questionText: 'What accessory cusp or tubercle is famously located on the mesiolingual cusp of the permanent maxillary first molar?',
        options: ['Cusp of Carabelli', 'Tubercle of Zuckerkandl', 'Talon cusp', 'Dens evaginatus'],
        correctOptionIndex: 0,
        explanation: 'The Cusp of Carabelli (tubercle of Carabelli) is an accessory cusp located on the lingual surface of the mesiolingual cusp of the maxillary first molar.'
      },
      {
        id: 'da4_q4',
        questionText: 'How many cusps are normally present on a permanent mandibular first molar?',
        options: [
          'Five cusps (Mesiobuccal, Distobuccal, Distal, Mesiolingual, Distolingual)',
          'Four cusps',
          'Three cusps',
          'Six cusps'
        ],
        correctOptionIndex: 0,
        explanation: 'The permanent mandibular first molar has five cusps: three buccal (MB, DB, and D) and two lingual (ML and DL).'
      },
      {
        id: 'da4_q5',
        questionText: 'Which cusp on the permanent mandibular first molar is the smallest of the five cusps?',
        options: ['Distal cusp', 'Distobuccal cusp', 'Mesiolingual cusp', 'Distolingual cusp'],
        correctOptionIndex: 0,
        explanation: 'The distal cusp is the smallest cusp of the mandibular first molar, situated on the distobuccal line angle.'
      },
      {
        id: 'da4_q6',
        questionText: 'How many roots and root canals does a permanent mandibular first molar typically possess?',
        options: [
          'Two roots (Mesial and Distal) and three root canals (MB, ML, and Distal)',
          'Three roots and four canals',
          'One root and two canals',
          'Four roots and four canals'
        ],
        correctOptionIndex: 0,
        explanation: 'The mandibular first molar has two roots (mesial and distal). The mesial root usually carries two canals (mesiobuccal and mesiolingual), while the distal root has one or two canals (total 3–4 canals).'
      },
      {
        id: 'da4_q7',
        questionText: 'What is the occlusal groove pattern characteristic of the permanent mandibular second molar?',
        options: [
          'Cruciform ("+" or cross) groove pattern',
          '"Y" groove pattern',
          'Star-shaped pattern',
          'Oblique groove pattern'
        ],
        correctOptionIndex: 0,
        explanation: 'The mandibular second molar has four nearly equal cusps separated by straight central and buccal/lingual grooves that intersect at right angles, creating a cross ("+") pattern.'
      },
      {
        id: 'da4_q8',
        questionText: 'Which permanent tooth is known as the "cornerstone of the dental arches" and key to Angle’s classification of occlusion?',
        options: [
          'Permanent first molars (especially maxillary first molar)',
          'Maxillary canines',
          'Mandibular second premolars',
          'Third molars'
        ],
        correctOptionIndex: 0,
        explanation: 'Edward Angle considered the permanent maxillary first molar to be the key to occlusion because its position remains relatively constant in the skull.'
      },
      {
        id: 'da4_q9',
        questionText: 'According to Angle’s Class I molar relationship (Neutroclusion), where does the mesiobuccal cusp of the maxillary first molar occlude?',
        options: [
          'In the mesiobuccal groove of the permanent mandibular first molar.',
          'In the distobuccal groove of the permanent mandibular first molar.',
          'Mesial to the mandibular first premolar.',
          'Between the mandibular first and second molars.'
        ],
        correctOptionIndex: 0,
        explanation: 'In Class I normal occlusion, the mesiobuccal cusp of the maxillary first molar aligns directly into the mesiobuccal groove of the mandibular first molar.'
      },
      {
        id: 'da4_q10',
        questionText: 'In Angle’s Class II malocclusion (Distoclusion), what is the relationship of the mandibular first molar?',
        options: [
          'The mesiobuccal groove of the mandibular first molar is positioned distal to the mesiobuccal cusp of the maxillary first molar.',
          'The mesiobuccal groove of the mandibular first molar is positioned mesial to the mesiobuccal cusp.',
          'The teeth are in complete crossbite across the entire arch.',
          'The maxillary molar is locked lingually to the mandibular molar.'
        ],
        correctOptionIndex: 0,
        explanation: 'In Class II (distoclusion), the mandibular dental arch is positioned distal (posterior) relative to the maxillary arch, so the mandibular MB groove is distal to the maxillary MB cusp.'
      },
      {
        id: 'da4_q11',
        questionText: 'In Angle’s Class III malocclusion (Mesioclusion), what is the relationship of the mandibular first molar?',
        options: [
          'The mesiobuccal groove of the mandibular first molar is positioned mesial to the mesiobuccal cusp of the maxillary first molar.',
          'The mesiobuccal groove is positioned distal to the maxillary first molar.',
          'The maxillary first molar is completely rotated 180 degrees.',
          'There is no contact between maxillary and mandibular teeth.'
        ],
        correctOptionIndex: 0,
        explanation: 'In Class III (mesioclusion), the mandible is positioned mesial (anterior) relative to the maxilla, placing the mandibular MB groove anterior/mesial to the maxillary MB cusp.'
      },
      {
        id: 'da4_q12',
        questionText: 'On the permanent maxillary first molar, what two cusps are connected by the prominent oblique ridge?',
        options: [
          'Mesiolingual cusp and distobuccal cusp',
          'Mesiobuccal cusp and distobuccal cusp',
          'Mesiolingual cusp and distolingual cusp',
          'Mesiobuccal cusp and distolingual cusp'
        ],
        correctOptionIndex: 0,
        explanation: 'The oblique ridge of the maxillary first molar connects the large mesiolingual cusp with the distobuccal cusp.'
      },
      {
        id: 'da4_q13',
        questionText: 'In endodontic therapy, which root of the maxillary first molar frequently contains a second canal (MB2) that is often difficult to locate?',
        options: ['Mesiobuccal root (MB2 canal present in 60–90%)', 'Distobuccal root', 'Palatal root', 'Lingual root'],
        correctOptionIndex: 0,
        explanation: 'The mesiobuccal root of the maxillary first molar contains a second canal (MB2) in 60% to over 90% of teeth according to clinical and micro-CT studies.'
      },
      {
        id: 'da4_q14',
        questionText: 'What is the shape of the pulp chamber floor of a maxillary first molar when viewed from the occlusal access?',
        options: ['Triangular or trapezoidal with the base at the buccal aspect', 'Circular', 'Straight line', 'Cross-shaped'],
        correctOptionIndex: 0,
        explanation: 'The pulp chamber floor of a maxillary molar is roughly triangular (or rhomboid), with the wide base containing the MB and DB orifices and the apex at the palatal orifice.'
      },
      {
        id: 'da4_q15',
        questionText: 'At what age does the first permanent molar ("six-year molar") erupt?',
        options: ['6–7 years', '8–9 years', '11–12 years', '4–5 years'],
        correctOptionIndex: 0,
        explanation: 'Permanent first molars erupt around 6 to 7 years of age, without shedding any primary teeth, establishing early vertical dimension.'
      },
      {
        id: 'da4_q16',
        questionText: 'At what age does the second permanent molar ("twelve-year molar") typically erupt?',
        options: ['12–13 years', '10–11 years', '14–16 years', '8–9 years'],
        correctOptionIndex: 0,
        explanation: 'The second permanent molar typically erupts between 12 and 13 years of age distal to the first molar.'
      },
      {
        id: 'da4_q17',
        questionText: 'What is the Curve of Spee?',
        options: [
          'An anteroposterior anatomical curve of the occlusal surfaces starting at the canine cusp tip and following the buccal cusps of premolars and molars.',
          'A mediolateral curvature of the occlusal planes across left and right arches.',
          'The curvature of the cervical line around the neck of a tooth.',
          'The trajectory of the mandibular condyle along the articular eminence.'
        ],
        correctOptionIndex: 0,
        explanation: 'The Curve of Spee is the anteroposterior curvature of the occlusal surfaces, running from the incisal edge of anterior teeth along the buccal cusp tips of posterior teeth.'
      },
      {
        id: 'da4_q18',
        questionText: 'What is the Curve of Wilson?',
        options: [
          'The mediolateral (transverse) curve of the occlusal planes produced by the lingual inclination of mandibular posterior teeth and buccal inclination of maxillary posterior teeth.',
          'The vertical overlap of maxillary incisors over mandibular incisors.',
          'The horizontal distance between the incisal edges of opposing incisors.',
          'The inclination of the root apex in distal direction.'
        ],
        correctOptionIndex: 0,
        explanation: 'The Curve of Wilson is the mediolateral curvature created by posterior tooth tilt, allowing efficient masticatory function.'
      },
      {
        id: 'da4_q19',
        questionText: 'What term defines the vertical overlap of the maxillary teeth over the mandibular teeth in centric occlusion?',
        options: ['Overbite', 'Overjet', 'Open bite', 'Crossbite'],
        correctOptionIndex: 0,
        explanation: 'Overbite is the vertical overlap of the maxillary incisors over the mandibular incisal edges, measured in millimeters or percentage.'
      },
      {
        id: 'da4_q20',
        questionText: 'What term defines the horizontal distance between the labioincisal surface of the mandibular incisor and the linguoincisal edge of the maxillary incisor?',
        options: ['Overjet', 'Overbite', 'Underbite', 'Edge-to-edge occlusion'],
        correctOptionIndex: 0,
        explanation: 'Overjet is the horizontal projection of maxillary teeth beyond opposing mandibular teeth.'
      },
      {
        id: 'da4_q21',
        questionText: 'Which cusp on the maxillary second molar is most likely to be significantly reduced in size or completely missing, producing a three-cusp heart-shaped crown?',
        options: ['Distolingual cusp', 'Mesiolingual cusp', 'Mesiobuccal cusp', 'Distobuccal cusp'],
        correctOptionIndex: 0,
        explanation: 'The distolingual cusp of the maxillary second molar is often underdeveloped or absent, leaving three cusps that give the crown a heart-shaped outline.'
      },
      {
        id: 'da4_q22',
        questionText: 'Which permanent teeth exhibit the greatest variation in root and crown anatomy after the maxillary lateral incisors?',
        options: ['Third molars ("wisdom teeth")', 'First molars', 'Second premolars', 'Canines'],
        correctOptionIndex: 0,
        explanation: 'Third molars exhibit the greatest morphological variability, ranging from multi-cusped crowns to single fused conical roots or agenesis.'
      },
      {
        id: 'da4_q23',
        questionText: 'What is the protective zone of unmineralized tissue lining the walls of the dental pulp and responsible for secondary and tertiary dentin formation?',
        options: ['Odontoblastic layer and predentin', 'Ameloblastic layer', 'Cementoid rim', 'Tomes fibers layer'],
        correctOptionIndex: 0,
        explanation: 'Odontoblasts line the periphery of the dental pulp and continuously synthesize predentin throughout vital life.'
      },
      {
        id: 'da4_q24',
        questionText: 'What is secondary dentin?',
        options: [
          'Dentin formed after root formation is complete throughout the life of a vital tooth, reducing pulp chamber size.',
          'Dentin formed rapidly in response to localized trauma or caries.',
          'Dentin that composes the outer layer of the anatomical root.',
          'The first-formed dentin immediately adjacent to enamel.'
        ],
        correctOptionIndex: 0,
        explanation: 'Secondary dentin is deposited slowly and continuously throughout the tooth’s life after root completion, causing the pulp chamber to decrease in volume with age.'
      },
      {
        id: 'da4_q25',
        questionText: 'What is reparative (tertiary) dentin?',
        options: [
          'Dentin synthesized locally by odontoblasts or odontoblast-like cells in response to noxious stimuli such as caries or cavity preparation.',
          'Dentin deposited uniformly during embryonic tooth development.',
          'The hypermineralized peritubular dentin lining the tubules.',
          'The uncalcified organic matrix of newly formed dentin.'
        ],
        correctOptionIndex: 0,
        explanation: 'Tertiary (reparative or reactionary) dentin is formed focally in response to specific localized irritants such as caries, attrition, or operative trauma.'
      }
    ]
  }
];
