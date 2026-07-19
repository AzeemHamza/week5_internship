import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProjectModal from './ProjectModal';
import { mockProjects } from '../api/mockData';

const featuredIds = [5, 6, 7, 8]; // IDs of projects to showcase (your new ones)

export default function FeaturedCarousel() {
  const featured = mockProjects.filter((p) => featuredIds.includes(p.id));
  const [current, setCurrent] = useState(0);
  const [modal, setModal] = useState(null);

  const next = () => setCurrent((prev) => (prev + 1) % featured.length);
  const prev = () => setCurrent((prev) => (prev - 1 + featured.length) % featured.length);

  if (featured.length === 0) return null;

  const project = featured[current];

  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">
        Featured Projects
      </h2>
      <div className="relative max-w-5xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            onClick={() => setModal(project)}
          >
            <img src={project.image} alt={project.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-dark-800/80 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-dark-700 shadow"
          aria-label="Previous project"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-dark-800/80 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-dark-700 shadow"
          aria-label="Next project"
        >
          <FiChevronRight size={24} />
        </button>
        <div className="flex justify-center mt-6 gap-2">
          {featured.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === current ? 'w-8 bg-indigo-500' : 'w-2 bg-gray-300 dark:bg-dark-600'
              }`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
}