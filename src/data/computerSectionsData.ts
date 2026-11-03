import { Question } from "../types/quiz";

export interface ComputerSection {
  id: string;
  sectionNumber: number;
  titleEn: string;
  titleAr: string;
  range: string;
  descriptionEn: string;
  descriptionAr: string;
  url: string;
  questions: Question[];
}

export const COMPUTER_SECTIONS: ComputerSection[] = [
  {
    "id": "section-1",
    "sectionNumber": 1,
    "titleEn": "Section 1: Questions 1–25",
    "titleAr": "القسم الأول: الأسئلة 1-25",
    "range": "1-25",
    "descriptionEn": "Introduction to computers, digital dentistry, hardware vs software, and core processing functions.",
    "descriptionAr": "مقدمة الحاسوب والطب الرقمي، العتاد والبرمجيات، ووظائف المعالجة الأساسية.",
    "url": "https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/sign/Quizsmashlib/Computer/1-25.docx?token=eyJraWQiOiJiZTRlYjU3NS0xM2JkLTRhOTktYjdjMC05NWY2MzU4NzMzYTAiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJRdWl6c21hc2hsaWIvQ29tcHV0ZXIvMS0yNS5kb2N4Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5MzY0MjIyMiwiZXhwIjoxODI1MTc4MjIyfQ.duHPzElE0K7HnTS9UlXfynZzD020HjjoEDImW2vbi_2Ax2dZNUskdxqdivYAcxm4SwB_MojLC0Z9xLf4pPwqig",
    "questions": [
      {
        "id": "c1_q1",
        "questionText": "Which statement best defines a computer?",
        "options": [
          "A mechanical device used mainly for storing printed documents.",
          "An electronic device that accepts, processes, outputs, and stores data.",
          "A communication device designed only to exchange information online.",
          "An electronic device that displays information without processing it."
        ],
        "correctOptionIndex": 1,
        "explanation": "A computer is an electronic device that operates under stored instructions. It accepts input, processes data according to specified rules, produces output, and stores information for future use."
      },
      {
        "id": "c1_q2",
        "questionText": "Under whose control does a computer operate according to the lecture?",
        "options": [
          "Instructions stored in its own memory.",
          "Commands received exclusively from external devices.",
          "Information displayed on its monitor.",
          "Data stored permanently on removable disks."
        ],
        "correctOptionIndex": 0,
        "explanation": "The lecture defines a computer as operating under the control of instructions stored in its own memory."
      },
      {
        "id": "c1_q3",
        "questionText": "How many main functions does a digital computer perform according to the lecture?",
        "options": [
          "Three functions.",
          "Four functions.",
          "Five functions.",
          "Six functions."
        ],
        "correctOptionIndex": 2,
        "explanation": "The lecture identifies five main functions: input, storage, processing, output, and control."
      },
      {
        "id": "c1_q4",
        "questionText": "Which function involves entering data into a computer?",
        "options": [
          "Processing.",
          "Output.",
          "Storage.",
          "Input."
        ],
        "correctOptionIndex": 3,
        "explanation": "Input is the function through which a computer receives data for processing."
      },
      {
        "id": "c1_q5",
        "questionText": "What is the primary purpose of the storage function?",
        "options": [
          "To convert raw data into useful information.",
          "To retain data and information for use when required.",
          "To display processed information on a screen.",
          "To control the execution of computer instructions."
        ],
        "correctOptionIndex": 1,
        "explanation": "The computer stores data and information in its memory so they can be accessed and used when required."
      },
      {
        "id": "c1_q6",
        "questionText": "Which computer function converts data into useful information?",
        "options": [
          "Processing.",
          "Input.",
          "Storage.",
          "Output."
        ],
        "correctOptionIndex": 0,
        "explanation": "Processing involves manipulating data and converting it into useful information."
      },
      {
        "id": "c1_q7",
        "questionText": "Which function is responsible for presenting the results produced by a computer?",
        "options": [
          "Storage.",
          "Input.",
          "Control.",
          "Output."
        ],
        "correctOptionIndex": 3,
        "explanation": "Output is the function through which the computer generates and presents information resulting from data processing."
      },
      {
        "id": "c1_q8",
        "questionText": "What is the role of the control function in a computer?",
        "options": [
          "To store files permanently on a hard drive.",
          "To enter information through input devices.",
          "To coordinate and control the other four functions.",
          "To convert digital information into printed documents."
        ],
        "correctOptionIndex": 2,
        "explanation": "The control function coordinates the input, storage, processing, and output operations."
      },
      {
        "id": "c1_q9",
        "questionText": "Which sequence correctly represents the five main computer functions?",
        "options": [
          "Input, processing, storage, output, and control.",
          "Storage, output, input, processing, and communication.",
          "Processing, input, output, storage, and printing.",
          "Output, storage, processing, input, and display."
        ],
        "correctOptionIndex": 0,
        "explanation": "The five functions identified in the lecture are taking input, storing data, processing data, generating output, and controlling these operations."
      },
      {
        "id": "c1_q10",
        "questionText": "What does the term hardware refer to?",
        "options": [
          "Programs that control computer operations.",
          "Instructions stored inside computer memory.",
          "Physical components of a computer system.",
          "Digital information produced by computer applications."
        ],
        "correctOptionIndex": 2,
        "explanation": "Hardware refers to the physical components of a computer system, which can be physically seen and touched."
      },
      {
        "id": "c1_q11",
        "questionText": "Which component is described as the brain of the computer?",
        "options": [
          "Random Access Memory (RAM).",
          "Hard Disk Drive (HDD).",
          "Graphics Processing Unit (GPU).",
          "Central Processing Unit (CPU)."
        ],
        "correctOptionIndex": 3,
        "explanation": "The CPU is described as the brain of the computer because it carries out instructions and performs calculations."
      },
      {
        "id": "c1_q12",
        "questionText": "What is the main function of Random Access Memory (RAM)?",
        "options": [
          "To provide temporary storage for data and program instructions.",
          "To store files and programs permanently.",
          "To render graphics and accelerate video playback.",
          "To connect the computer components together."
        ],
        "correctOptionIndex": 0,
        "explanation": "RAM is high-speed, short-term memory that temporarily stores data and instructions used by running programs."
      },
      {
        "id": "c1_q13",
        "questionText": "Which component provides permanent storage for files, programs, and the operating system?",
        "options": [
          "CPU.",
          "HDD.",
          "RAM.",
          "GPU."
        ],
        "correctOptionIndex": 1,
        "explanation": "The Hard Disk Drive (HDD) provides long-term storage for files, programs, and the operating system."
      },
      {
        "id": "c1_q14",
        "questionText": "Which computer component is specifically dedicated to rendering graphics and accelerating video playback?",
        "options": [
          "CPU.",
          "RAM.",
          "HD",
          "D. GPU."
        ],
        "correctOptionIndex": 3,
        "explanation": "The Graphics Processing Unit (GPU) is dedicated to graphics rendering and accelerating video playback."
      },
      {
        "id": "c1_q15",
        "questionText": "Which device converts the contents of a paper document into a digital image?",
        "options": [
          "Printer.",
          "Monitor.",
          "Scanner.",
          "Speaker."
        ],
        "correctOptionIndex": 2,
        "explanation": "A scanner is an input device that converts paper documents into digital images that can be stored on a computer."
      },
      {
        "id": "c1_q16",
        "questionText": "Why is the CPU considered one of the most important hardware components?",
        "options": [
          "It provides permanent storage for all computer files.",
          "It executes programs and performs computer operations.",
          "It converts printed documents into digital images.",
          "It supplies electricity to the computer components."
        ],
        "correctOptionIndex": 1,
        "explanation": "The CPU executes instructions and runs programs. The lecture also notes that modern CPUs can perform multiple tasks simultaneously."
      },
      {
        "id": "c1_q17",
        "questionText": "Which statement correctly describes modern CPUs?",
        "options": [
          "They can perform multiple tasks simultaneously.",
          "They are used exclusively for storing computer files.",
          "They function only when connected to external storage.",
          "They are dedicated mainly to displaying computer graphics."
        ],
        "correctOptionIndex": 0,
        "explanation": "According to the lecture, modern CPUs can perform multiple tasks simultaneously."
      },
      {
        "id": "c1_q18",
        "questionText": "What are expansion cards used for in a computer system?",
        "options": [
          "To replace the computer's operating system.",
          "To provide permanent storage for computer files.",
          "To convert electrical power into usable electricity.",
          "To add additional functionality to the computer."
        ],
        "correctOptionIndex": 3,
        "explanation": "Expansion cards are circuit boards inserted into a computer to add functions such as networking, sound, or video capabilities."
      },
      {
        "id": "c1_q19",
        "questionText": "Which of the following is an example of functionality added by an expansion card?",
        "options": [
          "Permanent file storage.",
          "Network connectivity.",
          "Document printing.",
          "Temporary data storage."
        ],
        "correctOptionIndex": 1,
        "explanation": "The lecture gives network, sound, and video cards as examples of expansion cards that add functionality."
      },
      {
        "id": "c1_q20",
        "questionText": "What is the main function of a computer power supply?",
        "options": [
          "To convert electricity from the wall into a form used by computer components.",
          "To store electrical energy as permanent computer memory.",
          "To control the execution of programs and instructions.",
          "To connect external input devices to the motherboard."
        ],
        "correctOptionIndex": 0,
        "explanation": "The power supply converts electricity from the wall into the form required by the computer's other components."
      },
      {
        "id": "c1_q21",
        "questionText": "Which device reads data from and writes data to CDs and DVDs?",
        "options": [
          "Scanner.",
          "External hard drive.",
          "Optical drive.",
          "Graphics processing unit."
        ],
        "correctOptionIndex": 2,
        "explanation": "An optical drive is an input/output device used to read and write data on CDs and DVDs."
      },
      {
        "id": "c1_q22",
        "questionText": "Which component serves as the computer's long-term storage memory?",
        "options": [
          "RAM.",
          "CPU.",
          "GPU.",
          "Hard drive."
        ],
        "correctOptionIndex": 3,
        "explanation": "The hard drive provides long-term storage for computer data, files, and programs."
      },
      {
        "id": "c1_q23",
        "questionText": "What is the primary function of the motherboard?",
        "options": [
          "To display information visually on the screen.",
          "To hold and connect computer components and allow communication between them.",
          "To convert paper documents into digital images.",
          "To store temporary instructions for running applications."
        ],
        "correctOptionIndex": 1,
        "explanation": "The motherboard is a circuit board that holds and connects various computer components, allowing them to communicate."
      },
      {
        "id": "c1_q24",
        "questionText": "Which device is classified as an input/output device because it produces sound from the computer?",
        "options": [
          "Speaker.",
          "Keyboard.",
          "Scanner.",
          "Mouse."
        ],
        "correctOptionIndex": 0,
        "explanation": "The speaker outputs sound from the computer and is classified in the lecture as an input/output device."
      },
      {
        "id": "c1_q25",
        "questionText": "What is the main function of a computer monitor?",
        "options": [
          "To enter text and commands into the computer.",
          "To transfer digital data onto paper.",
          "To display information visually.",
          "To store data for long-term use."
        ],
        "correctOptionIndex": 2,
        "explanation": "A monitor displays information visually and is generally classified as an output device."
      }
    ]
  },
  {
    "id": "section-2",
    "sectionNumber": 2,
    "titleEn": "Section 2: Questions 26–50",
    "titleAr": "القسم الثاني: الأسئلة 26-50",
    "range": "26-50",
    "descriptionEn": "Dental computer workstations, CAD/CAM tools, digital sensors, and on-premise vs cloud dental software.",
    "descriptionAr": "محطات العمل السنية، أدوات CAD/CAM، الحساسات الرقمية، والبرمجيات السحابية والمحلية.",
    "url": "https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/sign/Quizsmashlib/Computer/26-50.docx?token=eyJraWQiOiJiZTRlYjU3NS0xM2JkLTRhOTktYjdjMC05NWY2MzU4NzMzYTAiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJRdWl6c21hc2hsaWIvQ29tcHV0ZXIvMjYtNTAuZG9jeCIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3OTM2NDIyNjksImV4cCI6MTgyNTE3ODI2OX0.t9QeW7SNmsMal2KivKWeLahVfzb3i_GVHtvAn3zPf9zkqv082LugD6yCKeoheg-SSYqgLNmbi7JSjTN9_E8zoQ",
    "questions": [
      {
        "id": "c1_q26",
        "questionText": "What makes a touchscreen different from a conventional monitor?",
        "options": [
          "It provides permanent storage for displayed information.",
          "It combines the functions of input and output.",
          "It performs the calculations required by the CPU.",
          "It connects the computer's internal circuit boards."
        ],
        "correctOptionIndex": 1,
        "explanation": "The lecture explains that touchscreens combine output and input functions, unlike conventional monitors that generally serve as output devices."
      },
      {
        "id": "c1_q27",
        "questionText": "Which device allows a user to type information to communicate with a computer?",
        "options": [
          "Mouse.",
          "Monitor.",
          "Speaker.",
          "Keyboard."
        ],
        "correctOptionIndex": 3,
        "explanation": "The keyboard is an input device used to type information and communicate with the computer."
      },
      {
        "id": "c1_q28",
        "questionText": "Which input device allows the user to interact with visual objects displayed on the monitor?",
        "options": [
          "Mouse.",
          "Printer.",
          "Speaker.",
          "Power supply."
        ],
        "correctOptionIndex": 0,
        "explanation": "A mouse allows users to interact with visual objects displayed on the monitor."
      },
      {
        "id": "c1_q29",
        "questionText": "What is the purpose of an external hard drive?",
        "options": [
          "To accelerate the computer's video playback.",
          "To execute instructions and perform calculations.",
          "To provide additional or backup storage.",
          "To convert electricity into usable power."
        ],
        "correctOptionIndex": 2,
        "explanation": "An external hard drive serves as an additional storage device and can be used for backup purposes."
      },
      {
        "id": "c1_q30",
        "questionText": "Which device transfers digital data from a computer onto paper?",
        "options": [
          "Monitor.",
          "Scanner.",
          "Keyboar",
          "D. Printer."
        ],
        "correctOptionIndex": 3,
        "explanation": "A printer is an output device that transfers digital information onto paper."
      },
      {
        "id": "c1_q31",
        "questionText": "What is software?",
        "options": [
          "A collection of physical circuit boards inside a computer.",
          "A set of electronic instructions that tells a computer what to do.",
          "A device used to connect the computer to electrical power.",
          "A storage component used to retain digital information."
        ],
        "correctOptionIndex": 1,
        "explanation": "Software consists of electronic instructions that tell a computer what actions to perform. Unlike hardware, software cannot be physically touched."
      },
      {
        "id": "c1_q32",
        "questionText": "Which statement correctly describes software?",
        "options": [
          "It consists exclusively of physical computer components.",
          "It can always be seen and touched directly.",
          "It is a mechanical component that stores electrical energy.",
          "It cannot be seen or touched, although its packaging can be handled."
        ],
        "correctOptionIndex": 3,
        "explanation": "The lecture explains that software itself cannot be seen or touched, but the packaging in which it comes can be physically handled."
      },
      {
        "id": "c1_q33",
        "questionText": "What are the two major types of software identified in the lecture?",
        "options": [
          "Application software and system software.",
          "Hardware software and storage software.",
          "Input software and output software.",
          "Processing software and memory software."
        ],
        "correctOptionIndex": 0,
        "explanation": "The lecture divides software into two major categories: application software and system software."
      },
      {
        "id": "c1_q34",
        "questionText": "What is the primary purpose of application software?",
        "options": [
          "To manage all physical computer components.",
          "To control communication between hardware devices.",
          "To help users accomplish specific tasks.",
          "To provide low-level control of embedded hardware."
        ],
        "correctOptionIndex": 2,
        "explanation": "Application software consists of programs designed to perform specific tasks, such as word processing and photo editing."
      },
      {
        "id": "c1_q35",
        "questionText": "Which of the following is an example of application software?",
        "options": [
          "Windows.",
          "Microsoft Word.",
          "Unix.",
          "DOS."
        ],
        "correctOptionIndex": 1,
        "explanation": "Microsoft Word is an application program used for word processing. Windows, Unix, and DOS are listed as operating systems."
      },
      {
        "id": "c1_q36",
        "questionText": "Which group contains only examples of application software mentioned in the lecture?",
        "options": [
          "Windows, Unix, DOS, and Linux.",
          "CPU, RAM, HDD, and GPU.",
          "Keyboard, mouse, monitor, and printer.",
          "Word, Excel, Access, and Acrobat Reader."
        ],
        "correctOptionIndex": 3,
        "explanation": "Microsoft Word, Excel, Access, WordPerfect, Acrobat Reader, and Internet Explorer are examples of application software listed in the lecture."
      },
      {
        "id": "c1_q37",
        "questionText": "What is the main responsibility of system software, particularly the operating system?",
        "options": [
          "To perform only word-processing activities.",
          "To convert printed documents into digital images.",
          "To control the overall activity of the computer.",
          "To provide additional physical storage capacity."
        ],
        "correctOptionIndex": 2,
        "explanation": "System software, including the operating system, controls the overall activity of a computer."
      },
      {
        "id": "c1_q38",
        "questionText": "Which of the following is an example of an operating system mentioned in the lecture?",
        "options": [
          "Windows.",
          "Microsoft Word.",
          "Microsoft Excel.",
          "Acrobat Reader."
        ],
        "correctOptionIndex": 0,
        "explanation": "Windows is identified as an example of an operating system. Unix, Linux, and DOS are also listed."
      },
      {
        "id": "c1_q39",
        "questionText": "What is the function of an operating system (OS)?",
        "options": [
          "To perform only mathematical calculations.",
          "To manage computer hardware and software resources.",
          "To convert digital documents into printed copies.",
          "To provide temporary storage for running programs."
        ],
        "correctOptionIndex": 1,
        "explanation": "The operating system manages the hardware and software resources of a computer."
      },
      {
        "id": "c1_q40",
        "questionText": "What is the function of a device driver?",
        "options": [
          "To provide permanent storage for application files.",
          "To perform mathematical and logical operations.",
          "To generate visual information on the monitor.",
          "To allow the operating system to communicate with hardware devices."
        ],
        "correctOptionIndex": 3,
        "explanation": "Device drivers are software that enable the operating system to communicate with hardware devices."
      },
      {
        "id": "c1_q41",
        "questionText": "Which statement best describes firmware?",
        "options": [
          "Software embedded in hardware devices that provides low-level control.",
          "Software designed exclusively for creating written documents.",
          "A physical circuit board that connects computer components.",
          "A temporary memory area used by running applications."
        ],
        "correctOptionIndex": 0,
        "explanation": "Firmware is software embedded in hardware devices and is responsible for providing low-level control."
      },
      {
        "id": "c1_q42",
        "questionText": "Which of the following is NOT listed as a function of system software?",
        "options": [
          "Managing computer resources.",
          "Providing a user interface.",
          "Running applications.",
          "Converting paper documents into digital images."
        ],
        "correctOptionIndex": 3,
        "explanation": "The lecture identifies three functions of system software: managing resources, providing a user interface, and running applications. Converting paper documents into digital images is the function of a scanner."
      },
      {
        "id": "c1_q43",
        "questionText": "Which group contains resources managed by system software?",
        "options": [
          "Cameras, microphones, speakers, and monitors only.",
          "Memory, processing, storage, and devices such as printers.",
          "Documents, images, videos, and application files only.",
          "Keyboards, scanners, and external drives only."
        ],
        "correctOptionIndex": 1,
        "explanation": "System software manages computer resources, including memory, processing, storage, and connected devices such as printers."
      },
      {
        "id": "c1_q44",
        "questionText": "What range of computer generations is presented in the lecture?",
        "options": [
          "From the first to the fifth generation.",
          "From the first to the eighth generation.",
          "From the first to the tenth generation.",
          "From the first to the thirteenth generation."
        ],
        "correctOptionIndex": 3,
        "explanation": "The computer generations slide presents a sequence extending from the first generation to the thirteenth generation."
      },
      {
        "id": "c1_q45",
        "questionText": "Which statement best describes the relationship between hardware and software in dental computing?",
        "options": [
          "Hardware and software operate independently and do not need to communicate.",
          "Software replaces all physical components used in dental practice.",
          "Hardware and software work together to enable digital dental operations.",
          "Hardware is used only for storing patient information."
        ],
        "correctOptionIndex": 2,
        "explanation": "The lecture describes a symbiotic relationship in which hardware and software work together to support diagnosis, treatment, and patient care."
      },
      {
        "id": "c1_q46",
        "questionText": "Which of the following is an example of hardware used in digital dentistry?",
        "options": [
          "Electronic Health Records (EHR).",
          "Digital X-ray sensors.",
          "Practice management systems.",
          "Dental imaging software."
        ],
        "correctOptionIndex": 1,
        "explanation": "Digital X-ray sensors are physical components and are therefore classified as hardware."
      },
      {
        "id": "c1_q47",
        "questionText": "Which of the following is an example of software used in dental practice?",
        "options": [
          "Intraoral camera.",
          "Dental computer workstation.",
          "Three-dimensional printer.",
          "Electronic Health Records (EHR)."
        ],
        "correctOptionIndex": 3,
        "explanation": "Electronic Health Records are programs or digital systems used to manage patient information, so they are classified as software."
      },
      {
        "id": "c1_q48",
        "questionText": "Which item is classified as hardware in the dental computing examples?",
        "options": [
          "Intraoral cameras.",
          "Dental imaging software.",
          "CAD/CAM design tools.",
          "Practice management systems."
        ],
        "correctOptionIndex": 0,
        "explanation": "Intraoral cameras are physical devices used in dental practice, making them hardware components."
      },
      {
        "id": "c1_q49",
        "questionText": "Which of the following is listed as dental software in the lecture?",
        "options": [
          "Digital X-ray sensor.",
          "Three-dimensional printer.",
          "CAD/CAM design tools.",
          "Dental computer workstation."
        ],
        "correctOptionIndex": 2,
        "explanation": "CAD/CAM design tools are programs that instruct hardware and are classified as software."
      },
      {
        "id": "c1_q50",
        "questionText": "According to the lecture's review questions, what is one benefit of transitioning to digital records?",
        "options": [
          "Eliminating the need for computer systems.",
          "Instant access, data security, and improved efficiency.",
          "Reducing the need for digital information storage.",
          "Making patient information less accessible to staff."
        ],
        "correctOptionIndex": 1,
        "explanation": "The review slide identifies instant access, data security, and improved efficiency as benefits of transitioning to digital records."
      }
    ]
  },
  {
    "id": "section-3",
    "sectionNumber": 3,
    "titleEn": "Section 3: Questions 51–75",
    "titleAr": "القسم الثالث: الأسئلة 51-75",
    "range": "51-75",
    "descriptionEn": "CPU architecture, ALU & Control Unit roles, the machine cycle, and machine-level instruction handling.",
    "descriptionAr": "معمارية المعالج (CPU)، دور ALU ووحدة التحكم CU، ودورة الآلة ومعالجة التعليمات.",
    "url": "https://zmsovxqdbhqthluoznmz.supabase.co/storage/v1/object/sign/Quizsmashlib/Computer/51-75.docx?token=eyJraWQiOiJiZTRlYjU3NS0xM2JkLTRhOTktYjdjMC05NWY2MzU4NzMzYTAiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJRdWl6c21hc2hsaWIvQ29tcHV0ZXIvNTEtNzUuZG9jeCIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3OTM2NDIzMjEsImV4cCI6MTgyNTE3ODMyMX0.vAvG69imoR6wSpiSAyhxySDm5YVwKagK5qogXgv3ngA0cV0076hIWruSYe1Fh0glNwZaM8lBhFl8TQAQwNeTzw",
    "questions": [
      {
        "id": "c1_q51",
        "questionText": "How has the digital revolution transformed dental practices according to the review slide?",
        "options": [
          "By eliminating the role of dental professionals.",
          "By making treatment procedures more complicated.",
          "By reducing the importance of diagnosis.",
          "By enhancing diagnosis, treatment planning, and patient care."
        ],
        "correctOptionIndex": 3,
        "explanation": "Digital technologies have enhanced diagnosis, treatment planning, and patient care in dental practices."
      },
      {
        "id": "c1_q52",
        "questionText": "Which statement correctly distinguishes on-premise dental software from cloud-based dental software?",
        "options": [
          "On-premise systems store data locally, while cloud systems store data remotely.",
          "On-premise systems require no computers, while cloud systems require local servers.",
          "On-premise systems are always free, while cloud systems require payment.",
          "On-premise systems store data remotely, while cloud systems store it locally."
        ],
        "correctOptionIndex": 0,
        "explanation": "The review slide distinguishes the two systems by their storage location: on-premise systems store data locally, whereas cloud systems store data remotely."
      },
      {
        "id": "c1_q53",
        "questionText": "What is the full name of CPU?",
        "options": [
          "Computer Processing Utility.",
          "Central Program Unit.",
          "Central Processing Unit.",
          "Computer Performance Unit."
        ],
        "correctOptionIndex": 2,
        "explanation": "CPU stands for Central Processing Unit."
      },
      {
        "id": "c1_q54",
        "questionText": "Why is the CPU described as the brain of a computer system?",
        "options": [
          "Because it provides permanent storage for all data.",
          "Because it executes instructions, performs calculations, and controls data flow.",
          "Because it displays all information produced by applications.",
          "Because it connects external devices to the computer."
        ],
        "correctOptionIndex": 1,
        "explanation": "The CPU executes instructions, performs complex calculations, and controls the flow of data within the computer."
      },
      {
        "id": "c1_q55",
        "questionText": "Which of the following is identified as a primary responsibility of the CPU?",
        "options": [
          "Executing every instruction.",
          "Printing digital documents onto paper.",
          "Converting physical documents into images.",
          "Providing long-term storage for computer files."
        ],
        "correctOptionIndex": 0,
        "explanation": "The CPU is responsible for executing instructions and carrying out the operations required by computer programs."
      },
      {
        "id": "c1_q56",
        "questionText": "How many primary components of the CPU are identified in the lecture?",
        "options": [
          "One component.",
          "Three components.",
          "Four components.",
          "Two components."
        ],
        "correctOptionIndex": 3,
        "explanation": "The lecture identifies two primary CPU components: the Arithmetic Logic Unit (ALU) and the Control Unit (CU)."
      },
      {
        "id": "c1_q57",
        "questionText": "What does ALU stand for?",
        "options": [
          "Automatic Logic Utility.",
          "Arithmetic Logic Unit.",
          "Advanced Language Unit.",
          "Application Loading Unit."
        ],
        "correctOptionIndex": 1,
        "explanation": "ALU stands for Arithmetic Logic Unit, one of the two primary components of the CPU."
      },
      {
        "id": "c1_q58",
        "questionText": "What is the main function of the Arithmetic Logic Unit (ALU)?",
        "options": [
          "To direct all computer hardware connections.",
          "To retrieve instructions from permanent storage.",
          "To perform mathematical, logical, and decision operations.",
          "To manage the computer's external input devices."
        ],
        "correctOptionIndex": 2,
        "explanation": "The ALU performs mathematical calculations, logical operations, and decision-making operations within the CPU."
      },
      {
        "id": "c1_q59",
        "questionText": "What does CU stand for in CPU architecture?",
        "options": [
          "Control Unit.",
          "Computer Utility.",
          "Calculation Unit.",
          "Communication Utility."
        ],
        "correctOptionIndex": 0,
        "explanation": "CU stands for Control Unit, the second primary component of the CPU."
      },
      {
        "id": "c1_q60",
        "questionText": "What is the primary function of the Control Unit (CU)?",
        "options": [
          "To store program instructions temporarily.",
          "To perform all mathematical calculations.",
          "To render graphics and accelerate video playback.",
          "To direct the operations of the processor."
        ],
        "correctOptionIndex": 3,
        "explanation": "The Control Unit directs the processor's operations and coordinates the execution of instructions."
      },
      {
        "id": "c1_q61",
        "questionText": "What are the three stages of the CPU instruction cycle?",
        "options": [
          "Input, storage, and output.",
          "Fetch, decode, and execute.",
          "Read, calculate, and print.",
          "Retrieve, store, and display."
        ],
        "correctOptionIndex": 1,
        "explanation": "The lecture identifies three stages in the CPU cycle: Fetch, Decode, and Execute."
      },
      {
        "id": "c1_q62",
        "questionText": "What happens during the fetch stage of the CPU cycle?",
        "options": [
          "The CPU performs the required mathematical operation.",
          "The CPU interprets the meaning of the instruction.",
          "The CPU retrieves an instruction from RAM.",
          "The CPU transfers the result to the monitor."
        ],
        "correctOptionIndex": 2,
        "explanation": "During the fetch stage, the CPU retrieves an instruction from Random Access Memory (RAM)."
      },
      {
        "id": "c1_q63",
        "questionText": "From which location does the CPU retrieve an instruction during the fetch stage?",
        "options": [
          "Random Access Memory (RAM).",
          "Graphics Processing Unit (GPU).",
          "External Hard Disk Drive (HDD).",
          "Computer monitor memory."
        ],
        "correctOptionIndex": 0,
        "explanation": "According to the lecture, the CPU retrieves instructions from RAM during the fetch stage."
      },
      {
        "id": "c1_q64",
        "questionText": "What occurs during the decode stage?",
        "options": [
          "The CPU stores the instruction permanently.",
          "The CPU performs the specified operation.",
          "The CPU generates the final output.",
          "The CPU interprets the instruction and determines the required action."
        ],
        "correctOptionIndex": 3,
        "explanation": "During decoding, the CPU interprets the retrieved instruction and determines what action needs to be performed."
      },
      {
        "id": "c1_q65",
        "questionText": "Which stage involves interpreting an instruction to determine what action should be performed?",
        "options": [
          "Fetch.",
          "Decode.",
          "Execute.",
          "Output."
        ],
        "correctOptionIndex": 1,
        "explanation": "The decode stage is responsible for interpreting the instruction and determining the operation required."
      },
      {
        "id": "c1_q66",
        "questionText": "What happens during the execute stage?",
        "options": [
          "The CPU retrieves a new instruction from RAM.",
          "The CPU determines the meaning of the instruction.",
          "The CPU performs the specified operation.",
          "The CPU stores the instruction for future use."
        ],
        "correctOptionIndex": 2,
        "explanation": "During execution, the CPU carries out the operation specified by the instruction."
      },
      {
        "id": "c1_q67",
        "questionText": "Which sequence correctly represents the instruction cycle?",
        "options": [
          "Fetch → Decode → Execute.",
          "Decode → Fetch → Execute.",
          "Execute → Decode → Fetch.",
          "Fetch → Execute → Decode."
        ],
        "correctOptionIndex": 0,
        "explanation": "The correct sequence is fetching the instruction, decoding it, and then executing the specified operation."
      },
      {
        "id": "c1_q68",
        "questionText": "How frequently does the fetch–decode–execute cycle repeat according to the lecture?",
        "options": [
          "Once every minute.",
          "Several times every hour.",
          "Hundreds of times every day.",
          "Millions of times per second."
        ],
        "correctOptionIndex": 3,
        "explanation": "The lecture states that the fundamental CPU instruction cycle repeats millions of times per second."
      },
      {
        "id": "c1_q69",
        "questionText": "What is the result of repeatedly performing the fetch–decode–execute cycle?",
        "options": [
          "The computer permanently stores every instruction in RAM.",
          "The computer processes information rapidly and responds to commands.",
          "The computer avoids the need for software applications.",
          "The computer performs all operations without using memory."
        ],
        "correctOptionIndex": 1,
        "explanation": "Repeating the instruction cycle millions of times per second allows the computer to process information at high speeds and respond quickly to user commands."
      },
      {
        "id": "c1_q70",
        "questionText": "Which stage immediately follows the fetch stage in the CPU instruction cycle?",
        "options": [
          "Execute.",
          "Output.",
          "Decode.",
          "Storage."
        ],
        "correctOptionIndex": 2,
        "explanation": "After retrieving an instruction from RAM during the fetch stage, the CPU decodes it to determine the required action."
      },
      {
        "id": "c3_q1",
        "questionText": "In the context of computer data representation, what are the two fundamental states that a binary machine understands?",
        "options": [
          "On and off states, which are represented by the numbers 1 and 0.",
          "High and low states, which are represented by the letters A and B.",
          "True and false states, which are represented by the symbols T and F.",
          "Yes and no states, which are represented by the symbols Y and N."
        ],
        "correctOptionIndex": 0,
        "explanation": "Computers are binary machines, meaning they understand only two states—on and off, represented by 1 and 0, reflecting whether a circuit is receiving electricity or not. The other options describe conceptual or logical states but do not accurately reflect the physical binary representation described in the text."
      },
      {
        "id": "c3_q2",
        "questionText": "When a user presses the lowercase letter \"a\" on a computer keyboard, what specific binary code is stored in the computer's memory?",
        "options": [
          "The binary code 01100011 is stored to represent the character.",
          "The binary code 01001101 is stored to represent the character.",
          "The binary code 01110001 is stored to represent the character.",
          "The binary code 01100001 is stored to represent the character."
        ],
        "correctOptionIndex": 3,
        "explanation": "When the lowercase \"a\" key is pressed, the computer stores the binary code 01100001 in memory. The CPU processes that byte of data and converts it to the letter \"a\" for display. The other binary sequences correspond to different characters (such as 'c' or 'M') or hexadecimal values."
      },
      {
        "id": "c3_q3",
        "questionText": "What is the correct binary code representation for the lowercase letter \"c\", which corresponds to the decimal value 99?",
        "options": [
          "The binary code 01100001 represents the decimal value 99.",
          "The binary code 01001101 represents the decimal value 99.",
          "The binary code 01110001 represents the decimal value 99.",
          "The binary code 01100011 represents the decimal value 99."
        ],
        "correctOptionIndex": 3,
        "explanation": "The lowercase \"c\" corresponds to the decimal value 99, which is converted into the binary code 01100011. The other binary sequences (01100001, 01001101, 01110001) represent different characters or hexadecimal conversions, not the letter \"c\"."
      },
      {
        "id": "c3_q4",
        "questionText": "What is the correct binary code representation for the lowercase letter \"M\", which corresponds to the decimal value 77?",
        "options": [
          "The binary code 01100011 represents the decimal value 77.",
          "The binary code 01001101 represents the decimal value 77.",
          "The binary code 01110001 represents the decimal value 77.",
          "The binary code 00111111 represents the decimal value 77."
        ],
        "correctOptionIndex": 1,
        "explanation": "The lowercase \"M\" corresponds to the decimal value 77, which is converted into the binary code 01001101. The other binary sequences represent different characters or hexadecimal conversions, such as 'c', '71' Hex, or '3F' Hex."
      },
      {
        "id": "c3_q5",
        "questionText": "What is the correct binary code representation for the hexadecimal number \"71\"?",
        "options": [
          "The binary code 01110001 represents the hexadecimal value 71.",
          "The binary code 01001101 represents the hexadecimal value 71.",
          "The binary code 00111111 represents the hexadecimal value 71.",
          "The binary code 01100011 represents the hexadecimal value 71."
        ],
        "correctOptionIndex": 0,
        "explanation": "The hexadecimal number \"71\" translates to the binary code 01110001. The other binary sequences represent different values, such as the decimal 77, the hexadecimal 3F, or the decimal 99, none of which correspond to the hexadecimal 71."
      }
    ]
  },
  {
    "id": "section-4",
    "sectionNumber": 4,
    "titleEn": "Section 4: Questions 76–100",
    "titleAr": "القسم الرابع: الأسئلة 76-100",
    "range": "76-100",
    "descriptionEn": "Fetch-Decode-Execute stages, instruction fetching from RAM, decoding instructions, and execution speed.",
    "descriptionAr": "مراحل الجلب والفك والتنفيذ (Fetch-Decode-Execute)، قراءة التعليمات من الذاكرة والسرعة.",
    "url": "https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Computer&preview=76-100.docx",
    "questions": [
      {
        "id": "c2_q1",
        "questionText": "Within the central processing unit, which specific component is responsible for directing all the processor's operations and acting as the conductor of the machine cycle?",
        "options": [
          "The Arithmetic Logic Unit, which manages the mathematical pathways.",
          "The Control Unit, which coordinates and directs all internal operations.",
          "The Random Access Memory, which stores the active execution instructions.",
          "The Read-Only Memory, which provides the foundational startup routines."
        ],
        "correctOptionIndex": 1,
        "explanation": "The Control Unit (CU) is the component within the CPU that directs all the processor's operations, acting as the conductor of the machine cycle. The Arithmetic Logic Unit (ALU) performs mathematical and logical operations but does not direct overall operations. Random Access Memory (RAM) is a temporary storage medium, and Read-Only Memory (ROM) is non-volatile storage, neither of which function as the internal director of CPU operations."
      },
      {
        "id": "c2_q2",
        "questionText": "During the fundamental Fetch-Decode-Execute cycle, from which specific hardware component does the central processing unit retrieve its initial instruction?",
        "options": [
          "The Random Access Memory, which provides the active instruction set.",
          "The Hard Disk Drive, which holds the permanent operating system files.",
          "The Read-Only Memory, which contains the immutable startup parameters.",
          "The Graphics Processing Unit, which renders the visual instruction outputs."
        ],
        "correctOptionIndex": 0,
        "explanation": "The first step of the machine cycle is the \"Fetch\" phase, wherein the CPU retrieves an instruction from the Random Access Memory (RAM). The Hard Disk Drive (HDD) and Read-Only Memory (ROM) are non-volatile storage mediums that hold data permanently but are not the direct source of active instructions during the immediate fetch cycle. The Graphics Processing Unit (GPU) is dedicated to rendering graphics and does not supply instructions to the CPU."
      },
      {
        "id": "c2_q3",
        "questionText": "A computer technician is evaluating different memory types and needs to identify the one that is characterized as volatile and temporary, requiring continuous power to retain data.",
        "options": [
          "The Solid State Drive, which retains data without moving parts.",
          "The Read-Only Memory, which stores the basic input-output system.",
          "The Random Access Memory, which holds actively used data temporarily.",
          "The Hard Disk Drive, which stores files using magnetic charges."
        ],
        "correctOptionIndex": 2,
        "explanation": "Random Access Memory (RAM) is defined as a volatile and temporary storage space used to hold data and programs actively in use; all stored data is erased when power is lost. The Solid State Drive (SSD), Read-Only Memory (ROM), and Hard Disk Drive (HDD) are all non-volatile storage devices that retain their data even when the computer is powered off."
      },
      {
        "id": "c2_q4",
        "questionText": "In the analogy comparing computer components to a kitchen, how is the functional relationship between the CPU and RAM best described?",
        "options": [
          "The CPU acts as the workspace, while RAM acts as the skilled chef.",
          "The CPU acts as the permanent pantry, while RAM acts as the recipe book.",
          "The CPU acts as the dishwashing station, while RAM acts as the dining table.",
          "The CPU acts as the skilled chef, while RAM acts as the accessible countertop."
        ],
        "correctOptionIndex": 3,
        "explanation": "The CPU is analogous to a skilled chef who constantly executes recipes (instructions) and works with ingredients (data). RAM is analogous to the large, easily accessible countertop where the chef keeps all the ingredients needed for the current dish. The other choices incorrectly assign the roles of active processing (chef) and temporary accessible storage (countertop) to the wrong components."
      },
      {
        "id": "c2_q5",
        "questionText": "When a computer's Random Access Memory becomes completely full, the operating system must manage active data by temporarily moving less-used information to slower storage. What is this process called?",
        "options": [
          "Caching, which involves increasing the processor's cycle speed.",
          "Swapping, which involves transferring data to the hard drive.",
          "Booting, which involves initializing the basic input-output system.",
          "Fetching, which involves retrieving data from the main memory."
        ],
        "correctOptionIndex": 1,
        "explanation": "When RAM is full, the system is forced to temporarily move less-used data to slower storage, such as the hard drive, in a process known as \"swapping.\" Caching is a different memory management technique. Booting refers to starting the computer, and fetching refers to the CPU retrieving instructions from RAM, neither of which describe the overflow management of RAM."
      },
      {
        "id": "c2_q6",
        "questionText": "In computer data representation, what is the smallest fundamental unit of information that can be stored in a machine, representing a single binary state?",
        "options": [
          "A Byte, which represents a single alphanumeric character.",
          "A Nibble, which represents a grouping of four binary states.",
          "A Bit, which represents an on or off electrical state.",
          "A Word, which represents a variable-length processing unit."
        ],
        "correctOptionIndex": 2,
        "explanation": "A bit (binary digit) refers to the smallest unit of information that can be stored in a machine, representing an on or off state (1 or 0). A nibble consists of 4 bits, a byte consists of 8 bits and represents a character, and a word is a larger processing unit, all of which are larger than a single bit."
      },
      {
        "id": "c2_q7",
        "questionText": "How many individual bits are required to compose a single byte, which is the basic unit of computer memory representing one character?",
        "options": [
          "Eight bits, which are combined to represent a single character.",
          "Four bits, which are combined to represent a single character.",
          "Sixteen bits, which are combined to represent a single character.",
          "Thirty-two bits, which are combined to represent a single character."
        ],
        "correctOptionIndex": 0,
        "explanation": "A byte is the basic unit in computer memory that represents only one character (such as a number, letter, or symbol), and one byte is composed of exactly eight bits. Four bits make a nibble, while sixteen and thirty-two bits represent larger units known as computer words, not a single basic character byte."
      },
      {
        "id": "c2_q8",
        "questionText": "A programmer is analyzing a binary string and identifies a sequence consisting of exactly four bits grouped together. What is the correct terminology for this specific grouping?",
        "options": [
          "A Byte, which represents a standard text character.",
          "A Word, which represents the processor's native data size.",
          "A Nibble, which represents half of a standard byte.",
          "A Kilobyte, which represents a larger storage measurement."
        ],
        "correctOptionIndex": 2,
        "explanation": "A nibble is explicitly defined as a group of 4 bits. A byte is a group of 8 bits, a word is a larger unit ranging from 2 to 64 bytes, and a kilobyte is a much larger unit of data measurement (1,024 bytes), making them incorrect for a 4-bit sequence."
      },
      {
        "id": "c2_q9",
        "questionText": "When quantifying digital storage capacity, how many bytes are technically equivalent to one Kilobyte (KB) according to standard binary measurement?",
        "options": [
          "Exactly 1,000 bytes, based on the standard decimal system.",
          "Exactly 1,024 bytes, based on the standard binary system.",
          "Exactly 1,048,576 bytes, based on the standard binary system.",
          "Exactly 1,073,741,824 bytes, based on the standard binary system."
        ],
        "correctOptionIndex": 1,
        "explanation": "In standard computer memory measurement, 1 Kilobyte (KB) is equal to 1,024 bytes. 1,000 bytes represents a decimal approximation, while 1,048,576 bytes equals 1 Megabyte (MB), and 1,073,741,824 bytes equals 1 Gigabyte (GB), making them incorrect for a single Kilobyte."
      },
      {
        "id": "c2_q10",
        "questionText": "Which specific mechanism is utilized by a Hard Disk Drive (HDD) to physically represent and store binary data on its surface?",
        "options": [
          "An electromagnet charges the disk's surface with positive or negative states.",
          "A laser beam burns microscopic pits into a reflective optical surface.",
          "A series of transistors trap electrical charges within flash memory cells.",
          "A mechanical stylus physically indents the magnetic coating of the disk."
        ],
        "correctOptionIndex": 0,
        "explanation": "In a Hard Disk Drive (HDD), an electromagnet in the read/write head charges the disk's surface with either a positive or negative charge, which is how binary 1 or 0 is represented. Laser beams are used in optical drives, flash memory transistors are used in Solid State Drives (SSD), and mechanical styli are not used in modern HDDs."
      },
      {
        "id": "c2_q11",
        "questionText": "Which characteristic provides Solid State Drives (SSDs) with an advantage over traditional Hard Disk Drives (HDDs) by allowing for immediate data access?",
        "options": [
          "The use of magnetic platters that spin at extremely high velocities.",
          "The implementation of optical lasers that read microscopic surface pits.",
          "The utilization of mechanical actuator arms for rapid head movement.",
          "The reliance on flash memories and transistors with no moving parts."
        ],
        "correctOptionIndex": 3,
        "explanation": "Solid State Drives (SSD) use flash memories (millions of transistors), giving them the advantage of having no mechanical moving parts and therefore immediate access to the data. Magnetic platters, spinning velocities, and actuator arms are components of HDDs, while optical lasers are used in CD/DVD drives, none of which describe the architecture of an SSD."
      },
      {
        "id": "c2_q12",
        "questionText": "What is the primary function of Read-Only Memory (ROM) within a computer system's architecture?",
        "options": [
          "To temporarily store active documents that are being edited.",
          "To permanently store the startup routines such as the BIOS.",
          "To cache frequently accessed web browser data for speed.",
          "To provide volatile storage for the operating system kernel."
        ],
        "correctOptionIndex": 1,
        "explanation": "ROM is a non-volatile memory chip whose contents cannot be altered, and it is often used to store the startup routines in a computer (e.g., the BIOS). Temporary storage of active documents and volatile storage for the operating system are functions of RAM, while caching web data is a software-level storage function, not the primary purpose of ROM."
      },
      {
        "id": "c2_q13",
        "questionText": "When comparing common optical storage media, which format possesses the highest maximum data capacity range?",
        "options": [
          "The Compact Disc, which holds up to 700 Megabytes of data.",
          "The Digital Versatile Disc, which holds up to 7 Gigabytes of data.",
          "The Blu-Ray Disc, which holds up to 128 Gigabytes of data.",
          "The USB Flash Drive, which holds up to 256 Megabytes of data."
        ],
        "correctOptionIndex": 2,
        "explanation": "According to optical media capacities, Blu-Ray discs hold between 25 GB and 128 GB, which is significantly higher than CDs (700 MB) and DVDs (4-7 GB). USB flash drives can hold varying amounts but the provided range in the context of optical media comparison identifies Blu-Ray as the highest capacity optical format listed."
      },
      {
        "id": "c2_q14",
        "questionText": "Which unit of measurement is primarily used to quantify the operational speed of a Central Processing Unit (CPU)?",
        "options": [
          "Gigabytes, which indicate the total volume of temporary storage.",
          "Hertz, which indicate the number of cycles executed per second.",
          "Bytes, which indicate the amount of data processed per instruction.",
          "Pixels, which indicate the visual resolution of the output display."
        ],
        "correctOptionIndex": 1,
        "explanation": "CPU speed is primarily measured in Hertz (Hz), indicating the number of cycles per second the processor can execute. Gigabytes measure RAM capacity, bytes measure data size, and pixels measure display resolution, none of which are the standard unit for CPU clock speed."
      },
      {
        "id": "c2_q15",
        "questionText": "Which metric is utilized to express the storage capacity of Random Access Memory (RAM)?",
        "options": [
          "Hertz, which measure the frequency of the memory clock cycles.",
          "Megabytes, which measure the physical dimensions of the memory chip.",
          "Gigabytes, which indicate how much data it can hold simultaneously.",
          "Nanoseconds, which measure the latency of the memory modules."
        ],
        "correctOptionIndex": 2,
        "explanation": "RAM capacity is measured in Gigabytes (GB), indicating how much data it can hold simultaneously. Hertz measures frequency (speed), not capacity. Megabytes measure data volume but are typically too small for modern RAM capacity descriptions, and nanoseconds measure time latency, not storage volume."
      },
      {
        "id": "c2_q16",
        "questionText": "Within the central processing unit, which specific subunit is responsible for performing mathematical calculations and logical decision operations?",
        "options": [
          "The Arithmetic Logic Unit, which executes mathematical and decision operations.",
          "The Control Unit, which manages the flow of data between components.",
          "The Random Access Memory, which stores the operands for the operations.",
          "The Basic Input Output System, which initializes the hardware components."
        ],
        "correctOptionIndex": 0,
        "explanation": "The ALU (arithmetic logic unit) is explicitly defined as the component that performs mathematical, logical, and decision operations. The Control Unit directs operations, RAM stores data, and the BIOS initializes hardware, none of which perform the actual mathematical and logical calculations within the CPU."
      },
      {
        "id": "c2_q17",
        "questionText": "A computer word, which is the native unit of data used by a processor, typically ranges between what lengths in modern computing?",
        "options": [
          "It ranges from 1 bit to 8 bits in length.",
          "It ranges from 2 bits to 16 bits in length.",
          "It ranges from 1 byte to 4 bytes in length.",
          "It ranges from 2 bytes to 64 bytes in length."
        ],
        "correctOptionIndex": 3,
        "explanation": "A computer word refers to the unit of data that a computer stores and processes, and its length (word-size or word length) ranges from 2 bytes to 64 bytes. Ranges of 1 to 8 bits or 2 to 16 bits describe smaller units like bytes and nibbles, while 1 to 4 bytes is too narrow for the full range of modern word sizes."
      },
      {
        "id": "c2_q18",
        "questionText": "Why is Random Access Memory (RAM) classified as a \"volatile\" storage medium?",
        "options": [
          "Because all stored data is instantly erased when the power is lost.",
          "Because the stored data degrades slowly over a period of years.",
          "Because it requires a laser to read the data from a spinning platter.",
          "Because it uses magnetic charges to permanently store the data."
        ],
        "correctOptionIndex": 0,
        "explanation": "RAM is referred to as \"volatile\" because any data stored in it is lost the moment the computer loses power. Slow degradation over years, laser reading, and magnetic permanent storage are characteristics of non-volatile storage devices like HDDs and optical media, not volatile RAM."
      },
      {
        "id": "c2_q19",
        "questionText": "How is binary data physically stored and read on optical media such as CDs, DVDs, and Blu-Ray discs?",
        "options": [
          "By using an electromagnet to charge microscopic sectors on the surface.",
          "By using a laser to read changes in the texture of the disc's surface.",
          "By using flash transistors to trap electrons within memory cells.",
          "By using a mechanical stylus to etch grooves into a magnetic layer."
        ],
        "correctOptionIndex": 1,
        "explanation": "In optical media, binary data is stored as changes to the texture of the disc's surface, located as a continuous track, and read using a laser that determines whether a 0 or 1 is present. Electromagnets are used in HDDs, flash transistors are used in SSDs, and mechanical styli are not used in optical media."
      },
      {
        "id": "c2_q20",
        "questionText": "Which of the following accurately describes the physical nature of a Universal Serial Bus (USB) flash drive?",
        "options": [
          "A volatile magnetic device that requires continuous power to retain data.",
          "A non-volatile optical device that utilizes a laser to read data.",
          "A volatile solid-state device that uses mechanical read heads.",
          "A non-volatile solid-state device that uses flash memories."
        ],
        "correctOptionIndex": 3,
        "explanation": "USB flash memory drives are non-volatile solid-state storage devices that use flash memories (millions of transistors) to store data. They are not magnetic, do not use optical lasers, and are non-volatile, meaning they retain data without power, making the other choices incorrect."
      },
      {
        "id": "c2_q21",
        "questionText": "What does the acronym CPU stand for in computer architecture?",
        "options": [
          "Central Processing Unit, which describes its role as the primary processor.",
          "Common Processing Unit, which describes its shared resource nature.",
          "Central Peripheral Unit, which describes its connection to input devices.",
          "Central Processing Utility, which describes its software application suite."
        ],
        "correctOptionIndex": 0,
        "explanation": "CPU stands for Central Processing Unit, which accurately describes its role as the primary processor of instructions within the computer. The other choices are fabricated acronyms that do not reflect the standard terminology used in computer science."
      },
      {
        "id": "c2_q22",
        "questionText": "Which of the following lists the three main parts of a CPU as identified in standard computer anatomy?",
        "options": [
          "RAM, ROM, and Cache, which are the primary memory units.",
          "Motherboard, GPU, and PSU, which are the core system components.",
          "ALU, Control Unit, and Registers, which are the internal processor parts.",
          "Cache, Bus, and Clock, which are the data transmission components."
        ],
        "correctOptionIndex": 2,
        "explanation": "The main parts of a CPU are the Arithmetic Logic Unit (ALU), the Control Unit, and the Registers. RAM, ROM, Cache, Motherboard, GPU, PSU, Bus, and Clock are all separate components or architectural elements of the broader computer system, not the internal parts of the CPU itself."
      },
      {
        "id": "c2_q23",
        "questionText": "What is the exact capacity of one Megabyte (MB) when expressed in terms of Kilobytes (KB)?",
        "options": [
          "1,024 KB, which reflects the binary base-2 calculation.",
          "1,000 KB, which reflects the decimal base-10 calculation.",
          "1,048,576 KB, which reflects the calculation for one Gigabyte.",
          "1,073,741,824 KB, which reflects the calculation for one Terabyte."
        ],
        "correctOptionIndex": 0,
        "explanation": "According to standard data measurement, 1 Megabyte (MB) is equivalent to 1,024 Kilobytes (KB). 1,000 is a decimal approximation, while 1,048,576 is the number of bytes in a Megabyte (not KB), and 1,073,741,824 is the number of bytes in a Gigabyte."
      },
      {
        "id": "c2_q24",
        "questionText": "Which of the following statements accurately describes the relationship between a computer's CPU and RAM in terms of system performance?",
        "options": [
          "The CPU provides long-term storage, while RAM handles the temporary display of graphics.",
          "The CPU executes instructions, while RAM provides the fast temporary storage for data.",
          "The CPU manages the network connection, while RAM controls the peripheral input devices.",
          "The CPU stores the BIOS, while RAM executes the mathematical calculations."
        ],
        "correctOptionIndex": 1,
        "explanation": "The CPU is responsible for executing instructions, while RAM provides the fast, temporary storage needed for those instructions and data. Long-term storage is handled by the hard drive, graphics display by the GPU, BIOS storage by ROM, and mathematical calculations by the ALU inside the CPU, making the other choices incorrect."
      },
      {
        "id": "c2_q25",
        "questionText": "What is the fundamental purpose of the Fetch-Decode-Execute cycle in a computer system?",
        "options": [
          "To permanently store data on the hard disk drive for future use.",
          "To render three-dimensional graphics for video playback.",
          "To allow the CPU to process information and respond to commands.",
          "To establish a secure connection to the internet network."
        ],
        "correctOptionIndex": 2,
        "explanation": "The Fetch-Decode-Execute cycle is the fundamental process that repeats millions of times per second, allowing the CPU to process information at incredible speeds and respond instantly to commands. Permanent storage, graphics rendering, and internet connection are functions of other hardware and software components."
      }
    ]
  },
  {
    "id": "section-5",
    "sectionNumber": 5,
    "titleEn": "Section 5: Questions 100–125",
    "titleAr": "القسم الخامس: الأسئلة 100-125",
    "range": "100-125",
    "descriptionEn": "CPU vs RAM kitchen countertop analogy, volatile memory management, and paging/virtual memory.",
    "descriptionAr": "تشبيه المعالج والذاكرة بالمطبخ، إدارة الذاكرة المتطايرة، والذاكرة الافتراضية.",
    "url": "https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Computer&preview=100-125.docx",
    "questions": [
      {
        "id": "c2_q26",
        "questionText": "What is the exact capacity of one Gigabyte (GB) when expressed in terms of Megabytes (MB)?",
        "options": [
          "1,024 MB, which reflects the binary base-2 calculation.",
          "1,000 MB, which reflects the decimal base-10 calculation.",
          "1,048,576 MB, which reflects the calculation for one Terabyte.",
          "1,024 KB, which reflects the calculation for one Megabyte."
        ],
        "correctOptionIndex": 0,
        "explanation": "According to standard storage unit measurements, 1 Gigabyte (GB) is equivalent to 1,024 Megabytes (MB). 1,000 is a decimal approximation, 1,048,576 represents the number of bytes in a Megabyte, and 1,024 KB equals exactly one Megabyte, not one Gigabyte."
      },
      {
        "id": "c2_q27",
        "questionText": "If a computer's RAM is described as having \"high-speed, short-term memory,\" what is the primary advantage of this characteristic?",
        "options": [
          "It allows for the permanent archival of patient records and x-rays.",
          "It enables incredibly quick access for the CPU to retrieve active data.",
          "It reduces the overall power consumption of the motherboard.",
          "It provides a backup storage location in case the hard drive fails."
        ],
        "correctOptionIndex": 1,
        "explanation": "The primary purpose of RAM's high-speed nature is to enable incredibly quick access for the CPU to retrieve and manipulate active data, ensuring a smooth and responsive user experience. Permanent archival is handled by secondary storage, power consumption is a separate metric, and RAM does not serve as a backup for the hard drive as it is volatile."
      },
      {
        "id": "c2_q28",
        "questionText": "Which component of a computer system is responsible for converting electricity from the wall outlet into a form that the other internal components can use?",
        "options": [
          "The Motherboard, which holds and connects various components.",
          "The Power Supply, which converts electrical power for the system.",
          "The Expansion Card, which adds functionality to the system.",
          "The Optical Drive, which reads and writes data to discs."
        ],
        "correctOptionIndex": 1,
        "explanation": "The Power Supply is the hardware component that converts electricity from the wall into the form that the other computer components use. The Motherboard connects components, Expansion Cards add functionality, and Optical Drives handle media reading/writing, none of which perform the power conversion function."
      },
      {
        "id": "c2_q29",
        "questionText": "What is the function of an expansion card within a computer system?",
        "options": [
          "To serve as the primary long-term storage memory for the computer.",
          "To act as the brain of the computer by executing all instructions.",
          "To permanently store the startup routines such as the BIOS.",
          "To add specific functionality, such as network or sound capabilities."
        ],
        "correctOptionIndex": 3,
        "explanation": "Expansion cards are circuit boards that can be inserted to add functionality to a computer system, such as network, sound, or video cards. Long-term storage is the role of the hard drive, executing instructions is the CPU's role, and storing BIOS is the role of ROM."
      },
      {
        "id": "c2_q30",
        "questionText": "In the context of data measurement, how many bytes are equivalent to one Terabyte (TB)?",
        "options": [
          "1,024 bytes, which represents a standard Kilobyte.",
          "1,048,576 bytes, which represents a standard Megabyte.",
          "1,073,741,824 bytes, which represents a standard Gigabyte.",
          "1,099,511,627,776 bytes, which represents a standard Terabyte."
        ],
        "correctOptionIndex": 3,
        "explanation": "A Terabyte (TB) is defined as approximately one trillion bytes, which technically equals 1,099,511,627,776 bytes. The other options represent the exact byte counts for a Kilobyte, a Megabyte, and a Gigabyte, respectively."
      },
      {
        "id": "c2_q31",
        "questionText": "Which hardware component is responsible for rendering graphics and accelerating video playback within a computer system?",
        "options": [
          "The Central Processing Unit, which handles all general computations.",
          "The Random Access Memory, which stores active video data.",
          "The Graphics Processing Unit, which is dedicated to visual rendering.",
          "The Hard Disk Drive, which stores the video files permanently."
        ],
        "correctOptionIndex": 2,
        "explanation": "The Graphics Processing Unit (GPU) is dedicated hardware for rendering graphics and accelerating video playback. The CPU handles general instructions, RAM stores active data, and the HDD provides permanent storage, none of which are specifically dedicated to graphical rendering."
      },
      {
        "id": "c2_q32",
        "questionText": "What is the primary difference between an input device and an output device in a computer system?",
        "options": [
          "Input devices send data to the computer, while output devices provide data to the user.",
          "Input devices are internal, while output devices are external peripherals.",
          "Input devices require power, while output devices do not require power.",
          "Input devices are wireless, while output devices are strictly wired."
        ],
        "correctOptionIndex": 0,
        "explanation": "Input devices are used to interact with, or send data to, the computer (e.g., mouse, keyboard), while output devices provide output to the user from the computer (e.g., monitor, printer). The other choices incorrectly describe the physical location, power requirements, or connection types of these devices."
      },
      {
        "id": "c2_q33",
        "questionText": "A scanner is classified as which type of computer peripheral?",
        "options": [
          "An output device that transfers digital data onto paper.",
          "An input device that converts physical documents into digital images.",
          "A storage device that permanently holds backup data.",
          "A processing device that accelerates video playback."
        ],
        "correctOptionIndex": 1,
        "explanation": "A scanner is an input device that can convert the contents of a paper document into a digital image that can be stored in the computer. Transferring data to paper is the function of a printer (output), permanent backup storage is a hard drive, and video acceleration is a GPU function."
      },
      {
        "id": "c2_q34",
        "questionText": "Which statement accurately describes the classification of a touchscreen monitor?",
        "options": [
          "It is exclusively an output device that displays visual information.",
          "It is exclusively an input device that registers physical touch.",
          "It is a storage device that saves user interaction data.",
          "It combines the functions of both output and input devices."
        ],
        "correctOptionIndex": 3,
        "explanation": "Generally, monitors are output devices where the computer visually displays information; however, touchscreens combine the functions of output (displaying) and input (registering touch) devices. It is not exclusively one or the other, nor is it primarily a storage device."
      },
      {
        "id": "c2_q35",
        "questionText": "What is the primary function of the motherboard within a computer system?",
        "options": [
          "A circuit board that holds and connects various components for communication.",
          "A temporary storage area for data that the CPU needs to access quickly.",
          "A device that converts electricity from the wall into usable power.",
          "A dedicated processor that renders graphics for video playback."
        ],
        "correctOptionIndex": 0,
        "explanation": "The motherboard is a circuit board that holds and connects various components of the computer and allows their communication. Temporary storage is RAM, power conversion is the Power Supply, and graphics rendering is the GPU, none of which describe the motherboard."
      },
      {
        "id": "c2_q36",
        "questionText": "Which of the following accurately describes the function of the operating system's user interface?",
        "options": [
          "It manages the physical connections between the CPU and the motherboard.",
          "It controls how you enter data and instructions and how information is displayed.",
          "It converts electrical signals into binary data for the processor to read.",
          "It permanently stores user files and applications on the hard drive."
        ],
        "correctOptionIndex": 1,
        "explanation": "The user interface (UI) controls how you enter data and instructions and how information is displayed on the screen, allowing the user to communicate with the operating system. It does not manage physical connections, convert electrical signals, or permanently store files."
      },
      {
        "id": "c2_q37",
        "questionText": "Which operating system function is responsible for managing the order in which tasks are processed?",
        "options": [
          "The graphical user interface, which displays visual elements.",
          "The command line interface, which accepts text-based input.",
          "The operating system scheduler, which coordinates task execution.",
          "The device driver manager, which communicates with hardware."
        ],
        "correctOptionIndex": 2,
        "explanation": "The operating system determines the order in which tasks are processed through its scheduling mechanisms. The user interfaces (GUI/CLI) are for user interaction, and device drivers are for hardware communication, neither of which are primarily responsible for task ordering."
      },
      {
        "id": "c2_q38",
        "questionText": "Which of the following is an example of an application software?",
        "options": [
          "Microsoft Windows, which manages the overall system resources.",
          "Linux, which provides a command-line interface for the system.",
          "Microsoft Word, which is designed for word processing tasks.",
          "The BIOS, which initializes hardware during the boot process."
        ],
        "correctOptionIndex": 2,
        "explanation": "Application software lets you accomplish specific tasks, and Microsoft Word is a classic example of word processing software. Windows and Linux are system software (operating systems), and the BIOS is firmware, not application software."
      },
      {
        "id": "c2_q39",
        "questionText": "What is the primary function of device drivers within a computer system?",
        "options": [
          "To provide a graphical interface for the end user.",
          "To execute the mathematical calculations in the CPU.",
          "To allow the operating system to communicate with hardware devices.",
          "To permanently store the startup routines in the ROM."
        ],
        "correctOptionIndex": 2,
        "explanation": "Device Drivers are software that allows the operating system to communicate with hardware devices. They do not provide user interfaces, execute CPU math, or store startup routines, which are functions of other system components."
      },
      {
        "id": "c2_q40",
        "questionText": "Which type of software is embedded directly into hardware devices to provide low-level control?",
        "options": [
          "Application software, which performs specific user tasks.",
          "System software, which manages overall system activity.",
          "Firmware, which is embedded in hardware for low-level control.",
          "Utility software, which optimizes system performance."
        ],
        "correctOptionIndex": 2,
        "explanation": "Firmware is software embedded in hardware devices that provides low-level control. Application software is for user tasks, system software manages overall activity, and utility software is a category of system software, none of which define the embedded nature of firmware."
      },
      {
        "id": "c2_q41",
        "questionText": "Which of the following is a primary function of system software?",
        "options": [
          "Managing resources such as memory, processing, and storage.",
          "Creating text documents and spreadsheets for the user.",
          "Designing three-dimensional models for dental CAD/CAM.",
          "Browsing the internet and displaying web pages."
        ],
        "correctOptionIndex": 0,
        "explanation": "System software functions include managing resources (memory, processing, storage, and devices like printers), providing a user interface, and running applications. Creating documents, designing 3D models, and browsing the internet are functions of application software."
      },
      {
        "id": "c2_q42",
        "questionText": "What is the primary difference between hardware and software in a computer system?",
        "options": [
          "Hardware is digital, while software is analog.",
          "Hardware is physical, while software consists of electronic instructions.",
          "Hardware is used for diagnostics, while software is used for treatment.",
          "Hardware is temporary, while software is permanent."
        ],
        "correctOptionIndex": 1,
        "explanation": "Hardware refers to the physical components of a computer system, while software is a set of electronic instructions that tell a computer what to do. Hardware is not inherently digital/analog, temporary/permanent, or limited to diagnostics, making the other choices incorrect."
      },
      {
        "id": "c2_q43",
        "questionText": "In the context of dental computing, which of the following is an example of hardware?",
        "options": [
          "Electronic Health Records (EHR) systems.",
          "Practice management software platforms.",
          "Intraoral cameras and 3D printers.",
          "Dental imaging software and CAD/CAM tools."
        ],
        "correctOptionIndex": 2,
        "explanation": "Hardware refers to the physical components of a computer system, such as intraoral cameras and 3D printers used in dental practice. EHRs, practice management software, and imaging/CAD/CAM tools are all examples of software programs."
      },
      {
        "id": "c2_q44",
        "questionText": "How do hardware and software function together in a dental practice?",
        "options": [
          "Hardware stores the data, while software physically cleans the dental tools.",
          "Hardware and software operate independently without any interaction.",
          "Hardware provides the physical platform, while software instructs it to function.",
          "Hardware is used for patient care, while software is only for administration."
        ],
        "correctOptionIndex": 2,
        "explanation": "In dental practice, hardware and software must work together seamlessly to enhance diagnosis, treatment, and patient care. Hardware provides the physical components, and software instructs the hardware on what to do. They do not operate independently, and hardware does not clean tools."
      },
      {
        "id": "c2_q45",
        "questionText": "What is the definition of an input device in the context of computer peripherals?",
        "options": [
          "A device used to put information into or get information out of the computer.",
          "A device used exclusively to send data to the computer for processing.",
          "A device used exclusively to display processed data to the user.",
          "A device used to permanently store data for future retrieval."
        ],
        "correctOptionIndex": 1,
        "explanation": "Input devices are used to interact with, or send data to, the computer (e.g., mouse, keyboard). Output devices provide information from the computer to the user. While some devices (like touchscreens) can do both, the definition of an input device is strictly sending data to the computer."
      },
      {
        "id": "c2_q46",
        "questionText": "Which of the following is classified as an output device?",
        "options": [
          "A keyboard, which allows the user to type commands.",
          "A scanner, which digitizes physical documents.",
          "A mouse, which allows interaction with visual objects.",
          "A monitor, which displays information visually."
        ],
        "correctOptionIndex": 3,
        "explanation": "A monitor is an output device that displays information visually. Keyboards, scanners, and mice are all input devices used to send data or instructions to the computer, not to provide output to the user."
      },
      {
        "id": "c2_q47",
        "questionText": "What is the primary function of a port on a computer system?",
        "options": [
          "To serve as a connector for plugging in peripheral devices.",
          "To execute the mathematical instructions of the CPU.",
          "To permanently store the operating system files.",
          "To provide temporary power during a blackout."
        ],
        "correctOptionIndex": 0,
        "explanation": "A port is a connector located on the system case that you use to plug peripheral devices into the computer. It does not execute instructions, store files, or provide backup power, as those are functions of the CPU, hard drive, and UPS, respectively."
      },
      {
        "id": "c2_q48",
        "questionText": "Within the system unit, what is the function of a bus?",
        "options": [
          "To physically secure the motherboard to the case.",
          "A sequence of electronic circuitry used to transfer data among components.",
          "To convert alternating current into direct current.",
          "To provide a graphical user interface for the user."
        ],
        "correctOptionIndex": 1,
        "explanation": "A bus is a sequence of electronic circuitry used to transfer data among computer components. Peripheral devices use a bus to exchange data with the motherboard. It does not secure the motherboard, convert power, or provide a user interface."
      },
      {
        "id": "c2_q49",
        "questionText": "Which type of port is commonly used to connect a computer to a wired network using an Ethernet cable?",
        "options": [
          "The HDMI port, which transmits high-definition video and audio.",
          "The USB port, which connects a wide variety of peripherals.",
          "The RJ-45 port, which is designed for network connections.",
          "The VGA port, which connects analog display monitors."
        ],
        "correctOptionIndex": 2,
        "explanation": "The RJ-45 port connects the computer to a wired network using an Ethernet cable. HDMI is for display/video, USB is a general-purpose interface, and VGA is for analog displays, making them incorrect for Ethernet network connections."
      },
      {
        "id": "c2_q50",
        "questionText": "Which port type is a standard for connecting display monitors to a computer?",
        "options": [
          "The FireWire port, which is used for high-speed multimedia devices.",
          "The Audio port, which connects speakers and microphones.",
          "The RJ-45 port, which connects to wired networks.",
          "The HDMI port, which transmits high-definition video signals."
        ],
        "correctOptionIndex": 3,
        "explanation": "VGA and HDMI are standards for connecting display monitors. FireWire connects multimedia devices like video cameras, Audio ports connect sound devices, and RJ-45 connects to networks, none of which are specifically for connecting monitors."
      }
    ]
  },
  {
    "id": "section-6",
    "sectionNumber": 6,
    "titleEn": "Section 6: Questions 126–150",
    "titleAr": "القسم السادس: الأسئلة 126-150",
    "range": "126-150",
    "descriptionEn": "Binary data representation, bits & bytes, ASCII character encoding, and hexadecimal conversions.",
    "descriptionAr": "تمثيل البيانات الثنائية، البت والبايت، ترميز محارف ASCII، والتحويلات الست عشرية (Hex).",
    "url": "https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Computer&preview=126-150.docx",
    "questions": [
      {
        "id": "c3_q6",
        "questionText": "What is the correct binary code representation for the hexadecimal number \"3F\"?",
        "options": [
          "The binary code 01110001 represents the hexadecimal value 3F.",
          "The binary code 01100011 represents the hexadecimal value 3F.",
          "The binary code 00111111 represents the hexadecimal value 3F.",
          "The binary code 01001101 represents the hexadecimal value 3F."
        ],
        "correctOptionIndex": 2,
        "explanation": "The hexadecimal number \"3F\" translates to the binary code 00111111. The other binary sequences represent different values, such as the hexadecimal 71, the decimal 99, or the decimal 77, none of which correspond to the hexadecimal 3F."
      },
      {
        "id": "c3_q7",
        "questionText": "Based on standard hexadecimal to binary conversion, what is the binary representation of the hexadecimal digit \"A\"?",
        "options": [
          "The binary representation 1000 corresponds to the hexadecimal digit A.",
          "The binary representation 1010 corresponds to the hexadecimal digit A.",
          "The binary representation 1100 corresponds to the hexadecimal digit A.",
          "The binary representation 1111 corresponds to the hexadecimal digit A."
        ],
        "correctOptionIndex": 1,
        "explanation": "According to the hexadecimal to binary conversion table, the hexadecimal digit \"A\" is equivalent to the binary sequence 1010. The sequences 1000, 1100, and 1111 correspond to the hexadecimal digits 8, C, and F, respectively."
      },
      {
        "id": "c3_q8",
        "questionText": "Based on standard hexadecimal to binary conversion, what is the binary representation of the hexadecimal digit \"F\"?",
        "options": [
          "The binary representation 1010 corresponds to the hexadecimal digit F.",
          "The binary representation 1100 corresponds to the hexadecimal digit F.",
          "The binary representation 1110 corresponds to the hexadecimal digit F.",
          "The binary representation 1111 corresponds to the hexadecimal digit F."
        ],
        "correctOptionIndex": 3,
        "explanation": "According to the hexadecimal to binary conversion table, the hexadecimal digit \"F\" is equivalent to the binary sequence 1111. The sequences 1010, 1100, and 1110 correspond to the hexadecimal digits A, C, and E, respectively."
      },
      {
        "id": "c3_q9",
        "questionText": "Based on standard hexadecimal to binary conversion, what is the binary representation of the hexadecimal digit \"C\"?",
        "options": [
          "The binary representation 1010 corresponds to the hexadecimal digit C.",
          "The binary representation 1000 corresponds to the hexadecimal digit C.",
          "The binary representation 1100 corresponds to the hexadecimal digit C.",
          "The binary representation 1111 corresponds to the hexadecimal digit C."
        ],
        "correctOptionIndex": 2,
        "explanation": "According to the hexadecimal to binary conversion table, the hexadecimal digit \"C\" is equivalent to the binary sequence 1100. The sequences 1010, 1000, and 1111 correspond to the hexadecimal digits A, 8, and F, respectively."
      },
      {
        "id": "c3_q10",
        "questionText": "Based on standard hexadecimal to binary conversion, what is the binary representation of the hexadecimal digit \"8\"?",
        "options": [
          "The binary representation 1010 corresponds to the hexadecimal digit 8.",
          "The binary representation 1000 corresponds to the hexadecimal digit 8.",
          "The binary representation 1100 corresponds to the hexadecimal digit 8.",
          "The binary representation 0111 corresponds to the hexadecimal digit 8."
        ],
        "correctOptionIndex": 1,
        "explanation": "According to the hexadecimal to binary conversion table, the hexadecimal digit \"8\" is equivalent to the binary sequence 1000. The sequences 1010, 1100, and 0111 correspond to the hexadecimal digits A, C, and 7, respectively."
      },
      {
        "id": "c3_q11",
        "questionText": "When measuring computer data storage, how many bytes are equivalent to one Kilobyte (KB) based on standard binary calculation?",
        "options": [
          "One Kilobyte is equivalent to exactly 1,000 bytes.",
          "One Kilobyte is equivalent to exactly 1,048,576 bytes.",
          "One Kilobyte is equivalent to exactly 1,073,741,824 bytes.",
          "One Kilobyte is equivalent to exactly 1,024 bytes."
        ],
        "correctOptionIndex": 3,
        "explanation": "According to standard data measurement terms, one Kilobyte (KB) is equal to 1,024 bytes (about 1,000). The other byte amounts represent one Megabyte (1,048,576 bytes) and one Gigabyte (1,073,741,824 bytes), making them incorrect for a Kilobyte."
      },
      {
        "id": "c3_q12",
        "questionText": "When measuring computer data storage, how many bytes are equivalent to one Megabyte (MB) based on standard binary calculation?",
        "options": [
          "One Megabyte is equivalent to exactly 1,024 bytes.",
          "One Megabyte is equivalent to exactly 1,048,576 bytes.",
          "One Megabyte is equivalent to exactly 1,073,741,824 bytes.",
          "One Megabyte is equivalent to exactly 1,099,511,627,776 bytes."
        ],
        "correctOptionIndex": 1,
        "explanation": "According to standard data measurement terms, one Megabyte (MB) is equal to 1,048,576 bytes (about 1 million). The other byte amounts represent one Kilobyte, one Gigabyte, and one Terabyte, respectively, making them incorrect for a Megabyte."
      },
      {
        "id": "c3_q13",
        "questionText": "When measuring computer data storage, how many bytes are equivalent to one Gigabyte (GB) based on standard binary calculation?",
        "options": [
          "One Gigabyte is equivalent to exactly 1,048,576 bytes.",
          "One Gigabyte is equivalent to exactly 1,099,511,627,776 bytes.",
          "One Gigabyte is equivalent to exactly 1,073,741,824 bytes.",
          "One Gigabyte is equivalent to exactly 1,024 bytes."
        ],
        "correctOptionIndex": 2,
        "explanation": "According to standard data measurement terms, one Gigabyte (GB) is equal to 1,073,741,824 bytes (about 1 billion). The other byte amounts represent one Megabyte, one Terabyte, and one Kilobyte, respectively, making them incorrect for a Gigabyte."
      },
      {
        "id": "c3_q14",
        "questionText": "When measuring computer data storage, how many bytes are equivalent to one Terabyte (TB) based on standard binary calculation?",
        "options": [
          "One Terabyte is equivalent to exactly 1,073,741,824 bytes.",
          "One Terabyte is equivalent to exactly 1,048,576 bytes.",
          "One Terabyte is equivalent to exactly 1,024 bytes.",
          "One Terabyte is equivalent to exactly 1,099,511,627,776 bytes."
        ],
        "correctOptionIndex": 3,
        "explanation": "According to standard data measurement terms, one Terabyte (TB) is equal to 1,099,511,627,776 bytes (about 1 trillion). The other byte amounts represent one Gigabyte, one Megabyte, and one Kilobyte, respectively, making them incorrect for a Terabyte."
      },
      {
        "id": "c3_q15",
        "questionText": "Which of the following real-world examples is approximately equivalent to one Kilobyte (KB) of data?",
        "options": [
          "A 250-word poem is approximately one Kilobyte of data.",
          "Four books of 200 pages each are approximately one Kilobyte of data.",
          "341 digital photos of 3 MB each are approximately one Kilobyte of data.",
          "300 hours of video are approximately one Kilobyte of data."
        ],
        "correctOptionIndex": 0,
        "explanation": "A Kilobyte (KB) is approximately equivalent to a 250-word poem. Four books are equivalent to a Megabyte, 341 photos are equivalent to a Gigabyte, and 300 hours of video are equivalent to a Terabyte, making the other choices incorrect."
      },
      {
        "id": "c3_q16",
        "questionText": "Which of the following real-world examples is approximately equivalent to one Megabyte (MB) of data?",
        "options": [
          "A 250-word poem is approximately one Megabyte of data.",
          "Four books of 200 pages each are approximately one Megabyte of data.",
          "341 digital photos of 3 MB each are approximately one Megabyte of data.",
          "300 hours of video are approximately one Megabyte of data."
        ],
        "correctOptionIndex": 1,
        "explanation": "A Megabyte (MB) is approximately equivalent to four books of 200 pages each. A 250-word poem is a Kilobyte, 341 photos are a Gigabyte, and 300 hours of video are a Terabyte, making the other choices incorrect."
      },
      {
        "id": "c3_q17",
        "questionText": "Which of the following real-world examples is approximately equivalent to one Gigabyte (GB) of data?",
        "options": [
          "A 250-word poem is approximately one Gigabyte of data.",
          "Four books of 200 pages each are approximately one Gigabyte of data.",
          "341 digital photos of 3 MB each are approximately one Gigabyte of data.",
          "300 hours of video are approximately one Gigabyte of data."
        ],
        "correctOptionIndex": 2,
        "explanation": "A Gigabyte (GB) is approximately equivalent to 341 digital photos of 3 MB each. A 250-word poem is a Kilobyte, four books are a Megabyte, and 300 hours of video are a Terabyte, making the other choices incorrect."
      },
      {
        "id": "c3_q18",
        "questionText": "Which of the following real-world examples is approximately equivalent to one Terabyte (TB) of data?",
        "options": [
          "A 250-word poem is approximately one Terabyte of data.",
          "Four books of 200 pages each are approximately one Terabyte of data.",
          "341 digital photos of 3 MB each are approximately one Terabyte of data.",
          "300 hours of video are approximately one Terabyte of data."
        ],
        "correctOptionIndex": 3,
        "explanation": "A Terabyte (TB) is approximately equivalent to 300 hours of video. A 250-word poem is a Kilobyte, four books are a Megabyte, and 341 photos are a Gigabyte, making the other choices incorrect."
      },
      {
        "id": "c3_q19",
        "questionText": "What is the primary function of the processor within a computer's system unit?",
        "options": [
          "The processor processes instructions and executes calculations for the system.",
          "The processor provides temporary storage space for actively running programs.",
          "The processor connects various peripheral devices to the main circuit board.",
          "The processor permanently stores the operating system and user files."
        ],
        "correctOptionIndex": 0,
        "explanation": "The processor (CPU) is responsible for processing instructions and executing calculations. RAM provides temporary storage, the motherboard connects peripherals, and the hard drive provides permanent storage, making the other choices incorrect."
      },
      {
        "id": "c3_q20",
        "questionText": "What is the primary function of memory chips within a computer's system unit?",
        "options": [
          "The memory chips process instructions and execute calculations for the system.",
          "The memory chips provide temporary storage space for actively running programs.",
          "The memory chips connect various peripheral devices to the main circuit board.",
          "The memory chips permanently store the operating system and user files."
        ],
        "correctOptionIndex": 1,
        "explanation": "Memory chips (RAM) provide temporary storage space for data and programs that are actively in use. The processor handles calculations, the motherboard connects peripherals, and the hard drive handles permanent storage, making the other choices incorrect."
      },
      {
        "id": "c3_q21",
        "questionText": "What is the primary function of the motherboard within a computer's system unit?",
        "options": [
          "The motherboard processes instructions and executes calculations for the system.",
          "The motherboard provides temporary storage space for actively running programs.",
          "The motherboard holds and connects various components to allow their communication.",
          "The motherboard permanently stores the operating system and user files."
        ],
        "correctOptionIndex": 2,
        "explanation": "The motherboard is a circuit board that holds and connects various components of the computer and allows their communication. The processor handles calculations, memory chips handle temporary storage, and the hard drive handles permanent storage, making the other choices incorrect."
      },
      {
        "id": "c3_q22",
        "questionText": "Which components are attached to the motherboard to allow peripheral devices to communicate with the computer?",
        "options": [
          "The ports and buses are attached to the motherboard for peripheral communication.",
          "The central processing unit and its registers are attached for peripheral communication.",
          "The power supply and its connectors are attached for peripheral communication.",
          "The random access memory and its modules are attached for peripheral communication."
        ],
        "correctOptionIndex": 0,
        "explanation": "Components for connecting peripheral devices are attached to the motherboard via ports and buses. The CPU, power supply, and RAM are essential system components but are not the specific attachment points described for peripheral communication."
      },
      {
        "id": "c3_q23",
        "questionText": "What is the primary purpose of a USB hub in a computer system?",
        "options": [
          "A USB hub increases the number of available USB ports for connecting devices.",
          "A USB hub increases the processing speed of the computer's central unit.",
          "A USB hub provides additional permanent storage space for user files.",
          "A USB hub cools down the internal components of the system unit."
        ],
        "correctOptionIndex": 0,
        "explanation": "A USB hub is a device that contains a number of USB ports itself, and plugs into a single USB port on a computer to increase the number of ports you can use. It does not increase processing speed, provide permanent storage, or cool the system, making the other choices incorrect."
      },
      {
        "id": "c3_q24",
        "questionText": "How many USB ports do personal computers typically have on the back, front, or side of the system unit?",
        "options": [
          "Personal computers typically have one to two USB ports on the system unit.",
          "Personal computers typically have four to eight USB ports on the system unit.",
          "Personal computers typically have ten to twelve USB ports on the system unit.",
          "Personal computers typically have sixteen to twenty USB ports on the system unit."
        ],
        "correctOptionIndex": 1,
        "explanation": "Personal computers typically have four to eight USB ports on the back, front, or side of the system unit. The other numbers do not reflect the standard configuration described for typical personal computers."
      },
      {
        "id": "c3_q25",
        "questionText": "Which of the following best defines a computer peripheral?",
        "options": [
          "A device that is connected to the computer but is not part of core architecture.",
          "A device that is essential for the central processing unit to function.",
          "A device that is built directly into the computer's main motherboard.",
          "A device that permanently stores the computer's operating system."
        ],
        "correctOptionIndex": 0,
        "explanation": "A peripheral device is generally any auxiliary device that connects to and works with the computer to increase functionality, but is not a part of the core computer architecture. Core components like the CPU are essential, and peripherals are often external rather than built-in, making the other choices incorrect."
      },
      {
        "id": "c3_q26",
        "questionText": "What is the primary function of an input device in a computer system?",
        "options": [
          "An input device displays processed information to the user visually.",
          "An input device sends data or instructions to the computer for processing.",
          "An input device permanently stores files for future retrieval.",
          "An input device connects the computer to a local area network."
        ],
        "correctOptionIndex": 1,
        "explanation": "Input devices are used to interact with, or send data to, the computer (e.g., mouse, keyboard). Displaying information is an output function, storing files is a storage function, and connecting to a network is a communication function, making the other choices incorrect."
      },
      {
        "id": "c3_q27",
        "questionText": "Which of the following devices is classified as an input device?",
        "options": [
          "A monitor is classified as an input device.",
          "A printer is classified as an input device.",
          "A scanner is classified as an input device.",
          "A speaker is classified as an input device."
        ],
        "correctOptionIndex": 2,
        "explanation": "A scanner is an input device that can convert the contents of a paper document into a digital image. Monitors, printers, and speakers are output devices that provide information to the user, making them incorrect choices."
      },
      {
        "id": "c3_q28",
        "questionText": "What is the primary function of an output device in a computer system?",
        "options": [
          "An output device sends data or instructions to the computer.",
          "An output device permanently stores files for future use.",
          "An output device provides information from the computer to the user.",
          "An output device connects the computer to a wide area network."
        ],
        "correctOptionIndex": 2,
        "explanation": "Output devices provide output to the user from the computer (e.g., monitor, printer). Sending data to the computer is the function of input devices, while storage and networking are separate functions, making the other choices incorrect."
      },
      {
        "id": "c3_q29",
        "questionText": "Which of the following devices is classified as an output device?",
        "options": [
          "A mouse is classified as an output device.",
          "A keyboard is classified as an output device.",
          "A joystick is classified as an output device.",
          "A printer is classified as an output device."
        ],
        "correctOptionIndex": 3,
        "explanation": "A printer is an output device that can transfer digital data onto paper. Mice, keyboards, and joysticks are input devices used to send data or instructions to the computer, making them incorrect choices."
      },
      {
        "id": "c3_q30",
        "questionText": "Which category of computer storage includes both RAM and ROM?",
        "options": [
          "Primary storage includes both RAM and ROM components.",
          "Secondary storage includes both RAM and ROM components.",
          "Tertiary storage includes both RAM and ROM components.",
          "Offline storage includes both RAM and ROM components."
        ],
        "correctOptionIndex": 0,
        "explanation": "Primary storage consists of RAM and ROM. Secondary storage includes devices like external hard drives, flash drives, and CDs. Tertiary and offline storage are not standard terms used for these core components, making the other choices incorrect."
      }
    ]
  },
  {
    "id": "section-7",
    "sectionNumber": 7,
    "titleEn": "Section 7: Questions 151–175",
    "titleAr": "القسم السابع: الأسئلة 151-175",
    "range": "151-175",
    "descriptionEn": "Primary vs secondary storage (RAM, ROM, SSD, HDD, optical), non-volatile memory, and review bank.",
    "descriptionAr": "وسائط التخزين الأولية والثانوية (RAM, ROM, SSD, HDD)، الذاكرة الدائمة، وبنك المراجعة الشامل.",
    "url": "https://supabase.com/dashboard/project/zmsovxqdbhqthluoznmz/storage/files/buckets/Quizsmashlib?path=Computer&preview=151-175.docx",
    "questions": [
      {
        "id": "c3_q31",
        "questionText": "Which category of computer storage includes devices such as hard drives, flash drives, and CD-ROMs?",
        "options": [
          "Primary storage includes hard drives, flash drives, and CD-ROMs.",
          "Secondary storage includes hard drives, flash drives, and CD-ROMs.",
          "Cache storage includes hard drives, flash drives, and CD-ROMs.",
          "Register storage includes hard drives, flash drives, and CD-ROMs."
        ],
        "correctOptionIndex": 1,
        "explanation": "Secondary storage includes devices such as hard drives, flash drives, and CD-ROMs used to store data processed by the computer. Primary storage is limited to RAM and ROM, while cache and register storage are internal CPU components, making the other choices incorrect."
      },
      {
        "id": "c3_q32",
        "questionText": "Which of the following is an example of a secondary storage device?",
        "options": [
          "Random Access Memory is an example of a secondary storage device.",
          "Read-Only Memory is an example of a secondary storage device.",
          "An external hard drive is an example of a secondary storage device.",
          "The CPU cache is an example of a secondary storage device."
        ],
        "correctOptionIndex": 2,
        "explanation": "An external hard drive is a secondary storage device used for additional or backup storage. RAM and ROM are primary storage, and CPU cache is an internal processor component, making the other choices incorrect."
      },
      {
        "id": "c3_q33",
        "questionText": "What is the primary characteristic of Read-Only Memory (ROM) in a computer system?",
        "options": [
          "ROM is volatile and loses its data when the power is turned off.",
          "ROM is non-volatile and its contents generally cannot be altered.",
          "ROM is used for temporary storage of actively running programs.",
          "ROM is used to connect external peripheral devices to the system."
        ],
        "correctOptionIndex": 1,
        "explanation": "ROM is a non-volatile memory chip whose contents cannot be altered, often used to store startup routines like the BIOS. RAM is volatile and used for active programs, while ports connect peripherals, making the other choices incorrect."
      },
      {
        "id": "c3_q34",
        "questionText": "What is the primary characteristic of Random Access Memory (RAM) in a computer system?",
        "options": [
          "RAM is non-volatile and permanently stores data for future use.",
          "RAM is used to connect external peripheral devices to the system.",
          "RAM is volatile and loses its data when the power is turned off.",
          "RAM permanently stores the basic input/output system routines."
        ],
        "correctOptionIndex": 2,
        "explanation": "RAM is a volatile storage medium, meaning all stored data is erased when power is lost. It is used for temporary storage of active programs, not permanent storage or peripheral connection, making the other choices incorrect."
      },
      {
        "id": "c3_q35",
        "questionText": "Which of the following storage devices is classified as secondary storage?",
        "options": [
          "A processor register is classified as secondary storage.",
          "A RAM module is classified as secondary storage.",
          "A ROM chip is classified as secondary storage.",
          "A CD-ROM is classified as secondary storage."
        ],
        "correctOptionIndex": 3,
        "explanation": "A CD-ROM is an optical secondary storage device. Processor registers, RAM modules, and ROM chips are all considered primary storage or internal components, making them incorrect choices for secondary storage."
      },
      {
        "id": "c3_q36",
        "questionText": "Which of the following is considered a type of secondary storage device?",
        "options": [
          "A memory card is considered a type of secondary storage device.",
          "A CPU register is considered a type of secondary storage device.",
          "A RAM stick is considered a type of secondary storage device.",
          "A BIOS chip is considered a type of secondary storage device."
        ],
        "correctOptionIndex": 0,
        "explanation": "A memory card is a type of flash storage used in digital cameras and other devices, classified as secondary storage. CPU registers, RAM sticks, and BIOS chips are primary storage or internal components, making them incorrect choices."
      },
      {
        "id": "c3_q37",
        "questionText": "What does the term \"bit\" represent in the context of computer data?",
        "options": [
          "A bit represents a single binary digit, which is either a 0 or a 1.",
          "A bit represents a group of eight binary digits used for characters.",
          "A bit represents a single alphanumeric character in memory.",
          "A bit represents a standard unit of data storage capacity."
        ],
        "correctOptionIndex": 0,
        "explanation": "A bit (binary digit) refers to the smallest unit of information that can be stored in a machine, representing an on or off state (1 or 0). A group of eight bits is a byte, and a byte represents a character, making the other choices incorrect."
      },
      {
        "id": "c3_q38",
        "questionText": "How many binary digits are contained within a single byte?",
        "options": [
          "A single byte contains four binary digits.",
          "A single byte contains eight binary digits.",
          "A single byte contains sixteen binary digits.",
          "A single byte contains thirty-two binary digits."
        ],
        "correctOptionIndex": 1,
        "explanation": "A byte is the basic unit in computer memory that represents one character, and one byte is composed of exactly eight bits (binary digits). Four bits make a nibble, while sixteen and thirty-two bits represent larger word sizes, making the other choices incorrect."
      },
      {
        "id": "c3_q39",
        "questionText": "How many bits are required to represent a single alphanumeric character in standard computer memory?",
        "options": [
          "One bit is required to represent a single alphanumeric character.",
          "Four bits are required to represent a single alphanumeric character.",
          "Eight bits are required to represent a single alphanumeric character.",
          "Sixteen bits are required to represent a single alphanumeric character."
        ],
        "correctOptionIndex": 2,
        "explanation": "A byte is the basic unit in computer memory that represents only one character, and one byte is composed of eight bits. Therefore, eight bits are required to represent a single character. The other bit counts do not represent a standard single character byte."
      },
      {
        "id": "c3_q40",
        "questionText": "What is the decimal value of the binary number 01100001, which represents a specific lowercase letter?",
        "options": [
          "The binary number 01100001 represents the decimal value 77.",
          "The binary number 01100001 represents the decimal value 99.",
          "The binary number 01100001 represents the decimal value 97.",
          "The binary number 01100001 represents the decimal value 65."
        ],
        "correctOptionIndex": 2,
        "explanation": "The binary number 01100001 equals 97 in decimal (64 + 32 + 1). This is the ASCII code for the lowercase letter 'a'. The decimal values 77 and 99 correspond to other letters like 'M' and 'c', making the other choices incorrect."
      },
      {
        "id": "c3_q41",
        "questionText": "What is the hexadecimal equivalent of the binary number 0110?",
        "options": [
          "The binary number 0110 is equivalent to the hexadecimal digit 3.",
          "The binary number 0110 is equivalent to the hexadecimal digit 4.",
          "The binary number 0110 is equivalent to the hexadecimal digit 5.",
          "The binary number 0110 is equivalent to the hexadecimal digit 6."
        ],
        "correctOptionIndex": 3,
        "explanation": "According to the binary to hexadecimal conversion table, the binary sequence 0110 equals the hexadecimal digit 6. The hexadecimal digits 3, 4, and 5 correspond to the binary sequences 0011, 0100, and 0101, respectively."
      },
      {
        "id": "c3_q42",
        "questionText": "What is the hexadecimal equivalent of the binary number 0011?",
        "options": [
          "The binary number 0011 is equivalent to the hexadecimal digit 1.",
          "The binary number 0011 is equivalent to the hexadecimal digit 2.",
          "The binary number 0011 is equivalent to the hexadecimal digit 3.",
          "The binary number 0011 is equivalent to the hexadecimal digit 4."
        ],
        "correctOptionIndex": 2,
        "explanation": "According to the binary to hexadecimal conversion table, the binary sequence 0011 equals the hexadecimal digit 3. The hexadecimal digits 1, 2, and 4 correspond to the binary sequences 0001, 0010, and 0100, respectively."
      },
      {
        "id": "c3_q43",
        "questionText": "Which storage device is described as a non-volatile magnetic storage device capable of storing vast amounts of data?",
        "options": [
          "A solid-state drive is a non-volatile magnetic storage device.",
          "A USB flash drive is a non-volatile magnetic storage device.",
          "An optical disc is a non-volatile magnetic storage device.",
          "A hard disk drive is a non-volatile magnetic storage device."
        ],
        "correctOptionIndex": 3,
        "explanation": "Hard Disk Drives (HDD) are non-volatile magnetic storage devices capable of storing vast amounts of data. Solid-state drives and USB flash drives use flash memory, and optical discs use lasers, making them incorrect choices for magnetic storage."
      },
      {
        "id": "c3_q44",
        "questionText": "Which storage device uses flash memories and transistors, giving it the advantage of having no mechanical moving parts?",
        "options": [
          "A hard disk drive uses flash memories and transistors without moving parts.",
          "A solid-state drive uses flash memories and transistors without moving parts.",
          "An optical disc drive uses flash memories and transistors without moving parts.",
          "A magnetic tape drive uses flash memories and transistors without moving parts."
        ],
        "correctOptionIndex": 1,
        "explanation": "Solid State Drives (SSD) use flash memories (millions of transistors), giving them the advantage of having no mechanical moving parts and therefore immediate access to the data. Hard drives and tape drives use magnetic media, and optical drives use lasers, making the other choices incorrect."
      },
      {
        "id": "c3_q45",
        "questionText": "Which storage device uses an electromagnet to charge the disk's surface with either a positive or negative charge?",
        "options": [
          "A hard disk drive uses an electromagnet to charge the disk's surface.",
          "A solid-state drive uses an electromagnet to charge the disk's surface.",
          "A CD-ROM drive uses an electromagnet to charge the disk's surface.",
          "A Blu-Ray drive uses an electromagnet to charge the disk's surface."
        ],
        "correctOptionIndex": 0,
        "explanation": "In a Hard Disk Drive (HDD), an electromagnet in the read/write head charges the disk's surface with either a positive or negative charge, representing binary data. Solid-state drives use transistors, and optical drives use lasers, making the other choices incorrect."
      },
      {
        "id": "c3_q46",
        "questionText": "How is binary data physically stored and read on optical media such as CDs, DVDs, and Blu-Ray discs?",
        "options": [
          "Optical media store data using magnetic charges on a spinning platter.",
          "Optical media store data using flash memory transistors.",
          "Optical media store data as changes to the texture of the disc's surface.",
          "Optical media store data using electrical charges in RAM."
        ],
        "correctOptionIndex": 2,
        "explanation": "On optical media, binary data is stored as changes to the texture of the disc's surface, located as a continuous track with a laser that is pointed on these tracks to read whether a 0 or 1 is present. Magnetic charges and flash memory apply to other storage types."
      },
      {
        "id": "c3_q47",
        "questionText": "What is the maximum storage capacity of a standard Compact Disc (CD)?",
        "options": [
          "A standard Compact Disc has a maximum capacity of 700 MB.",
          "A standard Compact Disc has a maximum capacity of 4-7 GB.",
          "A standard Compact Disc has a maximum capacity of 25 GB.",
          "A standard Compact Disc has a maximum capacity of 128 GB."
        ],
        "correctOptionIndex": 0,
        "explanation": "According to standard optical media capacities, a CD holds up to 700 MB of data. The capacities of 4-7 GB and 25-128 GB correspond to DVDs and Blu-Ray discs, respectively, making the other choices incorrect."
      },
      {
        "id": "c3_q48",
        "questionText": "What is the typical storage capacity range of a standard Digital Versatile Disc (DVD)?",
        "options": [
          "A standard DVD has a typical capacity range of 700 MB.",
          "A standard DVD has a typical capacity range of 4-7 GB.",
          "A standard DVD has a typical capacity range of 25-128 GB.",
          "A standard DVD has a typical capacity range of 1-2 TB."
        ],
        "correctOptionIndex": 1,
        "explanation": "According to standard optical media capacities, a DVD holds between 4-7 GB of data. The capacities of 700 MB and 25-128 GB correspond to CDs and Blu-Ray discs, respectively, making the other choices incorrect."
      },
      {
        "id": "c3_q49",
        "questionText": "What is the typical storage capacity range of a standard Blu-Ray disc?",
        "options": [
          "A standard Blu-Ray disc has a typical capacity range of 700 MB.",
          "A standard Blu-Ray disc has a typical capacity range of 4-7 GB.",
          "A standard Blu-Ray disc has a typical capacity range of 25-128 GB.",
          "A standard Blu-Ray disc has a typical capacity range of 1-2 TB."
        ],
        "correctOptionIndex": 2,
        "explanation": "According to standard optical media capacities, a Blu-Ray disc holds between 25 GB and 128 GB of data. The capacities of 700 MB and 4-7 GB correspond to CDs and DVDs, respectively, making the other choices incorrect."
      },
      {
        "id": "c3_q50",
        "questionText": "Which of the following is considered a non-volatile solid-state storage device?",
        "options": [
          "A USB flash drive is a non-volatile solid-state storage device.",
          "A random access memory module is a non-volatile solid-state storage device.",
          "A central processing unit register is a non-volatile solid-state storage device.",
          "A dynamic random access memory chip is a non-volatile solid-state storage device."
        ],
        "correctOptionIndex": 0,
        "explanation": "USB flash memory drives are non-volatile solid-state storage devices that use flash memories to store data. RAM modules, CPU registers, and DRAM chips are all volatile and lose their data when power is removed, making them incorrect choices."
      },
      {
        "id": "c3_q51",
        "questionText": "Which of the following is a primary function of secondary storage in a computer system?",
        "options": [
          "Secondary storage executes mathematical calculations for the processor.",
          "Secondary storage holds data and programs actively in use by the CPU.",
          "Secondary storage stores data permanently for future retrieval.",
          "Secondary storage connects peripheral devices to the motherboard."
        ],
        "correctOptionIndex": 2,
        "explanation": "Secondary storage serves as the long-term storage memory of the computer, storing data permanently for future use. Executing calculations is the CPU's role, holding active data is RAM's role, and connecting peripherals is the motherboard's role, making the other choices incorrect."
      },
      {
        "id": "c3_q52",
        "questionText": "Which of the following devices is responsible for transferring digital data onto paper?",
        "options": [
          "A scanner is responsible for transferring digital data onto paper.",
          "A printer is responsible for transferring digital data onto paper.",
          "A monitor is responsible for transferring digital data onto paper.",
          "A speaker is responsible for transferring digital data onto paper."
        ],
        "correctOptionIndex": 1,
        "explanation": "A printer is an output device that can transfer digital data onto paper. A scanner converts paper to digital data, a monitor displays visual information, and a speaker outputs sound, making the other choices incorrect."
      },
      {
        "id": "c3_q53",
        "questionText": "Which of the following devices is responsible for converting the contents of a paper document into a digital image?",
        "options": [
          "A scanner is responsible for converting paper documents into digital images.",
          "A printer is responsible for converting paper documents into digital images.",
          "A monitor is responsible for converting paper documents into digital images.",
          "A speaker is responsible for converting paper documents into digital images."
        ],
        "correctOptionIndex": 0,
        "explanation": "A scanner is an input device that can convert the contents of a paper document into a digital image that can be stored in the computer. A printer does the reverse, and monitors and speakers are output devices, making the other choices incorrect."
      },
      {
        "id": "c3_q54",
        "questionText": "Which of the following devices allows a user to interact with visual objects displayed on the monitor?",
        "options": [
          "A keyboard allows a user to interact with visual objects on the monitor.",
          "A mouse allows a user to interact with visual objects on the monitor.",
          "A printer allows a user to interact with visual objects on the monitor.",
          "A scanner allows a user to interact with visual objects on the monitor."
        ],
        "correctOptionIndex": 1,
        "explanation": "A mouse is an input device that allows the user to interact with visual objects displayed on the monitor. Keyboards are for typing text, while printers and scanners are output and input devices for paper documents, respectively, making them incorrect."
      },
      {
        "id": "c3_q55",
        "questionText": "Which component of a computer system is responsible for providing the connection points for peripheral devices?",
        "options": [
          "The central processing unit provides the connection points for peripherals.",
          "The random access memory provides the connection points for peripherals.",
          "The ports on the motherboard provide the connection points for peripherals.",
          "The hard disk drive provides the connection points for peripherals."
        ],
        "correctOptionIndex": 2,
        "explanation": "Ports are connectors located on the system case that you use to plug peripheral devices into the computer. The CPU, RAM, and hard drive perform processing, temporary storage, and permanent storage functions, respectively, making the other choices incorrect."
      }
    ]
  }
];
