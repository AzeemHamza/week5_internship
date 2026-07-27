import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { FiSend, FiCheckCircle } from 'react-icons/fi';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

export default function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  if (state.succeeded) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl p-8 text-center">
        <FiCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
        <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl p-6">
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Name</label>
            <input type="text" id="name" name="name" required className="w-full px-4 py-2.5 bg-white/50 dark:bg-dark-800/50 backdrop-blur-md border border-gray-300 dark:border-dark-700 rounded-xl text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your name" />
            <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Email</label>
            <input type="email" id="email" name="email" required className="w-full px-4 py-2.5 bg-white/50 dark:bg-dark-800/50 backdrop-blur-md border border-gray-300 dark:border-dark-700 rounded-xl text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@example.com" />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Message</label>
            <textarea id="message" name="message" rows="5" required className="w-full px-4 py-2.5 bg-white/50 dark:bg-dark-800/50 backdrop-blur-md border border-gray-300 dark:border-dark-700 rounded-xl text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your message..." />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
          </div>
          <button type="submit" disabled={state.submitting} className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-medium rounded-xl transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            {state.submitting ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <><FiSend /> Send Message</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}