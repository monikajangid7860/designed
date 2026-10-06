'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const rows = [
  { type: 'single', text: 'ADAMIX' },
  {
    type: 'split',
    leftText: 'SAVE',
    rightText: 'FOOD',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85',
    alt: 'A colorful table of fresh food',
  },
  { type: 'single', text: 'CLOSETLY' },
  {
    type: 'split',
    leftText: 'MAKE',
    rightText: 'ART',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85',
    alt: 'Paint and materials arranged in an artist studio',
  },
];

function AnimatedRow({ row }) {
  const rowRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 1', 'center center'],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 700px)');
    const updateScreenSize = () => setIsMobile(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener('change', updateScreenSize);
    return () => mediaQuery.removeEventListener('change', updateScreenSize);
  }, []);

  const travel = isMobile ? 20 : 18;
  const leftX = useTransform(scrollYProgress, [0, 1], ['0vw', `-${travel}vw`]);
  const rightX = useTransform(scrollYProgress, [0, 1], ['0vw', `${travel}vw`]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [0, 0, 1]);

  if (row.type === 'single') {
    return (
      <div className="typographic-row typographic-row--single" ref={rowRef}>
        <h3 className="typographic-single-word">{row.text}</h3>
      </div>
    );
  }

  return (
    <div className="typographic-row typographic-row--split" ref={rowRef}>
      <div className="typographic-split-side typographic-split-side--left">
        <motion.h3 className="typographic-split-word" style={{ x: leftX }}>
          {row.leftText}
        </motion.h3>
      </div>

      <div className="typographic-split-image-position" aria-hidden="true">
        <motion.div
          className="typographic-split-image"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <Image
            src={row.image}
            alt={row.alt}
            fill
            sizes="(max-width: 700px) 42vw, 30vw"
            quality={85}
            className="typographic-split-image__photo"
          />
        </motion.div>
      </div>

      <div className="typographic-split-side typographic-split-side--right">
        <motion.h3 className="typographic-split-word" style={{ x: rightX }}>
          {row.rightText}
        </motion.h3>
      </div>
    </div>
  );
}

export default function TypographicSplit() {
  return (
    <section className="typographic-split-section" aria-labelledby="typographic-split-title">
      <h2 className="sr-only" id="typographic-split-title">Ideas in motion</h2>
      {rows.map((row, index) => (
        <AnimatedRow key={`${row.type}-${row.text || row.leftText}-${index}`} row={row} />
      ))}
    </section>
  );
}