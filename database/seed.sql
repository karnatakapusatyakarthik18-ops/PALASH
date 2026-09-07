-- ==============================================================================
-- PALASH VANI — Seed Data for XAMPP MySQL / MariaDB
-- Database: palash
-- ==============================================================================

USE `palash`;

-- 1. LANGUAGES
INSERT INTO `languages` (`code`, `name`, `native_name`, `script_name`, `is_active`) VALUES
('sat', 'Santhali', 'ᱥᱟᱱᱛᱟᱲᱤ', 'Ol Chiki', 1),
('hoc', 'Ho', '𑢹𑣉𑣉 / हो', 'Warang Chiti / Devanagari', 1),
('unr', 'Mundari', 'मुण्डारी', 'Devanagari', 1),
('hin', 'Hindi', 'हिन्दी', 'Devanagari', 1),
('eng', 'English', 'English', 'Latin', 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 2. USERS (Teachers & Students)
INSERT INTO `users` (`id`, `name`, `role`, `email`, `phone`) VALUES
(1, 'अनिता मुर्मू (Anita Murmu)', 'teacher', 'anita.murmu@jharkhand.edu.in', '9876543210'),
(2, 'बिरसा सोरेन (Birsa Soren)', 'student', 'birsa.soren@student.palash.org', NULL),
(3, 'सोमा मुंडा (Soma Munda)', 'student', 'soma.munda@student.palash.org', NULL),
(4, 'सुनीता हेम्ब्रम (Sunita Hembram)', 'teacher', 'sunita.h@jharkhand.edu.in', '9876543211')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 3. TEACHER PROFILES
INSERT INTO `teachers` (`id`, `user_id`, `school_name`, `district`, `qualification`, `primary_language`, `target_tribal_language`) VALUES
(1, 1, 'उत्क्रमित प्राथमिक विद्यालय, शिकारीपाड़ा', 'Dumka', 'B.Ed, MTB-MLE Certified', 'hindi', 'santhali'),
(2, 4, 'राजकीय बुनियादी विद्यालय, तोरपा', 'Khunti', 'D.El.Ed, Tribal Pedagogy Specialist', 'hindi', 'mundari')
ON DUPLICATE KEY UPDATE `school_name` = VALUES(`school_name`);

-- 4. STUDENT PROFILES
INSERT INTO `students` (`id`, `user_id`, `roll_number`, `grade_level`, `native_language`, `school_name`) VALUES
(1, 2, 'ROLL-01', 'कक्षा 1 (Grade 1)', 'santhali', 'उत्क्रमित प्राथमिक विद्यालय, शिकारीपाड़ा'),
(2, 3, 'ROLL-02', 'कक्षा 2 (Grade 2)', 'mundari', 'राजकीय बुनियादी विद्यालय, तोरपा')
ON DUPLICATE KEY UPDATE `roll_number` = VALUES(`roll_number`);

-- 5. LESSONS (MTB-MLE Curricula)
INSERT INTO `lessons` (`id`, `title`, `description`, `language_code`, `content`, `created_by`) VALUES
(1, 'पाठ १: वर्णमाला एवं शुरुआती शब्द (Alphabet & First Words)', 'संताली ओल चिकी लिपि के मूल अक्षर और रोज़मर्रा के शब्द', 'sat', '{"intro": "आज हम ओल चिकी वर्णमाला के मूल अक्षर सीखेंगे।", "letters": ["ᱚ", "ᱛ", "ᱜ", "ᱝ", "ᱞ"], "words": [{"word": "ᱫᱟᱜ", "meaning": "पानी"}, {"word": "ᱫᱟᱨᱮ", "meaning": "पेड़"}]}', 1),
(2, 'पाठ २: कक्षा निर्देश एवं बातचीत (Classroom Instructions)', 'शिक्षक द्वारा कक्षा में दिए जाने वाले बुनियादी निर्देश', 'sat', '{"instructions": [{"hindi": "बैठ जाओ", "tribal": "ᱫᱩᱲᱩᱵᱽ ᱯᱮ", "phonetic": "दुड़ुब पे"}, {"hindi": "किताब खोलो", "tribal": "ᱯᱳᱛᱷᱤ ᱯᱷᱟᱲᱟᱣ ᱯᱮ", "phonetic": "पोथी फाड़ाव पे"}]}', 1),
(3, 'पाठ १: हो भाषा में दैनिक शब्द (Daily Words in Ho)', 'वारंग क्षिति और देवनागरी में हो भाषा की शब्दावली', 'hoc', '{"intro": "हो भाषा में पानी और पेड़ जैसे दैनिक शब्दों का अभ्यास।", "words": [{"word": "दाः", "warang": "𑢼𑢡𑣄", "meaning": "पानी"}, {"word": "दारू", "meaning": "पेड़"}]}', 1),
(4, 'पाठ १: मुण्डारी परिवेश एवं प्रकृति (Mundari Nature Words)', 'मुण्डारी भाषा में प्रकृति और पशु-पक्षियों के नाम', 'unr', '{"intro": "मुण्डारी भाषा में हमारे आसपास की प्रकृति को जानें।", "words": [{"word": "दारू", "meaning": "पेड़"}, {"word": "हाकु", "meaning": "मछली"}, {"word": "सेता", "meaning": "कुत्ता"}]}', 4)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- 6. SUPPLEMENTARY VOCABULARY
INSERT INTO `vocabulary` (`source_language`, `target_language`, `source_word`, `target_word`, `phonetic`, `category`, `example_sentence`) VALUES
('hindi', 'santhali', 'पानी', 'ᱫᱟᱜ', 'दाग', 'needs', 'আমাকে ᱫᱟᱜ দাও (मुझे पानी चाहिए)'),
('hindi', 'santhali', 'किताब', 'ᱯᱳᱛᱷᱤ', 'पोथी', 'classroom', 'ᱯᱳᱛᱷᱤ खोलो (किताब खोलो)'),
('hindi', 'santhali', 'पेड़', 'ᱫᱟᱨᱮ', 'दारे', 'nature', 'ᱫᱟᱨᱮ पर फल हैं (पेड़ पर फल हैं)'),
('hindi', 'santhali', 'बैठो', 'ᱫᱩᱲᱩᱵᱽ', 'दुड़ुब', 'classroom', 'सबिन ᱫᱩᱲᱩᱵᱽ पे (सब बैठ जाओ)'),
('hindi', 'santhali', 'मछली', 'ᱦᱟᱹᱠᱩ', 'हाकू', 'nature', 'तालाब में ᱦᱟᱹᱠᱩ है (मछली है)'),
('hindi', 'ho', 'पानी', 'दाः', 'दाह', 'needs', 'मुझे दाः चाहिए (पानी चाहिए)'),
('hindi', 'ho', 'किताब', 'पोथी', 'पोथी', 'classroom', 'आपना पोथी उघड़ेन (अपनी किताब खोलो)'),
('hindi', 'ho', 'पेड़', 'दारू', 'दारू', 'nature', 'दारू रे जो मेनाः (पेड़ पर फल है)'),
('hindi', 'mundari', 'पानी', 'दाः', 'दाह', 'needs', 'दाः नूयमे (पानी पियो)'),
('hindi', 'mundari', 'किताब', 'पोथी', 'पोथी', 'classroom', 'पोथी पढ़ावमे (किताब पढ़ो)'),
('hindi', 'mundari', 'पेड़', 'दारू', 'दारू', 'nature', 'दारू रे जो मेनाः (पेड़ पर फल है)');

-- 7. QUIZZES
INSERT INTO `quizzes` (`id`, `title`, `description`, `language_code`, `created_by`) VALUES
(1, 'संताली बुनियादी शब्दावली परीक्षा', 'कक्षा 1 के विद्यार्थियों के लिए संताली शब्दों की बुनियादी समझ', 'sat', 1),
(2, 'हो एवं मुण्डारी दैनिक निर्देश परीक्षा', 'कक्षा निर्देशों का मातृभाषा में परीक्षण', 'hoc', 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- 8. QUIZ QUESTIONS
INSERT INTO `quiz_questions` (`quiz_id`, `question_text`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_option`, `explanation`) VALUES
(1, 'संताली (ओल चिकी) में "पानी" को क्या कहते हैं?', 'ᱫᱟᱜ (दाग)', 'ᱫᱟᱨᱮ (दारे)', 'ᱯᱳᱛᱷᱤ (पोथी)', 'ᱥᱮᱛᱟ (सेता)', 'a', 'संताली में पानी को ᱫᱟᱜ (दाग) कहा जाता है।'),
(1, 'शिक्षक के निर्देश "बैठ जाओ" का संताली में सही अनुवाद क्या है?', 'ᱛᱤᱸᱜᱩᱱ ᱯᱮ', 'ᱫᱩᱲᱩᱵᱽ ᱯᱮ', 'ᱥᱮᱱᱚᱜ ᱯᱮ', 'ᱡᱚᱢ ᱯᱮ', 'b', 'संताली में बैठ जाओ को ᱫᱩᱲᱩᱵᱽ ᱯᱮ (दुड़ुब पे) कहते हैं।'),
(1, 'ओल चिकी शब्द "ᱯᱳᱛᱷᱤ" का हिंदी अर्थ क्या है?', 'पेड़', 'मछली', 'किताब', 'सूरज', 'c', 'ᱯᱳᱛᱷᱤ (पोथी) का अर्थ किताब (पुस्तक) होता है।'),
(2, 'हो भाषा में "दाः" का अर्थ क्या होता है?', 'रोटी', 'पानी', 'दूध', 'फल', 'b', 'हो भाषा में दाः का अर्थ पानी होता है।'),
(2, 'कक्षा में "खड़े हो जाओ" को मुण्डारी में क्या कहा जाता है?', 'दुबमे', 'तिंगुनमे', 'ओड़ोःमे', 'सेनोःमे', 'b', 'मुण्डारी में खड़े हो जाओ को तिंगुनमे कहते हैं।');

-- 9. INITIAL STUDENT PROGRESS
INSERT INTO `student_progress` (`student_id`, `language_code`, `lessons_completed`, `total_score`, `vocabulary_learned`) VALUES
(1, 'sat', 2, 95, 12),
(2, 'unr', 1, 88, 8)
ON DUPLICATE KEY UPDATE `total_score` = VALUES(`total_score`);

-- 10. SETTINGS
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('app_mode', 'standalone_desktop'),
('active_academic_year', '2024-2025'),
('default_target_language', 'santhali'),
('offline_first_policy', 'enabled'),
('database_sync_interval_ms', '10000')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);
