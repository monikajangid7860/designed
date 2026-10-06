'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const floaters = [
  {
    type: 'product',
    src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f9f4.png',
    alt: 'Yellow lotion bottle cutout',
    x: '7%', y: '39%', mobileX: '4%', mobileY: '39%',
    size: 'clamp(100px, 14vw, 190px)', mobileSize: 'min(34vw, 132px)',
    rotate: -14, delay: 0.08, duration: 3.2,
  },
  {
    type: 'note', text: 'A little joy, every day.', color: '#8dde94',
    x: '14%', y: '68%', mobileX: '4%', mobileY: '59%',
    rotate: 6, delay: 0.2, duration: 4.1,
  },
  {
    type: 'product',
    src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f36f.png',
    alt: 'Honey jar cutout',
    x: '77%', y: '41%', mobileX: '65%', mobileY: '39%',
    size: 'clamp(92px, 12vw, 162px)', mobileSize: 'min(32vw, 124px)',
    rotate: 12, delay: 0.3, duration: 3.8,
  },
  {
    type: 'note', text: 'Made with feeling!', color: '#ff9ecb',
    x: '79%', y: '68%', mobileX: '60%', mobileY: '60%',
    rotate: -5, delay: 0.42, duration: 4.4,
  },
  {
    type: 'product',
    src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f964.png',
    alt: 'Yellow drink cup cutout',
    x: '45%', y: '77%', mobileX: '34%', mobileY: '78%',
    size: 'clamp(90px, 11vw, 150px)', mobileSize: 'min(30vw, 116px)',
    rotate: 8, delay: 0.52, duration: 3.6,
  },
  {
    type: 'note', text: 'Good things take time.', color: '#ffe481',
    x: '73%', y: '20%', mobileX: '59%', mobileY: '17%',
    rotate: 4, delay: 0.64, duration: 4.6,
  },
  {
    type: 'product',
    src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f34b.png',
    alt: 'Bright yellow lemon cutout',
    x: '25%', y: '45%', mobileX: '65%', mobileY: '81%',
    size: 'clamp(74px, 9vw, 124px)', mobileSize: 'min(24vw, 92px)',
    rotate: -9, delay: 0.75, duration: 3.5,
  },
];

const ransomWords = [
  { word: 'design', rotate: '-4deg' },
  { word: 'that', rotate: '3deg' },
  { word: 'feels', rotate: '-2deg' },
  { word: 'personal', rotate: '2deg' },
  { word: 'emotional', rotate: '-3deg' },
  { word: 'and', rotate: '4deg' },
  { word: 'unforgettable', rotate: '-1deg' },
];

const arrows = [
  { x: '31%', y: '52%', rotate: '18deg', path: 'M4 6 C22 2 33 18 47 15 M39 9 L48 15 L38 20' },
  { x: '64%', y: '58%', rotate: '-22deg', path: 'M3 18 C20 8 29 6 45 10 M36 4 L46 10 L35 15' },
];

function Product({ item }) {
  return (
    <div className="scrapbook-product" style={{ '--product-size': item.size }}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 700px) 34vw, 14vw"
        quality={90}
        className="scrapbook-product__image"
      />
    </div>
  );
}

function StickyNote({ item }) {
  return (
    <div className="scrapbook-note" style={{ '--note-color': item.color }}>
      <span className="scrapbook-note__tape" aria-hidden="true" />
      <p>{item.text}</p>
    </div>
  );
}

function Arrow({ arrow }) {
  return (
    <svg
      className="scrapbook-arrow"
      viewBox="0 0 52 28"
      style={{ left: arrow.x, top: arrow.y, rotate: arrow.rotate }}
      aria-hidden="true"
    >
      <path d={arrow.path} />
    </svg>
  );
}

function Floater({ item, index }) {
  return (
    <motion.div
      className="scrapbook-floater"
      style={{
        '--float-x': item.x,
        '--float-y': item.y,
        '--mobile-float-x': item.mobileX,
        '--mobile-float-y': item.mobileY,
        '--mobile-product-size': item.mobileSize,
        zIndex: item.type === 'note' ? 7 : 5,
      }}
      initial={{ opacity: 0, scale: 0.45 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: 'spring', stiffness: 210, damping: 15, delay: item.delay }}
    >
      <motion.div
        className="scrapbook-floater__motion"
        initial={{ y: 0, rotate: item.rotate }}
        whileInView={{
          y: [0, index % 2 === 0 ? -13 : 11, 0],
          rotate: [item.rotate, item.rotate + (index % 2 === 0 ? 3 : -3), item.rotate],
        }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: item.duration, repeat: Infinity, ease: 'easeInOut' }}
      >
        {item.type === 'product' ? <Product item={item} /> : <StickyNote item={item} />}
      </motion.div>
    </motion.div>
  );
}

export default function ScrapbookFloat() {
  return (
    <section className="scrapbook-section" aria-labelledby="scrapbook-title">
      <div className="scrapbook-heading">
        <div className="scrapbook-torn-paper" aria-hidden="true" />
        <h2 id="scrapbook-title">THAT SHINE</h2>
      </div>

      <p className="scrapbook-ransom-line" aria-label="Design that feels personal, emotional and unforgettable">
        {ransomWords.map(({ word, rotate }, index) => (
          <span
            className={index % 2 === 0 ? 'scrapbook-word scrapbook-word--pink' : 'scrapbook-word'}
            key={word}
            style={{ '--word-rotation': rotate }}
          >
            {word}
          </span>
        ))}
      </p>

      {arrows.map((arrow, index) => <Arrow arrow={arrow} key={index} />)}
      {floaters.map((item, index) => <Floater item={item} index={index} key={`${item.type}-${index}`} />)}
      <span className="scrapbook-footer">A LITTLE MORE PERSONAL · 2026</span>
    </section>
  );
}