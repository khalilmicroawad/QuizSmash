import { Question } from '../types/quiz';

export interface MedicalPhysicsSection {
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

export const MEDICAL_PHYSICS_SECTIONS: MedicalPhysicsSection[] = [
  {
    id: 'mp-section-1',
    sectionNumber: 1,
    fileName: '1.docx',
    titleEn: 'Section 1: Atomic Physics & Electromagnetic Radiation',
    titleAr: 'القسم الأول: الفيزياء الذرية والإشعاع الكهرومغناطيسي',
    range: '1-25',
    descriptionEn: 'Atomic models, binding energies, photon energy (E=hf), inverse square law, and electromagnetic spectrum.',
    descriptionAr: 'النماذج الذرية، طاقة الارتباط، طاقة الفوتون، قانون التربيع العكسي، والطيف الكهرومغناطيسي.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedPhysics&preview=1.docx',
    questions: [
      {
        id: 'mp1_q1',
        questionText: 'According to Planck quantum theory, the energy (E) of an electromagnetic photon is directly proportional to its:',
        options: ['Frequency (E = hf)', 'Wavelength (E = hλ)', 'Intensity squared', 'Speed of sound'],
        correctOptionIndex: 0,
        explanation: 'Photon energy is given by Planck relation E = h·f (or E = hc/λ), meaning energy increases directly with photon frequency and inversely with wavelength.'
      },
      {
        id: 'mp1_q2',
        questionText: 'Which electron shell in an atom possesses the highest binding energy to the nucleus?',
        options: ['K shell (n = 1)', 'L shell (n = 2)', 'M shell (n = 3)', 'N shell (n = 4)'],
        correctOptionIndex: 0,
        explanation: 'Electrons closest to the positive nuclear charge (K shell, principal quantum number n=1) experience the strongest electrostatic attraction and highest binding energy.'
      },
      {
        id: 'mp1_q3',
        questionText: 'If the distance from an X-ray radiation source to a patient is doubled (from 1 meter to 2 meters), the radiation intensity:',
        options: ['Decreases to one-fourth (1/4) of the original value', 'Halves (1/2)', 'Remains unchanged', 'Decreases to one-eighth (1/8)'],
        correctOptionIndex: 0,
        explanation: 'By the Inverse Square Law (I ∝ 1/d²), doubling the distance reduces the radiation dose rate to (1/2)² = 1/4 of its initial intensity.'
      },
      {
        id: 'mp1_q4',
        questionText: 'Ionizing radiation is distinguished from non-ionizing radiation by its ability to:',
        options: ['Eject orbital electrons from atoms, creating ion pairs', 'Warm tissue gently through molecular vibration only', 'Be seen with the naked human eye', 'Travel only through copper wires'],
        correctOptionIndex: 0,
        explanation: 'Ionizing radiation carries sufficient quantum energy (>10–12 eV, e.g., X-rays, gamma rays) to overcome electron binding energies and strip orbital electrons.'
      },
      {
        id: 'mp1_q5',
        questionText: 'In the electromagnetic spectrum, which radiation possesses the shortest wavelength and highest photon energy?',
        options: ['Gamma rays and hard X-rays', 'Ultraviolet light', 'Visible green light', 'Microwaves'],
        correctOptionIndex: 0,
        explanation: 'Gamma rays and hard X-rays occupy the highest frequency and shortest wavelength band of the electromagnetic spectrum, possessing lethal ionizing energy.'
      },
      {
        id: 'mp1_q6',
        questionText: 'What is the speed of all electromagnetic radiation (including diagnostic X-rays) in a vacuum?',
        options: ['3.0 × 10^8 m/s (speed of light, c)', '343 m/s', '1.5 × 10^6 m/s', 'Infinite speed'],
        correctOptionIndex: 0,
        explanation: 'All electromagnetic waves propagate through vacuum at the universal speed of light, c ≈ 3.0 × 10^8 meters per second.'
      },
      {
        id: 'mp1_q7',
        questionText: 'Radioactive decay where an unstable nucleus emits a helium nucleus (two protons and two neutrons) is called:',
        options: ['Alpha decay (α)', 'Beta-minus decay (β-)', 'Beta-plus (positron) decay', 'Gamma emission'],
        correctOptionIndex: 0,
        explanation: 'Alpha particles are helium-4 nuclei (2 protons, 2 neutrons, +2 charge) with high linear energy transfer (LET) and poor penetration (stopped by paper).'
      },
      {
        id: 'mp1_q8',
        questionText: 'The time required for half of the radioactive atoms in a sample to undergo decay is termed the:',
        options: ['Half-life (T1/2)', 'Decay constant (λ)', 'Biological clearance time', 'Mean transit time'],
        correctOptionIndex: 0,
        explanation: 'The radioactive half-life is the characteristic time interval after which the remaining activity drops to exactly 50% of its initial value: T1/2 = ln(2)/λ.'
      },
      {
        id: 'mp1_q9',
        questionText: 'Which interaction of X-rays with matter is primarily responsible for subject contrast in diagnostic dental radiographs?',
        options: ['Photoelectric absorption', 'Compton scattering', 'Coherent (Rayleigh) scattering', 'Pair production'],
        correctOptionIndex: 0,
        explanation: 'Photoelectric effect probability depends heavily on atomic number cubed (Z³). High-Z enamel (calcium/phosphate) absorbs far more X-rays than low-Z soft tissue, creating contrast.'
      },
      {
        id: 'mp1_q10',
        questionText: 'Which X-ray interaction with tissue dominates at higher diagnostic energies and produces scattered photons degrading image quality?',
        options: ['Compton scattering', 'Photoelectric effect', 'Photodisintegration', 'Fluorescence'],
        correctOptionIndex: 0,
        explanation: 'In Compton scattering, an incident X-ray ejects an outer loosely bound electron, deflecting a scattered photon that produces background fog and staff radiation exposure.'
      },
      {
        id: 'mp1_q11',
        questionText: 'Pair production can only occur when an incident photon carries an energy of at least:',
        options: ['1.022 MeV (twice the rest mass energy of an electron)', '0.511 MeV', '10 keV', '100 keV'],
        correctOptionIndex: 0,
        explanation: 'Pair production creates an electron and a positron, requiring minimum threshold photon energy equal to 2 × m_e × c² = 1.022 MeV, far above dental diagnostic energies.'
      },
      {
        id: 'mp1_q12',
        questionText: 'The SI unit of radioactive activity, representing one nuclear disintegration per second, is the:',
        options: ['Becquerel (Bq)', 'Curie (Ci)', 'Gray (Gy)', 'Sievert (Sv)'],
        correctOptionIndex: 0,
        explanation: '1 Becquerel (Bq) is defined as 1 decay event per second. The older non-SI unit is the Curie (1 Ci = 3.7 × 10^10 Bq).'
      },
      {
        id: 'mp1_q13',
        questionText: 'What is the SI unit for absorbed radiation dose, representing 1 Joule of energy absorbed per kilogram of matter?',
        options: ['Gray (Gy)', 'Sievert (Sv)', 'Roentgen (R)', 'Rad'],
        correctOptionIndex: 0,
        explanation: 'The Gray (Gy) measures physical absorbed energy: 1 Gy = 1 J/kg. (The older unit was the rad: 1 Gy = 100 rad).'
      },
      {
        id: 'mp1_q14',
        questionText: 'The Sievert (Sv) is the SI unit used specifically for:',
        options: ['Equivalent and effective biological radiation dose', 'Absorbed physical dose', 'Air kerma only', 'Exposure rate in air'],
        correctOptionIndex: 0,
        explanation: 'The Sievert (Sv) accounts for biological harm by multiplying absorbed dose (Gy) by the radiation weighting factor (W_R) and tissue weighting factors (W_T).'
      },
      {
        id: 'mp1_q15',
        questionText: 'Linear Energy Transfer (LET) quantifies:',
        options: ['The average energy deposited per unit distance along the track of an ionizing particle (keV/µm)', 'The speed of light in vacuum', 'The rate of radioactive decay', 'The voltage of the X-ray tube'],
        correctOptionIndex: 0,
        explanation: 'LET describes how densely radiation deposits energy along its path. Alpha particles are high-LET, while X-rays and electrons are low-LET.'
      },
      {
        id: 'mp1_q16',
        questionText: 'The wave-particle duality of electromagnetic radiation means that radiation behaves as:',
        options: ['Both continuous traveling transverse waves and discrete localized energy packets (photons)', 'Strictly classical solid spheres', 'Sound waves in liquid only', 'Electrical current in metal'],
        correctOptionIndex: 0,
        explanation: 'Quantum mechanics demonstrates that light exhibits wave phenomena (diffraction, interference) and particle phenomena (photoelectric emission).'
      },
      {
        id: 'mp1_q17',
        questionText: 'Which property of light describes the bending of a wave when it passes obliquely from one optical medium to another with a different refractive index?',
        options: ['Refraction', 'Reflection', 'Diffraction', 'Polarization'],
        correctOptionIndex: 0,
        explanation: 'Refraction occurs because light changes phase velocity when entering a medium with a different optical density, described by Snell’s law: n1 sin θ1 = n2 sin θ2.'
      },
      {
        id: 'mp1_q18',
        questionText: 'Total internal reflection, essential for dental fiber-optic light-curing guides and illumination cables, occurs when light strikes a boundary:',
        options: ['At an angle of incidence greater than the critical angle, traveling from denser to rarer medium', 'At exactly 90 degrees', 'Only in pure vacuum', 'From air into diamond'],
        correctOptionIndex: 0,
        explanation: 'Total internal reflection requires the light to originate in a higher refractive index medium and hit the boundary at an angle exceeding the critical angle (θ > θ_c).'
      },
      {
        id: 'mp1_q19',
        questionText: 'In classical electrodynamics, an accelerating or decelerating electric charge will always:',
        options: ['Emit electromagnetic radiation', 'Absorb mass', 'Become neutral', 'Stop moving instantly'],
        correctOptionIndex: 0,
        explanation: 'Any accelerated or decelerated charged particle radiates electromagnetic energy (the fundamental basis of bremsstrahlung / braking X-ray production).'
      },
      {
        id: 'mp1_q20',
        questionText: 'Characteristic X-ray emission occurs when:',
        options: ['An incoming projectile electron expels an inner-shell electron, and an outer-shell electron drops into the vacancy', 'A photon bounces elastically off an atom', 'A nucleus divides', 'A thermal proton stops'],
        correctOptionIndex: 0,
        explanation: 'When an inner (K-shell) electron is ejected, an outer electron fills the hole, releasing a photon whose energy equals the exact difference between the two binding energy states.'
      },
      {
        id: 'mp1_q21',
        questionText: 'Isotopes are nuclides that share the same:',
        options: ['Atomic number (number of protons) but have different neutron numbers and mass numbers', 'Mass number (protons + neutrons)', 'Number of neutrons only', 'Chemical valency only'],
        correctOptionIndex: 0,
        explanation: 'Isotopes have identical numbers of nuclear protons (same element and identical chemical properties) but differing numbers of neutrons.'
      },
      {
        id: 'mp1_q22',
        questionText: 'The half-value layer (HVL) of an X-ray beam measures:',
        options: ['The thickness of a specified absorbing material (e.g. aluminum) required to reduce beam intensity by 50%', 'The physical length of the collimator cone', 'The exposure time in seconds', 'The distance to the target'],
        correctOptionIndex: 0,
        explanation: 'HVL is the standard measure of beam quality and penetrability: it is the absorber thickness that attenuates the X-ray beam intensity to half its unattenuated level.'
      },
      {
        id: 'mp1_q23',
        questionText: 'Attenuation of a monoenergetic X-ray beam passing through an absorber follows which mathematical law?',
        options: ['Exponential decay law: I = I_0 · e^(-μx)', 'Linear decrease: I = I_0 - kx', 'Inverse square law: I = I_0 / x²', 'Logarithmic increase'],
        correctOptionIndex: 0,
        explanation: 'Narrow-beam monoenergetic photon attenuation is strictly exponential with depth x, governed by the linear attenuation coefficient μ.'
      },
      {
        id: 'mp1_q24',
        questionText: 'Free radicals generated by the radiolysis of water in biological tissues by ionizing radiation predominantly include:',
        options: ['Hydroxyl radicals (·OH) and hydrogen radicals (·H)', 'Helium atoms', 'Nitrate ions', 'Sodium ions'],
        correctOptionIndex: 0,
        explanation: 'Ionizing radiation ionizes intracellular water (H2O -> H2O+ + e-), leading to highly reactive hydroxyl free radicals (·OH) that cause indirect oxidative DNA double-strand breaks.'
      },
      {
        id: 'mp1_q25',
        questionText: 'Thermography in medical diagnosis detects electromagnetic emission in which spectral region?',
        options: ['Infrared radiation emitted as heat by the human body', 'Ultraviolet radiation', 'Radio waves', 'Gamma rays'],
        correctOptionIndex: 0,
        explanation: 'Human body surface temperature (~37°C) emits blackbody radiation peaking in the mid-to-far infrared spectrum (~10 µm wavelength).'
      }
    ]
  },
  {
    id: 'mp-section-2',
    sectionNumber: 2,
    fileName: '2.docx',
    titleEn: 'Section 2: X-Ray Production & Dental Radiology',
    titleAr: 'القسم الثاني: إنتاج الأشعة السينية وأشعة الأسنان',
    range: '26-50',
    descriptionEn: 'X-ray tube construction, cathode filament, tungsten anode target, bremsstrahlung, filtration, and collimation.',
    descriptionAr: 'تركيب أنبوبة الأشعة، فتيلة المهبط، هدف التنجستن، إشعاع الكبح، الترشيح والتسديد.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedPhysics&preview=2.docx',
    questions: [
      {
        id: 'mp2_q1',
        questionText: 'In a diagnostic dental X-ray tube, electrons are boiled off from the cathode filament via:',
        options: ['Thermionic emission', 'Photoelectric emission', 'Field emission', 'Spontaneous ionization'],
        correctOptionIndex: 0,
        explanation: 'Heating the tungsten cathode filament to incandescence (~2000°C) provides thermal energy that allows electrons to overcome the work function and boil off (thermionic emission).'
      },
      {
        id: 'mp2_q2',
        questionText: 'Why is tungsten (W, Z=74) the universally preferred target anode material in dental X-ray tubes?',
        options: ['High melting point (3422°C), high atomic number (Z=74), and good thermal conductivity', 'Low density and high flexibility', 'It is liquid at room temperature', 'It absorbs all heat with zero radiation'],
        correctOptionIndex: 0,
        explanation: 'Tungsten has an exceptionally high melting point (3422°C), high atomic number (Z=74, maximizing bremsstrahlung efficiency), and low vapor pressure.'
      },
      {
        id: 'mp2_q3',
        questionText: 'In an ordinary dental X-ray tube operated at 70 kVp, approximately what percentage of kinetic energy is converted into X-rays versus waste heat?',
        options: ['~1% converted into X-rays, ~99% lost as heat', '~50% X-rays, ~50% heat', '~90% X-rays, ~10% heat', '~99% X-rays, ~1% heat'],
        correctOptionIndex: 0,
        explanation: 'X-ray tube efficiency is notoriously low: over 99% of electron projectile energy is dissipated as thermal collisions in the anode target, and less than 1% produces X-ray photons.'
      },
      {
        id: 'mp2_q4',
        questionText: 'Bremsstrahlung ("braking") radiation in the X-ray target is produced when:',
        options: [
          'High-speed incident electrons are deflected and decelerated by the positive electric field of tungsten nuclei.',
          'Electrons knock out K-shell electrons directly.',
          'Protons hit the cathode.',
          'Photons are absorbed by the glass envelope.'
        ],
        correctOptionIndex: 0,
        explanation: 'Bremsstrahlung occurs when projectile electrons decelerate in the nuclear Coulomb field of target atoms, converting lost kinetic energy into a continuous spectrum of photons.'
      },
      {
        id: 'mp2_q5',
        questionText: 'Increasing the tube peak kilovoltage (kVp) in a dental X-ray machine primarily results in:',
        options: ['Higher photon penetrability (beam quality) and increased maximum photon energy', 'Longer wavelengths only', 'Decreasing the total number of photons', 'Making the focal spot smaller'],
        correctOptionIndex: 0,
        explanation: 'Higher kVp increases the kinetic energy of striking electrons, shifting the continuous spectrum rightward, shortening minimum wavelength (λ_min = 1.24/kVp), and increasing penetrability.'
      },
      {
        id: 'mp2_q6',
        questionText: 'Adjusting the tube current (milliamperage, mA) in a dental X-ray unit modifies:',
        options: ['The quantity (number) of X-ray photons emitted per second without changing their maximum energy', 'The maximum photon energy', 'The focal spot size', 'The speed of light'],
        correctOptionIndex: 0,
        explanation: 'Tube current (mA) controls the filament temperature and the number of electrons crossing to the anode per second, directly modulating photon quantity.'
      },
      {
        id: 'mp2_q7',
        questionText: 'The Line-Focus Principle in X-ray tube engineering is utilized to:',
        options: [
          'Provide a large actual focal spot for thermal heat dissipation while projecting a small effective focal spot for sharp image resolution.',
          'Double the kilovoltage automatically.',
          'Filter out high-energy gamma rays.',
          'Increase the penumbra effect.'
        ],
        correctOptionIndex: 0,
        explanation: 'By angling the anode target (typically 7° to 20°), the electron impact area (actual focal spot) is large for heat distribution, while the projected beam (effective focal spot) is small, enhancing sharpness.'
      },
      {
        id: 'mp2_q8',
        questionText: 'What is the primary function of aluminum filtration placed in the dental X-ray tube housing?',
        options: ['Selectively absorb low-energy, non-penetrating X-ray photons that would otherwise increase patient skin dose', 'Increase beam scatter', 'Increase exposure time', 'Cool the oil bath'],
        correctOptionIndex: 0,
        explanation: 'Low-energy ("soft") X-rays lack the energy to penetrate through tissues to reach the sensor; aluminum filters "harden" the beam by removing these harmlessly to reduce patient skin dose.'
      },
      {
        id: 'mp2_q9',
        questionText: 'Federal guidelines for dental X-ray machines operating above 70 kVp require a minimum total filtration equivalent to:',
        options: ['2.5 mm of aluminum equivalent', '0.5 mm of aluminum', '5.0 mm of lead', '10.0 mm of copper'],
        correctOptionIndex: 0,
        explanation: 'For dental equipment operating above 70 kVp, safety regulations mandate a minimum of 2.5 mm aluminum equivalent total filtration (inherent + added).'
      },
      {
        id: 'mp2_q10',
        questionText: 'Rectangular collimation compared to circular collimation in intraoral periapical radiography reduces patient radiation dose by approximately:',
        options: ['60% to 70%', '5% to 10%', '0% (no difference)', '99.9%'],
        correctOptionIndex: 0,
        explanation: 'Rectangular collimators restrict the X-ray beam beam area to just slightly larger than the size 2 intraoral sensor, reducing irradiated tissue volume and dose by up to 60–70%.'
      },
      {
        id: 'mp2_q11',
        questionText: 'The Anode Heel Effect refers to the physical phenomenon where:',
        options: ['Radiation intensity is slightly lower on the anode side because photons are attenuated by the anode target itself', 'The cathode melts first', 'Filtration fails at high temperature', 'Collimation becomes trapezoidal'],
        correctOptionIndex: 0,
        explanation: 'X-rays produced deeper within the angled target must travel through more target material toward the anode side, resulting in greater self-attenuation and lower intensity on the anode side.'
      },
      {
        id: 'mp2_q12',
        questionText: 'Geometric unsharpness (penumbra) on a dental radiograph is minimized by:',
        options: ['Small focal spot size, long source-to-object distance, and short object-to-receptor distance', 'Large focal spot and short cone', 'Moving the sensor during exposure', 'Using unfiltered beams'],
        correctOptionIndex: 0,
        explanation: 'Penumbra = (focal spot × object-to-receptor distance) / source-to-object distance. Minimizing focal spot and object distance while maximizing source distance produces the sharpest image.'
      },
      {
        id: 'mp2_q13',
        questionText: 'The paralleling technique in dental periapical radiography is preferred over the bisecting angle technique because it:',
        options: ['Minimizes dimensional distortion and produces true anatomical proportions', 'Requires no sensor holders', 'Uses zero radiation', 'Takes shorter exposure time'],
        correctOptionIndex: 0,
        explanation: 'The paralleling technique places the receptor parallel to the long axis of the tooth and directs the central ray perpendicular to both, eliminating elongation and foreshortening distortion.'
      },
      {
        id: 'mp2_q14',
        questionText: 'On a processed dental radiograph, enamel appears radio-opaque (white/light gray) compared to dental pulp because:',
        options: ['Enamel has high mineral density (96% hydroxyapatite) with a high effective atomic number, absorbing more X-rays', 'Enamel is softer than pulp', 'Enamel produces fluorescent light', 'Pulp absorbs all X-rays'],
        correctOptionIndex: 0,
        explanation: 'High physical density and high atomic number of calcium and phosphate in enamel attenuate X-rays by photoelectric absorption, leaving fewer photons to expose the sensor (radio-opaque).'
      },
      {
        id: 'mp2_q15',
        questionText: 'In digital intraoral radiography, what does a photostimulable phosphor plate (PSP) store prior to laser scanning?',
        options: ['A latent image stored as trapped electrons in europium-doped barium fluorohalide crystals', 'Liquid chemical developer', 'Silver halide grains in gelatin', 'Magnetic audio tracks'],
        correctOptionIndex: 0,
        explanation: 'PSP plates trap X-ray-excited electrons in crystal lattice energy levels (color centers), which are subsequently stimulated by red laser light to emit blue luminescence.'
      },
      {
        id: 'mp2_q16',
        questionText: 'Direct digital sensors (such as CCD or CMOS sensors) provide what primary clinical advantage over traditional film?',
        options: ['Instantaneous image display and 50% to 80% reduction in patient radiation dose', 'Thicker rigid profile comfortable for small mouths', 'Zero cost', 'No electronic cables or wireless receptors'],
        correctOptionIndex: 0,
        explanation: 'Solid-state digital sensors have superior quantum detection efficiency (DQE), dramatically lowering radiation exposure and delivering instant chairside images without chemical processing.'
      },
      {
        id: 'mp2_q17',
        questionText: 'In Cone Beam Computed Tomography (CBCT) for dental maxillofacial imaging, volumetric data is reconstructed from voxels that are characteristically:',
        options: ['Isotropic (equal dimensions in all x, y, and z planes)', 'Anisotropic (stretched along z-axis)', 'Hexagonal cylinders', '2D pixels without depth'],
        correctOptionIndex: 0,
        explanation: 'Dental CBCT units acquire volumetric datasets composed of sub-millimeter isotropic voxels (0.075 to 0.4 mm³), allowing geometrically exact 1:1 measurements in any re-sliced plane.'
      },
      {
        id: 'mp2_q18',
        questionText: 'The focusing cup of the X-ray tube cathode is negatively charged for what purpose?',
        options: ['To electrostatically repel and focus the divergent electron cloud into a narrow beam hitting the focal track', 'To attract positive ions', 'To heat the filament', 'To ground the machine'],
        correctOptionIndex: 0,
        explanation: 'Made of molybdenum or nickel, the negatively charged focusing cup electrostatically repels electrons away from each other, converging them toward the anode focal spot.'
      },
      {
        id: 'mp2_q19',
        questionText: 'Foreshortening of a tooth image on a dental radiograph results when the central X-ray beam is:',
        options: ['Angled too steeply (excessive vertical angulation) perpendicular to the receptor instead of the bisector', 'Angled too flatly (insufficient vertical angulation)', 'Directed off-center horizontally', 'Placed too far away'],
        correctOptionIndex: 0,
        explanation: 'Excessive vertical angulation projects the anatomical crown and root toward each other, causing the tooth to appear artificially foreshortened (shorter than actual size).'
      },
      {
        id: 'mp2_q20',
        questionText: 'Elongation of a tooth image on a periapical film occurs when vertical angulation is:',
        options: ['Insufficient (too flat), projecting the image long', 'Too steep', 'Centered perfectly', 'Filtered with copper'],
        correctOptionIndex: 0,
        explanation: 'Insufficient vertical angulation projects the beam perpendicular to the tooth axis rather than the bisector, casting a stretched shadow and elongating root images.'
      },
      {
        id: 'mp2_q21',
        questionText: 'Overlapped interproximal contact points on a bite-wing radiograph are caused by:',
        options: ['Incorrect horizontal angulation of the central X-ray beam', 'Incorrect vertical angulation', 'Excessive filtration', 'Receptor bending'],
        correctOptionIndex: 0,
        explanation: 'To open interproximal contacts cleanly, the central ray must be directed parallel to the contact surfaces (correct horizontal angulation); oblique angles cause contact overlapping.'
      },
      {
        id: 'mp2_q22',
        questionText: 'Which electrical transformer inside the dental X-ray control box steps up wall line voltage (110–220 V) to kilovolts (60–90 kV)?',
        options: ['Step-up high-voltage transformer', 'Step-down filament transformer', 'Autotransformer only', 'Direct current rectifier'],
        correctOptionIndex: 0,
        explanation: 'The high-voltage step-up transformer features many more secondary coil turns than primary turns to convert household line voltage into kilovolts (60,000–90,000 V).'
      },
      {
        id: 'mp2_q23',
        questionText: 'What constitutes the focal spot track on a rotating anode in high-output medical/panoramic radiology?',
        options: ['A beveled circular track of tungsten-rhenium alloy on a molybdenum/graphite disc', 'A solid copper plate', 'A lead foil strip', 'A water-cooled glass window'],
        correctOptionIndex: 0,
        explanation: 'Rotating anodes spread heat across a wide circular track (up to 3000–10,000 rpm) composed of tungsten with 5–10% rhenium to resist thermal cracking.'
      },
      {
        id: 'mp2_q24',
        questionText: 'Scatter radiation reaching a dental radiographic sensor causes what defect in image quality?',
        options: ['Loss of image contrast due to uniform radiation fogging', 'Increased sharpness', 'Sharp magnification', 'Color banding'],
        correctOptionIndex: 0,
        explanation: 'Compton-scattered photons hit the detector randomly, adding non-diagnostic background exposure that washes out dark/light contrast and blurs tissue boundaries.'
      },
      {
        id: 'mp2_q25',
        questionText: 'Radiolucent anatomical structures on dental radiographs appear dark or black because they:',
        options: ['Offer minimal resistance to X-ray passage, allowing abundant photons to reach and expose the receptor', 'Absorb all X-rays completely', 'Reflect X-rays like a mirror', 'Are made of cortical bone'],
        correctOptionIndex: 0,
        explanation: 'Radiolucent tissues (maxillary sinus, pulp chamber, mental foramen) have low density, letting X-rays pass unhindered to expose the detector, rendering dark pixels.'
      }
    ]
  },
  {
    id: 'mp-section-3',
    sectionNumber: 3,
    fileName: '3.docx',
    titleEn: 'Section 3: Lasers in Dentistry & Medical Optics',
    titleAr: 'القسم الثالث: الليزر في طب الأسنان والبصريات الطبية',
    range: '51-75',
    descriptionEn: 'Stimulated emission, laser properties (monochromatic, coherent, collimated), Nd:YAG, Er:YAG, CO2, and diode lasers.',
    descriptionAr: 'الانبعاث المستحث، خصائص الليزر (أحادي اللون، متشاكه، متوازي)، ليزر الإربيوم، ثنائي أكسيد الكربون، والدايود.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedPhysics&preview=3.docx',
    questions: [
      {
        id: 'mp3_q1',
        questionText: 'The acronym LASER stands for:',
        options: [
          'Light Amplification by Stimulated Emission of Radiation',
          'Linear Accelerated Scattering of Electron Radiation',
          'Localized Acoustic Stimulation by Energy Reflection',
          'Light Absorption through Super-Equilibrium Resonance'
        ],
        correctOptionIndex: 0,
        explanation: 'LASER is the universally recognized acronym for Light Amplification by Stimulated Emission of Radiation, first postulated by Albert Einstein in 1917.'
      },
      {
        id: 'mp3_q2',
        questionText: 'Which physical condition must be achieved in an active laser medium for stimulated emission to overcome spontaneous absorption?',
        options: ['Population inversion (more atoms in the excited metastable state than ground state)', 'Absolute zero temperature', 'Complete vacuum', 'High electrical resistance'],
        correctOptionIndex: 0,
        explanation: 'Population inversion occurs when external pumping forces more atoms into higher energy metastable states than reside in ground states, enabling net light amplification.'
      },
      {
        id: 'mp3_q3',
        questionText: 'Which unique property of laser radiation means that all emitted photons have the exact same wavelength and frequency?',
        options: ['Monochromaticity', 'Spatial coherence', 'Temporal divergence', 'Incoherent polarization'],
        correctOptionIndex: 0,
        explanation: 'Laser light is strictly monochromatic because emitted stimulated photons correspond to one specific transition energy (E2 - E1 = hf).'
      },
      {
        id: 'mp3_q4',
        questionText: 'Laser light coherence means that all emitted electromagnetic waves are:',
        options: ['In phase with one another in both time and space', 'Out of phase randomly', 'Scattered in 360 degrees', 'Made of divergent rays'],
        correctOptionIndex: 0,
        explanation: 'Coherence dictates that the crests and troughs of every photon wave align perfectly in space and time, producing intense constructive interference.'
      },
      {
        id: 'mp3_q5',
        questionText: 'Which dental laser wavelength is strongly absorbed by water and hydroxyapatite, making it the primary choice for hard tissue cavity preparation?',
        options: ['Er:YAG laser (2,940 nm)', 'Diode laser (810–980 nm)', 'Nd:YAG laser (1,064 nm)', 'He-Ne laser (632.8 nm)'],
        correctOptionIndex: 0,
        explanation: 'The Er:YAG laser emits at 2,940 nm, exactly matching the primary absorption peak of water and hydroxyapatite, ablating tooth structure with minimal thermal collateral damage.'
      },
      {
        id: 'mp3_q6',
        questionText: 'Diode lasers (810–980 nm) and Nd:YAG lasers (1064 nm) in dentistry are primarily absorbed by which tissue chromophores?',
        options: ['Hemoglobin and melanin (soft tissue pigments)', 'Water and hydroxyapatite only', 'Dental enamel prisms only', 'Salivary electrolytes'],
        correctOptionIndex: 0,
        explanation: 'Near-infrared diode and Nd:YAG wavelengths are poorly absorbed by water but highly absorbed by dark pigments (hemoglobin, melanin), making them premier soft-tissue hemostatic surgical tools.'
      },
      {
        id: 'mp3_q7',
        questionText: 'The Carbon Dioxide (CO2) laser (10,600 nm) is clinically characterized in oral surgery by:',
        options: ['Extremely high absorption in water, shallow penetration depth, and superb soft-tissue coagulation', 'Deep tissue penetration into bone', 'Zero coagulation ability', 'Curing resin composites'],
        correctOptionIndex: 0,
        explanation: 'CO2 lasers emit in the far infrared (10.6 µm) where water absorption is enormous, creating rapid superficial vaporization with a microscopic zone of sealed capillary hemostasis.'
      },
      {
        id: 'mp3_q8',
        questionText: 'Which optical element forms the optical cavity (resonator) of a laser system?',
        options: ['Two parallel mirrors (one 100% reflective, one partially reflective output coupler) surrounding the active medium', 'A copper coil', 'A prism', 'A glass filter'],
        correctOptionIndex: 0,
        explanation: 'The Fabry-Pérot optical resonator reflects photons back and forth through the active gain medium repeatedly to stimulate more emission, leaking laser light through the output coupler.'
      },
      {
        id: 'mp3_q9',
        questionText: 'In dental composite light-curing units, blue LED lights emit wavelengths typically centered around 450–470 nm to activate which photoinitiator?',
        options: ['Camphorquinone (CQ)', 'Benzophenone', 'Riboflavin', 'Chlorophyll'],
        correctOptionIndex: 0,
        explanation: 'Camphorquinone is the standard visible-light photoinitiator in resin composites; its maximum absorption spectrum peaks prominently at ~468 nm in the blue range.'
      },
      {
        id: 'mp3_q10',
        questionText: 'Photobiomodulation (Low-Level Laser Therapy / LLLT) accelerates wound healing and relieves pain primarily by stimulating which mitochondrial enzyme?',
        options: ['Cytochrome c oxidase (Complex IV)', 'DNA polymerase', 'Amylase', 'Catalase'],
        correctOptionIndex: 0,
        explanation: 'Red and near-infrared photons are absorbed by cytochrome c oxidase in the mitochondrial respiratory chain, increasing electron transport, ATP synthesis, and reducing oxidative stress.'
      },
      {
        id: 'mp3_q11',
        questionText: 'During dental laser surgery, what is the mandatory safety precaution required for everyone present in the operatory (including the patient)?',
        options: ['Wavelength-specific protective eyewear (safety glasses with correct optical density, OD)', 'Lead apron', 'Rubber boots', 'Ear plugs'],
        correctOptionIndex: 0,
        explanation: 'Laser eye injury is an extreme risk: diffuse reflections can cause irreversible corneal or retinal burns. Goggles matching the exact laser wavelength and optical density (OD) are mandatory.'
      },
      {
        id: 'mp3_q12',
        questionText: 'What term defines the depth at which the intensity of laser radiation drops to 1/e (~37%) of its incident surface value?',
        options: ['Optical penetration depth (1/μ_a)', 'Rayleigh distance', 'Focal length', 'Beam waist'],
        correctOptionIndex: 0,
        explanation: 'Optical penetration depth is the reciprocal of the total attenuation coefficient, defining the characteristic tissue thickness through which laser light penetrates.'
      },
      {
        id: 'mp3_q13',
        questionText: 'The thermal relaxation time (TRT) of targeted tissue is defined as the time required for:',
        options: ['The heated tissue to lose 50% of its acquired peak heat through thermal diffusion', 'The laser to reach full power', 'The patient to feel warmth', 'The blood to coagulate'],
        correctOptionIndex: 0,
        explanation: 'TRT is the time needed for target tissue to cool down by 50% via conduction. To prevent collateral thermal necrosis, laser pulse durations must be shorter than the target TRT.'
      },
      {
        id: 'mp3_q14',
        questionText: 'Which laser delivers radiation through an optical quartz fiber optic delivery system due to its flexible near-infrared wavelength?',
        options: ['Nd:YAG and Diode lasers', 'CO2 laser (10,600 nm)', 'Excimer laser', 'X-ray tube'],
        correctOptionIndex: 0,
        explanation: 'Near-infrared wavelengths (810–1064 nm) transmit efficiently through flexible silica glass fibers, whereas 10,600 nm CO2 lasers require articulated arms with mirrors or hollow waveguides.'
      },
      {
        id: 'mp3_q15',
        questionText: 'Laser-assisted cavity preparation using Er,Cr:YSGG or Er:YAG lasers ablates hard tooth structure via which physical mechanism?',
        options: ['Micro-explosive thermomechanical vaporization of subsurface water trapped in hydroxyapatite', 'Chemical dissolving', 'Frictional heat melting', 'Sonic erosion'],
        correctOptionIndex: 0,
        explanation: 'Subsurface water instantly superheats into steam, expanding volumetrically and micro-explosively fracturing surrounding brittle mineralized enamel and dentin without heat buildup.'
      },
      {
        id: 'mp3_q16',
        questionText: 'Which class of medical lasers presents a high risk of skin burns and permanent blindness from direct beam or specular reflection, encompassing all dental surgical lasers?',
        options: ['Class 4 (Class IV)', 'Class 1', 'Class 2', 'Class 3R'],
        correctOptionIndex: 0,
        explanation: 'Class 4 lasers emit powers >500 mW. They are hazardous to both skin and eyes from direct exposure, specular reflection, and diffuse scatter, and present a fire hazard.'
      },
      {
        id: 'mp3_q17',
        questionText: 'Fluorescence-based caries detection devices (such as DIAGNOdent) illuminate teeth with 655 nm red laser light to detect:',
        options: ['Red infrared fluorescence emitted by bacterial porphyrin metabolites inside carious dentin', 'Pure enamel reflection', 'Water content only', 'White spot translucency'],
        correctOptionIndex: 0,
        explanation: 'Cariogenic bacteria produce protoporphyrins that fluoresce in the near-infrared spectrum (~700 nm) when excited by 655 nm light, quantifying hidden occlusal caries.'
      },
      {
        id: 'mp3_q18',
        questionText: 'Optical magnification loupes used by dentists improve visual acuity and ergonomics by applying which optical system?',
        options: ['Galilean or Keplerian (Prismatic) compound lens systems', 'Concave mirrors', 'Pin-hole apertures', 'Diffraction gratings'],
        correctOptionIndex: 0,
        explanation: 'Dental loupes utilize Keplerian (prism-based) or Galilean lens systems to magnify oral anatomy (2.5× to 5.0×) while maintaining adequate depth of field and working distance.'
      },
      {
        id: 'mp3_q19',
        questionText: 'Numerical aperture (NA) of a surgical optical fiber determines its:',
        options: ['Light-gathering ability and the acceptance cone angle (half-angle θ_max)', 'Electrical conductivity', 'Length in meters', 'Mechanical flexibility'],
        correctOptionIndex: 0,
        explanation: 'Numerical aperture NA = n · sin(θ_max) = √(n_core² - n_clad²), measuring the maximum cone angle over which light is guided through the fiber by total internal reflection.'
      },
      {
        id: 'mp3_q20',
        questionText: 'Photodynamic therapy (PDT) in oral periodontitis uses low-power laser light combined with a photosensitizer dye (e.g. methylene blue) to produce:',
        options: ['Cytotoxic singlet oxygen (¹O2) and reactive oxygen species that destroy bacterial membranes', 'Heat necrosis', 'Laser ablation', 'Sound waves'],
        correctOptionIndex: 0,
        explanation: 'The photosensitizer absorbs light energy, transferring it to ground-state molecular oxygen to generate singlet oxygen (¹O2), which rapidly oxidizes bacterial membranes.'
      },
      {
        id: 'mp3_q21',
        questionText: 'Collimation in laser physics describes the property that the beam:',
        options: ['Has extremely low divergence and travels long distances with almost parallel rays', 'Spreads in all directions equally', 'Changes color over distance', 'Slows down over time'],
        correctOptionIndex: 0,
        explanation: 'A collimated beam maintains a narrow profile with minimal spatial divergence over substantial distances due to the geometric design of the optical cavity.'
      },
      {
        id: 'mp3_q22',
        questionText: 'What happens to dental hard tissue when exposed to continuous-wave laser radiation without adequate water spray cooling?',
        options: ['Carbonization, cracking, and irreversible pulp necrosis', 'Remineralization', 'Increased tooth hardness', 'Fluoride uptake'],
        correctOptionIndex: 0,
        explanation: 'Without continuous coaxial water-air cooling, laser absorption generates excessive heat (>5.5°C pulpal temperature rise), charring tissue and causing irreversible pulpitis.'
      },
      {
        id: 'mp3_q23',
        questionText: 'The laser plume produced during oral soft tissue laser vaporization poses an occupational hazard primarily because it contains:',
        options: ['Bioaerosols, viable viral and bacterial particles, and toxic volatile organic compounds', 'Pure water vapor only', 'Harmless steam', 'Pure helium'],
        correctOptionIndex: 0,
        explanation: 'Laser plumes contain vaporized cellular debris, carbon monoxide, carcinogens, and viable pathogens (such as HPV). Dedicated high-volume evacuation (HVE) smoke evacuators are essential.'
      },
      {
        id: 'mp3_q24',
        questionText: 'Argon lasers emit intense blue and green wavelengths (488 nm and 514 nm) that were historically used in dentistry for:',
        options: ['Rapid polymerization of resin composites and vascular lesion photocoagulation', 'Cavity preparation on enamel', 'Bone cutting', 'Bleaching with zero power'],
        correctOptionIndex: 0,
        explanation: 'The 488 nm line of argon lasers matches the absorption peak of camphorquinone, enabling rapid curing of resin composites in seconds.'
      },
      {
        id: 'mp3_q25',
        questionText: 'Irradiance (power density) of a laser beam delivered to a tissue surface is mathematically defined as:',
        options: ['Laser power per unit area (Watts / cm²)', 'Total energy (Joules)', 'Wavelength times frequency', 'Voltage divided by current'],
        correctOptionIndex: 0,
        explanation: 'Power density (Irradiance) = Power (W) / Spot Area (cm²). Reducing the focal spot size dramatically concentrates energy, increasing cutting efficiency.'
      }
    ]
  },
  {
    id: 'mp-section-4',
    sectionNumber: 4,
    fileName: '4.docx',
    titleEn: 'Section 4: Biomechanics, Fluids & Dental Ultrasonics',
    titleAr: 'القسم الرابع: الميكانيكا الحيوية، الموائع والموجات فوق الصوتية',
    range: '76-100',
    descriptionEn: 'Stress and strain, Young’s modulus, viscoelasticity, fluid flow (Poiseuille law), acoustic cavitation, and piezo ultrasonics.',
    descriptionAr: 'الإجهاد والانفعال، معامل يونغ، اللزوجة المرنة، تدفق الموائع، التجويف الصوتي، وأجهزة الموجات فوق الصوتية.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedPhysics&preview=4.docx',
    questions: [
      {
        id: 'mp4_q1',
        questionText: 'In mechanics of dental materials, stress (σ) is defined mathematically as:',
        options: ['Internal resisting force per unit cross-sectional area (Force / Area, N/m² or Pa)', 'Total elongation in millimeters', 'Deformation divided by original length', 'Mass times acceleration'],
        correctOptionIndex: 0,
        explanation: 'Stress is the internal reaction force per unit area (σ = F/A) developed in response to externally applied loads, expressed in Pascals (N/m²) or MegaPascals (MPa).'
      },
      {
        id: 'mp4_q2',
        questionText: 'Strain (ε) represents which dimensionless engineering quantity?',
        options: ['The relative deformation or change in dimension per unit original dimension (ΔL / L0)', 'The force in Newtons', 'The stiffness in Gigapascals', 'The density of the tooth'],
        correctOptionIndex: 0,
        explanation: 'Strain is the fractional dimensional change (ε = ΔL/L0) resulting from stress, having no physical units (dimensionless, often expressed as percentage or microstrain).'
      },
      {
        id: 'mp4_q3',
        questionText: 'Young’s modulus of elasticity (E) quantifies which fundamental mechanical property of a material?',
        options: ['Stiffness (rigidity) within the elastic deformation range (E = stress / strain)', 'Surface hardness', 'Fracture toughness', 'Ductility'],
        correctOptionIndex: 0,
        explanation: 'Young’s modulus is the slope of the linear elastic region on a stress-strain curve (E = σ/ε), measuring how resistant a material is to elastic deformation.'
      },
      {
        id: 'mp4_q4',
        questionText: 'Comparing dental enamel and dentin mechanically, enamel has a Young’s modulus that is:',
        options: ['Much higher than dentin (~84 GPa vs ~18 GPa), meaning enamel is far stiffer but more brittle', 'Lower than dentin', 'Identical to dentin', 'Zero'],
        correctOptionIndex: 0,
        explanation: 'Enamel is heavily mineralized and stiff (E ≈ 84 GPa), while underlying dentin has lower stiffness (E ≈ 18 GPa) but higher fracture toughness and resilience, acting as a shock absorber.'
      },
      {
        id: 'mp4_q5',
        questionText: 'The maximum stress a material can withstand without undergoing permanent, irreversible plastic deformation is called its:',
        options: ['Yield strength (proportional limit / elastic limit)', 'Ultimate tensile strength', 'Fracture point', 'Hardness number'],
        correctOptionIndex: 0,
        explanation: 'The yield strength marks the transition point on a stress-strain curve where atomic bonds begin to permanently slip, transitioning from elastic to plastic deformation.'
      },
      {
        id: 'mp4_q6',
        questionText: 'What mechanical property describes the total energy absorbed by a material per unit volume up to catastrophic fracture?',
        options: ['Toughness (work of fracture)', 'Resilience', 'Hardness', 'Brittleness'],
        correctOptionIndex: 0,
        explanation: 'Toughness is represented by the entire area under the complete stress-strain curve up to fracture, measuring the material’s capacity to absorb mechanical energy without breaking.'
      },
      {
        id: 'mp4_q7',
        questionText: 'Viscoelastic materials (such as the periodontal ligament, impression materials, and articular cartilage):',
        options: ['Exhibit both viscous liquid flow and elastic solid behavior with time- and strain-rate dependency', 'Follow Hooke’s law perfectly at all speeds', 'Do not deform under pressure', 'Are completely brittle'],
        correctOptionIndex: 0,
        explanation: 'Viscoelastic biological tissues demonstrate creep, stress relaxation, and hysteresis, behaving stiffer under rapid masticatory impacts than under slow static loading.'
      },
      {
        id: 'mp4_q8',
        questionText: 'According to Poiseuille’s Law of laminar fluid dynamics, volume flow rate (Q) through a cylindrical tube is proportional to:',
        options: ['The fourth power of the vessel radius (r^4)', 'The radius squared (r²)', 'The length of the tube', 'Viscosity squared'],
        correctOptionIndex: 0,
        explanation: 'Poiseuille’s equation Q = (π · ΔP · r⁴) / (8 · η · L) demonstrates that doubling radius increases fluid volume flow sixteen-fold (2⁴ = 16).'
      },
      {
        id: 'mp4_q9',
        questionText: 'Dental ultrasonic scalers operate at frequencies characteristically in the range of:',
        options: ['20,000 Hz to 45,000 Hz (20–45 kHz)', '500 Hz to 1,000 Hz', '1 MHz to 5 MHz', '1 GHz'],
        correctOptionIndex: 0,
        explanation: 'Ultrasonic dental equipment operates above the upper threshold of human hearing (20 kHz), typically vibrating at 25–45 kHz to mechanically disrupt calculus and plaque biofilms.'
      },
      {
        id: 'mp4_q10',
        questionText: 'Piezoelectric ultrasonic scalers generate tip vibrations using:',
        options: ['Ceramic crystal discs (e.g. lead zirconate titanate) that expand and contract in an alternating electric field', 'Nickel alloy stacks in a magnetic coil', 'Compressed air turbine rotors', 'Heat coils'],
        correctOptionIndex: 0,
        explanation: 'Piezoelectric scalers apply alternating high-frequency voltage across piezoceramic crystals, which convert electrical oscillations directly into linear mechanical tip motion.'
      },
      {
        id: 'mp4_q11',
        questionText: 'Magnetostrictive ultrasonic scalers (such as Cavitron) convert electromagnetic energy into tip motion using:',
        options: ['A stack of ferromagnetic nickel alloy strips inside a magnetic field coil', 'Ceramic quartz crystals', 'Piezo crystals', 'A rotating gear'],
        correctOptionIndex: 0,
        explanation: 'Magnetostriction is the property of ferromagnetic materials (nickel-iron stack) to change physical length when magnetized by an alternating magnetic field.'
      },
      {
        id: 'mp4_q12',
        questionText: 'The physical mechanism of acoustic cavitation in ultrasonic scaling and endodontic irrigation refers to:',
        options: ['The formation, growth, and violent collapse of microbubbles in liquid, generating shockwaves and microjets that lyse bacteria', 'Boiling water at 100°C', 'Friction between tooth and metal only', 'Laser absorption'],
        correctOptionIndex: 0,
        explanation: 'Transient acoustic cavitation creates submicroscopic vapor bubbles during low-pressure cycles that violently implode during high-pressure cycles, releasing shockwaves that disrupt bacterial walls.'
      },
      {
        id: 'mp4_q13',
        questionText: 'Acoustic microstreaming created around an oscillating ultrasonic scaler tip refers to:',
        options: ['Vigorous localized fluid vortices and shearing currents that detach microbial biofilms from tooth surfaces', 'Heat conduction', 'Sound waves escaping into air', 'Static pressure'],
        correctOptionIndex: 0,
        explanation: 'Acoustic microstreaming produces rapid fluid flow and hydro-shear forces adjacent to the vibrating tip, breaking up subgingival plaque colonies even without direct tip contact.'
      },
      {
        id: 'mp4_q14',
        questionText: 'In dental biomechanics, a class 1 lever system is characterized by having:',
        options: ['The fulcrum situated between the effort (input force) and the resistance (load)', 'The load between fulcrum and effort', 'The effort between fulcrum and load', 'No fulcrum'],
        correctOptionIndex: 0,
        explanation: 'In a class 1 lever (e.g., dental extraction elevators or scissors), the fulcrum lies between the applied effort and the load to gain mechanical advantage.'
      },
      {
        id: 'mp4_q15',
        questionText: 'The human mandible during biting acts mechanically as which class of lever system?',
        options: ['Class 3 lever (effort from masseter/temporalis applied between the TMJ fulcrum and the dental bite load)', 'Class 1 lever', 'Class 2 lever', 'Zero lever'],
        correctOptionIndex: 0,
        explanation: 'The mandible is a class 3 lever: the temporomandibular joint is the fulcrum, masticatory muscles apply effort along the ramus, and the food bolus load is at the front.'
      },
      {
        id: 'mp4_q16',
        questionText: 'Surface tension in dental impression materials and irrigants is caused by:',
        options: ['Cohesive intermolecular forces pulling liquid surface molecules toward the interior', 'Gravitational pull', 'Atmospheric air pressure', 'Electrostatic repulsion'],
        correctOptionIndex: 0,
        explanation: 'Surface tension arises from cohesive forces between liquid molecules, which pull surface molecules inward, contracting the surface into the minimal possible area.'
      },
      {
        id: 'mp4_q17',
        questionText: 'A low contact angle (<90°) between a liquid droplet and a solid tooth surface indicates:',
        options: ['Good wettability and high surface energy of the substrate', 'Poor wettability (hydrophobicity)', 'Zero adhesion', 'Chemical repulsion'],
        correctOptionIndex: 0,
        explanation: 'A contact angle θ < 90° signifies that adhesive forces between liquid and solid exceed cohesive forces, resulting in good surface wetting essential for dental bonding adhesives.'
      },
      {
        id: 'mp4_q18',
        questionText: 'Newtonian fluids are distinguished from non-Newtonian fluids because their dynamic viscosity (η):',
        options: ['Remains constant regardless of the applied shear rate', 'Decreases as shear rate increases (pseudoplastic / shear-thinning)', 'Increases with shear rate (dilatant)', 'Drops to zero instantly'],
        correctOptionIndex: 0,
        explanation: 'In Newtonian fluids (such as pure water), shear stress is directly proportional to shear strain rate, meaning viscosity is constant. Human blood and dental pastes are non-Newtonian.'
      },
      {
        id: 'mp4_q19',
        questionText: 'Human saliva and unpolymerized dental impression pastes exhibit shear-thinning (pseudoplasticity), meaning that under high shear stress (mixing/syringing):',
        options: ['Their viscosity decreases, allowing them to flow easily into fine details', 'Their viscosity increases and solidifies', 'They turn into gas', 'They become permanently elastic'],
        correctOptionIndex: 0,
        explanation: 'Pseudoplastic materials have lower apparent viscosity under high shear rates (spatulation or extrusion through a fine tip), making application smooth, while resisting slumping at rest.'
      },
      {
        id: 'mp4_q20',
        questionText: 'Creep in dental amalgam restorations describes:',
        options: ['Time-dependent slow plastic deformation under static or cyclic occlusal compressive stress', 'Immediate elastic recovery', 'Surface corrosion in saliva', 'Shrinkage during setting'],
        correctOptionIndex: 0,
        explanation: 'Creep is slow continuous permanent strain under static intraoral masticatory stresses, which leads to marginal breakdown and overhang extrusion in amalgam fillings.'
      },
      {
        id: 'mp4_q21',
        questionText: 'Galvanic shock in the oral cavity occurs when:',
        options: ['Two dissimilar metals (e.g., gold crown and amalgam restoration) touch in the presence of saliva, completing an electrolytic battery circuit', 'A nerve is severed', 'An electric scaler touches enamel', 'Laser cuts soft tissue'],
        correctOptionIndex: 0,
        explanation: 'When metals with different electrochemical potentials contact in saliva (an electrolyte), an electric cell is created, generating a current that stimulates sensory pulpal nerves (galvanic shock).'
      },
      {
        id: 'mp4_q22',
        questionText: 'Coefficient of thermal expansion (COTE) mismatch between a dental restorative material and tooth structure causes:',
        options: ['Percolation of oral fluids, microleakage, and marginal staining upon cyclic temperature changes', 'Tooth fracture from freezing', 'Color change only', 'Amalgam softening'],
        correctOptionIndex: 0,
        explanation: 'If a restorative material expands and contracts faster than natural tooth structure during hot and cold meals, marginal gaps open and close, pumping bacteria into the cavity (percolation).'
      },
      {
        id: 'mp4_q23',
        questionText: 'Resonance frequency analysis (RFA) used to monitor dental implant osseointegration (ISQ values) evaluates:',
        options: ['Implant primary and secondary stability by measuring bending resonance frequency under acoustic magnetic stimulation', 'Bone density with X-rays', 'Torque with a hand wrench only', 'Blood flow around the implant'],
        correctOptionIndex: 0,
        explanation: 'RFA excites a magnetic SmartPeg atop the implant; as bone integrates tightly around the implant fixture, structural stiffness increases, shifting resonance frequency and ISQ higher.'
      },
      {
        id: 'mp4_q24',
        questionText: 'Piezoelectric ultrasonic surgery (Piezosurgery) in oral maxillofacial osteotomy offers what clinical advantage over rotary burs?',
        options: ['Micrometric selective bone cutting with zero damage to adjacent soft tissues, nerves, or Schneiderian membrane', 'Cutting soft tissues twice as fast', 'Requires no water cooling', 'Generates high heat'],
        correctOptionIndex: 0,
        explanation: 'Piezosurgery vibrates at 28–36 kHz, cleanly cutting mineralized bone without tearing or cutting soft tissues, nerves, or sinus membranes that oscillate harmlessly with the tip.'
      },
      {
        id: 'mp4_q25',
        questionText: 'Fatigue failure of dental endodontic rotary files (such as nickel-titanium instruments) is predominantly caused by:',
        options: ['Cyclic flexural fatigue from continuous rotation within curved root canals', 'Melting from autoclaving', 'Chemical attack by EDTA', 'Over-lubrication'],
        correctOptionIndex: 0,
        explanation: 'Rotating around root canal curvatures subjects the file to alternating tension and compression every revolution, initiating microcracks that suddenly propagate into fatigue file separation.'
      }
    ]
  },
  {
    id: 'mp-section-5',
    sectionNumber: 5,
    fileName: '5.docx',
    titleEn: 'Section 5: Radiation Protection, Dosimetry & Quality Assurance',
    titleAr: 'القسم الخامس: الحماية من الإشعاع، قياس الجرعات وضمان الجودة',
    range: '101-125',
    descriptionEn: 'ALARA principle, deterministic vs stochastic effects, occupational dose limits, thyroid collars, and lead shielding.',
    descriptionAr: 'مبدأ ألارا (ALARA)، التأثيرات الحتمية والعشوائية، حدود الجرعات المهنية، واقي الغدة الدرقية، والتدريع بالرصاص.',
    url: 'https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=MedPhysics&preview=5.docx',
    questions: [
      {
        id: 'mp5_q1',
        questionText: 'The cornerstone radiation protection philosophy "ALARA" stands for:',
        options: ['As Low As Reasonably Achievable (economic and social factors taken into account)', 'Always Lower All Radiation Automatically', 'Assess Limits And Regulate Absorbers', 'Apply Lead Aprons Rapidly Always'],
        correctOptionIndex: 0,
        explanation: 'ALARA dictates that all exposures must be kept As Low As Reasonably Achievable, with both clinical diagnostic justification and economic optimization.'
      },
      {
        id: 'mp5_q2',
        questionText: 'In radiation biology, stochastic effects (such as radiation-induced carcinogenesis and hereditary mutations) are characterized by:',
        options: ['No threshold dose; probability of occurrence increases with dose, but severity is independent of dose', 'A clear threshold dose below which effects never occur', 'Severity proportional to dose', 'Occurring immediately within minutes'],
        correctOptionIndex: 0,
        explanation: 'Stochastic effects follow the linear no-threshold (LNT) model: even a tiny radiation dose carries a small probability of initiating cancer, but the severity of the cancer is unrelated to dose.'
      },
      {
        id: 'mp5_q3',
        questionText: 'Deterministic (tissue reaction) effects of ionizing radiation (such as cataract formation, skin erythema, and radiation sickness):',
        options: ['Have a distinct threshold dose below which the effect is not observed, and severity increases with dose above the threshold', 'Have no threshold dose', 'Are completely random', 'Never occur in humans'],
        correctOptionIndex: 0,
        explanation: 'Deterministic effects result from lethal damage to large populations of cells: they require a threshold dose (e.g. >0.5 Gy for lens opacities), above which severity escalates.'
      },
      {
        id: 'mp5_q4',
        questionText: 'According to International Commission on Radiological Protection (ICRP) standards, the annual occupational effective dose limit for radiation workers is:',
        options: ['20 mSv per year (averaged over defined 5-year periods, not exceeding 50 mSv in any single year)', '1 mSv per year', '100 mSv per year', '500 mSv per year'],
        correctOptionIndex: 0,
        explanation: 'The ICRP occupational limit is 20 mSv/year averaged over 5 years (100 mSv in 5 years, max 50 mSv in any one year). For the general public, the limit is 1 mSv/year.'
      },
      {
        id: 'mp5_q5',
        questionText: 'The annual dose limit for the general public from artificial radiation sources (excluding natural background and direct medical diagnostics) is:',
        options: ['1 mSv (1,000 µSv) per year', '20 mSv per year', '50 mSv per year', '0.01 mSv per year'],
        correctOptionIndex: 0,
        explanation: 'The ICRP and NCRP recommend a public annual effective dose limit of 1 mSv (0.1 rem) per year above natural background.'
      },
      {
        id: 'mp5_q6',
        questionText: 'In the operator "position-and-distance rule" for intraoral radiography, if no lead protective barrier is available, the operator should stand at least:',
        options: ['6 feet (2 meters) away from the tubehead and at an angle between 90° and 135° to the central beam', '1 foot directly in front of the patient', 'Behind the patient head in line with the beam', 'Holding the tubehead tightly'],
        correctOptionIndex: 0,
        explanation: 'Standing at least 6 feet (2 m) away and between 90° and 135° to the exiting beam utilizes distance and avoids both the primary beam and direct backward scatter.'
      },
      {
        id: 'mp5_q7',
        questionText: 'The thyroid gland in pediatric patients is highly radiosensitive. Which protective shielding accessory should be provided during intraoral periapical exams?',
        options: ['Thyroid protective collar (lead equivalent of at least 0.25 mm)', 'Thyroid collar during panoramic exams', 'Lead gloves only', 'Sunglasses'],
        correctOptionIndex: 0,
        explanation: 'Thyroid shielding is vital in children during periapical and bitewing series. Note: Thyroid collars are contraindicated in panoramic radiography because they block the rotating beam.'
      },
      {
        id: 'mp5_q8',
        questionText: 'Lead aprons and thyroid collars used in dental operatories typically require a minimum lead equivalence of:',
        options: ['0.25 mm to 0.5 mm lead equivalent', '2.5 mm lead equivalent', '5.0 cm solid lead', '0.01 mm aluminum'],
        correctOptionIndex: 0,
        explanation: 'Standard diagnostic personal protective aprons incorporate 0.25 mm to 0.5 mm of lead or lead-free composite shielding, attenuating over 90% of dental scatter photons.'
      },
      {
        id: 'mp5_q9',
        questionText: 'The Law of Bergonié and Tribondeau in radiation biology states that cells are most radiosensitive when they:',
        options: ['Have a high mitotic division rate, a long mitotic future, and are undifferentiated (primitive)', 'Are mature, non-dividing, and highly differentiated', 'Are devoid of water', 'Are frozen in liquid nitrogen'],
        correctOptionIndex: 0,
        explanation: 'Radiosensitivity correlates directly with cellular proliferation rate and inversely with degree of differentiation (e.g. bone marrow stem cells and lymphoid tissues are highly sensitive).'
      },
      {
        id: 'mp5_q10',
        questionText: 'Which human organ tissue has the lowest radiosensitivity (highest radioresistance) according to tissue weighting factors?',
        options: ['Mature nerve and muscle tissue', 'Bone marrow', 'Thyroid gland', 'Gonads (testes and ovaries)'],
        correctOptionIndex: 0,
        explanation: 'Mature neurons and skeletal muscle cells are non-dividing, highly differentiated post-mitotic cells with very low radiosensitivity.'
      },
      {
        id: 'mp5_q11',
        questionText: 'Personal radiation dosimeters (such as Optically Stimulated Luminescence / OSL badges) worn by dental personnel should be positioned:',
        options: ['At chest or collar level outside any lead apron to record whole-body exposure', 'In a pocket inside a lead box', 'Left on the dental chair', 'Worn under a heavy lead shield'],
        correctOptionIndex: 0,
        explanation: 'Occupational dosimeters must be worn at collar or waist level on the torso facing the radiation source to represent whole-body dose accurately.'
      },
      {
        id: 'mp5_q12',
        questionText: 'What is the primary function of a personal dosimeter control badge shipped with the monitoring packet?',
        options: ['Kept in a radiation-free area to measure background transit radiation and serve as a baseline subtraction', 'Worn by the receptionist', 'Worn by the patient', 'Placed inside the X-ray tube'],
        correctOptionIndex: 0,
        explanation: 'The control badge monitors background and shipping transit radiation and is subtracted from the personnel badges to report true occupational dose.'
      },
      {
        id: 'mp5_q13',
        questionText: 'The three cardinal principles of radiation protection are:',
        options: ['Time, Distance, and Shielding', 'Kilovoltage, Milliamperage, and Seconds', 'Filtration, Collimation, and Cone', 'Speed, Light, and Sound'],
        correctOptionIndex: 0,
        explanation: 'Minimizing exposure TIME, maximizing DISTANCE from the source, and employing appropriate SHIELDING are the three universal pillars of radiation hygiene.'
      },
      {
        id: 'mp5_q14',
        questionText: 'Which imaging modality delivers the lowest effective radiation dose to the patient?',
        options: ['Single digital bitewing or periapical radiograph with rectangular collimation (~2 to 4 µSv)', 'Medical head CT scan (~2000 µSv)', 'Large field-of-view maxillofacial CBCT (~100 to 300 µSv)', 'Chest X-ray'],
        correctOptionIndex: 0,
        explanation: 'A single periapical or bitewing radiograph taken with rectangular collimation delivers an effective dose of only ~1.5 to 4 µSv, equivalent to less than a single day of natural background radiation.'
      },
      {
        id: 'mp5_q15',
        questionText: 'Average annual background radiation received by an individual worldwide from natural cosmic, terrestrial, and radon sources is approximately:',
        options: ['2.4 to 3.0 mSv (2,400 to 3,000 µSv) per year', '100 mSv per year', '0.01 mSv per year', '50 mSv per year'],
        correctOptionIndex: 0,
        explanation: 'Natural background radiation contributes roughly 2.4 to 3.0 mSv annually worldwide, with airborne radon gas accounting for over half of this exposure.'
      },
      {
        id: 'mp5_q16',
        questionText: 'Why should a dental assistant or dentist NEVER hold the X-ray sensor in the patient’s mouth during exposure?',
        options: ['The operator’s hand would enter the primary beam, accumulating unacceptable deterministic and stochastic radiation doses over time', 'It causes electrical shock', 'It breaks the sensor cable', 'It is prohibited by fire code only'],
        correctOptionIndex: 0,
        explanation: 'Operators must never hold receptors in place; sensor holders, bitewing tabs, or if unavoidable, the patient’s parent/guardian (never pregnant) should assist.'
      },
      {
        id: 'mp5_q17',
        questionText: 'The quality assurance step involving a step-wedge test on an intraoral dental X-ray unit is designed to monitor:',
        options: ['Image contrast consistency, optical density, and processing/detector calibration over time', 'Physical weight of the tubehead', 'Line voltage spikes only', 'Water pressure'],
        correctOptionIndex: 0,
        explanation: 'An aluminum step-wedge test exposed periodically monitors radiographic contrast, system constancy, and detects failing digital sensors or degrading processing chemicals.'
      },
      {
        id: 'mp5_q18',
        questionText: 'Which radiation risk is of primary concern during human embryonic and fetal development (especially during the first trimester organogenesis period)?',
        options: ['Microcephaly, mental retardation, and congenital structural malformations', 'Immediate tooth eruption', 'Loss of hearing only', 'Immunity enhancement'],
        correctOptionIndex: 0,
        explanation: 'Embryonic cells in early organogenesis (weeks 2–8 post-conception) are hyper-radiosensitive; high doses (>100 mGy) can induce microcephaly, intellectual deficits, or embryonic lethality.'
      },
      {
        id: 'mp5_q19',
        questionText: 'Leakage radiation from the dental X-ray tube housing measured at 1 meter from the focal spot must not exceed regulatory limits of:',
        options: ['1 mGy per hour (100 mR/hr) when operated at maximum continuous rating', '10 Gy per hour', '0 mGy (absolute zero)', '50 Gy per hour'],
        correctOptionIndex: 0,
        explanation: 'Radiation safety codes mandate that leakage radiation escaping the leaded tubehead housing must not exceed 1 mGy/hr (100 mR/hr) at a distance of 1 meter.'
      },
      {
        id: 'mp5_q20',
        questionText: 'Which parameter represents the fraction of time a radiation source is actively directed toward a specific barrier (wall/floor)?',
        options: ['Use factor (U)', 'Workload (W)', 'Occupancy factor (T)', 'Quality factor (Q)'],
        correctOptionIndex: 0,
        explanation: 'The Use Factor (U) specifies the fraction of total beam-on operating workload directed toward a primary or secondary barrier during structural shielding calculations.'
      },
      {
        id: 'mp5_q21',
        questionText: 'The Occupancy factor (T) in structural radiation barrier design accounts for:',
        options: ['The fraction of time an individual (worker or public) spends in the protected area outside the barrier', 'How long the X-ray tube is hot', 'The number of patient beds', 'The thickness of drywall'],
        correctOptionIndex: 0,
        explanation: 'Occupancy Factor T ranges from 1 (full occupancy, offices, control stations) to 1/40 (transient corridors) to calculate required lead wall thickness.'
      },
      {
        id: 'mp5_q22',
        questionText: 'In digital panoramic radiology, what artifact occurs when the patient’s head is positioned too far forward (anterior to the focal trough)?',
        options: ['Anterior teeth appear excessively narrow and out of focus, with spine overlapping the ramus', 'Anterior teeth appear wide and blurred', 'The image is reversed', 'The chin is cut off'],
        correctOptionIndex: 0,
        explanation: 'Positioning anterior to the focal trough makes incisors appear abnormally narrow, pinched, and out of focus, with prominent cervical spine shadow overlaying the posterior mandible.'
      },
      {
        id: 'mp5_q23',
        questionText: 'If a patient’s chin is tilted too far upward during panoramic radiography, the resulting image shows:',
        options: ['A flattened or inverted occlusal plane ("frown" appearance) with blurred maxillary incisor roots', 'An exaggerated curved smile', 'A sharp mandibular border', 'Zero teeth'],
        correctOptionIndex: 0,
        explanation: 'Tilting the chin up flattens the curve of Spee into a reverse smile ("frown"), obscures the hard palate over maxillary roots, and blurs condyles.'
      },
      {
        id: 'mp5_q24',
        questionText: 'Which document should be consulted in the dental clinic to define diagnostic reference levels (DRLs) and justify all radiation prescriptions?',
        options: ['National and international radiation protection guidelines (e.g. NCRP Report No. 145 / ADA-FDA Selection Criteria)', 'Dental product marketing catalog', 'Equipment warranty slip', 'Tax documentation'],
        correctOptionIndex: 0,
        explanation: 'NCRP Report 145 and the ADA/FDA guidelines govern evidence-based radiographic selection criteria and diagnostic reference dose levels in dentistry.'
      },
      {
        id: 'mp5_q25',
        questionText: 'The dead-man exposure switch on a dental X-ray control panel is an essential safety feature that:',
        options: ['Requires continuous positive pressure from the operator’s finger, terminating exposure immediately if released prematurely', 'Locks the door automatically', 'Records video', 'Prevents tube heating'],
        correctOptionIndex: 0,
        explanation: 'The dead-man switch ensures that exposure occurs only as long as continuous deliberate pressure is maintained; releasing the switch instantly terminates the X-ray beam.'
      }
    ]
  }
];
