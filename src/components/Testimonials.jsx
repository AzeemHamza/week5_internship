import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Khan',
    role: 'Senior Developer',
    text: 'Hamza is one of the most dedicated interns I have worked with. His ability to learn quickly and deliver quality work is impressive.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Fatima Ali',
    role: 'Project Manager',
    text: 'Working with Hamza was a pleasure. He took ownership of his tasks and consistently exceeded expectations.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    name: 'Usman Riaz',
    role: 'Tech Lead',
    text: 'Hamza shows great potential. His frontend skills and attention to detail made a real difference on our projects.',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center"
      >
        What People Say
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: t.id * 0.1 }}
            className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-2xl p-6 flex flex-col"
          >
            <div className="flex gap-1 mb-3 text-yellow-400">
              {[...Array(5)].map((_, i) => <FiStar key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-gray-600 dark:text-gray-400 flex-1 text-sm italic">"{t.text}"</p>
            <div className="mt-4 flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}