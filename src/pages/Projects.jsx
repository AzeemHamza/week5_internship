import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import useFetch from '../hooks/useFetch';
import { fetchProjects } from '../api/portfolio';
import useDebounce from '../hooks/useDebounce';
import ProjectCard from '../components/ProjectCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Projects() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [tech, setTech] = useState('');

  const debouncedSearch = useDebounce(search, 400);
  const debouncedTech = useDebounce(tech, 400);

  const { data: projects, loading, error } = useFetch(
    () => fetchProjects({ search: debouncedSearch, category, tech: debouncedTech }),
    [debouncedSearch, category, debouncedTech]
  );

  const allCategories = [...new Set(projects?.map((p) => p.category).filter(Boolean))];
  const allTechs = [...new Set(projects?.flatMap((p) => p.technologies || []).filter(Boolean))];

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Helmet>
          <title>Projects – Hamza Azeem</title>
          <meta name="description" content="Explore my recent projects in software development, data science, and more." />
        </Helmet>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">Explore my recent work</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search projects..."
              aria-label="Search projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-xl text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-xl py-2.5 px-4 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-xl py-2.5 px-4 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Filter by technology"
          >
            <option value="">All Technologies</option>
            {allTechs.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </motion.div>

        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && projects && projects.length === 0 && (
          <EmptyState message="No projects found. Try adjusting filters." />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <ProjectCard key={project.id || project._id} project={project} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}