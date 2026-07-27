import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectModal from './ProjectModal';

export default function ProjectCard({ project }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setModalOpen(true)}
        className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl overflow-hidden cursor-pointer"
      >
        <img src={project.image} alt={project.name} loading="lazy" className="w-full h-48 object-cover" />
        <div className="p-5">
          <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">{project.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs rounded-full bg-indigo-100/50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {modalOpen && <ProjectModal project={project} onClose={() => setModalOpen(false)} />}
    </>
  );
}