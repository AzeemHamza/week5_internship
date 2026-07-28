import { useEffect, useRef, useState, useCallback } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 15;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIR = { x: 1, y: 0 };

export default function SnakeGame({ onClose }) {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [dir, setDir] = useState(INITIAL_DIR);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const dirRef = useRef(dir);
  const gameLoopRef = useRef(null);
  const speed = 120;

  const generateFood = useCallback((snakeBody) => {
    const newFood = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
    if (snakeBody.some(seg => seg.x === newFood.x && seg.y === newFood.y)) {
      return generateFood(snakeBody); // regenerate if overlaps
    }
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver) return;
    setSnake(prev => {
      const newDir = dirRef.current;
      const head = prev[prev.length - 1];
      const newHead = { x: head.x + newDir.x, y: head.y + newDir.y };

      // Collision detection
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        return prev;
      }
      if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
        setGameOver(true);
        return prev;
      }

      const newSnake = [...prev, newHead];
      if (newHead.x === food.x && newHead.y === food.y) {
        // Eat food
        setScore(s => s + 1);
        setFood(generateFood(newSnake));
      } else {
        newSnake.shift(); // remove tail
      }
      return newSnake;
    });
  }, [food, gameOver, generateFood]);

  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return;
      const key = e.key;
      e.preventDefault();
      const newDir = { ...dirRef.current };
      if (key === 'ArrowUp' && dirRef.current.y === 0) { newDir.x = 0; newDir.y = -1; }
      if (key === 'ArrowDown' && dirRef.current.y === 0) { newDir.x = 0; newDir.y = 1; }
      if (key === 'ArrowLeft' && dirRef.current.x === 0) { newDir.x = -1; newDir.y = 0; }
      if (key === 'ArrowRight' && dirRef.current.x === 0) { newDir.x = 1; newDir.y = 0; }
      dirRef.current = newDir;
      setDir(newDir);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoopRef.current);
  }, [moveSnake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#818cf8';
    snake.forEach(seg => {
      ctx.fillRect(seg.x * CELL_SIZE, seg.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });

    // Draw food
    ctx.fillStyle = '#f87171';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);

    if (gameOver) {
      ctx.fillStyle = '#fff';
      ctx.font = '20px monospace';
      ctx.fillText('Game Over', 50, 100);
    }
  }, [snake, food, gameOver]);

  return (
    <div className="flex flex-col items-center bg-gray-900 p-4 rounded-lg">
      <div className="text-white mb-2">Score: {score}</div>
      <canvas ref={canvasRef} width={GRID_SIZE * CELL_SIZE} height={GRID_SIZE * CELL_SIZE} className="border border-gray-700" />
      <button onClick={onClose} className="mt-3 text-indigo-400 hover:text-indigo-300 text-sm">Exit Snake</button>
    </div>
  );
}