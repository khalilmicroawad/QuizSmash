import { Question } from '../types/quiz';

export interface HumanAnatomySection {
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

export const HUMAN_ANATOMY_SECTIONS: HumanAnatomySection[] = [
  {
    id: 'ha-section-1',
    sectionNumber: 1,
    fileName: '1.docx',
    titleEn: 'Section 1: Anatomical Foundations & Skeletal System',
    titleAr: 'القسم الأول: أساسيات التشريح والجهاز الهيكلي والعظام',
    range: '1-25',
    descriptionEn: 'Anatomical planes, positions, movements, classification of bones, joint types, and cartilage histology.',
    descriptionAr: 'المستويات التشريحية، أوضاع وحركات الجسم، تصنيف العظام، أنواع المفاصل، وأنسجة الغضاريف.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Human+Anatomy&preview=1.docx',
    questions: [
      {
        id: 'ha1_q1',
        questionText: 'Which anatomical plane divides the human body into equal right and left halves?',
        options: ['Median (midsagittal) plane', 'Coronal (frontal) plane', 'Horizontal (transverse) plane', 'Parasagittal plane'],
        correctOptionIndex: 0,
        explanation: 'The median (midsagittal) plane is a vertical plane passing longitudinally through the center of the body, dividing it into equal right and left halves.'
      },
      {
        id: 'ha1_q2',
        questionText: 'Which anatomical plane divides the body into anterior (front) and posterior (back) portions?',
        options: ['Coronal (frontal) plane', 'Transverse (axial) plane', 'Sagittal plane', 'Oblique plane'],
        correctOptionIndex: 0,
        explanation: 'The coronal (frontal) plane is a vertical plane at right angles to the median plane, dividing the body into anterior and posterior parts.'
      },
      {
        id: 'ha1_q3',
        questionText: 'In standard anatomical position, how are the palms of the hands oriented?',
        options: [
          'Facing anteriorly (forward)',
          'Facing posteriorly (backward)',
          'Facing medially toward the thighs',
          'Facing superiorly'
        ],
        correctOptionIndex: 0,
        explanation: 'In the standard anatomical position, the subject stands erect with feet flat, eyes forward, arms at sides, and palms facing anteriorly.'
      },
      {
        id: 'ha1_q4',
        questionText: 'Which term describes a structure located closer to the attachment of a limb or closer to the trunk?',
        options: ['Proximal', 'Distal', 'Superior', 'Lateral'],
        correctOptionIndex: 0,
        explanation: 'Proximal indicates closer to the attachment of an extremity or the origin of a structure, whereas distal indicates farther away.'
      },
      {
        id: 'ha1_q5',
        questionText: 'What movement describes moving a limb away from the median plane of the body in the coronal plane?',
        options: ['Abduction', 'Adduction', 'Flexion', 'Circumduction'],
        correctOptionIndex: 0,
        explanation: 'Abduction is the movement of a body part away from the median plane in the coronal plane.'
      },
      {
        id: 'ha1_q6',
        questionText: 'Which classification of bones includes the clavicle, humerus, femur, and metacarpals?',
        options: ['Long bones', 'Short bones', 'Flat bones', 'Sesamoid bones'],
        correctOptionIndex: 0,
        explanation: 'Long bones are tubular with a shaft (diaphysis) and two expanded ends (epiphyses), including limbs, metacarpals, and phalanges.'
      },
      {
        id: 'ha1_q7',
        questionText: 'What type of bone is embedded within a tendon to protect the tendon from excessive wear and tear?',
        options: ['Sesamoid bone (e.g., patella)', 'Pneumatic bone', 'Sutural (Wormian) bone', 'Flat bone'],
        correctOptionIndex: 0,
        explanation: 'Sesamoid bones develop within tendons where they cross ends of long bones to alter the line of pull and protect tendons (e.g., patella).'
      },
      {
        id: 'ha1_q8',
        questionText: 'What term defines bones containing air-filled sinus cavities, such as the maxilla, frontal, and sphenoid bones?',
        options: ['Pneumatic bones', 'Sesamoid bones', 'Compact bones', 'Cancellous bones'],
        correctOptionIndex: 0,
        explanation: 'Pneumatic bones contain air spaces or sinuses that reduce weight and resonate sound (e.g., paranasal sinuses).'
      },
      {
        id: 'ha1_q9',
        questionText: 'What is the vascular fibrous connective tissue membrane covering the outer surface of bones (except articular surfaces)?',
        options: ['Periosteum', 'Endosteum', 'Perichondrium', 'Perineurium'],
        correctOptionIndex: 0,
        explanation: 'The periosteum is a dense fibrous membrane investing the external surface of bones, vital for blood supply, sensory innervation, and appositional bone growth.'
      },
      {
        id: 'ha1_q10',
        questionText: 'In growing long bones, where does longitudinal bone growth take place?',
        options: [
          'Epiphyseal cartilage plate (physis)',
          'Diaphyseal compact cortex',
          'Medullary cavity fat pad',
          'Articular cartilage surface'
        ],
        correctOptionIndex: 0,
        explanation: 'Longitudinal growth of long bones occurs at the epiphyseal cartilage plate (growth plate) between the diaphysis and epiphysis.'
      },
      {
        id: 'ha1_q11',
        questionText: 'What type of joint permits no movement and is united by dense fibrous connective tissue, as seen between skull bones?',
        options: ['Fibrous joint (suture / synarthrosis)', 'Synovial joint', 'Symphysis', 'Synchondrosis'],
        correctOptionIndex: 0,
        explanation: 'Sutures of the skull are immovable fibrous joints (synarthroses) united by collagenous sutural ligaments.'
      },
      {
        id: 'ha1_q12',
        questionText: 'What specialized fibrous joint fastens the root of a tooth into its bony socket in the alveolar process?',
        options: ['Gomphosis (dentoalveolar syndesmosis)', 'Schindylesis', 'Synchondrosis', 'Amphiarthrosis'],
        correctOptionIndex: 0,
        explanation: 'A gomphosis is a specialized peg-and-socket fibrous joint where the periodontal ligament anchors the tooth root into the dental alveolus.'
      },
      {
        id: 'ha1_q13',
        questionText: 'Which class of joints possesses a joint cavity, synovial fluid, and articular capsule, permitting free movement?',
        options: ['Synovial joint (diarthrosis)', 'Fibrous joint', 'Cartilaginous joint', 'Synostosis'],
        correctOptionIndex: 0,
        explanation: 'Synovial joints (diarthroses) are characterized by an articular capsule, joint cavity, synovial membrane, lubricating synovial fluid, and articular cartilage.'
      },
      {
        id: 'ha1_q14',
        questionText: 'What type of cartilage forms the articular surfaces of typical synovial joints and coastal cartilages?',
        options: ['Hyaline cartilage', 'Elastic cartilage', 'Fibrocartilage', 'Calcified cartilage'],
        correctOptionIndex: 0,
        explanation: 'Hyaline cartilage is the most common cartilage type, providing smooth, low-friction gliding surfaces in synovial joints and forming costal cartilages.'
      },
      {
        id: 'ha1_q15',
        questionText: 'Which anatomical structure is composed of tough fibrocartilage?',
        options: [
          'Intervertebral discs and the articular disc of the TMJ',
          'Auricle of the ear and epiglottis',
          'Articular cartilage of the humeral head',
          'Tracheal rings'
        ],
        correctOptionIndex: 0,
        explanation: 'Fibrocartilage contains dense bundles of collagen fibers to resist tensile and compressive forces, making up intervertebral discs and the TMJ articular disc.'
      },
      {
        id: 'ha1_q16',
        questionText: 'Where is elastic cartilage located in the human body?',
        options: [
          'External ear (auricle), auditory tube, and epiglottis',
          'Articular surfaces of knees',
          'Growth plates of long bones',
          'Costal cartilages of the rib cage'
        ],
        correctOptionIndex: 0,
        explanation: 'Elastic cartilage contains abundant elastin fibers, providing flexible structural support in the auricle, auditory (Eustachian) tube, and epiglottis.'
      },
      {
        id: 'ha1_q17',
        questionText: 'How many total vertebrae typically make up the adult vertebral column?',
        options: ['33 in infancy, fusing to 26 in adulthood', '12 vertebrae', '20 vertebrae', '40 vertebrae'],
        correctOptionIndex: 0,
        explanation: 'The vertebral column consists of 7 cervical, 12 thoracic, 5 lumbar, 5 fused sacral (sacrum), and 4 fused coccygeal vertebrae (coccyx), totaling 26 separate bones in adults.'
      },
      {
        id: 'ha1_q18',
        questionText: 'Which cervical vertebra is named the "Atlas" and lacks a vertebral body and spinous process?',
        options: ['C1 (Atlas)', 'C2 (Axis)', 'C7 (Vertebra prominens)', 'C4'],
        correctOptionIndex: 0,
        explanation: 'The first cervical vertebra (C1) is the Atlas; it is ring-like without a body or true spinous process, articulating with the occipital condyles.'
      },
      {
        id: 'ha1_q19',
        questionText: 'Which feature of the second cervical vertebra (Axis, C2) projects superiorly to act as a pivot for rotation of the head?',
        options: ['Dens (odontoid process)', 'Transverse process', 'Pedicle', 'Lamina'],
        correctOptionIndex: 0,
        explanation: 'The dens (odontoid process) of C2 projects superiorly into the ring of the atlas to form the pivot point for head rotation.'
      },
      {
        id: 'ha1_q20',
        questionText: 'Which ribs are classified as "true ribs" because their costal cartilages attach directly to the sternum?',
        options: ['Ribs 1 through 7', 'Ribs 8 through 10', 'Ribs 11 and 12', 'Ribs 1 through 5 only'],
        correctOptionIndex: 0,
        explanation: 'Ribs 1 to 7 are true (vertebrosternal) ribs that articulate directly with the sternum via individual costal cartilages.'
      },
      {
        id: 'ha1_q21',
        questionText: 'What are ribs 11 and 12 commonly called?',
        options: ['Floating ribs', 'True ribs', 'Vertebrochondral ribs', 'Cervical ribs'],
        correctOptionIndex: 0,
        explanation: 'Ribs 11 and 12 have no anterior attachment to the sternum or adjacent costal cartilages and terminate in posterior abdominal musculature, hence "floating ribs".'
      },
      {
        id: 'ha1_q22',
        questionText: 'What three anatomical parts constitute the sternum?',
        options: [
          'Manubrium, body, and xiphoid process',
          'Shaft, head, and tubercle',
          'Symphysis, ramus, and angle',
          'Coronoid, condyle, and alveolus'
        ],
        correctOptionIndex: 0,
        explanation: 'The sternum consists of the manubrium superiorly, the elongated body centrally, and the cartilaginous/calcified xiphoid process inferiorly.'
      },
      {
        id: 'ha1_q23',
        questionText: 'At which spinal cord or vertebral level does the sternal angle of Louis lie?',
        options: [
          'T4/T5 intervertebral disc level (junction of 2nd costal cartilage)',
          'C7 vertebra level',
          'T10 level',
          'L1 level'
        ],
        correctOptionIndex: 0,
        explanation: 'The sternal angle (junction of manubrium and sternal body) marks the articulation of the 2nd costal cartilage and corresponds posteriorly to the T4–T5 disc.'
      },
      {
        id: 'ha1_q24',
        questionText: 'What type of bone marrow fills the medullary cavity of adult long bone shafts?',
        options: ['Yellow marrow (adipose tissue)', 'Red marrow (active hematopoiesis)', 'Mucin marrow', 'Osteoid matrix'],
        correctOptionIndex: 0,
        explanation: 'In adults, active hematopoietic red marrow in the shafts of long bones is predominantly replaced by yellow marrow consisting mainly of adipose fat cells.'
      },
      {
        id: 'ha1_q25',
        questionText: 'Which cell type is responsible for the resorption and remodeling of bone matrix?',
        options: ['Osteoclasts', 'Osteoblasts', 'Osteocytes', 'Chondrocytes'],
        correctOptionIndex: 0,
        explanation: 'Osteoclasts are large multinucleated cells derived from the monocyte-macrophage lineage that break down and resorb bone tissue.'
      }
    ]
  },
  {
    id: 'ha-section-2',
    sectionNumber: 2,
    fileName: '2.docx',
    titleEn: 'Section 2: Head & Neck Osteology & Cranial Nerves',
    titleAr: 'القسم الثاني: عظام الجمجمة، الرأس والعنق، والأعصاب القحفية',
    range: '26-50',
    descriptionEn: 'Neurocranium, viscerocranium, skull foramina, and cranial nerves I through XII with dental clinical correlations.',
    descriptionAr: 'القحف العصبي، عظام الوجه، ثقوب الجمجمة، والأعصاب القحفية من 1 إلى 12 والارتباطات السريرية.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Human+Anatomy&preview=2.docx',
    questions: [
      {
        id: 'ha2_q1',
        questionText: 'How many total bones constitute the adult human skull (excluding auditory ossicles)?',
        options: ['22 bones (8 neurocranium, 14 viscerocranium)', '32 bones', '14 bones', '28 bones'],
        correctOptionIndex: 0,
        explanation: 'The skull consists of 22 bones: 8 cranial bones housing the brain (neurocranium) and 14 facial skeleton bones (viscerocranium).'
      },
      {
        id: 'ha2_q2',
        questionText: 'Which cranial bone contains the sella turcica, which accommodates the pituitary gland (hypophysis)?',
        options: ['Sphenoid bone', 'Ethmoid bone', 'Temporal bone', 'Occipital bone'],
        correctOptionIndex: 0,
        explanation: 'The sella turcica (hypophyseal fossa) is a saddle-like depression in the body of the sphenoid bone that houses the pituitary gland.'
      },
      {
        id: 'ha2_q3',
        questionText: 'Which skull foramen transmits the mandibular nerve (CN V3) and accessory meningeal artery?',
        options: ['Foramen ovale', 'Foramen rotundum', 'Foramen spinosum', 'Jugular foramen'],
        correctOptionIndex: 0,
        explanation: 'The foramen ovale in the greater wing of the sphenoid transmits the mandibular division of the trigeminal nerve (CN V3), accessory meningeal artery, and lesser petrosal nerve.'
      },
      {
        id: 'ha2_q4',
        questionText: 'Which skull foramen transmits the maxillary nerve (CN V2)?',
        options: ['Foramen rotundum', 'Foramen ovale', 'Foramen magnum', 'Stylomastoid foramen'],
        correctOptionIndex: 0,
        explanation: 'The maxillary nerve (CN V2) passes forward through the foramen rotundum into the pterygopalatine fossa.'
      },
      {
        id: 'ha2_q5',
        questionText: 'What important artery enters the cranial cavity through the foramen spinosum?',
        options: ['Middle meningeal artery', 'Internal carotid artery', 'Vertebral artery', 'Facial artery'],
        correctOptionIndex: 0,
        explanation: 'The middle meningeal artery (a major branch of the maxillary artery) ascends through the foramen spinosum to supply the dura mater and calvaria.'
      },
      {
        id: 'ha2_q6',
        questionText: 'Which three cranial nerves exit the cranial cavity through the jugular foramen?',
        options: [
          'CN IX (Glossopharyngeal), CN X (Vagus), and CN XI (Accessory)',
          'CN VII, CN VIII, and CN IX',
          'CN III, CN IV, and CN VI',
          'CN X, CN XI, and CN XII'
        ],
        correctOptionIndex: 0,
        explanation: 'The jugular foramen transmits cranial nerves IX, X, and XI along with the internal jugular vein.'
      },
      {
        id: 'ha2_q7',
        questionText: 'Through which opening does the hypoglossal nerve (CN XII) exit the skull to supply the tongue muscles?',
        options: ['Hypoglossal canal', 'Stylomastoid foramen', 'Carotid canal', 'Condylar canal'],
        correctOptionIndex: 0,
        explanation: 'The hypoglossal nerve (CN XII) exits through the hypoglossal canal in the occipital bone to innervate all intrinsic and most extrinsic muscles of the tongue.'
      },
      {
        id: 'ha2_q8',
        questionText: 'Which skull foramen allows the motor branch of the facial nerve (CN VII) to emerge from the temporal bone onto the face?',
        options: ['Stylomastoid foramen', 'Internal acoustic meatus', 'Foramen ovale', 'Mental foramen'],
        correctOptionIndex: 0,
        explanation: 'The motor branch of the facial nerve (CN VII) exits the petrous temporal bone via the stylomastoid foramen before branching within the parotid gland.'
      },
      {
        id: 'ha2_q9',
        questionText: 'What is the largest skull foramen, through which the medulla oblongata continues as the spinal cord?',
        options: ['Foramen magnum', 'Jugular foramen', 'Foramen lacerum', 'Optic canal'],
        correctOptionIndex: 0,
        explanation: 'The foramen magnum in the occipital bone is the largest cranial aperture, transmitting the brainstem/spinal cord, vertebral arteries, and spinal accessory nerve roots.'
      },
      {
        id: 'ha2_q10',
        questionText: 'What is the name of the thin, perforated horizontal plate of the ethmoid bone transmitting olfactory nerve fibers (CN I)?',
        options: ['Cribriform plate', 'Perpendicular plate', 'Crista galli', 'Orbital plate'],
        correctOptionIndex: 0,
        explanation: 'Olfactory receptor axons (CN I) pass through the cribriform plate of the ethmoid bone to enter the olfactory bulb.'
      },
      {
        id: 'ha2_q11',
        questionText: 'Which cranial nerve is purely sensory and carries visual impulses from the retina to the brain?',
        options: ['Optic nerve (CN II)', 'Olfactory nerve (CN I)', 'Oculomotor nerve (CN III)', 'Trochlear nerve (CN IV)'],
        correctOptionIndex: 0,
        explanation: 'The optic nerve (CN II) transmits visual information from the neurosensory retina via the optic canal.'
      },
      {
        id: 'ha2_q12',
        questionText: 'Which cranial nerve innervates four of the six extraocular eye muscles and carries parasympathetic fibers to the pupillary sphincter?',
        options: ['Oculomotor nerve (CN III)', 'Trochlear nerve (CN IV)', 'Abducens nerve (CN VI)', 'Trigeminal nerve (CN V)'],
        correctOptionIndex: 0,
        explanation: 'CN III supplies the superior rectus, medial rectus, inferior rectus, and inferior oblique, plus parasympathetics for pupillary constriction and lens accommodation.'
      },
      {
        id: 'ha2_q13',
        questionText: 'Which cranial nerve provides primary general sensory innervation to the face, teeth, oral cavity, and anterior two-thirds of the tongue?',
        options: ['Trigeminal nerve (CN V)', 'Facial nerve (CN VII)', 'Glossopharyngeal nerve (CN IX)', 'Vagus nerve (CN X)'],
        correctOptionIndex: 0,
        explanation: 'The trigeminal nerve (CN V) provides somatic sensory innervation to the entire face, scalp, teeth, gingiva, palate, and oral mucosa.'
      },
      {
        id: 'ha2_q14',
        questionText: 'What are the three main branches of the trigeminal nerve (CN V)?',
        options: [
          'V1 (Ophthalmic), V2 (Maxillary), and V3 (Mandibular)',
          'Greater petrosal, chorda tympani, and lingual',
          'Supraorbital, infraorbital, and mental',
          'Temporal, zygomatic, and buccal'
        ],
        correctOptionIndex: 0,
        explanation: 'The trigeminal nerve splits at the trigeminal (semilunar/Gasserian) ganglion into three divisions: V1 (Ophthalmic), V2 (Maxillary), and V3 (Mandibular).'
      },
      {
        id: 'ha2_q15',
        questionText: 'Which division of the trigeminal nerve is both sensory and motor (mixed)?',
        options: ['Mandibular division (CN V3)', 'Ophthalmic division (CN V1)', 'Maxillary division (CN V2)', 'All three are mixed'],
        correctOptionIndex: 0,
        explanation: 'Only the mandibular division (V3) carries motor axons (innervating the muscles of mastication, mylohyoid, anterior digastric, tensor veli palatini, tensor tympani) alongside sensory fibers.'
      },
      {
        id: 'ha2_q16',
        questionText: 'Which nerve enters the mandibular foramen on the medial surface of the ramus to provide sensory innervation to the mandibular teeth?',
        options: ['Inferior alveolar nerve', 'Lingual nerve', 'Buccal nerve', 'Mental nerve'],
        correctOptionIndex: 0,
        explanation: 'The inferior alveolar nerve (branch of V3) enters the mandibular foramen to supply sensation to all lower teeth on that quadrant before exiting as the mental nerve.'
      },
      {
        id: 'ha2_q17',
        questionText: 'What nerve exits through the mental foramen on the anterolateral body of the mandible?',
        options: [
          'Mental nerve (terminal branch of inferior alveolar nerve)',
          'Lingual nerve',
          'Facial nerve',
          'Mylohyoid nerve'
        ],
        correctOptionIndex: 0,
        explanation: 'The mental nerve exits the mental foramen (typically below the premolars) to supply the skin of the chin and lower lip, and labial gingiva of mandibular anterior teeth.'
      },
      {
        id: 'ha2_q18',
        questionText: 'Which cranial nerve is responsible for taste sensation on the anterior two-thirds of the tongue?',
        options: [
          'Facial nerve (CN VII, via chorda tympani hitchhiking on lingual nerve)',
          'Glossopharyngeal nerve (CN IX)',
          'Trigeminal nerve (CN V3)',
          'Vagus nerve (CN X)'
        ],
        correctOptionIndex: 0,
        explanation: 'Special sensory taste from the anterior 2/3 of the tongue is mediated by the chorda tympani branch of the facial nerve (CN VII), running within the lingual nerve.'
      },
      {
        id: 'ha2_q19',
        questionText: 'Which cranial nerve provides both general sensation and taste to the posterior one-third of the tongue?',
        options: ['Glossopharyngeal nerve (CN IX)', 'Facial nerve (CN VII)', 'Trigeminal nerve (CN V)', 'Hypoglossal nerve (CN XII)'],
        correctOptionIndex: 0,
        explanation: 'The glossopharyngeal nerve (CN IX) supplies both general somatic sensation (touch, pain, temperature) and special sensory taste to the posterior third of the tongue.'
      },
      {
        id: 'ha2_q20',
        questionText: 'Which cranial nerve supplies parasympathetic motor innervation to the parotid salivary gland?',
        options: ['Glossopharyngeal nerve (CN IX, via otic ganglion)', 'Facial nerve (CN VII)', 'Vagus nerve (CN X)', 'Trigeminal nerve (CN V)'],
        correctOptionIndex: 0,
        explanation: 'Preganglionic parasympathetic fibers from CN IX travel via the lesser petrosal nerve to synapse in the otic ganglion, then auriculotemporal nerve (V3) to the parotid gland.'
      },
      {
        id: 'ha2_q21',
        questionText: 'Which cranial nerve provides parasympathetic innervation to the submandibular and sublingual salivary glands?',
        options: ['Facial nerve (CN VII, via chorda tympani and submandibular ganglion)', 'Glossopharyngeal nerve (CN IX)', 'Trigeminal nerve (CN V)', 'Hypoglossal nerve (CN XII)'],
        correctOptionIndex: 0,
        explanation: 'The facial nerve (CN VII) sends preganglionic secretomotor fibers through the chorda tympani to the submandibular ganglion to supply both submandibular and sublingual glands.'
      },
      {
        id: 'ha2_q22',
        questionText: 'What clinical condition presents with unilateral weakness or paralysis of all muscles of facial expression due to inflammation of CN VII?',
        options: ['Bell’s palsy', 'Trigeminal neuralgia', 'Tic douloureux', 'Horner syndrome'],
        correctOptionIndex: 0,
        explanation: 'Bell’s palsy is an acute idiopathic peripheral neuropathy of the facial nerve (CN VII), producing unilateral flaccid facial muscle paralysis.'
      },
      {
        id: 'ha2_q23',
        questionText: 'Severe, lancinating, electric shock-like paroxysmal pain triggered by light touch in the distribution of V2 or V3 is known as:',
        options: ['Trigeminal neuralgia (tic douloureux)', 'Glossopharyngeal neuralgia', 'Temporal arteritis', 'Cluster headache'],
        correctOptionIndex: 0,
        explanation: 'Trigeminal neuralgia is characterized by intense, brief, stabbing pain along the divisions of the trigeminal nerve, commonly triggered by chewing or talking.'
      },
      {
        id: 'ha2_q24',
        questionText: 'What is the pterion?',
        options: [
          'An H-shaped sutural junction on the temple where frontal, parietal, sphenoid, and temporal bones meet.',
          'The midpoint of the frontonasal suture.',
          'The superior border of the mental symphysis.',
          'The highest point on the vertex of the skull.'
        ],
        correctOptionIndex: 0,
        explanation: 'The pterion is a thin skull region over the anterior branch of the middle meningeal artery; trauma here can cause an epidural hematoma.'
      },
      {
        id: 'ha2_q25',
        questionText: 'Which bone forms the prominence of the cheek and contributes to the lateral wall and floor of the orbit?',
        options: ['Zygomatic bone', 'Maxilla', 'Temporal bone', 'Lacrimal bone'],
        correctOptionIndex: 0,
        explanation: 'The paired zygomatic bones (malar bones) form the cheek prominence and articulate with the maxilla, temporal, frontal, and sphenoid bones.'
      }
    ]
  },
  {
    id: 'ha-section-3',
    sectionNumber: 3,
    fileName: '3.docx',
    titleEn: 'Section 3: Muscles of Mastication, Facial Expression & TMJ',
    titleAr: 'القسم الثالث: عضلات المضغ، تعابير الوجه، والمفصل الصدغي الفكي TMJ',
    range: '51-75',
    descriptionEn: 'The four muscles of mastication, facial expression musculature, temporomandibular joint biomechanics, and articular disc dynamics.',
    descriptionAr: 'عضلات المضغ الأربع، عضلات تعابير الوجه، الميكانيكا الحيوية للمفصل الصدغي الفكي وحركة القرص المفصلي.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Human+Anatomy&preview=3.docx',
    questions: [
      {
        id: 'ha3_q1',
        questionText: 'What are the four primary muscles of mastication?',
        options: [
          'Masseter, Temporalis, Medial Pterygoid, Lateral Pterygoid',
          'Buccinator, Orbicularis oris, Masseter, Digastric',
          'Mylohyoid, Geniohyoid, Masseter, Temporalis',
          'Platysma, Sternocleidomastoid, Trapezius, Masseter'
        ],
        correctOptionIndex: 0,
        explanation: 'The four classical muscles of mastication are the masseter, temporalis, medial pterygoid, and lateral pterygoid muscles.'
      },
      {
        id: 'ha3_q2',
        questionText: 'All four muscles of mastication are embryologically derived from the first pharyngeal arch and innervated by which nerve?',
        options: [
          'Mandibular nerve (CN V3)',
          'Facial nerve (CN VII)',
          'Maxillary nerve (CN V2)',
          'Hypoglossal nerve (CN XII)'
        ],
        correctOptionIndex: 0,
        explanation: 'Muscles of mastication develop from the 1st branchial arch and receive motor innervation from the anterior division of the mandibular nerve (CN V3).'
      },
      {
        id: 'ha3_q3',
        questionText: 'Which muscle of mastication is the primary muscle responsible for depressing (opening) and protruding the mandible?',
        options: ['Lateral pterygoid muscle', 'Masseter muscle', 'Temporalis muscle', 'Medial pterygoid muscle'],
        correctOptionIndex: 0,
        explanation: 'The lateral pterygoid (especially its inferior head) pulls the condyle and articular disc forward, depressing and protruding the mandible.'
      },
      {
        id: 'ha3_q4',
        questionText: 'Which muscle of mastication is a powerful fan-shaped muscle whose posterior horizontal fibers retract the mandible?',
        options: ['Temporalis muscle', 'Masseter muscle', 'Medial pterygoid muscle', 'Lateral pterygoid muscle'],
        correctOptionIndex: 0,
        explanation: 'The temporalis muscle elevates the mandible, and its posterior horizontal fibers are the primary retractors of the mandible.'
      },
      {
        id: 'ha3_q5',
        questionText: 'Where does the masseter muscle insert on the mandible?',
        options: [
          'Lateral surface of the mandibular ramus and angle',
          'Coronoid process and anterior border of ramus',
          'Medial surface of the mandibular angle',
          'Pterygoid fovea on the neck of condyle'
        ],
        correctOptionIndex: 0,
        explanation: 'The masseter originates from the zygomatic arch and inserts into the lateral surface of the ramus and angle of the mandible.'
      },
      {
        id: 'ha3_q6',
        questionText: 'Which muscle forms a muscular sling with the masseter around the angle of the mandible?',
        options: ['Medial pterygoid muscle', 'Lateral pterygoid muscle', 'Buccinator muscle', 'Digastric muscle'],
        correctOptionIndex: 0,
        explanation: 'The masseter (laterally) and medial pterygoid (medially) form a powerful muscular sling enveloping the angle of the mandible to forcefully elevate it.'
      },
      {
        id: 'ha3_q7',
        questionText: 'What anatomical structure inserts partly into the anterior portion of the TMJ articular disc and capsule?',
        options: [
          'Superior head of the lateral pterygoid muscle',
          'Deep head of the masseter',
          'Anterior fibers of temporalis',
          'Superficial head of medial pterygoid'
        ],
        correctOptionIndex: 0,
        explanation: 'The superior head of the lateral pterygoid inserts directly into the anteromedial capsule and articular disc of the TMJ, active during jaw closure/power stroke.'
      },
      {
        id: 'ha3_q8',
        questionText: 'What type of joint is the temporomandibular joint (TMJ) classified as?',
        options: [
          'Ginglymoarthrodial joint (bilateral synovial joint allowing hinge and gliding movements)',
          'Pivot joint (trochoid)',
          'Saddle joint (sellar)',
          'Pure plane synovial joint'
        ],
        correctOptionIndex: 0,
        explanation: 'The TMJ is a ginglymoarthrodial joint: ginglymoid (hinging rotation in lower compartment) and arthrodial (gliding translation in upper compartment).'
      },
      {
        id: 'ha3_q9',
        questionText: 'What tissue lines the articular surfaces of the TMJ condyle and temporal fossa, distinct from typical synovial joints?',
        options: [
          'Avascular fibrous connective tissue',
          'Hyaline cartilage',
          'Elastic fibrocartilage',
          'Synovial lining cell layer only'
        ],
        correctOptionIndex: 0,
        explanation: 'Unlike most synovial joints that are covered by hyaline cartilage, the articular surfaces of the TMJ are covered by dense avascular fibrous tissue.'
      },
      {
        id: 'ha3_q10',
        questionText: 'What is the shape of the articular disc of the TMJ in sagittal cross-section?',
        options: [
          'Biconcave (thick anterior and posterior bands, thin intermediate zone)',
          'Biconvex',
          'Uniform flat sheet',
          'Triangular prism'
        ],
        correctOptionIndex: 0,
        explanation: 'The TMJ articular disc is biconcave: it has a thick anterior band, a thin avascular intermediate zone (where condyle articulates), and a thick posterior band.'
      },
      {
        id: 'ha3_q11',
        questionText: 'Which zone of the TMJ articular disc is avascular and aneural, designed for normal weight-bearing articulation?',
        options: ['Intermediate zone', 'Posterior band', 'Bilaminar retrodiscal zone', 'Anterior band'],
        correctOptionIndex: 0,
        explanation: 'The central intermediate zone of the articular disc is completely devoid of nerves and blood vessels, ideally adapted to withstand heavy biting forces.'
      },
      {
        id: 'ha3_q12',
        questionText: 'What is the retrodiscal pad (bilaminar zone) of the TMJ?',
        options: [
          'A highly vascularized and richly innervated loose connective tissue pad behind the disc.',
          'An avascular calcified tendon attaching to the mastoid.',
          'A thick ligament preventing forward dislocation.',
          'The synovial pocket above the zygomatic arch.'
        ],
        correctOptionIndex: 0,
        explanation: 'The bilaminar retrodiscal zone behind the disc is richly vascularized and innervated; compression or inflammation here produces severe TMJ arthralgia.'
      },
      {
        id: 'ha3_q13',
        questionText: 'During initial jaw opening (the first 20–25 mm of interincisal distance), what movement predominates in the TMJ?',
        options: [
          'Rotational hinge movement in the lower (infradiscal) joint compartment',
          'Translational gliding in the upper (supradiscal) compartment',
          'Lateral shift (Bennett movement)',
          'Complete anterior luxation of the condyle'
        ],
        correctOptionIndex: 0,
        explanation: 'The first phase of opening involves pure hinge rotation of the condyle against the inferior surface of the disc within the lower joint compartment.'
      },
      {
        id: 'ha3_q14',
        questionText: 'During maximal wide opening of the mouth, what movement occurs in the upper compartment of the TMJ?',
        options: [
          'Anterior translation of the condyle-disc complex onto the articular eminence',
          'Pure posterior rotation',
          'Medial gliding into the sphenoid spine',
          'Compression of the retrodiscal pad'
        ],
        correctOptionIndex: 0,
        explanation: 'Wide opening requires forward and downward translation of the condyle and disc along the slope of the articular eminence in the upper compartment.'
      },
      {
        id: 'ha3_q15',
        questionText: 'What ligament acts as the main passive restraint preventing excessive posterior and inferior displacement of the mandibular condyle?',
        options: [
          'Lateral (temporomandibular) ligament',
          'Sphenomandibular ligament',
          'Stylomandibular ligament',
          'Pterygomandibular raphe'
        ],
        correctOptionIndex: 0,
        explanation: 'The lateral temporomandibular ligament reinforces the lateral capsule and prevents the condyle from being displaced posteriorly and inferiorly.'
      },
      {
        id: 'ha3_q16',
        questionText: 'Which embryological ligament is a remnant of Meckel’s cartilage sheath and attaches to the lingula of the mandible?',
        options: ['Sphenomandibular ligament', 'Stylomandibular ligament', 'Lateral ligament', 'Collateral ligament'],
        correctOptionIndex: 0,
        explanation: 'The sphenomandibular ligament runs from the spine of the sphenoid to the lingula of the mandible; it is a remnant of Meckel’s cartilage.'
      },
      {
        id: 'ha3_q17',
        questionText: 'Which facial muscle forms the muscular substance of the cheek and compresses cheeks against molars during chewing to prevent food pocketing?',
        options: ['Buccinator muscle', 'Masseter muscle', 'Zygomaticus major', 'Risorius'],
        correctOptionIndex: 0,
        explanation: 'The buccinator is an accessory muscle of mastication that keeps the bolus of food centered between the occlusal surfaces during chewing.'
      },
      {
        id: 'ha3_q18',
        questionText: 'What structure pierces the buccinator muscle opposite the maxillary second molar to enter the oral cavity?',
        options: [
          'Parotid duct (Stensen’s duct)',
          'Submandibular duct (Wharton’s duct)',
          'Facial artery',
          'Lingual nerve'
        ],
        correctOptionIndex: 0,
        explanation: 'The parotid duct (Stensen’s duct) crosses the masseter, pierces the buccinator muscle, and empties into the oral vestibule opposite the maxillary 2nd molar.'
      },
      {
        id: 'ha3_q19',
        questionText: 'All muscles of facial expression are embryologically derived from the second pharyngeal arch and innervated by which nerve?',
        options: [
          'Facial nerve (CN VII)',
          'Trigeminal nerve (CN V3)',
          'Accessory nerve (CN XI)',
          'Hypoglossal nerve (CN XII)'
        ],
        correctOptionIndex: 0,
        explanation: 'Muscles of facial expression derive from the 2nd branchial arch and receive motor control from the facial nerve (CN VII).'
      },
      {
        id: 'ha3_q20',
        questionText: 'What circular sphincter muscle surrounds the mouth and is responsible for closing, compressing, and protruding the lips?',
        options: ['Orbicularis oris', 'Orbicularis oculi', 'Buccinator', 'Mentalis'],
        correctOptionIndex: 0,
        explanation: 'The orbicularis oris encircles the oral aperture, closing the lips and puckering them as in whistling.'
      },
      {
        id: 'ha3_q21',
        questionText: 'Which muscle of facial expression wrinkles the chin and elevates and protrudes the lower lip?',
        options: ['Mentalis muscle', 'Depressor labii inferioris', 'Risorius', 'Corrugator supercilii'],
        correctOptionIndex: 0,
        explanation: 'The mentalis muscle originates from the incisive fossa of the mandible and inserts into the skin of the chin, elevating and wrinkling it.'
      },
      {
        id: 'ha3_q22',
        questionText: 'What muscle elevates the angle of the mouth upward and laterally when producing a genuine smile?',
        options: ['Zygomaticus major', 'Depressor anguli oris', 'Platysma', 'Levator labii superioris'],
        correctOptionIndex: 0,
        explanation: 'The zygomaticus major muscle draws the corner of the mouth superiorly and laterally during smiling and laughing.'
      },
      {
        id: 'ha3_q23',
        questionText: 'What is the modiolus?',
        options: [
          'A dense fibromuscular convergence point lateral to each corner of the mouth where multiple facial muscles interlace.',
          'The bony core of the cochlea.',
          'The central tendon of the digastric muscle.',
          'The junction of the facial vein and retromandibular vein.'
        ],
        correctOptionIndex: 0,
        explanation: 'The modiolus is a dense chiasma of muscle fibers at each oral commissure where buccinator, orbicularis oris, zygomaticus major, and depressor anguli oris converge.'
      },
      {
        id: 'ha3_q24',
        questionText: 'What superficial thin sheet of muscle lies within the superficial fascia of the neck and pulls down the lower lip and corners of the mouth?',
        options: ['Platysma', 'Sternocleidomastoid', 'Trapezius', 'Digastric'],
        correctOptionIndex: 0,
        explanation: 'The platysma is a broad thin cutaneous muscle in the subcutaneous tissue of the anterolateral neck, innervated by the cervical branch of CN VII.'
      },
      {
        id: 'ha3_q25',
        questionText: 'In internal derangement of the TMJ with reduction, what clinical sign characteristically occurs during mouth opening?',
        options: [
          'A reciprocal click or pop as the anteriorly displaced disc snaps back onto the condyle',
          'Inability to open the mouth beyond 10 mm (closed lock without reduction)',
          'Permanent deviation of the jaw to the opposite side',
          'Loss of taste on the anterior two-thirds of the tongue'
        ],
        correctOptionIndex: 0,
        explanation: 'In anterior disc displacement with reduction, a click occurs as the condyle slips beneath the posterior band to recapture the disc during opening.'
      }
    ]
  },
  {
    id: 'ha-section-4',
    sectionNumber: 4,
    fileName: '4.docx',
    titleEn: 'Section 4: Vascular Supply & Lymphatics of Head & Neck',
    titleAr: 'القسم الرابع: التروية الدموية، الشرايين والأوردة، والتصريف اللمفاوي',
    range: '76-100',
    descriptionEn: 'Carotid arterial system, maxillary artery branches, venous drainage of face and brain, danger triangle, and cervical lymph nodes.',
    descriptionAr: 'منظومة الشريان السباتي، فروع الشريان الفكي، التصريف الوريدي ومثلث الخطر، والعقد اللمفاوية العنقية.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Human+Anatomy&preview=4.docx',
    questions: [
      {
        id: 'ha4_q1',
        questionText: 'At what vertebral level does the common carotid artery typically bifurcate into the internal and external carotid arteries?',
        options: [
          'C3–C4 level (superior border of the thyroid cartilage)',
          'C1 level',
          'C6–C7 level',
          'T2–T3 level'
        ],
        correctOptionIndex: 0,
        explanation: 'The common carotid artery ascends in the carotid sheath and bifurcates into external and internal carotid arteries at the superior border of the thyroid cartilage (C3–C4).'
      },
      {
        id: 'ha4_q2',
        questionText: 'What baroreceptor structure located at the carotid bifurcation monitors systemic arterial blood pressure?',
        options: ['Carotid sinus', 'Carotid body', 'Aortic arch body', 'Ciliary ganglion'],
        correctOptionIndex: 0,
        explanation: 'The carotid sinus is a dilated dilation at the base of the internal carotid artery that contains pressoreceptors (baroreceptors) innervated by CN IX (sinus nerve of Hering).'
      },
      {
        id: 'ha4_q3',
        questionText: 'What chemoreceptor structure located near the carotid bifurcation detects changes in blood oxygen (pO2), carbon dioxide, and pH?',
        options: ['Carotid body', 'Carotid sinus', 'Thyroid gland', 'Parathyroid gland'],
        correctOptionIndex: 0,
        explanation: 'The carotid body is a small chemoreceptor organ monitoring arterial blood gases and pH, innervated by CN IX and CN X.'
      },
      {
        id: 'ha4_q4',
        questionText: 'Does the internal carotid artery give off any branches in the cervical neck region before entering the skull?',
        options: [
          'No, it gives off zero branches in the neck.',
          'Yes, it gives off the facial and lingual arteries.',
          'Yes, it gives off the ascending pharyngeal artery.',
          'Yes, it branches into the maxillary and superficial temporal arteries.'
        ],
        correctOptionIndex: 0,
        explanation: 'The internal carotid artery ascends vertically through the neck within the carotid sheath without giving off any branches in the neck, entering the carotid canal directly.'
      },
      {
        id: 'ha4_q5',
        questionText: 'What are the two terminal branches of the external carotid artery given off within the parotid gland?',
        options: [
          'Maxillary artery and Superficial temporal artery',
          'Facial artery and Lingual artery',
          'Posterior auricular artery and Occipital artery',
          'Superior thyroid artery and Ascending pharyngeal artery'
        ],
        correctOptionIndex: 0,
        explanation: 'The external carotid artery terminates behind the neck of the mandible within the parotid gland by dividing into the maxillary and superficial temporal arteries.'
      },
      {
        id: 'ha4_q6',
        questionText: 'Which branch of the external carotid artery winds around the inferior border of the mandible just anterior to the masseter muscle where its pulse can be palpated?',
        options: ['Facial artery', 'Lingual artery', 'Maxillary artery', 'Mental artery'],
        correctOptionIndex: 0,
        explanation: 'The facial artery hooks over the inferior border of the mandible at the anterior border of the masseter muscle, where its pulsation is readily felt.'
      },
      {
        id: 'ha4_q7',
        questionText: 'Which branch of the maxillary artery enters the mandibular canal to supply the mandibular teeth and periodontal tissues?',
        options: ['Inferior alveolar artery', 'Middle meningeal artery', 'Deep temporal artery', 'Sphenopalatine artery'],
        correctOptionIndex: 0,
        explanation: 'The inferior alveolar artery descends alongside the inferior alveolar nerve into the mandibular foramen to vascularize the lower dentition.'
      },
      {
        id: 'ha4_q8',
        questionText: 'Which important intracranial artery arises from the 1st (mandibular) part of the maxillary artery and passes through the foramen spinosum?',
        options: ['Middle meningeal artery', 'Accessory meningeal artery', 'Deep auricular artery', 'Anterior tympanic artery'],
        correctOptionIndex: 0,
        explanation: 'The middle meningeal artery ascends from the 1st part of the maxillary artery, travels through the auriculotemporal nerve loop, and enters via foramen spinosum.'
      },
      {
        id: 'ha4_q9',
        questionText: 'What terminal branch of the maxillary artery is known as the "artery of epistaxis" and passes through the sphenopalatine foramen into the nasal cavity?',
        options: ['Sphenopalatine artery', 'Descending palatine artery', 'Infraorbital artery', 'Posterior superior alveolar artery'],
        correctOptionIndex: 0,
        explanation: 'The sphenopalatine artery is the major blood supply to the nasal cavity and the main contributor to severe posterior nosebleeds (epistaxis).'
      },
      {
        id: 'ha4_q10',
        questionText: 'Which arterial anastomosis on the anteroinferior nasal septum is the most frequent source of anterior nosebleeds (epistaxis)?',
        options: ["Kiesselbach's plexus (Little's area)", 'Circle of Willis', "Cruveilhier's plexus", 'Pterygoid venous plexus'],
        correctOptionIndex: 0,
        explanation: "Kiesselbach's plexus in Little's area on the anterior nasal septum is where four arteries anastomose and is the source of ~90% of all nosebleeds."
      },
      {
        id: 'ha4_q11',
        questionText: 'What extensive venous network surrounds the lateral pterygoid muscle and maxillary artery in the infratemporal fossa?',
        options: ['Pterygoid venous plexus', 'Cavernous sinus', 'Pharyngeal venous plexus', 'Retromandibular venous plexus'],
        correctOptionIndex: 0,
        explanation: 'The pterygoid venous plexus occupies the infratemporal fossa around the lateral pterygoid muscle, communicating with both the facial vein and cavernous sinus.'
      },
      {
        id: 'ha4_q12',
        questionText: 'Why is puncturing the pterygoid venous plexus during a posterior superior alveolar (PSA) nerve block clinically significant?',
        options: [
          'It can produce a rapidly expanding, disfiguring hematoma in the cheek.',
          'It causes instantaneous tongue paralysis.',
          'It causes irreversible sensory loss to the lips.',
          'It induces permanent loss of salivary secretion.'
        ],
        correctOptionIndex: 0,
        explanation: 'Direct puncture of the pterygoid venous plexus by over-inserting a dental needle during a PSA block leads to rapid bleeding and a visible cheek hematoma.'
      },
      {
        id: 'ha4_q13',
        questionText: 'What anatomical zone of the face is termed the "danger triangle of the face" due to potential retrograde infection spread to the cavernous sinus?',
        options: [
          'The area bounded by the upper lip, nose, and inner canthi of the eyes',
          'The submental triangle beneath the chin',
          'The posterior triangle of the neck',
          'The parotid-masseteric area'
        ],
        correctOptionIndex: 0,
        explanation: 'The danger triangle (corners of mouth to bridge of nose) contains facial veins lacking valves, connecting via ophthalmic veins to the cavernous sinus.'
      },
      {
        id: 'ha4_q14',
        questionText: 'Why can infection in the danger area of the face spread backward to the cavernous sinus?',
        options: [
          'Because the facial and ophthalmic veins are valveless, permitting bidirectional blood flow.',
          'Because the facial artery has high hydrostatic pressure.',
          'Because the parotid gland contains open lymphatic ducts to the brain.',
          'Because the cribriform plate is directly exposed in the cheek.'
        ],
        correctOptionIndex: 0,
        explanation: 'The facial vein has no valves; retrograde flow through superior and inferior ophthalmic veins can transport septic emboli into the cavernous sinus.'
      },
      {
        id: 'ha4_q15',
        questionText: 'Which dural venous sinus is situated on each side of the sella turcica and traversed by the internal carotid artery and CN VI?',
        options: ['Cavernous sinus', 'Superior sagittal sinus', 'Transverse sinus', 'Sigmoid sinus'],
        correctOptionIndex: 0,
        explanation: 'The cavernous sinus houses the internal carotid artery and CN VI within its lumen, and CN III, IV, V1, V2 embedded in its lateral wall.'
      },
      {
        id: 'ha4_q16',
        questionText: 'Which cranial nerve is most vulnerable in early cavernous sinus thrombosis due to its location inside the lumen next to the internal carotid artery?',
        options: ['Abducens nerve (CN VI)', 'Oculomotor nerve (CN III)', 'Trochlear nerve (CN IV)', 'Maxillary nerve (CN V2)'],
        correctOptionIndex: 0,
        explanation: 'CN VI runs freely inside the cavernous sinus lumen (not within the fibrous wall), making lateral rectus palsy the earliest neurologic sign.'
      },
      {
        id: 'ha4_q17',
        questionText: 'What two veins unite within the parotid gland to form the retromandibular vein?',
        options: [
          'Superficial temporal vein and maxillary vein',
          'Facial vein and internal jugular vein',
          'Posterior auricular vein and occipital vein',
          'Lingual vein and submental vein'
        ],
        correctOptionIndex: 0,
        explanation: 'The retromandibular vein is formed within the substance of the parotid gland by the union of the superficial temporal and maxillary veins.'
      },
      {
        id: 'ha4_q18',
        questionText: 'The anterior division of the retromandibular vein joins the facial vein to form which vascular channel?',
        options: ['Common facial vein', 'External jugular vein', 'Internal jugular vein', 'Subclavian vein'],
        correctOptionIndex: 0,
        explanation: 'The anterior division of the retromandibular vein merges with the facial vein to form the common facial vein, which empties into the internal jugular vein.'
      },
      {
        id: 'ha4_q19',
        questionText: 'Which major neck vein descends obliquely across the superficial surface of the sternocleidomastoid muscle beneath the platysma?',
        options: ['External jugular vein', 'Internal jugular vein', 'Anterior jugular vein', 'Vertebral vein'],
        correctOptionIndex: 0,
        explanation: 'The external jugular vein runs vertically down across the superficial surface of the sternocleidomastoid muscle to empty into the subclavian vein.'
      },
      {
        id: 'ha4_q20',
        questionText: 'What large vein emerges from the jugular foramen as a direct continuation of the sigmoid sinus?',
        options: ['Internal jugular vein', 'External jugular vein', 'Brachiocephalic vein', 'Superior vena cava'],
        correctOptionIndex: 0,
        explanation: 'The internal jugular vein begins in the jugular foramen as the dilated continuation of the sigmoid sinus, descending inside the carotid sheath.'
      },
      {
        id: 'ha4_q21',
        questionText: 'What structures are contained within the carotid sheath in the neck?',
        options: [
          'Common/internal carotid artery, internal jugular vein, and vagus nerve (CN X)',
          'External carotid artery, facial vein, and phrenic nerve',
          'Subclavian artery, brachial plexus, and sympathetic trunk',
          'Internal carotid artery, glossopharyngeal nerve, and spinal accessory nerve'
        ],
        correctOptionIndex: 0,
        explanation: 'The carotid sheath encloses the common and internal carotid arteries (medially), internal jugular vein (laterally), and vagus nerve (posteriorly).'
      },
      {
        id: 'ha4_q22',
        questionText: 'Which group of lymph nodes receives direct drainage from the tip of the tongue, mandibular incisors, and middle of the lower lip?',
        options: ['Submental lymph nodes', 'Submandibular lymph nodes', 'Deep cervical lymph nodes', 'Parotid lymph nodes'],
        correctOptionIndex: 0,
        explanation: 'The submental nodes drain the tip of the tongue, floor of the mouth, mandibular incisors and associated gingiva, and the central lower lip.'
      },
      {
        id: 'ha4_q23',
        questionText: 'Which lymph nodes receive primary lymphatic drainage from all maxillary teeth and mandibular posterior teeth?',
        options: ['Submandibular lymph nodes', 'Submental lymph nodes', 'Retroauricular nodes', 'Occipital nodes'],
        correctOptionIndex: 0,
        explanation: 'The submandibular lymph nodes receive drainage from all maxillary teeth, mandibular canines, premolars, molars, and lateral tongue.'
      },
      {
        id: 'ha4_q24',
        questionText: 'Into which deep cervical lymph node chain does all lymphatic fluid from the head and neck ultimately drain?',
        options: [
          'Deep cervical lymph nodes (along the internal jugular vein)',
          'Superficial cervical nodes',
          'Axillary lymph nodes',
          'Supraclavicular lymph nodes only'
        ],
        correctOptionIndex: 0,
        explanation: 'All lymphatic vessels of the head and neck ultimately drain directly or indirectly into the deep cervical lymph nodes along the internal jugular vein.'
      },
      {
        id: 'ha4_q25',
        questionText: 'What prominent lymph node of the upper deep cervical group lies adjacent to the internal jugular vein where crossed by the digastric muscle, frequently enlarged in tonsillitis?',
        options: [
          'Jugulodigastric node (tonsillar node)',
          'Jugulo-omohyoid node',
          'Virchow’s node',
          "Delphian node"
        ],
        correctOptionIndex: 0,
        explanation: 'The jugulodigastric node is the largest node of the upper deep cervical group, located where the posterior belly of the digastric crosses the IJV; it drains the palatine tonsil.'
      }
    ]
  },
  {
    id: 'ha-section-5',
    sectionNumber: 5,
    fileName: '5.docx',
    titleEn: 'Section 5: Nervous System, Autonomic Ganglia & Oral Cavity',
    titleAr: 'القسم الخامس: الجهاز العصبي، العقد الذاتية، وتشريح تجويف الفم واللسان',
    range: '101-125',
    descriptionEn: 'The four parasympathetic ganglia of the head, salivary glands, oral cavity anatomy, extrinsic and intrinsic tongue muscles, and pharynx.',
    descriptionAr: 'العقد نظيرة الودية الأربع، الغدد اللعابية، تشريح التجويف الفمي، عضلات اللسان الداخلية والخارجية، والبلعوم.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Human+Anatomy&preview=5.docx',
    questions: [
      {
        id: 'ha5_q1',
        questionText: 'What are the four autonomic parasympathetic ganglia located in the head?',
        options: [
          'Ciliary, Pterygopalatine, Otic, Submandibular ganglia',
          'Trigeminal, Superior cervical, Gasserian, Geniculate ganglia',
          'Stellate, Celiac, Mesenteric, Dorsal root ganglia',
          'Jugular, Nodose, Petrosal, Spiral ganglia'
        ],
        correctOptionIndex: 0,
        explanation: 'The four peripheral parasympathetic ganglia of the head are the Ciliary (CN III), Pterygopalatine (CN VII), Submandibular (CN VII), and Otic (CN IX).'
      },
      {
        id: 'ha5_q2',
        questionText: 'Which cranial nerve supplies the preganglionic parasympathetic fibers that synapse in the ciliary ganglion to control pupillary constriction?',
        options: ['Oculomotor nerve (CN III)', 'Facial nerve (CN VII)', 'Glossopharyngeal nerve (CN IX)', 'Trigeminal nerve (CN V1)'],
        correctOptionIndex: 0,
        explanation: 'Preganglionic parasympathetic fibers travel in CN III to synapse in the ciliary ganglion; postganglionic fibers via short ciliary nerves constrict the pupil.'
      },
      {
        id: 'ha5_q3',
        questionText: 'Which cranial nerve provides preganglionic fibers to the pterygopalatine ganglion (via greater petrosal nerve) to innervate the lacrimal gland and nasal mucosa?',
        options: ['Facial nerve (CN VII)', 'Trigeminal nerve (CN V2)', 'Glossopharyngeal nerve (CN IX)', 'Oculomotor nerve (CN III)'],
        correctOptionIndex: 0,
        explanation: 'The facial nerve (CN VII) gives off the greater petrosal nerve, which synapses in the pterygopalatine ganglion to control lacrimation and nasal secretion.'
      },
      {
        id: 'ha5_q4',
        questionText: 'Which parasympathetic ganglion is located immediately inferior to the foramen ovale on the medial aspect of the mandibular nerve (CN V3)?',
        options: ['Otic ganglion', 'Ciliary ganglion', 'Submandibular ganglion', 'Pterygopalatine ganglion'],
        correctOptionIndex: 0,
        explanation: 'The otic ganglion is situated in the infratemporal fossa immediately below the foramen ovale, medial to the trunk of CN V3.'
      },
      {
        id: 'ha5_q5',
        questionText: 'What is the largest major salivary gland in the human body?',
        options: ['Parotid gland', 'Submandibular gland', 'Sublingual gland', 'Von Ebner gland'],
        correctOptionIndex: 0,
        explanation: 'The parotid gland is the largest salivary gland, producing predominantly serous saliva (accounting for ~25% of resting saliva, increasing during meals).'
      },
      {
        id: 'ha5_q6',
        questionText: 'Which salivary gland produces the highest percentage (approximately 60–70%) of total resting (unstimulated) saliva output?',
        options: ['Submandibular gland', 'Parotid gland', 'Sublingual gland', 'Minor labial glands'],
        correctOptionIndex: 0,
        explanation: 'The submandibular gland produces approximately 65–70% of resting salivary flow, secreting a mixed seromucous fluid.'
      },
      {
        id: 'ha5_q7',
        questionText: 'What is the anatomical name for the excretory duct of the submandibular salivary gland?',
        options: ["Wharton's duct", "Stensen's duct", "Rivinus ducts", "Bartholin's duct"],
        correctOptionIndex: 0,
        explanation: "Wharton's duct is the excretory duct of the submandibular gland, opening at the sublingual caruncle beneath the tongue."
      },
      {
        id: 'ha5_q8',
        questionText: 'Where do the openings of Wharton’s ducts empty into the oral cavity?',
        options: [
          'At the sublingual caruncles on each side of the lingual frenulum',
          'Opposite the maxillary second permanent molar',
          'In the palatoglossal arch',
          'On the dorsal surface of the circumvallate papillae'
        ],
        correctOptionIndex: 0,
        explanation: "Wharton's ducts terminate at the sublingual caruncles (papillae) situated bilaterally at the base of the lingual frenulum."
      },
      {
        id: 'ha5_q9',
        questionText: 'Which major structure loops around Wharton’s duct twice (lateral then inferior then medial) on the floor of the mouth?',
        options: ['Lingual nerve', 'Hypoglossal nerve', 'Facial artery', 'Glossopharyngeal nerve'],
        correctOptionIndex: 0,
        explanation: 'The lingual nerve has an intimate clinical relationship with the submandibular duct: it travels lateral, then passes underneath, and curves medial to the duct.'
      },
      {
        id: 'ha5_q10',
        questionText: 'What muscular boundary separates the oral cavity proper from the oropharynx posteriorly?',
        options: [
          'Palatoglossal arch (anterior tonsillar pillar)',
          'Palatopharyngeal arch',
          'Uvula',
          'Pterygomandibular fold'
        ],
        correctOptionIndex: 0,
        explanation: 'The palatoglossal fold (formed by the palatoglossus muscle) marks the posterior boundary of the oral cavity proper and entrance to the oropharynx.'
      },
      {
        id: 'ha5_q11',
        questionText: 'Which muscle forms the primary muscular diaphragm of the floor of the mouth?',
        options: ['Mylohyoid muscle', 'Geniohyoid muscle', 'Anterior belly of digastric', 'Hyoglossus muscle'],
        correctOptionIndex: 0,
        explanation: 'The mylohyoid muscle forms the muscular floor of the mouth (oral diaphragm), originating along the mylohyoid line of the mandible.'
      },
      {
        id: 'ha5_q12',
        questionText: 'What potentially life-threatening condition is characterized by rapidly spreading bilateral cellulitis of the submandibular, sublingual, and submental spaces?',
        options: ["Ludwig's angina", 'Vincent’s stomatitis', 'Quinsy (peritonsillar abscess)', 'Cavernous sinus thrombosis'],
        correctOptionIndex: 0,
        explanation: "Ludwig's angina is a life-threatening, rapidly progressive gangrenous cellulitis involving the submandibular and sublingual spaces, risking asphyxiation."
      },
      {
        id: 'ha5_q13',
        questionText: 'Which molar teeth root apices lie inferior to the mylohyoid line, causing periapical infections to spread directly into the submandibular space?',
        options: [
          'Mandibular second and third molars',
          'Mandibular central incisors',
          'Maxillary first molars',
          'Mandibular first premolars'
        ],
        correctOptionIndex: 0,
        explanation: 'The roots of the mandibular 2nd and 3rd molars extend inferior to the mylohyoid ridge; odontogenic infections from these teeth breach into the submandibular space.'
      },
      {
        id: 'ha5_q14',
        questionText: 'What V-shaped groove on the dorsal surface of the tongue divides it into an anterior two-thirds and a posterior one-third?',
        options: ['Sulcus terminalis', 'Median lingual sulcus', 'Foramen cecum', 'Lingual septum'],
        correctOptionIndex: 0,
        explanation: 'The sulcus terminalis is a V-shaped groove demarcating the developmental boundary between the oral (anterior 2/3) and pharyngeal (posterior 1/3) tongue.'
      },
      {
        id: 'ha5_q15',
        questionText: 'What small pit at the apex of the sulcus terminalis represents the embryonic origin site of the thyroid gland?',
        options: ['Foramen cecum', 'Incisive foramen', 'Hypophyseal pouch', 'Tonsillar crypt'],
        correctOptionIndex: 0,
        explanation: 'The foramen cecum of the tongue marks the site where the thyroglossal duct originated during embryonic descent of the thyroid gland.'
      },
      {
        id: 'ha5_q16',
        questionText: 'Which lingual papillae are arranged in an inverted "V" immediately anterior to the sulcus terminalis and contain Von Ebner serous glands?',
        options: ['Circumvallate (vallate) papillae', 'Fungiform papillae', 'Filiform papillae', 'Foliate papillae'],
        correctOptionIndex: 0,
        explanation: 'There are 8 to 12 large circumvallate papillae lined up in front of the sulcus terminalis, surrounded by a circular trench cleansed by Von Ebner glands.'
      },
      {
        id: 'ha5_q17',
        questionText: 'Which lingual papillae are the most numerous, keratinized, and contain NO taste buds (providing friction only)?',
        options: ['Filiform papillae', 'Fungiform papillae', 'Foliate papillae', 'Circumvallate papillae'],
        correctOptionIndex: 0,
        explanation: 'Filiform papillae are small, conical, keratinized projections covering the anterior dorsal tongue; they provide abrasive texture but lack taste buds.'
      },
      {
        id: 'ha5_q18',
        questionText: 'All muscles of the tongue (both intrinsic and extrinsic) are innervated by the hypoglossal nerve (CN XII), EXCEPT for which muscle?',
        options: [
          'Palatoglossus muscle (innervated by CN X via pharyngeal plexus)',
          'Genioglossus muscle',
          'Hyoglossus muscle',
          'Styloglossus muscle'
        ],
        correctOptionIndex: 0,
        explanation: 'The palatoglossus muscle is classified as a palate muscle innervated by the vagus nerve (CN X); all other tongue muscles are innervated by CN XII.'
      },
      {
        id: 'ha5_q19',
        questionText: 'Which extrinsic muscle of the tongue is the "safety muscle" that protrudes the tongue and prevents it from falling back into the airway?',
        options: ['Genioglossus muscle', 'Hyoglossus muscle', 'Styloglossus muscle', 'Palatoglossus muscle'],
        correctOptionIndex: 0,
        explanation: 'The genioglossus originates from the superior mental spine of the mandible; its bilateral contraction protrudes the tongue, maintaining airway patency.'
      },
      {
        id: 'ha5_q20',
        questionText: 'When a patient with a unilateral hypoglossal nerve (CN XII) lesion is asked to protrude their tongue, to which side does the tongue deviate?',
        options: [
          'Deviates toward the affected (paralyzed) side',
          'Deviates toward the normal (unaffected) side',
          'Remains exactly at the midline with no movement',
          'Retracts involuntarily into the pharynx'
        ],
        correctOptionIndex: 0,
        explanation: 'Due to the unopposed push of the intact contralateral genioglossus muscle, the tongue deviates toward the paralyzed (affected) side on protrusion.'
      },
      {
        id: 'ha5_q21',
        questionText: 'What structure forms the mucosal fold beneath the midline of the tongue connecting it to the floor of the mouth?',
        options: ['Lingual frenulum', 'Sublingual fold', 'Plica fimbriata', 'Palatoglossal fold'],
        correctOptionIndex: 0,
        explanation: 'The lingual frenulum is the vertical midline fold of mucous membrane extending from the floor of the mouth to the ventral surface of the tongue.'
      },
      {
        id: 'ha5_q22',
        questionText: 'What clinical condition occurs when an abnormally short, tight lingual frenulum restricts tongue mobility ("tongue-tie")?',
        options: ['Ankyloglossia', 'Macroglossia', 'Geographic tongue', 'Median rhomboid glossitis'],
        correctOptionIndex: 0,
        explanation: 'Ankyloglossia is a congenital oral anomaly where a restrictive lingual frenulum tethers the tongue tip to the floor of the mouth.'
      },
      {
        id: 'ha5_q23',
        questionText: 'What lymphoid tissue collection forms Waldeyer’s tonsillar ring protecting the entrance to the pharynx?',
        options: [
          'Pharyngeal (adenoids), tubal, palatine, and lingual tonsils',
          'Deep cervical, supraclavicular, and axillary nodes',
          'Submandibular and sublingual glands',
          'Thyroid and parathyroid glands'
        ],
        correctOptionIndex: 0,
        explanation: "Waldeyer's ring is an annular arrangement of lymphoid tissue surrounding the pharynx, consisting of pharyngeal, tubal, palatine, and lingual tonsils."
      },
      {
        id: 'ha5_q24',
        questionText: 'Which muscle of the soft palate elevates the soft palate during swallowing to close off the nasopharynx?',
        options: ['Levator veli palatini', 'Tensor veli palatini', 'Palatoglossus', 'Musculus uvulae'],
        correctOptionIndex: 0,
        explanation: 'The levator veli palatini (innervated by CN X) elevates the soft palate to prevent regurgitation of food into the nasopharynx during deglutition.'
      },
      {
        id: 'ha5_q25',
        questionText: 'Which soft palate muscle hooks around the pterygoid hamulus and is innervated by the mandibular nerve (CN V3)?',
        options: ['Tensor veli palatini', 'Levator veli palatini', 'Palatopharyngeus', 'Salpingopharyngeus'],
        correctOptionIndex: 0,
        explanation: 'The tensor veli palatini wraps around the pterygoid hamulus like a pulley to tense the soft palate and open the auditory tube; it is innervated by CN V3.'
      }
    ]
  }
];
