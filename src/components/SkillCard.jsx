import { motion } from 'framer-motion';

export default function SkillCard({ skill }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.3, delay: skill.id * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="bg-dark-800 border border-dark-700 rounded-xl p-5"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-medium">{skill.name}</h3>
        <span className="text-sm text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-dark-700 rounded-full h-2">
        <motion.div
          className="bg-indigo-500 h-2 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}