import { Repository } from '../types';
import { StarIcon } from '@heroicons/react/24/solid';

interface RepositoryCardProps {
  repository: Repository;
}

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              {repository.owner.login}/{repository.name}
            </a>
          </h3>
          <p className="mt-2 text-gray-600">
            {repository.description || 'No description available'}
          </p>
        </div>
        <div className="flex items-center text-gray-700">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span className="ml-1 font-medium">{repository.stargazers_count.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}; 