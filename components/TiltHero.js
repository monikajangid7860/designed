'use client';

import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const roomImage =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90';

const springSettings = { stiffness: 300, damping: 30, mass: 0.7 };

export default function TiltHero() {
  const [isTouch, setIsTouch] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, springSettings);
  const smoothY = useSpring(mouseY, springSettings);
  const reducedMotion = useReducedMotion();

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-16deg', '16deg']);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px), (hover: none) and (pointer: coarse)');
    const updateInputMode = () => setIsTouch(mediaQuery.matches);

    updateInputMode();
    mediaQuery.addEventListener('change', updateInputMode);
    return () => mediaQuery.removeEventListener('change', updateInputMode);
  }, []);

  const handleMouseMove = (event) => {
    if (isTouch || reducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    mouseY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="tilt-hero"
      aria-label="Swastik Interior Decor, designed around the way you live"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div className="tilt-hero__topline">
        <span>SWASTIK <i /> INTERIOR DECOR</span>
        <span>SPACES WITH A POINT OF VIEW</span>
      </div>

      <div className="tilt-hero__stage">
        <motion.div
          className="tilt-hero__visual"
          style={{
            rotateX: isTouch || reducedMotion ? 0 : rotateX,
            rotateY: isTouch || reducedMotion ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          <Image
            src={roomImage}
            alt="Sunlit contemporary living room with sculptural furniture and natural materials"
            fill
            priority
            sizes="(max-width: 760px) 94vw, 84vw"
            quality={90}
            className="tilt-hero__image"
          />
          <div className="tilt-hero__image-shade" aria-hidden="true" />

          <motion.div className="tilt-hero__copy" style={{ z: 110 }}>
            <p>RESIDENTIAL / MUMBAI / 2026</p>
            <h1>ROOM TO<br />FEEL MORE.</h1>
            <span>DESIGN THAT MEETS YOU WHERE YOU ARE.</span>
          </motion.div>

          <div className="tilt-hero__image-index" aria-hidden="true">01 — 04</div>
        </motion.div>
      </div>

      <div className="tilt-hero__bottomline">
        <span>MADE FOR THE WAY YOU LIVE</span>
        <span className="tilt-hero__interaction">
          {isTouch ? 'A PLACE TO PAUSE' : 'MOVE TO EXPLORE'}
          {!isTouch && <i aria-hidden="true" />}
        </span>
        <span>01 / 04</span>
      </div>
    </section>
  );
}