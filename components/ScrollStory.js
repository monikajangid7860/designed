'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const panels = [
  {
    number: '01',
    eyebrow: 'CARRY / 01',
    title: 'Take the idea with you.',
    description:
      'A familiar everyday shape, reworked in inky black with a hand-drawn NO ART mark in red.',
    image: '/images/6aa6832f17316e80e7347c29_d35a6bb884fdea4bf46b250d29b1b26677a5276a258639f96aa18e24f385210e.avif',
    imageAlt: 'Black NoArt tote bag with red hand-drawn lettering',
    marker: '01',
    code: 'NOART / OBJECT 001',
  },
  {
    number: '02',
    eyebrow: 'DETAIL / 02',
    title: 'The smallest things set the tone.',
    description:
      'A row of miniature objects and printed details brings the collection’s playful visual language together.',
    image: '/images/6aa958dae1f9b20888994e47_13025173ba391f81c634a38626fc6dc962b141c5c19e039aeb9ce90fbb507ad5.avif',
    imageAlt: 'Colorful NoArt collection of small accessories arranged in a line',
    marker: '02',
    code: 'NOART / OBJECT 002',
  },
  {
    number: '03',
    eyebrow: 'WRAP / 03',
    title: 'A graphic layer changes the whole fit.',
    description:
      'The NO ART scarf turns a practical layer into a bold, instantly recognizable statement.',
    image: '/images/6aa95917ee7527d3c9fa3687_41f0dd9d01d3f95fdc4edbba2ae196d659783454a84fdc845147eb2cf2779b33.avif',
    imageAlt: 'Black-and-white NoArt scarf with graphic lettering and fringe',
    marker: '03',
    code: 'NOART / OBJECT 003',
  },
  {
    number: '04',
    eyebrow: 'UNIFORM / 04',
    title: 'Wear the work, not the rules.',
    description:
      'A relaxed white tee carries small illustrations across the chest: playful, personal, and easy to make your own.',
    image: '/images/story4.webp',
    imageAlt: 'Model wearing a white NoArt T-shirt with small colorful chest graphics',
    marker: '04',
    code: 'NOART / GARMENT 001',
  },
  {
    number: '05',
    eyebrow: 'BLOOM / 05',
    title: 'Let a little color speak up.',
    description:
      'A red flower graphic breaks the quiet white canvas with one bright, unmistakable accent.',
    image: '/images/story6.jpg',
    imageAlt: 'Model wearing a white T-shirt with a red flower graphic',
    marker: '05',
    code: 'NOART / GARMENT 002',
  },
  {
    number: '06',
    eyebrow: 'GRAPHIC / 06',
    title: 'A good graphic never stays in the background.',
    description:
      'A bold illustrated chest print gives this final look the collection’s irreverent point of view.',
    image: '/images/story2.webp',
    imageAlt: 'Model wearing a white T-shirt with a colorful illustrated graphic',
    marker: '06',
    code: 'NOART / GARMENT 003',
  },
];

/* -------------------------------------------------------
   SINGLE PANEL
------------------------------------------------------- */

function StoryPanel({
  panel,
  index,
  progress,
  reducedMotion,
}) {
  const total = panels.length;

  /*
    Each panel owns one portion of the scroll.

    Example with 6 panels:

    Each panel owns one sixth of the scroll progress.
  */

  const start = index / total;
  const end = (index + 1) / total;

  const enter = start;
  const center = start + (end - start) * 0.42;
  const leave = end;

  /*
    Image + text fade/scale.
  */

  const opacityValues = index === 0
    ? [1, 1, 0]
    : index === total - 1
      ? [0, 1, 1]
      : [0, 1, 0];
  const opacity = useTransform(
    progress,
    [enter, center, leave],
    opacityValues,
  );

  const scale = reducedMotion
    ? 1
    : useTransform(
        progress,
        [enter, center, leave],
        [0.94, 1, 1.04]
      );

  /*
    Alternate direction.

    Even:
      IMAGE LEFT
      INFO RIGHT

    Odd:
      INFO LEFT
      IMAGE RIGHT
  */

  const imageIsLeft = index % 2 === 0;

  const imageX = reducedMotion
    ? 0
    : useTransform(
        progress,
        [enter, center, leave],
        imageIsLeft
          ? ['-7vw', '0vw', '-4vw']
          : ['7vw', '0vw', '4vw']
      );

  const infoX = reducedMotion
    ? 0
    : useTransform(
        progress,
        [enter, center, leave],
        imageIsLeft
          ? ['7vw', '0vw', '4vw']
          : ['-7vw', '0vw', '-4vw']
      );

  const imageScale = reducedMotion
    ? 1
    : useTransform(
        progress,
        [enter, center, leave],
        [0.9, 1, 1.06]
      );

  const markerScale = reducedMotion
    ? 1
    : useTransform(
        progress,
        [enter, center, leave],
        [0.5, 1, 1.15]
      );

  return (
    <motion.article
      className="scroll-story-panel"
      style={{
        opacity,
        scale,
        zIndex: total - index,
      }}
      aria-label={`${panel.number} ${panel.eyebrow}`}
    >
      {/* ------------------------------------------------
          IMAGE
      ------------------------------------------------ */}

      <motion.div
        className={`scroll-story-image ${
          imageIsLeft
            ? 'scroll-story-image--left'
            : 'scroll-story-image--right'
        }`}
        style={{
          x: imageX,
          scale: imageScale,
        }}
      >
        <div className="scroll-story-image__frame">
          <Image
            src={panel.image}
            alt={panel.imageAlt}
            fill
            priority={index < 2}
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
            className="scroll-story-image__img"
          />

          {/* orange technical line */}

          <span
            className="scroll-story-line"
            aria-hidden="true"
          />

          {/* orange marker */}

          <motion.span
            className="scroll-story-marker"
            style={{
              scale: markerScale,
            }}
            aria-hidden="true"
          >
            {panel.marker}
          </motion.span>

          {/* little white close box */}

          <span
            className="scroll-story-close"
            aria-hidden="true"
          >
            ×
          </span>

          <span
            className="scroll-story-code"
            aria-hidden="true"
          >
            {panel.code}
          </span>
        </div>
      </motion.div>

      {/* ------------------------------------------------
          INFORMATION STRIP
      ------------------------------------------------ */}

      <motion.div
        className={`scroll-story-info ${
          imageIsLeft
            ? 'scroll-story-info--right'
            : 'scroll-story-info--left'
        }`}
        style={{
          x: infoX,
        }}
      >
        <div className="scroll-story-info__inner">
          <div className="scroll-story-info__number">
            <span>{panel.number}</span>
            <span className="scroll-story-info__slash">
              /
            </span>
            <span>
              {String(total).padStart(2, '0')}
            </span>
          </div>

          <p className="scroll-story-info__eyebrow">
            {panel.eyebrow}
          </p>

          <h2>{panel.title}</h2>

          <p className="scroll-story-info__description">
            {panel.description}
          </p>

          <div className="scroll-story-info__bottom">
            <span>TATTOO FLASH / 2026</span>

            <span className="scroll-story-info__orange-dot" />
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function StoryProgressItem({ panel, index, progress, total }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    progress,
    [start, (start + end) / 2, end],
    [0.25, 1, 0.25],
  );

  return (
    <motion.span style={{ opacity }}>
      {panel.number}
    </motion.span>
  );
}

/* -------------------------------------------------------
   MAIN SECTION
------------------------------------------------------- */

export default function ScrollStory() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const storyProgress = useTransform(
    scrollYProgress,
    (value) => Math.max(0, Math.min(1, value)),
  );

  return (
    <section
      ref={sectionRef}
      className="scroll-story"
      id="story"
      aria-label="Our story"
    >
      <div className="scroll-story__sticky">

        {/* ---------------------------------------------
            BACKGROUND
        --------------------------------------------- */}

        <div
          className="scroll-story__background"
          aria-hidden="true"
        />

        {/* ---------------------------------------------
            TOP UI
        --------------------------------------------- */}

        <div className="scroll-story__top">
          <span>NO ART / COLLECTION</span>

          <span>
            SPRING—SUMMER 2026
          </span>
        </div>

        {/* ---------------------------------------------
            PANELS
        --------------------------------------------- */}

        <div className="scroll-story__viewport">
          {panels.map((panel, index) => (
            <StoryPanel
              key={panel.number}
              panel={panel}
              index={index}
              progress={storyProgress}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* ---------------------------------------------
            SIDE PROGRESS
        --------------------------------------------- */}

        <div
          className="scroll-story__progress"
          aria-hidden="true"
        >
          {panels.map((panel, index) => (
            <StoryProgressItem
              key={panel.number}
              panel={panel}
              index={index}
              progress={storyProgress}
              total={panels.length}
            />
          ))}
        </div>

        {/* ---------------------------------------------
            BOTTOM UI
        --------------------------------------------- */}

        <div className="scroll-story__bottom">
          <span>
            MADE TO STAND OUT.
          </span>

          <span>
            NO ART — 2026
          </span>
        </div>
      </div>
    </section>
  );
}