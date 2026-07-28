import { useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
const DISCO_CODE = ['KeyD', 'KeyI', 'KeyS', 'KeyC', 'KeyO'];

export default function EasterEggs({ onTriggerSnake }) {
  const konamiIndex = useRef(0);
  const discoIndex = useRef(0);
  const discoActive = useRef(false);

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 300);
  }, []);

  const toggleDisco = useCallback(() => {
    discoActive.current = !discoActive.current;
    if (discoActive.current) {
      document.body.classList.add('disco-mode');
    } else {
      document.body.classList.remove('disco-mode');
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Konami code
      if (e.code === KONAMI_CODE[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI_CODE.length) {
          triggerConfetti();
          konamiIndex.current = 0;
        }
      } else {
        konamiIndex.current = 0;
      }

      // Disco code
      if (e.code === DISCO_CODE[discoIndex.current]) {
        discoIndex.current++;
        if (discoIndex.current === DISCO_CODE.length) {
          toggleDisco();
          discoIndex.current = 0;
        }
      } else {
        discoIndex.current = 0;
      }

      // Snake game trigger (Ctrl+Shift+S)
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyS') {
        e.preventDefault();
        onTriggerSnake?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerConfetti, toggleDisco, onTriggerSnake]);

  return null; // no visual output, just side effects
}