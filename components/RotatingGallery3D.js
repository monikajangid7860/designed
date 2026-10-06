'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85',
    title: 'Belgian Red Devils',
    alt: 'A vivid crowd gathered for an event',
    x: '-35vw', y: '-15vh', z: '-1800px', rotateY: '15deg', rotateZ: '-5deg',
    mobileX: '-22vw', mobileY: '-16vh', mobileZ: '-1500px',
    width: '24vw', height: '31vw',
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    title: 'Ibiza Off-Season',
    alt: 'Fashion portrait outdoors in warm light',
    x: '25vw', y: '20vh', z: '-2400px', rotateY: '-20deg', rotateZ: '2deg',
    mobileX: '22vw', mobileY: '18vh', mobileZ: '-1850px',
    width: '22vw', height: '30vw',
  },
  {
    src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
    title: 'Adidas x Tzolis',
    alt: 'Streetwear editorial in an urban setting',
    x: '0vw', y: '35vh', z: '-2700px', rotateY: '5deg', rotateZ: '0deg',
    mobileX: '0vw', mobileY: '34vh', mobileZ: '-2200px',
    width: '25vw', height: '26vw',
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85',
    title: 'Formula 1',
    alt: 'A sunlit landscape with distant mountains',
    x: '-20vw', y: '10vh', z: '-2100px', rotateY: '10deg', rotateZ: '4deg',
    mobileX: '-17vw', mobileY: '9vh', mobileZ: '-1750px',
    width: '20vw', height: '26vw',
  },
  {
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85',
    title: 'Boss',
    alt: 'Editorial portrait in soft daylight',
    x: '30vw', y: '-25vh', z: '-2500px', rotateY: '-15deg', rotateZ: '-2deg',
    mobileX: '22vw', mobileY: '-26vh', mobileZ: '-2050px',
    width: '21vw', height: '29vw',
  },
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85',
    title: 'Night Signals',
    alt: 'Stage lights illuminating a live performance',
    x: '13vw', y: '-37vh', z: '-3100px', rotateY: '-9deg', rotateZ: '-4deg',
    mobileX: '10vw', mobileY: '-34vh', mobileZ: '-2500px',
    width: '26vw', height: '20vw',
  },
  {
    src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85',
    title: 'After the Last Light',
    alt: 'A quiet mountain landscape at dusk',
    x: '-12vw', y: '-4vh', z: '-3500px', rotateY: '12deg', rotateZ: '2deg',
    mobileX: '-8vw', mobileY: '-4vh', mobileZ: '-2850px',
    width: '19vw', height: '25vw',
  },
];

function WorldMap() {
  return (
    <svg className="spatial-gallery-map" viewBox="0 0 1200 620" aria-hidden="true">
      <path d="M78 172 116 139 170 126 207 96 252 100 278 125 319 121 346 145 327 174 293 183 275 211 241 219 218 252 186 258 166 296 130 290 112 263 83 247 68 215Z" />
      <path d="m288 295 38 22 21 47-5 56 28 43-18 56-39-16-22-50-33-42 8-63Z" />
      <path d="m495 143 39-34 54 8 25-23 62 6 43-19 49 24 26-9 38 29 48 5 24 27-22 24-50-4-31 28-52-7-17 29-42 5-20 32-45-4-17-30-38 1-25-31-45 0-32-27-43-4Z" />
      <path d="m566 285 35-13 51 9 32 28 12 44-29 49-18 67-34 30-22-44-14-59-29-34 4-53Z" />
      <path d="m760 303 57-31 62 8 31-19 58 17 49 38-12 42-55 8-21 38-52 10-38-26-57 1-37-32Z" />
      <path d="m984 430 27-17 37 10 15 29-27 19-37-9Z" />
      <path d="m408 125 23-14 19 9-3 23-19 14-22-9Z" />
      <path d="m711 453 31-11 24 16-8 26-36 9-18-19Z" />
    </svg>
  );
}

function GalleryCard({ image, index, isMobile }) {
  const style = {
    '--card-x': image.x,
    '--card-y': image.y,
    '--card-z': image.z,
    '--card-rotate-y': image.rotateY,
    '--card-rotate-z': image.rotateZ,
    '--card-width': image.width,
    '--card-height': image.height,
    '--mobile-card-x': image.mobileX,
    '--mobile-card-y': image.mobileY,
    '--mobile-card-z': image.mobileZ,
    '--mobile-card-rotate-y': image.rotateY,
    '--mobile-card-rotate-z': image.rotateZ,
    '--mobile-card-width': 'min(54vw, 250px)',
    '--mobile-card-height': 'min(42vh, 310px)',
    zIndex: index + 1,
  };

  return (
    <motion.article
      className="spatial-gallery-card"
      style={style}
      aria-label={image.title}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={index < 2}
        sizes="(max-width: 760px) 54vw, 26vw"
        quality={90}
        className="spatial-gallery-card__image"
      />
      <span className="spatial-gallery-card__shade" aria-hidden="true" />
      <p className="spatial-gallery-card__title">{image.title}</p>
    </motion.article>
  );
}

export default function RotatingGallery3D() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const updateScreenSize = () => setIsMobile(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener('change', updateScreenSize);
    return () => mediaQuery.removeEventListener('change', updateScreenSize);
  }, []);

  const zTravel = reducedMotion ? 0 : isMobile ? 800 : 1500;
  const rotationTravel = reducedMotion ? 0 : isMobile ? 14 : 30;
  const zOffset = useTransform(scrollYProgress, [0, 1], [0, zTravel]);
  const yRotation = useTransform(scrollYProgress, [0, 1], [0, rotationTravel]);

  return (
    <section
      className="spatial-gallery-track"
      ref={containerRef}
      aria-label="Galería espacial"
    >
      <div className="spatial-gallery-camera">
        <WorldMap />
        <p className="spatial-gallery-words" aria-hidden="true">OTHER WORDS.</p>

        <nav className="spatial-gallery-ui" aria-label="Gallery navigation">
          <a href="#spatial-gallery">Gallery Play</a>
          <a href="#continuation">Menu</a>
        </nav>

        <motion.div
          className="spatial-gallery-world"
          id="spatial-gallery"
          style={{
            z: zOffset,
            rotateY: yRotation,
            scale: isMobile ? 0.6 : 1,
            transformStyle: 'preserve-3d',
          }}
        >
          {images.map((image, index) => (
            <GalleryCard
              key={image.title}
              image={image}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        <div className="spatial-gallery-footer" aria-hidden="true">
          <span>Selected image stories</span>
          <span>Scroll to explore · 01—07</span>
        </div>
      </div>
    </section>
  );
}