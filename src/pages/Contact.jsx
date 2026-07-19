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

export default function Contact() {
  const { data: contact, loading, error } = useFetch(fetchContact);

  const handleDownloadResume = async () => {
    const response = await fetch('/resume.pdf');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Hamza_Azeem_Resume.pdf'; // name for the downloaded file
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

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
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Helmet>
          <title>Contact – Hamza Azeem</title>
          <meta name="description" content="Get in touch with Hamza Azeem for internship and collaboration opportunities." />
        </Helmet>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10">Let's work together</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Contact info + social + resume */}
          <div className="space-y-6">
            {contact && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {contact.email && (
                  <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <FiMail aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href={`mailto:${contact.email}`} className="text-gray-900 dark:text-white hover:text-indigo-500 transition">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}
                {contact.phone && (
                  <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <FiPhone aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900 dark:text-white">{contact.phone}</p>
                    </div>
                  </div>
                )}
                {contact.location && (
                  <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <FiMapPin aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900 dark:text-white">{contact.location}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Social links */}
            <div className="flex gap-4">
              {contact?.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-xl bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-gray-600 dark:text-gray-400 hover:text-indigo-500 hover:border-indigo-500 transition"
                >
                  <FiLinkedin size={20} />
                </a>
              )}
              {contact?.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-xl bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-gray-600 dark:text-gray-400 hover:text-indigo-500 hover:border-indigo-500 transition"
                >
                  <FiGithub size={20} />
                </a>
              )}
            </div>

            {/* Download Resume – now with forced download */}
            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <FiDownload /> Download Resume
            </button>
          </div>

          {/* Right: Contact form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}