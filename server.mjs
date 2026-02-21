import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { Pool } = pg;

const pool = new Pool({
  host: process.env.VITE_DB_HOST,
  port: parseInt(process.env.VITE_DB_PORT || '5432'),
  user: process.env.VITE_DB_USER,
  password: process.env.VITE_DB_PASSWORD,
  database: process.env.VITE_DB_NAME,
});

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get user's lesson progress
app.get('/api/users/:userId/lessons', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Fetching lessons for user ${userId}`);
    const result = await pool.query(
      `SELECT user_id, lesson_id, status, completed_at
       FROM User_Lessons
       WHERE user_id = $1
       ORDER BY lesson_id ASC;`,
      [parseInt(userId)]
    );
    console.log(`Found ${result.rows.length} lessons:`, result.rows);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching user lessons:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update lesson status
app.post('/api/users/:userId/lessons/:lessonId/complete', async (req, res) => {
  try {
    const { userId, lessonId } = req.params;
    console.log(`Updating lesson ${lessonId} for user ${userId} to Completed`);

    const result = await pool.query(
      `INSERT INTO User_Lessons (user_id, lesson_id, status, completed_at)
       VALUES ($1, $2, 'Completed', CURRENT_TIMESTAMP)
       ON CONFLICT (user_id, lesson_id) 
       DO UPDATE SET status = 'Completed', completed_at = CURRENT_TIMESTAMP
       RETURNING *;`,
      [parseInt(userId), parseInt(lessonId)]
    );

    console.log(`✓ Lesson ${lessonId} updated for user ${userId}:`, result.rows[0]);
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating lesson status:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
