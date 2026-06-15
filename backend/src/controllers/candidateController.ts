/**
 * Candidate Controller
 * Handles candidate registration and retrieval
 */
import { Request, Response } from 'express';
import { validateCandidateFields, validateFileUpload } from '../validators/candidateValidator.js';
import { CandidateService } from '../services/candidateService.js';

export class CandidateController {
  candidateService: CandidateService;

  constructor(candidateService: CandidateService) {
    this.candidateService = candidateService;
  }

  /**
   * Create a new candidate with CV upload
   * POST /api/candidates
   */
  createCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
      const fieldValidation = validateCandidateFields(req.body);

      if (!fieldValidation.valid) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: fieldValidation.errors,
        });
        return;
      }

      if (!req.file) {
        res.status(400).json({
          success: false,
          error: 'PDF file is required',
        });
        return;
      }

      const fileValidation = validateFileUpload(req.file);
      if (!fileValidation.valid) {
        res.status(400).json({
          success: false,
          error: fileValidation.error,
        });
        return;
      }

      const createdCandidate = await this.candidateService.registerCandidate({
        ...req.body,
        file: req.file
      })

      if (!createdCandidate) {
        res.status(500).json({
          success: false,
          error: 'Internal error',
        });
        return;
      }

      res.status(201).json({
        success: true,
        message: 'Candidate registration successful',
        data: createdCandidate,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('✗ Error creating candidate:', message);
      res.status(500).json({
        success: false,
        error: 'Failed to register candidate',
        details: message,
      });
    }
  };

  /**
   * Get all candidates with optional filters
   * GET /api/candidates?country=...&city=...&english_level=...
   */
  getCandidates = async (req: Request, res: Response): Promise<void> => {
    try {
      const { country, city, english_level } = req.query;

      const filters = {
        country: typeof country === 'string' ? country : undefined,
        city: typeof city === 'string' ? city : undefined,
        english_level: typeof english_level === 'string' ? english_level : undefined,
      };

      const candidates = await this.candidateService.getAllCandidates(filters);

      res.status(200).json({
        data: candidates,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('✗ Error fetching candidates:', message);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch candidates',
        details: message,
      });
    }
  };

  /**
   * Update candidate status
   * PUT /api/candidates/:id/status
   */
  updateCandidateStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['IN_REVIEW', 'ACCEPTED', 'REJECTED'];
      if (!status || !validStatuses.includes(status)) {
        res.status(400).json({
          success: false,
          error: 'Invalid status value',
          details: `Status must be one of: ${validStatuses.join(', ')}`,
        });
        return;
      }

      const updatedCandidate = await this.candidateService.updateCandidateStatus(id.toString(), status);

      if (!updatedCandidate) {
        res.status(404).json({
          success: false,
          error: 'Candidate not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Candidate status updated successfully',
        data: updatedCandidate,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('✗ Error updating candidate status:', message);
      res.status(500).json({
        success: false,
        error: 'Failed to update candidate status',
        details: message,
      });
    }
  };
}
