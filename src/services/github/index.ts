import {
  GithubWebhookBody,
  DiscordWebhookMessage,
} from '../../utils/interfaces';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../config';
import { formatGitHubDiscordMessage } from '../../utils/functions/format';

class GithubWebhookService {
  public async processWebhook(payload: GithubWebhookBody): Promise<void> {
    const discordMessage: DiscordWebhookMessage =
      formatGitHubDiscordMessage(payload);
    await this.sendToDiscord(discordMessage);
  }

  private async sendToDiscord(message: DiscordWebhookMessage): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post(
        environment.discordWebhookUrl,
        message
      );
      this.handleDiscordResponse(response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        this.handleDiscordError(error.response);
      } else {
        console.error(
          'Unexpected error occurred while sending message to Discord:',
          error
        );
        throw new Error('Failed to send message to Discord');
      }
    }
  }

  private handleDiscordResponse(response: AxiosResponse): void {
    if (response.status >= 200 && response.status < 300) {
      console.log('Message sent successfully to Discord.');
    } else {
      console.warn(
        `Unexpected status code ${response.status} received from Discord.`
      );
    }
  }

  private handleDiscordError(response: AxiosResponse): void {
    const status = response.status;

    switch (status) {
      case 400:
        console.error(
          'Bad request: The request was unacceptable, often due to missing a required parameter.'
        );
        throw new Error('Bad request to Discord API');
      case 401:
        console.error('Unauthorized: The webhook URL or token is invalid.');
        throw new Error('Unauthorized access to Discord API');
      case 403:
        console.error(
          'Forbidden: The webhook does not have sufficient permissions.'
        );
        throw new Error('Forbidden access to Discord API');
      case 404:
        console.error('Not Found: The requested resource could not be found.');
        throw new Error('Discord webhook not found');
      case 500:
        console.error(
          'Internal Server Error: Discord API encountered an error.'
        );
        throw new Error('Discord API internal server error');
      case 502:
      case 503:
      case 504:
        console.error('Discord API is unavailable. Received status:', status);
        throw new Error('Discord API service unavailable');
      default:
        console.error(
          `Unexpected error: Received status ${status} from Discord.`
        );
        throw new Error(`Unexpected error from Discord: ${status}`);
    }
  }
}

export const githubWebhookService = new GithubWebhookService();
