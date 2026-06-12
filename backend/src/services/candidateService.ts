import { v4 as uuidv4 } from 'uuid';
import { runQuery, getRow, getAllRows } from '../db/connection.js';
import { CandidateFilters, CreateCandidateData } from '../models/Candidate.js';
import { FilePDFData } from '../models/CVDocument.js';

export class CandidateService {
  /**
   * Register a candidate and CV
   */
  async registerCandidate(data: CreateCandidateData) {
    const { name, email, phone, age, country, city, english_level, file } = data;

    const existingCandidate = await getRow(
      'SELECT id FROM CANDIDATE WHERE email = ?',
      [email]
    );

    if (existingCandidate) {
      const error = new Error('Email already registered');
      (error as any).statusCode = 409;
      throw error;
    }

    const candidateId = uuidv4();
    const now = new Date().toISOString();

    const insertCandidateSQL = `
      INSERT INTO CANDIDATE (
        id, name, email, phone, age, country, city, english_level, status, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'IN_REVIEW', ?, ?)
    `;

    await runQuery(insertCandidateSQL, [
      candidateId,
      name.trim(),
      email.trim(),
      phone.trim(),
      Number(age),
      country.trim(),
      city.trim(),
      english_level.toUpperCase(),
      now,
      now,
    ]);

    await this.saveCVDocument(file, candidateId, now);

    return this.getCandidateById(candidateId);
  }

  /**
   * Save the CV document for a candidate
   */
  async saveCVDocument(file: FilePDFData, candidateId: string, now: string): Promise<void> {
    const cvDocumentId = uuidv4();
    const filePath = `/uploads/${file.filename}`;

    const insertCVSQL = `
      INSERT INTO CV_DOCUMENT (
        id, candidate_id, file_name, file_path, file_size_bytes, mime_type, uploaded_at
      )
      VALUES (?, ?, ?, ?, ?, 'application/pdf', ?)
    `;

    await runQuery(insertCVSQL, [
      cvDocumentId,
      candidateId,
      file.originalname,
      filePath,
      file.size,
      now,
    ]);
  }

  /**
   * Get a candidate by ID
   */
  async getCandidateById(id: string) {
    const row = await getRow(
      `SELECT c.*, cv.file_name, cv.file_path
       FROM CANDIDATE c
       LEFT JOIN CV_DOCUMENT cv ON c.id = cv.candidate_id
       WHERE c.id = ?`,
      [id]
    );

    if (!row) return null;

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      age: row.age,
      country: row.country,
      city: row.city,
      english_level: row.english_level,
      status: row.status,
      cv_file: {
        file_name: row.file_name,
        file_path: row.file_path,
      },
      created_at: row.created_at,
    };
  }

  /**
   * Get all candidates applyiing dynamic filters
   */
  async getAllCandidates(filters: CandidateFilters) {
    let sql = `
      SELECT c.*,
      CASE 
        WHEN cv.id IS NOT NULL THEN json_object('file_name', cv.file_name, 'file_path', cv.file_path)
        ELSE NULL
      END AS cv_document
      FROM CANDIDATE c
      LEFT JOIN CV_DOCUMENT cv ON c.id = cv.candidate_id
      WHERE 1=1
    `;

    const params: string[] = [];

    if (filters.country) {
      sql += ' AND LOWER(c.country) LIKE ?';
      params.push(`%${filters.country}%`);
    }
    if (filters.city) {
      sql += ' AND LOWER(c.city) LIKE ?';
      params.push(`%${filters.city}%`);
    }
    if (filters.english_level) {
      sql += ' AND c.english_level = ?';
      params.push(filters.english_level);
    }

    sql += ' ORDER BY c.created_at DESC';
    return await getAllRows(sql, params);
  }
}
