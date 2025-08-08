import { useState } from 'react';
import { RepositoryCard } from './components/RepositoryCard';
import { useTopicSearch } from './hooks/useTopicSearch';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';

export default function App() {
  const [topic, setTopic] = useState('');
  const { repositories, loading, error, hasMore, searchTopic, loadMore } = useTopicSearch();
  const { setTarget } = useInfiniteScroll(loadMore, hasMore && !loading);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      searchTopic(topic.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          GitHub Topics Explorer
        </h1>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                Topic
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter a topic (e.g., react)"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="max-w-xl mx-auto mb-8 bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.html_url} repository={repo} />
          ))}
        </div>

        {repositories.length === 0 && !loading && !error && (
          <p className="text-center text-gray-500 mt-8">
            No repositories found. Try searching for a topic!
          </p>
        )}

        {hasMore && (
          <div
            ref={setTarget}
            className="py-4 text-center text-gray-500"
          >
            {loading ? 'Loading more repositories...' : ''}
          </div>
        )}
      </div>
    </div>
  );
} 