export type AppLanguage = 'hi' | 'en';

export interface TranslationStrings {
  // App Titles & Meta
  appName: string;
  appSubname: string;
  appTagline: string;
  missionBadge: string;
  offlineBadge: string;
  versionBadge: string;
  welcomeButton: string;

  // Welcome Screen
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeIntroText: string;
  welcomeLangHeading: string;
  welcomeLangSubheading: string;
  langHindiTitle: string;
  langHindiDesc: string;
  langHindiBadge: string;
  langEnglishTitle: string;
  langEnglishDesc: string;
  langEnglishBadge: string;
  roleHeading: string;
  roleSubheading: string;
  roleTeacherTitle: string;
  roleTeacherDesc: string;
  roleStudentTitle: string;
  roleStudentDesc: string;
  roleAllTitle: string;
  roleAllDesc: string;
  targetLangHeading: string;
  enterAppButton: string;
  welcomeFeature1Title: string;
  welcomeFeature1Desc: string;
  welcomeFeature2Title: string;
  welcomeFeature2Desc: string;
  welcomeFeature3Title: string;
  welcomeFeature3Desc: string;
  
  // Navbar & Controls
  languageLabel: string;
  interfaceLabel: string;
  appLangToggleLabel: string;
  speakerTestBtn: string;
  speakerTesting: string;
  offlineMode: string;
  onlineMode: string;
  ramLabel: string;
  themeLabel: string;

  // Roles
  roleTeacher: string;
  roleStudent: string;
  roleAll: string;
  roleActiveBadge: string;
  roleClickToActivate: string;

  // Tabs
  tabHome: string;
  tabV2V: string;
  tabWorksheet: string;
  tabCustomLesson: string;
  tabText: string;
  tabCert: string;
  tabMesh: string;
  tabDatasets: string;
  tabDiagnostics: string;
  tabSlate: string;
  tabGame: string;
  tabCamera: string;
  tabFolktale: string;
  tabFlashcards: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroQuickVoice: string;
  heroQuickSlate: string;
  heroQuickGame: string;
  heroQuickCamera: string;
  heroQuickFolktale: string;
  heroActiveLang: string;
  heroInteractiveFeatures: string;
  heroTeacherCardTitle: string;
  heroTeacherCardSubtitle: string;
  heroTeacherCardDesc: string;
  heroTeacherCardCta: string;
  heroStudentCardTitle: string;
  heroStudentCardSubtitle: string;
  heroStudentCardDesc: string;
  heroStudentCardCta: string;
  heroMasterViewBtn: string;
  heroDirectoryTitleTeacher: string;
  heroDirectoryTitleStudent: string;
  heroDirectoryTitleAll: string;
  heroDirectorySubtitle: string;
  cardOpenBtn: string;

  // Feature Card Titles & Descriptions
  featV2VTitle: string;
  featV2VDesc: string;
  featSlateTitle: string;
  featSlateDesc: string;
  featGameTitle: string;
  featGameDesc: string;
  featCameraTitle: string;
  featCameraDesc: string;
  featFolktaleTitle: string;
  featFolktaleDesc: string;
  featWorksheetTitle: string;
  featWorksheetDesc: string;
  featCustomLessonTitle: string;
  featCustomLessonDesc: string;
  featFlashcardsTitle: string;
  featFlashcardsDesc: string;
  featCertTitle: string;
  featCertDesc: string;
  featMeshTitle: string;
  featMeshDesc: string;
  featDatasetsTitle: string;
  featDatasetsDesc: string;
  featTextTitle: string;
  featTextDesc: string;

  // Footer
  footerMission: string;
  footerSanthali: string;
  footerHo: string;
  footerMundari: string;
  footerOfflineNote: string;
  footerVersion: string;
}

export const translations: Record<AppLanguage, TranslationStrings> = {
  hi: {
    // App Titles & Meta
    appName: 'पलाश वाणी',
    appSubname: '(PALASH Vani)',
    appTagline: 'प्राथमिक शिक्षक AI सहायक | संथाली • हो • मुंडारी',
    missionBadge: 'झारखण्ड PALASH MTB-MLE',
    offlineBadge: '100% ऑफ़लाइन टैबलेट रेडी',
    versionBadge: 'v2.0 अपडेटेड',
    welcomeButton: 'परिचय / Welcome',

    // Welcome Screen
    welcomeTitle: 'पलाश वाणी में आपका स्वागत है',
    welcomeSubtitle: 'मातृभाषा बहुभाषी शिक्षण संवर्धन प्रणाली (MTB-MLE) — झारखण्ड',
    welcomeIntroText: 'पलाश वाणी (PALASH Vani) में आपका हार्दिक स्वागत है! यह 100% ऑफ़लाइन प्रणाली गैर-जनजातीय प्राथमिक शिक्षकों एवं जनजातीय बच्चों के बीच भाषा की खाई को समाप्त करती है।',
    welcomeLangHeading: '1. एप्लिकेशन संचालन भाषा चुनें (Select Operating Language)',
    welcomeLangSubheading: 'कृपया अपनी सुविधानुसार इंटरफेस भाषा चुनें। आप इसे कभी भी ऊपर नेवबार से बदल सकते हैं।',
    langHindiTitle: 'हिन्दी',
    langHindiDesc: 'कक्षा शिक्षण एवं जनजातीय विद्यार्थियों से सहज संवाद हेतु हिन्दी माध्यम।',
    langHindiBadge: 'हिन्दी माध्यम',
    langEnglishTitle: 'English',
    langEnglishDesc: 'शिक्षक अध्यापन, द्विभाषी अध्ययन एवं अभ्यास हेतु अंग्रेज़ी माध्यम।',
    langEnglishBadge: 'English',
    roleHeading: '2. अपनी प्राथमिक भूमिका चुनें (Choose Your Role)',
    roleSubheading: 'शिक्षक अथवा विद्यार्थी में से अपनी कक्षा भूमिका चुनें (शून्य लॉगिन - 100% ऑफ़लाइन)',
    roleTeacherTitle: '👨‍🏫 शिक्षक मंच (Teacher Portal)',
    roleTeacherDesc: 'ध्वनि अनुवाद, द्विभाषी A4 कार्यपुस्तिका जनरेटर, 30-मिनट पाठ योजनाएं, एवं क्लस्टर मेश सिंक।',
    roleStudentTitle: '🧒 विद्यार्थी मंच (Student Studio)',
    roleStudentDesc: 'डिजिटल स्लेट अक्षर अनुरेखण, फ़ोनिक्स गेम, सचित्र लोककथाएं कराओके, एवं कैमरा AI।',
    roleAllTitle: '🌐 संपूर्ण दृश्य (Master View)',
    roleAllDesc: 'मूल्यांकनकर्ताओं एवं प्रधानाचार्यों हेतु सभी 14 मॉड्यूल का संयुक्त दृश्य।',
    targetLangHeading: '3. लक्षित जनजातीय भाषा (Target Tribal Language)',
    enterAppButton: 'पलाश वाणी में प्रवेश करें ➔',
    welcomeFeature1Title: '100% ऑफ़लाइन संचालन',
    welcomeFeature1Desc: 'शून्य इंटरनेट (0 KB/s) पर भी सभी 14 मॉड्यूल निर्बाध गति से काम करते हैं।',
    welcomeFeature2Title: 'द्विभाषी ध्वनि अनुवाद',
    welcomeFeature2Desc: '<800ms लेटेंसी में हिंदी व अंग्रेज़ी से संथाली (ओल चिकी), हो और मुंडारी में सटीक अनुवाद।',
    welcomeFeature3Title: 'निपुण भारत FLN रेडी',
    welcomeFeature3Desc: 'NEP 2020 एवं निपुण भारत बुनियादी साक्षरता और संख्याज्ञान (FLN) के अनुरूप।',

    // Navbar & Controls
    languageLabel: 'भाषा:',
    interfaceLabel: 'इंटरफेस:',
    appLangToggleLabel: 'भाषा:',
    speakerTestBtn: 'स्पीकर टेस्ट 🔊',
    speakerTesting: 'ध्वनि बज रही है... 🔊',
    offlineMode: '100% ऑफ़लाइन',
    onlineMode: 'ऑनलाइन',
    ramLabel: 'RAM: ~68 MB / 2GB',
    themeLabel: 'थीम:',

    // Roles
    roleTeacher: '👨‍🏫 शिक्षक',
    roleStudent: '🧒 विद्यार्थी',
    roleAll: '🌐 सभी',
    roleActiveBadge: '✓ सक्रिय इंटरफेस',
    roleClickToActivate: 'सक्रिय करने हेतु क्लिक करें',

    // Tabs
    tabHome: 'होम',
    tabV2V: 'ध्वनि अनुवाद',
    tabWorksheet: 'कार्यपुस्तिका',
    tabCustomLesson: 'कस्टम पाठ',
    tabText: 'पाठ्यचर्या',
    tabCert: 'शिक्षक सेतु',
    tabMesh: 'मेश सिंक',
    tabDatasets: 'Kaggle डेटासेट',
    tabDiagnostics: 'टैबलेट स्थिति',
    tabSlate: 'डिजिटल स्लेट',
    tabGame: 'फ़ोनिक्स गेम',
    tabCamera: 'फोटो पहचानो',
    tabFolktale: 'लोककथाएं',
    tabFlashcards: 'फ्लैशकार्ड्स',

    // Hero Section
    heroTitle: 'पलाश वाणी',
    heroSubtitle: 'झारखण्ड के प्राथमिक विद्यालयों में गैर-जनजातीय शिक्षकों हेतु संथाली, हो और मुंडारी में मातृभाषा आधारित बहुभाषी शिक्षण (MTB-MLE) संवर्धन प्रणाली।',
    heroQuickVoice: 'ध्वनि अनुवाद',
    heroQuickSlate: 'डिजिटल स्लेट',
    heroQuickGame: 'फ़ोनिक्स गेम',
    heroQuickCamera: 'फोटो पहचानो',
    heroQuickFolktale: 'लोककथाएं',
    heroActiveLang: 'सक्रिय:',
    heroInteractiveFeatures: 'इंटरैक्टिव सुविधाएं',
    heroTeacherCardTitle: '👨‍🏫 शिक्षक अध्यापन केंद्र',
    heroTeacherCardSubtitle: '(Teacher Portal)',
    heroTeacherCardDesc: 'गैर-जनजातीय प्राथमिक शिक्षकों हेतु: रियल-टाइम ध्वनि अनुवाद, निपुण भारत A4 कार्यपुस्तिका, 30-मिनट पाठ योजनाएं, एवं शिक्षक प्रमाणन।',
    heroTeacherCardCta: 'शिक्षक उपकरण इंटरफेस देखें',
    heroStudentCardTitle: '🧒 विद्यार्थी बाल-अध्ययन केंद्र',
    heroStudentCardSubtitle: '(Student Studio)',
    heroStudentCardDesc: 'जनजातीय बच्चों हेतु: डिजिटल स्लेट (अक्षर अनुरेखण), ध्वनि व चित्र गेम, सचित्र लोककथाएं, 3D फ्लैशकार्ड्स एवं ऑडियो अभ्यास।',
    heroStudentCardCta: 'विद्यार्थी गतिविधियां इंटरफेस देखें',
    heroMasterViewBtn: '🌐 संपूर्ण दृश्य (14 मॉड्यूल)',
    heroDirectoryTitleTeacher: 'शिक्षक अध्यापन उपकरण (Teacher Pedagogical Modules):',
    heroDirectoryTitleStudent: 'विद्यार्थी बाल-अध्ययन गतिविधियां (Student Learning Activities):',
    heroDirectoryTitleAll: 'पलाश वाणी की सभी प्रमुख सुविधाएं (Complete Feature Directory):',
    heroDirectorySubtitle: 'कुल मॉड्यूल उपलब्ध • क्लिक करके सीधे खोलें ➔',
    cardOpenBtn: 'खोलें एवं उपयोग करें',

    // Feature Card Titles & Descriptions
    featV2VTitle: '1. ध्वनि अनुवाद (Voice-to-Voice)',
    featV2VDesc: 'शिक्षक हिंदी या अंग्रेज़ी में बोलें और तुरंत संथाली/हो/मुंडारी में सटीक ऑडियो पाएं। <800ms लेटेंसी।',
    featSlateTitle: '2. डिजिटल स्लेट (Letter Tracing)',
    featSlateDesc: 'पारंपरिक स्लेट पर ओल चिकी व वारंग चिति अक्षर अनुरेखण, चॉक कलर्स एवं ऑडियो शाबाशी।',
    featGameTitle: '3. सुनो और पहचानो (Phonics Game)',
    featGameDesc: 'ध्वनि सुनकर सही चित्र चुनने वाला गेम — बालवाटिका व कक्षा 1 हेतु स्कोर व स्ट्रीक।',
    featCameraTitle: '4. फोटो पहचानो (Visual Camera FLN)',
    featCameraDesc: 'कक्षा की वस्तुओं पर कैमरा इंगित करें — AI तुरंत वस्तु पहचानकर मातृभाषा में नाम बोलता है।',
    featFolktaleTitle: '5. लोककथाएं व बालगीत (Karaoke)',
    featFolktaleDesc: 'वाक्य-दर-वाक्य हाइलाइटिंग एवं ऑडियो के साथ पारंपरिक जनजातीय कथाएं।',
    featWorksheetTitle: '6. निपुण भारत कार्यपुस्तिका जनरेटर',
    featWorksheetDesc: 'कक्षा 1-3 के लिए चित्र मिलान, गिनती और अनुरेखण कार्यपत्रक। A4 प्रिंट रेडी।',
    featCustomLessonTitle: '7. कस्टम पाठ योजना निर्माता (AI)',
    featCustomLessonDesc: 'कोई भी हिंदी विषय लिखें — AI स्वतः 30-मिनट का द्विभाषी कक्षा संवाद तैयार करेगा।',
    featFlashcardsTitle: '8. 3D सचित्र फ्लैशकार्ड स्टूडियो',
    featFlashcardsDesc: 'कक्षा में बच्चों को चित्र, लिपि और सटीक उच्चारण सिखाने हेतु 3D फ्लिप कार्ड्स।',
    featCertTitle: '9. शिक्षक भाषा सेतु (Certification)',
    featCertDesc: 'गैर-जनजातीय शिक्षकों हेतु 5-मिनट दैनिक अभ्यास, प्रश्नोत्तरी एवं आधिकारिक प्रमाण पत्र।',
    featMeshTitle: '10. क्लस्टर मेश सिंक (Offline P2P)',
    featMeshDesc: 'शून्य इंटरनेट वाले क्षेत्रों में टैबलेट-टू-टैबलेट स्थानीय हॉटस्पॉट सामग्री साझाकरण।',
    featDatasetsTitle: '11. Kaggle ओपन डेटासेट एक्सप्लोरर',
    featDatasetsDesc: 'संथाली 40 वर्णमाला, NIPUN कक्षा वाक्य एवं StoryWeaver लोककथाओं का पूर्ण डेटा बैंक।',
    featTextTitle: '12. पाठ्यचर्या अनुवाद व स्क्रिप्ट',
    featTextDesc: 'पाठ्यपुस्तकों का द्विभाषी अनुवाद एवं देवनागरी उच्चारण स्क्रिप्ट गाइड।',

    // Footer
    footerMission: 'पलाश वाणी (PALASH Vani) • झारखंड मातृभाषा बहुभाषी शिक्षण संवर्धन (MTB-MLE)',
    footerSanthali: 'संथाली (Ol Chiki)',
    footerHo: 'हो (Warang Chiti)',
    footerMundari: 'मुंडारी (Mundari)',
    footerOfflineNote: '100% ऑफ़लाइन (≤2GB RAM)',
    footerVersion: 'v2.0 अपडेटेड'
  },
  en: {
    // App Titles & Meta
    appName: 'PALASH Vani',
    appSubname: '(पलाश वाणी)',
    appTagline: 'Primary Teacher AI Assistant | Santhali • Ho • Mundari',
    missionBadge: 'Jharkhand PALASH MTB-MLE',
    offlineBadge: '100% Offline Tablet Ready',
    versionBadge: 'v2.0 Updated',
    welcomeButton: 'Welcome / Intro',

    // Welcome Screen
    welcomeTitle: 'Welcome to PALASH Vani',
    welcomeSubtitle: 'Mother Tongue-Based Multilingual Education (MTB-MLE) — Jharkhand',
    welcomeIntroText: 'Welcome to our app! PALASH Vani bridges the language barrier between non-tribal primary school teachers and tribal children through 100% offline speech translation, interactive digital slate, and bilingual pedagogical tools.',
    welcomeLangHeading: '1. Choose Operating Language',
    welcomeLangSubheading: 'Select your preferred interface language. You can switch this at any time from the top navigation bar.',
    langHindiTitle: 'हिन्दी (Hindi)',
    langHindiDesc: 'Hindi medium interface for classroom instruction and student communication.',
    langHindiBadge: 'Hindi',
    langEnglishTitle: 'English',
    langEnglishDesc: 'English medium interface for instruction, bilingual learning and practice.',
    langEnglishBadge: 'English',
    roleHeading: '2. Select Your Classroom Persona',
    roleSubheading: 'Choose your interface mode between Teacher and Student (Zero login - 100% offline)',
    roleTeacherTitle: '👨‍🏫 Teacher Portal',
    roleTeacherDesc: 'Real-time voice translator, printable A4 worksheets, 30-minute lesson plans, and peer-to-peer mesh sync.',
    roleStudentTitle: '🧒 Student Studio',
    roleStudentDesc: 'Interactive digital slate letter tracing, phonics sound games, illustrated folktales karaoke, and camera AI.',
    roleAllTitle: '🌐 Master View',
    roleAllDesc: 'Unified view of all 14 pedagogical and learning modules for evaluators and headmasters.',
    targetLangHeading: '3. Target Tribal Language',
    enterAppButton: 'Enter PALASH Vani ➔',
    welcomeFeature1Title: '100% Offline Operation',
    welcomeFeature1Desc: 'Zero cloud dependency. Runs smoothly at 0 KB/s internet speed on ≤2GB RAM school tablets.',
    welcomeFeature2Title: 'Bilingual Voice Translator',
    welcomeFeature2Desc: '<800ms latency translation into Santhali (Ol Chiki), Ho (Warang Chiti), and Mundari.',
    welcomeFeature3Title: 'NIPUN Bharat FLN Aligned',
    welcomeFeature3Desc: 'Strictly aligned with NEP 2020 and NIPUN Bharat Foundational Literacy and Numeracy goals.',

    // Navbar & Controls
    languageLabel: 'Language:',
    interfaceLabel: 'Interface:',
    appLangToggleLabel: 'Language:',
    speakerTestBtn: 'Test Speaker 🔊',
    speakerTesting: 'Playing Audio... 🔊',
    offlineMode: '100% Offline',
    onlineMode: 'Online',
    ramLabel: 'RAM: ~68 MB / 2GB',
    themeLabel: 'Theme:',

    // Roles
    roleTeacher: '👨‍🏫 Teacher',
    roleStudent: '🧒 Student',
    roleAll: '🌐 All',
    roleActiveBadge: '✓ Active Interface',
    roleClickToActivate: 'Click to Activate',

    // Tabs
    tabHome: 'Home',
    tabV2V: 'Voice Translator',
    tabWorksheet: 'Worksheets',
    tabCustomLesson: 'Custom Lesson',
    tabText: 'Curriculum',
    tabCert: 'Teacher Bridge',
    tabMesh: 'Mesh Sync',
    tabDatasets: 'Kaggle Datasets',
    tabDiagnostics: 'Tablet Status',
    tabSlate: 'Digital Slate',
    tabGame: 'Phonics Game',
    tabCamera: 'Photo AI',
    tabFolktale: 'Folktales',
    tabFlashcards: 'Flashcards',

    // Hero Section
    heroTitle: 'PALASH Vani',
    heroSubtitle: 'Mother Tongue-Based Multilingual Education (MTB-MLE) empowerment system for primary school educators in Jharkhand teaching in Santhali, Ho, and Mundari.',
    heroQuickVoice: 'Voice Translator',
    heroQuickSlate: 'Digital Slate',
    heroQuickGame: 'Phonics Game',
    heroQuickCamera: 'Photo AI',
    heroQuickFolktale: 'Folktales',
    heroActiveLang: 'Active:',
    heroInteractiveFeatures: 'Interactive Features',
    heroTeacherCardTitle: '👨‍🏫 Teacher Pedagogical Portal',
    heroTeacherCardSubtitle: '(Teacher Portal)',
    heroTeacherCardDesc: 'For primary educators: Real-time voice translator, NIPUN Bharat A4 worksheet generator, 30-min lesson plans, and teacher certification.',
    heroTeacherCardCta: 'Explore Teacher Modules',
    heroStudentCardTitle: '🧒 Student Learning Studio',
    heroStudentCardSubtitle: '(Student Studio)',
    heroStudentCardDesc: 'For tribal children: Digital slate letter tracing, phonics sound games, illustrated folktales karaoke, 3D flashcards, and audio practice.',
    heroStudentCardCta: 'Explore Student Activities',
    heroMasterViewBtn: '🌐 Master View (14 Modules)',
    heroDirectoryTitleTeacher: 'Teacher Pedagogical Modules:',
    heroDirectoryTitleStudent: 'Student Learning Activities:',
    heroDirectoryTitleAll: 'Complete Feature Directory:',
    heroDirectorySubtitle: 'Total modules available • Click to launch directly ➔',
    cardOpenBtn: 'Open & Launch',

    // Feature Card Titles & Descriptions
    featV2VTitle: '1. Voice-to-Voice Translator',
    featV2VDesc: 'Teacher speaks in Hindi or English and immediately receives authentic tribal audio in <800ms latency.',
    featSlateTitle: '2. Digital Slate (Letter Tracing)',
    featSlateDesc: 'Trace authentic Ol Chiki & Warang Chiti alphabets with chalk colors and real-time audio scoring.',
    featGameTitle: '3. Phonics Sound Matcher',
    featGameDesc: 'Audio ear-training game matching native pronunciations to images for Balvatika and Grade 1.',
    featCameraTitle: '4. Visual Camera FLN AI',
    featCameraDesc: 'Point camera at classroom items — AI instantly identifies the object and pronounces it in tribal tongue.',
    featFolktaleTitle: '5. Folktales & Rhymes (Karaoke)',
    featFolktaleDesc: 'Sentence-by-sentence synchronized audio playback of traditional Jharkhand folklore.',
    featWorksheetTitle: '6. NIPUN Bharat Worksheet Maker',
    featWorksheetDesc: 'Print-ready A4 worksheets for letter tracing, counting, and image matching for paper homework.',
    featCustomLessonTitle: '7. Custom Lesson Generator (AI)',
    featCustomLessonDesc: 'Type any Hindi or English topic — AI automatically builds a 30-minute bilingual classroom script.',
    featFlashcardsTitle: '8. 3D Illustrated Flashcards',
    featFlashcardsDesc: 'Tactile 3D flipping flashcards with native pronunciations and cultural illustrations.',
    featCertTitle: '9. Teacher Language Bridge',
    featCertDesc: '5-minute daily micro-lessons, interactive quizzes, and verifiable offline teacher certificates.',
    featMeshTitle: '10. Cluster Mesh Sync (P2P)',
    featMeshDesc: 'Share worksheets and lessons tablet-to-tablet over local Wi-Fi hotspot with zero internet.',
    featDatasetsTitle: '11. Kaggle Open Dataset Explorer',
    featDatasetsDesc: 'Comprehensive linguistic data bank covering 40 Ol Chiki alphabets, NIPUN phrases, and StoryWeaver tales.',
    featTextTitle: '12. Curriculum Script Viewer',
    featTextDesc: 'Standardized textbook scripts with Devanagari phonetics and teacher pronunciation guides.',

    // Footer
    footerMission: 'PALASH Vani • Jharkhand Mother Tongue-Based Multilingual Education (MTB-MLE)',
    footerSanthali: 'Santhali (Ol Chiki)',
    footerHo: 'Ho (Warang Chiti)',
    footerMundari: 'Mundari (Devanagari)',
    footerOfflineNote: '100% Offline (≤2GB RAM)',
    footerVersion: 'v2.0 Updated'
  }
};
