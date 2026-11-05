import { Question } from '../types/quiz';

export interface MedicalBiologySection {
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

export const MEDICAL_BIOLOGY_SECTIONS: MedicalBiologySection[] = [
  {
    id: 'mb-section-1',
    sectionNumber: 1,
    fileName: '1.docx',
    titleEn: 'Section 1: Cell Biology & Membrane Dynamics',
    titleAr: 'القسم الأول: بيولوجيا الخلية والغشاء الخلوي',
    range: '1-25',
    descriptionEn: 'Cellular ultrastructure, plasma membrane fluid mosaic model, active/passive transport, endocytosis, and organelles.',
    descriptionAr: 'التركيب الدقيق للخلية، الغشاء البلازمي، النقل النشط والسلبي، والجسيمات الخلوية.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedBiology&preview=1.docx',
    questions: [
      {
        id: 'mb1_q1',
        questionText: 'Which organelle is the primary site of ATP synthesis through oxidative phosphorylation?',
        options: ['Mitochondria', 'Golgi apparatus', 'Lysosome', 'Peroxisome'],
        correctOptionIndex: 0,
        explanation: 'Mitochondria are the powerhouses of the cell, generating ATP via the electron transport chain and oxidative phosphorylation.'
      },
      {
        id: 'mb1_q2',
        questionText: 'What is the principal lipid constituent that forms the lipid bilayer matrix of eukaryotic cell membranes?',
        options: ['Phospholipids', 'Triglycerides', 'Cholesterol esters', 'Sphingomyelin only'],
        correctOptionIndex: 0,
        explanation: 'Phospholipids are amphipathic molecules with hydrophilic heads and hydrophobic tails that spontaneously arrange into a bilayer.'
      },
      {
        id: 'mb1_q3',
        questionText: 'Movement of solute molecules across a biological membrane against their electrochemical gradient requires:',
        options: ['Primary or secondary active transport requiring energy', 'Simple diffusion', 'Facilitated diffusion through aquaporins', 'Osmosis'],
        correctOptionIndex: 0,
        explanation: 'Active transport moves substances uphill against their electrochemical gradient and strictly requires metabolic energy (ATP or ion gradient).'
      },
      {
        id: 'mb1_q4',
        questionText: 'Which cellular structure is directly responsible for modifying, sorting, and packaging proteins destined for secretion?',
        options: ['Golgi apparatus', 'Rough endoplasmic reticulum', 'Free ribosomes', 'Centrioles'],
        correctOptionIndex: 0,
        explanation: 'The Golgi apparatus receives proteins from the RER, modifies them via glycosylation, and sorts them into secretory vesicles.'
      },
      {
        id: 'mb1_q5',
        questionText: 'Which organelle contains acid hydrolase enzymes responsible for intracellular degradation of macromolecules?',
        options: ['Lysosomes', 'Ribosomes', 'Centrosomes', 'Microtubules'],
        correctOptionIndex: 0,
        explanation: 'Lysosomes maintain an acidic interior (pH ~4.5–5.0) and house acid hydrolases for degrading cellular debris and phagocytosed particles.'
      },
      {
        id: 'mb1_q6',
        questionText: 'The nuclear pore complex facilitates bidirectional selective trafficking between:',
        options: ['Nucleoplasm and cytoplasm', 'Mitochondrial matrix and cytosol', 'Endoplasmic reticulum lumen and Golgi', 'Peroxisome and vacuole'],
        correctOptionIndex: 0,
        explanation: 'Nuclear pore complexes span the nuclear envelope, regulating import and export between the nucleoplasm and the cytoplasm.'
      },
      {
        id: 'mb1_q7',
        questionText: 'Which cytoskeletal element forms the core structural component of cilia, flagella, and mitotic spindle fibers?',
        options: ['Microtubules (tubulin dimers)', 'Actin microfilaments', 'Intermediate filaments (keratin)', 'Collagen fibers'],
        correctOptionIndex: 0,
        explanation: 'Microtubules composed of alpha and beta tubulin dimers provide cellular tracks, form mitotic spindles, and constitute the 9+2 axoneme in cilia.'
      },
      {
        id: 'mb1_q8',
        questionText: 'During receptor-mediated endocytosis, which cytosolic coat protein polymerizes into a basket-like lattice surrounding coated pits?',
        options: ['Clathrin', 'Actin', 'Vimentin', 'Tubulin'],
        correctOptionIndex: 0,
        explanation: 'Clathrin triskelions polymerize around plasma membrane pits to drive invagination and internalization of targeted ligand-receptor complexes.'
      },
      {
        id: 'mb1_q9',
        questionText: 'The sodium-potassium pump (Na+/K+-ATPase) exports and imports which respective stoichiometric ratio of ions per ATP consumed?',
        options: ['3 Na+ out, 2 K+ in', '2 Na+ out, 3 K+ in', '3 Na+ in, 2 K+ out', '1 Na+ out, 1 K+ in'],
        correctOptionIndex: 0,
        explanation: 'The electrogenic Na+/K+-ATPase pumps 3 Na+ ions out of the cell and 2 K+ ions into the cell per molecule of ATP hydrolyzed.'
      },
      {
        id: 'mb1_q10',
        questionText: 'Which organelle plays a primary role in lipid biosynthesis, steroid hormone production, and intracellular calcium sequestration?',
        options: ['Smooth Endoplasmic Reticulum (SER)', 'Rough Endoplasmic Reticulum (RER)', 'Nucleolus', 'Endosome'],
        correctOptionIndex: 0,
        explanation: 'The smooth ER specializes in phospholipid and steroid synthesis, detoxification of hydrophobic drugs, and calcium storage (sarcoplasmic reticulum in muscle).'
      },
      {
        id: 'mb1_q11',
        questionText: 'What term describes programmed, regulated cell death that does not trigger surrounding tissue inflammation?',
        options: ['Apoptosis', 'Necrosis', 'Karyorrhexis', 'Pyknosis'],
        correctOptionIndex: 0,
        explanation: 'Apoptosis is clean, orderly programmed cell death carried out by caspases without membrane rupture or acute inflammation.'
      },
      {
        id: 'mb1_q12',
        questionText: 'Which cellular junction provides direct electrical and metabolic coupling between adjacent cells via connexon channels?',
        options: ['Gap junctions', 'Tight junctions (zonula occludens)', 'Desmosomes (macula adherens)', 'Hemidesmosomes'],
        correctOptionIndex: 0,
        explanation: 'Gap junctions are composed of hexameric connexin complexes (connexons) creating hydrophilic channels for ions and small signaling molecules.'
      },
      {
        id: 'mb1_q13',
        questionText: 'Peroxisomes protect eukaryotic cells from oxidative damage primarily through which enzyme that breaks down hydrogen peroxide?',
        options: ['Catalase', 'Superoxide dismutase', 'Glutathione synthetase', 'Cytochrome c oxidase'],
        correctOptionIndex: 0,
        explanation: 'Catalase inside peroxisomes catalyzes the rapid breakdown of toxic hydrogen peroxide (H2O2) into water and molecular oxygen.'
      },
      {
        id: 'mb1_q14',
        questionText: 'Which phase of the eukaryotic cell cycle is characterized by active DNA replication?',
        options: ['S phase (Synthesis)', 'G1 phase', 'G2 phase', 'M phase (Mitosis)'],
        correctOptionIndex: 0,
        explanation: 'During the S (synthesis) phase of the cell cycle, nuclear DNA is completely and accurately duplicated in preparation for mitosis.'
      },
      {
        id: 'mb1_q15',
        questionText: 'In animal cell division, cytokinesis is driven mechanically by a contractile ring composed of:',
        options: ['Actin filaments and myosin II', 'Microtubules and kinesin', 'Keratin intermediate filaments', 'Tubulin and dynein'],
        correctOptionIndex: 0,
        explanation: 'Cytokinesis in animal cells utilizes a contractile ring of antiparallel actin filaments and non-muscle myosin II motors to form the cleavage furrow.'
      },
      {
        id: 'mb1_q16',
        questionText: 'Tight junctions (zonula occludens) are primarily established by which transmembrane seal-forming proteins?',
        options: ['Claudins and occludins', 'Cadherins and catenins', 'Integrins and talin', 'Selectins and ICAM-1'],
        correctOptionIndex: 0,
        explanation: 'Claudins and occludins form the anastomosing seal strands of tight junctions that control paracellular epithelial permeability.'
      },
      {
        id: 'mb1_q17',
        questionText: 'The nucleolus is the specialized nuclear compartment dedicated primarily to:',
        options: ['Ribosomal RNA (rRNA) transcription and ribosome assembly', 'mRNA splicing and polyadenylation', 'DNA replication origins', 'Lipid vesicle synthesis'],
        correctOptionIndex: 0,
        explanation: 'The nucleolus transcribes rRNA genes (via RNA polymerase I) and combines newly made rRNA with ribosomal proteins to assemble ribosomal subunits.'
      },
      {
        id: 'mb1_q18',
        questionText: 'What happens to human erythrocytes when placed in a severely hypotonic solution?',
        options: ['They swell and undergo osmotic hemolysis (bursting)', 'They undergo crenation (shrinkage)', 'No change in volume', 'They divide rapidly'],
        correctOptionIndex: 0,
        explanation: 'In hypotonic media, water flows into the red blood cells down its chemical potential gradient by osmosis until the membrane ruptures (hemolysis).'
      },
      {
        id: 'mb1_q19',
        questionText: 'Which organelle serves as the principal site of cellular translation for proteins destined for insertion into the plasma membrane?',
        options: ['Rough Endoplasmic Reticulum (RER)', 'Peroxisome', 'Free cytosolic ribosomes', 'Mitochondrial matrix'],
        correctOptionIndex: 0,
        explanation: 'Ribosomes bound to the RER membrane synthesize membrane-spanning, lysosomal, and secretory proteins via cotranslational translocation.'
      },
      {
        id: 'mb1_q20',
        questionText: 'Which molecular motor proteins move cargo toward the plus-ends and minus-ends of microtubules, respectively?',
        options: ['Kinesin (plus-end) and Dynein (minus-end)', 'Dynein (plus-end) and Kinesin (minus-end)', 'Myosin (plus-end) and Actin (minus-end)', 'Clathrin and Dynamin'],
        correctOptionIndex: 0,
        explanation: 'Kinesins are generally plus-end directed microtubule motors (anterograde), while cytoplasmic dyneins move toward minus-ends (retrograde).'
      },
      {
        id: 'mb1_q21',
        questionText: 'Cholesterol acts as a membrane fluidity buffer by:',
        options: [
          'Preventing excessive fluidity at high temperatures and preventing crystallization at low temperatures.',
          'Always increasing membrane permeability to water and ions.',
          'Completely dissolving the phospholipid bilayer.',
          'Preventing transmembrane protein incorporation.'
        ],
        correctOptionIndex: 0,
        explanation: 'Cholesterol moderates membrane fluidity: its steroid ring restricts phospholipid acyl chain mobility at high temperatures and prevents tight packing at lower temperatures.'
      },
      {
        id: 'mb1_q22',
        questionText: 'Which checkpoint in the cell cycle prevents onset of anaphase until all chromosomes are amphitelically attached to the spindle?',
        options: ['Spindle Assembly Checkpoint (SAC / M checkpoint)', 'G1/S restriction point', 'G2/M DNA damage checkpoint', 'Post-mitotic checkpoint'],
        correctOptionIndex: 0,
        explanation: 'The SAC (Spindle Assembly Checkpoint) monitors kinetochore-microtubule attachments to guarantee equal chromosome segregation.'
      },
      {
        id: 'mb1_q23',
        questionText: 'Proteins destined for proteasomal degradation in eukaryotic cells are covalently tagged with:',
        options: ['Ubiquitin chains (polyubiquitination)', 'Phosphate groups on serine', 'Acetyl groups on histones', 'Mannose-6-phosphate tags'],
        correctOptionIndex: 0,
        explanation: 'Polyubiquitin chains attached to target proteins by E3 ubiquitin ligases mark them for unfolding and proteolysis by the 26S proteasome.'
      },
      {
        id: 'mb1_q24',
        questionText: 'Phagocytosis in professional human immune cells (such as macrophages and neutrophils) involves:',
        options: ['Engulfment of large particles via actin-driven pseudopodia', 'Pinocytosis of extracellular fluid vesicles', 'Passage of ions through gap junctions', 'Receptor shedding'],
        correctOptionIndex: 0,
        explanation: 'Phagocytosis ("cell eating") is an actin-mediated process where the cell extends pseudopods around large targets (bacteria, necrotic debris) to form phagosomes.'
      },
      {
        id: 'mb1_q25',
        questionText: 'Desmosomes (macula adherens) anchor into which intracellular cytoskeletal filament network?',
        options: ['Intermediate filaments (keratin/tonofilaments)', 'Actin microfilaments', 'Microtubules', 'Myosin thick filaments'],
        correctOptionIndex: 0,
        explanation: 'Desmosomes connect cadherin family proteins (desmoglein/desmocollin) to intracellular keratin intermediate filaments, providing high mechanical shear resistance in epithelia.'
      }
    ]
  },
  {
    id: 'mb-section-2',
    sectionNumber: 2,
    fileName: '2.docx',
    titleEn: 'Section 2: Molecular Genetics & Gene Expression',
    titleAr: 'القسم الثاني: علم الوراثة الجزيئي والتعبير الجيني',
    range: '26-50',
    descriptionEn: 'DNA replication mechanisms, transcription, RNA processing, genetic code, translation, and genetic mutations.',
    descriptionAr: 'تضاعف الحمض النووي، النسخ الجيني، معالجة الرنا، الشفرة الوراثية، والترجمة والطفور.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedBiology&preview=2.docx',
    questions: [
      {
        id: 'mb2_q1',
        questionText: 'In DNA double-helix replication, the enzyme responsible for unwinding the parental duplex at the replication fork is:',
        options: ['DNA Helicase', 'DNA Topoisomerase (Gyrase)', 'DNA Ligase', 'Single-stranded binding protein'],
        correctOptionIndex: 0,
        explanation: 'DNA helicase utilizes ATP to break hydrogen bonds between complementary base pairs, unwinding the double helix ahead of the replication fork.'
      },
      {
        id: 'mb2_q2',
        questionText: 'Which enzyme synthesizes a short RNA primer required to initiate eukaryotic DNA synthesis on both leading and lagging strands?',
        options: ['DNA Primase', 'RNA Polymerase II', 'Telomerase', 'Reverse transcriptase'],
        correctOptionIndex: 0,
        explanation: 'DNA polymerases cannot initiate synthesis de novo; DNA primase creates a complementary RNA primer providing the free 3-OH group.'
      },
      {
        id: 'mb2_q3',
        questionText: 'Discontinuous synthesis on the lagging strand results in short fragments known as:',
        options: ['Okazaki fragments', 'Shine-Dalgarno fragments', 'Klenow fragments', 'Kozak sequences'],
        correctOptionIndex: 0,
        explanation: 'Because DNA polymerase synthesizes strictly 5 to 3, the lagging strand is replicated discontinuously into 100–200 nucleotide Okazaki fragments.'
      },
      {
        id: 'mb2_q4',
        questionText: 'During eukaryotic pre-mRNA processing, which modifications occur before nuclear export?',
        options: ['5 7-methylguanosine capping, 3 poly-A tailing, and intron splicing', 'Removal of exons and retention of introns', 'Phosphorylation of all bases', 'Degradation of the 5 end'],
        correctOptionIndex: 0,
        explanation: 'Mature eukaryotic mRNA requires 5 capping with 7-methylguanosine, addition of a 3 poly-A tail, and spliceosomal excision of non-coding introns.'
      },
      {
        id: 'mb2_q5',
        questionText: 'The universal start codon in human messenger RNA codes for which amino acid?',
        options: ['Methionine (AUG)', 'Tryptophan (UGG)', 'Valine (GUG)', 'Leucine (UUG)'],
        correctOptionIndex: 0,
        explanation: 'The codon AUG serves as the universal translation initiation codon, specifying methionine in eukaryotes and formylmethionine in bacteria.'
      },
      {
        id: 'mb2_q6',
        questionText: 'Which of the following codons functions as a translation termination (STOP) codon?',
        options: ['UAA, UAG, and UGA', 'AUG, UGG, and CGA', 'AAA, UUU, and GGG', 'AAC, UAC, and GAC'],
        correctOptionIndex: 0,
        explanation: 'UAA (ochre), UAG (amber), and UGA (opal) are nonsense stop codons that do not code for any tRNA, triggering translation release factors.'
      },
      {
        id: 'mb2_q7',
        questionText: 'A point mutation that substitutes a single nucleotide, creating a premature termination codon is called a:',
        options: ['Nonsense mutation', 'Missense mutation', 'Silent mutation', 'Synonymous mutation'],
        correctOptionIndex: 0,
        explanation: 'A nonsense mutation converts an amino acid-specifying codon into a premature stop codon (UAA, UAG, or UGA), producing truncated proteins.'
      },
      {
        id: 'mb2_q8',
        questionText: 'Which RNA polymerase is responsible for transcribing protein-coding genes into pre-mRNA in eukaryotic nuclei?',
        options: ['RNA Polymerase II', 'RNA Polymerase I', 'RNA Polymerase III', 'Primase'],
        correctOptionIndex: 0,
        explanation: 'RNA Polymerase II specifically transcribes all protein-coding genes (mRNAs) as well as most snRNAs and microRNAs in eukaryotes.'
      },
      {
        id: 'mb2_q9',
        questionText: 'In sickle cell anemia, the genetic defect is caused by which specific missense substitution in the beta-globin gene?',
        options: ['Glutamic acid replaced by Valine at position 6 (Glu6Val)', 'Valine replaced by Glutamate', 'Lysine replaced by Arginine', 'Glycine replaced by Alanine'],
        correctOptionIndex: 0,
        explanation: 'Sickle cell disease results from a single base substitution (GAG to GTG) replacing hydrophilic glutamic acid with hydrophobic valine at codon 6 of beta-globin.'
      },
      {
        id: 'mb2_q10',
        questionText: 'Telomerase prevents chromosome shortening during successive rounds of replication by adding tandem repeats to:',
        options: ['The 3 end of eukaryotic telomeres using its internal RNA template', 'The 5 end of mRNA transcripts', 'The centromeric satellite DNA', 'The promoter region of genes'],
        correctOptionIndex: 0,
        explanation: 'Telomerase is a specialized reverse transcriptase ribonucleoprotein that extends telomeric G-rich repeats (TTAGGG in humans) at chromosome 3 ends.'
      },
      {
        id: 'mb2_q11',
        questionText: 'Which molecular structure charges transfer RNA (tRNA) with its corresponding cognate amino acid?',
        options: ['Aminoacyl-tRNA synthetase', 'Peptidyl transferase', 'Spliceosome', 'DNA ligase'],
        correctOptionIndex: 0,
        explanation: 'Aminoacyl-tRNA synthetases specifically recognize both an amino acid and its cognate tRNA anticodon loop, forming an ester bond to charge the tRNA.'
      },
      {
        id: 'mb2_q12',
        questionText: 'The catalytic peptidyl transferase activity that forms peptide bonds during protein synthesis is carried out by:',
        options: ['The 28S rRNA ribozyme of the 60S large ribosomal subunit', 'A ribosomal protein enzyme', 'Elongation factor EF-Tu', 'GTPase release factor'],
        correctOptionIndex: 0,
        explanation: 'The ribosome is a ribozyme; peptidyl transferase activity is catalyzed by the 28S ribosomal RNA of the large 60S subunit, not by protein enzymes.'
      },
      {
        id: 'mb2_q13',
        questionText: 'Insertion or deletion of a number of nucleotides not divisible by 3 causes what type of detrimental mutation?',
        options: ['Frameshift mutation', 'Silent mutation', 'Missense mutation', 'Neutral mutation'],
        correctOptionIndex: 0,
        explanation: 'Indels not divisible by 3 alter the triplet reading frame of all downstream codons, usually causing complete loss of protein function and premature termination.'
      },
      {
        id: 'mb2_q14',
        questionText: 'Epigenetic transcriptional silencing is characteristically associated with which chromatin modification?',
        options: ['DNA cytosine methylation and histone deacetylation', 'Histone acetylation and DNA demethylation', 'Phosphorylation of all purines', 'Ribosomal detachment'],
        correctOptionIndex: 0,
        explanation: 'DNA methylation of CpG islands combined with histone deacetylation condenses chromatin into heterochromatin, silencing gene transcription.'
      },
      {
        id: 'mb2_q15',
        questionText: 'What is the function of topoisomerases (such as DNA gyrase) during DNA replication?',
        options: ['Relieving positive supercoiling and torsional strain ahead of replication forks', 'Synthesizing the primer', 'Proofreading errors', 'Ligating RNA to DNA'],
        correctOptionIndex: 0,
        explanation: 'Topoisomerases introduce transient single- or double-strand breaks to allow DNA rotation, relieving catastrophic superhelical tension generated by helicase.'
      },
      {
        id: 'mb2_q16',
        questionText: 'Which human genetic disorder of nucleotide excision repair results in extreme photosensitivity and early skin cancers?',
        options: ['Xeroderma pigmentosum', 'Huntington disease', 'Cystic fibrosis', 'Down syndrome'],
        correctOptionIndex: 0,
        explanation: 'Xeroderma pigmentosum is caused by mutations in nucleotide excision repair (NER) enzymes, making cells unable to repair UV-induced thymine dimers.'
      },
      {
        id: 'mb2_q17',
        questionText: 'In a karyotype, Down syndrome is cytogenetically diagnosed by the presence of:',
        options: ['Trisomy 21 (47, XX or XY, +21)', 'Monosomy X (45, X)', 'Trisomy 18 (Edwards syndrome)', 'Trisomy 13 (Patau syndrome)'],
        correctOptionIndex: 0,
        explanation: 'Down syndrome is caused by an extra copy of chromosome 21 (trisomy 21), most commonly arising from maternal meiotic non-disjunction.'
      },
      {
        id: 'mb2_q18',
        questionText: 'Which mechanism ensures high fidelity during DNA replication before mismatch repair takes place?',
        options: ['3 to 5 exonuclease proofreading by DNA polymerases', '5 to 3 endonuclease cutting', 'Poly-A tailing', 'Splicing'],
        correctOptionIndex: 0,
        explanation: 'Replicative DNA polymerases have intrinsic 3 to 5 exonuclease proofreading activity that excises misincorporated nucleotides immediately.'
      },
      {
        id: 'mb2_q19',
        questionText: 'MicroRNAs (miRNAs) regulate post-transcriptional gene expression primarily by:',
        options: ['Binding complementary 3-UTR sequences on mRNA to repress translation or promote mRNA degradation', 'Enhancing promoter transcription', 'Altering DNA sequence', 'Binding ribosomes directly'],
        correctOptionIndex: 0,
        explanation: 'miRNAs assemble into the RISC complex and base-pair with target mRNA 3 untranslated regions, leading to translational repression or mRNA cleavage.'
      },
      {
        id: 'mb2_q20',
        questionText: 'In Mendel’s law of independent assortment, genes located on different non-homologous chromosomes:',
        options: ['Segregate independently of each other during gamete formation', 'Always inherit together as a linked unit', 'Fuse into a single allele', 'Disintegrate during meiosis I'],
        correctOptionIndex: 0,
        explanation: 'Mendel’s second law states that alleles of two or more different genes sort into gametes independently during meiosis due to random bivalent orientation at metaphase I.'
      },
      {
        id: 'mb2_q21',
        questionText: 'Which enzyme seals phosphodiester nicks between adjacent 3-OH and 5-phosphate groups in the DNA backbone?',
        options: ['DNA Ligase', 'DNA Helicase', 'RNA Polymerase', 'Alkaline Phosphatase'],
        correctOptionIndex: 0,
        explanation: 'DNA ligase uses ATP to catalyze the formation of a phosphodiester bond, joining Okazaki fragments and sealing repair nicks.'
      },
      {
        id: 'mb2_q22',
        questionText: 'The genetic code is described as degenerate (redundant) because:',
        options: ['Multiple different codons can specify the same single amino acid', 'One codon can specify multiple different amino acids', 'The code changes between cells', 'It contains no stop signals'],
        correctOptionIndex: 0,
        explanation: 'With 64 possible triplet codons and only 20 standard amino acids, most amino acids are encoded by two or more synonymous codons (degeneracy).'
      },
      {
        id: 'mb2_q23',
        questionText: 'Polymerase Chain Reaction (PCR) repeatedly cycles through which three sequential thermal steps?',
        options: ['Denaturation (~95°C), Annealing (~55°C), and Extension (~72°C)', 'Boiling, Freezing, and Thawing', 'Ligation, Splicing, and Capping', 'Transcription, Translation, and Folding'],
        correctOptionIndex: 0,
        explanation: 'PCR amplification cycles through strand denaturation (94–96°C), primer annealing (50–65°C), and enzymatic primer extension with Taq polymerase (72°C).'
      },
      {
        id: 'mb2_q24',
        questionText: 'Barr bodies observed in female somatic cell nuclei represent:',
        options: ['One randomly inactivated, highly condensed X chromosome (lyonization)', 'The nucleolus during telophase', 'Amplified mitochondrial DNA', 'Extruded polar bodies'],
        correctOptionIndex: 0,
        explanation: 'In female mammalian cells, one X chromosome is epigenetically silenced and heterochromatinized into a condensed Barr body to achieve dosage compensation.'
      },
      {
        id: 'mb2_q25',
        questionText: 'A human somatic cell normally contains how many total chromosomes and homologous pairs?',
        options: ['46 chromosomes (23 pairs)', '23 chromosomes (no pairs)', '48 chromosomes (24 pairs)', '92 chromosomes (46 pairs)'],
        correctOptionIndex: 0,
        explanation: 'Normal human diploid somatic cells contain 46 chromosomes organized into 22 pairs of autosomes and 1 pair of sex chromosomes (XX or XY).'
      }
    ]
  },
  {
    id: 'mb-section-3',
    sectionNumber: 3,
    fileName: '3.docx',
    titleEn: 'Section 3: General Histology & Tissue Biology',
    titleAr: 'القسم الثالث: علم الأنسجة العام وبيولوجيا النسج',
    range: '51-75',
    descriptionEn: 'Epithelial tissue classification, connective tissues, bone & cartilage matrix, muscle fibers, and nervous tissue.',
    descriptionAr: 'تصنيف الأنسجة الطلائية، الأنسجة الضامة، العظام والغضاريف، الألياف العضلية والنسيج العصبي.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedBiology&preview=3.docx',
    questions: [
      {
        id: 'mb3_q1',
        questionText: 'Which epithelium lines the human oral cavity and esophagus to withstand mechanical friction?',
        options: ['Stratified squamous epithelium', 'Simple columnar epithelium', 'Simple cuboidal epithelium', 'Transitional epithelium (urothelium)'],
        correctOptionIndex: 0,
        explanation: 'Stratified squamous epithelium consists of multiple protective cell layers ideal for areas subjected to abrasive mechanical stresses like the oral cavity.'
      },
      {
        id: 'mb3_q2',
        questionText: 'The basement membrane separating epithelia from underlying connective tissue is primarily composed of:',
        options: ['Type IV collagen, laminin, and perlecan', 'Type I collagen exclusively', 'Elastin and actin', 'Keratin and myosin'],
        correctOptionIndex: 0,
        explanation: 'The basal lamina sheet is made of specialized non-fibrillar type IV collagen, laminin glycoprotein networks, entactin/nidogen, and perlecan proteoglycans.'
      },
      {
        id: 'mb3_q3',
        questionText: 'Which cell type in connective tissue proper is the principal producer of extracellular matrix fibers and ground substance?',
        options: ['Fibroblast', 'Mast cell', 'Macrophage', 'Plasma cell'],
        correctOptionIndex: 0,
        explanation: 'Fibroblasts are the predominant resident stromal cells responsible for synthesizing collagen, elastin, and glycosaminoglycan ground substance.'
      },
      {
        id: 'mb3_q4',
        questionText: 'What is the most abundant structural protein in the human body, providing high tensile strength to bones, tendons, and dentin?',
        options: ['Type I Collagen', 'Type II Collagen', 'Type III Collagen', 'Elastin'],
        correctOptionIndex: 0,
        explanation: 'Type I collagen forms thick, non-elastic cross-linked fibrils that confer immense tensile resistance to bone matrix, tendons, skin, and dental dentin.'
      },
      {
        id: 'mb3_q5',
        questionText: 'Cartilage tissue is characterized biologically by having:',
        options: ['An avascular matrix dependent on diffusion for nutrient supply', 'A rich capillary blood supply', 'Numerous osteons with central canals', 'Multinucleated syncytia'],
        correctOptionIndex: 0,
        explanation: 'Cartilage is completely avascular, lacking blood vessels and lymphatics; chondrocytes depend entirely on nutrient diffusion through the gel-like matrix.'
      },
      {
        id: 'mb3_q6',
        questionText: 'Which type of cartilage covers the articulating surfaces of synovial joints and lacks a perichondrium at its free articular surface?',
        options: ['Hyaline cartilage', 'Elastic cartilage', 'Fibrocartilage', 'Calcified tendon'],
        correctOptionIndex: 0,
        explanation: 'Articular hyaline cartilage covers movable joint bone ends and lacks a perichondrium to ensure a frictionless, smooth gliding surface.'
      },
      {
        id: 'mb3_q7',
        questionText: 'The cylindrical structural and functional units of mature compact cortical bone are known as:',
        options: ['Osteons (Haversian systems)', 'Trabeculae', 'Canaliculi', 'Howship lacunae'],
        correctOptionIndex: 0,
        explanation: 'Compact bone is organized into concentric cylindrical lamellae called osteons or Haversian systems centered around neurovascular Haversian canals.'
      },
      {
        id: 'mb3_q8',
        questionText: 'Which large multinucleated cells are responsible for bone resorption and mineral demineralization?',
        options: ['Osteoclasts', 'Osteoblasts', 'Osteocytes', 'Chondroblasts'],
        correctOptionIndex: 0,
        explanation: 'Osteoclasts originate from monocyte-macrophage hematopoietic lineage and secrete protons (HCl) and cathepsin K to dissolve bone matrix in Howship lacunae.'
      },
      {
        id: 'mb3_q9',
        questionText: 'Osteoblasts trapped within their own calcified lacunar matrix differentiate into mature mechanosensory cells called:',
        options: ['Osteocytes', 'Osteoclasts', 'Fibrocytes', 'Pericytes'],
        correctOptionIndex: 0,
        explanation: 'When osteoblasts complete bone matrix deposition and become entombed in lacunae, they transform into dendritic osteocytes communicating via canaliculi.'
      },
      {
        id: 'mb3_q10',
        questionText: 'In skeletal muscle fibers, what is the functional repeating contractile unit between adjacent Z-discs?',
        options: ['Sarcomere', 'Myofibril', 'T-tubule', 'Sarcoplasmic reticulum'],
        correctOptionIndex: 0,
        explanation: 'The sarcomere is the basic contractile unit of striated muscle, bounded by two Z-discs and consisting of interdigitating actin and myosin filaments.'
      },
      {
        id: 'mb3_q11',
        questionText: 'Cardiac muscle tissue differs histologically from skeletal muscle by having:',
        options: ['Intercalated discs with gap junctions and involuntary branching fibers', 'Multinucleated peripheral syncytia without striations', 'Complete absence of actin and myosin', 'Voluntary somatic innervation'],
        correctOptionIndex: 0,
        explanation: 'Cardiac myocytes are branched cells with central nuclei joined end-to-end by intercalated discs containing fascia adherens, desmosomes, and electrical gap junctions.'
      },
      {
        id: 'mb3_q12',
        questionText: 'Smooth muscle cells are histologically characterized as:',
        options: ['Spindle-shaped (fusiform), non-striated, single central nucleus', 'Cylindrical, striated, multinucleated', 'Branched, striated with intercalated discs', 'Non-contractile stromal cells'],
        correctOptionIndex: 0,
        explanation: 'Smooth muscle fibers are unstriated, involuntary, spindle-shaped cells with a single elongated central nucleus and actin anchored to dense bodies.'
      },
      {
        id: 'mb3_q13',
        questionText: 'Which glial cell type forms the myelin sheath insulating axons in the Central Nervous System (CNS)?',
        options: ['Oligodendrocytes', 'Schwann cells', 'Astrocytes', 'Microglia'],
        correctOptionIndex: 0,
        explanation: 'Oligodendrocytes myelinate multiple axon segments in the CNS, whereas Schwann cells myelinate single axon internodes in the Peripheral Nervous System (PNS).'
      },
      {
        id: 'mb3_q14',
        questionText: 'Which cells represent the resident phagocytic macrophage-like defense system in the central nervous system?',
        options: ['Microglia', 'Astrocytes', 'Ependymal cells', 'Satellite cells'],
        correctOptionIndex: 0,
        explanation: 'Microglia originate from embryonic yolk sac hematopoietic progenitors and act as resident immune scavengers clearing debris and pathogens in the brain.'
      },
      {
        id: 'mb3_q15',
        questionText: 'Astrocytes contribute fundamentally to neural function by forming which critical physiological barrier?',
        options: ['Blood-Brain Barrier (BBB) perivascular end-feet', 'Myelin sheath', 'Perineurium', 'Ependymal cilia'],
        correctOptionIndex: 0,
        explanation: 'Astrocyte vascular end-feet (pedicels) encircle brain capillary endothelial cells, inducing and maintaining tight junctional integrity of the Blood-Brain Barrier.'
      },
      {
        id: 'mb3_q16',
        questionText: 'Pseudostratified ciliated columnar epithelium is typically found lining:',
        options: ['The respiratory tract (trachea and main bronchi)', 'The urinary bladder', 'The epidermis of the skin', 'The renal tubules'],
        correctOptionIndex: 0,
        explanation: 'Respiratory epithelium is pseudostratified ciliated columnar with goblet cells; all cells rest on the basal lamina but their nuclei sit at different levels.'
      },
      {
        id: 'mb3_q17',
        questionText: 'Transitional epithelium (urothelium) is uniquely adapted for:',
        options: ['Stretching and distension in the urinary bladder and ureters', 'Active absorption of nutrients in the intestine', 'Gas exchange in pulmonary alveoli', 'Secretion of hydrochloric acid'],
        correctOptionIndex: 0,
        explanation: 'Urothelium features umbrella/facet cells with specialized uroplakin plaques that flatten during bladder filling to prevent urine reabsorption and toxicity.'
      },
      {
        id: 'mb3_q18',
        questionText: 'Mast cells release which inflammatory mediator responsible for vasodilation and increased capillary permeability during acute reactions?',
        options: ['Histamine', 'Collagen', 'Glucagon', 'Thyroxine'],
        correctOptionIndex: 0,
        explanation: 'Upon IgE cross-linking, mast cells degranulate, releasing preformed histamine, heparin, and leukotrienes to promote vasodilation and edema.'
      },
      {
        id: 'mb3_q19',
        questionText: 'Plasma cells differentiate from which lymphocyte lineage to produce circulating humoral antibodies?',
        options: ['B lymphocytes', 'CD4+ T helper cells', 'CD8+ Cytotoxic T cells', 'Natural Killer (NK) cells'],
        correctOptionIndex: 0,
        explanation: 'Upon antigenic activation and T-follicular helper interaction, B lymphocytes differentiate into antibody-secreting plasma cells with a clock-face chromatin pattern.'
      },
      {
        id: 'mb3_q20',
        questionText: 'Fibrocartilage is distinct from other cartilages because its matrix contains abundant:',
        options: ['Dense bundles of Type I collagen fibers', 'Elastic fibers only', 'A continuous epithelial layer', 'Adipose depots'],
        correctOptionIndex: 0,
        explanation: 'Fibrocartilage (found in intervertebral discs and the temporomandibular joint articular disc) blends dense regular type I collagen with hyaline type II collagen.'
      },
      {
        id: 'mb3_q21',
        questionText: 'In a peripheral nerve, which connective tissue sheath surrounds individual nerve axons and their Schwann cells?',
        options: ['Endoneurium', 'Perineurium', 'Epineurium', 'Neurilemma'],
        correctOptionIndex: 0,
        explanation: 'Endoneurium surrounds individual nerve fibers; perineurium bundles fibers into fascicles; epineurium encloses the entire gross peripheral nerve trunk.'
      },
      {
        id: 'mb3_q22',
        questionText: 'Nodes of Ranvier along a myelinated axon are critical for:',
        options: ['Saltatory conduction of action potentials', 'Continuous slow electrotonic spread', 'Synthesis of neurofilaments', 'Storage of neurotransmitter vesicles'],
        correctOptionIndex: 0,
        explanation: 'Nodes of Ranvier have dense clusters of voltage-gated Na+ channels, allowing action potentials to rapidly jump from node to node (saltatory conduction).'
      },
      {
        id: 'mb3_q23',
        questionText: 'Which endocrine gland secretes hormones directly into the bloodstream without using a ductal system?',
        options: ['Thyroid gland', 'Salivary gland (parotid)', 'Sweat gland', 'Sebaceous gland'],
        correctOptionIndex: 0,
        explanation: 'Endocrine glands (thyroid, pituitary, adrenals) are ductless and release their chemical messengers directly into surrounding fenestrated capillaries.'
      },
      {
        id: 'mb3_q24',
        questionText: 'Brown adipose tissue differs functionally from white adipose tissue by:',
        options: ['Generating heat via uncoupling protein-1 (UCP-1 / thermogenin)', 'Storing triglycerides exclusively for mechanical cushioning', 'Lacking mitochondria completely', 'Producing insulin'],
        correctOptionIndex: 0,
        explanation: 'Brown fat is multilocular, rich in iron-containing mitochondria, and expresses UCP-1 to uncouple oxidative phosphorylation and generate heat (non-shivering thermogenesis).'
      },
      {
        id: 'mb3_q25',
        questionText: 'Volkmann (perforating) canals in compact bone connect adjacent Haversian canals and run:',
        options: ['Perpendicular / obliquely to the longitudinal axis of the bone', 'Parallel to the osteon long axis', 'Through the medullary cavity only', 'Within the articular cartilage'],
        correctOptionIndex: 0,
        explanation: 'Volkmann canals transmit neurovascular bundles transversally from the periosteum and endosteum to penetrate between parallel Haversian canals.'
      }
    ]
  },
  {
    id: 'mb-section-4',
    sectionNumber: 4,
    fileName: '4.docx',
    titleEn: 'Section 4: Medical Microbiology & Oral Pathogens',
    titleAr: 'القسم الرابع: الأحياء الدقيقة الطبية وممرضات الفم',
    range: '76-100',
    descriptionEn: 'Bacterial cell wall structures, Gram staining, sterilization, oral streptococci, dental caries microbiology, and viruses.',
    descriptionAr: 'جدار الخلية البكتيرية، صبغة غرام، التعقيم، المكورات العقدية الفموية، ميكروبيولوجيا التسوس، والفيروسات.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedBiology&preview=4.docx',
    questions: [
      {
        id: 'mb4_q1',
        questionText: 'Gram-positive bacteria retain crystal violet stain primarily due to what feature of their cell wall?',
        options: ['A thick multilayered peptidoglycan wall containing teichoic acids', 'An outer lipopolysaccharide membrane', 'A thin monolayer of chitin', 'A high concentration of sterols'],
        correctOptionIndex: 0,
        explanation: 'Gram-positive bacteria have a thick (20–80 nm) peptidoglycan meshwork with teichoic and lipoteichoic acids that traps crystal violet-iodine complexes.'
      },
      {
        id: 'mb4_q2',
        questionText: 'Endotoxin (Lipopolysaccharide / LPS) that triggers septic shock and inflammation is a constituent of:',
        options: ['The outer membrane of Gram-negative bacteria', 'The cell wall of Gram-positive bacilli', 'Bacterial endospores', 'Fungal hyphae'],
        correctOptionIndex: 0,
        explanation: 'LPS is anchored in the outer leaflet of the outer membrane in Gram-negative bacteria; its Lipid A moiety is a potent endotoxin activating toll-like receptor 4 (TLR4).'
      },
      {
        id: 'mb4_q3',
        questionText: 'Which bacterial species is the primary etiological pathogen in the initiation and progression of human dental caries?',
        options: ['Streptococcus mutans', 'Staphylococcus aureus', 'Pseudomonas aeruginosa', 'Escherichia coli'],
        correctOptionIndex: 0,
        explanation: 'Streptococcus mutans synthesizes insoluble extracellular glucans from dietary sucrose and ferments sugars into lactic acid (acidogenic and aciduric).'
      },
      {
        id: 'mb4_q4',
        questionText: 'Which bacterial pathogen is strongly implicated in chronic adult periodontitis and produces gingipain virulence proteases?',
        options: ['Porphyromonas gingivalis', 'Streptococcus pneumoniae', 'Streptococcus salivarius', 'Lactobacillus acidophilus'],
        correctOptionIndex: 0,
        explanation: 'Porphyromonas gingivalis (a keystone red-complex anaerobic pathogen) utilizes gingipains, fimbriae, and capsule to destroy periodontal attachment tissues.'
      },
      {
        id: 'mb4_q5',
        questionText: 'Bacterial endospores produced by Bacillus and Clostridium species are extraordinarily resistant to heat and disinfectants due to:',
        options: ['High dipicolinic acid and calcium content and a thick keratin-like spore coat', 'High water content', 'Continuous metabolic ATP turnover', 'Active motility flagella'],
        correctOptionIndex: 0,
        explanation: 'Endospores feature a dehydrated core rich in calcium dipicolinate, surrounded by a thick cortex and protein coat, conferring survival at 100°C for hours.'
      },
      {
        id: 'mb4_q6',
        questionText: 'Standard autoclave sterilization requires which temperature, pressure, and exposure duration parameters?',
        options: ['121°C (250°F) at 15 psi for at least 15 to 20 minutes', '100°C at atmospheric pressure for 5 minutes', '160°C without pressure for 30 seconds', '70°C for 1 hour'],
        correctOptionIndex: 0,
        explanation: 'Moist heat under pressure at 121°C (15 psi) for 15–20 minutes denatures bacterial enzymes and destroys all vegetative bacteria, viruses, and bacterial endospores.'
      },
      {
        id: 'mb4_q7',
        questionText: 'The human oral fungal pathogen most commonly responsible for oral thrush (candidiasis) is:',
        options: ['Candida albicans', 'Aspergillus fumigatus', 'Histoplasma capsulatum', 'Cryptococcus neoformans'],
        correctOptionIndex: 0,
        explanation: 'Candida albicans is a polymorphic opportunistic fungus that produces pseudohyphae causing pseudomembranous and erythematous oral candidiasis.'
      },
      {
        id: 'mb4_q8',
        questionText: 'Which hepatitis virus is a blood-borne, enveloped double-stranded DNA virus of major cross-infection risk in dentistry against which a vaccine exists?',
        options: ['Hepatitis B virus (HBV)', 'Hepatitis A virus (HAV)', 'Hepatitis C virus (HCV)', 'Hepatitis E virus (HEV)'],
        correctOptionIndex: 0,
        explanation: 'Hepatitis B virus is a Hepadnavirus transmitted via blood and contaminated instruments; vaccination with recombinant HBsAg is mandatory for dental healthcare workers.'
      },
      {
        id: 'mb4_q9',
        questionText: 'Human Immunodeficiency Virus (HIV) selectively targets and destroys which key immune cells via its gp120 envelope glycoprotein?',
        options: ['CD4+ T helper lymphocytes', 'CD8+ Cytotoxic T cells', 'B lymphocytes', 'Erythrocytes'],
        correctOptionIndex: 0,
        explanation: 'HIV viral gp120 binds with high affinity to the CD4 receptor and chemokine co-receptors (CCR5/CXCR4) on helper T lymphocytes and macrophages.'
      },
      {
        id: 'mb4_q10',
        questionText: 'Herpes Simplex Virus Type 1 (HSV-1) establishes life-long latent infection within which anatomical site?',
        options: ['Trigeminal (Gasserian) sensory ganglion', 'Dorsal root ganglia of lumbar nerves', 'Submandibular salivary gland acini', 'Cervical lymph nodes'],
        correctOptionIndex: 0,
        explanation: 'Following primary oral infection (herpetic gingivostomatitis), HSV-1 ascends sensory axons to establish latency in the trigeminal ganglion (cranial nerve V).'
      },
      {
        id: 'mb4_q11',
        questionText: 'Which bacterial morphology describes spherical cells arranged in chains?',
        options: ['Streptococci', 'Staphylococci (grape-like clusters)', 'Spirochetes (corkscrew)', 'Bacilli (rod-shaped)'],
        correctOptionIndex: 0,
        explanation: 'Streptococci are cocci that divide in a single linear plane, forming characteristic bead-like chains (e.g., S. mutans, S. pyogenes).'
      },
      {
        id: 'mb4_q12',
        questionText: 'Beta-lactam antibiotics (such as penicillin and amoxicillin) exert bactericidal action by inhibiting:',
        options: ['Transpeptidase enzymes (penicillin-binding proteins) in cell wall peptidoglycan synthesis', 'The 50S ribosomal subunit', 'DNA topoisomerase II', 'Folate synthesis pathway'],
        correctOptionIndex: 0,
        explanation: 'Beta-lactams covalently bind transpeptidases (PBPs), preventing cross-linking of peptidoglycan peptide side chains, which leads to osmotic lysis.'
      },
      {
        id: 'mb4_q13',
        questionText: 'In oral biofilms (dental plaque), what is the key protective feature that makes bacteria up to 1000-fold more resistant to antimicrobials?',
        options: ['The extracellular polymeric substance (EPS) matrix and altered metabolic phenotypes', 'Thicker flagella', 'Complete absence of cell walls', 'Immediate spore conversion'],
        correctOptionIndex: 0,
        explanation: 'The biofilm matrix (composed of extracellular polysaccharides, proteins, and eDNA) hinders drug penetration and creates dormant persister cells.'
      },
      {
        id: 'mb4_q14',
        questionText: 'Aggregatibacter actinomycetemcomitans is strongly correlated with which severe form of periodontal destruction?',
        options: ['Localized aggressive (juvenile) periodontitis', 'Gingivitis only', 'Denture stomatitis', 'Dental fluorosis'],
        correctOptionIndex: 0,
        explanation: 'A. actinomycetemcomitans secretes a potent leukotoxin that kills human neutrophils and is classical in localized juvenile/aggressive periodontitis.'
      },
      {
        id: 'mb4_q15',
        questionText: 'Which bacterial enzyme converts hydrogen peroxide into water and oxygen, differentiating Staphylococci (+) from Streptococci (-)?',
        options: ['Catalase', 'Coagulase', 'Streptokinase', 'Hyaluronidase'],
        correctOptionIndex: 0,
        explanation: 'The catalase test is a cornerstone diagnostic: Staphylococci are catalase-positive (effervescent bubbles with 3% H2O2), whereas Streptococci are catalase-negative.'
      },
      {
        id: 'mb4_q16',
        questionText: 'Which chemical agent is considered the gold-standard oral antiseptic mouthrinse due to its high substantive binding to tooth and mucosa surfaces?',
        options: ['0.12% to 0.2% Chlorhexidine gluconate', 'Hydrogen peroxide 30%', 'Absolute ethanol', 'Sodium hypochlorite 5%'],
        correctOptionIndex: 0,
        explanation: 'Chlorhexidine gluconate is a cationic bisbiguanide that adsorbs to negatively charged oral tissues, slowly releasing over hours (high substantivity).'
      },
      {
        id: 'mb4_q17',
        questionText: 'Which anaerobic spore-forming bacillus produces the most potent neurotoxin known, blocking acetylcholine release at motor endplates?',
        options: ['Clostridium botulinum', 'Clostridium tetani', 'Clostridium difficile', 'Bacillus anthracis'],
        correctOptionIndex: 0,
        explanation: 'Botulinum toxin cleaves SNARE proteins at neuromuscular junctions, blocking acetylcholine exocytosis and producing flaccid descending paralysis.'
      },
      {
        id: 'mb4_q18',
        questionText: 'The critical pH threshold below which human dental enamel demineralization accelerates is approximately:',
        options: ['5.5', '7.0', '6.8', '4.0'],
        correctOptionIndex: 0,
        explanation: 'Enamel hydroxyapatite begins to dissolve when oral plaque biofilm pH drops below the critical pH of ~5.5 following carbohydrate fermentation.'
      },
      {
        id: 'mb4_q19',
        questionText: 'Which virus is the causative agent of chickenpox (varicella) and subsequent herpes zoster (shingles) reactivation?',
        options: ['Varicella-Zoster Virus (VZV / HHV-3)', 'Epstein-Barr Virus (EBV / HHV-4)', 'Cytomegalovirus (CMV / HHV-5)', 'Kaposi sarcoma virus (HHV-8)'],
        correctOptionIndex: 0,
        explanation: 'VZV causes varicella in childhood, then remains latent in dorsal root or cranial nerve ganglia, potentially reactivating as dermatomal shingles.'
      },
      {
        id: 'mb4_q20',
        questionText: 'Which form of bacterial gene transfer involves uptake and incorporation of naked free foreign DNA from the environment?',
        options: ['Transformation', 'Transduction (bacteriophage-mediated)', 'Conjugation (F-plasmid pilus)', 'Transposition'],
        correctOptionIndex: 0,
        explanation: 'Bacterial transformation involves the active transport and homologous recombination of extracellular free DNA fragments by competent cells.'
      },
      {
        id: 'mb4_q21',
        questionText: 'Tetanus toxin (tetanospasmin) produced by Clostridium tetani causes spastic paralysis by blocking the release of:',
        options: ['Inhibitory neurotransmitters (GABA and glycine) in the spinal cord', 'Acetylcholine at the motor endplate', 'Dopamine in the basal ganglia', 'Norepinephrine'],
        correctOptionIndex: 0,
        explanation: 'Tetanospasmin migrates retrograde into spinal cord inhibitory interneurons (Renshaw cells), preventing GABA and glycine release and causing uncontrollable spasms (trismus/lockjaw).'
      },
      {
        id: 'mb4_q22',
        questionText: 'Which microorganism is an obligate intracellular bacterium that cannot synthesize its own ATP and is a leading cause of non-gonococcal urethritis and conjunctivitis?',
        options: ['Chlamydia trachomatis', 'Mycoplasma pneumoniae', 'Treponema pallidum', 'Mycobacterium tuberculosis'],
        correctOptionIndex: 0,
        explanation: 'Chlamydia trachomatis is an obligate intracellular energy parasite that alternates between infectious elementary bodies and replicating reticulate bodies.'
      },
      {
        id: 'mb4_q23',
        questionText: 'Which staining method uses carbolfuchsin and heat to identify acid-fast bacilli such as Mycobacterium tuberculosis?',
        options: ['Ziehl-Neelsen stain', 'Gram stain', 'Giemsa stain', 'India ink negative stain'],
        correctOptionIndex: 0,
        explanation: 'The Ziehl-Neelsen stain exploits the high mycolic acid wax content of Mycobacteria, which resists decolorization with acid-alcohol.'
      },
      {
        id: 'mb4_q24',
        questionText: 'Koplik spots on the buccal mucosa opposite mandibular molars are a pathognomonic early diagnostic sign of:',
        options: ['Measles (Rubeola)', 'Mumps (Rubulavirus)', 'Rubella (German measles)', 'Scarlet fever'],
        correctOptionIndex: 0,
        explanation: 'Koplik spots (small bluish-white spots on an erythematous base inside the cheek) appear 24–48 hours before the generalized maculopapular measles rash.'
      },
      {
        id: 'mb4_q25',
        questionText: 'Which opportunistic bacterial organism thrives in dental unit waterlines (DUWL) and poses inhalation pneumonia risk in immunocompromised patients?',
        options: ['Legionella pneumophila and Pseudomonas aeruginosa', 'Streptococcus pneumoniae', 'Haemophilus influenzae', 'Bordetella pertussis'],
        correctOptionIndex: 0,
        explanation: 'Legionella pneumophila and Pseudomonas colonize narrow dental unit water tubing biofilms, requiring chemical flushing and backflow prevention.'
      }
    ]
  }
];
