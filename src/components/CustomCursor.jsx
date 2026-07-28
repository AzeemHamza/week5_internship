import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(window.innerWidth / 2);
  const cursorY = useMotionValue(window.innerHeight / 2);
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
    if ('ontouchstart' in window) return; // hide on touch devices

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handlePointerOver = (e) => {
      const target = e.target;
      const tag = target.tagName?.toLowerCase();
      const role = target.getAttribute('role');
      const isInteractive =
        tag === 'button' ||
        tag === 'a' ||
        tag === 'input' ||
        tag === 'select' ||
        tag === 'textarea' ||
        role === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('button, a, [role="button"]');
      setIsPointer(!!isInteractive);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handlePointerOver);
    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) setIsPointer(false);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handlePointerOver);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          width: isPointer ? 40 : 16,
          height: isPointer ? 40 : 16,
          borderRadius: '50%',
          backgroundColor: '#fff',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </motion.div>
  );
}