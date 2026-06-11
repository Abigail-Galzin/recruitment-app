/**
 * Upload Middleware Configuration
 * Multer setup for handling file uploads
 */

import multer, { StorageEngine } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Request, Response, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../public/uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}.pdf`;
    cb(null, uniqueName);
  },
});

// Configure file filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('INVALID_FILE_TYPE'));
  }
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5242880, // 5MB
  },
}).single('cv_file');

/**
 * Middleware wrapper to intercept and format Multer errors
 */
export const uploadMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  upload(req, res, (err: any) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({
          success: false,
          error: 'File size limit exceeded. Maximum allowed size is 5MB.',
        });
        return;
      }

      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        res.status(400).json({
          success: false,
          error: 'You have exceeded the maximum number of files allowed.',
        });
        return;
      }

      if (err.message === 'INVALID_FILE_TYPE') {
        res.status(400).json({
          success: false,
          error: 'Invalid file type. Only PDF documents are accepted.',
        });
        return;
      }

      res.status(400).json({
        success: false,
        error: 'An error occurred during file upload.',
        details: err.message,
      });
      return;
    }

    next();
  });
};
