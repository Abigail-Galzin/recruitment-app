import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'ok',
    message: 'Recruitment Web App Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// Start Server
app.listen(PORT, (): void => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
});
