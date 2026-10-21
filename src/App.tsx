import { useEffect, useState } from 'react'
import {
  Atom,
  BookOpen,
  Brain,
  BriefcaseMedical,
  Brush,
  ChefHat,
  Clapperboard,
  Cpu,
  CpuAi,
  EighthNotes,
  Gamepad2,
  Menu,
  PawPrint,
  Shirt,
  Sigma,
  X,
  type LucideIcon,
} from 'lucide-react'
import { GitHubIcon, KaggleIcon, LinkedInIcon } from './brandIcons'
import profileImage from './assets/profile-photo.jpeg'
import './App.css'

type Language = 'pl' | 'en'
type Theme = 'dark' | 'light'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" className="theme-icon" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" className="theme-icon" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
)

const navigation = {
  pl: [
    { label: 'O mnie', href: '#about' },
    { label: 'Doświadczenie', href: '#experience' },
    { label: 'Umiejętności', href: '#skills' },
    { label: 'Projekty', href: '#projects' },
    { label: 'Zainteresowania', href: '#interests' },
    { label: 'Kontakt', href: '#contact' },
  ],
  en: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Interests', href: '#interests' },
    { label: 'Contact', href: '#contact' },
  ],
} as const

const contactLinks = [
  { label: 'LinkedIn', icon: LinkedInIcon, value: 'linkedin.com/in/zuzux3/', href: 'https://www.linkedin.com/in/zuzux3/' },
  { label: 'GitHub', icon: GitHubIcon, value: 'github.com/zuzux3', href: 'https://github.com/zuzux3' },
  { label: 'Kaggle', icon: KaggleIcon, value: 'kaggle.com/zuzannatarazewicz', href: 'https://www.kaggle.com/zuzannatarazewicz' },
]

const contactRecipient = 'your-email@example.com'

const emptyForm = {
  name: '',
  email: '',
  message: '',
  role: '',
  company: '',
}

const skills = [
  'Python',
  'Matlab',
  'Machine Learning',
  'Deep Learning',
  'Computer Vision',
  'NLP',
  'LLM',
  'TensorFlow',
  'PyTorch',
  'Scikit-learn',
  'Langchain',
  'Data Analysis',
  'Pandas',
  'SQL',
  'MLOps',
  'C/C++',
  'JVM',
  'JavaScript',
  'Experiment tracking',
  'Docker',
  'Linux',
  'Microsoft Windows',
  'MacOS',
  'Bash',
]

const interests: Array<{ icon: LucideIcon; title: Record<Language, string>; text: Record<Language, string> }> = [
  { icon: Cpu, title: { pl: 'Technologia', en: 'Technology' }, text: { pl: 'Interesuje mnie to, co na bieżąco rozwija się w świecie technologii.', en: 'I am interested in how technology evolves over time.' } },
  { icon: Atom, title: { pl: 'Fizyka', en: 'Physics' }, text: { pl: 'Lubię pogłębiać wiedzę z dziedziny fizyki, ponieważ cenię sobie zrozumienie zasad działania świata.', en: 'I enjoy exploring the principles of physics and understanding how the world works.' } },
  { icon: BriefcaseMedical, title: { pl: 'Medycyna', en: 'Medicine' }, text: { pl: 'Jestem zainteresowana rozwijaniem wiedzy w dziedzinie medycyny, szczególnie w kontekście wsparcia pracowników ochrony zdrowia w celu redukowania wypalenia zawodowego wśród medyków i przyspieszenia diagnostyki.', en: 'I am interested in developing knowledge in the field of medicine, particularly in the context of supporting healthcare workers to reduce occupational burnout among physicians and accelerate diagnosis.' } },
  { icon: Sigma, title: { pl: 'Matematyka', en: 'Mathematics' }, text: { pl: 'Lubię rozwiązywać zagadnienia matematyczne i cenię sobie logiczne myślenie.', en: 'I enjoy solving mathematical problems and value logical thinking.' } },
  { icon: CpuAi, title: { pl: 'Sztuczna inteligencja', en: 'Artificial Intelligence'}, text: { pl: 'Sztuczna inteligencja to obszar, który mnie fascynuje i w którym chcę się rozwijać.', en: 'Artificial intelligence is an area that fascinates me and in which I want to develop.' } },
  { icon: Brush, title: { pl: 'Sztuka', en: 'Art' }, text: { pl: 'Cenię sobie sztukę i lubię odwiedzać galerie sztuki, aby poszerzać swoje horyzonty i inspirować się twórczością artystów. Moimi ulubionymi nurtami w sztuce są surrealizm i ekspresjonizm.', en: 'I value art and enjoy visiting art galleries to broaden my horizons and be inspired by the creativity of artists. My favorite movements in art are surrealism and expressionism.' } },
  { icon: BookOpen, title: { pl: 'Książki', en: 'Books'}, text: { pl: 'Lubię rozwijać się i relaksować poprzez czytanie książek. Najbardziej lubię książki psychologiczne, medyczne i fantasy. Moje ulubione książki to seria Diuny i trylogia Władcy Pierścieni.', en: 'I like to develop and relax through reading books. I mostly like psychological, medical and fantasy books. My favorite books are the Diuny series and the Lord of the Rings trilogy. ' } },
  { icon: EighthNotes, title: { pl: 'Muzyka', en: 'Music'}, text: { pl: 'W wolnym czasie lubię słuchać muzyki, szczególnie metalowej i elektronicznej, w przeszłości grałam na gitarze, pianinie i doskonaliłam swoje umiejętności wokalne, również w nurcie wokalu ekstremalnego.', en: 'In my free time, I enjoy listening to music, especially metal and electronic music. In the past, I played the guitar and piano and honed my vocal skills, including in the extreme vocal genre.' } },
  { icon: Shirt, title: { pl: 'Robienie na drutach i szydełkowanie', en: 'Knitting and crocheting'}, text: { pl: 'W trakcie skupienia się na pracy lub nauce lubię zająć ręce czymś manualnym, dlatego lubię robić na drutach i szydełkować. Ułatwia mi to skupienie i przyspiesza pracę.', en: 'While focusing on work or study, I like to keep my hands busy with something manual, which is why I enjoy knitting and crocheting. It helps me concentrate and speeds up my work.' } }, 
  { icon: Clapperboard, title: { pl: 'Kino', en: 'Cinema'}, text: { pl: 'Wraz ze znajomymi lubię oglądać filmy, od wielkich, masowych produkcji, po filmy mmniejszych i niezależnych twórców.', en: 'I like to watch movies with friends, from big, mass-produced films to smaller, independent productions.'} },
  { icon: PawPrint, title: { pl: 'Behawioryzm zwierzęcy', en: 'Animal behaviorism'}, text: { pl: 'Interesuję się behawioryzmem zwierzęcym i lubię obserwować zachowania zwierząt, które wykazują ich stan emocjonalny. Poza tym lubię pracować ze zwierzętami domowymi i pomagać im w nauce nowych zachowań i panowania nad emocjami.', en: 'I am interested in animal behaviorism and enjoy observing the behaviors of animals that reflect their emotional state. Additionally, I enjoy working with domestic animals and helping them learn new behaviors and manage their emotions.'} },
  { icon: Gamepad2, title: { pl: 'Gry Komputerowe', en: 'Computer Games'}, text: { pl: 'W wolnych chwilach lubię grać w gry komputerowe i doceniam je jako formę relaksu i rozrywki. Najwięcej gram w gry RPG, MOBA i symulatory.', en: 'I like to play computer games in my free time and value them as a form of relaxation and entertainment. I mostly play RPG, MOBA, and simulation games.'} },
  { icon: ChefHat, title: { pl: 'Gotowanie', en: 'Cooking'}, text: {pl: 'Lubię przyrządzać przeróżne potrawy i analizować jakie składniki stworzą wspólną całość. Moją ulubioną kuchnią jest kuchnia włoska.', en: 'I enjoy prepare different dishes and analyze how different ingredients come together to form a cohesive whole. My favourite cuisine is italian.'}},
  { icon: Brain, title: { pl: 'Psychologia i Neuronauka', en: 'Psychology and Neuroscience'}, text: { pl: 'Zgłębiam wiedzę działania ludzkiego mózgu pod kątem działania mózgu jako narządu, jak i sposobu, w jaki różni ludzie myślą. Lubię analizować to co mogło skłonić człowieka do różnych działań, od problemów behawioralnych, po guzy mózgu zmieniające charakter człowieka.', en: 'I delve my knowledge on human\'s brain with a view on the brain as an organ and how different people think. I enjoy analysing what could prompt a person to a certain actions, from behavioral problems to brain tumors altering person\'s character.' }}
]

const certificates: Array<{
  title: Record<Language, string>
  issuer: string
  date: Record<Language, string>
  href?: string
  skills: Record<Language, string>
}> = [
  {
    title: { pl: 'Wprowadzenie do infrastruktury chmurowej', en: 'Introduction to Cloud Infrastructure' },
    issuer: 'Microsoft',
    date: { pl: 'Wrzesień 2026', en: 'September 2026' }, 
    href: 'https://learn.microsoft.com/api/achievements/share/pl-pl/ZuzannaTarazewicz-8182/NQC9W59F?sharingId=D3D8782B46AC3EAA',
    skills: {
      pl: 'Chmura Azure, Infrastruktura Chmurowa, Podstawy Zarządzania chmurą',
      en: 'Azure Cloud, Cloud Infrastracture, Basics of Cloud Management',
    },
  },
  {
    title: { pl: 'Strukturyzowanie Projektów Uczenia Maszynowego', en: 'Structuring Machine Learning Projects' },
    issuer: 'DeepLearning.AI',
    date: { pl: 'Czerwiec 2024', en: 'June 2024' },
    href: 'https://www.coursera.org/account/accomplishments/certificate/G8XR3RWEKYRU',
    skills: {
      pl: 'Uczenie Maszynowe, Uczenie Głębokie, Rozwiązywanie Problemów, Sieci Neuronowe, PyTorch',
      en: 'Machine learning, Deep Learning, Problem Solving, Neural Networks, PyTorch',
    },
  },
  {
    title: { pl: 'Ulepszanie Głębokich Sieci Neuronowych: Strojenie Hiperparametrów, Regularyzacja, Optymizacja', en: 'Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization' },
    issuer: 'DeepLearning.AI',
    date: { pl: 'Maj 2024', en: 'May 2024' }, 
    href: 'https://www.coursera.org/account/accomplishments/certificate/HU4L6LMQ7LUM',
    skills: {
      pl: 'Sieci neuronowe, Uczenie Maszynowe, Uczenie Głębokie, PyTorch',
      en: 'Neural networks, Machine Learning, Deep Learning, PyTorch',
    },
  },
  {
    title: { pl: 'Sieci Neuronowe i Uczenie Głębokie', en: 'Neural Networks & Deep Learning' },
    issuer: 'DeepLearning.AI',
    date: { pl: 'Maj 2024', en: 'May 2024' },
    href: 'https://www.linkedin.com/in/zuzux3/overlay/Certifications/1853363000/treasury/?profileId=ACoAACla_zQBvlsdpbmIDRHKtAPa9vNpfna-jMU',
    skills: {
      pl: 'Uczenie Maszynowe, Uczenie Głębokie, Sieci Neuronowe, PyTorch',
      en: 'Machine Learning, Deep Learning, Neural Networks, PyTorch',
    },
  },
  {
    title: { pl: 'Uczenie Głębokie z PyTorchem: Lokalizacja Obiektów', en: 'Deep Learning with PyTorch: Object Localization' },
    issuer: 'Coursera',
    date: { pl: 'Listopad 2023', en: 'November 2023' },
    href: 'https://www.coursera.org/account/accomplishments/verify/XMHDC3CTE55F',
    skills: {
      pl: 'Uczenie Maszynowe, Uczenie Głębokie, Sieci Neuronowe, PyTorch, Lokalizacja Obiektów, Wizja komputerowa',
      en: 'Machine Learning, Deep Learning, Neural Networks, PyTorch, Object Localization, Computer Vision',
    },
  },
  {
    title: {pl: "Wstęp do Generatywnego AI", en: 'Introduction to Generative AI'},
    issuer: 'Google Cloud',
    date: {pl: 'Październik 2023', en: 'October 2023'},
    href: 'https://www.coursera.org/account/accomplishments/verify/XVV77W99HCW6',
    skills: {
      pl: 'Uczenie Maszynowe, Uczenie Głębokie, Generatywne AI',
      en: 'Machine Learning, Deep Learning, Generative AI',
    },
  },
  {
    title: { pl: 'Międzynarodowe Organizacje Dyktujące Ramy Regulacji Finansowych', en: 'International Organizations Dictating the Financial Regulatory Framework' },
    issuer: 'Coinfirm Academy / Lukka Academy',
    date: { pl: 'Luty 2023', en: 'February 2023' },
    href: 'https://academy.coinfirm.com/certificates/8wgidkyc6u',
    skills: {
      pl: 'Kryptowaluty, AML/KYC, Blockchain, Analiza Danych, Analiza Rynku',
      en: 'Cryptocurrencies, AML/KYC, Blockchain, Data Analysis, Market Analysis',
    },
  },
  {
    title: { pl: 'Przestępstwa typowe dla Krypto', en: 'Crypto Specific Crimes' },
    issuer: 'Coinfirm Academy / Lukka Academy',
    date: { pl: 'Luty 2023', en: 'February 2023' },
    href: 'https://academy.coinfirm.com/certificates/x6w6sade1u',
    skills: {
      pl: 'Kryptowaluty, AML/KYC, Blockchain, Analiza Danych',
      en: 'Cryptocurrencies, AML/KYC, Blockchain, Data Analysis',
    },
  },
  {
    title: { pl: 'Gracze Rynku Krypto', en: 'Crypto Market Players' },
    issuer: 'Coinfirm Academy / Lukka Academy',
    date: { pl: 'Luty 2023', en: 'February 2023'},
    href: 'https://academy.coinfirm.com/certificates/buqukomcs6',
    skills: {
      pl: 'Kryptowaluty, AML/KYC, Giełda, Blockchain, Analiza Danych',
      en: 'Cryptocurrencies, AML/KYC, Stock Market, Blockchain, Data Analysis',
    },
  },
  {
    title: { pl: 'Podstawy Aktywów Blockchain i Krypto', en: 'Blockchain and Crypto Assets Foundations' },
    issuer: 'Coinfirm Academy / Lukka Academy',
    date: { pl: 'Luty 2023', en: 'February 2023' },
    href: 'https://academy.coinfirm.com/certificates/ai9y4cegj9',
    skills: {
      pl: 'Kryptowaluty, AML/KYC, Blockchain, Analiza Danych',
      en: 'Cryptocurrencies, AML/KYC, Blockchain, Data Analysis',
    },
  },
  {
    title: { pl: 'Sankcje i terroryzm w krypto', en: 'Sanctions and Terrorism in Crypto' },
    issuer: 'Coinfirm Academy / Lukka Academy',
    date: { pl: 'Styczeń 2023', en: 'January 2023'},
    href: 'https://academy.coinfirm.com/certificates/sgcvr4khlu',
    skills: {
      pl: 'Kryptowaluty, AML/KYC, Sankcje, Terroryzm, Blockchain, Analiza Danych',
      en: 'Cryptocurrencies, AML/KYC, Sanctions, Terrorism, Blockchain, Data Analysis',
    },
  },
]

const experiences = [
  {
    company: { pl: 'Nokia Solutions & Networks', en: 'Nokia Solutions & Networks' },
    location: { pl: 'Bydgoszcz, Polska', en: 'Bydgoszcz, Poland' },
    workMode: { pl: 'hybrydowo', en: 'hybrid' },
    roles: [
      {
        role: { pl: 'Inżynier Oprogramowania II', en: 'Software Engineer II' },
        period: { pl: 'Luty 2026 – Listopad 2026', en: 'February 2026 – November 2026' },
        tags: ['C', 'C++', 'Docker', 'Embedded', 'Linux', 'Computer Networks', 'AI'],
        description: {
          pl: 'Główne zadanie: Migracja starszej bazy kodu C/C++ SBC z architektury 32-bitowej na 64-bitową w kontenerach Docker, optymalizacja pamięci w celu spełnienia krytycznych wymagań skalowalności klienta.',
          en: 'Main task: Migration of a legacy C/C++ SBC codebase from 32-bit to 64-bit architecture within Docker containers, memory bottlenecks to meet critical client scalability requirements.',
        },
      },
    ],
  },
  {
    company: { pl: 'Cadence Design Systems', en: 'Cadence Design Systems' },
    location: { pl: 'Cork, Irlandia', en: 'Cork, Ireland' },
    workMode: { pl: 'stacjonarnie', en: 'onsite' },
    roles: [
      {
        role: { pl: 'Stażysta Inżynierii Oprogramowania', en: 'Software Engineering Intern' },
        period: { pl: 'Marzec 2025 – Sierpień 2025', en: 'March 2025 – August 2025' },
        tags: ['Python', 'AI', 'Data', 'Automation', 'C++', 'Qt Framework', 'Cadence SKILL'],
        description: {
          pl: 'Główne zadanie: Rozwój funkcjonalności aplikacji AWR i Virtuoso.',
          en: 'Main task: Development of functionality for AWR and Virtuoso applications.',
        },
      },
    ],
  },
  {
    company: { pl: 'Lukka Poland', en: 'Lukka Poland' },
    location: { pl: 'Toruń, Polska', en: 'Toruń, Poland' },
    workMode: { pl: 'hybrydowo', en: 'hybrid' },
    roles: [
      {
        role: { pl: 'Data Product Specialist', en: 'Data Product Specialist' },
        period: { pl: 'Styczeń 2024 - Maj 2024', en: 'January 2024 - May 2024' },
        tags: ['Python', 'BigData', 'ML', 'Microsoft Excel', 'Data Analysis', 'Data Visualization', 'Blockchain', 'AML/KYC'],
        description: {
          pl: 'Główne zadanie: Analiza danych, przygotowywanie raportów i automatyzacja procesu zbierania danych w celu wsparcia zespołu produktowego.',
          en: 'Main task: Analysis of data, preparation of reports and automation of data collection process to support the product team.',
        },
      },
      {
        role: { pl: 'Młodszy Analityk Danych', en: 'Junior Data Analyst' },
        period: { pl: 'Maj 2022 - Grudzień 2023', en: 'May 2022 - December 2023' },
        tags: ['Python', 'BigData', 'ML', 'Microsoft Excel', 'Data Analysis', 'Data Visualization', 'Blockchain', 'AML/KYC'],
        description: {
          pl: 'Główne zadanie: Analiza danych, przygotowywanie raportów i automatyzacja procesu zbierania danych w celu wsparcia zespołu produktowego.',
          en: 'Main task: Analysis of data, preparation of reports and automation of data collection process to support the product team.',
        },
      },
    ],
  },
]

const projects: Array<{
  title: Record<Language, string>
  href: string
  stack: string[]
  description: Record<Language, string>
}> = [
  {
    title: {
      pl: 'Analiza MRI mózgu w celu wykrywania zmian',
      en: 'Brain MRI analysis to detect lesions',
    },
    href: 'https://github.com/zuzux3/brain-mri-analysis-to-detect-lesions',
    stack: ['Python3', 'PyTorch', 'Torchvision', 'Gradio', 'OpenCV', 'YOLOv8', 'ResNet', 'VGG'],
    description: {
      pl: 'Praca inżynierska: Opracowanie modelu głębokiego uczenia do klasyfikacji i wykrywania guzów mózgu na podstawie obrazów MRI. Model wykrywa trzy najpopularniejsze guzy mózgu: glejaka, oponiaka i guza przysadki mózgowej. W pracy wykorzystano sieci splotowe, w tym ResNet i VGG, a do detekcji został użyty model YOLOv8.',
      en: 'Bachelor\'s thesis: Development of a deep learning model for classification and detection of brain tumors based on MRI images. The model detects the three most common brain tumors: glioma, meningioma, and pituitary tumor. Convolutional neural networks, including ResNet and VGG, were used in the work, and the YOLOv8 model was used for detection.',
    },
  },
  {
    title: {
      pl: 'Predykcja cen akcji giełdowych Bitcoina i Tesli',
      en: 'Stock Price Prediction for Bitcoin and Tesla',
    },
    href: 'https://github.com/zuzux3/Tesla-And-Bitcoin-Stock-Prediction',
    stack: ['Keras', 'LSTM', 'Tensorflow', 'Python3', 'Pandas', 'NumPy', 'Matplotlib'],
    description: {
      pl: 'Praca grupowa w ramach zajęć ze sztucznej inteligencji. Opracowanie modelu rekurencyjnych sieci neuronowych LSTM w celu przewidywania akcji giełdowych Bitcoina i Tesli. Model przeszkolony został na danych historycznych zgodnie z tym, jak trenowane są szeregi czasowe.',
      en: 'Group project as part of artificial intelligence classes. Development of a recurrent neural network LSTM model to predict stock prices for Bitcoin and Tesla. The model was trained on historical data as time series are typically trained.',
    },
  },
  {
    title: {
      pl: 'AI Asystent Specjalista ds. Zespołu Ehlersa-Danlosa typu Hipermobilnego dla Pacjentów i Lekarzy',
      en: 'Ehlers-Danlos Syndrome Hypermobile Type AI Assistant for Patients and Doctors',
    },
    href: 'https://github.com/zuzux3/Hypermobile-Ehlers-Danlos-Syndrome-AI-Assistant',
    stack: ['LLM', 'Hugging Face', 'Llama 3', 'Python3', 'Data Engineering'],
    description: {
      pl: 'Celem projektu było utworzenie fine-tune\'owanego modelu LLM, który wspiera pacjentów i lekarzy w trakcie diagnozy zespołu Ehlersa-Danlosa typu Hipermobilnego. Projekt obejmował zebranie artykułów naukowych, utworzenie bazy wiedzy dla modelu i fine-tune\'owanie modelu LLM w celu uzyskania jak najlepszych wyników w kontekście diagnozy i wsparcia pacjentów.',
      en: 'The goal of the project was to create a fine-tuned LLM model that supports patients and doctors during the diagnosis of the Hypermobile Type Ehlers-Danlos Syndrome. The project involved gathering scientific articles, creating a knowledge base for the model, and fine-tuning the LLM to achieve optimal results in the context of diagnosis and patient support.',
    },
  },
]

const heroStats = {
  pl: [
    { value: '3+', label: 'lata doświadczenia w IT' },
    { value: 'Widzenie komputerowe', label: 'obszar zainteresowania' },
    { value: 'ML', label: 'obszar specjalizacji' },
  ],
  en: [
    { value: '3+', label: 'years in IT' },
    { value: 'Computer Vision', label: 'area of interest' },
    { value: 'ML', label: 'specialization area' },
  ],
} as const

const languageContent = {
  pl: {
    intro: 'Informatyka stosowana • AI & Data',
    heading: 'Inżynier oprogramowania z doświadczeniem w uczeniu maszynowym i analizie danych.',
    summary:
      'Jestem osobą z zainteresowaniem do sztucznej inteligencji, uczenia maszynowego i analityki danych. Moje doświadczenie obejmuje prototypowanie modeli, eksplorację danych, wizualizację wyników oraz pracę nad rozwiązaniami użytecznymi w praktyce, a także szerokopojętą inżynierię oprogramowania.',
    education: 'Informatyka stosowana, specjalizacja: Data Science',
    educationMeta: 'Podczas studiów skupiłam się na rozwijaniu umiejętności w zakresie sztucznej inteligencji i analityki danych, pełniąc jednocześnie funkcję przewodniczącej roku i aktywnie uczestnicząc w organizacjach studenckich. Pomagałam w zarządzaniu komunikacją między studentami a pracownikami wydziału, pomagałam w organizacji wydarzeń oraz planowaniu harmonogramów egzaminów i innych działań akademickich. Moja praca dyplomowa skupiała się na opracowaniu modelu głębokiego uczenia do klasyfikacji i wykrywania guzów mózgu.',
    aboutTitle: 'O mnie',
    aboutText:
      'Inżynier oprogramowania z pasją do sztucznej inteligencji, szukający nowych wyzwań w obszarze inżynierii oprogramowania, uczenia maszynowego i analityki danych. Moje doświadczenie obejmuje nie tylko prototypowanie modeli, eksploracyjną analizę danych i szukania odpowiednich rozwiązań, ale także szerokopojętą inżynierię oprogramowania i praktyczne wdrażanie rozwiązań.',
    interestsTitle: 'Zainteresowania',
    certificatesTitle: 'Certyfikaty',
    experienceTitle: 'Doświadczenie',
    skillsTitle: 'Umiejętności',
    projectsTitle: 'Projekty',
    contactTitle: 'Kontakt',
    contactText: 'Skontaktuj się, jeśli chcesz omówić AI, ML, dane lub projekt technologiczny.',
    viewProjects: 'Zobacz projekty',
    aboutMe: 'O mnie',
    getInTouch: 'Napisz do mnie',
    profileLabel: 'Profil',
    roleLabel: 'Rola',
    educationLabel: 'Edukacja',
    focusLabel: 'Obszar',
    years: 'lata doświadczenia w IT',
    projectsCount: 'projekty',
    focusArea: 'obszar specjalizacji',
    profileName: 'Zuzanna Tarazewicz',
    toggle: 'Język',
  },
  en: {
    intro: 'Applied Computer Science • AI & Data',
    heading: 'Software engineer with experience in machine learning and data analysis.',
    summary:
      'I am a technology-oriented professional with a strong interest in artificial intelligence, machine learning, and data-driven decision making. My work focuses on experimentation, model development, data exploration, and practical problem solving.',
    education: 'Applied Computer Science, specialization: Data Science',
    educationMeta: 'During my studies I focused on developing AI & data science skills, while being class president and actively participating in student organizations. I helped to manage communications between students and faculty employees, helped organize events, and planned exam schedules and other academic activities. My diploma focused on developing a deep learning model for brain tumor classification and detection.',
    aboutTitle: 'About me',
    aboutText:
      'I am a technology-oriented professional with a strong interest in artificial intelligence, machine learning, and data-driven decision making. My work focuses on experimentation, model development, data exploration, and practical problem solving.',
    interestsTitle: 'Interests',
    interestsIntro: 'Areas that inspire me and in which I continue to develop professionally.',
    certificatesTitle: 'Certificates',
    experienceTitle: 'Experience',
    skillsTitle: 'Skills',
    projectsTitle: 'Projects',
    contactTitle: 'Contact',
    contactText: 'Reach out if you want to discuss AI, ML, analytics, or a technical project.',
    viewProjects: 'View projects',
    aboutMe: 'About me',
    getInTouch: 'Get in touch',
    profileLabel: 'Profile',
    roleLabel: 'Role',
    educationLabel: 'Education',
    focusLabel: 'Focus',
    years: 'years in IT',
    projectsCount: 'projects',
    focusArea: 'specialization area',
    profileName: 'Zuzanna Tarazewicz',
    toggle: 'Language',
  },
} as const

function App() {
  const [language, setLanguage] = useState<Language>('pl')
  const [theme, setTheme] = useState<Theme>('dark')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  })
  const t = languageContent[language]

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      const shouldCollapse = window.scrollY > 80
      setIsCollapsed(shouldCollapse)

      if (!shouldCollapse) {
        setIsMenuOpen(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({
        type: 'error',
        message:
          language === 'pl'
            ? 'Uzupełnij imię, e-mail i wiadomość, aby wysłać formularz.'
            : 'Please fill in your name, email, and message before sending the form.',
      })
      return
    }

    setIsSubmitting(true)
    setFormStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactRecipient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          company: formData.company,
          message: formData.message,
          _subject: `Nowa wiadomość ze strony - ${formData.name}`,
          _captcha: 'false',
          _template: 'table',
        }),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setFormStatus({
        type: 'success',
        message:
          language === 'pl'
            ? 'Dziękuję! Twoja wiadomość została wysłana.'
            : 'Thank you! Your message has been sent.',
      })
      setFormData(emptyForm)
    } catch (error) {
      setFormStatus({
        type: 'error',
        message:
          language === 'pl'
            ? 'Nie udało się wysłać wiadomości. Sprawdź adres e-mail w konfiguracji formularza.'
            : 'The message could not be sent. Please check the form email configuration.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`page-shell theme-${theme}`}>
      <header className={`topbar ${isCollapsed ? 'collapsed' : ''} ${isMenuOpen ? 'open' : ''}`}>
        <div className="topbar-left">
          <div className="brand" aria-hidden="true"> </div>

          <div className="lang-switcher" aria-label={t.toggle}>
            <button
              type="button"
              className={language === 'pl' ? 'active' : ''}
              onClick={() => setLanguage('pl')}
            >
              PL
            </button>
            <button
              type="button"
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>

        <nav className="nav" aria-label="Main navigation">
          {navigation[language].map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div
          className="theme-switcher"
          aria-label={language === 'pl' ? 'Przełącznik trybu' : 'Theme switcher'}
        >
          <button
            type="button"
            className={theme === 'dark' ? 'active' : ''}
            onClick={() => setTheme('dark')}
            aria-label={language === 'pl' ? 'Przełącz na ciemny motyw' : 'Switch to dark mode'}
            title={language === 'pl' ? 'Ciemny motyw' : 'Dark mode'}
          >
            <MoonIcon />
          </button>
          <button
            type="button"
            className={theme === 'light' ? 'active' : ''}
            onClick={() => setTheme('light')}
            aria-label={language === 'pl' ? 'Przełącz na jasny motyw' : 'Switch to light mode'}
            title={language === 'pl' ? 'Jasny motyw' : 'Light mode'}
          >
            <SunIcon />
          </button>
        </div>
      </header>

      {isCollapsed && (
        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen((value) => !value)}
          aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      )}

      <main>
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">{t.intro}</p>
            <h1>{t.heading}</h1>
            <p className="lede">{t.summary}</p>

            <div className="hero-actions">
              <a className="button primary" href="#projects">
                {t.viewProjects}
              </a>
              <a className="button secondary" href="#about">
                {t.aboutMe}
              </a>
            </div>

            <ul className="mini-stats" aria-label="Key stats">
              {heroStats[language].map((stat) => (
                <li key={`${stat.value}-${stat.label}`}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="profile-card" aria-label="Profile summary">
            <img className="profile-image" src={profileImage} alt="Zdjęcie profilowe" />
            <div className="profile-headline">
              <span className="label">{t.profileLabel}</span>
              <h2>{t.profileName}</h2>
            </div>

            <ul className="profile-list">
              <li>
                <span>{t.roleLabel}</span>
                <strong>Software Engineer & Data Scientist</strong>
              </li>
              <li>
                <span>{t.educationLabel}</span>
                <strong>{t.education}</strong>
              </li>
              <li>
                <span>{t.focusLabel}</span>
                <strong>Software Engineering, AI, ML, Analytics</strong>
              </li>
            </ul>

            <div className="profile-links" aria-label="Social links">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                >
                  <link.icon className="profile-link-icon" />
                </a>
              ))}
            </div>
          </aside>
        </section>

        <section id="about" className="section split-section">
          <div className="section-heading">
            <p className="section-label">{t.aboutTitle}</p>
            <h2>
              {language === 'pl'
                ? 'Analiza danych, AI i praktyczne rozwiązania.'
                : 'Data analysis, AI, and practical problem solving.'}
            </h2>
          </div>

          <div className="language-panel">
            <p>{t.aboutText}</p>
          </div>
        </section>

        <section id="experience" className="section">
          <p className="section-label">{t.experienceTitle}</p>

          <div className="timeline">
            {experiences.map((companyItem) => (
              <article className="timeline-item" key={companyItem.company[language]}>
                <div className="timeline-marker" aria-hidden="true" />
                <div className="timeline-content">
                  <div className="timeline-company-row">
                    <h3 className="company">{companyItem.company[language]}</h3>
                    <div className="company-meta">
                      <span>{companyItem.location[language]}</span>
                      <span>{companyItem.workMode[language]}</span>
                    </div>
                  </div>

                  {companyItem.roles.map((roleItem) => (
                    <div className="timeline-role" key={`${companyItem.company[language]}-${roleItem.role[language]}`}>
                      <div className="timeline-role-row">
                        <h4>{roleItem.role[language]}</h4>
                        <span>{roleItem.period[language]}</span>
                      </div>
                      <p>{roleItem.description[language]}</p>
                      {roleItem.tags && roleItem.tags.length > 0 && (
                        <div className="timeline-tags" aria-label="Technology tags">
                          {roleItem.tags.map((tag) => (
                            <span key={`${companyItem.company[language]}-${roleItem.role[language]}-${tag}`} className="timeline-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <p className="section-label">{t.skillsTitle}</p>

          <div className="skill-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill}>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <p className="section-label">{t.projectsTitle}</p>

          <div className="project-grid">
            {projects.map((project) => (
              <a
                key={project.title[language]}
                className="project-card"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title[language]} on GitHub`}
              >
                <div className="project-topline">
                  <h3>{project.title[language]}</h3>
                </div>

                <p>{project.description[language]}</p>

                <div className="tag-list">
                  {project.stack.map((stackItem) => (
                    <span key={`${project.title[language]}-${stackItem}`}>{stackItem}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="education" className="section">
          <p className="section-label">{t.educationLabel}</p>

          <div className="education-list">
            <article className="education-item">
              <div>
                <h3>{t.education}</h3>
                <p>{t.educationMeta}</p>
              </div>
              <span>2020 – 2026</span>
            </article>
          </div>
        </section>

        <section id="certificates" className="section">
          <p className="section-label">{t.certificatesTitle}</p>

          <div className="certificates-list">
            {certificates.map((certificate) => (
              <a
                key={`${certificate.title[language]}-${certificate.date[language]}`}
                className="education-item certificate-item"
                href={certificate.href || '#'}
                target={certificate.href ? '_blank' : undefined}
                rel={certificate.href ? 'noreferrer' : undefined}
              >
                <div>
                  <h3>{certificate.title[language]}</h3>
                  <p>{certificate.issuer}</p>
                  <p className="certificate-skills">{certificate.skills[language]}</p>
                </div>
                <span>{certificate.date[language]}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="interests" className="section">
          <p className="section-label">{t.interestsTitle}</p>

          <div className="interest-grid">
            {interests.map((item) => (
              <article className="interest-card" key={item.title[language]}>
                <h3>
                  <item.icon className="interest-icon" aria-hidden="true" />
                  {item.title[language]}
                </h3>
                <p>{item.text[language]}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section cta-panel">
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="section-label">{t.contactTitle}</p>
              <h2>{t.contactText}</h2>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  <span>
                    {language === 'pl' ? 'Imię' : 'Name'}
                    <em className="field-required">
                      {language === 'pl' ? 'obowiązkowe' : 'required'}
                    </em>
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFieldChange}
                    placeholder={language === 'pl' ? 'Twoje imię' : 'Your name'}
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>
                    E-mail
                    <em className="field-required">
                      {language === 'pl' ? 'obowiązkowe' : 'required'}
                    </em>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFieldChange}
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>
                    {language === 'pl' ? 'Rola' : 'Role'}
                    {language === 'pl' ? <em className="field-optional">(opcjonalne)</em> : <em className="field-optional">(optional)</em>}
                  </span>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleFieldChange}
                    placeholder={language === 'pl' ? 'np. Product Manager' : 'e.g. Product Manager'}
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>
                    {language === 'pl' ? 'Firma' : 'Company'}
                    {language === 'pl' ? <em className="field-optional">(opcjonalne)</em> : <em className="field-optional">(optional)</em>}
                  </span>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleFieldChange}
                    placeholder={language === 'pl' ? 'Nazwa firmy' : 'Company name'}
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>
                    {language === 'pl' ? 'Wiadomość' : 'Message'}
                    <em className="field-required">
                      {language === 'pl' ? 'obowiązkowe' : 'required'}
                    </em>
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFieldChange}
                    rows={5}
                    placeholder={language === 'pl' ? 'Napisz, o czym chcesz porozmawiać...' : 'Tell me what you would like to talk about...'}
                  />
                </label>
              </div>

              <button type="submit" className="button primary" disabled={isSubmitting}>
                {isSubmitting
                  ? language === 'pl'
                    ? 'Wysyłanie...'
                    : 'Sending...'
                  : language === 'pl'
                    ? 'Wyślij wiadomość'
                    : 'Send message'}
              </button>

              {formStatus.type !== 'idle' && (
                <p className={`form-status ${formStatus.type}`}>{formStatus.message}</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-links" aria-label="Social links">
          {contactLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
        <p>© developed by Zuzanna Tarazewicz</p>
      </footer>
    </div>
  )
}

export default App
