/**
 * PALASH VANI — Parameterized Query Service
 * Guarantees zero SQL injection & safe execution when MySQL is offline
 */

import { pool, isConnected } from '../config/database.js';

export async function query(sql, params = []) {
  if (!isConnected() || !pool) {
    return {
      success: false,
      error: 'DATABASE_OFFLINE',
      message: 'Local XAMPP MySQL server is not connected. Operating in offline mode.',
      offline: true,
      rows: []
    };
  }

  try {
    const [rows, fields] = await pool.execute(sql, params);
    return {
      success: true,
      rows,
      fields,
      offline: false
    };
  } catch (error) {
    console.error(`[SQL Error] ${error.message} \nQuery: ${sql}`, params);
    return {
      success: false,
      error: error.code || 'SQL_ERROR',
      message: error.message,
      offline: false,
      rows: []
    };
  }
}

export async function execute(sql, params = []) {
  return query(sql, params);
}

export default {
  query,
  execute
};
