/**
 * Database Connection Module
 * Singleton pattern for SQLite database connection
 */

import sqlite3 from 'sqlite3';
import path from 'path';
import { initializeSchema } from './schema.js';
import { fileURLToPath } from 'url';

let dbInstance: sqlite3.Database | null = null;

const getDbPath = (): string => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  return path.join(currentDir, '../../data/recruitment.db');
};

const openDatabase = (): Promise<sqlite3.Database> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(getDbPath(), (err: Error | null) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
};

/**
 * Open the database connection and initialize schema tables on startup
 */
export const initializeDatabase = async (): Promise<void> => {
  if (dbInstance) {
    return;
  }

  const dbPath = getDbPath();

  try {
    dbInstance = await openDatabase();
    console.log(`✓ Connected to SQLite database at ${dbPath}`);
    //dbInstance.run('PRAGMA foreign_keys = ON;');
    await initializeSchema(dbInstance);
  } catch (error) {
    dbInstance = null;
    throw error;
  }
};

/**
 * Get the database connection (singleton pattern)
 * @returns SQLite database connection instance
 */
export const getDatabase = (): sqlite3.Database => {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call initializeDatabase() before using the database.');
  }

  return dbInstance;
};

/**
 * Close the database connection
 */
export const closeDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!dbInstance) {
      resolve();
      return;
    }

    dbInstance.close((err: Error | null) => {
      if (err) {
        console.error('✗ Error closing database:', err.message);
        reject(err);
      } else {
        console.log('✓ Database connection closed');
        dbInstance = null;
        resolve();
      }
    });
  });
};

/**
 * Run a database query (for INSERT, UPDATE, DELETE operations)
 * @param sql SQL query string
 * @param params Query parameters
 * @returns Promise resolving with the result
 */
export const runQuery = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.run(sql, params, function (err: Error | null) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });
};

/**
 * Get a single row from the database
 * @param sql SQL query string
 * @param params Query parameters
 * @returns Promise resolving with a single row or null
 */
export const getRow = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.get(sql, params, (err: Error | null, row: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(row || null);
      }
    });
  });
};

/**
 * Get all rows from the database
 * @param sql SQL query string
 * @param params Query parameters
 * @returns Promise resolving with an array of rows
 */
export const getAllRows = (sql: string, params: any[] = []): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.all(sql, params, (err: Error | null, rows: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
};
