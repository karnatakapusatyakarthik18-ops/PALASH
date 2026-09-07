#!/usr/bin/env node

/**
 * PALASH VANI — Node.js Backend API Server
 * 
 * Architectural Guarantees:
 *   - Translation engine is NOT here (remains 100% local in React/Electron).
 *   - This server is exclusively for application data: users, lessons, vocabulary,
 *     quizzes, student progress, settings, and non-blocking translation history.
 *   - Offline-first: If XAMPP/MySQL is unavailable, the server stays UP in offline mode
 *     and never crashes.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { startConnectionWatcher, stopConnectionWatcher, getDatabaseStatus } from './config/database.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

import healthRoutes from './routes/health.js';
import userRoutes from './routes/users.js';
import teacherRoutes from './routes/teachers.js';
import studentRoutes from './routes/students.js';
import lessonRoutes from './routes/lessons.js';
import vocabularyRoutes from './routes/vocabulary.js';
import quizRoutes from './routes/quizzes.js';
import progressRoutes from './routes/progress.js';
import translationRoutes from './routes/translations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);
const HOST = '127.0.0.1';

// 1. Core Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Request logger for development
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.originalUrl !== '/api/health') {
      console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// 2. Mount API Routes
app.use('/api', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api', translationRoutes);

// Direct aliases required by prompt specification:
// GET /api/teachers/:id/students
// GET /api/students/:id/progress
// POST /api/quiz-results
import { getStudentsByTeacher } from './controllers/userController.js';
import { getStudentProgress } from './controllers/progressController.js';
import { submitQuizResult } from './controllers/quizController.js';
import { validateQuizResult } from './middleware/validation.js';

app.get('/api/teachers/:id/students', getStudentsByTeacher);
app.get('/api/students/:id/progress', getStudentProgress);
app.post('/api/quiz-results', validateQuizResult, submitQuizResult);

// 3. Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// 4. Start Server & MySQL Connection Watcher
let server = null;

export function startServer(port = PORT) {
  startConnectionWatcher(8000);

  server = app.listen(port, HOST, () => {
    const dbStatus = getDatabaseStatus();
    console.log(`
================================================================
     🌸 PALASH VANI — Node.js Backend API Server Started 🌸
================================================================
  ✓ Local API Server:   http://${HOST}:${port}
  ✓ Health Endpoint:    http://${HOST}:${port}/api/health
  ✓ MySQL Database:     ${dbStatus.host}:${dbStatus.port}/${dbStatus.database}
  ✓ Database Mode:      ${dbStatus.connected ? '🟢 CONNECTED' : '🟡 OFFLINE DATABASE MODE'}
  ✓ Translation Status: 100% Local & Offline (Independent of DB)
================================================================
`);
  });

  return server;
}

export function stopServer() {
  stopConnectionWatcher();
  if (server) {
    server.close();
    server = null;
  }
}

// Auto-start when executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startServer(PORT);

  process.on('SIGINT', () => {
    console.log('\n[API Server] Shutting down gracefully...');
    stopServer();
    process.exit(0);
  });
  process.on('SIGTERM', () => {
    stopServer();
    process.exit(0);
  });
}

export default app;
