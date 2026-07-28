import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiX } from 'react-icons/fi';

export default function AudioVisualizer() {
  const [active, setActive] = useState(false);
  const [stream, setStream] = useState(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  const stopMic = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    cancelAnimationFrame(animationRef.current);
    setActive(false);
  }, [stream]);

  const startMic = async () => {
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(micStream);
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(micStream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)'; // dark background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          ctx.fillStyle = `rgb(129, 140, 248)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };
      draw();
      setActive(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  };

  const toggle = () => {
    if (active) {
      stopMic();
    } else {
      startMic();
    }
  };

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, [stopMic]);

  return (
    <>
      <button
        onClick={toggle}
        className="fixed bottom-40 right-6 z-[100] p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 transition-all"
        aria-label="Toggle audio visualizer"
      >
        {active ? <FiX size={20} /> : <FiMic size={20} />}
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-20 z-[99] w-64 h-24 bg-gray-900/90 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-gray-700"
          >
            <canvas ref={canvasRef} width={256} height={96} className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}