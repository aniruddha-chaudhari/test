import express from 'express';
import cors from 'cors';
import { client as prisma } from '@repo/prisma/client';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware

app.use(cors());

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test Prisma connection
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Create user endpoint
app.post('/api/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.create({
      data: {
        username,
        password
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HTTP Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
});

