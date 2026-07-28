import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import SnakeGame from './SnakeGame';

const commands = {
  help: [
    'Available commands:',
    '  whoami      → About me',
    '  projects    → List projects',
    '  skills      → List skills',
    '  contact     → Contact info',
    '  experience  → Education & experience',
    '  snake       → Play snake game',
    '  clear       → Clear terminal',
    '  help        → Show this help',
  ],
  whoami: [ /* ... same as before ... */ ],
  projects: [ /* ... */ ],
  skills: [ /* ... */ ],
  contact: [ /* ... */ ],
  experience: [ /* ... */ ],
};

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    'Welcome to Hamza\'s interactive terminal!',
    'Type "help" to see available commands.',
    '',
  ]);
  const [showSnake, setShowSnake] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = useCallback((cmd) => {
    const lower = cmd.trim().toLowerCase();
    if (lower === 'clear') {
      setHistory([]);
    } else if (lower === 'snake') {
      setShowSnake(true);
      setHistory(prev => [...prev, '> snake', 'Launching snake game...', '']);
    } else if (commands[lower]) {
      setHistory(prev => [...prev, `> ${cmd}`, ...commands[lower], '']);
    } else if (cmd !== '') {
      setHistory(prev => [...prev, `> ${cmd}`, `Command not found: ${cmd}`, '']);
    } else {
      setHistory(prev => [...prev, '']);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (showSnake) return; // let snake handle keys
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
      setInput('');
    }
  };

  const handleTerminalClick = () => {
    if (!showSnake && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <section className="py-16">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center"
      >
        Interactive Terminal
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto bg-gray-900 dark:bg-dark-900/90 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl"
        onClick={handleTerminalClick}
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-dark-800 border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-gray-400">hamza@portfolio ~ </span>
        </div>

        <div ref={terminalRef} className="p-4 h-80 overflow-y-auto font-mono text-sm text-green-400 bg-gray-950 dark:bg-dark-950">
          {showSnake ? (
            <div className="flex justify-center items-center h-full">
              <SnakeGame onClose={() => setShowSnake(false)} />
            </div>
          ) : (
            <>
              {history.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap break-words">
                  {line.startsWith('> ') ? (
                    <span>
                      <span className="text-blue-400">hamza@portfolio</span>
                      <span className="text-gray-500">:~$ </span>
                      <span className="text-white">{line.substring(2)}</span>
                    </span>
                  ) : (
                    line
                  )}
                </div>
              ))}
              <div className="flex items-center">
                <span className="text-blue-400">hamza@portfolio</span>
                <span className="text-gray-500">:~$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  id="terminal-input"
                  className="flex-1 bg-transparent border-none outline-none text-white ml-1 caret-transparent"
                  aria-label="Terminal input"
                />
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                  className="w-2 h-5 bg-white ml-1"
                />
              </div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}