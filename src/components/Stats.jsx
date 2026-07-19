import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useInView, animate } from 'framer-motion';
import { mockProjects } from '../api/mockData';

function AnimatedCounter({ end, duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, end, {
      duration,
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [inView, end, duration, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats() {
  // Compute stats from actual project data
  const projectsCount = mockProjects.length;
  const uniqueTechs = new Set(mockProjects.flatMap((p) => p.technologies));
  const technologiesCount = uniqueTechs.size;

  const stats = [
    { label: 'Projects Completed', value: projectsCount },
    { label: 'Technologies Used', value: technologiesCount },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-dark-800/50 rounded-2xl my-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto px-4 text-center">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-4"
          >
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              <AnimatedCounter end={s.value} />
            </p>
            <p className="text-gray-600 dark:text-gray-400">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}