import express from 'express';
import { getDatabaseStatus } from '../config/database.js';

const router = express.Router();

router.get('/health', (req, res) => {
  const dbStatus = getDatabaseStatus();

  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: {
      connected: dbStatus.connected,
      mode: dbStatus.connected ? 'mysql-connected' : 'offline-database-mode',
      host: dbStatus.host,
      port: dbStatus.port,
      name: dbStatus.database,
      note: dbStatus.connected 
        ? 'XAMPP MySQL is active and synchronized' 
        : 'XAMPP MySQL is offline. Application uses local offline cache.'
    },
    translationEngine: {
      status: 'offline-ready',
      location: 'local-in-memory',
      requiresDatabase: false,
      languages: ['santhali', 'ho', 'mundari'],
      scripts: ['olchiki', 'warangchiti', 'devanagari']
    },
    uptimeSeconds: Math.round(process.uptime()),
    memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
  });
});

router.get('/languages', (req, res) => {
  res.json({
    success: true,
    data: [
      { code: 'sat', name: 'Santhali', native_name: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki' },
      { code: 'hoc', name: 'Ho', native_name: '𑢹𑣉𑣉 / हो', script: 'Warang Chiti / Devanagari' },
      { code: 'unr', name: 'Mundari', native_name: 'मुण्डारी', script: 'Devanagari' },
      { code: 'hin', name: 'Hindi', native_name: 'हिन्दी', script: 'Devanagari' },
      { code: 'eng', name: 'English', native_name: 'English', script: 'Latin' }
    ]
  });
});

export default router;
