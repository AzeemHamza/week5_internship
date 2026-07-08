import { Helmet } from 'react-helmet-async';
import useFetch from '../hooks/useFetch';
import { fetchContact } from '../api/portfolio';
import Spinner from '../components/Spinner';
import Skeleton from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

export default function Contact() {
  const { data: contact, loading, error } = useFetch(fetchContact);

  if (loading) return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-4 w-full mb-8" />
      <div className="grid gap-6">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    </div>
  );
  if (error) return <div className="py-20"><ErrorMessage message={error} /></div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>Contact – Hamza Azeem</title>
        <meta name="description" content="Get in touch with Hamza Azeem for internship and collaboration opportunities." />
      </Helmet>

      <h1 className="text-3xl font-bold text-white mb-2">Contact</h1>
      <p className="text-gray-400 mb-10">Let’s work together</p>

      {contact && (
        <div className="grid sm:grid-cols-2 gap-6">
          {contact.email && (
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <FiMail size={22} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a href={`mailto:${contact.email}`} className="text-white hover:text-indigo-400 transition" aria-label={`Send email to ${contact.email}`}>
                  {contact.email}
                </a>
              </div>
            </div>
          )}
          {contact.phone && (
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <FiPhone size={22} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-white">{contact.phone}</p>
              </div>
            </div>
          )}
          {contact.location && (
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 flex items-center gap-4 sm:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <FiMapPin size={22} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-white">{contact.location}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}