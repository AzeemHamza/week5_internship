import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import useFetch from '../hooks/useFetch';
import { fetchProjects } from '../api/portfolio';
import useDebounce from '../hooks/useDebounce';
import ProjectCard from '../components/ProjectCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { FiSearch, FiGrid, FiList, FiX } from 'react-icons/fi';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

export default function Projects() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [tech, setTech] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');

  const debouncedSearch = useDebounce(search, 400);
  const debouncedTech = useDebounce(tech, 400);

  const { data: projects, loading, error } = useFetch(
    () => fetchProjects({ search: debouncedSearch, category, tech: debouncedTech }),
    [debouncedSearch, category, debouncedTech]
  );

  const allCategories = useMemo(
    () => [...new Set(projects?.map((p) => p.category).filter(Boolean))],
    [projects]
  );
  const allTechs = useMemo(
    () => [...new Set(projects?.flatMap((p) => p.technologies || []).filter(Boolean))],
    [projects]
  );

  const sortedProjects = useMemo(() => {
    if (!projects) return [];
    const sorted = [...projects];
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [projects, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setTech('');
    setSortBy('default');
  };

  const hasActiveFilters = search || category || tech || sortBy !== 'default';

  const handleTechClick = (techName) => {
    setTech(techName);
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Helmet>
          <title>Projects – Hamza Azeem</title>
          <meta name="description" content="Explore my recent projects in software development, data science, and more." />
        </Helmet>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore my work{' '}
            {sortedProjects.length > 0 && (
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                ({sortedProjects.length} {sortedProjects.length === 1 ? 'project' : 'projects'})
              </span>
            )}
          </p>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 mb-6"
        >
          <div className="relative flex-1 min-w-[200px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search projects..."
              aria-label="Search projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-gray-300 dark:border-dark-700 rounded-xl text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-gray-300 dark:border-dark-700 rounded-xl py-2.5 px-4 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-gray-300 dark:border-dark-700 rounded-xl py-2.5 px-4 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Filter by technology"
          >
            <option value="">All Technologies</option>
            {allTechs.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-gray-300 dark:border-dark-700 rounded-xl py-2.5 px-4 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Sort projects"
          >
            <option value="default">Sort: Default</option>
            <option value="name-asc">Name (A‑Z)</option>
            <option value="name-desc">Name (Z‑A)</option>
          </select>
          <div className="flex items-center rounded-xl bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-gray-300 dark:border-dark-700 overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-indigo-500 text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              aria-label="Grid view"
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-indigo-500 text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              aria-label="List view"
            >
              <FiList size={18} />
            </button>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 px-3 py-2 text-sm text-red-500 hover:text-red-400 transition-colors"
            >
              <FiX size={16} /> Clear filters
            </button>
          )}
        </motion.div>

        {/* Active tech filter chip */}
        {tech && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
              Tech: {tech}
              <button onClick={() => setTech('')} aria-label="Remove tech filter">
                <FiX size={14} />
              </button>
            </span>
          </div>
        )}

        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && sortedProjects.length === 0 && (
          <EmptyState message="No projects found. Try adjusting filters." />
        )}

        <LayoutGroup>
          <motion.div
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            }
          >
            <AnimatePresence mode="popLayout">
              {sortedProjects.map((project, idx) => (
                <motion.div
                  key={project.id || project._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <ProjectCard
                    project={project}
                    viewMode={viewMode}
                    onTechClick={handleTechClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </PageWrapper>
  );
}