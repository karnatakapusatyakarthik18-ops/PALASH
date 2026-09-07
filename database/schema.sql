-- ==============================================================================
-- PALASH VANI — Relational Database Schema for XAMPP MySQL / MariaDB
-- Database: palash
-- Character Set: utf8mb4 (Supports Ol Chiki, Devanagari, Warang Chiti & Emojis)
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `palash`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `palash`;

-- Disable foreign key checks during schema initialization
SET FOREIGN_KEY_CHECKS = 0;

-- 1. USERS TABLE (Teachers, Students, Administrators)
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `role` ENUM('teacher', 'student', 'admin') NOT NULL DEFAULT 'student',
  `email` VARCHAR(150) DEFAULT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. TEACHERS PROFILE
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `school_name` VARCHAR(200) NOT NULL,
  `district` VARCHAR(100) DEFAULT 'Ranchi',
  `qualification` VARCHAR(150) DEFAULT 'Primary Educator',
  `primary_language` VARCHAR(50) DEFAULT 'hindi',
  `target_tribal_language` VARCHAR(50) DEFAULT 'santhali',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_teachers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  INDEX `idx_teachers_school` (`school_name`),
  INDEX `idx_teachers_district` (`district`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. STUDENTS PROFILE
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `roll_number` VARCHAR(50) DEFAULT NULL,
  `grade_level` VARCHAR(50) DEFAULT 'Primary 1',
  `native_language` VARCHAR(50) NOT NULL DEFAULT 'santhali',
  `school_name` VARCHAR(200) DEFAULT 'Govt. Primary School',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_students_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  INDEX `idx_students_lang` (`native_language`),
  INDEX `idx_students_grade` (`grade_level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. SUPPORTED INDIGENOUS LANGUAGES METADATA
DROP TABLE IF EXISTS `languages`;
CREATE TABLE `languages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(10) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `native_name` VARCHAR(100) NOT NULL,
  `script_name` VARCHAR(100) NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. LESSONS (Teacher-created MTB-MLE Curricula)
DROP TABLE IF EXISTS `lessons`;
CREATE TABLE `lessons` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `language_code` VARCHAR(10) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `created_by` INT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_lessons_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  INDEX `idx_lessons_lang` (`language_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. VOCABULARY BANK (Supplementary Indigenous Lexicon)
DROP TABLE IF EXISTS `vocabulary`;
CREATE TABLE `vocabulary` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `source_language` VARCHAR(50) NOT NULL DEFAULT 'hindi',
  `target_language` VARCHAR(50) NOT NULL,
  `source_word` VARCHAR(255) NOT NULL,
  `target_word` VARCHAR(255) NOT NULL,
  `phonetic` VARCHAR(255) DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT 'classroom',
  `example_sentence` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_vocab_target` (`target_language`),
  INDEX `idx_vocab_category` (`category`),
  INDEX `idx_vocab_lookup` (`source_word`, `target_language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. QUIZZES
DROP TABLE IF EXISTS `quizzes`;
CREATE TABLE `quizzes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `language_code` VARCHAR(10) NOT NULL DEFAULT 'sat',
  `created_by` INT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_quizzes_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  INDEX `idx_quizzes_lang` (`language_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. QUIZ QUESTIONS
DROP TABLE IF EXISTS `quiz_questions`;
CREATE TABLE `quiz_questions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `quiz_id` INT NOT NULL,
  `question_text` TEXT NOT NULL,
  `option_a` VARCHAR(255) NOT NULL,
  `option_b` VARCHAR(255) NOT NULL,
  `option_c` VARCHAR(255) NOT NULL,
  `option_d` VARCHAR(255) NOT NULL,
  `correct_option` ENUM('a', 'b', 'c', 'd') NOT NULL,
  `explanation` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_questions_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE,
  INDEX `idx_questions_quiz` (`quiz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. QUIZ RESULTS
DROP TABLE IF EXISTS `quiz_results`;
CREATE TABLE `quiz_results` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` INT NOT NULL,
  `quiz_id` INT NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  `total_questions` INT NOT NULL DEFAULT 0,
  `attempt_number` INT NOT NULL DEFAULT 1,
  `completed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_results_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_results_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE,
  INDEX `idx_results_student` (`student_id`),
  INDEX `idx_results_quiz` (`quiz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. STUDENT PROGRESS TRACKING
DROP TABLE IF EXISTS `student_progress`;
CREATE TABLE `student_progress` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` INT NOT NULL,
  `language_code` VARCHAR(10) NOT NULL DEFAULT 'sat',
  `lessons_completed` INT DEFAULT 0,
  `total_score` INT DEFAULT 0,
  `vocabulary_learned` INT DEFAULT 0,
  `last_activity` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_progress_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_student_lang` (`student_id`, `language_code`),
  INDEX `idx_progress_student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. TRANSLATION HISTORY (Optional Log — Non-Blocking)
DROP TABLE IF EXISTS `translation_history`;
CREATE TABLE `translation_history` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `source_language` VARCHAR(50) NOT NULL,
  `target_language` VARCHAR(50) NOT NULL,
  `input_text` TEXT NOT NULL,
  `translation` TEXT NOT NULL,
  `confidence` DECIMAL(4, 2) DEFAULT 0.95,
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_history_target` (`target_language`),
  INDEX `idx_history_time` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. APPLICATION SETTINGS
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `setting_key` VARCHAR(100) PRIMARY KEY,
  `setting_value` TEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
