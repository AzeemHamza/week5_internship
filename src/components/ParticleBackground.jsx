import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: false,
        background: { color: 'transparent' },
        fpsLimit: 60,
        particles: {
          number: { value: 50, density: { enable: true, area: 800 } },
          color: { value: '#6366f1' },
          shape: { type: 'circle' },
          opacity: { value: 0.15 },
          size: { value: { min: 1, max: 4 } },
          links: { enable: true, distance: 150, color: '#6366f1', opacity: 0.1 },
          move: { enable: true, speed: 1.5 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: 'grab' } },
          modes: { grab: { distance: 180, links: { opacity: 0.3 } } },
        },
      }}
    />
  );
}