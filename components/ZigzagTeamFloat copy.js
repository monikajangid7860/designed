'use client';

import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const floaters = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=640&h=900&q=85',
    top: '7%',
    width: 'clamp(112px, 14vw, 196px)',
    mobileWidth: 'clamp(84px, 24vw, 138px)',
    delay: 0,
    zIndex: 12,
    rotation: -7,
    restX: '-38vw',
    objectPosition: '50% 34%',
  },
  {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=640&h=900&q=85',
    top: '54%',
    width: 'clamp(104px, 12vw, 170px)',
    mobileWidth: 'clamp(78px, 22vw, 126px)',
    delay: 0.12,
    zIndex: 44,
    rotation: 8,
    restX: '37vw',
    objectPosition: '50% 28%',
  },
  {
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&crop=faces&w=640&h=900&q=85',
    top: '15%',
    width: 'clamp(110px, 13vw, 180px)',
    mobileWidth: 'clamp(82px, 23vw, 132px)',
    delay: 0.23,
    zIndex: 18,
    rotation: 5,
    restX: '-12vw',
    objectPosition: '50% 30%',
  },
  {
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=640&h=900&q=85',
    top: '65%',
    width: 'clamp(96px, 11vw, 156px)',
    mobileWidth: 'clamp(74px, 20vw, 116px)',
    delay: 0.34,
    zIndex: 8,
    rotation: -5,
    restX: '13vw',
    objectPosition: '50% 30%',
  },
  {
    src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&crop=faces&w=640&h=900&q=85',
    top: '35%',
    width: 'clamp(108px, 13vw, 182px)',
    mobileWidth: 'clamp(82px, 22vw, 128px)',
    delay: 0.45,
    zIndex: 46,
    rotation: 6,
    restX: '-45vw',
    objectPosition: '50% 30%',
  },
  {
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&crop=faces&w=640&h=900&q=85',
    top: '10%',
    width: 'clamp(102px, 12vw, 168px)',
    mobileWidth: 'clamp(78px, 21vw, 122px)',
    delay: 0.55,
    zIndex: 22,
    rotation: -8,
    restX: '44vw',
    objectPosition: '50% 28%',
  },
];

function FloatingImage({ item, index, progress, isCompact, reducedMotion }) {
  const localProgress = useTransform(progress, [item.delay, 1], [0, 1]);
  const travel = isCompact ? ['50vw', '-50vw'] : ['100vw', '-100vw'];
  const verticalTravel = isCompact ? 8 : 15;
  const yPath = index % 2 === 0
    ? ['0vh', `-${verticalTravel}vh`, `${verticalTravel}vh`, `-${verticalTravel}vh`, '0vh']
    : ['0vh', `${verticalTravel}vh`, `-${verticalTravel}vh`, `${verticalTravel}vh`, '0vh'];
  const scalePath = index % 2 === 0
    ? [0.82, 1.2, 0.84, 1.26, 0.9]
    : [1.08, 0.8, 1.24, 0.86, 1.12];

  const x = useTransform(localProgress, [0, 1], travel);
  const y = useTransform(localProgress, [0, 0.25, 0.5, 0.75, 1], yPath);
  const scale = useTransform(localProgress, [0, 0.25, 0.5, 0.75, 1], scalePath);

  return (
    <motion.div
      className={`zigzag-team-float absolute will-change-transform zigzag-team-float--${index % 3}`}
      style={{
        '--float-width': item.width,
        '--float-mobile-width': item.mobileWidth,
        top: item.top,
        zIndex: item.zIndex,
        x: reducedMotion ? item.restX : x,
        y: reducedMotion ? 0 : y,
        scale: reducedMotion ? 1 : scale,
        rotate: item.rotation,
      }}
      aria-hidden="true"
    >
      <Image
        src={item.src}
        alt=""
        fill
        sizes="(max-width: 760px) 24vw, 14vw"
        quality={85}
        className="zigzag-team-float__image"
        style={{ objectPosition: item.objectPosition }}
      />
    </motion.div>
  );
}

export default function ZigzagTeamFloat() {
  const containerRef = useRef(null);
  const [isCompact, setIsCompact] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const updateLayout = () => setIsCompact(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);
    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  return (
    <section
      className="zigzag-team relative h-[300vh] bg-[#0A0A0A] text-[#FAFAFA]"
      ref={containerRef}
      aria-labelledby="zigzag-team-title"
    >
      <div className="zigzag-team__sticky sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A]">
        <span className="zigzag-team__label zigzag-team__label--left">
          PALMO / PEOPLE
        </span>
        <span className="zigzag-team__label zigzag-team__label--right">
          THE CREATIVE COLLECTIVE
        </span>

        {floaters.map((item, index) => (
          <FloatingImage
            item={item}
            index={index}
            progress={scrollYProgress}
            isCompact={isCompact}
            reducedMotion={reducedMotion}
            key={item.src}
          />
        ))}

        <div className="zigzag-team__copy absolute inset-0 z-50 flex translate-y-0 items-center justify-center px-5 text-center">
          <div className="zigzag-team__copy-inner">
            <p className="zigzag-team__eyebrow">GOOD IDEAS TAKE A GOOD TEAM</p>
            <h2 className="zigzag-team__title" id="zigzag-team-title">
              <span>THE TALENT</span>
              <span>BEHIND THE BRAND</span>
            </h2>
            <a className="zigzag-team__button" href="#studio-title">
              Meet the Team <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <span className="zigzag-team__index" aria-hidden="true">
          PEOPLE MAKE THE DIFFERENCE <span>06 / 06</span>
        </span>
      </div>
    </section>
  );
}