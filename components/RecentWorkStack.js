'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'P. VAN DER NIET',
    src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
    alt: 'Fashion portrait in a city street',
    borderColor: '#FFDD00',
  },
  {
    title: 'STUDIO NOTTE',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    alt: 'Close-up editorial portrait',
    borderColor: '#2563EB',
  },
  {
    title: 'FUORI STAGIONE',
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85',
    alt: 'Portrait in warm afternoon light',
    borderColor: '#EF4444',
  },
];

function ProjectCard({ project, index, total, progress }) {
  const segmentStart = index / (total - 1);
  const segmentEnd = (index + 1) / (total - 1);
  const y = useTransform(
    progress,
    [segmentStart, segmentEnd],
    index === total - 1 ? ['0%', '0%'] : ['0%', '-140%'],
  );

  return (
    <motion.article
      className="recent-work-card will-change-transform"
      style={{
        y,
        zIndex: total - index,
        top: `${index * -12}px`,
        '--card-border-color': project.borderColor,
      }}
      aria-label={project.title}
    >
      <Image
        src={project.src}
        alt={project.alt}
        fill
        sizes="(max-width: 700px) 82vw, 440px"
        quality={90}
        className="recent-work-card__image"
      />
      <p className="recent-work-card__caption">{project.title}</p>
    </motion.article>
  );
}

function GlobeIcon() {
  return (
    <svg className="recent-work-badge__globe" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="13" />
      <ellipse cx="16" cy="16" rx="6" ry="13" />
      <path d="M4 12h24M4 20h24" />
    </svg>
  );
}

function ScrollBadge() {
  return (
    <div className="recent-work-badge" aria-label="This is how we scroll">
      <motion.span
        className="recent-work-badge__orbit"
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        THIS IS HOW WE SCROLL ·
      </motion.span>
      <GlobeIcon />
    </div>
  );
}

export default function RecentWorkStack() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      className="recent-work-track relative w-full bg-[#0A0A0A] text-white"
      ref={sectionRef}
      aria-labelledby="recent-work-title"
    >
      <div className="recent-work-sticky sticky top-0 h-screen overflow-hidden">
        <header className="recent-work-heading">
          <p className="recent-work-intro">
            Niet te missen, wel te delen. Hier een greep uit wat we maken.
          </p>
          <h2 className="recent-work-title" id="recent-work-title">RECENT WERK</h2>
        </header>

        <div className="recent-work-stack" aria-label="Recent project highlights">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <a className="recent-work-button" href="#continuation">
          VIEW ALL WORK <span aria-hidden="true">→</span>
        </a>
        <ScrollBadge />
      </div>
    </section>
  );
}