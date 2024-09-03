import { Router } from 'express';
import { githubWebhookController } from '../../controllers/github';

const router: Router = Router();

router.post('/github/webhook', (req, res) =>
  githubWebhookController.handleWebhook(req, res)
);

export default router;
