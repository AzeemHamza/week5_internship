import { motion } from 'framer-motion';

const techs = [
  'React', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Python', 'Docker',
  'Kubernetes', 'Azure', 'Git', 'GitHub Actions', 'PostgreSQL', 'MongoDB',
  'Java', 'C++', 'FastAPI', 'Pandas', 'Scikit-learn', 'Figma',
];

export default function TechMarquee() {
  return (
    <section className="py-10 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"
      >
        Technologies I Use
      </motion.h2>
      <div className="relative">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {[...techs, ...techs].map((tech, i) => (
            <span
              key={i}
              className="px-5 py-2 bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}