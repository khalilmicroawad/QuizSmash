import { Question } from '../types/quiz';

export interface MedicalTerminologySection {
  id: string;
  sectionNumber: number;
  fileName: string;
  titleEn: string;
  titleAr: string;
  range: string;
  descriptionEn: string;
  descriptionAr: string;
  questions: Question[];
}

export const MEDICAL_TERMINOLOGY_SECTIONS: MedicalTerminologySection[] = [
  {
    id: 'term-section-1',
    sectionNumber: 1,
    fileName: '1',
    titleEn: 'Section 1: Dental & Medical Roots, Prefixes & Suffixes',
    titleAr: 'القسم الأول: الجذور اللغوية والبادئات واللواحق الطبية السنية',
    range: '1-25',
    descriptionEn: 'Core morphemes, combining vowels, word roots (odont-, gingiv-, gloss-, stomat-), prefixes (endo-, peri-), and suffixes (-itis, -ectomy).',
    descriptionAr: 'المورفيمات الأساسية، حروف الربط، الجذور اللغوية للأسنان واللثة، البادئات التشريحية، واللواحق الدالة على الالتهاب والاستئصال.',
    questions: [
      {
        id: 'term1_q1',
        questionText: 'What is the Greek-derived combining form that specifically denotes "tooth"?',
        options: ['Odont/o', 'Gingiv/o', 'Stomat/o', 'Cheil/o'],
        correctOptionIndex: 0,
        explanation: 'Odont/o comes from the Greek "odous/odontos" meaning tooth (e.g. orthodontics, odontoma), while dent/o is the Latin equivalent.'
      },
      {
        id: 'term1_q2',
        questionText: 'Which combining form specifically refers to the tongue in medical terminology?',
        options: ['Gloss/o (and lingu/o)', 'Stomat/o', 'Gnath/o', 'Labio/o'],
        correctOptionIndex: 0,
        explanation: 'Gloss/o (Greek) and lingu/o (Latin) both denote the tongue (e.g. glossitis, sublingual).'
      },
      {
        id: 'term1_q3',
        questionText: 'The medical prefix "endo-" indicates:',
        options: ['Inside or within', 'Around or surrounding', 'Above or excessive', 'Below or insufficient'],
        correctOptionIndex: 0,
        explanation: 'Endo- means within or inner, as in endodontics (therapy inside the tooth pulp space).'
      },
      {
        id: 'term1_q4',
        questionText: 'Which suffix designates "inflammation" of a tissue or organ?',
        options: ['-itis', '-osis', '-oma', '-algia'],
        correctOptionIndex: 0,
        explanation: 'The suffix -itis denotes inflammation (e.g. gingivitis, pulpitis, periodontitis).'
      },
      {
        id: 'term1_q5',
        questionText: 'The combining form "gingiv/o" refers specifically to:',
        options: ['Gums (gingival tissue)', 'Lips', 'Cheeks', 'Salivary glands'],
        correctOptionIndex: 0,
        explanation: 'Gingiv/o designates the gingiva or gums surrounding the cervical portion of teeth.'
      },
      {
        id: 'term1_q6',
        questionText: 'What does the combining root "cheil/o" (or chil/o) denote?',
        options: ['Lips', 'Tongue', 'Palate', 'Jaw'],
        correctOptionIndex: 0,
        explanation: 'Cheil/o refers to the lips (e.g. cheilitis, cheiloplasty).'
      },
      {
        id: 'term1_q7',
        questionText: 'The surgical suffix "-ectomy" is defined as:',
        options: ['Surgical excision or removal', 'Surgical incision or cut', 'Surgical repair or reconstruction', 'Visual examination'],
        correctOptionIndex: 0,
        explanation: '-ectomy designates surgical removal/resection (e.g. frenectomy, gingivectomy).'
      },
      {
        id: 'term1_q8',
        questionText: 'Which combining form means "saliva" or "salivary duct"?',
        options: ['Sial/o (or ptyal/o)', 'Muco/o', 'Chondr/o', 'Buc/o'],
        correctOptionIndex: 0,
        explanation: 'Sial/o and ptyal/o both refer to saliva or salivary glands (e.g. sialolithiasis, sialadenitis).'
      },
      {
        id: 'term1_q9',
        questionText: 'The prefix "peri-" specifies:',
        options: ['Around, surrounding, or enclosing', 'Within or internal', 'Before or in front', 'Between or amid'],
        correctOptionIndex: 0,
        explanation: 'Peri- denotes around or enclosing, as in periodontium (the supporting tissues surrounding the tooth).'
      },
      {
        id: 'term1_q10',
        questionText: 'The suffix "-algia" indicates:',
        options: ['Pain', 'Tumor or mass', 'Dilation', 'Flow or discharge'],
        correctOptionIndex: 0,
        explanation: '-algia means pain (e.g. odontalgia = toothache, glossalgia = painful tongue).'
      },
      {
        id: 'term1_q11',
        questionText: 'The combining form "stomat/o" translates to:',
        options: ['Mouth or oral cavity', 'Stomach', 'Throat', 'Esophagus'],
        correctOptionIndex: 0,
        explanation: 'Stomat/o is the Greek root for mouth/oral cavity (e.g. stomatitis, stomatognathic system).'
      },
      {
        id: 'term1_q12',
        questionText: 'The prefix "retro-" designates:',
        options: ['Behind, backward, or located in the back', 'Above or superior', 'In front of or anterior', 'Surrounding'],
        correctOptionIndex: 0,
        explanation: 'Retro- denotes behind or backward, as in retromolar pad (the soft tissue pad behind the terminal molar).'
      },
      {
        id: 'term1_q13',
        questionText: 'The surgical suffix "-otomy" signifies:',
        options: ['Surgical incision or cutting into', 'Surgical removal', 'Creation of a new permanent opening', 'Fixation'],
        correctOptionIndex: 0,
        explanation: '-otomy means cutting into an organ or structure, whereas -ostomy means creating a mouth/stoma.'
      },
      {
        id: 'term1_q14',
        questionText: 'Which term combines roots to signify "pain originating in a tooth"?',
        options: ['Odontalgia', 'Odontoma', 'Odontoblast', 'Odontogenesis'],
        correctOptionIndex: 0,
        explanation: 'Odont/o (tooth) + -algia (pain) = odontalgia (toothache).'
      },
      {
        id: 'term1_q15',
        questionText: 'The root "gnath/o" in terms like "micrognathia" and "orthognathic" refers to:',
        options: ['The jaw (maxilla or mandible)', 'The lip', 'The dentin', 'The neck'],
        correctOptionIndex: 0,
        explanation: 'Gnath/o means jaw (e.g. micrognathia = abnormally small jaw; orthognathic surgery = corrective jaw surgery).'
      },
      {
        id: 'term1_q16',
        questionText: 'The suffix "-plasty" represents:',
        options: ['Surgical repair, reconstruction, or reshaping', 'Surgical destruction', 'Inflammation', 'Suture or stitching'],
        correctOptionIndex: 0,
        explanation: '-plasty indicates plastic surgery, reconstruction, or reforming (e.g. gingivoplasty, osteoplasty).'
      },
      {
        id: 'term1_q17',
        questionText: 'The prefix "hypo-" conveys:',
        options: ['Deficient, decreased, or below normal', 'Excessive, above normal', 'Fast or rapid', 'Against'],
        correctOptionIndex: 0,
        explanation: 'Hypo- denotes beneath, under, or below normal (e.g. hypodontia = congenitally missing teeth).'
      },
      {
        id: 'term1_q18',
        questionText: 'The combining form "bucc/o" relates to:',
        options: ['Cheek', 'Lips', 'Chin', 'Roof of mouth'],
        correctOptionIndex: 0,
        explanation: 'Bucc/o means cheek, and "buccal" denotes facing or relating to the cheek.'
      },
      {
        id: 'term1_q19',
        questionText: 'What does the suffix "-rrhea" specify in medical terminology?',
        options: ['Abnormal flow, discharge, or secretion', 'Pain or discomfort', 'Hardening', 'Enlargement'],
        correctOptionIndex: 0,
        explanation: '-rrhea indicates flow or copious discharge (e.g. sialorrhea = excessive salivation).'
      },
      {
        id: 'term1_q20',
        questionText: 'The prefix "ortho-" designates:',
        options: ['Straight, correct, or normal alignment', 'Bent or crooked', 'Unequal or asymmetrical', 'Opposite'],
        correctOptionIndex: 0,
        explanation: 'Ortho- means straight or correct, as in orthodontics (straightening or correcting irregular teeth).'
      },
      {
        id: 'term1_q21',
        questionText: 'The combining form "amel/o" refers to which specialized dental tissue?',
        options: ['Enamel', 'Dentin', 'Cementum', 'Dental pulp'],
        correctOptionIndex: 0,
        explanation: 'Amel/o refers to enamel (e.g. ameloblast = enamel-forming cell, amelogenesis imperfecta).'
      },
      {
        id: 'term1_q22',
        questionText: 'The suffix "-genic" indicates:',
        options: ['Producing, originating, or causing', 'Resembling or shaped like', 'Paralysis of', 'Destruction of'],
        correctOptionIndex: 0,
        explanation: '-genic means generating or caused by (e.g. cariogenic = promoting dental caries; odontogenic = arising from teeth).'
      },
      {
        id: 'term1_q23',
        questionText: 'The term "hemisection" in restorative and periodontic dentistry means:',
        options: ['Surgical separation of a multirooted tooth into two halves', 'Complete removal of the dental arch', 'Splitting the crown horizontally', 'Removing all roots leaving the crown'],
        correctOptionIndex: 0,
        explanation: 'Hemi- means half; hemisection is surgical sectioning of a mandibular molar through the furcation into two distinct halves.'
      },
      {
        id: 'term1_q24',
        questionText: 'The combining root "palat/o" or "uran/o" denotes the:',
        options: ['Palate (roof of the mouth)', 'Floor of mouth', 'Uvula', 'Tonsils'],
        correctOptionIndex: 0,
        explanation: 'Palat/o and uran/o designate the palate; uranorrhaphy is surgical repair of a cleft palate.'
      },
      {
        id: 'term1_q25',
        questionText: 'Which prefix indicates "bad, painful, difficult, or abnormal"?',
        options: ['Dys-', 'Eu-', 'Syn-', 'Iso-'],
        correctOptionIndex: 0,
        explanation: 'Dys- means difficult or abnormal (e.g. dysphagia = difficulty swallowing; dysplasia = abnormal tissue development).'
      }
    ]
  },
  {
    id: 'term-section-2',
    sectionNumber: 2,
    fileName: '2',
    titleEn: 'Section 2: Anatomical Planes, Spatial Relations & Oral Directions',
    titleAr: 'القسم الثاني: المستويات التشريحية والاتجاهات والعلاقات الفموية',
    range: '26-50',
    descriptionEn: 'Spatial coordinates, anatomical axes, tooth surfaces (mesial, distal, labial, buccal, lingual, occlusal, apical), and directional terminology.',
    descriptionAr: 'المستويات التشريحية، المحاور المكانية، أسطح الأسنان، والاتجاهات التاجية والجذرية والإطباقية.',
    questions: [
      {
        id: 'term2_q1',
        questionText: 'In dental directional terminology, "mesial" defines the surface or direction that:',
        options: ['Faces toward the dental midline along the arch curvature', 'Faces away from the midline along the arch', 'Faces the cheek', 'Faces the tongue'],
        correctOptionIndex: 0,
        explanation: 'Mesial denotes toward the median line along the dental arch contour.'
      },
      {
        id: 'term2_q2',
        questionText: 'The term "distal" in dental anatomy denotes orientation:',
        options: ['Away from the median line along the curvature of the dental arch', 'Toward the dental midline', 'Toward the tongue', 'Toward the biting edge'],
        correctOptionIndex: 0,
        explanation: 'Distal indicates away from the dental arch midline (posterior relative to tooth contour).'
      },
      {
        id: 'term2_q3',
        questionText: 'Which tooth surface faces towards the lips on incisors and canines?',
        options: ['Labial surface', 'Buccal surface', 'Lingual surface', 'Occlusal surface'],
        correctOptionIndex: 0,
        explanation: 'Labial (from labium = lip) is the facial surface of anterior teeth facing the lips.'
      },
      {
        id: 'term2_q4',
        questionText: 'Which tooth surface faces the cheeks on premolars and molars?',
        options: ['Buccal surface', 'Labial surface', 'Palatal surface', 'Incisal surface'],
        correctOptionIndex: 0,
        explanation: 'Buccal (from bucca = cheek) designates the facial surface of posterior teeth facing the cheek mucosa.'
      },
      {
        id: 'term2_q5',
        questionText: 'The broad term "facial surface" encompasses both:',
        options: ['Labial and buccal surfaces', 'Mesial and distal surfaces', 'Incisal and occlusal surfaces', 'Lingual and palatal surfaces'],
        correctOptionIndex: 0,
        explanation: 'Facial refers collectively to outer surfaces facing the lips (labial) and cheeks (buccal).'
      },
      {
        id: 'term2_q6',
        questionText: 'The surface of an anterior tooth that performs the biting or cutting action is termed the:',
        options: ['Incisal ridge or edge', 'Occlusal surface', 'Cervical line', 'Proximal contact'],
        correctOptionIndex: 0,
        explanation: 'Incisal designates the cutting edge of anterior teeth (incisors and canine cusp tip).'
      },
      {
        id: 'term2_q7',
        questionText: 'The masticatory chewing surface of posterior teeth (premolars and molars) is called the:',
        options: ['Occlusal surface', 'Incisal edge', 'Apical foramen', 'Gingival margin'],
        correctOptionIndex: 0,
        explanation: 'Occlusal refers to the grinding and chewing surface of posterior dentition.'
      },
      {
        id: 'term2_q8',
        questionText: 'In the maxillary arch, the inner surface facing the roof of the mouth is most accurately termed the:',
        options: ['Palatal surface', 'Buccal surface', 'Labial surface', 'Facial surface'],
        correctOptionIndex: 0,
        explanation: 'Palatal denotes facing the hard or soft palate in the maxillary dental arch.'
      },
      {
        id: 'term2_q9',
        questionText: 'In the mandibular arch, the inner surface facing towards the tongue is termed the:',
        options: ['Lingual surface', 'Palatal surface', 'Vestibular surface', 'Labial surface'],
        correctOptionIndex: 0,
        explanation: 'Lingual denotes facing the tongue inside the mandibular arch.'
      },
      {
        id: 'term2_q10',
        questionText: 'Which anatomical plane divides the human body into symmetrical right and left halves?',
        options: ['Midsagittal (median) plane', 'Coronal (frontal) plane', 'Transverse (horizontal) plane', 'Oblique plane'],
        correctOptionIndex: 0,
        explanation: 'The midsagittal plane bisects the body longitudinally into equal right and left antimeres.'
      },
      {
        id: 'term2_q11',
        questionText: 'The coronal (frontal) plane divides the body into:',
        options: ['Anterior (ventral) and posterior (dorsal) parts', 'Right and left halves', 'Superior (cranial) and inferior (caudal) parts', 'Medial and lateral segments'],
        correctOptionIndex: 0,
        explanation: 'A coronal or frontal plane divides anatomical structures into front (anterior) and back (posterior) components.'
      },
      {
        id: 'term2_q12',
        questionText: 'The horizontal (transverse or axial) plane separates the body into:',
        options: ['Superior (upper) and inferior (lower) portions', 'Anterior and posterior portions', 'Right and left sides', 'Inner and outer portions'],
        correctOptionIndex: 0,
        explanation: 'A horizontal (axial) plane cuts perpendicular to the long axis, dividing into superior and inferior segments.'
      },
      {
        id: 'term2_q13',
        questionText: 'The direction "apical" signifies towards the:',
        options: ['Tip of the tooth root (apex)', 'Crown of the tooth', 'Cheek', 'Dental midline'],
        correctOptionIndex: 0,
        explanation: 'Apical means directed toward the root apex or terminal root tip.'
      },
      {
        id: 'term2_q14',
        questionText: 'The direction "coronal" signifies towards the:',
        options: ['Crown of the tooth', 'Root apex', 'Tongue', 'Alveolar bone crest'],
        correctOptionIndex: 0,
        explanation: 'Coronal denotes directed toward the anatomic or clinical crown.'
      },
      {
        id: 'term2_q15',
        questionText: 'The surfaces of adjacent teeth that face each other within the same dental arch are collectively termed:',
        options: ['Proximal surfaces (mesial and distal)', 'Occlusal surfaces', 'Facial surfaces', 'Axial walls'],
        correctOptionIndex: 0,
        explanation: 'Proximal surfaces are adjacent surfaces: mesial of one tooth facing the distal of the adjacent tooth.'
      },
      {
        id: 'term2_q16',
        questionText: 'In directional terminology, "anterior" (or ventral in bipeds) means:',
        options: ['Situated toward the front of the body', 'Situated toward the back', 'Farther from the head', 'Closer to the midline'],
        correctOptionIndex: 0,
        explanation: 'Anterior indicates situated in front or facing forward.'
      },
      {
        id: 'term2_q17',
        questionText: 'The term "posterior" indicates:',
        options: ['Situated toward the back of the body', 'Situated near the front', 'Closer to the midline', 'Facing the midline'],
        correctOptionIndex: 0,
        explanation: 'Posterior indicates toward the rear or dorsal aspect of the body.'
      },
      {
        id: 'term2_q18',
        questionText: 'What does "ipsilateral" describe in anatomical and clinical relations?',
        options: ['Located on the same side of the body', 'Located on the opposite side of the body', 'Located across the midline', 'Located deep beneath the skin'],
        correctOptionIndex: 0,
        explanation: 'Ipsilateral denotes on the same side; contralateral designates on the opposite side.'
      },
      {
        id: 'term2_q19',
        questionText: 'The term "contralateral" specifies a structure located on:',
        options: ['The opposite side of the body', 'The same side of the body', 'Both sides simultaneously', 'Neither side'],
        correctOptionIndex: 0,
        explanation: 'Contralateral denotes on the opposite side relative to a reference point or lesion.'
      },
      {
        id: 'term2_q20',
        questionText: 'The term "bilateral" indicates:',
        options: ['Present on or affecting both sides of the body', 'Affecting only one side', 'Confined to the anterior midline', 'Submerged beneath tissue'],
        correctOptionIndex: 0,
        explanation: 'Bilateral means pertaining to or occurring on both right and left sides.'
      },
      {
        id: 'term2_q21',
        questionText: 'A "line angle" on a tooth crown is formed by the junction of:',
        options: ['Two crown surfaces', 'Three crown surfaces', 'Four crown surfaces', 'The crown and the root'],
        correctOptionIndex: 0,
        explanation: 'A line angle is formed by the junction of two crown surfaces (e.g. mesiobuccal line angle).'
      },
      {
        id: 'term2_q22',
        questionText: 'A "point angle" on a tooth crown is formed by the junction of:',
        options: ['Three crown surfaces', 'Two crown surfaces', 'One surface and a margin', 'All axial surfaces'],
        correctOptionIndex: 0,
        explanation: 'A point angle is formed where three surfaces intersect at a point (e.g. mesio-occluso-buccal point angle).'
      },
      {
        id: 'term2_q23',
        questionText: 'The term "cervical" in tooth topography designates the zone:',
        options: ['Near the cementoenamel junction (neck of the tooth)', 'At the incisal tip', 'Deep inside the pulp chamber', 'At the bottom of the alveolar socket'],
        correctOptionIndex: 0,
        explanation: 'Cervical (from cervix = neck) refers to the neck of the tooth at or near the CEJ.'
      },
      {
        id: 'term2_q24',
        questionText: 'What is an "embrasure" in dental anatomy?',
        options: ['The V-shaped spillway space radiating outward from adjacent tooth contact points', 'The highest point on a cusp', 'The groove separating developmental lobes', 'The deep pit on a molar surface'],
        correctOptionIndex: 0,
        explanation: 'Embrasures are triangular spillway spaces expanding facial, lingual, occlusal, or gingival from proximal contact areas.'
      },
      {
        id: 'term2_q25',
        questionText: 'In describing relations of depth, "superficial" means:',
        options: ['Closer to the surface of the body', 'Farther away from the surface', 'Closer to the feet', 'Closer to the spinal cord'],
        correctOptionIndex: 0,
        explanation: 'Superficial indicates near or on the surface, while deep (profundus) indicates farther inward.'
      }
    ]
  },
  {
    id: 'term-section-3',
    sectionNumber: 3,
    fileName: '3',
    titleEn: 'Section 3: Oral Pathology & Clinical Conditions Terminology',
    titleAr: 'القسم الثالث: مصطلحات أمراض وتشخيص الفم والأسنان',
    range: '51-75',
    descriptionEn: 'Clinical pathology terms, pulpal and periapical diseases, mucosal lesions, salivary gland disorders, and occlusal anomalies.',
    descriptionAr: 'مصطلحات الأمراض الفموية، آفات اللب وما حول الذروة، أمراض الأغشية المخاطية والغدد اللعابية، واعتلالات الإطباق.',
    questions: [
      {
        id: 'term3_q1',
        questionText: 'The clinical term "xerostomia" is defined as:',
        options: ['Subjective perception of dry mouth due to reduced salivary flow', 'Excessive production and flow of saliva', 'Inflammation of the parotid gland', 'Loss of taste sensation on the tongue'],
        correctOptionIndex: 0,
        explanation: 'Xerostomia (from xeros = dry + stoma = mouth) indicates dry mouth, commonly caused by medications, radiation, or Sjogren syndrome.'
      },
      {
        id: 'term3_q2',
        questionText: 'What is "bruxism"?',
        options: ['Involuntary nonfunctional clenching or grinding of teeth', 'Difficulty opening the mouth due to spasm', 'Permanent discoloration of enamel', 'Congenitally small teeth'],
        correctOptionIndex: 0,
        explanation: 'Bruxism is the parafunctional habit of grinding, gnashing, or clenching the teeth during sleep or wakefulness.'
      },
      {
        id: 'term3_q3',
        questionText: 'The term "trismus" specifically refers to:',
        options: ['Limited mouth opening caused by spasm of the masticatory muscles', 'Dislocation of the TMJ condyle', 'Clicking sound in the TMJ during opening', 'Inability to fully close the jaw'],
        correctOptionIndex: 0,
        explanation: 'Trismus (lockjaw) is restricted jaw opening secondary to spasm or inflammation of masticatory muscles.'
      },
      {
        id: 'term3_q4',
        questionText: '"Dental caries" is accurately described as:',
        options: ['Microbially induced localized demineralization of hard dental tissues caused by bacterial acid', 'Mechanical wear from tooth-to-tooth contact', 'Chemical dissolution by non-bacterial acids', 'Genetic defect in enamel matrix proteins'],
        correctOptionIndex: 0,
        explanation: 'Dental caries is an infectious, bio-film-mediated demineralization of enamel, dentin, and cementum by organic acids.'
      },
      {
        id: 'term3_q5',
        questionText: 'What is "pulpitis"?',
        options: ['Inflammation of the vascularized dental pulp tissue', 'Necrosis of the periodontal ligament', 'Resorption of alveolar bone', 'Loss of cementum at the apex'],
        correctOptionIndex: 0,
        explanation: 'Pulpitis is inflammation of the dental pulp, commonly elicited by caries, trauma, or chemical irritation.'
      },
      {
        id: 'term3_q6',
        questionText: 'A condition of "reversible pulpitis" is clinically characterized by:',
        options: ['Transient sharp pain relieved immediately upon stimulus removal', 'Spontaneous lingering nocturnal pain without stimulus', 'Complete absence of pulpal neural response', 'Presence of periapical radiolucency on X-ray'],
        correctOptionIndex: 0,
        explanation: 'Reversible pulpitis displays transient, non-lingering pain evoked by cold or sweet that ceases when the stimulus is removed.'
      },
      {
        id: 'term3_q7',
        questionText: 'The clinical term "attrition" refers to the loss of tooth structure caused by:',
        options: ['Mechanical wear resulting directly from tooth-to-tooth friction', 'Mechanical wear from foreign objects (e.g. toothbrush)', 'Chemical dissolution by dietary or gastric acids', 'Microfractures due to occlusal bending flexure'],
        correctOptionIndex: 0,
        explanation: 'Attrition is physiological or pathological wear of incisal/occlusal surfaces caused by opposing tooth-to-tooth contact.'
      },
      {
        id: 'term3_q8',
        questionText: 'The term "abrasion" in oral medicine denotes tooth wear caused by:',
        options: ['Friction between teeth and exogenous foreign abrasive objects', 'Tooth-to-tooth contact', 'Acid dissolution without bacteria', 'Bacterial fermentation of sucrose'],
        correctOptionIndex: 0,
        explanation: 'Abrasion is abnormal mechanical wear from foreign abrasive agents, such as hard toothbrush bristles or pipe stems.'
      },
      {
        id: 'term3_q9',
        questionText: 'The clinical term "erosion" (or perimylolysis) is defined as loss of tooth structure due to:',
        options: ['Chemical dissolution by acids of non-bacterial origin', 'Bacterial plaque acid production', 'Toothpaste abrasives', 'Heavy masticatory forces'],
        correctOptionIndex: 0,
        explanation: 'Erosion is progressive, non-bacterial chemical loss of dental hard tissues through extrinsic acids (citrus, soda) or intrinsic acid (GERD, vomiting).'
      },
      {
        id: 'term3_q10',
        questionText: 'What does "abfraction" specify?',
        options: ['Wedge-shaped cervical defects caused by biomechanical occlusal loading and tooth flexure', 'Wear from rough chewing food', 'Acid reflux dissolving palatal enamel', 'Bacterial destruction at the gumline'],
        correctOptionIndex: 0,
        explanation: 'Abfraction denotes wedge-shaped microstructural loss of enamel and dentin at the cervical margin due to tensile and compressive forces during flexure.'
      },
      {
        id: 'term3_q11',
        questionText: 'The clinical diagnosis "leukoplakia" is defined by the WHO as:',
        options: ['A white mucosal patch or plaque that cannot be wiped off and cannot be characterized as any other disease', 'A red velvety patch with high malignant potential', 'A candidal fungal infection that scrapes off', 'A benign aphthous ulcer'],
        correctOptionIndex: 0,
        explanation: 'Leukoplakia is a strictly clinical term for a non-scrapable white lesion of oral mucosa that cannot be defined clinically or histologically as any other condition.'
      },
      {
        id: 'term3_q12',
        questionText: 'The oral mucosal condition characterized by a bright red velvety patch is called:',
        options: ['Erythroplakia', 'Leukoplakia', 'Lichen planus', 'Geographic tongue'],
        correctOptionIndex: 0,
        explanation: 'Erythroplakia is a red lesion with velvety appearance, possessing a significantly higher malignant transformation rate than leukoplakia.'
      },
      {
        id: 'term3_q13',
        questionText: 'What is a "sialolith"?',
        options: ['A calcified calculus or stone formed within a salivary gland or its excretory duct', 'A bacterial infection of the parotid gland', 'A benign salivary gland tumor', 'A retention cyst of minor salivary glands'],
        correctOptionIndex: 0,
        explanation: 'A sialolith (from sialo = saliva + lithos = stone) is a calcareous concretion that can obstruct salivary flow (most common in Wharton duct).'
      },
      {
        id: 'term3_q14',
        questionText: 'The presence of congenitally missing teeth (one to five teeth excluded third molars) is termed:',
        options: ['Hypodontia', 'Oligodontia', 'Anodontia', 'Hyperdontia'],
        correctOptionIndex: 0,
        explanation: 'Hypodontia is congenital absence of 1–5 teeth; oligodontia is absence of 6 or more teeth; anodontia is total absence.'
      },
      {
        id: 'term3_q15',
        questionText: 'Supernumerary (extra) teeth beyond the normal dentition count is referred to as:',
        options: ['Hyperdontia', 'Hypodontia', 'Microdontia', 'Taurodontism'],
        correctOptionIndex: 0,
        explanation: 'Hyperdontia denotes extra teeth beyond the normal complement (e.g. mesiodens at the maxillary midline).'
      },
      {
        id: 'term3_q16',
        questionText: 'The developmental anomaly where teeth are abnormally larger than normal is called:',
        options: ['Macrodontia', 'Microdontia', 'Dilaceration', 'Concrescence'],
        correctOptionIndex: 0,
        explanation: 'Macrodontia (from macro = large + odont = tooth) denotes abnormally enlarged teeth.'
      },
      {
        id: 'term3_q17',
        questionText: 'What is "dilaceration" in dental terminology?',
        options: ['An abnormal sharp bend or curve in the root or crown of a tooth', 'Fusion of two tooth germs by dentin', 'Union of two roots by cementum only', 'Elongation of the pulp chamber with low furcation'],
        correctOptionIndex: 0,
        explanation: 'Dilaceration is an angulation, sharp bend, or curvature in the root or crown of a developed tooth usually secondary to trauma.'
      },
      {
        id: 'term3_q18',
        questionText: 'The developmental anomaly where a single tooth germ attempts to divide, resulting in a bifid crown with one root and one pulp canal, is:',
        options: ['Geminatio (gemination)', 'Fusion', 'Concrescence', 'Dens evaginatus'],
        correctOptionIndex: 0,
        explanation: 'Gemination (twinning) is a single tooth bud attempting to split; tooth count remains normal when counting the bifid tooth as one.'
      },
      {
        id: 'term3_q19',
        questionText: 'The developmental anomaly where two separate adjacent tooth germs unite by dentin is known as:',
        options: ['Fusion', 'Gemination', 'Concrescence', 'Dens in dente'],
        correctOptionIndex: 0,
        explanation: 'Fusion involves union of two separate tooth buds; the clinical tooth count is reduced by one unless fusing with a supernumerary tooth.'
      },
      {
        id: 'term3_q20',
        questionText: 'What is "periodontitis"?',
        options: ['Inflammatory disease of the supporting tissues of the teeth with loss of periodontal ligament and alveolar bone', 'Reversible inflammation confined to the gingiva without bone loss', 'Non-inflammatory wear of teeth', 'Cyst at the root apex'],
        correctOptionIndex: 0,
        explanation: 'Periodontitis is chronic inflammation extending into deeper periodontium, resulting in clinical attachment loss and alveolar bone resorption.'
      },
      {
        id: 'term3_q21',
        questionText: 'The term "periapical abscess" denotes:',
        options: ['An acute or chronic localized collection of pus at the root apex secondary to pulpal necrosis', 'A cyst inside the maxillary sinus', 'Infection confined to the marginal gingiva', 'Inflammation around an erupting crown'],
        correctOptionIndex: 0,
        explanation: 'A periapical abscess is a purulent exudate at the root apex arising from an untreated necrotic dental pulp.'
      },
      {
        id: 'term3_q22',
        questionText: 'The clinical term "pericoronitis" specifically describes inflammation of:',
        options: ['The soft tissue (operculum) surrounding the crown of a partially erupted tooth', 'The gingival sulcus around all premolars', 'The pulp of a fractured incisor', 'The periodontal ligament at the apical foramen'],
        correctOptionIndex: 0,
        explanation: 'Pericoronitis is acute inflammation of the gingival flap overlying a partially erupted tooth (most common on mandibular third molars).'
      },
      {
        id: 'term3_q23',
        questionText: 'The medical term "halitosis" refers to:',
        options: ['Unpleasant or foul breath odor', 'Loss of taste perception', 'Difficulty chewing food', 'Excessive flow of saliva'],
        correctOptionIndex: 0,
        explanation: 'Halitosis (oral malodor) is foul breath, predominantly caused by volatile sulfur compounds produced by oral anaerobic bacteria.'
      },
      {
        id: 'term3_q24',
        questionText: 'What is a "fistula" (or parulis / sinus tract) in dental pathology?',
        options: ['An abnormal channel leading from a suppurative periapical infection to the oral mucosal surface', 'A stone blocking a salivary gland', 'A benign bony outgrowth on the palate', 'A cleft in the secondary palate'],
        correctOptionIndex: 0,
        explanation: 'A sinus tract (gum boil / parulis) drains pus from a chronic periapical abscess onto the oral mucosa.'
      },
      {
        id: 'term3_q25',
        questionText: 'What is "paresthesia"?',
        options: ['An abnormal neurological sensation such as numbness, tingling, or burning without objective stimulus', 'Complete paralysis of facial muscles', 'Spontaneous muscle twitching', 'Heightened sensitivity to pain'],
        correctOptionIndex: 0,
        explanation: 'Paresthesia is altered sensation (numbness, "pins and needles") often resulting from nerve trauma (e.g. inferior alveolar nerve damage).'
      }
    ]
  },
  {
    id: 'term-section-4',
    sectionNumber: 4,
    fileName: '4',
    titleEn: 'Section 4: Operative, Endodontic, Prosthetic & Surgical Terminology',
    titleAr: 'القسم الرابع: مصطلحات المعالجة اللبية والتعويضات وجراحة الفم',
    range: '76-100',
    descriptionEn: 'Clinical procedural terms, restorative cavity classifications, endodontic obturation, prosthodontics (abutments, pontics), and exodontia.',
    descriptionAr: 'مصطلحات المعالجة اللبية، حشو القنوات، تصنيفات الحفر السنية، التعويضات الثابتة والمتحركة، وجراحة القلع.',
    questions: [
      {
        id: 'term4_q1',
        questionText: 'The clinical term "prophylaxis" (dental cleaning) denotes:',
        options: ['Preventive scaling and polishing of teeth to prevent periodontal disease and caries', 'Surgical resection of bone', 'Extraction of impacted third molars', 'Placement of an indirect restoration'],
        correctOptionIndex: 0,
        explanation: 'Oral prophylaxis is the preventive removal of plaque, calculus, and stains from coronal and root surfaces.'
      },
      {
        id: 'term4_q2',
        questionText: 'What is "obturation" in endodontic therapy?',
        options: ['The complete, three-dimensional filling and hermetic sealing of a prepared root canal system', 'The removal of coronal pulp with a round bur', 'The chemical disinfection of canals with sodium hypochlorite', 'The surgical amputation of an infected root apex'],
        correctOptionIndex: 0,
        explanation: 'Obturation is sealing the debrided root canal space, most commonly using gutta-percha and an endodontic sealer.'
      },
      {
        id: 'term4_q3',
        questionText: 'The surgical procedure "apicoectomy" (periradicular surgery) consists of:',
        options: ['Surgical resection of the root tip followed by root-end cavity preparation and retrograde filling', 'Total extraction of the tooth and socket curettage', 'Splitting a multirooted tooth into two halves', 'Removal of coronal pulp tissue only'],
        correctOptionIndex: 0,
        explanation: 'An apicoectomy is surgical excision of the apical 3 mm of a root to eliminate persistent periapical pathosis.'
      },
      {
        id: 'term4_q4',
        questionText: 'In fixed prosthodontics, an "abutment" is defined as:',
        options: ['A natural tooth or dental implant serving to support, anchor, and retain a bridge or prosthesis', 'The artificial tooth suspended in the edentulous space', 'The metal framework of a removable denture', 'The cement used to bond crowns'],
        correctOptionIndex: 0,
        explanation: 'An abutment is the prepared tooth or implant that anchors and supports a fixed partial denture (bridge).'
      },
      {
        id: 'term4_q5',
        questionText: 'In a fixed partial denture (bridge), the "pontic" is:',
        options: ['The artificial tooth that replaces a missing natural tooth in the edentulous span', 'The retainer crown cemented on the natural tooth', 'The connector connecting the retainers', 'The post cemented inside the root canal'],
        correctOptionIndex: 0,
        explanation: 'A pontic is the suspended prosthetic tooth replacing the missing natural tooth.'
      },
      {
        id: 'term4_q6',
        questionText: 'What is an "inlay" restoration?',
        options: ['An indirect restoration that fits within the anatomical contours of a tooth without covering any cusps', 'An indirect restoration that covers one or more cusps', 'A complete 360-degree extracoronal coverage cap', 'A thin shell bonded to the facial surface of an anterior tooth'],
        correctOptionIndex: 0,
        explanation: 'An inlay is an intracoronal restoration cemented inside the tooth prep that does not replace or cap any cusp tips.'
      },
      {
        id: 'term4_q7',
        questionText: 'An "onlay" restoration is distinguished by:',
        options: ['Covering and restoring one or more cusps of a posterior tooth', 'Fitting solely between cusps without capping them', 'Restoring only the root surface', 'Covering the entire anatomical crown completely'],
        correctOptionIndex: 0,
        explanation: 'An onlay is an extracoronal/intracoronal restoration that overlays, restores, and protects one or more cusp tips.'
      },
      {
        id: 'term4_q8',
        questionText: 'The term "veneer" in cosmetic and restorative dentistry designates:',
        options: ['A thin layer of porcelain or composite bonded directly to the facial surface of an anterior tooth', 'A metallic full cast crown on a molar', 'A titanium screw embedded in bone', 'A provisional acrylic crown'],
        correctOptionIndex: 0,
        explanation: 'A dental veneer is a custom-fabricated thin shell bonded to the facial enamel surface to improve esthetics or form.'
      },
      {
        id: 'term4_q9',
        questionText: 'What is "pulpotomy"?',
        options: ['Surgical removal of the coronal pulp tissue leaving the radicular pulp intact', 'Complete extirpation of both coronal and radicular pulp', 'Opening the pulp chamber for drainage without removing tissue', 'Surgical excision of the root apex'],
        correctOptionIndex: 0,
        explanation: 'A pulpotomy removes only the inflamed coronal portion of the pulp, preserving vitality of the radicular pulp (common in primary teeth).'
      },
      {
        id: 'term4_q10',
        questionText: 'What is "pulpectomy"?',
        options: ['Complete surgical extirpation and removal of the entire pulp tissue from both crown and root canals', 'Partial removal of the pulp horn', 'Placement of a sedative dressing over an exposed pulp', 'Surgical curettage of a periapical cyst'],
        correctOptionIndex: 0,
        explanation: 'A pulpectomy is complete removal of all pulp tissue from coronal chamber and root canals prior to root canal filling.'
      },
      {
        id: 'term4_q11',
        questionText: 'Under G.V. Black cavity classification, Class I cavities are located on:',
        options: ['Pits and fissures of occlusal surfaces of posterior teeth and lingual pits of anterior teeth', 'Proximal surfaces of premolars and molars', 'Proximal surfaces of anterior teeth not involving the incisal edge', 'Gingival third of facial or lingual surfaces'],
        correctOptionIndex: 0,
        explanation: 'Class I encompasses pit and fissure caries on occlusal surfaces of premolars and molars, occlusal two-thirds of facial/lingual surfaces, and lingual pits of maxillary incisors.'
      },
      {
        id: 'term4_q12',
        questionText: 'According to G.V. Black classification, Class II cavities affect:',
        options: ['Proximal surfaces of posterior teeth (premolars and molars)', 'Incisal edges of anterior teeth', 'Pits and fissures of all teeth', 'Cervical margins of anterior teeth'],
        correctOptionIndex: 0,
        explanation: 'Class II lesions occur on the proximal surfaces (mesial/distal) of premolars and molars.'
      },
      {
        id: 'term4_q13',
        questionText: 'In G.V. Black classification, Class III cavities are found on:',
        options: ['Proximal surfaces of anterior teeth that DO NOT involve the incisal angle', 'Proximal surfaces of anterior teeth involving the incisal angle', 'Proximal surfaces of posterior teeth', 'Incisal edges only'],
        correctOptionIndex: 0,
        explanation: 'Class III involves proximal surfaces of incisors and canines without involving or requiring restoration of the incisal angle.'
      },
      {
        id: 'term4_q14',
        questionText: 'In G.V. Black classification, Class IV cavities are characterized by:',
        options: ['Proximal surfaces of anterior teeth that DO involve the incisal angle', 'Pits and fissures of molars', 'Cervical thirds of all teeth', 'Cusp tips of posterior teeth'],
        correctOptionIndex: 0,
        explanation: 'Class IV lesions involve the proximal surface and incisal angle of anterior teeth (often caused by trauma or extensive caries).'
      },
      {
        id: 'term4_q15',
        questionText: 'Class V cavities in G.V. Black system develop on the:',
        options: ['Gingival (cervical) third of the facial or lingual surfaces of all teeth', 'Incisal edges and cusp tips', 'Proximal surfaces of molars', 'Occlusal grooves of premolars'],
        correctOptionIndex: 0,
        explanation: 'Class V cavities occur on the gingival (cervical) third of facial or lingual surfaces of any tooth.'
      },
      {
        id: 'term4_q16',
        questionText: 'What is Class VI in the expanded G.V. Black classification?',
        options: ['Cavities on cusp tips of posterior teeth or incisal edges of anterior teeth', 'Cavities in deep periodontal pockets', 'Cavities around existing amalgam margins', 'Root surface caries'],
        correctOptionIndex: 0,
        explanation: 'Class VI lesions occur on cusp tips of posterior teeth or incisal edges of anterior teeth (without involving proximal surfaces).'
      },
      {
        id: 'term4_q17',
        questionText: 'The clinical term "exodontia" designates:',
        options: ['The branch of dentistry concerned with tooth extraction', 'The orthodontic treatment of rotated teeth', 'The placement of titanium implants', 'The surgical repositioning of the mandible'],
        correctOptionIndex: 0,
        explanation: 'Exodontia is the extraction or surgical removal of teeth from the alveolar socket.'
      },
      {
        id: 'term4_q18',
        questionText: 'What is an "alveoloplasty"?',
        options: ['Surgical contouring and smoothing of the alveolar bone ridge following tooth extractions', 'Incision into the maxillary sinus', 'Bone grafting into an empty socket', 'Resection of the inferior alveolar nerve'],
        correctOptionIndex: 0,
        explanation: 'Alveoloplasty is surgical recontouring and smoothing of alveolar ridges prior to denture fabrication or after traumatic extractions.'
      },
      {
        id: 'term4_q19',
        questionText: 'What is a "frenectomy"?',
        options: ['Surgical excision or detachment of an abnormally restrictive labial or lingual frenum', 'Surgical removal of an impacted canine', 'Incision of the parotid duct', 'Excision of the palatine tonsil'],
        correctOptionIndex: 0,
        explanation: 'Frenectomy is the surgical removal of a frenum, performed for ankyloglossia (tongue-tie) or maxillary diastema caused by high frenal attachment.'
      },
      {
        id: 'term4_q20',
        questionText: 'What does "luxation" of a tooth indicate following trauma?',
        options: ['Displacement of a tooth from its normal alveolar socket position caused by traumatic injury', 'Complete fracture of the crown at the enamel-dentin junction', 'Caries extending subgingivally', 'Abnormal resorption of alveolar crest bone'],
        correctOptionIndex: 0,
        explanation: 'Luxation is traumatic displacement of a tooth (intrusive, extrusive, lateral, or subluxation).'
      },
      {
        id: 'term4_q21',
        questionText: 'What is "avulsion" (exarticulation) of a tooth?',
        options: ['Complete displacement of a tooth entirely out of its alveolar socket', 'A hairline fracture confined to enamel', 'Loosening of a tooth without displacement', 'A tooth impacted inside the maxillary sinus'],
        correctOptionIndex: 0,
        explanation: 'Avulsion is the complete traumatic ejection and separation of a tooth out of its alveolar socket.'
      },
      {
        id: 'term4_q22',
        questionText: 'The process of "etching" in adhesive dentistry uses what chemical agent to create micromechanical retention on enamel?',
        options: ['Phosphoric acid (typically 35%–37%)', 'Hydrofluoric acid (9%)', 'Sodium hypochlorite (5%)', 'Citric acid (10%)'],
        correctOptionIndex: 0,
        explanation: 'Phosphoric acid (35%–37%) dissolves enamel prism cores or boundaries, creating microscopic microporosities for resin tag micromechanical bonding.'
      },
      {
        id: 'term4_q23',
        questionText: 'In oral radiology, what is a "radiolucency"?',
        options: ['A dark or black area on a radiograph denoting structures that permit high passage of X-ray photons (e.g. pulp, cysts, bone loss)', 'A white or bright area on a radiograph denoting dense structures that absorb X-rays', 'A distorted blurry image due to motion', 'An artifact caused by static electricity'],
        correctOptionIndex: 0,
        explanation: 'Radiolucent structures are less dense and allow X-rays to pass through, appearing dark/black on radiographs.'
      },
      {
        id: 'term4_q24',
        questionText: 'In oral radiology, what is a "radiopacity"?',
        options: ['A light, white, or opaque area on a radiograph denoting dense structures that absorb X-ray photons (e.g. enamel, amalgam, bone)', 'A black shadow denoting an infection', 'The dark pulp canal space', 'The periodontal ligament space'],
        correctOptionIndex: 0,
        explanation: 'Radiopaque structures are dense and absorb or attenuate X-rays, appearing white or bright gray on radiographs.'
      },
      {
        id: 'term4_q25',
        questionText: 'What is a "dental curettage" in periodontal therapy?',
        options: ['Scraping and debridement of the diseased soft-tissue wall of a periodontal pocket', 'Excising the crown of a tooth', 'Smoothing the biting surface with a stone', 'Smoothing of root cementum using ultrasonic scalers'],
        correctOptionIndex: 0,
        explanation: 'Gingival curettage is the surgical debridement of the inner soft tissue lining of a periodontal pocket to remove granulation tissue and ulcerated pocket epithelium.'
      }
    ]
  }
];
