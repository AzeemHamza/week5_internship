import { motion } from 'framer-motion';

const events = [
  {
    year: '2023 – Present',
    title: 'B.S. Computer Science',
    org: 'COMSATS University Islamabad, Lahore Campus',
    desc: 'Currently pursuing a degree in Computer Science with a focus on software engineering, algorithms, and machine learning.',
  },
  {
    year: '2021 – 2023',
    title: 'Intermediate (Pre-Engineering)',
    org: 'Punjab Group of Colleges (PGC)',
    desc: 'Completed intermediate with a strong foundation in mathematics, physics, and computer science.',
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="py-16">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-10"
      >
        Experience & Education
      </motion.h2>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-indigo-200 dark:bg-indigo-500/30" />
        {events.map((evt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`relative flex items-start mb-10 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            <div className="hidden md:block w-1/2" />
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white dark:border-dark-900 z-10" />
            <div className="ml-10 md:ml-0 md:w-1/2 bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-xl p-5 shadow-sm">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{evt.year}</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{evt.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{evt.org}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{evt.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}