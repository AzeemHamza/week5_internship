import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import ContactForm from '../components/ContactForm';
import useFetch from '../hooks/useFetch';
import { fetchContact } from '../api/portfolio';
import Spinner from '../components/Spinner';
import Skeleton from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';
import { FiMail, FiMapPin, FiPhone, FiLinkedin, FiGithub, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

function ContactMap() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/20 dark:border-dark-700/50 h-48 md:h-60">
      <iframe
        title="Location Map"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        src="https://www.openstreetmap.org/export/embed.html?bbox=74.25%2C31.45%2C74.40%2C31.55&amp;layer=mapnik&amp;marker=31.5204%2C74.3587"
        style={{ border: 0 }}
        allowFullScreen
      />
    </div>
  );
}

export default function Contact() {
  const { data: contact, loading, error } = useFetch(fetchContact);

  if (loading) return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-full mb-8" />
        <div className="grid gap-6">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    </PageWrapper>
  );
  if (error) return <PageWrapper><div className="py-20"><ErrorMessage message={error} /></div></PageWrapper>;

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <Helmet>
          <title>Contact – Hamza Azeem</title>
          <meta name="description" content="Get in touch with Hamza Azeem for internship and collaboration opportunities." />
        </Helmet>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact</h1>
          <p className="text-gray-600 dark:text-gray-400">Let's work together</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column – full width on mobile */}
          <div className="space-y-6 order-2 lg:order-1">
            {contact && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                {contact.email && (
                  <div className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400"><FiMail /></div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <a href={`mailto:${contact.email}`} className="text-sm md:text-base text-gray-900 dark:text-white hover:text-indigo-500 break-all">{contact.email}</a>
                    </div>
                  </div>
                )}
                {contact.phone && (
                  <div className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400"><FiPhone /></div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm md:text-base text-gray-900 dark:text-white">{contact.phone}</p>
                    </div>
                  </div>
                )}
                {contact.location && (
                  <div className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-white/20 dark:border-dark-700/50 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400"><FiMapPin /></div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm md:text-base text-gray-900 dark:text-white">{contact.location}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <div className="flex gap-4">
              {contact?.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 rounded-xl bg-gray-100 dark:bg-dark-800 border text-gray-600 dark:text-gray-400 hover:text-indigo-500">
                  <FiLinkedin size={20} />
                </a>
              )}
              {contact?.github && (
                <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 rounded-xl bg-gray-100 dark:bg-dark-800 border text-gray-600 dark:text-gray-400 hover:text-indigo-500">
                  <FiGithub size={20} />
                </a>
              )}
            </div>

            <a
              href="/resume.pdf"
              download="Hamza_Azeem_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition text-sm md:text-base"
            >
              <FiDownload /> Download Resume
            </a>

            <ContactMap />
          </div>

          {/* Right column – form first on mobile */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}