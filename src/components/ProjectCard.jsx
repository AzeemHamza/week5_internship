import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal';
import { FiExternalLink, FiGithub, FiMaximize2 } from 'react-icons/fi';

const ProjectCard = memo(function ProjectCard({ project, viewMode = 'grid', onTechClick }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isGrid = viewMode === 'grid';

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02, y: -2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl overflow-hidden cursor-pointer transition-shadow hover:shadow-xl ${
          !isGrid ? 'flex flex-row items-center p-4 gap-4' : 'flex flex-col'
        }`}
        onClick={() => setModalOpen(true)}
      >
        {/* Image */}
        <div className={`relative ${isGrid ? 'w-full h-48' : 'w-24 h-24 flex-shrink-0'}`}>
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className={`w-full h-full object-cover ${!isGrid ? 'rounded-xl' : ''}`}
          />
          {isGrid && (
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalOpen(true);
                    }}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
                    aria-label="View details"
                  >
                    <FiMaximize2 size={18} />
                  </button>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
                      aria-label="Source code"
                    >
                      <FiGithub size={18} />
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
                      aria-label="Live demo"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Content */}
        <div className={`flex-1 ${isGrid ? 'p-5' : ''}`}>
          <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">{project.name}</h3>
          <p className={`text-gray-600 dark:text-gray-400 text-sm ${isGrid ? 'mb-4 line-clamp-3' : 'line-clamp-2'}`}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.map((tech) => (
              <button
                key={tech}
                onClick={(e) => {
                  e.stopPropagation();
                  onTechClick?.(tech);
                }}
                className="px-2 py-1 text-xs rounded-full bg-indigo-100/50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-500/20 transition-colors cursor-pointer"
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* List view quick actions */}
        {!isGrid && (
          <div className="flex items-center gap-2 ml-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                aria-label="Source code"
              >
                <FiGithub size={18} />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                aria-label="Live demo"
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        )}
      </motion.div>

      {modalOpen && <ProjectModal project={project} onClose={() => setModalOpen(false)} />}
    </>
  );
});

export default ProjectCard;