'use client';

import { motion, useReducedMotion } from 'framer-motion';

function HotspotIcon({ name }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 1.5,
  };

  if (name === 'lamp') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
        <path d="m8 10 4-6 4 6H8Z" />
        <path d="M12 10v7m-4 3h8m-6-3h4" />
      </svg>
    );
  }

  if (name === 'chair') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
        <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
        <path d="M5 12a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4H5v-4Zm2 4v3m10-3v3" />
      </svg>
    );
  }

  if (name === 'plant') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
        <path d="M12 19v-8m0 3c-4 0-6-2-6-6 4 0 6 2 6 6Zm0-3c0-4 2-6 6-6 0 4-2 6-6 6Zm-5 4h10l-1 4H8l-1-4Z" />
      </svg>
    );
  }

  if (name === 'art') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
        <path d="M5 4h14v16H5zM7 16l4-5 3 3 2-2 2 4" />
        <circle cx="9" cy="8" r="1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
      <path d="M4 10h16v9H4zM6 10V7h12v3M8 19v2m8-2v2M7 13h4m2 0h4" />
    </svg>
  );
}

export default function Hotspot({ item, isTouch, onOpen, onHover }) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="immersive-hotspot"
      style={{
        top: isTouch ? item.mobileTop || item.top : item.top,
        left: isTouch ? item.mobileLeft || item.left : item.left,
      }}
    >
      <motion.button
        className="immersive-hotspot__button"
        type="button"
        onClick={() => onOpen(item)}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(item.id)}
        onBlur={() => onHover(null)}
        aria-label={`Discover ${item.title}`}
        aria-haspopup="dialog"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {!reducedMotion && (
          <motion.span
            className="immersive-hotspot__ripple"
            aria-hidden="true"
            animate={{ scale: [0.9, 1.75], opacity: [0.55, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: item.delay }}
          />
        )}
        <HotspotIcon name={item.icon} />
      </motion.button>
    </div>
  );
}