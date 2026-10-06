'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navigation from './Navigation';

const HERO_IMAGE =
  'images/bold_img.webp';

const MOTION = {
  titleOpacity: [0, 0.2, 0.48, 1],
  titleScale: [0, 0.48, 1],
  photoOpacity: [0, 0.16, 0.52, 1],
  photoScale: [0, 0.18, 0.55, 0.84, 1],
  photoScaleValues: [0.5, 0.56, 1.12, 1.42, 1.5],
  photoY: [0, 0.55, 1],
  photoYValues: ['5vh', '0vh', '-1vh'],
  yellowOpacity: [0, 0.4, 0.72, 1],
  buttonOpacity: [0, 0.12, 0.3, 1],
  dotOpacity: [0, 0.25, 0.55, 1],
};

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const titleOpacity = useTransform(scrollYProgress, MOTION.titleOpacity, [1, 1, 0, 0]);
  const titleScale = useTransform(scrollYProgress, MOTION.titleScale, [1, 0.92, 0.76]);
  const photoOpacity = useTransform(scrollYProgress, MOTION.photoOpacity, [0, 0, 1, 1]);
  const photoScale = useTransform(
    scrollYProgress,
    MOTION.photoScale,
    MOTION.photoScaleValues,
  );
  const photoY = useTransform(scrollYProgress, MOTION.photoY, MOTION.photoYValues);
  const yellowOpacity = useTransform(scrollYProgress, MOTION.yellowOpacity, [1, 1, 0.72, 0]);
  const buttonOpacity = useTransform(scrollYProgress, MOTION.buttonOpacity, [1, 1, 0, 0]);
  const dotOpacity = useTransform(scrollYProgress, MOTION.dotOpacity, [1, 1, 0, 0]);

  return (
    <section className="hero-track" ref={sectionRef} aria-label="Fuori Campo">
      <div className="hero-sticky">
        <motion.div className="hero-yellow" style={{ opacity: yellowOpacity }} />

        <motion.div
          className="hero-photo"
          style={{ opacity: photoOpacity, scale: photoScale, y: photoY }}
          aria-hidden="true"
        >
          <Image
            src={HERO_IMAGE}
            alt="Ritratto editoriale in una strada assolata"
            fill
            priority
            sizes="(max-width: 700px) 92vw, 86vw"
            quality={90}
            className="hero-photo__image"
          />
        </motion.div>

        <motion.div className="hero-copy" style={{ opacity: titleOpacity, scale: titleScale }}>
          <p className="hero-kicker">UN ATLANTE VISIVO CONTEMPORANEO</p>
          <h1 className="hero-title">
            FUORI
            <span>CAMPO</span>
          </h1>
          <p className="hero-subtitle">IMMAGINI IN MOVIMENTO · VOL. 01</p>
          <motion.a
            className="buy-button"
            href="#continuation"
            style={{ opacity: buttonOpacity }}
          >
            Buy Book <span aria-hidden="true">↗</span>
          </motion.a>
        </motion.div>

        <motion.span className="hero-dot" style={{ opacity: dotOpacity }} aria-hidden="true" />
        <Navigation />
        <span className="hero-scroll" aria-hidden="true">SCORRI PER ENTRARE</span>
      </div>
    </section>
  );
}