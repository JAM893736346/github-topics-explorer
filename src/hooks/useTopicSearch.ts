import { useState, useCallback } from 'react';
import { Repository } from '../types';
import { searchRepositoriesByTopic } from '../services/github';

export const useTopicSearch = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentTopic, setCurrentTopic] = useState('');

  const searchTopic = async (topic: string) => {
    setLoading(true);
    setError(null);
    setCurrentTopic(topic);
    setCurrentPage(1);
    setHasMore(true);
    
    try {
      const response = await searchRepositoriesByTopic(topic, 1);
      setRepositories(response.items);
      setHasMore(response.items.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching repositories');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (!currentTopic || loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await searchRepositoriesByTopic(currentTopic, nextPage);
      
      if (response.items.length === 0) {
        setHasMore(false);
      } else {
        setRepositories(prev => [...prev, ...response.items]);
        setCurrentPage(nextPage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching more repositories');
    } finally {
      setLoading(false);
    }
  }, [currentTopic, currentPage, loading, hasMore]);

  return {
    repositories,
    loading,
    error,
    hasMore,
    searchTopic,
    loadMore
  };
}; 