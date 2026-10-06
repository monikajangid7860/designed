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

export default function PopupModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="immersive-modal__backdrop"
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
          onClick={onClose}
        >
          <motion.article
            className="immersive-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="immersive-modal-title"
            aria-describedby="immersive-modal-description"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="immersive-modal__image-wrap">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 720px) 90vw, 440px"
                quality={90}
                className="immersive-modal__image"
              />
              <span className="immersive-modal__image-index">PALMO OBJECT STUDY / {item.number}</span>
            </div>
            <div className="immersive-modal__copy">
              <span className="immersive-modal__eyebrow">{item.category}</span>
              <h2 id="immersive-modal-title">{item.title}</h2>
              <p id="immersive-modal-description">{item.description}</p>
              <span className="immersive-modal__detail">MATERIAL / FORM / FEELING</span>
            </div>
            <button
              className="immersive-modal__close"
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