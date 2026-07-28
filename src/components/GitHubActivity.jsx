import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiExternalLink, FiFolder } from 'react-icons/fi';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';

export default function GitHubActivity() {
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/AzeemHamza/repos?sort=updated&per_page=6');
        if (!res.ok) throw new Error('GitHub API request failed');
        const data = await res.json();
        // filter out forks if you want, or keep them
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <section className="py-16">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center"
      >
        Latest GitHub Repositories
      </motion.h2>

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && repos && repos.length === 0 && (
        <EmptyState message="No public repositories yet." />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {repos?.map((repo) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl p-6 flex flex-col hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <FiFolder className="text-indigo-500 mt-1" size={18} />
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1">
                    <FiStar size={14} /> {repo.stargazers_count}
                  </span>
                )}
                <FiExternalLink size={14} />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 truncate">
              {repo.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 line-clamp-3">
              {repo.description || 'No description provided.'}
            </p>
            {repo.language && (
              <span className="mt-4 self-start px-3 py-1 text-xs rounded-full bg-indigo-100/50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
                {repo.language}
              </span>
            )}
          </motion.a>
        ))}
      </div>

      {!loading && !error && repos && repos.length > 0 && (
        <div className="text-center mt-8">
          <a
            href={`https://github.com/AzeemHamza?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            View all repositories on GitHub <FiExternalLink size={14} />
          </a>
        </div>
      )}
    </section>
  );
}