-- ==========================================
-- UNITS
-- ==========================================

INSERT INTO Units (unit_title, unit_order) VALUES
('Welcome & Nutrition Basics',1),
('Macronutrients - Your Body''s Fuel',2),
('Micronutrients - Small But Mighty',3),
('Digestion & Nutrient Absorption',4),
('Reading Labels & Making Informed Choices',5);

-- ==========================================
-- LESSONS
-- ==========================================

INSERT INTO Lessons (unit_id, theme, level) VALUES

-- UNIT 1
(1,'Welcome to NutriLearn',1),
(1,'What is Nutrition?',1),
(1,'The Basic Food Groups',1),
(1,'Calories Explained',1),
(1,'How Your Body Uses Food',1),

-- UNIT 2
(2,'Introduction to Macronutrients',2),
(2,'Carbohydrates - Your Energy Source',2),
(2,'Proteins - Your Building Blocks',2),
(2,'Fats - Essential and Misunderstood',2),
(2,'Balancing Your Macros',2),

-- UNIT 3
(3,'Introduction to Micronutrients',3),
(3,'Water-Soluble Vitamins (B & C)',3),
(3,'Fat-Soluble Vitamins (A, D, E, K)',3),
(3,'Important Minerals',3),
(3,'Getting Enough Micronutrients',3),

-- UNIT 4
(4,'The Digestive System in Detail',4),
(4,'How Nutrients Are Absorbed',4),
(4,'Gut Health and Microbiome Basics',4),
(4,'Factors That Affect Digestion',4),

-- UNIT 5
(5,'Understanding the Nutrition Facts Label',5),
(5,'Ingredient Lists Decoded',5),
(5,'Marketing Claims vs Reality',5),
(5,'Comparing Food Products',5);

-- ==========================================
-- LESSON CARDS (3 per lesson)
-- ==========================================

INSERT INTO Lesson_Cards (lesson_id, card_order, card_text)
SELECT lesson_id,1,'Introduction to this nutrition concept.' FROM Lessons;

INSERT INTO Lesson_Cards (lesson_id, card_order, card_text)
SELECT lesson_id,2,'Important explanation and examples related to this lesson topic.' FROM Lessons;

INSERT INTO Lesson_Cards (lesson_id, card_order, card_text)
SELECT lesson_id,3,'Key takeaway and real-world nutrition example.' FROM Lessons;

-- ==========================================
-- QUIZZES (1 per lesson)
-- ==========================================

INSERT INTO Quizzes (lesson_id, num_of_questions)
SELECT lesson_id,5 FROM Lessons;

-- ==========================================
-- QUIZ QUESTIONS (5 per quiz)
-- ==========================================

INSERT INTO Quiz_Questions (quiz_id, question_order, question_text)
SELECT quiz_id,1,'Which statement best describes the concept from this lesson?' FROM Quizzes;

INSERT INTO Quiz_Questions (quiz_id, question_order, question_text)
SELECT quiz_id,2,'Why is this nutrition concept important?' FROM Quizzes;

INSERT INTO Quiz_Questions (quiz_id, question_order, question_text)
SELECT quiz_id,3,'Which example best represents this idea?' FROM Quizzes;

INSERT INTO Quiz_Questions (quiz_id, question_order, question_text)
SELECT quiz_id,4,'What is the key takeaway from this lesson?' FROM Quizzes;

INSERT INTO Quiz_Questions (quiz_id, question_order, question_text)
SELECT quiz_id,5,'Which choice best supports healthy eating habits?' FROM Quizzes;

-- ==========================================
-- QUIZ ANSWERS (3 per question)
-- ==========================================

INSERT INTO Quiz_Answers (question_id, answer_text, is_correct)
SELECT question_id,'Correct Answer',TRUE FROM Quiz_Questions;

INSERT INTO Quiz_Answers (question_id, answer_text, is_correct)
SELECT question_id,'Incorrect Option A',FALSE FROM Quiz_Questions;

INSERT INTO Quiz_Answers (question_id, answer_text, is_correct)
SELECT question_id,'Incorrect Option B',FALSE FROM Quiz_Questions;

-- ==========================================
-- BADGES
-- ==========================================

INSERT INTO Badges (badge_name, badge_level) VALUES
('Nutrition Beginner',1),
('Macro Master',2),
('Vitamin Expert',3),
('Digestive Guru',4),
('Label Detective',5);