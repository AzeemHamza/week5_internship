import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function ProjectCard({ project }) {
  return (
    <div className="group bg-dark-800 rounded-2xl overflow-hidden border border-dark-700 hover:border-dark-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format'}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {project.category && (
          <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-xs text-gray-200 px-3 py-1 rounded-full">
            {project.category}
          </span>
        )}
      </div>

      <div className="p-5 space-y-4">
        <h3 className="text-xl font-semibold text-white">{project.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs rounded-full bg-dark-700 text-indigo-300 border border-dark-600">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition">
              <FiGithub /> Code
            </a>
          )}
          {project.liveDemo && (
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition">
              <FiExternalLink /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}