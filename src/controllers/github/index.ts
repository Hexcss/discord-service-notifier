import { Request, Response } from 'express';
import { githubWebhookService } from '../../services/github';

class GithubWebhookController {
  public async handleWebhook(req: Request, res: Response): Promise<void> {
    const payload = req.body;

    try {
      await githubWebhookService.processWebhook(payload);
      res.status(200).send('Webhook processed successfully');
    } catch (error) {
      if (error instanceof Error) {
        let statusCode: number;

        switch (true) {
          case error.message.includes('Bad request'):
            statusCode = 400;
            break;
          case error.message.includes('Unauthorized'):
            statusCode = 401;
            break;
          case error.message.includes('Forbidden'):
            statusCode = 403;
            break;
          case error.message.includes('Not found'):
            statusCode = 404;
            break;
          case error.message.includes('Internal server error'):
            statusCode = 500;
            break;
          case error.message.includes('service unavailable'):
            statusCode = 503;
            break;
          default:
            statusCode = 500;
            console.error('Unexpected error message:', error.message);
        }

        res.status(statusCode).send(error.message);
      } else {
        console.error('Unknown error occurred:', error);
        res.status(500).send('Internal Server Error');
      }
    }
  }
}

export const githubWebhookController = new GithubWebhookController();
