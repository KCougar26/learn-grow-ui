import pg from 'pg';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const { Pool } = pg;

const poolConfig = {
  user: process.env.VITE_DB_USER,
  host: process.env.VITE_DB_HOST,
  port: parseInt(process.env.VITE_DB_PORT || '5432'),
  database: process.env.VITE_DB_NAME,
};

if (process.env.VITE_DB_PASSWORD && process.env.VITE_DB_PASSWORD.trim()) {
  poolConfig.password = process.env.VITE_DB_PASSWORD;
}

const pool = new Pool(poolConfig);

async function generateLessonsFile() {
  try {
    console.log('Fetching lessons data from database...');
    
    // Fetch lessons
    const lessonsResult = await pool.query(`
      SELECT lesson_id as id, theme as title, level, extra_links 
      FROM Lessons 
      ORDER BY level ASC
    `);

    // Fetch quizzes
    const quizzesResult = await pool.query(`
      SELECT quiz_id as id, lesson_id, num_of_questions 
      FROM Quizzes
    `);

    // Fetch badges
    const badgesResult = await pool.query(`
      SELECT badge_id as id, badge_name as name, badge_level as level
      FROM Badges
      ORDER BY badge_level ASC
    `);

    const lessons = lessonsResult.rows.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      description: `Level ${lesson.level} lesson on ${lesson.title.toLowerCase()}`,
      duration: '5 min',
      status: 'active',
      category: lesson.title,
      level: lesson.level,
      extraLinks: lesson.extra_links,
    }));

    const badges = badgesResult.rows.map(badge => ({
      id: badge.id,
      name: badge.name,
      emoji: getEmojiForBadge(badge.name),
      earned: false,
    }));

    // Generate TypeScript file content
    const fileContent = `// This file is auto-generated from the database
// Generated at: ${new Date().toISOString()}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  status: "completed" | "active" | "locked";
  score?: number;
  modulesTotal?: number;
  modulesCompleted?: number;
  category: string;
  level?: number;
  extraLinks?: string;
}

export const lessons: Lesson[] = ${JSON.stringify(lessons, null, 2)};

export interface Badge {
  id: number;
  name: string;
  emoji: string;
  earned: boolean;
}

export const badges: Badge[] = ${JSON.stringify(badges, null, 2)};

export interface QuizQuestion {
  id: number;
  question: string;
  image?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const sampleQuiz: QuizQuestion[] = [
  {
    id: 1, question: "What type of nutrient is chicken?",
    image: "🍗", options: ["Carbohydrate", "Fat", "Protein", "Vitamin"],
    correctIndex: 2, explanation: "Chicken is primarily a source of protein, which helps build and repair muscles."
  },
  {
    id: 2, question: "Which vitamin do you get from sunlight?",
    image: "☀️", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    correctIndex: 3, explanation: "Your body produces Vitamin D when your skin is exposed to sunlight."
  },
  {
    id: 3, question: "How many glasses of water should you aim for daily?",
    image: "💧", options: ["2-3", "4-5", "6-8", "10-12"],
    correctIndex: 2, explanation: "Most health authorities recommend 6-8 glasses (about 2 liters) of water per day."
  },
  {
    id: 4, question: "Which of these is a healthy fat source?",
    image: "🥑", options: ["Candy bar", "Avocado", "White bread", "Soda"],
    correctIndex: 1, explanation: "Avocados contain heart-healthy monounsaturated fats and are packed with nutrients."
  },
  {
    id: 5, question: "What does fiber help with?",
    image: "🥦", options: ["Building muscle", "Digestion", "Tanning", "Sleep"],
    correctIndex: 1, explanation: "Fiber aids digestion by adding bulk to your stool and feeding beneficial gut bacteria."
  },
];

export const lessonContent = {
  title: "Nutrition Basics",
  duration: "5 min",
  sections: [
    {
      heading: "What are Macronutrients?",
      content: "Macronutrients are the nutrients your body needs in large amounts to function properly. There are three main types: proteins, carbohydrates, and fats. Each plays a unique role in keeping you healthy and energized.",
    },
    {
      heading: "Proteins — Your Body's Building Blocks",
      content: "Protein helps build and repair muscles, skin, and organs. Good sources include chicken, fish, beans, eggs, and tofu. Aim to include a protein source in every meal.",
    },
    {
      heading: "Carbohydrates — Your Energy Source",
      content: "Carbs are your body's preferred fuel. Choose complex carbs like whole grains, fruits, and vegetables over simple sugars. They provide sustained energy throughout the day.",
    },
    {
      heading: "Fats — Essential, Not Evil",
      content: "Healthy fats support brain function and hormone production. Focus on unsaturated fats from sources like olive oil, nuts, avocados, and fatty fish. Limit trans fats and excessive saturated fats.",
    },
  ],
};
`;

    const filePath = path.join(process.cwd(), 'src', 'data', 'lessons.ts');
    fs.writeFileSync(filePath, fileContent);

    console.log('✅ Successfully generated lessons.ts from database!');
    console.log(`📝 Lessons: ${lessons.length}`);
    console.log(`🎖️ Badges: ${badges.length}`);
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating lessons file:', error);
    await pool.end();
    process.exit(1);
  }
}

function getEmojiForBadge(badgeName) {
  const emojiMap = {
    'New learner': '🌱',
    'Streak Legend': '🏆',
    'Nutrition Fiend': '🍎',
  };
  return emojiMap[badgeName] || '⭐';
}

generateLessonsFile();
