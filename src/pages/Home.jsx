import { Helmet } from 'react-helmet-async';
import useFetch from '../hooks/useFetch';
import { fetchProfile, fetchSkills } from '../api/portfolio';
import SkillCard from '../components/SkillCard';
import Spinner from '../components/Spinner';
import Skeleton from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { FiMapPin, FiMail } from 'react-icons/fi';

export default function Home() {
  const { data: profile, loading: profileLoading, error: profileError } = useFetch(fetchProfile);
  const { data: skills, loading: skillsLoading, error: skillsError } = useFetch(fetchSkills);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <Helmet>
        <title>{profile?.name ? `${profile.name} – Portfolio` : 'Portfolio'}</title>
        <meta name="description" content={profile?.bio || 'Personal portfolio of Hamza Azeem'} />
        <meta property="og:title" content={`${profile?.name || 'Hamza Azeem'} – Portfolio`} />
        <meta property="og:description" content={profile?.bio || ''} />
        <meta property="og:image" content={profile?.avatar || '/hamzapfp.jpg'} />
      </Helmet>

      {/* Profile Section */}
      <section>
        {profileLoading && (
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Skeleton className="w-40 h-40 rounded-full" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        )}
        {profileError && <ErrorMessage message={profileError} />}
        {profile && (
          <div className="flex flex-col md:flex-row items-center gap-8 bg-dark-800/50 border border-dark-700 rounded-2xl p-8 backdrop-blur-sm">
            <img
              src={profile.avatar || '/hamzapfp.jpg'}
              alt={profile.name}
              loading="lazy"
              className="w-40 h-40 rounded-full object-cover border-4 border-dark-700 shadow-2xl"
            />
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{profile.name}</h1>
              <p className="text-indigo-400 text-lg font-medium">{profile.title}</p>
              <p className="text-gray-400 mt-3 leading-relaxed">{profile.bio}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
                {profile.location && (
                  <span className="flex items-center gap-1"><FiMapPin aria-hidden="true" /> {profile.location}</span>
                )}
                {profile.email && (
                  <span className="flex items-center gap-1"><FiMail aria-hidden="true" /> {profile.email}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-8">Skills & Expertise</h2>
        {skillsLoading && <Spinner />}
        {skillsError && <ErrorMessage message={skillsError} />}
        {skills && skills.length === 0 && <EmptyState message="No skills listed yet." />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills?.map((skill) => (
            <SkillCard key={skill.id || skill._id} skill={skill} />
          ))}
        </div>
      </section>
    </div>
  );
}