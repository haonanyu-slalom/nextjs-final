import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json());

// Configure PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Endpoint to get all profiles
app.get('/profiles', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM profiles');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to get a profile by id
app.get('/profiles/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM profiles WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to create a new profile
app.post('/profiles', async (req: Request, res: Response) => {
  const { name, avatar, email, description, techStacks, experience, availability, project, githubLink } = req.body;
  try {
    await pool.query(
      'INSERT INTO profiles (name, avatar, email, description, techStacks, experience, availability, project, githubLink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [name, avatar, email, description, techStacks, experience, availability, project, githubLink]
    );
    res.status(201).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to update a profile
app.put('/profiles/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, avatar, email, description, techStacks, experience, availability, project, githubLink } = req.body;
  try {
    await pool.query(
      'UPDATE profiles SET name = $1, avatar = $2, email = $3, description = $4, techStacks = $5, experience = $6, availability = $7, project = $8, githubLink = $9 WHERE id = $10',
      [name, avatar, email, description, techStacks, experience, availability, project, githubLink, id]
    );
    res.status(200).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to delete a profile
app.delete('/profiles/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM profiles WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));