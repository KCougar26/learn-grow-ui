-- ==========================
-- Insert Users
-- ==========================
INSERT INTO Users (first_name, last_name, email, password_hash, current_streak, max_streak)
VALUES
('Alice', 'Johnson', 'alice@example.com', 'hashed_pw_1', 5, 10),
('Bob', 'Smith', 'bob@example.com', 'hashed_pw_2', 2, 4),
('Charlie', 'Brown', 'charlie@example.com', 'hashed_pw_3', 7, 12);

-- ==========================
-- Insert Lessons
-- ==========================
INSERT INTO Lessons (theme, level, extra_links, prereq_lesson_id)
VALUES
('Nutrition Basics', 1, 'https://sqltutorial.com', NULL),
('Proteins', 2, 'https://sqljoins.com', 1),
('Healthy and Unhealthy Fats', 3, 'https://advanced-sql.com', 2);

-- ==========================
-- Insert Quizzes
-- ==========================
INSERT INTO Quizzes (lesson_id, num_of_questions)
VALUES
(1, 10),
(2, 15),
(3, 20);

-- ==========================
-- Insert User_Lessons
-- ==========================
INSERT INTO User_Lessons (user_id, lesson_id, status, completed_at)
VALUES
(1, 1, 'Completed', NOW()),
(1, 2, 'In Progress', NULL),
(2, 1, 'Completed', NOW()),
(3, 1, 'Completed', NOW());

-- ==========================
-- Insert User_Quizzes
-- ==========================
INSERT INTO User_Quizzes (user_id, quiz_id, score, attempt_number, passed)
VALUES
(1, 1, 9, 1, TRUE),
(1, 2, 10, 1, FALSE),
(2, 1, 8, 1, TRUE),
(3, 1, 10, 1, TRUE);

-- ==========================
-- Insert Badges
-- ==========================
INSERT INTO Badges (badge_name, badge_level)
VALUES
('New learner', 1),
('Streak Legend', 2),
('Nutrition Fiend', 3);

-- ==========================
-- Insert User_Badges
-- ==========================
INSERT INTO User_Badges (user_id, badge_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(3, 2);
