'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const studioPhoto =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90';

const textSequence = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.16,
    },
  },
};

const textReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TheStudio() {
  return (
    <section
      className="studio-section grid w-full bg-[#e8e8e6] text-[#171715]"
      aria-labelledby="studio-title"
    >
      <div className="studio-left">
        <motion.header
          className="studio-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={textSequence}
        >
          <motion.h2 className="studio-title" id="studio-title" variants={textReveal}>
            <span>THE</span>
            <span>STUDIO</span>
          </motion.h2>
          <motion.a className="studio-link" href="#continuation" variants={textReveal}>
            Conoce nuestro estudio <span aria-hidden="true">↘</span>
          </motion.a>
        </motion.header>

        <motion.div
          className="studio-details"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={textSequence}
        >
          <motion.p className="studio-paragraph studio-paragraph--first" variants={textReveal}>
            Somos un estudio creativo que conecta ideas, cultura y personas a través del diseño.
          </motion.p>
          <motion.p className="studio-paragraph studio-paragraph--second" variants={textReveal}>
            Trabajamos desde distintos lugares para crear proyectos con una mirada propia.
          </motion.p>
          <motion.ul className="studio-cities" variants={textSequence} aria-label="Ciudades">
            {['Bogotá', 'Madrid', 'Miami'].map((city) => (
              <motion.li key={city} variants={textReveal}>
                {city}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <motion.div
        className="studio-image-wrap"
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={studioPhoto}
          alt="Interior luminoso de un estudio creativo"
          fill
          sizes="(max-width: 760px) 100vw, 44vw"
          quality={90}
          className="studio-image"
        />
      </motion.div>
    </section>
  );
}