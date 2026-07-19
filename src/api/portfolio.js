import {
  mockProfile,
  mockSkills,
  mockProjects,
  mockContact,
} from './mockData';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function request(endpoint, options = {}) {
  if (USE_MOCK) {
    await delay(300);

    if (endpoint.startsWith('/profile')) return mockProfile;
    if (endpoint.startsWith('/skills')) return mockSkills;

    if (endpoint.startsWith('/projects')) {
      const fakeBase = 'http://dummy';
      const url = new URL(endpoint, fakeBase);
      const searchQuery = url.searchParams.get('search')?.toLowerCase();
      const categoryFilter = url.searchParams.get('category');
      const techFilter = url.searchParams.get('tech')?.toLowerCase();

      let filtered = [...mockProjects];

      if (searchQuery) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery) ||
            p.technologies.some((t) => t.toLowerCase().includes(searchQuery))
        );
      }

      if (categoryFilter) {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
        );
      }

      if (techFilter) {
        filtered = filtered.filter(
          (p) =>
            p.technologies.some(
              (t) => t.toLowerCase() === techFilter
            )
        );
      }

      return filtered;
    }

    if (endpoint.startsWith('/contact')) return mockContact;

    throw new Error('Mock endpoint not found');
  }

  // Real API call
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const fetchProfile = () => request('/profile');
export const fetchSkills = () => request('/skills');
export const fetchProjects = (params = {}) => {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.category) query.append('category', params.category);
  if (params.tech) query.append('tech', params.tech);
  return request(`/projects?${query.toString()}`);
};
export const fetchContact = () => request('/contact');