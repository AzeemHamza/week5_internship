import { motion } from 'framer-motion';
import { FiCode, FiBarChart2, FiShield, FiMonitor } from 'react-icons/fi';

const services = [
  {
    icon: <FiCode size={28} />,
    title: 'Web Development',
    desc: 'Building fast, responsive websites and web applications using React, Node.js, and modern frameworks.',
  },
  {
    icon: <FiBarChart2 size={28} />,
    title: 'Data Analysis',
    desc: 'Transforming raw data into actionable insights with Python, SQL, and interactive dashboards.',
  },
  {
    icon: <FiShield size={28} />,
    title: 'Information Security',
    desc: 'Implementing secure systems, encryption algorithms, and basic vulnerability assessments.',
  },
  {
    icon: <FiMonitor size={28} />,
    title: 'UI/UX Design',
    desc: 'Crafting intuitive interfaces with a focus on accessibility, usability, and clean design.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-10"
      >
        Services
      </motion.h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-2xl p-6 hover:border-indigo-500 transition-colors"
          >
            <div className="text-indigo-600 dark:text-indigo-400 mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}