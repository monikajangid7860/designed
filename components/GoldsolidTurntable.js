'use client';

import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';

const views = Array.from({ length: 8 }, (_, index) => {
  const number = index + 1;
  return `/images/GOLDSOLIDO${number}.jpg`;
});

export default function GoldsolidTurntable() {
  const sectionRef = useRef(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextFrame = Math.min(views.length - 1, Math.floor(progress * views.length));
    setFrameIndex((currentFrame) => currentFrame === nextFrame ? currentFrame : nextFrame);
  });

  return (
    <section
      ref={sectionRef}
      className="goldsolid-turntable"
      aria-labelledby="goldsolid-turntable-title"
    >
      <div className="goldsolid-turntable__sticky">
        <div className="goldsolid-turntable__topline">
          <h2 id="goldsolid-turntable-title">GOLDSOLID</h2>
          <span>OBJECT STUDY / 001</span>
        </div>

        <div className="goldsolid-turntable__stage" role="img" aria-label="Gold Solid off-road car shown from multiple angles">
          {views.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              priority={index === 0}
              loading="eager"
              sizes="(max-width: 700px) 118vw, 92vw"
              className={`goldsolid-turntable__view${index === frameIndex ? ' is-active' : ''}`}
            />
          ))}
        </div>

        <div className="goldsolid-turntable__footer" aria-hidden="true">
          <span>FORM / FINISH / FREEDOM</span>
          <span>{String(frameIndex + 1).padStart(2, '0')} / {String(views.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}