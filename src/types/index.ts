export interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  owner: {
    login: string;
  };
}

export interface TopicSearchResponse {
  items: Repository[];
  total_count: number;
} 