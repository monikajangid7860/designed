'use client';

import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/* =========================================================
   ART-DIRECTED FLOATING IMAGES
========================================================= */

const floaters = [
  {
    src: '/images/6a5d143ae35f7d1443801722_0e245a63d919dcfdb2c03e66caf5444d_robin-moon_compress.webp',
    imageWidth: 1173,
    imageHeight: 1247,
    top: '7%',
    width: 'clamp(112px, 14vw, 196px)',
    mobileWidth: 'clamp(84px, 24vw, 138px)',
    zIndex: 12,

    rotation: -7,

    // Desktop movement
    startX: '-48vw',
    endX: '24vw',
    yPath: ['0vh', '-8vh', '5vh', '-4vh', '0vh'],
    scalePath: [0.78, 1.05, 0.92, 1.08, 0.82],
    rotatePath: [-7, -2, 4, -1, 5],
    opacityPath: [0, 1, 1, 0.7, 0],

    // Mobile
    mobileStartX: '-38vw',
    mobileEndX: '16vw',
    mobileYPath: ['0vh', '-4vh', '3vh', '-2vh', '0vh'],
    mobileScalePath: [0.82, 1, 0.9, 1, 0.84],
  },

  {
    src: '/images/6a71d2f63fceabbecf986496_person_3_space_compress.webp',
    imageWidth: 1696,
    imageHeight: 2528,
    top: '54%',
    width: 'clamp(104px, 12vw, 170px)',
    mobileWidth: 'clamp(78px, 22vw, 126px)',
    zIndex: 44,

    rotation: 8,

    startX: '46vw',
    endX: '-28vw',
    yPath: ['0vh', '7vh', '-4vh', '6vh', '0vh'],
    scalePath: [0.82, 1.08, 0.92, 1.18, 0.78],
    rotatePath: [8, 3, -4, 2, -7],
    opacityPath: [0, 1, 1, 0.75, 0],

    mobileStartX: '38vw',
    mobileEndX: '-18vw',
    mobileYPath: ['0vh', '4vh', '-3vh', '3vh', '0vh'],
    mobileScalePath: [0.85, 1, 0.9, 1.05, 0.8],
  },

  {
    src: '/images/6a71d2f74d114675ed4cf7ee_person_4_space_compress-p-800.webp',
    imageWidth: 800,
    imageHeight: 1192,
    top: '15%',
    width: 'clamp(110px, 13vw, 180px)',
    mobileWidth: 'clamp(82px, 23vw, 132px)',
    zIndex: 18,

    rotation: 5,

    startX: '-24vw',
    endX: '42vw',
    yPath: ['0vh', '9vh', '-6vh', '4vh', '0vh'],
    scalePath: [0.72, 0.96, 1.18, 0.9, 0.76],
    rotatePath: [5, 1, -5, 3, 8],
    opacityPath: [0, 1, 1, 0.55, 0],

    mobileStartX: '-22vw',
    mobileEndX: '28vw',
    mobileYPath: ['0vh', '5vh', '-4vh', '3vh', '0vh'],
    mobileScalePath: [0.78, 0.96, 1.05, 0.88, 0.76],
  },

//   {
//     src: '/images/6a71d2f77c7b88707989c055_person_8_space_compress-p-1600.webp',
//     imageWidth: 1600,
//     imageHeight: 2385,
//     top: '65%',
//     width: 'clamp(96px, 11vw, 156px)',
//     mobileWidth: 'clamp(74px, 20vw, 116px)',
//     zIndex: 8,

//     rotation: -5,

//     startX: '26vw',
//     endX: '-46vw',
//     yPath: ['0vh', '-6vh', '8vh', '-5vh', '0vh'],
//     scalePath: [0.8, 1.02, 0.86, 1.1, 0.74],
//     rotatePath: [-5, -1, 6, -4, -8],
//     opacityPath: [0, 0.9, 1, 0.6, 0],

//     mobileStartX: '24vw',
//     mobileEndX: '-30vw',
//     mobileYPath: ['0vh', '-3vh', '4vh', '-3vh', '0vh'],
//     mobileScalePath: [0.82, 1, 0.88, 1.04, 0.78],
//   },

  {
    src: '/images/6a71d2f77f76827071dc65c3_person_1_space_compress-p-800.webp',
    imageWidth: 800,
    imageHeight: 1192,
    top: '35%',
    width: 'clamp(108px, 13vw, 182px)',
    mobileWidth: 'clamp(82px, 22vw, 128px)',
    zIndex: 46,

    rotation: 6,

    startX: '-58vw',
    endX: '48vw',
    yPath: ['0vh', '6vh', '-8vh', '5vh', '0vh'],
    scalePath: [0.76, 1.1, 0.86, 1.22, 0.72],
    rotatePath: [6, 0, -6, 4, 9],
    opacityPath: [0, 1, 1, 0.65, 0],

    mobileStartX: '-45vw',
    mobileEndX: '34vw',
    mobileYPath: ['0vh', '3vh', '-4vh', '3vh', '0vh'],
    mobileScalePath: [0.82, 1.04, 0.9, 1.08, 0.76],
  },

  {
    src: '/images/6a71d2f78077db8442494a7e_person_5_space_compress-p-500.webp',
    imageWidth: 500,
    imageHeight: 745,
    top: '10%',
    width: 'clamp(102px, 12vw, 168px)',
    mobileWidth: 'clamp(78px, 21vw, 122px)',
    zIndex: 22,

    rotation: -8,

    startX: '54vw',
    endX: '-44vw',
    yPath: ['0vh', '-7vh', '5vh', '-7vh', '0vh'],
    scalePath: [0.75, 1.04, 0.88, 1.14, 0.72],
    rotatePath: [-8, -3, 5, -2, -9],
    opacityPath: [0, 1, 1, 0.65, 0],

    mobileStartX: '42vw',
    mobileEndX: '-32vw',
    mobileYPath: ['0vh', '-4vh', '3vh', '-3vh', '0vh'],
    mobileScalePath: [0.8, 1, 0.9, 1.04, 0.76],
  },
  {
    src: '/images/6a71d2f7c92902edb59cec4b_person_2_space_compress-p-1600.webp',
    imageWidth: 1600,
    imageHeight: 2385,
    top: '25%',
    width: 'clamp(104px, 12vw, 170px)',
    mobileWidth: 'clamp(78px, 21vw, 122px)',
    zIndex: 28,
    rotation: 7,
    startX: '-52vw',
    endX: '38vw',
    yPath: ['0vh', '8vh', '-5vh', '6vh', '0vh'],
    scalePath: [0.8, 1.04, 0.9, 1.12, 0.76],
    rotatePath: [7, 2, -5, 3, -6],
    opacityPath: [0, 1, 1, 0.7, 0],
    mobileStartX: '-40vw',
    mobileEndX: '28vw',
    mobileYPath: ['0vh', '4vh', '-3vh', '4vh', '0vh'],
    mobileScalePath: [0.82, 1, 0.9, 1.04, 0.78],
  },
  {
    src: '/images/6a71d2f7f2a8cb74a99ed69d_person_7_space_compress-p-1080.webp',
    imageWidth: 1080,
    imageHeight: 1610,
    top: '48%',
    width: 'clamp(106px, 13vw, 180px)',
    mobileWidth: 'clamp(80px, 22vw, 128px)',
    zIndex: 38,
    rotation: -6,
    startX: '50vw',
    endX: '-38vw',
    yPath: ['0vh', '-7vh', '5vh', '-4vh', '0vh'],
    scalePath: [0.78, 1.06, 0.9, 1.1, 0.74],
    rotatePath: [-6, -2, 5, -3, 7],
    opacityPath: [0, 1, 1, 0.68, 0],
    mobileStartX: '38vw',
    mobileEndX: '-28vw',
    mobileYPath: ['0vh', '-4vh', '3vh', '-3vh', '0vh'],
    mobileScalePath: [0.82, 1, 0.9, 1.04, 0.76],
  },
//   {
//     src: '/images/6a9684b8d359295e43e7baf2_celine-space@2x_compress-p-500.webp',
//     imageWidth: 500,
//     imageHeight: 745,
//     top: '18%',
//     width: 'clamp(108px, 13vw, 182px)',
//     mobileWidth: 'clamp(82px, 22vw, 128px)',
//     zIndex: 20,
//     rotation: 5,
//     startX: '-30vw',
//     endX: '46vw',
//     yPath: ['0vh', '6vh', '-6vh', '3vh', '0vh'],
//     scalePath: [0.76, 1.02, 0.9, 1.14, 0.74],
//     rotatePath: [5, 0, -4, 3, 7],
//     opacityPath: [0, 1, 1, 0.64, 0],
//     mobileStartX: '-26vw',
//     mobileEndX: '32vw',
//     mobileYPath: ['0vh', '3vh', '-4vh', '2vh', '0vh'],
//     mobileScalePath: [0.8, 0.98, 0.9, 1.06, 0.76],
//   },
];

const desktopCenterOffsets = [
  '-38vw', '-19vw', '0vw', '19vw', '38vw', '-32vw', '-16vw', '16vw', '32vw',
];
const mobileCenterOffsets = [
  '-28vw', '-14vw', '0vw', '14vw', '28vw', '-24vw', '-12vw', '12vw', '24vw',
];

/* =========================================================
   FLOATING IMAGE
========================================================= */

function FloatingImage({
  item,
  index,
  progress,
  isCompact,
  reducedMotion,
}) {
  /*
    Give every image a slightly different section timing.
    This prevents all six portraits from moving together.
  */

  const start = item.startProgress ?? index * 0.035;
  const end = item.endProgress ?? Math.min(0.95, 0.82 + index * 0.025);
  const centerX = (isCompact ? mobileCenterOffsets : desktopCenterOffsets)[index] ?? '0vw';

  const localProgress = useTransform(
    progress,
    [start, end],
    [0, 1]
  );

  /* ---------------------------------------------
     Desktop / mobile paths
  --------------------------------------------- */

  const x = useTransform(
    localProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isCompact
      ? [
          item.mobileStartX,
          `${parseFloat(item.mobileStartX) * 0.55}vw`,
          centerX,
          `${parseFloat(item.mobileEndX) * 0.5}vw`,
          item.mobileEndX,
        ]
      : [
          item.startX,
          `${parseFloat(item.startX) * 0.55}vw`,
          centerX,
          `${parseFloat(item.endX) * 0.55}vw`,
          item.endX,
        ]
  );

  const y = useTransform(
    localProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isCompact
      ? item.mobileYPath
      : item.yPath
  );

  const scale = useTransform(
    localProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isCompact
      ? item.mobileScalePath
      : item.scalePath
  );

  const rotate = useTransform(
    localProgress,
    [0, 0.25, 0.5, 0.75, 1],
    item.rotatePath
  );

  const opacity = useTransform(
    localProgress,
    isCompact
      ? [0, 0.12, 0.25, 0.78, 0.92, 1]
      : [0, 0.25, 0.5, 0.75, 1],
    isCompact
      ? [0, 0.8, 1, 1, 0.5, 0]
      : item.opacityPath
  );

  /*
    Slight blur while entering/leaving.
    Keep it very subtle.
  */

  const blur = useTransform(
    localProgress,
    [0, 0.15, 0.85, 1],
    ['3px', '0px', '0px', '2px']
  );

  return (
    <motion.div
      className={`zigzag-team-float zigzag-team-float--${index % 3}`}
      style={{
        '--float-width': item.width,
        '--float-mobile-width': item.mobileWidth,
        top: item.top,

        zIndex: item.zIndex,

        x: reducedMotion
          ? item.restX || 0
          : x,

        y: reducedMotion ? 0 : y,

        scale: reducedMotion ? 1 : scale,

        rotate: reducedMotion
          ? item.rotation
          : rotate,

        opacity: reducedMotion ? 1 : opacity,

        filter: reducedMotion
          ? 'none'
          : blur,
      }}
      aria-hidden="true"
    >
      <Image
        src={item.src}
        alt=""
        width={item.imageWidth}
        height={item.imageHeight}
        sizes="(max-width: 760px) 24vw, 14vw"
        quality={90}
        style={{ transform: 'translateX(-50%)' }}
        className="zigzag-team-float__image"
      />
    </motion.div>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function ZigzagTeamFloat() {
  const containerRef = useRef(null);

  const [isCompact, setIsCompact] = useState(false);

  const reducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* ---------------------------------------------
     Responsive detection
  --------------------------------------------- */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(max-width: 760px)'
    );

    const updateLayout = () => {
      setIsCompact(mediaQuery.matches);
    };

    updateLayout();

    mediaQuery.addEventListener(
      'change',
      updateLayout
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        updateLayout
      );
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="zigzag-team"
      aria-labelledby="zigzag-team-title"
    >
      {/* ---------------------------------------------
          STICKY VIEWPORT
      --------------------------------------------- */}

      <div className="zigzag-team__sticky">

        {/* ---------------------------------------------
            TOP LABELS
        --------------------------------------------- */}

        <span className="zigzag-team__label zigzag-team__label--left">
          SEROTONINN / PEOPLE
        </span>

        <span className="zigzag-team__label zigzag-team__label--right">
          THE CREATIVE COLLECTIVE
        </span>

        {/* ---------------------------------------------
            CENTER GRID
        --------------------------------------------- */}

        <div
          className="zigzag-team__grid"
          aria-hidden="true"
        />

        {/* ---------------------------------------------
            FLOATING PORTRAITS
        --------------------------------------------- */}

        {floaters.map((item, index) => (
          <FloatingImage
            key={item.src}
            item={item}
            index={index}
            progress={scrollYProgress}
            isCompact={isCompact}
            reducedMotion={reducedMotion}
          />
        ))}

        {/* ---------------------------------------------
            CENTER COPY
        --------------------------------------------- */}

        <div className="zigzag-team__copy">
          <div className="zigzag-team__copy-inner">

            <p className="zigzag-team__eyebrow">
              GOOD IDEAS TAKE A GOOD TEAM
            </p>

            <h2
              className="zigzag-team__title"
              id="zigzag-team-title"
              aria-label="The talent behind the brand"
            >
              <Image
                src="/images/textmiddle.svg"
                alt=""
                width={303}
                height={124}
                style={{ width: 'min(78vw, 560px)', height: 'auto' }}
              />
            </h2>

            <a
              className="zigzag-team__button"
              href="#studio-title"
            >
              Meet the Team
              <span aria-hidden="true">
                ↗
              </span>
            </a>

          </div>
        </div>

        {/* ---------------------------------------------
            CENTER CROSSHAIR
        --------------------------------------------- */}

        <span
          className="zigzag-team__crosshair"
          aria-hidden="true"
        >
          +
        </span>

        {/* ---------------------------------------------
            BOTTOM INDEX
        --------------------------------------------- */}

        <span
          className="zigzag-team__index"
          aria-hidden="true"
        >
          PEOPLE MAKE THE DIFFERENCE

          <span>
            {String(floaters.length).padStart(2, '0')} / {String(floaters.length).padStart(2, '0')}
          </span>
        </span>

      </div>
    </section>
  );
}