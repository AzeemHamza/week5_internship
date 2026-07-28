import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeProvider';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const cursorX = useMotionValue(window.innerWidth / 2);
  const cursorY = useMotionValue(window.innerHeight / 2);
  const { darkMode } = useTheme();

  const springConfig = { damping: 18, stiffness: 400, mass: 0.35 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  // Color values based on theme
  const arrowColors = darkMode
    ? {
        gradientStart: '#FFFFFF',
        gradientEnd: '#C7D2FE',
        highlightStart: '#A5B4FC',
        highlightEnd: '#6366F1',
        stroke: 'rgba(255,255,255,0.4)',
        shadowDefault: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))',
        shadowPointer: 'drop-shadow(0 0 6px rgba(99, 102, 241, 0.6))',
        ringColor: 'rgba(99, 102, 241, 0.6)',
      }
    : {
        gradientStart: '#1F2937',
        gradientEnd: '#4B5563',
        highlightStart: '#6B7280',
        highlightEnd: '#374151',
        stroke: 'rgba(0,0,0,0.2)',
        shadowDefault: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))',
        shadowPointer: 'drop-shadow(0 0 5px rgba(79, 70, 229, 0.4))',
        ringColor: 'rgba(79, 70, 229, 0.6)',
      };

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
    if ('ontouchstart' in window) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.getAttribute('role') === 'button' ||
        target.closest('button, a, [role="button"]') !== null;
      setIsPointer(!!isInteractive);
    };

    const handleMouseOut = () => setIsPointer(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.head.removeChild(style);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y }}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        animate={{
          scale: isPointer ? 1.2 : 1,
          filter: isPointer
            ? arrowColors.shadowPointer
            : arrowColors.shadowDefault,
        }}
        transition={{ duration: 0.15 }}
      >
        <path
          d="M4 4L20 12L13 13L12 20L4 4Z"
          fill="url(#cursorGradient)"
          stroke={arrowColors.stroke}
          strokeWidth="0.5"
        />
        <path
          d="M5 5L18.5 12L13 13L12 18.5L5 5Z"
          fill="url(#cursorHighlight)"
          opacity="0.3"
        />
        <defs>
          <linearGradient id="cursorGradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor={arrowColors.gradientStart} />
            <stop offset="1" stopColor={arrowColors.gradientEnd} />
          </linearGradient>
          <linearGradient id="cursorHighlight" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor={arrowColors.highlightStart} stopOpacity="0.8" />
            <stop offset="1" stopColor={arrowColors.highlightEnd} stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.div
        className="absolute top-0 left-0 rounded-full border-2"
        style={{
          width: 36,
          height: 36,
          translateX: -6,
          translateY: -6,
          borderColor: arrowColors.ringColor,
        }}
        animate={{
          scale: isPointer ? 1 : 0.7,
          opacity: isPointer ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}