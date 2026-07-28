import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const snippets = [
  {
    language: 'Python',
    code: `def encrypt_caesar(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            base = 'A' if char.isupper() else 'a'
            result += chr((ord(char) - ord(base) + shift) % 26 + ord(base))
        else:
            result += char
    return result`,
  },
  {
    language: 'Java',
    code: `public class ChessGame {
    private Board board;
    private Player white, black;
    private boolean isCheckmate;

    public boolean movePiece(Position from, Position to) {
        if (!board.isValidMove(from, to)) return false;
        board.executeMove(from, to);
        return checkForCheckmate();
    }
}`,
  },
  {
    language: 'React',
    code: `const ProjectCard = ({ project, onOpen }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="glass-card p-6 rounded-2xl"
        whileHover={{ scale: 1.02 }}
        onClick={() => onOpen(project)}
      >
        <img src={project.image} alt={project.name} />
        <h3>{project.name}</h3>
        <TechBadges techs={project.techs} />
      </motion.div>
    );
};`,
  },
];

const languageColors = {
  Python: '#3572A5',
  Java: '#b07219',
  React: '#61dafb',
};

export default function HeroCodeSnippet() {
  const [index, setIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const snippet = snippets[index];
  const fullText = snippet.code;
  const intervalRef = useRef(null);

  useEffect(() => {
    let currentChar = 0;
    setCharCount(0);
    const typingInterval = setInterval(() => {
      currentChar++;
      setCharCount(currentChar);
      if (currentChar >= fullText.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % snippets.length);
        }, 1500);
      }
    }, 10);
    return () => clearInterval(typingInterval);
  }, [index]);

  return (
    <div className="relative w-full max-w-xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs font-mono font-semibold px-2 py-1 rounded"
          style={{
            backgroundColor: languageColors[snippet.language] + '20',
            color: languageColors[snippet.language],
          }}
        >
          {snippet.language}
        </span>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative bg-gray-900 dark:bg-black/60 backdrop-blur-md border border-gray-700 rounded-xl p-4 font-mono text-sm overflow-hidden"
        >
          <pre className="text-green-400 whitespace-pre-wrap break-all">
            <code>{fullText.substring(0, charCount)}</code>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-2 h-5 bg-green-400 ml-1 align-middle"
            />
          </pre>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}