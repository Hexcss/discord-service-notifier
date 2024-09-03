# Discord Service Notifier

Notifier API is a Node.js-based service designed to handle webhook events from various sources such as GitHub, Jenkins, and SonarQube. The API processes these events and sends notifications to a designated Discord channel.

## Features

- **GitHub Integration**: Receives webhook events from GitHub, processes the payload, and sends formatted notifications to Discord.
- **Security Audits**: Automatically runs security audits on Docker images using Dockle.
- **Extensible**: Future integrations planned for Jenkins and SonarQube.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 16 or higher is recommended).
- **Docker**: Docker should be installed to build and scan Docker images.
- **GitHub Account**: Required for setting up GitHub Actions.
- **Discord Webhook URL**: You'll need a Discord webhook URL to send notifications.

### Installation

1. Clone the repository:
   ```bash
   git https://github.com/Hexcss/discord-service-notifier.git
   cd discord-service-notifier
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables: Create a .env file in the root directory and add the following:
    ```bash
    PORT=3000
    DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-id/your-webhook-token
    ```

## Running the API

To start the server in development mode, use:
  ```bash
  npm run dev
  ```
To start the server in production mode, use:
  ```bash
  npm run start
  ```

## Health Check

You can verify that the API is running by accessing the health check endpoint:
  ```bash
  GET http://localhost:3000/api/health
  ```

Expected response:
  ```json
  {
    "status": "ok",
    "message": "API is up and running",
    "uptime": 123.456,
    "timestamp": "2024-09-03T12:34:56.789Z"
  }

  ```

## GitHub Webhook

To set up the GitHub webhook:

  1. Navigate to your GitHub repository.
  2. Go to **Settings > Webhooks > Add webhook**.
  3. Set the Payload URL to **http://your-domain.com/api/webhook**.
  4. Set Content type to **application/json**.
  5. Choose events that trigger the webhook (e.g., **push**, **pull_request**).

## CI/CD with GitHub Actions

This project includes a GitHub Actions workflow that automatically formats code using Prettier and checks for linting errors with ESLint on every push to **master** or **develop** branches.

Add the following secrets in your GitHub repository:
    **DOCKER_USERNAME**: Your Docker Hub username.
    **DOCKER_TOKEN**: Docker Hub Access Token generated from your Docker Hub account.

The workflow is defined in *.github/workflows/ci.yml*.

## Security Audits with Dockle

The project includes a GitHub Actions workflow that builds your Docker image and runs security audits using Dockle.

To enable this, ensure that the necessary secrets are set up in your repository and that the Docker image is built and scanned during the CI process

## Swagger API Documentation

API documentation is available and served using Swagger. You can access the docs by navigating to:

  ```bash
  GET http://localhost:3000/docs
  ```

## Future Integrations

- **Jenkins:** Planned support for receiving Jenkins job results and sending notifications to Discord.
- **SonarQube:** Planned support for processing SonarQube analysis results and sending notifications to Discord.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

  1. Fork the Project
  2. Create your Feature Branch (*git checkout -b feature/AmazingFeature*)
  3. Commit your Changes (*git commit -m 'Add some AmazingFeature'*)
  4. Push to the Branch (*git push origin feature/AmazingFeature*)
  5. Open a Pull Request

## License

Distributed under the MIT License. See *LICENSE* for more information.
