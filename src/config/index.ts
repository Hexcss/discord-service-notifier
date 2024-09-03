import dotenv from 'dotenv';
import { ensureMandatoryEnvVariable } from '../utils/functions';

dotenv.config();

export const environment = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  discordWebhookUrl: ensureMandatoryEnvVariable(
    process.env.DISCORD_WEBHOOK_URL,
    'DISCORD_WEBHOOK_URL'
  ),
};
