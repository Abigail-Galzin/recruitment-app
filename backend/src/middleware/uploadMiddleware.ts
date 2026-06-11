/**
 * Upload Middleware Configuration
 * Multer setup for handling file uploads
 */

import multer, { StorageEngine, Multer } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are accepted'));
  }
};

// Create multer instance
const upload: Multer = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5242880, // 5MB
  },
});

export const uploadMiddleware = upload.single('cv_file');
