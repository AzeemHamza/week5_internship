import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';

const channel = new BroadcastChannel('guestbook');

export default function GuestBook() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
    channel.addEventListener('message', handler);
    return () => channel.removeEventListener('message', handler);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const newMsg = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      timestamp: new Date().toLocaleString(),
    };
    channel.postMessage(newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setName('');
    setText('');
  };

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Helmet>
          <title>Guest Book – Hamza Azeem</title>
          <meta name="description" content="Leave a message on Hamza's portfolio guest book." />
        </Helmet>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Guest Book</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Leave a message – it appears in real time across all open tabs!
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl p-6">
          <div>
            <label htmlFor="gname" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Name</label>
            <input
              id="gname"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/50 dark:bg-dark-800/50 border border-gray-300 dark:border-dark-700 rounded-xl text-gray-900 dark:text-gray-200"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="gmessage" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Message</label>
            <textarea
              id="gmessage"
              rows="3"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/50 dark:bg-dark-800/50 border border-gray-300 dark:border-dark-700 rounded-xl text-gray-900 dark:text-gray-200"
              placeholder="Say something nice..."
            />
          </div>
          <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition">
            Post Message
          </button>
        </form>

        <div className="space-y-4">
          {messages.length === 0 && (
            <p className="text-gray-500 text-center">No messages yet. Be the first!</p>
          )}
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-xl p-4"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-gray-900 dark:text-white">{msg.name}</span>
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{msg.text}</p>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </PageWrapper>
  );
}