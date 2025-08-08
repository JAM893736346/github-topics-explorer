import axios from 'axios';
import { TopicSearchResponse } from '../types';

const GITHUB_API_URL = 'https://api.github.com';
const PER_PAGE = 30; // GitHub API default per_page value

export const searchRepositoriesByTopic = async (
  topic: string,
  page: number = 1
): Promise<TopicSearchResponse> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/search/repositories`, {
      params: {
        q: `topic:${topic}`,
        sort: 'updated',
        order: 'desc',
        per_page: PER_PAGE,
        page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}; 