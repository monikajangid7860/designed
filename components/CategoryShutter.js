'use client';

import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const categories = [
  {
    title: 'BRAND IDENTITY',
    number: '01',
    caption: 'A WORLD, IN A SINGLE MARK',
    background: '#FAFAFA',
    foreground: '#0A0A0A',
    visual: 'identity',
  },
  {
    title: 'DIGITAL EXPERIENCE',
    number: '02',
    caption: 'DIGITAL, WITH A HUMAN FEELING',
    background: '#FFDD00',
    foreground: '#0A0A0A',
    visual: 'digital',
  },
  // {
  //   title: 'ART DIRECTION',
  //   number: '03',
  //   caption: 'CAMPAIGNS MADE TO BE FELT',
  //   background: '#ffdd00',
  //   foreground: '#FAFAFA',
  //   visual: 'editorial',
  // },
];

function IdentityMockup() {
  return (
    <div className="category-shutter__identity" aria-hidden="true">
      <div className="category-shutter__identity-sheet">
        <span className="category-shutter__mock-label">PALMO / BRAND SYSTEM / 2026</span>
        <div className="category-shutter__identity-mark">P<span>.</span></div>
        <div className="category-shutter__identity-wordmark">PALMO</div>
        <span className="category-shutter__identity-caption">GOOD THINGS GROW UNDER THE SUN</span>
      </div>
      <div className="category-shutter__identity-card">
        <div className="category-shutter__card-sun" />
        <span>PALMO</span>
        <small>COCONUT CO.</small>
      </div>
      <div className="category-shutter__identity-side-note">A STUDY IN SIMPLE JOY</div>
    </div>
  );
}

function DigitalMockup() {
  return (
    <div className="category-shutter__digital" aria-hidden="true">
      <div className="category-shutter__browser">
        <div className="category-shutter__browser-bar">
          <span />
          <span />
          <span />
          <div>palmo.studio</div>
        </div>
        <div className="category-shutter__browser-page">
          <div className="category-shutter__browser-nav">
            <b>PALMO</b>
            <span>OUR WORLD　 SHOP　 JOURNAL</span>
          </div>
          <div className="category-shutter__browser-hero">
            <div>
              <small>GOOD THINGS, GROWN SLOW</small>
              <strong>Meet your<br />new sunshine.</strong>
              <i>DISCOVER PALMO <span>↗</span></i>
            </div>
            <div className="category-shutter__browser-sun" />
          </div>
        </div>
      </div>
      <div className="category-shutter__phone">
        <div className="category-shutter__phone-camera" />
        <div className="category-shutter__phone-screen">
          <b>PALMO</b>
          <div className="category-shutter__phone-sun" />
          <span>GOOD THINGS<br />GROW HERE</span>
          <small>EXPLORE THE COLLECTION　↗</small>
        </div>
      </div>
      <span className="category-shutter__digital-note">A CONNECTED WORLD, MADE PERSONAL</span>
    </div>
  );
}

function EditorialImage() {
  return (
    <div className="category-shutter__editorial">
      <Image
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=90"
        alt="Monochrome fashion editorial portrait in a sculptural pose"
        fill
        loading="eager"
        sizes="(max-width: 760px) 92vw, 72vw"
        quality={90}
        className="category-shutter__editorial-image"
      />
      <span className="category-shutter__editorial-index">CAMPAIGN 03 / 2026</span>
    </div>
  );
}

function CategoryPanel({ category, index, progress }) {
  const start = index / categories.length;
  const end = (index + 1) / categories.length;
  const clipPath = useTransform(progress, (latest) => {
    if (index === categories.length - 1) return 'inset(0% 0% 0% 0%)';

    const amount = Math.min(1, Math.max(0, (latest - start) / (end - start)));
    return `inset(0% 0% ${amount * 100}% 0%)`;
  });

  return (
    <motion.article
      className={`category-shutter__panel category-shutter__panel--${category.visual}`}
      style={{
        backgroundColor: category.background,
        color: category.foreground,
        clipPath,
        zIndex: categories.length - index,
      }}
      aria-labelledby={`category-shutter-title-${category.number}`}
    >
      <span className="category-shutter__index-ghost" aria-hidden="true">
        {category.number}
      </span>
      <div className="category-shutter__panel-content">
        <div className="category-shutter__heading-wrap">
          <span className="category-shutter__eyebrow">{category.caption}</span>
          <h2 id={`category-shutter-title-${category.number}`} className="category-shutter__title">
            {category.title}
          </h2>
        </div>

        {category.visual === 'identity' && <IdentityMockup />}
        {category.visual === 'digital' && <DigitalMockup />}
        {category.visual === 'editorial' && <EditorialImage />}

        <div className="category-shutter__footer">
          <span>IDEAS WITH A POINT OF VIEW</span>
          <span>{category.number} / 03</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function CategoryShutter() {
  const containerRef = useRef(null);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = containerRef.current;
      if (!section) return;

      const scrollDistance = section.offsetHeight - window.innerHeight;
      const distanceScrolled = -section.getBoundingClientRect().top;
      const progress = scrollDistance > 0
        ? Math.min(1, Math.max(0, distanceScrolled / scrollDistance))
        : 0;

      scrollProgress.set(progress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [scrollProgress]);

  return (
    <section
      ref={containerRef}
      className="category-shutter relative h-[300vh]"
      aria-label="Our creative services"
    >
      <div className="category-shutter__sticky sticky top-0 h-screen w-full overflow-hidden">
        {categories.map((category, index) => (
          <CategoryPanel
            category={category}
            index={index}
            progress={scrollProgress}
            key={category.number}
          />
        ))}
      </div>
    </section>
  );
}