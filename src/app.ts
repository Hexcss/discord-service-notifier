import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import githubWebhookRoutes from './routes/github';
import healthRoutes from './routes/health';
import docsRoutes from './routes/docs';

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api', githubWebhookRoutes);
app.use('/api', healthRoutes);
app.use('/', docsRoutes);

export default app;
