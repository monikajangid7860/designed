'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const bouncingItems = [
  { left: '14%', bottom: '21%', size: 64, mobileLeft: '9%', mobileBottom: '25%', mobileSize: 43, bounceHeight: 265, mobileBounceHeight: 155, duration: 0.88, delay: 0.08 },
  { left: '30%', bottom: '22%', size: 52, mobileLeft: '30%', mobileBottom: '27%', mobileSize: 38, bounceHeight: 180, mobileBounceHeight: 115, duration: 0.68, delay: 0.42 },
  { left: '48%', bottom: '20%', size: 74, mobileLeft: '51%', mobileBottom: '24%', mobileSize: 49, bounceHeight: 310, mobileBounceHeight: 175, duration: 1.02, delay: 0.2 },
  { left: '66%', bottom: '22%', size: 56, mobileLeft: '73%', mobileBottom: '26%', mobileSize: 40, bounceHeight: 215, mobileBounceHeight: 125, duration: 0.76, delay: 0.58 },
  { left: '83%', bottom: '21%', size: 68, mobileLeft: '84%', mobileBottom: '24%', mobileSize: 44, bounceHeight: 245, mobileBounceHeight: 145, duration: 0.94, delay: 0.31 },
];

const fallingImages = [
  { src: '/images/6a5d143ae35f7d1443801722_0e245a63d919dcfdb2c03e66caf5444d_robin-moon_compress.webp', alt: 'Colorful fashion portrait', tilt: -8 },
  { src: '/images/6a71d2f63fceabbecf986496_person_3_space_compress.webp', alt: 'Playful studio portrait', tilt: 5 },
  { src: '/images/6a71d2f74d114675ed4cf7ee_person_4_space_compress-p-800.webp', alt: 'Expressive fashion portrait', tilt: -4 },
  { src: '/images/6a71d2f77f76827071dc65c3_person_1_space_compress-p-800.webp', alt: 'Bold editorial portrait', tilt: 7 },
  { src: '/images/6a71d2f78077db8442494a7e_person_5_space_compress-p-500.webp', alt: 'Bright fashion portrait', tilt: -6 },
];

function ScallopedEdge() {
  return (
    <svg className="footer-scallop" viewBox="0 0 1200 84" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="footer-scallop-pattern" width="100" height="84" patternUnits="userSpaceOnUse">
          <path d="M0 0H100V22A50 50 0 0 1 0 22Z" fill="#83cce6" />
        </pattern>
      </defs>
      <rect width="1200" height="84" fill="url(#footer-scallop-pattern)" />
    </svg>
  );
}

function PalmTree({ className }) {
  return (
    <svg className={className} viewBox="0 0 250 430" aria-hidden="true">
      <g fill="currentColor">
        <path d="M126 153c-3 59-8 127-23 242h25c20-103 28-174 28-243z" />
        <path d="M132 159c-50-44-92-50-123-34 53 1 83 25 115 56-52-21-87-19-112 2 50-9 83 3 116 23-37-4-61 7-78 28 40-17 69-12 92-1-25 4-40 16-47 35 25-17 48-18 70-8l-2-92z" />
        <path d="M138 158c32-54 70-78 112-76-42 20-65 48-83 83 42-38 77-51 110-41-45 17-71 45-93 76 31-20 59-23 85-12-34 4-57 20-77 45 26-10 48-8 67 5-34-3-62 8-91 34z" />
      </g>
      <g fill="#553b2d">
        <ellipse cx="128" cy="163" rx="13" ry="10" />
        <ellipse cx="148" cy="167" rx="11" ry="9" />
        <ellipse cx="136" cy="181" rx="11" ry="9" />
      </g>
    </svg>
  );
}

function Coconut({ item, isMobile, reducedMotion }) {
  const height = isMobile ? item.mobileBounceHeight : item.bounceHeight;
  const bounce = reducedMotion
    ? { y: 0, scaleX: 1, scaleY: 1 }
    : {
        y: [0, -height * 0.72, -height, 0],
        scaleY: [1, 1, 0.72, 1],
        scaleX: [1, 1, 1.12, 1],
      };

  return (
    <motion.div
      className="footer-coconut"
      style={{
        left: isMobile ? item.mobileLeft : item.left,
        bottom: isMobile ? item.mobileBottom : item.bottom,
        width: isMobile ? item.mobileSize : item.size,
        height: isMobile ? item.mobileSize : item.size,
      }}
      animate={bounce}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              duration: item.duration,
              times: [0, 0.35, 0.52, 1],
              ease: ['easeOut', 'easeOut', 'easeIn'],
              repeat: Infinity,
              repeatType: 'loop',
              delay: item.delay,
            }
      }
    >
      <Image
        src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f965.png"
        alt=""
        fill
        sizes="(max-width: 700px) 50px, 80px"
        quality={90}
        className="footer-coconut__image"
      />
    </motion.div>
  );
}

export default function BouncingFooter() {
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 700px)');
    const updateScreenSize = () => setIsMobile(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener('change', updateScreenSize);
    return () => mediaQuery.removeEventListener('change', updateScreenSize);
  }, []);

  return (
    <footer className="bouncing-footer" id="continuation" aria-label="Palmo Coconut Co. footer">
      <ScallopedEdge />
      <div className="footer-topline">
        <div className="footer-brand">
          <p>PALMO COCONUT CO.</p>
          <span>Good things grow under the sun.</span>
        </div>
        <nav className="footer-navigation" aria-label="Footer navigation">
          <a href="#top">Home</a>
          <a href="#studio-title">Our Story</a>
          <a href="#scrapbook-title">Flavours</a>
          <a href="mailto:hello@palmo.studio">Contact</a>
        </nav>
      </div>

      <div className="footer-photo-drop" aria-label="A playful collection of portraits">
        {fallingImages.map((item, index) => (
          <motion.figure
            className="footer-photo-card"
            key={item.src}
            initial={{ y: -180, opacity: 0, rotate: item.tilt * 2 }}
            whileInView={{ y: 0, opacity: 1, rotate: item.tilt }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reducedMotion
              ? { duration: 0.01 }
              : {
                  duration: 0.85,
                  delay: index * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
          >
            <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 25vw, 16vw" />
          </motion.figure>
        ))}
      </div>

      <PalmTree className="footer-palm footer-palm--left" />
      <PalmTree className="footer-palm footer-palm--right" />

      <h2 className="footer-wordmark">PALMO</h2>

      <div className="footer-fruit-field" aria-label="Bouncing coconuts">
        {bouncingItems.map((item, index) => (
          <Coconut
            item={item}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            key={`${item.left}-${index}`}
          />
        ))}
      </div>

      <div className="footer-bottom-bar">
        <span>© 2026 PALMO COCONUT CO.</span>
        <span>Cookie notice</span>
        <span className="footer-sun-tag">MADE UNDER THE SUN ☼</span>
      </div>
      <span className="footer-score">SCORE 0</span>
    </footer>
  );
}
