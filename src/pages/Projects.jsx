import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import useFetch from '../hooks/useFetch';
import { fetchProjects } from '../api/portfolio';
import useDebounce from '../hooks/useDebounce';
import ProjectCard from '../components/ProjectCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { FiSearch, FiGrid, FiList, FiX, FiMic, FiMicOff } from 'react-icons/fi';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

// ---------- Voice Search ----------
function VoiceSearch({ onResult, active, setActive }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setListening(false);
      setActive(false);
    };
    recognitionRef.current.onerror = () => {
      setListening(false);
      setActive(false);
    };
    recognitionRef.current.onend = () => {
      setListening(false);
      setActive(false);
    };
  }, [onResult, setActive]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
      setActive(true);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`p-2.5 rounded-xl border transition-all ${
        listening
          ? 'bg-red-500 text-white border-red-500 animate-pulse'
          : 'bg-white/70 dark:bg-dark-800/70 border-gray-300 dark:border-dark-700 text-gray-500 hover:text-indigo-500'
      }`}
      aria-label="Search by voice"
    >
      {listening ? <FiMicOff size={18} /> : <FiMic size={18} />}
    </button>
  );
}

// ---------- Main Page ----------
export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [tech, setTech] = useState(searchParams.get('tech') || ''); // single tech filter
  const [viewMode, setViewMode] = useState(searchParams.get('view') || 'grid');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'default');
  const [voiceActive, setVoiceActive] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  // Fetch projects with all filters (tech as single value)
  const { data: projects, loading, error } = useFetch(
    () => fetchProjects({ search: debouncedSearch, category, tech }),
    [debouncedSearch, category, tech]
  );

  // URL sync
  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (tech) params.tech = tech;
    if (viewMode !== 'grid') params.view = viewMode;
    if (sortBy !== 'default') params.sort = sortBy;
    setSearchParams(params, { replace: true });
  }, [search, category, tech, viewMode, sortBy, setSearchParams]);

  // Extract unique values from all projects (for dropdowns)
  const allCategories = useMemo(
    () => [...new Set(projects?.map((p) => p.category).filter(Boolean))],
    [projects]
  );
  const allTechs = useMemo(
    () => [...new Set(projects?.flatMap((p) => p.technologies || []).filter(Boolean))],
    [projects]
  );

  // Sorting (local, after API response)
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

  const handleVoiceResult = useCallback((transcript) => {
    setSearch(transcript);
  }, []);

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <Helmet>
          <title>Projects – Hamza Azeem</title>
          <meta name="description" content="Explore my recent projects in software development, data science, and more." />
        </Helmet>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
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

        {/* Toolbar – search, category, technology, sort, view */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 mb-6"
        >
          {/* Search with voice */}
          <div className="relative w-full sm:flex-1 min-w-0 flex items-center gap-2">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search projects..."
              aria-label="Search projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-gray-300 dark:border-dark-700 rounded-xl text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2">
              <VoiceSearch onResult={handleVoiceResult} active={voiceActive} setActive={setVoiceActive} />
            </div>
          </div>

          {/* Dropdowns: category, technology, sort */}
          <div className="flex flex-wrap w-full sm:w-auto gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 sm:flex-none bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-gray-300 dark:border-dark-700 rounded-xl py-2.5 px-4 text-gray-900 dark:text-gray-200 text-sm"
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
              className="flex-1 sm:flex-none bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-gray-300 dark:border-dark-700 rounded-xl py-2.5 px-4 text-gray-900 dark:text-gray-200 text-sm"
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
              className="flex-1 sm:flex-none bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-gray-300 dark:border-dark-700 rounded-xl py-2.5 px-4 text-gray-900 dark:text-gray-200 text-sm"
              aria-label="Sort projects"
            >
              <option value="default">Sort: Default</option>
              <option value="name-asc">A‑Z</option>
              <option value="name-desc">Z‑A</option>
            </select>

            {/* View toggle */}
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
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 px-3 py-2 text-sm text-red-500 hover:text-red-400 transition-colors"
            >
              <FiX size={16} /> Clear
            </button>
          )}
        </motion.div>

        {/* States */}
        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && sortedProjects.length === 0 && (
          <EmptyState message="No projects found. Try adjusting filters." />
        )}

        {/* Projects grid/list */}
        <LayoutGroup>
          <motion.div
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
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
                    onTechClick={() => {}} // no action; tech is filtered via dropdown
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