import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is up and running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
