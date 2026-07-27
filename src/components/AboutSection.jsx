import { motion } from 'framer-motion';
import { FiUser, FiBookOpen, FiAward } from 'react-icons/fi';

export default function AboutSection({ profile }) {
  return (
    <section id="about" className="py-16">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-10"
      >
        About Me
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl p-6"
        >
          <FiUser className="text-indigo-500 text-2xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Background</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {profile?.bio || "I'm a Computer Science student at COMSATS University Islamabad, Lahore Campus, actively seeking internships in software development and data science."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl p-6"
        >
          <FiBookOpen className="text-indigo-500 text-2xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Education</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            B.S. Computer Science – COMSATS University Islamabad, Lahore Campus (ongoing).<br />
            Intermediate (Pre-Engineering) – Punjab Group of Colleges (PGC).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl p-6"
        >
          <FiAward className="text-indigo-500 text-2xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Goals</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Secure a challenging internship where I can apply my skills in full‑stack development, backend engineering, and data analysis to real‑world projects.
          </p>
        </motion.div>
      </div>
    </section>
  );
}