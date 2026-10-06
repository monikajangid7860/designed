'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function CleatShowcase() {
  const sectionRef = useRef(null);
  const [isCompact, setIsCompact] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 700px)');
    const updateLayout = () => setIsCompact(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);
    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  const shoeX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.82, 1],
    isCompact ? ['0vw', '0vw', '0vw', '0vw'] : ['0vw', '0vw', '-25vw', '-25vw'],
  );
  const shoeY = useTransform(
    scrollYProgress,
    [0, 0.4, 0.82, 1],
    isCompact ? ['0vh', '0vh', '-14vh', '-14vh'] : ['0vh', '0vh', '1vh', '1vh'],
  );
  const shoeScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.82, 1],
    isCompact ? [1, 1, 0.64, 0.64] : [1, 1, 0.62, 0.62],
  );
  const copyOpacity = useTransform(scrollYProgress, (progress) =>
    Math.max(0, Math.min(1, (progress - 0.55) / 0.23)),
  );
  const copyX = useTransform(scrollYProgress, [0.36, 0.78, 1], ['36px', '0px', '0px']);

  return (
    <section
      ref={sectionRef}
      className="cleat-showcase"
      aria-labelledby="cleat-showcase-title"
    >
      <div className="cleat-showcase__sticky">
        <p className="cleat-showcase__index">SEROTONINN / OBJECT STUDY 01</p>

        <motion.div
          className="cleat-showcase__shoe"
          style={{
            x: reducedMotion ? (isCompact ? 0 : '-25vw') : shoeX,
            y: reducedMotion ? (isCompact ? '-14vh' : '1vh') : shoeY,
            scale: reducedMotion ? (isCompact ? 0.64 : 0.62) : shoeScale,
          }}
        >
          <Image
            src="/images/cleat-gold-3d.webp"
            alt="Gold-and-white football cleat with sculpted studs"
            fill
            priority
            sizes="(max-width: 700px) 96vw, 76vw"
            className="cleat-showcase__image"
          />
        </motion.div>

        <motion.div
          className="cleat-showcase__copy"
          style={{
            opacity: reducedMotion ? 1 : copyOpacity,
            x: reducedMotion ? 0 : copyX,
          }}
        >
          <p className="cleat-showcase__eyebrow">MADE TO BE SEEN</p>
          <h2 id="cleat-showcase-title">GOLD<br />IN MOTION.</h2>
          <p className="cleat-showcase__description">
            A flash of gold. A sculptural silhouette. A cleat that turns every step into a statement.
          </p>
          <a className="cleat-showcase__link" href="#viewfinder-gallery-title">
            EXPLORE THE COLLECTION <span aria-hidden="true">↗</span>
          </a>
        </motion.div>

        <span className="cleat-showcase__footnote">01 — FORM / FINISH / FEEL</span>
      </div>
    </section>
  );
}