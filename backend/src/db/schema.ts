/**
 * Database Schema Definitions
 * SQLite table definitions for CANDIDATE and CV_DOCUMENT
 * Based on ER diagram from specs/data-model.md
 */

export const CANDIDATE_TABLE = `
  CREATE TABLE IF NOT EXISTS CANDIDATE (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL CHECK (length(name) <= 100),
    email TEXT NOT NULL UNIQUE CHECK (length(email) > 0),
    phone TEXT NOT NULL CHECK (length(phone) > 0),
    age INTEGER NOT NULL CHECK (age >= 18 AND age <= 99),
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    english_level TEXT NOT NULL CHECK (
      english_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')
    ),
    status TEXT NOT NULL DEFAULT 'IN_REVIEW' CHECK (
      status IN ('IN_REVIEW', 'ACCEPTED', 'REJECTED')
    ),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

export const CV_DOCUMENT_TABLE = `
  CREATE TABLE IF NOT EXISTS CV_DOCUMENT (
    id TEXT PRIMARY KEY NOT NULL,
    candidate_id TEXT NOT NULL UNIQUE,
    file_name TEXT NOT NULL CHECK (length(file_name) <= 255),
    file_path TEXT NOT NULL,
    file_size_bytes INTEGER NOT NULL CHECK (file_size_bytes <= 5242880),
    mime_type TEXT NOT NULL CHECK (mime_type = 'application/pdf'),
    uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES CANDIDATE(id) ON DELETE CASCADE
  );
`;

export const CREATE_INDICES = `
  CREATE INDEX IF NOT EXISTS idx_candidate_email ON CANDIDATE(email);
  CREATE INDEX IF NOT EXISTS idx_candidate_country ON CANDIDATE(country);
  CREATE INDEX IF NOT EXISTS idx_candidate_city ON CANDIDATE(city);
  CREATE INDEX IF NOT EXISTS idx_candidate_english_level ON CANDIDATE(english_level);
  CREATE INDEX IF NOT EXISTS idx_candidate_status ON CANDIDATE(status);
  CREATE INDEX IF NOT EXISTS idx_cv_document_candidate_id ON CV_DOCUMENT(candidate_id);
`;

/**
 * Initialize database schema
 * Creates tables and indices if they don't already exist
 * @param db SQLite database connection
 */
export const initializeSchema = (db: any): void => {
  try {
    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON;');

    // Create tables
    db.run(CANDIDATE_TABLE);
    db.run(CV_DOCUMENT_TABLE);

    // Create indices for better query performance
    const indices = CREATE_INDICES.split(';').filter((stmt: string) => stmt.trim());
    indices.forEach((index: string) => {
      if (index.trim()) {
        db.run(index);
      }
    });

    console.log('✓ Database schema initialized successfully');
  } catch (error) {
    console.error('✗ Error initializing database schema:', error);
    throw error;
  }
};
