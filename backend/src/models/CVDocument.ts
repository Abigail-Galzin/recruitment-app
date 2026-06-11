/**
 * CV Document Model
 * TypeScript interface for the CV_DOCUMENT table
 */

export interface CVDocument {
  id: string;
  candidate_id: string;
  file_name: string;
  file_path: string;
  file_size_bytes: number;
  mime_type: string;
  uploaded_at: string;
}
export interface FilePDFData {
  filename: string;
  originalname: string;
  size: number;
}

export type CreateCVDocumentInput = Omit<CVDocument, 'uploaded_at'>;

export type CVDocumentResponse = CVDocument;
