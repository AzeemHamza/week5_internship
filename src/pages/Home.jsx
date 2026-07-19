import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import Typewriter from '../components/Typewriter';
import FeaturedCarousel from '../components/FeaturedCarousel';
import useFetch from '../hooks/useFetch';
import { fetchProfile, fetchSkills } from '../api/portfolio';
import SkillCard from '../components/SkillCard';
import Spinner from '../components/Spinner';
import Skeleton from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import Testimonials from '../components/Testimonials';
import Stats from '../components/Stats';
import { FiMapPin, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Home() {
  const { data: profile, loading: profileLoading, error: profileError } = useFetch(fetchProfile);
  const { data: skills, loading: skillsLoading, error: skillsError } = useFetch(fetchSkills);

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        <Helmet>
          <title>{profile?.name ? `${profile.name} – Portfolio` : 'Portfolio'}</title>
          <meta name="description" content={profile?.bio || 'Personal portfolio of Hamza Azeem'} />
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-dark-800/50 border border-gray-200 dark:border-dark-700 rounded-2xl p-8 shadow-sm"
            >
              <img
                src={profile.avatar || '/hamzapfp.jpg'}
                alt={profile.name}
                loading="lazy"
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 dark:border-dark-700 shadow-2xl"
              />
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{profile.name}</h1>
                {/* Typewriter effect replacing static title */}
                <p className="text-lg font-medium">
                  <Typewriter
                    texts={[
                      "Internship Seeker – Computer Science",
                      "Aspiring Backend Engineer",
                      "Data Science Enthusiast",
                      "Problem Solver",
                    ]}
                  />
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">{profile.bio}</p>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {profile.location && (
                    <span className="flex items-center gap-1">
                      <FiMapPin aria-hidden="true" /> {profile.location}
                    </span>
                  )}
                  {profile.email && (
                    <span className="flex items-center gap-1">
                      <FiMail aria-hidden="true" /> {profile.email}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* Featured Projects Carousel */}
        <FeaturedCarousel />

        {/* Stats Section */}
        <Stats />

        {/* Skills Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Skills & Expertise
          </motion.h2>
          {skillsLoading && <Spinner />}
          {skillsError && <ErrorMessage message={skillsError} />}
          {skills && skills.length === 0 && <EmptyState message="No skills listed yet." />}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills?.map((skill) => (
              <SkillCard key={skill.id || skill._id} skill={skill} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />
      </div>
    </PageWrapper>
  );
}