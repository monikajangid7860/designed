'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const typeArtImageSrc = '/images/lottie_img.webp.pagespeed.ce._FQ_Z8q9B3.webp';
const subjectImageSrc = '/images/bold_img.webp.pagespeed.ce.NzQUIG-ghn.webp';

export default function LayeredEditorialHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="layered-editorial-hero relative min-h-svh overflow-hidden bg-[#F8F8F8] text-[#0A0A0A]"
      aria-label="Serotoninn editorial collection"
    >
      <motion.header
        className="layered-editorial-hero__header"
        initial={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0.01 } : { duration: 0.8, ease: 'easeOut' }}
      >
        <div className="layered-editorial-hero__left-zone">
          <div className="layered-editorial-hero__headline-lockup">
            <span className="layered-editorial-hero__headline-note">(TRANSFORMATION)</span>
            <h1 className="layered-editorial-hero__headline">SPACE</h1>
          </div>
          <nav className="layered-editorial-hero__utility-links" aria-label="Shop navigation">
            <a href="#viewfinder-gallery-title">SHOP ALL</a>
            <a href="#viewfinder-gallery-title">CATEGORIES <span aria-hidden="true">+</span></a>
          </nav>
        </div>

       

        <div className="layered-editorial-hero__right-zone">
          <a className="layered-editorial-hero__search" href="#viewfinder-gallery-title">SEARCH <span aria-hidden="true">↗</span></a>
          <p className="layered-editorial-hero__manifesto">
            OUR PIECES ARE BUILT TO LAST. MADE TO MOVE WITH YOU, AND NEVER MADE TO BLEND IN.
          </p>
          <span className="layered-editorial-hero__bag">BAG <b>0</b></span>
        </div>
      </motion.header>

      <div className="layered-editorial-hero__stage" aria-hidden="true">
        <div className="layered-editorial-hero__type-art">
          <motion.div
            className="layered-editorial-hero__type-art-layer"
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            <Image
              src={typeArtImageSrc}
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 96vw, 84vw"
              className="layered-editorial-hero__type-image"
            />
          </motion.div>
        </div>
          <span className="layered-editorial-hero__art-index">FIG. 001 / NEW PERSPECTIVES</span>
          <span className="layered-editorial-hero__art-caption">DRESS OUTSIDE THE LINES</span>

        <div className="layered-editorial-hero__subject-position">
          <motion.div
            className="layered-editorial-hero__subject"
            initial={{
              opacity: 0,
              y: reducedMotion ? 0 : 30,
              scale: reducedMotion ? 1 : 0.97,
              rotate: reducedMotion ? 0 : -1.5,
            }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 1.1, delay: 0.16, ease: 'easeOut' }}
          >
            <Image
              src={subjectImageSrc}
              alt="Fashion model in an editorial portrait"
              fill
              priority
              quality={90}
              sizes="(max-width: 760px) 68vw, 34vw"
              className="layered-editorial-hero__subject-image"
            />
            <span className="layered-editorial-hero__subject-mark">S—01</span>
          </motion.div>
        </div>
      </div>

      <a className="layered-editorial-hero__edge-icon layered-editorial-hero__edge-icon--left" href="#viewfinder-gallery-title" aria-label="Explore the collection">
        <span aria-hidden="true">+</span>
      </a>
      <a className="layered-editorial-hero__edge-icon layered-editorial-hero__edge-icon--right" href="#viewfinder-gallery-title" aria-label="View selected work">
        <span aria-hidden="true">↗</span>
      </a>

      <span className="layered-editorial-hero__bottom-note">INDEPENDENT UNIFORMS / ISSUE 001</span>
      <motion.a
        className="layered-editorial-hero__about-link"
        href="#studio-title"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0.01 } : { duration: 0.65, delay: 0.55, ease: 'easeOut' }}
      >
        [ WHO WE ARE ]
      </motion.a>
      <motion.p
        className="layered-editorial-hero__freedom"
        aria-hidden="true"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0.01 } : { duration: 0.9, delay: 0.42, ease: 'easeOut' }}
      >
        FREEDOM
      </motion.p>
    </section>
  );
}