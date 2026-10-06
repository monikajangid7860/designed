'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const processes = [
  {
    num: '01',
    title: 'DISEÑO ARQUITECTÓNICO',
    text: 'Diseñamos edificaciones desde la planificación estratégica, conectando cada espacio con su entorno y con las personas que lo habitan.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=90',
    alt: 'Estudio arquitectónico y planos de proyecto',
  },
  {
    num: '02',
    title: 'INTERIORISMO',
    text: 'Diseñamos distribuciones funcionales y atmósferas cuidadas, eligiendo materiales y detalles que dan carácter a cada interior.',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90',
    alt: 'Interior contemporáneo con mobiliario y luz natural',
  },
  {
    num: '03',
    title: 'CONSTRUCCIÓN',
    text: 'Llevamos cada idea a la obra con oficio, coordinación y atención al detalle, cuidando el proyecto en cada etapa.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=90',
    alt: 'Edificios contemporáneos vistos desde abajo',
  },
  {
    num: '04',
    title: 'ENTREGA',
    text: 'Revisamos cada espacio contigo y entregamos un lugar listo para comenzar una nueva historia.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90',
    alt: 'Espacio terminado con una vista abierta al exterior',
  },
];

function ProcessStep({ process }) {
  return (
    <article className="process-panel">
      <header className="process-panel-heading">
        <p className="process-number">{process.num}</p>
        <h3 className="process-title">{process.title}</h3>
      </header>
      <div className="process-divider" />
      <div className="process-panel-content">
        <div className="process-image-wrap">
          <Image
            src={process.img}
            alt={process.alt}
            fill
            sizes="(max-width: 760px) calc(100vw - 44px), 52vw"
            quality={90}
            className="process-image"
          />
        </div>
        <p className="process-copy">{process.text}</p>
      </div>
      <span className="process-index">{process.num} / 04</span>
    </article>
  );
}

export default function ProcessHorizontalScroll() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const updateScreenSize = () => setIsMobile(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener('change', updateScreenSize);
    return () => mediaQuery.removeEventListener('change', updateScreenSize);
  }, []);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', isMobile ? '0%' : '-75%'],
  );

  return (
    <section
      className="process-scroll-section w-full bg-[#e8e8e6] text-[#171715]"
      ref={sectionRef}
      aria-label="Nuestro proceso"
    >
      <div className="process-sticky">
        <h2 className="process-heading">
          <span>NUESTRO</span>
          <span>PROCESO</span>
        </h2>
        <motion.div className="process-track will-change-transform" style={{ x }}>
          {processes.map((process) => (
            <ProcessStep key={process.num} process={process} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}