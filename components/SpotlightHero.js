'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Hotspot from './Hotspot';
import HotspotPopup from './HotspotPopup';

const rooms = [
  {
    id: 'sunroom',
    title: 'THE SUN ROOM',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90',
    alt: 'Sunlit contemporary living room with sculptural furniture',
    position: 'center 54%',
    hotspots: [
      {
        id: 'materials', number: '01', top: '58%', left: '33%', mobileTop: '64%', mobileLeft: '24%',
        title: 'Premium Materials', category: 'MATERIALS / 01', icon: 'chair', delay: 0,
        description: 'Sourced globally for Swastik Interior Decor Pvt. Ltd. projects, selected for how they age, feel, and live with you.',
        detailImage: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Sculptural lounge chair in a quiet interior',
      },
      {
        id: 'spatial', number: '02', top: '73%', left: '55%', mobileTop: '76%', mobileLeft: '54%',
        title: 'Spatial Dynamics', category: 'SPATIAL DESIGN / 02', icon: 'table', delay: 0.3,
        description: 'Optimizing flow and functionality in modern workspaces without losing their sense of warmth.',
        detailImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Modern interior with carefully considered spatial flow',
      },
      {
        id: 'lighting', number: '03', top: '40%', left: '71%', mobileTop: '43%', mobileLeft: '77%',
        title: 'Custom Lighting', category: 'LIGHTING / 03', icon: 'lamp', delay: 0.55,
        description: 'Bespoke illumination that brings architecture into focus and changes the feeling of a room.',
        detailImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Sculptural lighting in a refined interior',
      },
      {
        id: 'living', number: '04', top: '48%', left: '87%', mobileTop: '55%', mobileLeft: '90%',
        title: 'Living Green', category: 'BIOPHILIC DESIGN / 04', icon: 'plant', delay: 0.8,
        description: 'Natural forms and living textures soften the edges between the room and the world outside.',
        detailImage: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1100&q=85',
        imageAlt: 'Leafy plant bringing life to a bright interior',
      },
    ],
  },
];

export default function SpotlightHero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const reducedMotion = useReducedMotion();
  const room = rooms[0];
  const radius = hoveredHotspot ? 440 : 270;
  const mask = isTouch
    ? 'none'
    : `radial-gradient(circle ${radius}px at ${mouse.x}px ${mouse.y}px, #000 0%, #000 42%, transparent 100%)`;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px), (hover: none) and (pointer: coarse)');
    const updateInputMode = () => {
      setIsTouch(mediaQuery.matches);
      setMouse({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };

    updateInputMode();
    mediaQuery.addEventListener('change', updateInputMode);
    window.addEventListener('resize', updateInputMode);

    return () => {
      mediaQuery.removeEventListener('change', updateInputMode);
      window.removeEventListener('resize', updateInputMode);
    };
  }, []);

  const trackPointer = (event) => {
    if (isTouch) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    setMouse({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  };

  return (
    <section
      className="immersive-spotlight"
      aria-label="Explore the Swastik interiors"
      onMouseMove={trackPointer}
    >
      <div className="immersive-spotlight__base">
        <Image
          src={room.image}
          alt={room.alt}
          fill
          priority
          sizes="100vw"
          quality={90}
          className="immersive-spotlight__photo immersive-spotlight__photo--dim"
          style={{ objectPosition: room.position }}
        />
      </div>

      <div
        className="immersive-spotlight__reveal"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
        aria-hidden="true"
      >
        <Image
          src={room.image}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="immersive-spotlight__photo"
          style={{ objectPosition: room.position }}
        />
      </div>

      <div className="immersive-spotlight__grain" aria-hidden="true" />
      <header className="immersive-spotlight__header">
        <div className="immersive-spotlight__counter">
          <span>01</span><i /><span>01</span>
        </div>
        <div className="immersive-spotlight__brand"><span>SWASTIK</span><small>INTERIOR DECOR</small></div>
      </header>

      <div className="immersive-spotlight__copy">
        <p>SPACES, CONSIDERED</p>
        <h1>Light finds<br />its place.</h1>
        <span>RESIDENCE 01 <i /> MUMBAI, INDIA</span>
      </div>

      <div className="immersive-spotlight__hint" aria-hidden="true">
        {isTouch ? 'TAP AN OBJECT TO DISCOVER' : 'MOVE THROUGH THE ROOM'}
      </div>

      {room.hotspots.map((item) => (
        <Hotspot
          item={item}
          key={item.id}
          isTouch={isTouch}
          reducedMotion={reducedMotion}
          onOpen={setActiveHotspot}
          onHover={setHoveredHotspot}
        />
      ))}

      <div className="immersive-spotlight__controls">
        <span>ONE SPACE / MANY STORIES</span>
        <button className="immersive-spotlight__sound" type="button" disabled aria-label="Room audio is unavailable">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 10v4h4l5 4V6l-5 4H4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="m17 9 4 6m0-6-4 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <HotspotPopup item={activeHotspot} onClose={() => setActiveHotspot(null)} />
    </section>
  );
}