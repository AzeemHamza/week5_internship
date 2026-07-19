import { useState, useEffect } from 'react';

export default function Typewriter({ texts, delay = 150, pause = 2000 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setBlink(true);
      setTimeout(() => setReverse(true), pause);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setBlink(false);
    }, reverse ? 75 : delay);
    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index, texts, delay, pause]);

  return (
    <span className="text-indigo-600 dark:text-indigo-400">
      {texts[index].substring(0, subIndex)}
      <span className={`border-r-2 border-indigo-600 ${blink ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
}