'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function HotspotPopup({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="immersive-spotlight__modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.article
            className="immersive-spotlight__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="spotlight-popup-title"
            aria-describedby="spotlight-popup-description"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="immersive-spotlight__modal-image-wrap">
              <Image
                src={item.detailImage}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 720px) 90vw, 420px"
                quality={85}
                className="immersive-spotlight__modal-image"
              />
              <span>SWASTIK / SPACE STUDY {item.number}</span>
            </div>
            <div className="immersive-spotlight__modal-copy">
              <span className="immersive-spotlight__modal-kicker">{item.category}</span>
              <h2 id="spotlight-popup-title">{item.title}</h2>
              <p id="spotlight-popup-description">{item.description}</p>
              <span className="immersive-spotlight__modal-index">OBJECT / {item.number} — 04</span>
            </div>
            <button
              className="immersive-spotlight__modal-close"
              type="button"
              onClick={onClose}
              aria-label="Close object details"
              autoFocus
            >
              <CloseIcon />
            </button>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}