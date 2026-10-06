'use client';

import { motion, useReducedMotion } from 'framer-motion';

const words = ['GOOD', 'THINGS', 'TAKE', 'ENERGY.'];
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
        <h2 className="gravity-footer__headline" id="gravity-footer-title" aria-label={words.join(' ')}>
          {words.map((word) => (
            <span className="gravity-footer__word" aria-hidden="true" key={word}>
              {Array.from(word).map((character) => {
                const index = characterIndex++;
                return (
                  <motion.span
                    className="gravity-footer__letter"
                    key={`${word}-${index}`}
                    initial={reducedMotion ? false : { y: '-110vh', rotate: (index % 2 ? 1 : -1) * (18 + index % 4 * 5) }}
                    whileInView={{ y: 0, rotate: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={reducedMotion
                      ? { duration: 0 }
                      : {
                          type: 'spring',
                          mass: 1.1 + (index % 3) * 0.2,
                          stiffness: 115,
                          damping: 10 + (index % 4),
                          delay: index * 0.055,
                        }}
                  >
                    {character}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h2>
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
