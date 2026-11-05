import { Question } from '../types/quiz';

export interface MedicalChemistrySection {
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

export const MEDICAL_CHEMISTRY_SECTIONS: MedicalChemistrySection[] = [
  {
    id: 'mc-section-1',
    sectionNumber: 1,
    fileName: '1.docx',
    titleEn: 'Section 1: General Chemistry, Solutions & Concentrations',
    titleAr: 'القسم الأول: الكيمياء العامة والمحاليل والتركيزات',
    range: '1-25',
    descriptionEn: 'Molarity, molality, osmolarity, colligative properties, chemical equilibrium, and Le Chatelier principle.',
    descriptionAr: 'المولارية، المولالية، الأسمولية، الخواص التجميعية، التوازن الكيميائي، ومبدأ لوشاتيليه.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedChemistry&preview=1.docx',
    questions: [
      {
        id: 'mc1_q1',
        questionText: 'Molarity (M) of a solution is defined as:',
        options: ['Moles of solute per liter of solution (mol/L)', 'Moles of solute per kilogram of solvent', 'Grams of solute per 100 mL of water', 'Equivalents per liter'],
        correctOptionIndex: 0,
        explanation: 'Molarity (M) expresses solute concentration in moles of solute dissolved per liter (L) of total solution volume.'
      },
      {
        id: 'mc1_q2',
        questionText: 'What is the molarity of a 0.9% (w/v) physiological normal saline (NaCl, MW = 58.44 g/mol) solution?',
        options: ['~0.154 M (154 mM)', '0.900 M', '0.015 M', '1.540 M'],
        correctOptionIndex: 0,
        explanation: '0.9% w/v = 9.0 g/L. Dividing by 58.44 g/mol yields ~0.154 mol/L (154 mmol/L of Na+ and Cl-), isotonic with human plasma.'
      },
      {
        id: 'mc1_q3',
        questionText: 'Colligative properties of solutions (such as freezing point depression and osmotic pressure) depend solely on:',
        options: ['The total number (concentration) of dissolved solute particles, regardless of their chemical identity', 'The molecular mass of the solvent', 'The color of the solution', 'The shape of the solute molecules'],
        correctOptionIndex: 0,
        explanation: 'Colligative properties depend strictly on the ratio of solute particle count to solvent molecule count, independent of particle chemical nature.'
      },
      {
        id: 'mc1_q4',
        questionText: 'According to Le Chatelier’s principle, what happens to an endothermic reaction (ΔH > 0) at dynamic equilibrium if the temperature is raised?',
        options: ['The equilibrium shifts toward the right (products) to absorb added heat', 'Shifts toward reactants', 'No shift occurs', 'Reaction stops entirely'],
        correctOptionIndex: 0,
        explanation: 'For endothermic reactions, heat acts as a reactant; raising temperature forces the equilibrium to shift forward (right) to consume excess thermal energy.'
      },
      {
        id: 'mc1_q5',
        questionText: 'The normal human blood plasma osmolarity is tightly maintained physiologically around:',
        options: ['280 to 295 mOsm/L', '100 to 120 mOsm/L', '500 to 600 mOsm/L', '15 to 25 mOsm/L'],
        correctOptionIndex: 0,
        explanation: 'Normal serum osmolality is strictly regulated by antidiuretic hormone (ADH) and thirst within 280–295 mOsm/kg H2O.'
      },
      {
        id: 'mc1_q6',
        questionText: 'Which type of chemical bond involves electrostatic attraction between oppositely charged ions formed by complete electron transfer?',
        options: ['Ionic bond', 'Non-polar covalent bond', 'Coordinate covalent bond', 'Hydrogen bond'],
        correctOptionIndex: 0,
        explanation: 'An ionic bond forms when an electropositive element transfers valence electrons to an electronegative element, yielding cation-anion electrostatic attraction.'
      },
      {
        id: 'mc1_q7',
        questionText: 'A coordinate (dative) covalent bond occurs when:',
        options: ['Both bonding electrons are contributed by only one of the two participating atoms', 'Each atom donates one electron', 'Electrons are completely transferred', 'Protons are shared'],
        correctOptionIndex: 0,
        explanation: 'In a coordinate covalent bond, a Lewis base donates an unshared lone pair into an empty orbital of a Lewis acid (e.g. H+ + NH3 -> NH4+).'
      },
      {
        id: 'mc1_q8',
        questionText: 'Hydrogen bonding occurs primarily when hydrogen is covalently attached to which highly electronegative atoms?',
        options: ['Fluorine, Oxygen, or Nitrogen (F, O, N)', 'Carbon, Sulfur, or Phosphorus', 'Silicon or Chlorine', 'Iron or Copper'],
        correctOptionIndex: 0,
        explanation: 'Hydrogen bonds arise when hydrogen is bonded to strongly electronegative atoms with lone pairs (N, O, F), generating strong dipole-dipole attractions.'
      },
      {
        id: 'mc1_q9',
        questionText: 'The solubility product constant (Ksp) of hydroxyapatite in water describes:',
        options: ['The thermodynamic equilibrium product of dissolved ion activities at saturation', 'The rate of crystal growth', 'The temperature of melting', 'The pH of the solution'],
        correctOptionIndex: 0,
        explanation: 'Ksp represents the equilibrium constant between a solid precipitate and its constituent solvated ions in a saturated aqueous solution at a given temperature.'
      },
      {
        id: 'mc1_q10',
        questionText: 'In a redox reaction, the chemical species that undergoes oxidation:',
        options: ['Loses electrons, resulting in an increase in oxidation state (OIL: Oxidation Is Loss)', 'Gains electrons', 'Loses protons only', 'Remains unchanged'],
        correctOptionIndex: 0,
        explanation: 'Oxidation is defined as the loss of electrons (or increase in oxidation number), while reduction is the gain of electrons (OIL RIG mnemonic).'
      },
      {
        id: 'mc1_q11',
        questionText: 'Which law states that at constant temperature, the volume of a fixed mass of gas is inversely proportional to its pressure (P1V1 = P2V2)?',
        options: ['Boyle’s Law', 'Charles’s Law', 'Gay-Lussac’s Law', 'Henry’s Law'],
        correctOptionIndex: 0,
        explanation: 'Boyle’s law dictates an inverse relationship between gas pressure and volume at isothermal conditions: P · V = constant.'
      },
      {
        id: 'mc1_q12',
        questionText: 'Henry’s Law explains why deep-sea divers suffer decompression sickness ("the bends") by stating that:',
        options: ['The solubility of a gas in a liquid is directly proportional to the partial pressure of that gas above the liquid', 'Gases do not dissolve in blood', 'Gas volume expands with cooling', 'Liquids boil under high pressure'],
        correctOptionIndex: 0,
        explanation: 'Henry’s law (C = k·P) states gas solubility increases with partial pressure; rapid decompression drops pressure, causing dissolved nitrogen to bubble out of blood.'
      },
      {
        id: 'mc1_q13',
        questionText: 'What is the oxidation number of oxygen in hydrogen peroxide (H2O2)?',
        options: ['-1', '-2', '0', '+2'],
        correctOptionIndex: 0,
        explanation: 'In peroxides (like H2O2), the O-O single bond results in each oxygen carrying an unusual oxidation state of -1 rather than the customary -2.'
      },
      {
        id: 'mc1_q14',
        questionText: 'A spontaneous chemical reaction at constant temperature and pressure is strictly characterized by:',
        options: ['A negative change in Gibbs free energy (ΔG < 0)', 'A positive ΔG > 0', 'Zero entropy', 'Endothermic enthalpy only'],
        correctOptionIndex: 0,
        explanation: 'The Second Law of Thermodynamics establishes that a reaction is exergonic and thermodynamically spontaneous if and only if ΔG = ΔH - TΔS < 0.'
      },
      {
        id: 'mc1_q15',
        questionText: 'Which factor will increase the reaction rate constant (k) according to the Arrhenius equation (k = A · e^(-Ea/RT))?',
        options: ['Increasing temperature or lowering activation energy (Ea) via a catalyst', 'Decreasing temperature', 'Increasing activation energy', 'Diluting the reactants'],
        correctOptionIndex: 0,
        explanation: 'The Arrhenius equation demonstrates that reaction rate constants increase exponentially with higher temperature T and lower activation energy barrier Ea.'
      },
      {
        id: 'mc1_q16',
        questionText: 'In thermodynamics, state functions depend only on:',
        options: ['The current state of the system (initial and final states), independent of the path taken', 'The exact mechanical path', 'The duration of the reaction', 'The operator’s technique'],
        correctOptionIndex: 0,
        explanation: 'State functions (enthalpy H, entropy S, Gibbs free energy G, internal energy U) depend solely on initial and final equilibrium states, not the pathway.'
      },
      {
        id: 'mc1_q17',
        questionText: 'What type of solution contains the maximum amount of dissolved solute capable of remaining in equilibrium with undissolved solute at a given temperature?',
        options: ['Saturated solution', 'Unsaturated solution', 'Colloidal suspension', 'Dilute mixture'],
        correctOptionIndex: 0,
        explanation: 'A saturated solution exists at dynamic equilibrium where the rate of dissolution equals the rate of precipitation for that temperature.'
      },
      {
        id: 'mc1_q18',
        questionText: 'Which element is an essential trace nutrient required for thyroid hormone (T3 and T4) synthesis in humans?',
        options: ['Iodine (I)', 'Iron (Fe)', 'Zinc (Zn)', 'Copper (Cu)'],
        correctOptionIndex: 0,
        explanation: 'Iodine is covalently incorporated into tyrosine residues of thyroglobulin by thyroid peroxidase to produce thyroxine (T4) and triiodothyronine (T3).'
      },
      {
        id: 'mc1_q19',
        questionText: 'The Tyndall effect (scattering of light passing through a medium) is a diagnostic characteristic of:',
        options: ['Colloidal dispersions (e.g. milk, aerosol sprays)', 'True homogeneous molecular solutions (e.g. saline)', 'Pure distilled water', 'Vacuum'],
        correctOptionIndex: 0,
        explanation: 'Colloid particles (1–1000 nm) are sufficiently large to scatter visible light rays, illuminating the beam path (Tyndall effect), unlike true solutions.'
      },
      {
        id: 'mc1_q20',
        questionText: 'Freezing point depression of water caused by dissolving 1 mole of glucose versus 1 mole of CaCl2 will be:',
        options: ['Three times greater for CaCl2 because it dissociates into 3 ions (i = 3) compared to non-electrolyte glucose (i = 1)', 'Equal for both', 'Greater for glucose', 'Zero for both'],
        correctOptionIndex: 0,
        explanation: 'Freezing point depression ΔTf = i · Kf · m. CaCl2 dissociates into Ca²+ + 2Cl- (van ’t Hoff factor i=3), depressing freezing point 3-fold more than glucose (i=1).'
      },
      {
        id: 'mc1_q21',
        questionText: 'Electronegativity is defined as:',
        options: ['The relative tendency of an atom in a molecule to attract shared bonding electrons toward itself', 'The energy released when an electron is added', 'The energy required to remove an electron', 'The nuclear charge'],
        correctOptionIndex: 0,
        explanation: 'Electronegativity (Pauling scale) quantifies how strongly an atom attracts shared bonding electrons, with Fluorine being the most electronegative (3.98).'
      },
      {
        id: 'mc1_q22',
        questionText: 'A catalyst accelerates chemical reactions by:',
        options: ['Providing an alternative reaction pathway with a lower activation energy (Ea) without being consumed', 'Shifting the equilibrium constant Keq', 'Increasing the temperature', 'Changing ΔG of the reaction'],
        correctOptionIndex: 0,
        explanation: 'Catalysts lower the activation energy barrier for both forward and reverse reactions equally, increasing speed without altering equilibrium position (Keq) or ΔG.'
      },
      {
        id: 'mc1_q23',
        questionText: 'Standard Temperature and Pressure (STP) in chemistry corresponds to:',
        options: ['0°C (273.15 K) and 1 atmosphere (101.3 kPa)', '25°C and 1 atm', '100°C and 10 atm', '0 K and 0 atm'],
        correctOptionIndex: 0,
        explanation: 'STP is defined as standard temperature 0°C (273.15 K) and standard pressure of 1 atm (760 mmHg or 101.325 kPa), where 1 mol ideal gas occupies 22.4 L.'
      },
      {
        id: 'mc1_q24',
        questionText: 'Which intermolecular force is present between ALL molecules, including non-polar noble gases and alkanes?',
        options: ['London dispersion forces (induced dipole-induced dipole)', 'Dipole-dipole interactions', 'Hydrogen bonding', 'Ion-dipole forces'],
        correctOptionIndex: 0,
        explanation: 'London dispersion forces arise from instantaneous temporary quantum fluctuations in electron clouds, creating fleeting induced dipoles present in all matter.'
      },
      {
        id: 'mc1_q25',
        questionText: 'In an isolated thermodynamic system:',
        options: ['Neither matter nor energy can be exchanged with the surroundings', 'Energy can be exchanged but matter cannot (closed system)', 'Both matter and energy can be exchanged (open system)', 'Temperature is always zero'],
        correctOptionIndex: 0,
        explanation: 'An isolated system is completely insulated from its environment, permitting zero transfer of either matter or thermal energy across its boundary.'
      }
    ]
  },
  {
    id: 'mc-section-2',
    sectionNumber: 2,
    fileName: '2.docx',
    titleEn: 'Section 2: Acids, Bases, Buffers & Salivary Chemistry',
    titleAr: 'القسم الثاني: الأحماض والقواعد والمحاليل المنظمة وكيمياء اللعاب',
    range: '26-50',
    descriptionEn: 'pH calculations, Bronsted-Lowry theory, Henderson-Hasselbalch equation, bicarbonate buffer, and Stephan curve.',
    descriptionAr: 'حسابات الرقم الهيدروجيني، نظرية برونستد، معادلة هندرسون-هاسلبالخ، منظم البيكربونات، ومنحنى ستيفان.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedChemistry&preview=2.docx',
    questions: [
      {
        id: 'mc2_q1',
        questionText: 'The pH of an aqueous solution is defined mathematically as:',
        options: ['-log10 [H+] (negative logarithm of hydrogen ion activity)', 'log10 [OH-]', 'ln [H+]', '14 + [H+]'],
        correctOptionIndex: 0,
        explanation: 'Sørensen defined pH as pH = -log10 [H3O+]. Each unit decrease in pH represents a tenfold (10×) increase in hydronium ion concentration.'
      },
      {
        id: 'mc2_q2',
        questionText: 'According to the Brønsted-Lowry definition, an acid is a:',
        options: ['Proton (H+) donor', 'Proton (H+) acceptor', 'Electron pair donor (Lewis base)', 'Hydroxide donor only'],
        correctOptionIndex: 0,
        explanation: 'Brønsted-Lowry theory defines acids as chemical species capable of donating a proton (H+), and bases as proton acceptors.'
      },
      {
        id: 'mc2_q3',
        questionText: 'What is the pH of a 0.001 M (10^-3 M) solution of hydrochloric acid (HCl), assuming complete dissociation?',
        options: ['3.0', '1.0', '7.0', '11.0'],
        correctOptionIndex: 0,
        explanation: 'For a strong monoprotic acid like HCl, [H+] = 0.001 M = 10^-3 M. pH = -log(10^-3) = 3.0.'
      },
      {
        id: 'mc2_q4',
        questionText: 'The Henderson-Hasselbalch equation used to calculate the pH of a buffer system is:',
        options: ['pH = pKa + log10 ([Conjugate Base] / [Weak Acid])', 'pH = pKa - log10 ([Base] / [Acid])', 'pH = [H+] × [OH-]', 'pH = pKb + log10 ([Acid] / [Base])'],
        correctOptionIndex: 0,
        explanation: 'The Henderson-Hasselbalch equation pH = pKa + log([A-]/[HA]) relates solution pH to weak acid dissociation constant pKa and the ratio of base to acid.'
      },
      {
        id: 'mc2_q5',
        questionText: 'Which buffer system serves as the primary and most effective physiological buffer in human stimulated saliva?',
        options: ['Bicarbonate / Carbonic acid buffer system (HCO3- / H2CO3)', 'Phosphate buffer system (HPO4²- / H2PO4-)', 'Protein buffer system', 'Ammonia buffer'],
        correctOptionIndex: 0,
        explanation: 'In stimulated saliva, carbonic anhydrase VI generates abundant bicarbonate (HCO3-), whose concentration rises to >30–60 mM, buffering plaque acids.'
      },
      {
        id: 'mc2_q6',
        questionText: 'In resting (unstimulated) human saliva, which buffer system provides the predominant buffering capacity?',
        options: ['Inorganic phosphate buffer system (HPO4²- / H2PO4-)', 'Bicarbonate buffer system', 'Lactate buffer', 'Fluoride buffer'],
        correctOptionIndex: 0,
        explanation: 'In slow resting saliva, bicarbonate levels are low (~5 mM); inorganic phosphate (pKa ≈ 6.8) acts as the primary buffer stabilizing oral resting pH.'
      },
      {
        id: 'mc2_q7',
        questionText: 'The Stephan Curve in dental cariology depicts which critical phenomenon?',
        options: ['The rapid drop in dental plaque pH following sugar exposure and its slow gradual recovery over 30 to 45 minutes', 'The wear of enamel over 10 years', 'The increase in salivary flow rate', 'The rate of dental eruption'],
        correctOptionIndex: 0,
        explanation: 'Robert Stephan demonstrated that rinsing with glucose causes plaque pH to plunge below 5.0 within 5 minutes, followed by a slow 30–60 min recovery back to baseline.'
      },
      {
        id: 'mc2_q8',
        questionText: 'A chemical buffer solution exhibits its maximum buffering capacity when:',
        options: ['pH = pKa (where [Conjugate Base] = [Weak Acid])', 'pH = 14', 'pH = 0', '[Weak Acid] is zero'],
        correctOptionIndex: 0,
        explanation: 'Buffers resist pH changes most effectively within ±1 unit of their pKa, reaching maximum buffer capacity when [A-] = [HA] and pH = pKa.'
      },
      {
        id: 'mc2_q9',
        questionText: 'What is the ion product constant of pure water (Kw) at 25°C?',
        options: ['1.0 × 10^-14 (mol/L)²', '1.0 × 10^-7', '1.0 × 10^-1', '14.0'],
        correctOptionIndex: 0,
        explanation: 'In pure water at 25°C, autoionization yields Kw = [H3O+][OH-] = (10^-7)(10^-7) = 1.0 × 10^-14, ensuring pH + pOH = 14.'
      },
      {
        id: 'mc2_q10',
        questionText: 'A Lewis base is defined chemically as any molecular species that can:',
        options: ['Donate an electron pair to form a coordinate bond', 'Accept an electron pair', 'Donate a proton', 'Produce hydronium ions'],
        correctOptionIndex: 0,
        explanation: 'G.N. Lewis defined bases as electron-pair donors (e.g. NH3, H2O) and acids as electron-pair acceptors (e.g. BF3, H+).'
      },
      {
        id: 'mc2_q11',
        questionText: 'Normal physiological human arterial blood pH is tightly regulated within which narrow range?',
        options: ['7.35 to 7.45', '6.80 to 7.00', '7.00 to 7.20', '7.80 to 8.00'],
        correctOptionIndex: 0,
        explanation: 'Extracellular arterial blood pH is tightly defended between 7.35 and 7.45; values below 7.35 indicate acidosis, and above 7.45 indicate alkalosis.'
      },
      {
        id: 'mc2_q12',
        questionText: 'In respiratory acidosis, hypoventilation leads to an accumulation of:',
        options: ['Dissolved carbon dioxide (PCO2 > 45 mmHg) and carbonic acid in blood', 'Excess bicarbonate', 'Low lactic acid', 'High oxygen tension'],
        correctOptionIndex: 0,
        explanation: 'Inadequate alveolar ventilation retains CO2 (hypercapnia), driving the equilibrium CO2 + H2O ⇌ H2CO3 ⇌ H+ + HCO3- to the right, lowering blood pH.'
      },
      {
        id: 'mc2_q13',
        questionText: 'In metabolic acidosis (such as diabetic ketoacidosis), the primary biochemical alteration is:',
        options: ['A reduction in serum bicarbonate ([HCO3-] < 22 mEq/L)', 'An increase in arterial PCO2', 'Loss of blood hydrogen ions', 'Excessive salivary flow'],
        correctOptionIndex: 0,
        explanation: 'Metabolic acidosis is initiated by consumption of bicarbonate buffers by organic acids (ketoacids or lactic acid), reducing plasma [HCO3-].'
      },
      {
        id: 'mc2_q14',
        questionText: 'Which weak organic acid is produced abundantly by Streptococcus mutans fermenting dietary carbohydrates, driving dental enamel demineralization?',
        options: ['Lactic acid', 'Acetic acid', 'Citric acid', 'Carbonic acid'],
        correctOptionIndex: 0,
        explanation: 'S. mutans uses homolactic fermentation to convert sucrose into lactic acid (pKa ≈ 3.86), dropping oral biofilm pH below the critical threshold of 5.5.'
      },
      {
        id: 'mc2_q15',
        questionText: 'The conjugate base of carbonic acid (H2CO3) is:',
        options: ['Bicarbonate ion (HCO3-)', 'Carbonate ion (CO3²-)', 'Carbon dioxide (CO2)', 'Hydroxide ion (OH-)'],
        correctOptionIndex: 0,
        explanation: 'When carbonic acid (H2CO3) donates one proton, it forms its conjugate base, the bicarbonate ion (HCO3-).'
      },
      {
        id: 'mc2_q16',
        questionText: 'Which enzyme in erythrocytes and salivary serous acinar cells rapidly catalyzes the interconversion of CO2 + H2O ⇌ H2CO3?',
        options: ['Carbonic Anhydrase', 'Alkaline phosphatase', 'Amylase', 'Lysozyme'],
        correctOptionIndex: 0,
        explanation: 'Carbonic anhydrase accelerates the reversible hydration of CO2 more than a million-fold, crucial for respiratory gas transport and salivary bicarbonate secretion.'
      },
      {
        id: 'mc2_q17',
        questionText: 'A solution with a pOH of 4.0 at 25°C has a pH of:',
        options: ['10.0 (basic)', '4.0 (acidic)', '7.0 (neutral)', '14.0'],
        correctOptionIndex: 0,
        explanation: 'Since pH + pOH = 14 at 25°C, a solution with pOH = 4.0 has pH = 14 - 4 = 10.0, which is alkaline/basic.'
      },
      {
        id: 'mc2_q18',
        questionText: 'What term describes a chemical substance (such as water or amino acids) that can act as either an acid or a base depending on conditions?',
        options: ['Amphoteric (amphiprotic)', 'Anionic only', 'Aprotic', 'Zwitterion only'],
        correctOptionIndex: 0,
        explanation: 'Amphoteric substances can donate or accept protons; water behaves as an acid toward ammonia (NH3) and as a base toward hydrochloric acid (HCl).'
      },
      {
        id: 'mc2_q19',
        questionText: 'In acid-base titrations, the equivalence point is reached when:',
        options: ['The moles of added titrant acid/base stoichiometrically equal the moles of analyte present', 'The pH is exactly 7 always', 'The indicator changes color (endpoint)', 'The solution boils'],
        correctOptionIndex: 0,
        explanation: 'The equivalence point is the exact stoichiometric point where chemically equivalent quantities of acid and base have reacted.'
      },
      {
        id: 'mc2_q20',
        questionText: 'The common ion effect states that adding a salt containing a common ion to a weak acid solution will:',
        options: ['Suppress the ionization of the weak acid and shift equilibrium to the left', 'Increase acid dissociation', 'Neutralize the solution completely', 'Precipitate all water'],
        correctOptionIndex: 0,
        explanation: 'Adding sodium acetate (NaAc) to acetic acid (HAc) adds common acetate ions (Ac-), which by Le Chatelier’s principle suppresses HAc dissociation and raises pH.'
      },
      {
        id: 'mc2_q21',
        questionText: 'Which salivary protein is rich in basic histidine residues and acts as a primary antifungal peptide against Candida albicans?',
        options: ['Histatins', 'Proline-rich proteins (PRPs)', 'Mucin MG1', 'Amylase'],
        correctOptionIndex: 0,
        explanation: 'Histatins are small salivary antimicrobial peptides rich in histidine that buffer oral acids and disrupt fungal mitochondrial membranes in Candida species.'
      },
      {
        id: 'mc2_q22',
        questionText: 'Erosion of teeth (extrinsic acid dissolution) differs from dental caries because erosion:',
        options: ['Is caused by direct chemical dissolution from non-bacterial acids (gastric reflux, citrus juices, carbonated sodas)', 'Requires bacterial plaque fermentation', 'Occurs only on root surfaces', 'Is caused by fluoride excess'],
        correctOptionIndex: 0,
        explanation: 'Dental erosion is sterile, non-bacterial acid demineralization caused by dietary acids (citric/phosphoric acid in drinks) or intrinsic gastric acid (GERD/bulimia).'
      },
      {
        id: 'mc2_q23',
        questionText: 'Gastric hydrochloric acid in human stomach secretions has a typical resting pH of:',
        options: ['1.0 to 2.0', '5.5 to 6.5', '7.4', '9.0'],
        correctOptionIndex: 0,
        explanation: 'Parietal cells secrete HCl at a concentration of ~0.1 M, generating a fiercely acidic luminal pH of 1.0–2.0 to activate pepsinogen and kill swallowed pathogens.'
      },
      {
        id: 'mc2_q24',
        questionText: 'Alkaline phosphatase (ALP) enzyme in osteoblasts and the periodontal ligament operates optimally at:',
        options: ['Basic pH (~9.5–10.5) to hydrolyze pyrophosphate inhibitors and promote mineral precipitation', 'Acidic pH 2.0', 'Neutral pH 7.0 only', 'pH 1.0'],
        correctOptionIndex: 0,
        explanation: 'Alkaline phosphatase has an optimal pH of ~9.8; it cleaves organic phosphates to liberate orthophosphate ions, promoting calcium hydroxyapatite nucleation.'
      },
      {
        id: 'mc2_q25',
        questionText: 'Sialometry measures the salivary flow rate. Normal stimulated whole salivary flow rate in adults is approximately:',
        options: ['1.0 to 2.0 mL per minute (hyposalivation is defined as <0.5–0.7 mL/min)', '10.0 mL per minute', '0.01 mL per minute', '50 mL per minute'],
        correctOptionIndex: 0,
        explanation: 'Normal stimulated saliva ranges between 1.0–2.5 mL/min; stimulated rates below 0.7 mL/min or unstimulated rates below 0.1 mL/min signify clinical xerostomia.'
      }
    ]
  },
  {
    id: 'mc-section-3',
    sectionNumber: 3,
    fileName: '3.docx',
    titleEn: 'Section 3: Organic Chemistry & Functional Groups',
    titleAr: 'القسم الثالث: الكيمياء العضوية والمجموعات الوظيفية',
    range: '51-75',
    descriptionEn: 'Hybridization (sp3, sp2, sp), chirality, isomerism, carbonyls, esters, carboxylic acids, and polymerization.',
    descriptionAr: 'التهجين، التناظر المرآتي، المتصاوغات، الكاربونيل، الإسترات، الأحماض الكربوكسيلية، والبلمرة.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedChemistry&preview=3.docx',
    questions: [
      {
        id: 'mc3_q1',
        questionText: 'A carbon atom that forms four single covalent bonds adopts which orbital hybridization and geometric bond angle?',
        options: ['sp3 hybridization with tetrahedral geometry (109.5°)', 'sp2 hybridization with trigonal planar (120°)', 'sp hybridization linear (180°)', 'dsp3 bipyramidal'],
        correctOptionIndex: 0,
        explanation: 'Carbon atoms with four single sigma bonds (like methane CH4) hybridize one 2s and three 2p orbitals into four sp3 hybrid orbitals arranged tetrahedrally at 109.5°.'
      },
      {
        id: 'mc3_q2',
        questionText: 'A chiral (asymmetric) carbon center in an organic molecule is bonded to:',
        options: ['Four distinctly different chemical groups or atoms', 'Two identical methyl groups', 'At least one double bond', 'A symmetric plane'],
        correctOptionIndex: 0,
        explanation: 'A carbon bonded to four chemically distinct substituents lacks an internal plane of symmetry, making the molecule non-superimposable on its mirror image (chiral).'
      },
      {
        id: 'mc3_q3',
        questionText: 'Molecules that are non-superimposable mirror images of each other are called:',
        options: ['Enantiomers (optical isomers)', 'Diastereomers', 'Constitutional isomers', 'Conformational isomers'],
        correctOptionIndex: 0,
        explanation: 'Enantiomers are stereoisomers that relate as non-superimposable mirror reflections, possessing identical physical properties except for the direction they rotate plane-polarized light.'
      },
      {
        id: 'mc3_q4',
        questionText: 'Which functional group characterizes carboxylic acids?',
        options: ['-COOH (carboxyl group)', '-CHO (aldehyde group)', '-OH (hydroxyl group)', '-NH2 (amino group)'],
        correctOptionIndex: 0,
        explanation: 'Carboxylic acids contain a carbonyl bonded to a hydroxyl group (-C(=O)OH), capable of dissociating a proton to form carboxylate anions (-COO-).'
      },
      {
        id: 'mc3_q5',
        questionText: 'Esters are formed by the condensation reaction between:',
        options: ['A carboxylic acid and an alcohol, with the elimination of water', 'An aldehyde and a ketone', 'Two amines', 'An alkane and an alkene'],
        correctOptionIndex: 0,
        explanation: 'Fischer esterification reacts a carboxylic acid with an alcohol in the presence of an acid catalyst, yielding an ester (-COOR) and water.'
      },
      {
        id: 'mc3_q6',
        questionText: 'Which functional group is present in aldehydes but absent in ketones?',
        options: ['A carbonyl carbon bonded to at least one hydrogen atom (-CH=O at the chain terminus)', 'A carbon-carbon double bond', 'An ether linkage', 'A benzene ring'],
        correctOptionIndex: 0,
        explanation: 'Aldehydes possess a terminal carbonyl group bonded to at least one hydrogen (R-CHO), whereas ketones have a carbonyl flanked by two carbon atoms (R-CO-R).'
      },
      {
        id: 'mc3_q7',
        questionText: 'Primary alcohols upon oxidation with strong oxidizing agents (e.g. KMnO4) are converted sequentially into:',
        options: ['Aldehydes, and subsequently into carboxylic acids', 'Ketones', 'Ethers directly', 'Alkanes'],
        correctOptionIndex: 0,
        explanation: 'Oxidation of a primary alcohol (R-CH2OH) yields an intermediate aldehyde (R-CHO), which readily oxidizes further to a carboxylic acid (R-COOH).'
      },
      {
        id: 'mc3_q8',
        questionText: 'Secondary alcohols upon controlled oxidation yield:',
        options: ['Ketones (R-CO-R)', 'Carboxylic acids', 'Esters', 'Alkenes'],
        correctOptionIndex: 0,
        explanation: 'Secondary alcohols (R-CH(OH)-R) oxidize to form ketones; ketones resist further oxidation under mild conditions because breaking a C-C bond is required.'
      },
      {
        id: 'mc3_q9',
        questionText: 'Eugenol (oil of cloves), widely used in zinc oxide-eugenol (ZOE) temporary dental cements, contains which key aromatic functional groups?',
        options: ['A phenol ring with methoxy and allyl substituents', 'An aliphatic carboxylic acid only', 'An ester and a primary amine', 'A halogenated alkene'],
        correctOptionIndex: 0,
        explanation: 'Eugenol (4-allyl-2-methoxyphenol) is an allyl-substituted guaiacol; its phenolic hydroxyl coordinates with zinc ions to form a chelate cement matrix.'
      },
      {
        id: 'mc3_q10',
        questionText: 'Free-radical addition polymerization of dental resin monomers (such as methyl methacrylate) proceeds through which three sequential phases?',
        options: ['Initiation, Propagation, and Termination', 'Hydrolysis, Esterification, and Condensation', 'Oxidation, Reduction, and Chelation', 'Denaturation, Renaturation, and Elongation'],
        correctOptionIndex: 0,
        explanation: 'Free-radical polymerization begins with initiator radical generation (initiation), rapid chain growth across double bonds (propagation), and radical annihilation (termination).'
      },
      {
        id: 'mc3_q11',
        questionText: 'Which compound is the universally employed cross-linking dimethacrylate monomer in modern dental resin composites?',
        options: ['Bis-GMA (Bisphenol A-glycidyl methacrylate)', 'Polyethylene', 'Teflon (PTFE)', 'Polystyrene'],
        correctOptionIndex: 0,
        explanation: 'Developed by Rafael Bowen in 1962, Bis-GMA features rigid aromatic rings and dual methacrylate end-groups, conferring high strength, stiffness, and cross-linking.'
      },
      {
        id: 'mc3_q12',
        questionText: 'Triethylene glycol dimethacrylate (TEGDMA) is added to dental composite resin formulations primarily to:',
        options: ['Reduce viscosity and allow higher filler loading', 'Increase polymerization shrinkage', 'Darken the resin color', 'Inhibit the curing light'],
        correctOptionIndex: 0,
        explanation: 'Bis-GMA is extremely viscous (almost solid at room temperature); low-molecular-weight TEGDMA dilutes the resin matrix, enabling clinical flow and filler incorporation.'
      },
      {
        id: 'mc3_q13',
        questionText: 'In addition polymerization, benzoyl peroxide (BPO) paired with an aromatic tertiary amine (e.g. DHEPT) forms what type of initiation system?',
        options: ['Chemical (cold/self-cure) redox initiation system', 'Photo-cured blue light system', 'Thermal autoclave system', 'Ultrasonic curing system'],
        correctOptionIndex: 0,
        explanation: 'In self-curing (chemically activated) resins, a tertiary aromatic amine reduces benzoyl peroxide at room temperature to generate initiating free radicals.'
      },
      {
        id: 'mc3_q14',
        questionText: 'Inhibition of dental resin polymerization by atmospheric oxygen occurs because:',
        options: ['Molecular oxygen reacts with free radicals to form unreactive peroxy radicals, creating an unpolymerized "oxygen-inhibited layer"', 'Oxygen melts methacrylate', 'Oxygen absorbs blue light', 'Oxygen freezes the resin'],
        correctOptionIndex: 0,
        explanation: 'O2 quenches free radicals rapidly, forming stable peroxy radicals (R-O-O·) that cannot propagate, leaving a sticky, unpolymerized superficial layer on composite surfaces.'
      },
      {
        id: 'mc3_q15',
        questionText: 'An amide bond (peptide bond) in biological and synthetic polymers is formed by the reaction between:',
        options: ['A carboxylic acid group and an amino group (-CO-NH-)', 'Two hydroxyl groups (-O-)', 'An alcohol and an aldehyde', 'A thiol and a ketone'],
        correctOptionIndex: 0,
        explanation: 'Amide bonds result from condensation of an acyl group with an amine, creating the stable planar resonance structure -C(=O)-NH- that links amino acids.'
      },
      {
        id: 'mc3_q16',
        questionText: 'Geometric isomerism (cis-trans or E/Z isomerism) in organic molecules requires:',
        options: ['Restricted rotation around a carbon-carbon double bond or ring with two different groups on each carbon', 'A chiral center', 'A triple bond', 'A single carbon-carbon bond'],
        correctOptionIndex: 0,
        explanation: 'The pi bond prevents free rotation; if each sp2 carbon carries two different substituents, distinct cis (Z, same side) and trans (E, opposite sides) isomers exist.'
      },
      {
        id: 'mc3_q17',
        questionText: 'Saponification is the base-catalyzed hydrolysis of an ester resulting in the formation of:',
        options: ['A carboxylate salt (soap) and an alcohol (glycerol)', 'An ether and an aldehyde', 'An alkene and water', 'A polymer'],
        correctOptionIndex: 0,
        explanation: 'Heating triglycerides with a strong base (NaOH or KOH) hydrolyzes ester linkages into glycerol and sodium/potassium fatty acid salts (soaps).'
      },
      {
        id: 'mc3_q18',
        questionText: 'Which functional group contains a sulfur atom bonded to a hydrogen atom (-SH) and forms disulfide cross-links in keratin?',
        options: ['Thiol (sulfhydryl group)', 'Thioester', 'Sulfate', 'Sulfoxide'],
        correctOptionIndex: 0,
        explanation: 'Thiols (-SH, as in cysteine amino acid residues) oxidize to form covalent disulfide bonds (-S-S-), crucial for tertiary protein stabilization.'
      },
      {
        id: 'mc3_q19',
        questionText: 'Aromaticity in organic chemistry (such as in benzene, C6H6) requires which conditions according to Hückel’s Rule?',
        options: ['Planar, fully conjugated monocyclic ring with (4n + 2) pi electrons (where n is an integer)', 'Any ring with 4 pi electrons', 'Non-planar saturated chains', 'Odd number of carbons only'],
        correctOptionIndex: 0,
        explanation: 'Hückel’s rule requires a cyclic, planar, continuously conjugated ring with (4n + 2) pi electrons (e.g. 6 pi electrons for n=1 in benzene), imparting immense resonance stabilization.'
      },
      {
        id: 'mc3_q20',
        questionText: 'Which functional group is characterized by an oxygen atom bonded between two carbon alkyl groups (R-O-R)?',
        options: ['Ether', 'Ester', 'Peroxide', 'Anhydride'],
        correctOptionIndex: 0,
        explanation: 'Ethers have the general structure R-O-R; diethyl ether was historically the first general inhalation anesthetic used in dentistry by Horace Wells and William Morton.'
      },
      {
        id: 'mc3_q21',
        questionText: 'Formocresol, historically used in primary tooth pulpotomies, contains formaldehyde which acts biochemically by:',
        options: ['Cross-linking bacterial and pulp proteins via methylene bridges, causing tissue fixation', 'Dissolving enamel', 'Stimulating odontoblasts', 'Inducing mineralization'],
        correctOptionIndex: 0,
        explanation: 'Formaldehyde cross-links amino and sulfhydryl groups in proteins, fixing tissue, coagulating pulp cells, and rendering proteins non-degradable.'
      },
      {
        id: 'mc3_q22',
        questionText: 'Polyacrylic acid is the essential polymeric liquid component of which dental restorative cements?',
        options: ['Glass Ionomer Cements (GIC) and zinc polycarboxylate cements', 'Zinc phosphate cement', 'Resin composite', 'Gutta-percha'],
        correctOptionIndex: 0,
        explanation: 'Polyacrylic acid (copolymerized with itaconic or maleic acid) provides pendant -COOH groups that chelate calcium in fluoroaluminosilicate glass and natural hydroxyapatite.'
      },
      {
        id: 'mc3_q23',
        questionText: 'Silane coupling agents (such as gamma-methacryloxypropyltrimethoxysilane) in dental composites bond:',
        options: ['Inorganic glass silica filler particles to the organic dimethacrylate resin matrix', 'Enamel to dentin', 'Gold to porcelain', 'Amalgam to cavity wall'],
        correctOptionIndex: 0,
        explanation: 'Silanes are bifunctional molecules: their methoxy groups hydrolyze and condense with silica filler surfaces, while their methacrylate groups copolymerize with the resin matrix.'
      },
      {
        id: 'mc3_q24',
        questionText: 'During addition polymerization, volumetric polymerization shrinkage of dental composites occurs because:',
        options: ['Weak van der Waals distances between monomer molecules (~0.4 nm) are converted into tight covalent carbon-carbon bonds (~0.15 nm)', 'Water evaporates', 'Air bubbles escape', 'Fillers expand'],
        correctOptionIndex: 0,
        explanation: 'As liquid monomers join into covalent polymer chains, intermolecular spaces shorten from ~4.0 Å to ~1.54 Å, causing a 1.5% to 4% volumetric shrinkage that generates contraction stress.'
      },
      {
        id: 'mc3_q25',
        questionText: 'Which organic acid is the active demineralizing agent in standard 37% phosphoric acid dental etching gels?',
        options: ['Orthophosphoric acid (H3PO4)', 'Citric acid', 'Polyacrylic acid', 'Hydrofluoric acid'],
        correctOptionIndex: 0,
        explanation: 'Standard 35%–37% phosphoric acid selectively dissolves enamel prism cores or peripheries, creating microporosities (depth ~5–50 µm) for micromechanical resin tag retention.'
      }
    ]
  },
  {
    id: 'mc-section-4',
    sectionNumber: 4,
    fileName: '4.docx',
    titleEn: 'Section 4: Carbohydrates & Energy Metabolism',
    titleAr: 'القسم الرابع: الكربوهيدرات واستقلاب الطاقة',
    range: '76-100',
    descriptionEn: 'Monosaccharides, disaccharides, glycolysis, Krebs cycle, electron transport chain, ATP yield, and glycogen.',
    descriptionAr: 'السكريات الأحادية والثنائية، التحلل السكري، دورة كريبس، سلسلة نقل الإلكترون، وإنتاج الطاقة.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedChemistry&preview=4.docx',
    questions: [
      {
        id: 'mc4_q1',
        questionText: 'Glucose and galactose are stereoisomers that differ in configuration only around carbon-4; this makes them:',
        options: ['C-4 epimers', 'Enantiomers', 'Anomers', 'Constitutional isomers'],
        correctOptionIndex: 0,
        explanation: 'Epimers are diastereomers that differ in stereochemical configuration at only one single asymmetric carbon atom; glucose and galactose are C-4 epimers.'
      },
      {
        id: 'mc4_q2',
        questionText: 'Sucrose (table sugar) is a non-reducing disaccharide composed of which two monosaccharide units linked by an alpha-1,beta-2-glycosidic bond?',
        options: ['Glucose and Fructose', 'Glucose and Galactose (Lactose)', 'Glucose and Glucose (Maltose)', 'Fructose and Galactose'],
        correctOptionIndex: 0,
        explanation: 'Sucrose is composed of alpha-D-glucopyranose and beta-D-fructofuranose linked through their anomeric carbons, making both anomeric centers non-reducing.'
      },
      {
        id: 'mc4_q3',
        questionText: 'Under anaerobic conditions in human muscle or oral cariogenic bacteria, pyruvate is reduced to lactate by which enzyme to regenerate NAD+?',
        options: ['Lactate Dehydrogenase (LDH)', 'Pyruvate kinase', 'Pyruvate carboxylase', 'Aldolase'],
        correctOptionIndex: 0,
        explanation: 'Lactate dehydrogenase reduces pyruvate to lactate using NADH + H+, regenerating NAD+ so that anaerobic glycolysis (substrate-level phosphorylation) can continue.'
      },
      {
        id: 'mc4_q4',
        questionText: 'The net yield of ATP produced per single molecule of glucose through aerobic glycolysis (from glucose to two pyruvates) is:',
        options: ['2 net ATP (4 produced minus 2 consumed)', '32 net ATP', '0 ATP', '8 net ATP'],
        correctOptionIndex: 0,
        explanation: 'Glycolysis consumes 2 ATP in the preparatory phase (hexokinase and PFK-1) and produces 4 ATP in the payoff phase, yielding a net gain of 2 ATP and 2 NADH.'
      },
      {
        id: 'mc4_q5',
        questionText: 'Which enzyme serves as the committed, rate-limiting, and primary allosterically regulated pacemaker step of glycolysis?',
        options: ['Phosphofructokinase-1 (PFK-1)', 'Hexokinase', 'Pyruvate kinase', 'Triose phosphate isomerase'],
        correctOptionIndex: 0,
        explanation: 'PFK-1 catalyzes the irreversible phosphorylation of fructose-6-phosphate to fructose-1,6-bisphosphate, inhibited by ATP/citrate and stimulated by AMP/fructose-2,6-bisphosphate.'
      },
      {
        id: 'mc4_q6',
        questionText: 'In the mitochondrial matrix, the Pyruvate Dehydrogenase Complex (PDC) irreversibly converts pyruvate into:',
        options: ['Acetyl-CoA, releasing CO2 and producing NADH', 'Lactate', 'Oxaloacetate', 'Ethanol'],
        correctOptionIndex: 0,
        explanation: 'PDC carries out oxidative decarboxylation: Pyruvate + CoA + NAD+ -> Acetyl-CoA + CO2 + NADH, linking glycolysis to the citric acid cycle.'
      },
      {
        id: 'mc4_q7',
        questionText: 'The citric acid cycle (Krebs cycle) takes place in which cellular compartment in eukaryotes?',
        options: ['Mitochondrial matrix', 'Cytosol', 'Intermembrane space', 'Nucleus'],
        correctOptionIndex: 0,
        explanation: 'All enzymes of the Krebs cycle (except inner-membrane bound succinate dehydrogenase) reside dissolved in the soluble mitochondrial matrix.'
      },
      {
        id: 'mc4_q8',
        questionText: 'Each turn of the citric acid cycle oxidizing one molecule of Acetyl-CoA generates:',
        options: ['3 NADH, 1 FADH2, 1 GTP (ATP), and 2 CO2', '1 NADH and 1 FADH2 only', '10 ATP directly', '6 CO2'],
        correctOptionIndex: 0,
        explanation: 'One turn of the Krebs cycle produces 3 NADH, 1 FADH2, and 1 GTP (substrate-level phosphorylation), while releasing 2 molecules of carbon dioxide.'
      },
      {
        id: 'mc4_q9',
        questionText: 'During oxidative phosphorylation, the proton motive force that drives ATP Synthase (Complex V) is established by:',
        options: [
          'Pumping of protons (H+) from the mitochondrial matrix into the intermembrane space by Complexes I, III, and IV',
          'Pumping electrons into the cytosol',
          'Direct sodium transport',
          'Water splitting'
        ],
        correctOptionIndex: 0,
        explanation: 'Electron transport across Complexes I, III, and IV translocates protons into the intermembrane space, generating an electrochemical gradient (chemiosmotic coupling).'
      },
      {
        id: 'mc4_q10',
        questionText: 'What is the final terminal electron acceptor in the mitochondrial electron transport chain during aerobic respiration?',
        options: ['Molecular oxygen (O2), which is reduced to water (H2O)', 'Carbon dioxide', 'NAD+', 'Cytochrome c'],
        correctOptionIndex: 0,
        explanation: 'Cytochrome c oxidase (Complex IV) transfers four electrons and four protons to molecular oxygen (O2 + 4e- + 4H+ -> 2 H2O), the final terminal electron acceptor.'
      },
      {
        id: 'mc4_q11',
        questionText: 'Carbon monoxide (CO) and cyanide (CN-) are lethal poisons that arrest aerobic ATP production by inhibiting:',
        options: ['Cytochrome c oxidase (Complex IV)', 'Complex I (NADH dehydrogenase)', 'ATP Synthase directly', 'Hexokinase'],
        correctOptionIndex: 0,
        explanation: 'Cyanide and carbon monoxide bind with high affinity to ferric (Fe³+) and ferrous (Fe²+) iron in the heme of cytochrome c oxidase, blocking electron transfer to O2.'
      },
      {
        id: 'mc4_q12',
        questionText: 'The Pentose Phosphate Pathway (hexose monophosphate shunt) produces which two vital biochemical products?',
        options: ['NADPH (for reductive biosynthesis and glutathione defense) and Ribose-5-phosphate (for nucleotide synthesis)', 'ATP and NADH', 'Lactate and pyruvate', 'Glycogen'],
        correctOptionIndex: 0,
        explanation: 'The PPP does not produce ATP; its primary functions are generating cytosolic NADPH for anabolic lipid synthesis/antioxidant defense and ribose-5-phosphate for RNA/DNA.'
      },
      {
        id: 'mc4_q13',
        questionText: 'Glucose-6-phosphate dehydrogenase (G6PD) deficiency makes red blood cells susceptible to hemolytic anemia under oxidative stress because of impaired production of:',
        options: ['NADPH, preventing regeneration of reduced glutathione (GSH)', 'ATP', 'Hemoglobin', 'Insulin'],
        correctOptionIndex: 0,
        explanation: 'Without G6PD (the first enzyme of the PPP), erythrocytes cannot produce NADPH to reduce glutathione, leaving membranes vulnerable to oxidative hemolysis by drugs (e.g. primaquine).'
      },
      {
        id: 'mc4_q14',
        questionText: 'Glycogen is a branched storage polysaccharide of D-glucose characterized by which linkages?',
        options: ['Alpha-1,4-glycosidic bonds with alpha-1,6 branches every 8 to 12 residues', 'Beta-1,4 linkages (cellulose)', 'Alpha-1,2 bonds only', 'Beta-1,6 branches only'],
        correctOptionIndex: 0,
        explanation: 'Glycogen chains consist of alpha-1,4-linked glucose units with alpha-1,6-glycosidic branch points every 8–12 units, enabling rapid multi-terminal phosphorolysis.'
      },
      {
        id: 'mc4_q15',
        questionText: 'The hormone insulin promotes glucose homeostasis after meals primarily by stimulating:',
        options: ['GLUT4 translocation to muscle/adipose membranes, glycogenesis, and glycolysis', 'Glycogenolysis and gluconeogenesis', 'Lipolysis', 'Ketogenesis'],
        correctOptionIndex: 0,
        explanation: 'Insulin signals the fed state, driving GLUT4 glucose transporters to the cell surface in muscle and fat while activating glycogen synthase and inhibiting gluconeogenesis.'
      },
      {
        id: 'mc4_q16',
        questionText: 'Glucagon and epinephrine stimulate rapid glycogen breakdown (glycogenolysis) in liver via which secondary messenger cascade?',
        options: ['Activation of adenylate cyclase, elevating cyclic AMP (cAMP) and activating Protein Kinase A (PKA)', 'Calcium influx only', 'Inositol trisphosphate (IP3)', 'cGMP'],
        correctOptionIndex: 0,
        explanation: 'Glucagon binds GPCRs, activating adenylate cyclase to produce cAMP; cAMP activates PKA, which phosphorylates and activates glycogen phosphorylase kinase.'
      },
      {
        id: 'mc4_q17',
        questionText: 'Streptococcus mutans synthesizes sticky insoluble extracellular glucans (mutan) from dietary sucrose using which surface enzyme?',
        options: ['Glucosyltransferase (GTF)', 'Amylase', 'Pepsin', 'Invertase only'],
        correctOptionIndex: 0,
        explanation: 'Glucosyltransferases on S. mutans split sucrose into fructose and polymerize glucose into sticky alpha-1,3- and alpha-1,6-linked glucans that cement plaque biofilms to enamel.'
      },
      {
        id: 'mc4_q18',
        questionText: 'Gluconeogenesis (the synthesis of new glucose from non-carbohydrate precursors) occurs predominantly in the:',
        options: ['Liver (and renal cortex)', 'Skeletal muscle', 'Brain', 'Erythrocytes'],
        correctOptionIndex: 0,
        explanation: 'The liver is the primary gluconeogenic organ (along with the kidney during prolonged starvation), expressing glucose-6-phosphatase to release free glucose into the blood.'
      },
      {
        id: 'mc4_q19',
        questionText: 'Skeletal muscle tissue CANNOT release free glucose into the general circulation during fasting because it lacks which enzyme?',
        options: ['Glucose-6-phosphatase', 'Glycogen phosphorylase', 'Phosphoglucomutase', 'Hexokinase'],
        correctOptionIndex: 0,
        explanation: 'Muscle lacks glucose-6-phosphatase; its glycogen-derived glucose-6-phosphate is trapped intracellularly to fuel its own glycolytic contractions.'
      },
      {
        id: 'mc4_q20',
        questionText: 'Lactose intolerance in adults is caused by a deficiency of which brush-border disaccharidase enzyme?',
        options: ['Lactase (beta-galactosidase)', 'Sucrase', 'Maltase', 'Trehalase'],
        correctOptionIndex: 0,
        explanation: 'Lactase hydrolyzes milk sugar lactose into galactose and glucose; deficiency allows unabsorbed lactose to reach the colon, causing osmotic diarrhea and gas.'
      },
      {
        id: 'mc4_q21',
        questionText: 'Glycosaminoglycans (GAGs) such as hyaluronic acid and chondroitin sulfate in the extracellular matrix are composed of repeating:',
        options: ['Disaccharide units of an amino sugar (glucosamine/galactosamine) and an uronic acid', 'Pure fatty acid chains', 'Amino acids only', 'Steroid rings'],
        correctOptionIndex: 0,
        explanation: 'GAGs are unbranched polyanionic polysaccharides containing repeating disaccharide units with sulfate and carboxylate groups that trap water in ground substance.'
      },
      {
        id: 'mc4_q22',
        questionText: 'Glycosylated hemoglobin (HbA1c) reflects average patient blood glucose concentration over which clinical timeframe?',
        options: ['The preceding 2 to 3 months (lifespan of erythrocytes, ~120 days)', 'The last 24 hours', 'The last 2 weeks', 'The past 5 years'],
        correctOptionIndex: 0,
        explanation: 'HbA1c forms non-enzymatically via the Maillard reaction between glucose and the N-terminal valine of hemoglobin beta chains, reflecting 60–90 days of glycemic control.'
      },
      {
        id: 'mc4_q23',
        questionText: 'The artificial sugar substitute Xylitol is non-cariogenic in dentistry primarily because oral cariogenic streptococci:',
        options: ['Cannot metabolize 5-carbon xylitol into lactic acid, resulting in a futile cycle that inhibits bacterial growth', 'Turn xylitol into calcium', 'Absorb xylitol as fat', 'Cannot swallow it'],
        correctOptionIndex: 0,
        explanation: 'Xylitol is a 5-carbon sugar polyol transported into S. mutans where it is phosphorylated into xylitol-5-phosphate, which cannot be metabolized, inhibiting glycolysis.'
      },
      {
        id: 'mc4_q24',
        questionText: 'The Cori Cycle describes the metabolic cooperation between skeletal muscle and liver involving:',
        options: ['Transport of muscle-derived lactate to the liver for gluconeogenesis, returning glucose to muscle', 'Urea synthesis from ammonia', 'Ketone body production', 'Cholesterol transport'],
        correctOptionIndex: 0,
        explanation: 'Under anaerobic exertion, muscle exports lactate into blood; the liver converts lactate back into glucose via gluconeogenesis, replenishing blood glucose (Cori cycle).'
      },
      {
        id: 'mc4_q25',
        questionText: 'Salivary alpha-amylase (ptyalin) initiates carbohydrate digestion in the oral cavity by cleaving:',
        options: ['Internal alpha-1,4-glucosidic bonds of starch and glycogen', 'Beta-1,4-glycosidic bonds of cellulose', 'Peptide bonds in meat', 'Ester bonds in triglycerides'],
        correctOptionIndex: 0,
        explanation: 'Salivary amylase is an endo-amylase that randomly cleaves internal alpha-1,4 bonds of dietary amylose and amylopectin into maltose, maltotriose, and dextrins.'
      }
    ]
  },
  {
    id: 'mc-section-5',
    sectionNumber: 5,
    fileName: '5.docx',
    titleEn: 'Section 5: Lipids, Membranes & Steroid Chemistry',
    titleAr: 'القسم الخامس: الدهون، الأغشية الخلوية وكيمياء الستيرويد',
    range: '101-125',
    descriptionEn: 'Fatty acid beta-oxidation, triglycerides, phospholipids, cholesterol synthesis, lipoproteins (LDL, HDL), and prostaglandins.',
    descriptionAr: 'أكسدة بيتا للأحماض الدهنية، الدهون الثلاثية، الكوليسترول، البروتينات الدهنية، والبروستاغلاندينات.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedChemistry&preview=5.docx',
    questions: [
      {
        id: 'mc5_q1',
        questionText: 'Triglycerides (triacylglycerols) are composed chemically of:',
        options: ['One glycerol molecule esterified to three fatty acid chains', 'One sphingosine and two sugars', 'Three glycerols linked to one phosphate', 'Cholesterol and one fatty acid'],
        correctOptionIndex: 0,
        explanation: 'Triglycerides are neutral storage lipids formed by esterifying the three hydroxyl groups of glycerol with three saturated or unsaturated fatty acids.'
      },
      {
        id: 'mc5_q2',
        questionText: 'Mitochondrial beta-oxidation of long-chain fatty acids requires which carrier shuttle to transport acyl groups across the inner mitochondrial membrane?',
        options: ['Carnitine shuttle (CPT-I and CPT-II)', 'Citrate shuttle', 'Malate-aspartate shuttle', 'Glycerol phosphate shuttle'],
        correctOptionIndex: 0,
        explanation: 'Fatty acyl-CoA cannot cross the inner mitochondrial membrane; carnitine palmitoyltransferase-I (CPT-I) conjugates fatty acids to carnitine for transport.'
      },
      {
        id: 'mc5_q3',
        questionText: 'Each round of beta-oxidation shortens a fatty acyl-CoA chain by two carbons, releasing:',
        options: ['One Acetyl-CoA, one FADH2, and one NADH', 'One molecule of glucose', 'Two molecules of carbon dioxide', 'One ATP directly'],
        correctOptionIndex: 0,
        explanation: 'Each cyclic turn of the beta-oxidation spiral cleaves a 2-carbon unit as Acetyl-CoA, generating 1 FADH2 and 1 NADH for the respiratory chain.'
      },
      {
        id: 'mc5_q4',
        questionText: 'Which enzyme serves as the committed, rate-limiting step in de novo cholesterol biosynthesis and is the pharmacological target of statin drugs?',
        options: ['HMG-CoA Reductase', 'HMG-CoA synthase', 'Squalene synthase', 'Cholesterol esterase'],
        correctOptionIndex: 0,
        explanation: '3-hydroxy-3-methylglutaryl-CoA (HMG-CoA) reductase converts HMG-CoA to mevalonate; it is competitively inhibited by statins (e.g. atorvastatin) to lower blood cholesterol.'
      },
      {
        id: 'mc5_q5',
        questionText: 'Low-Density Lipoproteins (LDL) are clinically dubbed "bad cholesterol" because they:',
        options: ['Transport cholesterol from the liver to peripheral arterial walls, contributing to atherosclerotic plaque', 'Scavenge cholesterol from arteries', 'Carry dietary fats from the gut', 'Dissolve gallstones'],
        correctOptionIndex: 0,
        explanation: 'LDL particles deposit cholesterol in vascular subendothelium; oxidized LDL is phagocytosed by macrophages into foam cells, initiating atherosclerosis.'
      },
      {
        id: 'mc5_q6',
        questionText: 'High-Density Lipoproteins (HDL) provide cardiovascular protection through "reverse cholesterol transport" by:',
        options: ['Scavenging excess unesterified cholesterol from peripheral tissues and transporting it back to the liver for bile excretion', 'Increasing arterial wall inflammation', 'Inhibiting bile production', 'Storing fat in adipocytes'],
        correctOptionIndex: 0,
        explanation: 'ApoA-1 on nascent HDL activates LCAT, esterifying free cholesterol from peripheral tissues to bring it back to the liver for biliary elimination.'
      },
      {
        id: 'mc5_q7',
        questionText: 'Chylomicrons are synthesized by enterocytes to package and transport:',
        options: ['Exogenous dietary triglycerides and fat-soluble vitamins from the intestinal lumen into lymphatics', 'Endogenous liver lipids', 'Pure glucose', 'Serum albumin'],
        correctOptionIndex: 0,
        explanation: 'Chylomicrons are the largest, least dense lipoproteins containing ApoB-48, carrying dietary triacylglycerols and fat-soluble vitamins via thoracic duct lymph into blood.'
      },
      {
        id: 'mc5_q8',
        questionText: 'Ketone body synthesis (ketogenesis: acetoacetate, beta-hydroxybutyrate, acetone) occurs in liver mitochondria during:',
        options: ['Prolonged fasting, starvation, or uncontrolled type 1 diabetes mellitus', 'Immediate post-prandial state', 'High carbohydrate diet', 'Resting state'],
        correctOptionIndex: 0,
        explanation: 'When carbohydrate stores are depleted, massive fatty acid mobilization floods the liver with acetyl-CoA, exceeding TCA capacity and synthesizing ketone bodies.'
      },
      {
        id: 'mc5_q9',
        questionText: 'Which essential fatty acid (cannot be synthesized by humans and must be ingested) contains 18 carbons with two cis double bonds (18:2, omega-6)?',
        options: ['Linoleic acid', 'Oleic acid', 'Palmitic acid', 'Stearic acid'],
        correctOptionIndex: 0,
        explanation: 'Linoleic acid (18:2 n-6) and alpha-linolenic acid (18:3 n-3) are essential fatty acids because human desaturases cannot introduce double bonds beyond carbon-9.'
      },
      {
        id: 'mc5_q10',
        questionText: 'Arachidonic acid (20:4, omega-6) is cleaved from membrane phospholipids by which enzyme in response to inflammatory stimuli?',
        options: ['Phospholipase A2 (PLA2)', 'Lipoprotein lipase', 'Pancreatic lipase', 'Amylase'],
        correctOptionIndex: 0,
        explanation: 'Inflammatory stimuli activate Phospholipase A2 (inhibited by corticosteroids), releasing arachidonic acid from the sn-2 position of membrane phospholipids.'
      },
      {
        id: 'mc5_q11',
        questionText: 'Non-steroidal anti-inflammatory drugs (NSAIDs like ibuprofen and aspirin) reduce pain and inflammation by inhibiting which enzyme?',
        options: ['Cyclooxygenase (COX-1 and COX-2)', '5-Lipoxygenase', 'Phospholipase C', 'HMG-CoA reductase'],
        correctOptionIndex: 0,
        explanation: 'NSAIDs inhibit cyclooxygenase (COX) enzymes, preventing the conversion of arachidonic acid into pro-inflammatory prostaglandins and thromboxanes.'
      },
      {
        id: 'mc5_q12',
        questionText: 'Aspirin (acetylsalicylic acid) differs from other NSAIDs because its mechanism of COX inhibition is:',
        options: ['Irreversible covalent acetylation of a serine residue in the COX active site', 'Reversible competitive binding', 'Allosteric inhibition', 'Non-competitive feedback'],
        correctOptionIndex: 0,
        explanation: 'Aspirin permanently acetylates Ser-529 in COX-1 and Ser-516 in COX-2, permanently disabling platelet thromboxane A2 production for the 7–10 day platelet lifespan.'
      },
      {
        id: 'mc5_q13',
        questionText: 'Which eicosanoid synthesized by platelets promotes platelet aggregation and vasoconstriction?',
        options: ['Thromboxane A2 (TXA2)', 'Prostacyclin (PGI2)', 'Leukotriene B4', 'Lipoxin A4'],
        correctOptionIndex: 0,
        explanation: 'Platelet COX-1 produces Thromboxane A2, a potent inducer of platelet activation, aggregation, and arterial vasoconstriction.'
      },
      {
        id: 'mc5_q14',
        questionText: 'Prostacyclin (PGI2), synthesized by vascular endothelial cells, acts physiologically to:',
        options: ['Inhibit platelet aggregation and promote vasodilation (opposing thromboxane A2)', 'Form blood clots', 'Constrict bronchioles', 'Increase gastric acid'],
        correctOptionIndex: 0,
        explanation: 'Endothelial PGI2 inhibits platelet clumping and dilates blood vessels, maintaining a thromboresistant vascular surface in dynamic balance with TXA2.'
      },
      {
        id: 'mc5_q15',
        questionText: 'Sphingomyelin, an essential lipid component of the myelin sheath surrounding nerve axons, is composed of:',
        options: ['A sphingosine amino alcohol backbone, one fatty acid, and a phosphorylcholine headgroup', 'Glycerol and three fatty acids', 'Cholesterol and galactose', 'Pure carbohydrate'],
        correctOptionIndex: 0,
        explanation: 'Sphingomyelins are sphingophospholipids containing a sphingoid base linked to a fatty acid via an amide bond (ceramide), with a phosphocholine polar head.'
      },
      {
        id: 'mc5_q16',
        questionText: 'Tay-Sachs disease is an autosomal recessive lysosomal lipid storage disorder caused by a deficiency of which enzyme?',
        options: ['Hexosaminidase A (leading to GM2 ganglioside accumulation)', 'Sphingomyelinase', 'Glucocerebrosidase', 'Galactocerebrosidase'],
        correctOptionIndex: 0,
        explanation: 'Hexosaminidase A deficiency causes GM2 ganglioside accumulation in neurons, resulting in progressive neurodegeneration, blindness, and a cherry-red retinal spot.'
      },
      {
        id: 'mc5_q17',
        questionText: 'Bile salts (such as glycocholate and taurocholate) are synthesized from cholesterol in the liver to facilitate:',
        options: ['Emulsification and micellar solubilization of dietary lipids in the small intestine', 'Protein breakdown', 'Glucose absorption', 'Gastric acid secretion'],
        correctOptionIndex: 0,
        explanation: 'Bile acids are amphipathic detergents that emulsify large dietary fat droplets into microscopic mixed micelles, vastly increasing surface area for lipase action.'
      },
      {
        id: 'mc5_q18',
        questionText: 'All steroid hormones (including cortisol, aldosterone, estrogen, and testosterone) are derived biosynthetically from which precursor?',
        options: ['Cholesterol (via pregnenolone)', 'Fatty acids directly', 'Vitamin A', 'Glycine'],
        correctOptionIndex: 0,
        explanation: 'Steroidogenesis begins in mitochondria with side-chain cleavage of cholesterol by CYP11A1 (desmolase) to yield pregnenolone, the master precursor of all steroid hormones.'
      },
      {
        id: 'mc5_q19',
        questionText: 'Vitamin D3 (cholecalciferol) is converted into its fully active hormonal form (calcitriol, 1,25-dihydroxyvitamin D3) through two sequential hydroxylations in:',
        options: ['Liver (25-hydroxylase) and Kidney (1-alpha-hydroxylase)', 'Skin and Spleen', 'Pancreas and Stomach', 'Bone and Muscle'],
        correctOptionIndex: 0,
        explanation: 'Vitamin D3 is 25-hydroxylated in the liver to calcidiol (25-(OH)D), then 1-alpha-hydroxylated in the proximal renal tubules under PTH control to active calcitriol.'
      },
      {
        id: 'mc5_q20',
        questionText: 'The primary physiological function of active calcitriol [1,25-(OH)2D3] in mineral homeostasis is to:',
        options: ['Stimulate intestinal absorption of dietary calcium and phosphate', 'Inhibit bone formation completely', 'Excrete all calcium into urine', 'Reduce parathyroid hormone receptor count'],
        correctOptionIndex: 0,
        explanation: 'Calcitriol upregulates intestinal epithelial TRPV6 calcium channels and calbindin protein synthesis, maximizing calcium and phosphate absorption from the gut.'
      },
      {
        id: 'mc5_q21',
        questionText: 'Which fat-soluble vitamin serves as a hydrophobic biological antioxidant, terminating free radical chain reactions in cell membrane lipids?',
        options: ['Vitamin E (alpha-tocopherol)', 'Vitamin B12', 'Vitamin C (ascorbate)', 'Vitamin K'],
        correctOptionIndex: 0,
        explanation: 'Vitamin E is a lipid-soluble chain-breaking antioxidant that intercepts lipid peroxyl radicals (LOO·) in membranes, preventing lipid peroxidation of polyunsaturated fatty acids.'
      },
      {
        id: 'mc5_q22',
        questionText: 'Vitamin K is an obligate cofactor for gamma-glutamyl carboxylase, required for post-translational modification of which clotting factors?',
        options: ['Factors II (prothrombin), VII, IX, and X (and Protein C and S)', 'Factor VIII and von Willebrand factor', 'Fibrinogen and Factor XIII', 'Factor XII only'],
        correctOptionIndex: 0,
        explanation: 'Vitamin K enables gamma-carboxylation of glutamic acid residues on Factors II, VII, IX, and X, enabling them to bind calcium ions (Ca²+) and adhere to platelet surfaces.'
      },
      {
        id: 'mc5_q23',
        questionText: 'Saturated fatty acids differ structurally from unsaturated fatty acids because saturated fatty acids:',
        options: ['Contain no carbon-carbon double bonds (fully saturated with hydrogen)', 'Contain multiple cis double bonds', 'Are liquid at room temperature', 'Have lower melting points'],
        correctOptionIndex: 0,
        explanation: 'Saturated fatty acids have straight, fully hydrogenated hydrocarbon chains without double bonds, packing tightly into crystalline matrices with higher melting points (solid fats).'
      },
      {
        id: 'mc5_q24',
        questionText: 'Trans fatty acids created during industrial partial hydrogenation of vegetable oils are atherogenic because they:',
        options: ['Raise serum LDL cholesterol and lower protective HDL cholesterol levels', 'Decrease arterial inflammation', 'Inhibit clotting factors', 'Act as antioxidants'],
        correctOptionIndex: 0,
        explanation: 'Trans-fatty acids have trans double bonds that mimic saturated fatty acid straight conformations, unfavorably shifting lipid profiles by raising LDL and lowering HDL.'
      },
      {
        id: 'mc5_q25',
        questionText: 'Lipid rafts in eukaryotic plasma membranes are specialized microdomains enriched in:',
        options: ['Cholesterol and sphingolipids, serving as organizing platforms for signaling proteins', 'Triglycerides only', 'Pure water channels', 'Denatured proteins'],
        correctOptionIndex: 0,
        explanation: 'Lipid rafts are ordered, tightly packed membrane microdomains rich in cholesterol, glycosphingolipids, and GPI-anchored proteins that coordinate receptor signaling.'
      }
    ]
  },
  {
    id: 'mc-section-6',
    sectionNumber: 6,
    fileName: '6.docx',
    titleEn: 'Section 6: Amino Acids, Proteins & Enzyme Kinetics',
    titleAr: 'القسم السادس: الأحماض الأمينية، البروتينات وحركية الإنزيمات',
    range: '126-150',
    descriptionEn: 'Amino acid classification, isoelectric point (pI), secondary/tertiary protein folding, Michaelis-Menten kinetics, and enzyme inhibitors.',
    descriptionAr: 'تصنيف الأحماض الأمينية، نقطة التعادل الكهربي، طي البروتين، حركية ميكائيليس-مينتن، ومثبطات الإنزيمات.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedChemistry&preview=6.docx',
    questions: [
      {
        id: 'mc6_q1',
        questionText: 'Which amino acid is the only standard proteinogenic amino acid that lacks a chiral carbon center (achiral)?',
        options: ['Glycine', 'Alanine', 'Proline', 'Cysteine'],
        correctOptionIndex: 0,
        explanation: 'Glycine’s side chain is simply a single hydrogen atom (-H), giving the alpha-carbon two identical substituents and rendering it optically achiral.'
      },
      {
        id: 'mc6_q2',
        questionText: 'The isoelectric point (pI) of an amino acid is defined as the pH at which:',
        options: ['The net electrical charge on the molecule is exactly zero (zwitterion form)', 'The molecule is fully positively charged', 'The molecule is fully negatively charged', 'All peptide bonds break'],
        correctOptionIndex: 0,
        explanation: 'At the isoelectric point (pI), positive charges from protonated amines balance negative charges from deprotonated carboxylates, resulting in zero net mobility in an electric field.'
      },
      {
        id: 'mc6_q3',
        questionText: 'Which amino acid has an imino ring structure that introduces rigid conformational kinks into alpha-helices and is abundant in collagen?',
        options: ['Proline', 'Tryptophan', 'Histidine', 'Glutamate'],
        correctOptionIndex: 0,
        explanation: 'Proline’s secondary amine ring locks its phi backbone dihedral angle, making it an alpha-helix breaker while forming the tight triple-helix twists of collagen.'
      },
      {
        id: 'mc6_q4',
        questionText: 'Primary structure of a protein is maintained exclusively by which type of chemical bond?',
        options: ['Covalent peptide (amide) bonds', 'Hydrogen bonds', 'Hydrophobic interactions', 'Ionic salt bridges'],
        correctOptionIndex: 0,
        explanation: 'Primary protein structure is the linear sequence of amino acids joined exclusively by covalent peptide bonds between alpha-carboxyl and alpha-amino groups.'
      },
      {
        id: 'mc6_q5',
        questionText: 'Secondary protein structures (such as alpha-helices and beta-pleated sheets) are stabilized primarily by:',
        options: ['Hydrogen bonds between backbone carbonyl oxygens and amide hydrogens (C=O ··· H-N)', 'Disulfide bridges between side chains', 'Peptide bonds', 'Ionic bonds'],
        correctOptionIndex: 0,
        explanation: 'Alpha-helices and beta-sheets are stabilized by regular hydrogen bonds between peptide backbone atoms, independent of side-chain identities.'
      },
      {
        id: 'mc6_q6',
        questionText: 'In collagen biosynthesis, hydroxylation of proline and lysine residues in the rough endoplasmic reticulum strictly requires which vitamin cofactor?',
        options: ['Vitamin C (ascorbic acid)', 'Vitamin B1 (thiamine)', 'Vitamin D', 'Vitamin A'],
        correctOptionIndex: 0,
        explanation: 'Prolyl and lysyl hydroxylases require Vitamin C (ascorbate) to maintain their catalytic Fe²+ ion in the reduced state; deficiency causes scurvy and periodontal collapse.'
      },
      {
        id: 'mc6_q7',
        questionText: 'In enzyme kinetics, the Michaelis constant (Km) represents:',
        options: ['The substrate concentration [S] at which the reaction velocity is half of its maximum (1/2 Vmax)', 'The maximum velocity achievable', 'The turnover number (kcat)', 'The equilibrium constant of the reaction'],
        correctOptionIndex: 0,
        explanation: 'Km reflects enzyme affinity for substrate: a lower Km indicates higher substrate affinity, representing the substrate concentration needed to reach half-maximal velocity.'
      },
      {
        id: 'mc6_q8',
        questionText: 'A competitive enzyme inhibitor acts by:',
        options: ['Binding reversibly to the free enzyme active site, increasing apparent Km without altering Vmax', 'Decreasing Vmax only', 'Binding to the enzyme-substrate complex only', 'Destroying the enzyme permanently'],
        correctOptionIndex: 0,
        explanation: 'Competitive inhibitors resemble the substrate and compete for the catalytic pocket; high substrate concentrations can overcome inhibition, so Vmax is unchanged while Km increases.'
      },
      {
        id: 'mc6_q9',
        questionText: 'A pure non-competitive inhibitor binds reversibly to an allosteric site on both free enzyme and enzyme-substrate complex, resulting in:',
        options: ['Decreased Vmax with an unchanged Km', 'Increased Km and increased Vmax', 'Unchanged Vmax and higher Km', 'Zero velocity always'],
        correctOptionIndex: 0,
        explanation: 'Non-competitive inhibitors do not compete for the active site; adding excess substrate cannot reverse the effect, reducing effective catalytic turnover (decreased Vmax) with unchanged Km.'
      },
      {
        id: 'mc6_q10',
        questionText: 'Allosteric enzymes characteristically display which type of velocity versus substrate concentration curve?',
        options: ['Sigmoidal (S-shaped) curve indicative of cooperative subunit binding', 'Hyperbolic Michaelis-Menten curve', 'Straight horizontal line', 'Parabolic curve'],
        correctOptionIndex: 0,
        explanation: 'Multi-subunit allosteric enzymes (like hemoglobin or PFK-1) demonstrate cooperative binding between subunits, yielding a sigmoidal velocity curve.'
      },
      {
        id: 'mc6_q11',
        questionText: 'Denaturation of a protein results in loss of biological function through disruption of:',
        options: ['Secondary, tertiary, and quaternary structures without breaking primary covalent peptide bonds', 'Primary structure only', 'Peptide bonds exclusively', 'Individual amino acid bonds'],
        correctOptionIndex: 0,
        explanation: 'Denaturation (by extreme heat, pH, or urea) unfolds non-covalent hydrogen bonds, ionic bonds, and hydrophobic interactions, leaving the primary peptide backbone intact.'
      },
      {
        id: 'mc6_q12',
        questionText: 'Zymogens (proenzymes, such as pepsinogen and trypsinogen) are converted into active enzymes by:',
        options: ['Irreversible selective proteolytic cleavage of an inhibitory peptide segment', 'Phosphorylation only', 'Addition of coenzyme A', 'Binding oxygen'],
        correctOptionIndex: 0,
        explanation: 'Digestive and clotting zymogens are synthesized as inactive precursors to prevent auto-digestion, activated only when a specific peptide bond is proteolytically cleaved.'
      },
      {
        id: 'mc6_q13',
        questionText: 'Which amino acid contains a sulfhydryl group that can form covalent disulfide bridges (-S-S-) to stabilize tertiary protein architecture?',
        options: ['Cysteine', 'Methionine', 'Serine', 'Threonine'],
        correctOptionIndex: 0,
        explanation: 'Two cysteine residues can undergo oxidation to form a covalent cystine disulfide link (-S-S-), providing tremendous conformational rigidity to extracellular proteins.'
      },
      {
        id: 'mc6_q14',
        questionText: 'Hemoglobin displays positive cooperativity in oxygen binding, meaning that binding of oxygen to one heme subunit:',
        options: ['Increases the oxygen affinity of the remaining three subunits, shifting the curve to the R (relaxed) state', 'Decreases oxygen affinity', 'Releases all oxygen immediately', 'Destroys the iron atom'],
        correctOptionIndex: 0,
        explanation: 'Oxygen binding transitions hemoglobin from the low-affinity T (tense) state to the high-affinity R (relaxed) state, increasing affinity for subsequent O2 molecules.'
      },
      {
        id: 'mc6_q15',
        questionText: 'The Bohr Effect describes the physiological phenomenon where an increase in carbon dioxide (PCO2) and hydrogen ions (lower pH) causes hemoglobin to:',
        options: ['Decrease its oxygen affinity and release more oxygen to working tissues (shifts curve right)', 'Increase its oxygen affinity', 'Bind carbon monoxide tightly', 'Precipitate in capillaries'],
        correctOptionIndex: 0,
        explanation: 'Protons and CO2 stabilize deoxyhemoglobin in the T state, shifting the oxygen-dissociation curve rightward and promoting O2 unloading in metabolically active, acidic tissues.'
      },
      {
        id: 'mc6_q16',
        questionText: '2,3-Bisphosphoglycerate (2,3-BPG) in human red blood cells binds to deoxyhemoglobin to:',
        options: ['Stabilize the T (tense) state, lowering oxygen affinity and facilitating O2 release to tissues', 'Increase O2 binding tightly', 'Prevent carbon dioxide transport', 'Inhibit glycolysis'],
        correctOptionIndex: 0,
        explanation: '2,3-BPG fits into the central cavity of the T-state tetramer, cross-linking beta chains and reducing O2 affinity, crucial for high-altitude adaptation.'
      },
      {
        id: 'mc6_q17',
        questionText: 'Which metal ion cofactor is an indispensable component of the zinc metalloenzyme Carbonic Anhydrase and Matrix Metalloproteinases (MMPs)?',
        options: ['Zinc (Zn²+)', 'Iron (Fe²+)', 'Copper (Cu²+)', 'Magnesium (Mg²+)'],
        correctOptionIndex: 0,
        explanation: 'Zinc (Zn²+) coordinates with three histidine residues in carbonic anhydrase and MMPs, activating water molecules for nucleophilic attack.'
      },
      {
        id: 'mc6_q18',
        questionText: 'Prion diseases (such as Creutzfeldt-Jakob disease) are transmissible spongiform encephalopathies caused by:',
        options: ['Misfolding of normal cellular prion protein (PrPC) into a proteolysis-resistant beta-sheet rich isoform (PrPSc)', 'A viral RNA infection', 'A bacterial spore', 'Autoimmune antibodies against myelin'],
        correctOptionIndex: 0,
        explanation: 'Prions propagate without nucleic acids: infectious PrPSc templates the conformational refolding of normal alpha-helical PrPC into insoluble, amyloidogenic beta-sheet fibrils.'
      },
      {
        id: 'mc6_q19',
        questionText: 'Which class of enzymes catalyzes the transfer of a phosphate group from ATP to a target protein substrate (phosphorylation)?',
        options: ['Protein Kinases', 'Phosphatases (remove phosphate)', 'Ligases', 'Isomerases'],
        correctOptionIndex: 0,
        explanation: 'Kinases transfer the gamma-phosphate of ATP onto specific serine, threonine, or tyrosine hydroxyl groups of target proteins, altering enzymatic activity.'
      },
      {
        id: 'mc6_q20',
        questionText: 'The turnover number (kcat) of an enzyme represents:',
        options: ['The maximum number of substrate molecules converted to product per active site per unit time (Vmax / [E]total)', 'The binding affinity', 'The half-life of the protein', 'The molecular mass of the enzyme'],
        correctOptionIndex: 0,
        explanation: 'kcat (catalytic constant) measures the maximum catalytic speed of an active site when fully saturated with substrate, expressed in units of s^-1.'
      },
      {
        id: 'mc6_q21',
        questionText: 'Cystinuria is an inherited transport defect that causes recurrent formation of which type of kidney and urinary stones?',
        options: ['Hexagonal cysteine crystal stones', 'Calcium oxalate stones', 'Uric acid stones', 'Struvite stones'],
        correctOptionIndex: 0,
        explanation: 'Defective proximal tubule reabsorption of dibasic amino acids (cystine, ornithine, lysine, arginine) causes insoluble cystine to precipitate as hexagonal calculus stones.'
      },
      {
        id: 'mc6_q22',
        questionText: 'Phenylketonuria (PKU) is caused by a genetic deficiency of which hepatic enzyme, leading to severe intellectual disability if untreated?',
        options: ['Phenylalanine Hydroxylase (PAH)', 'Tyrosinase', 'Homogentisate oxidase', 'Branched-chain keto acid dehydrogenase'],
        correctOptionIndex: 0,
        explanation: 'PAH converts phenylalanine to tyrosine; deficiency causes toxic accumulation of phenylalanine and phenylketones (phenylpyruvate, phenyllactate) in developing brains.'
      },
      {
        id: 'mc6_q23',
        questionText: 'The Lineweaver-Burk plot (double reciprocal plot: 1/V vs 1/[S]) displays a competitive inhibitor as having:',
        options: ['A common y-intercept (same 1/Vmax) and a steeper slope with an x-intercept closer to zero', 'Parallel lines (same slope)', 'Identical x-intercepts', 'A horizontal flat line'],
        correctOptionIndex: 0,
        explanation: 'On a 1/V versus 1/[S] plot, competitive inhibition intersects the y-axis at the same 1/Vmax point, while the x-intercept (-1/Km) shifts right toward zero (larger apparent Km).'
      },
      {
        id: 'mc6_q24',
        questionText: 'Salivary mucins (MG1 and MG2) are high-molecular-weight glycoproteins characterized biochemically by:',
        options: ['Dense O-linked oligosaccharide chains attached to serine and threonine, providing viscoelastic lubrication and tissue coating', 'Pure lipid bilayers', 'High mineral content', 'Fibrillar collagen cores'],
        correctOptionIndex: 0,
        explanation: 'Mucins are heavily glycosylated (>70% carbohydrate) with dense O-linked glycan bottle-brush branches that hold water, lubricating food boluses and forming mucosal barriers.'
      },
      {
        id: 'mc6_q25',
        questionText: 'Which aromatic amino acid serves as the biosynthetic precursor for the neurotransmitters dopamine, norepinephrine, and epinephrine?',
        options: ['Tyrosine', 'Tryptophan (precursor of serotonin)', 'Histidine', 'Valine'],
        correctOptionIndex: 0,
        explanation: 'Tyrosine is hydroxylated by tyrosine hydroxylase to L-DOPA, which is decarboxylated to dopamine, and further hydroxylated into norepinephrine and epinephrine.'
      }
    ]
  },
  {
    id: 'mc-section-7',
    sectionNumber: 7,
    fileName: '7.docx',
    titleEn: 'Section 7: Dental Polymers & Biomaterials Chemistry',
    titleAr: 'القسم السابع: كيمياء بوليمرات ومواد طب الأسنان الحيوية',
    range: '151-175',
    descriptionEn: 'Poly(methyl methacrylate), glass ionomer acid-base reactions, composite filler technology, and impression elastomeric setting.',
    descriptionAr: 'بولي ميثيل ميثاكريلات، تفاعلات الزجاج الأيونومي، حشوات الكومبوزيت، وكيمياء مواد الطبعات.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedChemistry&preview=7.docx',
    questions: [
      {
        id: 'mc7_q1',
        questionText: 'Heat-cured denture acrylic resins are formulated as a powder-liquid system consisting of:',
        options: ['Powder: Poly(methyl methacrylate) [PMMA] beads; Liquid: Methyl methacrylate [MMA] monomer', 'Powder: Calcium hydroxide; Liquid: Water', 'Powder: Zinc oxide; Liquid: Eugenol', 'Powder: Silica; Liquid: Phosphoric acid'],
        correctOptionIndex: 0,
        explanation: 'Denture base resin utilizes pre-polymerized PMMA spherical beads (with benzoyl peroxide initiator) mixed with liquid MMA monomer (with hydroquinone inhibitor).'
      },
      {
        id: 'mc7_q2',
        questionText: 'Hydroquinone is added in minute quantities (0.005%–0.01%) to dental methyl methacrylate monomer liquid to act as a:',
        options: ['Free-radical inhibitor to prevent premature spontaneous polymerization during shelf storage', 'Cross-linking agent', 'Color pigment', 'Plasticizer'],
        correctOptionIndex: 0,
        explanation: 'Hydroquinone scavenger reacts with stray ambient thermal radicals, preventing premature chain polymerization and ensuring prolonged commercial shelf life.'
      },
      {
        id: 'mc7_q3',
        questionText: 'Residual unreacted methyl methacrylate monomer in processed dental acrylic appliances is clinically significant because it:',
        options: ['Can leach into saliva, causing contact stomatitis, tissue irritation, and allergic mucosal reactions', 'Hardens the denture excessively', 'Makes the acrylic glow in the dark', 'Causes immediate tooth decay'],
        correctOptionIndex: 0,
        explanation: 'Unpolymerized residual monomer acts as a tissue irritant and allergen (Type IV hypersensitivity), and leaches out, weakening acrylic mechanical strength.'
      },
      {
        id: 'mc7_q4',
        questionText: 'The classic chemical setting reaction of Glass Ionomer Cements (GIC) is fundamentally an:',
        options: [
          'Acid-base neutralization reaction between polyalkenoic acid liquid and basic calcium/strontium fluoroaluminosilicate glass powder',
          'Free-radical addition polymerization only',
          'Condensation polymerization releasing ethanol',
          'Evaporation of water'
        ],
        correctOptionIndex: 0,
        explanation: 'GIC sets through an acid-base reaction: polyacrylic acid attacks glass particles, releasing Ca²+, Al³+, and F- ions that cross-link polyacid chains into a silica hydrogel matrix.'
      },
      {
        id: 'mc7_q5',
        questionText: 'Fluoride release from glass ionomer cements provides a sustained anti-cariogenic benefit through what mechanism?',
        options: ['Continuous fluoride ion release into adjacent enamel/dentin, converting hydroxyapatite into acid-resistant fluorapatite', 'Dissolving bacterial membranes completely', 'Neutralizing all dietary acids permanently', 'Preventing all plaque adhesion'],
        correctOptionIndex: 0,
        explanation: 'GIC releases fluoride ions that substitute into the tooth lattice to form fluorapatite [Ca10(PO4)6F2], reducing the critical dissolution pH from 5.5 to 4.5.'
      },
      {
        id: 'mc7_q6',
        questionText: 'True chemical adhesion of Glass Ionomer Cement to natural tooth structure occurs via:',
        options: ['Chelation bonding between carboxylate (-COO-) groups of polyacrylic acid and calcium ions (Ca²+) in tooth hydroxyapatite', 'Micromechanical interlocking only', 'Physical suction', 'Covalent bonding with collagen only'],
        correctOptionIndex: 0,
        explanation: 'Carboxylate groups of polyalkenoic acid replace phosphate ions in the tooth apatite, forming ionic chemical chelation bonds directly with enamel and dentin calcium.'
      },
      {
        id: 'mc7_q7',
        questionText: 'Addition silicone (polyvinyl siloxane / PVS) impression materials set through which chemical reaction that produces NO volatile byproducts?',
        options: [
          'Hydrosilylation addition reaction between vinyl-terminated siloxane and silane-containing prepolymers catalyzed by chloroplatinic acid',
          'Condensation reaction releasing volatile ethyl alcohol',
          'Acid-base neutralization releasing water',
          'Free-radical polymerization'
        ],
        correctOptionIndex: 0,
        explanation: 'PVS sets via platinum-catalyzed addition cross-linking (hydrosilylation) with no byproduct formation, conferring the highest dimensional stability and reproduction detail.'
      },
      {
        id: 'mc7_q8',
        questionText: 'Condensation silicone impression materials release which volatile byproduct during setting, causing noticeable dimensional shrinkage over time?',
        options: ['Ethyl alcohol (ethanol)', 'Water', 'Hydrochloric acid', 'Hydrogen gas'],
        correctOptionIndex: 0,
        explanation: 'Condensation silicones cross-link using stannous octoate, eliminating ethyl alcohol that evaporates, resulting in continuous dimensional contraction.'
      },
      {
        id: 'mc7_q9',
        questionText: 'Polyether impression materials (such as Impregum) are clinically unique among elastomeric materials because they are naturally:',
        options: ['Hydrophilic (low contact angle), enabling superb detail capture even in the presence of minor oral moisture', 'Severely hydrophobic', 'Extremely soft and easy to tear', 'Set by blue light'],
        correctOptionIndex: 0,
        explanation: 'The polyether backbone features polar ether and imine linkages that impart inherent hydrophilicity, allowing the material to wet moist prepared tooth surfaces accurately.'
      },
      {
        id: 'mc7_q10',
        questionText: 'Alginate irreversible hydrocolloid impression material sets through which chemical precipitation reaction?',
        options: ['Sol-to-gel transformation: soluble sodium alginate reacts with calcium sulfate dihydrate to form an insoluble calcium alginate cross-linked gel', 'Polymerization of methacrylate', 'Cooling of agar agar (reversible hydrocolloid)', 'Evaporation of alcohol'],
        correctOptionIndex: 0,
        explanation: 'Soluble sodium alginate dissolves in water and is cross-linked by divalent calcium ions from calcium sulfate, forming a continuous insoluble calcium alginate gel network.'
      },
      {
        id: 'mc7_q11',
        questionText: 'The delay in setting time of alginate powder is controlled by the manufacturer through the addition of which chemical retarder?',
        options: ['Trisodium phosphate (reacts preferentially with calcium ions before alginate does)', 'Calcium chloride', 'Zinc oxide', 'Eugenol'],
        correctOptionIndex: 0,
        explanation: 'Trisodium phosphate scavenges free Ca²+ ions to precipitate insoluble calcium phosphate first; only after the retarder is exhausted does calcium cross-link alginate.'
      },
      {
        id: 'mc7_q12',
        questionText: 'Syneresis in hydrocolloid impressions (alginate and agar) refers to:',
        options: ['Exudation of water and dissolved solutes onto the surface of the gel, accompanied by shrinkage', 'Swelling by absorbing water', 'Melting at room temperature', 'Complete hardening into stone'],
        correctOptionIndex: 0,
        explanation: 'Syneresis is the spontaneous expression of interstitial fluid from the hydrocolloid gel network, leading to dimensional contraction if impressions are not poured promptly.'
      },
      {
        id: 'mc7_q13',
        questionText: 'Imbibition in an alginate impression occurs when the set impression is:',
        options: ['Immersed in water, absorbing liquid and causing dimensional swelling and distortion', 'Left exposed in dry air', 'Disinfected with spray', 'Poured with gypsum'],
        correctOptionIndex: 0,
        explanation: 'Imbibition is the uptake of water into the porous hydrocolloid gel matrix when submerged in liquid, causing unwanted expansion and clinical inaccuracy.'
      },
      {
        id: 'mc7_q14',
        questionText: 'In dental composite resin technology, nanofilled composites contain colloidal silica nanoparticles with dimensions typically ranging from:',
        options: ['5 to 100 nanometers (nm)', '10 to 50 micrometers (µm)', '1 to 2 millimeters', '0.5 centimeters'],
        correctOptionIndex: 0,
        explanation: 'Nanofill composites incorporate 5–100 nm non-agglomerated silica nanoparticles and nanoclusters, yielding exceptional polishability, gloss retention, and high wear resistance.'
      },
      {
        id: 'mc7_q15',
        questionText: 'The Configuration Factor (C-factor) of a dental cavity preparation is defined as the ratio of:',
        options: ['Bonded cavity surface area to unbonded (free) surface area', 'Depth divided by width', 'Enamel to dentin area', 'Length to height'],
        correctOptionIndex: 0,
        explanation: 'C-factor = (Bonded walls) / (Unbonded free surfaces). A Class I occlusal cavity has a high C-factor (5 bonded / 1 unbonded = 5), generating severe polymerization shrinkage stress.'
      },
      {
        id: 'mc7_q16',
        questionText: 'High C-factor cavity preparations are prone to which clinical bonding complication during resin light-curing?',
        options: ['Marginal debonding, cusp deflection, postoperative sensitivity, and enamel microcracking', 'Expansion of the composite', 'Rapid color whitening', 'Loss of tooth pulp'],
        correctOptionIndex: 0,
        explanation: 'With few unbonded surfaces to relieve contraction stresses through plastic flow, shrinkage forces (up to 15–20 MPa) pull composite away from walls, creating marginal gaps.'
      },
      {
        id: 'mc7_q17',
        questionText: 'Hybrid layer formation in dental adhesive bonding (Nakabayashi concept) involves:',
        options: ['Demineralization of dentin collagen followed by infiltration and in situ polymerization of hydrophilic resin monomers (HEMA)', 'Direct glass ionomer chelation', 'Placing an amalgam base', 'Etching enamel prisms only'],
        correctOptionIndex: 0,
        explanation: 'The hybrid layer is an interpenetrating network formed when primer/adhesive monomers impregnate demineralized intertubular collagen fibrils and polymerize, sealing dentin.'
      },
      {
        id: 'mc7_q18',
        questionText: '2-Hydroxyethyl methacrylate (HEMA) is an essential amphiphilic monomer in dental bonding agents because it:',
        options: ['Contains both hydrophilic (-OH) and hydrophobic (methacrylate) moieties, facilitating wetting and penetration into moist collagen', 'Acts as a strong mineral acid', 'Prevents all shrinkage', 'Is an opaque white dye'],
        correctOptionIndex: 0,
        explanation: 'HEMA is a water-soluble methacrylate that wets and penetrates water-swollen demineralized dentin collagen, bridging hydrophilic tooth structure to hydrophobic composite.'
      },
      {
        id: 'mc7_q19',
        questionText: 'Resin-modified glass ionomer cements (RMGIC) overcome the moisture sensitivity and low early strength of traditional GIC by incorporating:',
        options: ['Light-curable methacrylate monomers (e.g. HEMA) and photoinitiators alongside the traditional acid-base reaction', 'Heavy zinc oxide', 'Pure epoxy resin', 'Lead powder'],
        correctOptionIndex: 0,
        explanation: 'RMGICs combine a dual-cure mechanism: rapid command-set via light-activated methacrylate polymerization followed by slow continuous acid-base glass ionomer maturation.'
      },
      {
        id: 'mc7_q20',
        questionText: 'Degree of conversion (DC) of a cured dental composite represents:',
        options: ['The percentage of aliphatic carbon-carbon double bonds (C=C) converted into single bonds (C-C) during polymerization (typically 50%–70%)', 'The percentage of filler particles', 'The shrinkage in volume', 'The color match to shade guides'],
        correctOptionIndex: 0,
        explanation: 'DC quantifies polymerization completion: clinically acceptable composites achieve 55%–70% conversion, with remaining unconverted bonds existing as pendant side-groups.'
      },
      {
        id: 'mc7_q21',
        questionText: 'Silorane-based dental composites were engineered to reduce polymerization shrinkage through which setting mechanism?',
        options: ['Cationic ring-opening polymerization of oxirane rings that volumetrically expand upon opening', 'Free-radical methacrylate addition', 'Water evaporation', 'Acid-base neutralization'],
        correctOptionIndex: 0,
        explanation: 'Siloranes contain siloxane and oxirane rings; opening the oxirane rings during polymerization creates volumetric expansion that offsets shrinkage, reducing stress below 1%.'
      },
      {
        id: 'mc7_q22',
        questionText: 'Dental gutta-percha points used in root canal obturation consist chemically of:',
        options: ['Trans-1,4-polyisoprene (naturally derived from Palaquium gutta trees) compounded with zinc oxide (60%–75%) and barium sulfate', 'Cis-1,4-polyisoprene (natural rubber)', 'Polyethylene plastic', 'Wax and talc only'],
        correctOptionIndex: 0,
        explanation: 'Gutta-percha is the trans-isomer of polyisoprene, which is crystalline, ductile, and biocompatible, mixed with zinc oxide and radio-opacifiers (barium sulfate).'
      },
      {
        id: 'mc7_q23',
        questionText: 'Dental wax patterns used in the lost-wax casting technique must burn out cleanly from refractory investment molds without:',
        options: ['Leaving any solid carbonaceous or inorganic ash residue (>0.1%) inside the mold cavity', 'Melting below 100°C', 'Expanding during heating', 'Dissolving in water'],
        correctOptionIndex: 0,
        explanation: 'Inlay casting waxes are engineered to volatilize cleanly at 650°C–700°C leaving zero residue, ensuring complete, porosity-free reproduction of cast metal margins.'
      },
      {
        id: 'mc7_q24',
        questionText: 'In dental amalgam alloy, the gamma-2 phase (Sn8Hg / tin-mercury phase) is undesirable because it is:',
        options: ['The weakest, most corrosion-prone phase leading to marginal ditching and breakdown', 'The hardest phase', 'Radio-opaque', 'Completely resistant to saliva'],
        correctOptionIndex: 0,
        explanation: 'In low-copper amalgams, the gamma-2 (Sn8Hg) phase corrodes rapidly in oral fluids; modern high-copper amalgams (>12% Cu) eliminate gamma-2 by forming Cu6Sn5.'
      },
      {
        id: 'mc7_q25',
        questionText: 'Dental porcelain ceramics used in metal-ceramic (PFM) restorations bond chemically to the metal coping through:',
        options: ['A continuous monomolecular layer of metallic oxides (indium, tin, iron oxide) formed on the alloy surface during degassing', 'Mechanical friction only', 'Super glue', 'Direct gold soldering'],
        correctOptionIndex: 0,
        explanation: 'Degassing the alloy oxidizes trace elements (In, Sn), forming a thin surface oxide layer that shares covalent silicon-oxygen bonds with porcelain silica during firing.'
      }
    ]
  },
  {
    id: 'mc-section-8',
    sectionNumber: 8,
    fileName: '8.docx',
    titleEn: 'Section 8: Mineralization, Calcium, Phosphate & Hydroxyapatite',
    titleAr: 'القسم الثامن: التمعدن، الكالسيوم، الفوسفات وهيدروكسي أباتيت',
    range: '176-200',
    descriptionEn: 'Enamel/dentin crystal structure, chemical formula of hydroxyapatite, ionic substitutions (fluoride, carbonate), and remineralization.',
    descriptionAr: 'تركيب بلورات الميناء والعاج، صيغة هيدروكسي أباتيت، استبدال الأيونات (الفلورايد، الكربونات)، وإعادة التمعدن.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedChemistry&preview=8.docx',
    questions: [
      {
        id: 'mc8_q1',
        questionText: 'What is the stoichiometric chemical formula of pure stoichiometric hydroxyapatite (the primary mineral constituent of human teeth and bone)?',
        options: ['Ca10(PO4)6(OH)2', 'CaCO3', 'Ca3(PO4)2', 'CaSO4 · 2H2O'],
        correctOptionIndex: 0,
        explanation: 'Stoichiometric hydroxyapatite has the formula Ca10(PO4)6(OH)2, with a theoretical calcium-to-phosphorus (Ca/P) molar ratio of 1.67.'
      },
      {
        id: 'mc8_q2',
        questionText: 'Human dental enamel is the most mineralized and hardest tissue in the human body, containing approximately what percentage of mineral by weight?',
        options: ['96% mineral (hydroxyapatite), 1% organic material, and 3% water', '70% mineral and 30% organic', '45% mineral and 55% water', '100% pure gold'],
        correctOptionIndex: 0,
        explanation: 'Mature enamel is composed of ~96% inorganic calcium hydroxyapatite crystals by weight, with less than 1% organic protein matrix (enamelin/amelogenin fragments) and ~3% water.'
      },
      {
        id: 'mc8_q3',
        questionText: 'When fluoride ion (F-) substitutes for the hydroxyl ion (OH-) in the hydroxyapatite crystal lattice, the resulting mineral is:',
        options: ['Fluorapatite [Ca10(PO4)6F2]', 'Calcium fluoride precipitate', 'Fluoroform', 'Fluorosilicic acid'],
        correctOptionIndex: 0,
        explanation: 'Fluoride (F-) has a smaller ionic radius and higher charge density than OH-, fitting tightly into the calcium triangle of the unit cell to form fluorapatite [Ca10(PO4)6F2].'
      },
      {
        id: 'mc8_q4',
        questionText: 'Fluorapatite is significantly more resistant to acid demineralization than pure hydroxyapatite because:',
        options: ['It has a lower solubility product constant (Ksp) and reduces the critical dissolution pH to approximately 4.5', 'It has a critical pH of 7.0', 'It completely dissolves at neutral pH', 'It is an organic plastic'],
        correctOptionIndex: 0,
        explanation: 'Fluorapatite unit cells are more thermodynamically stable and packed, lowering critical pH from 5.5 down to ~4.5, so enamel withstands acidic microbial challenges.'
      },
      {
        id: 'mc8_q5',
        questionText: 'Carbonate (CO3²-) substitution into the dental hydroxyapatite crystal lattice (carbonated apatite) results in:',
        options: ['Lattice distortion, weaker calcium bonds, and significantly higher acid solubility and caries susceptibility', 'Stronger crystals than fluorapatite', 'Lower acid solubility', 'Complete diamond hardness'],
        correctOptionIndex: 0,
        explanation: 'Carbonate ion substitution (Type A for OH-, Type B for PO4³-) disturbs hexagonal lattice packing, creating strain and structural defects that elevate acid solubility.'
      },
      {
        id: 'mc8_q6',
        questionText: 'The critical pH of natural human dental enamel demineralization is approximately:',
        options: ['5.5', '7.4', '6.8', '3.5'],
        correctOptionIndex: 0,
        explanation: 'At pH ~5.5, saliva and plaque fluid become undersaturated with respect to hydroxyapatite, shifting equilibrium from remineralization toward mineral dissolution.'
      },
      {
        id: 'mc8_q7',
        questionText: 'The critical pH of root dentin and cementum demineralization is approximately 6.2 to 6.7, which is much higher than enamel because dentin:',
        options: ['Has smaller, less perfect crystals with higher carbonate and magnesium content and lower mineral percentage (~70%)', 'Has no minerals', 'Has a thick enamel layer', 'Is completely insoluble'],
        correctOptionIndex: 0,
        explanation: 'Dentin contains smaller crystals, higher carbonate impurity (5–6%), and more organic collagen, making it dissolve at a much milder acidic pH (6.2–6.7) than enamel (5.5).'
      },
      {
        id: 'mc8_q8',
        questionText: 'Casein Phosphopeptide-Amorphous Calcium Phosphate (CPP-ACP / Recaldent) aids dental remineralization by:',
        options: ['Stabilizing high concentrations of bioavailable calcium and phosphate ions in a soluble, non-crystalline state in dental plaque', 'Dissolving enamel', 'Etching dentin', 'Acting as a light-curing initiator'],
        correctOptionIndex: 0,
        explanation: 'CPP peptides (from milk casein) bind amorphous calcium phosphate clusters, preventing premature crystallization and delivering supersaturated Ca²+ and PO4³- ions directly into subsurface enamel lesions.'
      },
      {
        id: 'mc8_q9',
        questionText: 'During topical application of high-concentration fluoride gels (e.g. 1.23% APF, 12,300 ppm F-), what temporary reservoir forms on the enamel surface?',
        options: ['A calcium fluoride-like (CaF2) globular precipitate that slowly releases fluoride ions as pH drops', 'Pure gold foil', 'Polyacrylic acid', 'Lead carbonate'],
        correctOptionIndex: 0,
        explanation: 'High fluoride concentrations (>100 ppm) temporarily precipitate globular calcium fluoride (CaF2) on tooth surfaces, which serves as a pH-triggered reservoir releasing fluoride during acid attacks.'
      },
      {
        id: 'mc8_q10',
        questionText: 'Which hormone synthesized by the parathyroid glands is the master regulator elevating serum ionized calcium levels?',
        options: ['Parathyroid Hormone (PTH)', 'Calcitonin', 'Insulin', 'Aldosterone'],
        correctOptionIndex: 0,
        explanation: 'PTH acts on bone (stimulates osteoclast resorption via RANKL), kidney (increases Ca²+ reabsorption and 1-alpha-hydroxylase), and gut (via calcitriol) to raise serum calcium.'
      },
      {
        id: 'mc8_q11',
        questionText: 'Calcitonin, secreted by thyroid parafollicular (C) cells in response to hypercalcemia, acts physiologically to:',
        options: ['Inhibit osteoclast bone resorption, promoting calcium deposition and lowering blood calcium levels', 'Increase osteoclast activity', 'Stimulate parathyroid hormone', 'Decrease urinary calcium excretion'],
        correctOptionIndex: 0,
        explanation: 'Calcitonin binds receptors on osteoclasts, directly inhibiting bone resorption and promoting renal calcium clearance to defend against hypercalcemia.'
      },
      {
        id: 'mc8_q12',
        questionText: 'Pyrophosphate (P2O7⁴-) in human saliva and tartar-control toothpastes acts chemically as an inhibitor of:',
        options: ['Dental calculus (tartar) mineralization by blocking crystal growth of calcium phosphate', 'Salivary amylase', 'Mucin synthesis', 'Bacterial cell division'],
        correctOptionIndex: 0,
        explanation: 'Pyrophosphate ions bind to active growth sites on calcium phosphate crystal nuclei, poisoning crystal growth and preventing plaque calcification into dental calculus.'
      },
      {
        id: 'mc8_q13',
        questionText: 'Dental fluorosis (hypomineralization of enamel caused by excessive fluoride ingestion during odontogenesis) results biochemically from:',
        options: ['Delayed clearance and inhibition of enamel matrix proteases (kallikrein-4 and MMP-20), leading to retained enamel proteins and porous enamel', 'Complete absence of calcium in the body', 'Excessive bacterial infection', 'Tetracycline binding'],
        correctOptionIndex: 0,
        explanation: 'Excess fluoride during the maturation stage of amelogenesis impairs proteolytic degradation of amelogenins, leaving porous, hypomineralized subsurface enamel.'
      },
      {
        id: 'mc8_q14',
        questionText: 'The optimal concentration of fluoride in municipal community drinking water recommended for caries prevention is:',
        options: ['0.7 mg/L (0.7 parts per million / ppm)', '5.0 ppm', '0.01 ppm', '20.0 ppm'],
        correctOptionIndex: 0,
        explanation: 'The US Public Health Service and WHO target 0.7 mg/L (0.7 ppm) as the optimal balance providing maximum caries prevention with minimal dental fluorosis risk.'
      },
      {
        id: 'mc8_q15',
        questionText: 'Enamel rods (prisms) are oriented generally in what anatomical direction relative to the dentinoenamel junction (DEJ) and tooth surface?',
        options: ['Perpendicular (at right angles) to the dentin surface and external enamel margin', 'Parallel to the long axis of the tooth throughout', 'Randomly tangled like wool', 'Concentric circles around pulp'],
        correctOptionIndex: 0,
        explanation: 'Enamel rods run generally perpendicular from the DEJ toward the tooth surface in undulating paths, providing structural resistance against compressive chewing forces.'
      },
      {
        id: 'mc8_q16',
        questionText: 'Stannous fluoride (SnF2) used in dentifrices provides antimicrobial properties in addition to fluoride remineralization due to:',
        options: ['The stannous (Sn²+) ion, which inhibits bacterial glycolysis enzymes and reduces plaque virulence', 'Its strong sweet flavor', 'Releasing high heat', 'Acting as an abrasive grit'],
        correctOptionIndex: 0,
        explanation: 'Stannous ions (Sn²+) enter bacterial cells, inhibiting enolase and thiol-containing enzymes, suppressing acid production and reducing gingivitis.'
      },
      {
        id: 'mc8_q17',
        questionText: 'The chemical composition of dental calculus (mineralized plaque) predominantly consists of which crystalline calcium phosphate phases?',
        options: ['Brushite, Octacalcium phosphate, Hydroxyapatite, and Whitlockite', 'Pure calcium sulfate', 'Sodium chloride crystals', 'Silica quartz'],
        correctOptionIndex: 0,
        explanation: 'Calculus contains four main calcium phosphate phases: brushite (dicalcium phosphate dihydrate), octacalcium phosphate (OCP), hydroxyapatite, and magnesium whitlockite.'
      },
      {
        id: 'mc8_q18',
        questionText: 'Matrix vesicles extruded by osteoblasts and odontoblasts during initial mineral nucleation are rich in:',
        options: ['Alkaline phosphatase (ALP), annexin calcium-binding proteins, and acidic phospholipids', 'Hydrochloric acid', 'Collagen fibers only', 'Pure water'],
        correctOptionIndex: 0,
        explanation: 'Matrix vesicles accumulate Ca²+ via membrane annexins and PO4³- via alkaline phosphatase, triggering initial intravesicular hydroxyapatite crystal precipitation.'
      },
      {
        id: 'mc8_q19',
        questionText: 'Silver Diamine Fluoride (SDF, 38%) arrests active dentinal caries through which synergistic chemical mechanisms?',
        options: ['Silver ions (Ag+) kill bacteria and inhibit MMPs, while fluoride (44,800 ppm) remineralizes dentin into fluorapatite', 'Silver dissolves the tooth', 'It only stains the tooth black with zero biological effect', 'It acts as an impression material'],
        correctOptionIndex: 0,
        explanation: 'SDF provides potent silver ions that denature bacterial proteins and block matrix metalloproteinases, while ultra-high fluoride promotes robust fluorapatite remineralization.'
      },
      {
        id: 'mc8_q20',
        questionText: 'Demineralization of enamel during caries begins at which histological level of the lesion?',
        options: ['Subsurface demineralization beneath an intact, relatively mineralized surface zone (pseudointact surface layer)', 'At the dentinoenamel junction first', 'In the dental pulp chamber', 'Inside root canals'],
        correctOptionIndex: 0,
        explanation: 'Initial "white spot" caries exhibits subsurface body lesion demineralization (loss of up to 50% mineral) covered by a mineral-rich surface zone protected by salivary ions.'
      },
      {
        id: 'mc8_q21',
        questionText: 'Tetracycline staining of teeth occurs when the antibiotic binds chelation complexes with which ion during active tooth development?',
        options: ['Calcium ions (Ca²+) in developing hydroxyapatite crystals, which oxidize under light to gray-brown quinones', 'Sodium ions', 'Potassium ions', 'Chloride ions'],
        correctOptionIndex: 0,
        explanation: 'Tetracyclines chelate calcium in mineralizing dentin and enamel during gestation and childhood up to age 8; exposure to sunlight oxidizes the complex into permanent dark brown stains.'
      },
      {
        id: 'mc8_q22',
        questionText: 'In saliva, Statherin is a specialized tyrosine-rich phosphoprotein whose primary physiological role is to:',
        options: ['Inhibit spontaneous precipitation of supersaturated calcium and phosphate salts, preventing ectopic calculus on teeth and salivary duct stones', 'Digest starch', 'Produce dental caries', 'Increase tooth sensitivity'],
        correctOptionIndex: 0,
        explanation: 'Human saliva is supersaturated with calcium and phosphate; statherin binds crystal growth faces, preventing spontaneous crystallization while keeping ions available for remineralization.'
      },
      {
        id: 'mc8_q23',
        questionText: 'Acidulated Phosphate Fluoride (APF) gel has an acidic pH of approximately 3.0 to 3.5 for what specific chemical purpose?',
        options: ['The mild acidity transiently etches enamel surface apatite, releasing calcium to drive rapid, deep fluoride uptake and CaF2 precipitation', 'To kill pulp tissue', 'To dissolve calculus', 'To improve the strawberry taste'],
        correctOptionIndex: 0,
        explanation: 'The acidic pH (~3.5) causes minor transient enamel dissolution, liberating free Ca²+ ions that rapidly react with high fluoride (12,300 ppm) to form thick CaF2 reservoirs.'
      },
      {
        id: 'mc8_q24',
        questionText: 'Which clinical test confirms that a white spot enamel lesion has remineralized and arrested?',
        options: ['The surface changes from chalky, rough, and opaque to smooth, shiny, and hard on gentle tactile examination', 'The tooth turns soft and hollow', 'The tooth becomes loose', 'Pain increases on biting'],
        correctOptionIndex: 0,
        explanation: 'Arrested remineralized enamel white spots lose their chalky, porous look, acquiring a smooth, shiny, hard surface due to mineral redeposition from saliva and fluoride.'
      },
      {
        id: 'mc8_q25',
        questionText: 'The mineral-to-collagen ratio in mature dentin is approximately:',
        options: ['70% inorganic mineral, 20% organic matrix (predominantly Type I collagen), and 10% water by weight', '96% mineral and 4% water', '10% mineral and 90% organic', '50% mineral and 50% fat'],
        correctOptionIndex: 0,
        explanation: 'Dentin consists of ~70% inorganic hydroxyapatite, ~20% organic collagenous scaffold (90% type I collagen), and ~10% fluid water, giving dentin high flexural resilience.'
      }
    ]
  }
];
