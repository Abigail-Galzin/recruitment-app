import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { initializeDatabase } from './db/connection.js';
import { fileURLToPath } from 'url';
import candidateRoutes from './routes/candidates.js';

const app = express();
const PORT = 5000;

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/candidates', candidateRoutes);

// Health Check Endpoint
app.get('/health', (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'ok',
    message: 'Recruitment Web App Backend is running',
    timestamp: new Date().toISOString(),
  });
});

const startServer = async (): Promise<void> => {
  try {
    await initializeDatabase();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('✗ Failed to initialize database on startup:', message);
    process.exit(1);
  }

  app.listen(PORT, (): void => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Health check: http://localhost:${PORT}/health`);
  });
};

startServer();
