export interface GithubWebhookBody {
  repository: {
    name: string;
    pushed_at: string;
  };
  pusher: {
    name: string;
  };
  sender: {
    avatar_url: string;
  };
  ref: string;
  commits: {
    message: string;
    author: {
      name: string;
    };
  }[];
  deleted: boolean;
  created: boolean;
}

export interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordEmbed {
  title: string;
  description?: string;
  url?: string;
  color?: number;
  author?: {
    name: string;
    icon_url?: string;
  };
  fields?: DiscordEmbedField[];
  thumbnail?: {
    url: string;
  };
  image?: {
    url: string;
  };
  footer?: {
    text: string;
  };
  timestamp?: string;
}

export interface DiscordWebhookMessage {
  embeds: DiscordEmbed[];
}
