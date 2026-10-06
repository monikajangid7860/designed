'use client';

import Image from 'next/image';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const galleryData = [
  {
    id: 1,
    category: 'MATERIAL',
    src: '/images/arch1.jpg',
    alt: 'Monumental concrete architecture framed by a vivid red circle',
    text: 'LIGHT SETS THE FIRST BOUNDARY. MATERIALS FOLLOW WITH A QUIET, TACTILE RHYTHM. EVERY DETAIL IS GIVEN ROOM TO BREATHE.',
    note: 'A STUDY IN LIGHT / 2026',
  },
  {
    id: 2,
    category: 'CULTURE',
    src: '/images/arch3.jpg',
    alt: 'Sculptural concrete pavilion and broad steps beneath a red sun',
    text: 'A PLACE SHOULD FEEL INEVITABLE, NEVER ORDINARY. FORM, COLOR AND DAILY RITUAL MEET IN A SHARED LANDSCAPE.',
    note: 'SPACES FOR LIVING / 2026',
  },
  {
    id: 3,
    category: 'SPATIAL',
    src: '/images/arch5.jpg',
    alt: 'Geometric architectural composition with concrete forms and a red sun',
    text: 'WE SHAPE THE PAUSE BETWEEN ONE ROOM AND THE NEXT. LIGHT TRAVELS, PERSPECTIVES SHIFT, AND A NEW STORY OPENS.',
    note: 'THE ART OF ARRIVAL / 2026',
  },
];

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
    filter: 'blur(4px)',
  }),
  center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: (direction) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
    filter: 'blur(4px)',
  }),
};

export default function ViewfinderGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const activeSlide = galleryData[currentIndex];

  const selectSlide = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const navigate = (step) => {
    setDirection(step);
    setCurrentIndex((index) => (index + step + galleryData.length) % galleryData.length);
  };

  const transition = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

  return (
    <section
      className="viewfinder-gallery relative bg-[#FAFAFA] text-[#0A0A0A]"
      aria-labelledby="viewfinder-gallery-title"
    >
      <header className="viewfinder-gallery__header">
        <p className="viewfinder-gallery__eyebrow">SELECTED WORK / 2024—26</p>
        <h2 id="viewfinder-gallery-title" className="viewfinder-gallery__title">
          TECHNICAL VIEWFINDER
        </h2>
        <span className="viewfinder-gallery__header-index">INDEX 03—07</span>
      </header>

      <div className="viewfinder-gallery__grid grid">
        <LayoutGroup id="viewfinder-gallery-markers">
          <nav className="viewfinder-gallery__thumbnails" aria-label="Choose a gallery image">
            {galleryData.map((slide, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  className={`viewfinder-gallery__thumbnail${isActive ? ' is-active' : ''}`}
                  onClick={() => selectSlide(index)}
                  aria-label={`Show ${slide.category.toLowerCase()} image`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {isActive && (
                    <>
                      <motion.span
                        className="viewfinder-gallery__thumbnail-indicator"
                        layoutId="viewfinder-active-indicator"
                        transition={transition}
                        aria-hidden="true"
                      />
                      <motion.span
                        className="viewfinder-gallery__thumbnail-border"
                        layoutId="viewfinder-active-border"
                        transition={transition}
                        aria-hidden="true"
                      />
                    </>
                  )}
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 25vw, 76px"
                    className="viewfinder-gallery__thumbnail-image"
                  />
                  <span className="viewfinder-gallery__thumbnail-number">0{slide.id}</span>
                </button>
              );
            })}
          </nav>
        </LayoutGroup>

        <div className="viewfinder-gallery__visual-column">
          <div className="viewfinder-gallery__frame">
            <div className="viewfinder-gallery__image-window">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={activeSlide.id}
                  className="viewfinder-gallery__image-layer"
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transition}
                >
                  <Image
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    fill
                    priority={currentIndex === 0}
                    sizes="(max-width: 760px) 92vw, (max-width: 1100px) 68vw, 57vw"
                    className="viewfinder-gallery__main-image"
                  />
                </motion.div>
              </AnimatePresence>
              <span className="viewfinder-gallery__image-label">
                ■ {activeSlide.category} ({currentIndex + 1} OF {galleryData.length})
              </span>
              <motion.div
                key={`brackets-${activeSlide.id}`}
                className="viewfinder-gallery__brackets"
                initial={{ scale: reducedMotion ? 1 : 0.96 }}
                animate={{ scale: [1, 1.035, 1] }}
                transition={reducedMotion ? { duration: 0.01 } : { duration: 0.55, ease: 'easeOut' }}
                aria-hidden="true"
              >
                <span className="viewfinder-gallery__corner viewfinder-gallery__corner--tl" />
                <span className="viewfinder-gallery__corner viewfinder-gallery__corner--tr" />
                <span className="viewfinder-gallery__corner viewfinder-gallery__corner--bl" />
                <span className="viewfinder-gallery__corner viewfinder-gallery__corner--br" />
              </motion.div>
            </div>
            <div className="viewfinder-gallery__image-meta" aria-hidden="true">
              <span>{activeSlide.note}</span>
              <span>FIG. 0{activeSlide.id}</span>
            </div>
          </div>
        </div>

        <aside className="viewfinder-gallery__copy" aria-label={`${activeSlide.category} project description`}>
          <div className="viewfinder-gallery__copy-topline">
            <span>FIELD NOTES</span>
            <span>NO. 0{activeSlide.id}</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSlide.id}
              className="viewfinder-gallery__description"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.075, delayChildren: reducedMotion ? 0 : 0.08 } },
                exit: { opacity: 0, transition: { duration: 0.12 } },
              }}
              aria-label={activeSlide.text}
            >
              {activeSlide.text.split('. ').map((line, index, lines) => (
                <span className="viewfinder-gallery__line-mask" key={`${activeSlide.id}-${index}`} aria-hidden="true">
                  <motion.span
                    className="viewfinder-gallery__line"
                    variants={{
                      hidden: { y: '110%', opacity: 0 },
                      visible: { y: 0, opacity: 1, transition },
                    }}
                  >
                    {line}{index < lines.length - 1 ? '.' : ''}
                  </motion.span>
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="viewfinder-gallery__copy-foot">
            <span>INTERIOR / OBJECT / SPACE</span>
            <span aria-hidden="true">↗</span>
          </div>
        </aside>
      </div>

      <nav className="viewfinder-gallery__controls" aria-label="Gallery navigation">
        <button type="button" onClick={() => navigate(-1)} aria-label="Previous image">
          <span aria-hidden="true">&lt;</span> PREV
        </button>
        <span className="viewfinder-gallery__control-divider" aria-hidden="true">||</span>
        <button type="button" onClick={() => navigate(1)} aria-label="Next image">
          NEXT <span aria-hidden="true">&gt;</span>
        </button>
      </nav>
    </section>
  );
}