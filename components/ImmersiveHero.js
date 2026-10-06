'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import Hotspot from './Hotspot';
import PopupModal from './PopupModal';

const rooms = [
  {
    id: 'sunroom',
    name: 'THE SUN ROOM',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90',
    imageAlt: 'Sunlit contemporary living room with sculptural furniture',
    position: 'center 54%',
    hotspots: [
      {
        id: 'sunroom-chair', number: '01', top: '58%', left: '33%', icon: 'chair', delay: 0,
        title: 'The Sunday Chair', category: 'SEATING / 01',
        description: 'A low, generous silhouette made for unhurried mornings and one more chapter.',
        image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Sculptural lounge chair in a quiet interior',
      },
      {
        id: 'sunroom-lamp', number: '02', top: '40%', left: '71%', icon: 'lamp', delay: 0.25,
        title: 'Soft Light No. 4', category: 'LIGHTING / 02',
        description: 'A warm, diffused glow with a hand-finished shade and an almost weightless profile.',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Minimal sculptural table lamp',
      },
      {
        id: 'sunroom-table', number: '03', top: '73%', left: '55%', icon: 'table', delay: 0.5,
        title: 'Gather Table', category: 'OBJECTS / 03',
        description: 'Solid oak, softened edges, and just enough room for a slow afternoon coffee.',
        image: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Warm wood furniture and objects in a living room',
      },
      {
        id: 'sunroom-plant', number: '04', top: '48%', left: '87%', icon: 'plant', delay: 0.75,
        title: 'A Little Wild', category: 'BOTANICALS / 04',
        description: 'A living shape that brings the outside in and makes the room feel more itself.',
        image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Leafy houseplant in a bright living space',
      },
    ],
  },
  {
    id: 'quiet-house',
    name: 'THE QUIET HOUSE',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90',
    imageAlt: 'Quiet modern home with natural materials and warm light',
    position: 'center center',
    hotspots: [
      {
        id: 'quiet-sofa', number: '01', top: '64%', left: '54%', icon: 'chair', delay: 0.05,
        title: 'Cloudline Sofa', category: 'SEATING / 01',
        description: 'Deep seats, relaxed linen, and a form that invites everyone to stay a little longer.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Contemporary sofa in a softly lit room',
      },
      {
        id: 'quiet-lamp', number: '02', top: '42%', left: '26%', icon: 'lamp', delay: 0.3,
        title: 'Evening, Slowly', category: 'LIGHTING / 02',
        description: 'A small pool of amber light for the part of the day that belongs to you.',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Minimal sculptural table lamp',
      },
      {
        id: 'quiet-art', number: '03', top: '30%', left: '68%', icon: 'art', delay: 0.55,
        title: 'Still Life Study', category: 'ART / 03',
        description: 'An abstract composition in chalk, ink, and the colors of a late summer evening.',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Framed fine art painting',
      },
    ],
  },
  {
    id: 'open-air',
    name: 'OPEN AIR LIVING',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=90',
    imageAlt: 'Open living space filled with natural light and greenery',
    position: 'center 52%',
    hotspots: [
      {
        id: 'open-chair', number: '01', top: '62%', left: '38%', icon: 'chair', delay: 0,
        title: 'Form in the Sun', category: 'SEATING / 01',
        description: 'A natural woven seat with a frame designed to age beautifully outdoors.',
        image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Sculptural lounge chair in a quiet interior',
      },
      {
        id: 'open-plant', number: '02', top: '35%', left: '77%', icon: 'plant', delay: 0.3,
        title: 'Green Room', category: 'BOTANICALS / 02',
        description: 'Leafy silhouettes soften the architecture and bring a little wildness inside.',
        image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Leafy houseplant in a bright living space',
      },
      {
        id: 'open-table', number: '03', top: '77%', left: '64%', icon: 'table', delay: 0.6,
        title: 'The Everyday Table', category: 'OBJECTS / 03',
        description: 'A gathering point for open windows, long lunches, and whatever comes next.',
        image: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Warm wood furniture and objects in a living room',
      },
    ],
  },
];

function SoundOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10v4h4l5 4V6l-5 4H4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="m17 9 4 6m0-6-4 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function ImmersiveHero() {
  const [roomIndex, setRoomIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const reducedMotion = useReducedMotion();
  const room = rooms[roomIndex];

  const changeRoom = () => {
    setSelectedItem(null);
    setRoomIndex((index) => (index + 1) % rooms.length);
  };

  return (
    <section className="immersive-hero" aria-label="Explore the Palmo interiors">
      <AnimatePresence initial={false}>
        <motion.div
          className="immersive-hero__image-layer"
          key={room.id}
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={room.image}
            alt={room.imageAlt}
            fill
            priority
            sizes="100vw"
            quality={90}
            className="immersive-hero__image"
            style={{ objectPosition: room.position }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="immersive-hero__shade" aria-hidden="true" />

      <header className="immersive-hero__topline">
        <div className="immersive-hero__counter" aria-live="polite">
          <span>{String(roomIndex + 1).padStart(2, '0')}</span>
          <i />
          <span>{String(rooms.length).padStart(2, '0')}</span>
        </div>
        <div className="immersive-hero__wordmark">
          <span>PALMO</span>
          <small>AT HOME</small>
        </div>
      </header>

      <div className="immersive-hero__intro">
        <p>ROOMS WITH A STORY</p>
        <h1>A softer place<br />to land.</h1>
        <span>{room.name} <i /> CURATED OBJECTS / 2026</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          className="immersive-hero__hotspots"
          key={room.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
        >
          {room.hotspots.map((item) => (
            <Hotspot item={item} onOpen={setSelectedItem} key={item.id} />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="immersive-hero__controls">
        <button className="immersive-hero__change-room" type="button" onClick={changeRoom}>
          <span>Change room</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className="immersive-hero__sound"
          type="button"
          aria-label="Room audio is not available"
          title="Room audio coming soon"
          disabled
        >
          <SoundOffIcon />
        </button>
      </div>

      <PopupModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}