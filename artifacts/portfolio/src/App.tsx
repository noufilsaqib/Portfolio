import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import imgGaraage1 from '@assets/screenshot-garaage.jpg';
import imgGaraage2 from '@assets/screenshot-garaage-2.jpg';
import imgGaraage3 from '@assets/screenshot-garaage-3.jpg';
import imgBaaj1 from '@assets/screenshot-baaj.jpg';
import imgBaaj2 from '@assets/screenshot-baaj-2.jpg';
import imgBaaj3 from '@assets/screenshot-baaj-3.jpg';
import imgKindsettle1 from '@assets/screenshot-kindsettle.jpg';
import imgKindsettle2 from '@assets/screenshot-kindsettle-2.jpg';
import imgKindsettle3 from '@assets/screenshot-kindsettle-3.jpg';
import data from './data.json';

const imageMap: Record<string, string> = {
  'garaage-1': imgGaraage1, 'garaage-2': imgGaraage2, 'garaage-3': imgGaraage3,
  'baaj-1': imgBaaj1, 'baaj-2': imgBaaj2, 'baaj-3': imgBaaj3,
  'kindsettle-1': imgKindsettle1, 'kindsettle-2': imgKindsettle2, 'kindsettle-3': imgKindsettle3,
};

const GithubIcon = () => (

  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const fade = {
  hidden: { opacity: 0, y: 6 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const TypedName = ({ full }: { full: string }) => {
  const [shown, setShown] = useState('');

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setShown(full.slice(0, ++i));
      if (i >= full.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, []);

  return (
    <span>
      {shown}
      <span className="cursor-blink" />
    </span>
  );
};

type PersonalProject = { name: string; description: string; link: string; screenshots: string[] };

const SLIDE_INTERVAL = 2800;

const ProjectCarousel = ({ screenshots, name }: { screenshots: string[]; name: string }) => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setDir(1);
      setIndex(i => (i + 1) % screenshots.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [screenshots.length]);

  return (
    <div className="carousel-wrap">
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.img
          key={index}
          src={screenshots[index]}
          alt={`${name} screenshot ${index + 1}`}
          className="screenshot-img"
          custom={dir}
          variants={{
            enter: (d: number) => ({ x: d * 60, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d * -60, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
    </div>
  );
};

const PersonalProjectCard = ({ p, delay }: { p: PersonalProject; delay: number }) => {
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX + 20);
    rawY.set(e.clientY + 16);
  };

  return (
    <motion.div
      custom={delay}
      variants={fade}
      initial="hidden"
      animate="visible"
      className="project project-hoverable"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="project-header">
        <span className="project-name font-mono">{p.name}</span>
        <a href={p.link} target="_blank" rel="noreferrer" className="github-link"
          onClick={e => e.stopPropagation()} aria-label={`GitHub: ${p.name}`}>
          <GithubIcon />
        </a>
      </div>
      <p className="project-desc">{p.description}</p>
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="screenshot-preview"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCarousel screenshots={p.screenshots} name={p.name} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


const ThemeToggle = ({ dark, onToggle }: { dark: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    aria-label="Toggle theme"
    className="theme-toggle font-mono"
  >
    [ {dark ? 'light' : 'dark'} ]
  </button>
);

export default function App() {
  const [dark, setDark] = useState(false);

  const toggleTheme = useCallback(() => {
    setDark(d => {
      const next = !d;
      document.documentElement.classList.toggle('light', !next);
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark);
  }, []);

  const projects = data.work;
  const personalProjects: PersonalProject[] = data.projects.map(p => ({
    ...p,
    screenshots: p.screenshots.map(key => imageMap[key]),
  }));
  const skills = data.skills;

  // Preload all project screenshots so the first hover is instant
  useEffect(() => {
    personalProjects.forEach(p =>
      p.screenshots.forEach(src => { const img = new Image(); img.src = src; })
    );
  }, []);

  return (
    <div className="page-root">

      {/* ── Header ── */}
      <motion.header className="header" initial="hidden" animate="visible" variants={{ hidden: {}, visible: {} }}>
        <div className="header-left">
          <motion.h1 custom={0} variants={fade} initial="hidden" animate="visible" className="name font-mono">
            &gt; <TypedName full={data.header.name} />
          </motion.h1>
          <motion.p custom={0.1} variants={fade} initial="hidden" animate="visible" className="role font-mono text-muted">
            {data.header.role}
          </motion.p>
        </div>
        <motion.div custom={0.15} variants={fade} initial="hidden" animate="visible">
          <ThemeToggle dark={dark} onToggle={toggleTheme} />
        </motion.div>
      </motion.header>

      <hr className="divider" />

      {/* ── Work ── */}
      <motion.section
        id="work"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: {} }}
        className="section"
      >
        <span className="section-label font-mono">/work</span>
        <div className="projects">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              custom={0.2 + i * 0.08}
              variants={fade}
              initial="hidden"
              animate="visible"
              className="project"
            >
              <div className="project-header">
                <span className="project-name font-mono">{p.name}</span>
                <span className="project-year font-mono text-muted">{p.year}</span>
              </div>
              <p className="project-desc">{p.description}</p>
              <div className="stack">
                {p.stack.map((t, j) => (
                  <span key={j} className="tag font-mono">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <hr className="divider" />

      {/* ── Projects ── */}
      <motion.section
        id="projects"
        custom={0.38}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="section"
      >
        <span className="section-label font-mono">/projects</span>
        <div className="projects">
          {personalProjects.map((p, i) => (
            <PersonalProjectCard key={i} p={p} delay={0.38 + i * 0.08} />
          ))}
        </div>
      </motion.section>

      <hr className="divider" />

      {/* ── Skills ── */}
      <motion.section
        id="skills"
        custom={0.45}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="section"
      >
        <span className="section-label font-mono">/skills</span>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div key={i} className="skill-row font-mono">
              <span className="skill-cat text-muted">{s.category}</span>
              <span className="skill-items">{s.items}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <hr className="divider" />

      {/* ── Contact ── */}
      <motion.section
        id="contact"
        custom={0.55}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="section"
      >
        <span className="section-label font-mono">/contact</span>
        <div className="contact-links font-mono">
          {data.contact.map((c, i) => (
            <a key={i} href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer" className="link-underline">{c.label}</a>
          ))}
        </div>
      </motion.section>

      <hr className="divider" />

      <motion.footer
        custom={0.65}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="footer font-mono text-muted"
      >
        <span>&copy; {new Date().getFullYear()} {data.header.name}</span>
        <span className="status-dot-wrap">
          <span className="status-dot" />
          available
        </span>
      </motion.footer>
    </div>
  );
}
