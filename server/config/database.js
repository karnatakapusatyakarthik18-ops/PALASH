/**
 * PALASH VANI — Database Configuration & Connection Pool
 * Supports local XAMPP MySQL / MariaDB with automatic offline detection & reconnect
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: process.env.DB_NAME || 'palash',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
};

let pool = null;
let isDbConnected = false;
let lastError = null;
let checkTimer = null;

try {
  pool = mysql.createPool(config);
} catch (e) {
  console.warn('[Database Pool Init Note]:', e.message);
}

/**
 * Tests connection to MySQL / MariaDB server
 */
export async function testConnection() {
  if (!pool) {
    isDbConnected = false;
    lastError = 'Pool not initialized';
    return false;
  }

  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();

    if (!isDbConnected) {
      console.log(`[Database] 🟢 Connected to XAMPP MySQL (${config.host}:${config.port}/${config.database})`);
    }
    isDbConnected = true;
    lastError = null;
    return true;
  } catch (err) {
    if (isDbConnected || lastError === null) {
      console.log(`[Database] 🟡 MySQL not connected (${err.code || err.message}). Operating in OFFLINE DATABASE MODE.`);
    }
    isDbConnected = false;
    lastError = err.code || err.message;
    return false;
  }
}

/**
 * Start recurring background health checks to auto-detect XAMPP when started
 */
export function startConnectionWatcher(intervalMs = 8000) {
  if (checkTimer) clearInterval(checkTimer);
  testConnection();
  checkTimer = setInterval(() => {
    testConnection();
  }, intervalMs);
}

export function stopConnectionWatcher() {
  if (checkTimer) {
    clearInterval(checkTimer);
    checkTimer = null;
  }
}

export function isConnected() {
  return isDbConnected;
}

export function getDatabaseStatus() {
  return {
    connected: isDbConnected,
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    lastError
  };
}

export { pool };
export default {
  pool,
  testConnection,
  isConnected,
  getDatabaseStatus,
  startConnectionWatcher,
  stopConnectionWatcher
};
