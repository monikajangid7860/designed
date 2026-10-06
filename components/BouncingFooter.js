'use client';

import { motion, useReducedMotion } from 'framer-motion';

const words = ['GOOD', 'THINGS', 'TAKE', 'ENERGY.'];
const letterVariants = {
  hidden: (index) => ({
    y: '-105vh',
    rotate: (index % 2 ? 1 : -1) * (18 + (index % 4) * 5),
  }),
  visible: {
    y: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      mass: 1.2,
      stiffness: 115,
      damping: 11,
    },
  },
};

const links = [
  { label: 'Home', href: '#top' },
  { label: 'The people', href: '#zigzag-team-title' },
  { label: 'The work', href: '#viewfinder-gallery-title' },
  { label: 'Get in touch', href: 'mailto:hello@palmo.studio' },
];

export default function BouncingFooter() {
  const reducedMotion = useReducedMotion();
  let characterIndex = 0;

  return (
    <footer className="gravity-footer" id="continuation" aria-labelledby="gravity-footer-title">
      <div className="gravity-footer__topline">
        <a className="gravity-footer__brand" href="#top">PALMO® <span>INDEPENDENT CREATIVE STUDIO</span></a>
        <span className="gravity-footer__note">A LITTLE LOUDER. A LOT MORE HUMAN.</span>
      </div>

      <div className="gravity-footer__stage">
        <p className="gravity-footer__eyebrow">THAT'S A WRAP / 2026</p>
        <motion.h2
          className="gravity-footer__headline"
          id="gravity-footer-title"
          aria-label={words.join(' ')}
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.055 } },
          }}
        >
          {words.map((word) => (
            <span className="gravity-footer__word" aria-hidden="true" key={word}>
              {Array.from(word).map((character) => {
                const index = characterIndex++;
                return (
                  <motion.span
                    className="gravity-footer__letter"
                    key={`${word}-${index}`}
                    custom={index}
                    variants={letterVariants}
                  >
                    {character}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </motion.h2>
        <span className="gravity-footer__impact" aria-hidden="true">THUMP!</span>
        <div className="gravity-footer__ground" aria-hidden="true"><span>— — — — — — — — — — — — — — — — — —</span></div>
      </div>

      <div className="gravity-footer__bottom">
        <p className="gravity-footer__signoff">Got a good idea? <a href="mailto:hello@palmo.studio">Let’s make it move <span aria-hidden="true">↗</span></a></p>
        <nav className="gravity-footer__links" aria-label="Footer navigation">
          {links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="gravity-footer__legal"><span>© PALMO 2026</span><a href="#top">BACK TO TOP ↑</a></div>
      </div>
    </footer>
  );
}
