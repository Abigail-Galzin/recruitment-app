/**
 * Candidate Routes
 * Endpoints for candidate registration and retrieval
 */

import { Router } from 'express';
import { CandidateController } from '../controllers/candidateController.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';
import { CandidateService } from '../services/candidateService.js';

const router = Router();
const candidateController = new CandidateController(new CandidateService());

/**
 * POST /api/candidates
 * Create a new candidate with CV upload
 */
router.post('/', uploadMiddleware, candidateController.createCandidate);

/**
 * GET /api/candidates
 * Get all candidates with optional filters
 */
router.get('/', candidateController.getCandidates);

/**
 * PUT /api/candidates/:id/status
 * Update candidate status
 */
router.put('/:id/status', candidateController.updateCandidateStatus);

export default router;
