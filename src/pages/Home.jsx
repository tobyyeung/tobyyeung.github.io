import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../data/projects';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [hoveredExpId, setHoveredExpId] = useState(null);
  const [hoveredExpHeight, setHoveredExpHeight] = useState(0);
  const [activeSkillCategory, setActiveSkillCategory] = useState("Languages");
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  // Map of exp.id -> collapsed card height in px, updated by ResizeObserver
  const [cardHeights, setCardHeights] = useState({});
  const bulletRefs = useRef({});
  const cardRefs = useRef({});

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Observe every card element for size changes (handles font reflow on resize).
  // We skip updating the hovered card since it's expanded — we only care about collapsed heights.
  useEffect(() => {
    const measureAll = () => {
      setCardHeights(prev => {
        const heights = { ...prev };
        Object.entries(cardRefs.current).forEach(([id, el]) => {
          // Don't update the hovered card's height since it may be in expanded state
          if (el && id !== hoveredExpId) {
            heights[id] = el.getBoundingClientRect().height;
          }
        });
        return heights;
      });
    };

    // Immediate snapshot after mount/resize
    const raf = requestAnimationFrame(measureAll);

    const observer = new ResizeObserver(() => measureAll());
    Object.values(cardRefs.current).forEach(el => { if (el) observer.observe(el); });
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  // Re-run when windowWidth changes (card widths change) or hoveredExpId changes
  // (so we re-measure the previously hovered card once it collapses)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth, hoveredExpId]);

  useEffect(() => {
    if (!hoveredExpId) {
      setHoveredExpHeight(0);
      return;
    }
    const raf = requestAnimationFrame(() => {
      const el = bulletRefs.current[hoveredExpId];
      if (el) {
        setHoveredExpHeight(el.scrollHeight);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [hoveredExpId, windowWidth]);

  const skillsData = {
    "Languages": ["C++", "Java", "JavaScript", "LaTeX", "Lua", "Markdown", "Python", "R"],
    "Frontend": ["CSS", "HTML", "Next.js", "React"],
    "Backend": ["FastAPI", "Flask", "Node.js", "REST APIs", "Uvicorn"],
    "Databases": ["ChromaDB", "DuckDB", "MySQL", "PostgreSQL", "SQLite", "Supabase"],
    "AI & Data": ["LangChain", "NumPy", "Ollama", "OpenCV", "Pandas", "RAG"],
    "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Ubuntu", "Vercel"],
    "Tools & Utilities": ["Bash", "Conda", "Git", "OAuth", "Pydantic", "Pytest", "VS Code"]
  };
  const uiucCourses = [
    "CS 374: Introduction to Algorithms & Models of Computation",
    "CS 340: Computer Systems",
    "ECON 302: Intermediate Microeconomic Theory",
    "MATH 257: Linear Algebra with Computational Applications",
    "MATH 231: Calculus II",
    "CS 225: Data Structures",
    "CS 222: Software Design Lab",
    "ECON 203: Economic Statistics II",
    "ECON 202: Economic Statistics I",
    "CS 173: Discrete Structures",
    "CS 128: Intro to Computer Science II",
    "CS 124: Intro to Computer Science I",
    "ECON 103: Macroeconomic Principles",
    "ECON 102: Microeconomic Principles"
  ];

  const displayedCourses = showAllCourses ? uiucCourses : uiucCourses.slice(0, 3);

  const ucsdCourses = [
    "CSE-90161: Deep Neural Networks",
    "CSE-90160: Machine Learning Algorithms",
    "CSE-90162: Python & Math for Machine Learning"
  ];

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const experiences = [
    {
      id: 'invite', title: 'INVITE AI Institute', role: 'AI Researcher', dateStr: 'Jun 2026 - Present',
      logo: '/images/experience/invite.jpg',
      startM: 6, startY: 2026, endM: 8, endY: 2026, side: 'left',
      shortDesc: 'Architecting intelligent RAG systems and full-stack applications to empower educators with data-driven insights.',
      bullets: [
        'Developed the Keating Framework, a full-stack AI web application using FastAPI and Python to assist educators in identifying at-risk students by synthesizing academic and behavioral data.',
        'Architected a Retrieval-Augmented Generation (RAG) system utilizing a DuckDB backend and ChromaDB, optimizing query routing and reducing LLM dependency.',
        'Engineered a local machine learning inference pipeline deploying quantized LLMs (Ollama Gemma) and semantic embeddings, ensuring data privacy while eliminating API latency.'
      ]
    },
    {
      id: 'mathnasium', title: 'Mathnasium', role: 'Mathematics Instructor', dateStr: 'Jan 2024 - Aug 2025',
      logo: '/images/experience/mathnasium.jpg',
      startM: 1, startY: 2024, endM: 8, endY: 2025, side: 'right',
      shortDesc: 'Provided tailored mathematical instruction and competition coaching for K-12 students of all learning abilities.',
      bullets: [
        'Provided 1-on-1 to 1-on-4 tutoring to 300+ students (K–12), from arithmetic to SAT Math and pre-calculus.',
        'Coached 10+ Math Kangaroo International medalists for competitions.',
        'Created tailored lesson plans for students with dyscalculia, dyslexia, autism, and ADHD.'
      ]
    },
    {
      id: 'techknowhow_lead', title: 'TechKnowHow Franchises', role: 'Lead Instructor', dateStr: 'May 2024 - Aug 2024',
      logo: '/images/experience/techknowhow.jpg',
      startM: 5, startY: 2024, endM: 8, endY: 2024, side: 'right', overlapOffset: 1,
      shortDesc: 'Led robotics and coding classes of 20+ students, ensuring individualized instruction in Python and Roblox.',
      bullets: [
        'Mentored 250+ students in robotics and coding using Scratch, Roblox, and Minecraft.',
        'Managed classroom dynamics and taught fundamental computer science concepts.'
      ]
    },
    {
      id: 'thecoderschool', title: 'theCoderSchool', role: 'Code Coach', dateStr: 'Aug 2023 - Jan 2024',
      logo: '/images/experience/thecoderschool.jpg',
      startM: 8, startY: 2023, endM: 1, endY: 2024, side: 'right',
      shortDesc: 'Mentored students in foundational computer science logic through custom game development in Python and Scratch.',
      bullets: [
        'Coached 30+ students (ages 8–12) in Scratch, Python, and PixelPad.',
        'Guided students in building games and solving coding challenges.'
      ]
    },
    {
      id: 'techknowhow_asst', title: 'TechKnowHow Franchises', role: 'Assistant Lead Instructor', dateStr: 'May 2023 - Aug 2023',
      logo: '/images/experience/techknowhow.jpg',
      startM: 5, startY: 2023, endM: 8, endY: 2023, side: 'left', overlapOffset: 1,
      shortDesc: 'Guided young learners through engaging robotics and coding camps, fostering early technical interest.',
      bullets: [
        'Assisted in mentoring students (ages 5–12) in introductory robotics and block-based coding.',
        'Supported lead instructors in executing lesson plans and facilitating hands-on STEM activities.'
      ]
    },
    {
      id: 'kesselworks', title: 'KesselWorks, LLC', role: 'Software Developer & UI/UX Intern', dateStr: 'Jun 2022 - Aug 2024',
      logo: '/images/experience/kesselworks.jpg',
      startM: 6, startY: 2022, endM: 8, endY: 2024, side: 'left',
      shortDesc: 'Engineered full-stack organizational tools, optimized cloud infrastructure, and redesigned mission-critical user interfaces.',
      bullets: [
        'Engineered a cloud-based calendar system using React and JavaScript, enabling internal teams to track project timelines and coordinate contractor availability.',
        'Optimized MySQL database queries and refactored AWS-hosted REST APIs, reducing page load latency and improving system throughput.',
        'Deployed and managed containerized microservices via Docker and Kubernetes on AWS, establishing CI/CD workflows and cloud infrastructure best practices.'
      ]
    }
  ];

  const END_YEAR = 2026;
  const END_MONTH = 8;
  const START_YEAR = 2022;
  const START_MONTH = 1;

  // For each temporal segment between consecutive same-side experiences (top to bottom),
  // compute the minimum px/month required so their cards don't overlap.
  // Returns a map from a "month value" range to a min px/month.
  const computeSegmentScales = () => {
    const GAP = 20; // minimum px gap between cards
    const FALLBACK_CARD_H = 80; // fallback if ResizeObserver hasn't fired yet

    // For each side, sort experiences top-to-bottom (highest endY/endM first = latest date)
    const segmentScales = []; // [{fromMVal, toMVal, minPx}]

    ['left', 'right'].forEach(side => {
      const sideExps = experiences.filter(e => e.side === side);
      // Sort descending by end date (newest = top of timeline)
      sideExps.sort((a, b) => {
        const aV = a.endY * 12 + a.endM;
        const bV = b.endY * 12 + b.endM;
        return bV - aV;
      });

      // Between consecutive pairs, compute required px/month
      for (let i = 0; i < sideExps.length - 1; i++) {
        const upper = sideExps[i]; // card positioned higher (newer end date)
        const lower = sideExps[i + 1]; // card positioned lower (older end date)

        const upperH = cardHeights[upper.id] ?? FALLBACK_CARD_H;
        
        // The top of upper card = getPositionForDate(upper.endY, upper.endM)
        // The top of lower card = getPositionForDate(lower.endY, lower.endM)
        // We need: lowerTop - upperTop >= upperH + GAP
        // i.e., pixels between upper.end and lower.end >= upperH + GAP
        
        // The negative sign because lower end date is EARLIER (= larger topPx offset)
        // segmentMonths is always positive since lower has an earlier end date
        const actualSegmentMonths = Math.max(1,
          (upper.endY * 12 + upper.endM) - (lower.endY * 12 + lower.endM)
        );
        const requiredPx = upperH + GAP;
        const minPxPerMonth = requiredPx / actualSegmentMonths;

        segmentScales.push({
          // The segment is from lower.end (further down timeline) to upper.end
          fromMVal: lower.endY * 12 + lower.endM,
          toMVal: upper.endY * 12 + upper.endM,
          minPx: minPxPerMonth
        });
      }
    });

    return segmentScales;
  };

  // Helper: given the hovered experience, return the month-value range [from, to]
  // that should be stretched. We only stretch the gap between the hovered card's top
  // (its end date) and the nearest same-side card that appears directly below it.
  // This concentrates the expansion exactly where overlap would occur.
  const getHoverStretchRange = (hoveredExp) => {
    const endVal = hoveredExp.endY * 12 + hoveredExp.endM;
    // Same-side cards with an earlier end date (appear lower on the timeline)
    const below = experiences.filter(e =>
      e.side === hoveredExp.side &&
      e.id !== hoveredExp.id &&
      (e.endY * 12 + e.endM) < endVal
    );
    let fromMVal;
    if (below.length > 0) {
      // Nearest below = the one with the latest end date among those below
      const nearest = below.reduce((best, e) =>
        (e.endY * 12 + e.endM) > (best.endY * 12 + best.endM) ? e : best
      , below[0]);
      fromMVal = nearest.endY * 12 + nearest.endM;
    } else {
      // No card below — stretch from the hovered card's own start
      fromMVal = hoveredExp.startY * 12 + hoveredExp.startM;
    }
    return { fromMVal, toMVal: endVal };
  };

  const segmentScales = computeSegmentScales();

  const getPixelsForMonth = (y, m) => {
    const mVal = y * 12 + m;

    // Minimum baseline px/month so collapsed cards don't overlap
    let basePx = (y >= 2025 || y <= 2022) ? 8 : 22;
    segmentScales.forEach(({ fromMVal, toMVal, minPx }) => {
      if (mVal > fromMVal && mVal <= toMVal) {
        basePx = Math.max(basePx, minPx);
      }
    });

    // Hover stretch: add extra px/month only in the segment between the hovered
    // card and the next same-side card below — the exact gap that would overlap.
    if (hoveredExpId && hoveredExpHeight > 0) {
      const hoveredExp = experiences.find(e => e.id === hoveredExpId);
      if (hoveredExp) {
        const { fromMVal, toMVal } = getHoverStretchRange(hoveredExp);
        if (mVal > fromMVal && mVal <= toMVal) {
          const segmentMonths = Math.max(1, toMVal - fromMVal);
          // Need to fit: hoveredExpHeight (expanded) + 30px gap within this segment
          basePx += (hoveredExpHeight + 30) / segmentMonths;
        }
      }
    }
    return basePx;
  };

  const getPositionForDate = (y, m) => {
    let px = 0;
    let currentY = END_YEAR;
    let currentM = END_MONTH;
    while (currentY > y || (currentY === y && currentM > m)) {
      currentM--;
      if (currentM === 0) {
        currentM = 12;
        currentY--;
      }
      px += getPixelsForMonth(currentY, currentM);
    }
    return px;
  };

  const TIMELINE_HEIGHT = getPositionForDate(START_YEAR, START_MONTH) + 30;
  const yearMarkers = [2026, 2025, 2024, 2023, 2022];

  return (
    <main className="animate-fade-in" style={{ paddingBottom: '0' }}>
      <section style={{ padding: '6rem 0 4rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap-reverse', gap: '4rem' }}>

          {/* Text Content */}
          <div style={{ flex: '1 1 500px' }}>
            <h1 style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
              <span style={{ fontSize: '2.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>Hi, I'm</span>
              <span className="gradient-text" style={{ fontSize: '5.5rem', display: 'block' }}>Toby Yeung</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '2.5rem', lineHeight: '1.6' }}>
              A CS & Econ student @ UIUC, specializing in building full-stack apps, containerized microservices, and AI systems.
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:tobycyeung@gmail.com" className="btn btn-primary">Email Me</a>
              <a href="https://github.com/tobyyeung" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.75rem' }} aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/yeung-toby/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.75rem' }} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Image Content */}
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '350px', aspectRatio: '1/1', borderRadius: '50%', padding: '8px', background: 'var(--accent-gradient)' }}>
              <img src="/images/self.jpg" alt="Toby Yeung" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--bg-primary)' }} />
            </div>
          </div>

        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem', textAlign: 'center' }}>Experience</h2>

          {/* Dual-column center-spine timeline — works at all screen widths.
              ResizeObserver measures live card heights so spacing auto-adjusts. */}
          <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', height: `${TIMELINE_HEIGHT}px`, transition: 'height 0.3s ease-in-out' }}>
            {/* Central Vertical Spine */}
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '4px', background: 'var(--border-glass)', height: '100%', borderRadius: '4px' }} />

            {yearMarkers.map(year => {
              const topPx = getPositionForDate(year, 1);
              return (
                <div key={year} style={{
                  position: 'absolute',
                  top: `${topPx}px`,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-glass)',
                  boxShadow: 'var(--shadow-sm)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  zIndex: 50,
                  transition: 'top 0.3s ease-in-out'
                }}>
                  {year}
                </div>
              );
            })}

            {experiences.map((exp) => {
              const isLeft = exp.side === 'left';
              const duration = Math.max(1, (exp.endY - exp.startY) * 12 + (exp.endM - exp.startM));
              const topPx = getPositionForDate(exp.endY, exp.endM);
              const startPx = getPositionForDate(exp.startY, exp.startM);
              const dotHeight = Math.max(20, startPx - topPx);

              const isGreen = exp.id === 'invite' || exp.id === 'thecoderschool';
              const isBlue = exp.id === 'mathnasium' || exp.id === 'techknowhow_asst';
              const accentColor = isGreen
                ? 'var(--accent-primary)'
                : (isBlue ? '#38bdf8' : 'var(--accent-secondary)');
              const borderGlassColor = isGreen
                ? 'rgba(58, 197, 163, 0.15)'
                : (isBlue ? 'rgba(56, 189, 248, 0.2)' : 'rgba(168, 85, 247, 0.25)');

              // Pills cascade away from spine: level 0 (default) = -1.5rem from card edge (in the 3rem gap near spine);
              // each overlapOffset level adds 1.25rem toward the card so pills don't stack on top of each other.
              const pillOffset = `calc(-1.5rem + ${(exp.overlapOffset || 0) * 1.25}rem)`;
              // Shift the card itself slightly away from spine for overlapping entries, giving visual breathing room.
              const xShift = exp.overlapOffset
                ? (isLeft ? `-${exp.overlapOffset * 0.75}rem` : `${exp.overlapOffset * 0.75}rem`)
                : '0';

              const yrs = Math.floor(duration / 12);
              const mos = duration % 12;
              let durStr = '';
              if (yrs > 0) durStr += `${yrs} yr${yrs > 1 ? 's' : ''} `;
              if (mos > 0 || yrs === 0) durStr += `${mos} mo${mos > 1 ? 's' : ''}`;

              const isActive = hoveredExpId === exp.id;

              return (
                <div
                  key={exp.id}
                  style={{
                    position: 'absolute',
                    top: `${topPx}px`,
                    // Fixed gap of 3rem from spine so pills/year badges always have clear space
                    width: 'calc(50% - 3rem)',
                    [isLeft ? 'left' : 'right']: 0,
                    zIndex: isActive ? 100 : (exp.overlapOffset ? 10 : 20),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isLeft ? 'flex-end' : 'flex-start',
                    transition: 'top 0.3s ease-in-out'
                  }}
                  onMouseEnter={() => setHoveredExpId(exp.id)}
                  onMouseLeave={() => setHoveredExpId(null)}
                  onTouchStart={(e) => { e.preventDefault(); setHoveredExpId(isActive ? null : exp.id); }}
                >
                  <div style={{ position: 'relative', width: '100%' }}>
                    {/* Duration Pill on Spine — cascades away from spine based on overlapOffset */}
                    <div style={{
                      position: 'absolute',
                      top: '1.1rem',
                      width: '0.5rem',
                      height: `${dotHeight}px`,
                      borderRadius: '999px',
                      background: accentColor,
                      border: '2px solid var(--bg-primary)',
                      boxShadow: `0 0 0 2px var(--border-glass)`,
                      [isLeft ? 'right' : 'left']: pillOffset,
                      transition: 'top 0.3s ease-in-out, height 0.3s ease-in-out'
                    }} />

                    {/* Card */}
                    <div
                      ref={el => { cardRefs.current[exp.id] = el; }}
                      className="glass-panel"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        transition: 'transform 0.2s ease',
                        textAlign: isLeft ? 'right' : 'left',
                        position: 'relative',
                        transform: `translateX(${xShift})`,
                        border: `1px solid ${borderGlassColor}`
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = `translateX(${xShift}) translateY(-5px)`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = `translateX(${xShift})`; }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {/* Header row */}
                        <div style={{ display: 'flex', flexDirection: isLeft ? 'row-reverse' : 'row', alignItems: 'center', gap: '0.6rem' }}>
                          <div style={{ background: '#ffffff', padding: '0.3rem', borderRadius: '6px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <img src={exp.logo} alt={`${exp.title} Logo`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: isLeft ? 'flex-end' : 'flex-start' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              {exp.dateStr} • {durStr.trim()}
                            </span>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0.1rem 0', wordBreak: 'break-word' }}>{exp.title}</h3>
                            <h4 style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', margin: 0, wordBreak: 'break-word' }}>{exp.role}</h4>
                          </div>
                        </div>

                        {/* Short description */}
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.1rem', marginBottom: '0', lineHeight: '1.4' }}>
                          {exp.shortDesc}
                        </p>

                        {/* Bullet Points — revealed on hover/tap */}
                        <div style={{
                          maxHeight: isActive ? '400px' : '0px',
                          opacity: isActive ? 1 : 0,
                          overflow: 'hidden',
                          transition: 'max-height 0.35s ease-in-out, opacity 0.3s ease-in-out, margin-top 0.3s ease-in-out',
                          marginTop: isActive ? '0.5rem' : '0'
                        }}>
                          <ul
                            ref={el => { bulletRefs.current[exp.id] = el; }}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.4rem',
                              fontSize: '0.78rem',
                              color: 'var(--text-secondary)',
                              listStyleType: 'none',
                              paddingLeft: isLeft ? '0' : '1.1rem',
                              paddingRight: isLeft ? '1.1rem' : '0',
                              textAlign: isLeft ? 'right' : 'left'
                            }}>
                            {exp.bullets.map((bullet, idx) => (
                              <li key={idx} style={{ position: 'relative' }}>
                                {isLeft
                                  ? <><span style={{ position: 'absolute', right: '-1.1rem', color: accentColor }}>•</span>{bullet}</>
                                  : <><span style={{ position: 'absolute', left: '-1.1rem', color: accentColor }}>•</span>{bullet}</>
                                }
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Projects</h2>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '2.5rem',
            paddingTop: '1rem'
          }}>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No projects available. Add some in the Admin Panel.</p>
            )}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Education</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-panel" style={{ display: 'flex', flexWrap: 'wrap-reverse', justifyContent: 'space-between', alignItems: 'center', padding: '2rem', gap: '2rem' }}>
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}><a href="https://illinois.edu/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>University of Illinois Urbana-Champaign</a></h3>
                <p style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontWeight: '500' }}>B.S. in Computer Science and Economics (Expected May 2028)</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>GPA: 4.0/4.0 (Dean's List)</p>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Courses:</strong>
                  <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {displayedCourses.map(course => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowAllCourses(!showAllCourses)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: 0, marginTop: '0.75rem', fontWeight: '500', fontSize: '0.9rem', textDecoration: 'underline' }}
                  >
                    {showAllCourses ? 'Show less' : `Show ${uiucCourses.length - 3} more...`}
                  </button>
                </div>
              </div>
              <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', width: '220px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src="/images/education/uiuc.png" alt="University of Illinois Logo" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} />
              </div>
            </div>

            <div className="glass-panel" style={{ display: 'flex', flexWrap: 'wrap-reverse', justifyContent: 'space-between', alignItems: 'center', padding: '2rem', gap: '2rem' }}>
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}><a href="https://extendedstudies.ucsd.edu/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>UC San Diego Extended Studies</a></h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>GPA: 4.0/4.0</p>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Courses:</strong>
                  <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {ucsdCourses.map(course => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', width: '220px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src="/images/education/ucsd.png" alt="UC San Diego Logo" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ padding: '6rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Skills</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
            {Object.keys(skillsData).map(category => (
              <button
                key={category}
                onClick={() => setActiveSkillCategory(category)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '9999px',
                  background: activeSkillCategory === category ? 'var(--accent-primary)' : 'var(--bg-glass)',
                  border: `1px solid ${activeSkillCategory === category ? 'var(--accent-primary)' : 'var(--border-glass)'}`,
                  color: activeSkillCategory === category ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem'
                }}
              >
                {category}
                <span style={{
                  background: activeSkillCategory === category ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.05)',
                  padding: '0.15rem 0.6rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  color: activeSkillCategory === category ? 'var(--bg-primary)' : 'var(--text-tertiary)'
                }}>
                  {skillsData[category].length}
                </span>
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '1.5rem',
            justifyItems: 'center',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {skillsData[activeSkillCategory].map(skill => (
              <div key={skill} className="glass-panel" style={{
                width: '100%',
                aspectRatio: '1/1',
                background: 'rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1.5rem 1rem',
                textAlign: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'default',
                borderRadius: '16px'
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: 'var(--text-primary)'
                }}>
                  <img
                    src={`/images/skills/${skill.replace(/[\/\\]/g, '_').toLowerCase()}.png`}
                    alt={skill}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span style={{ display: 'none', fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 'bold' }}>
                    {skill.charAt(0)}
                  </span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '6rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Contact Me</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to drop a message!
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const name = formData.get('name');
              const email = formData.get('email');
              const message = formData.get('message');
              window.location.href = `mailto:tobycyeung@gmail.com?subject=Message from ${name}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                  <label htmlFor="name" style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500' }}>Name</label>
                  <input type="text" id="name" name="name" required placeholder="John Doe" style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-glass)',
                    background: 'rgba(0,0,0,0.2)',
                    color: 'white',
                    fontFamily: 'inherit',
                    fontSize: '1rem'
                  }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                  <label htmlFor="email" style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500' }}>Email</label>
                  <input type="email" id="email" name="email" required placeholder="john@example.com" style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-glass)',
                    background: 'rgba(0,0,0,0.2)',
                    color: 'white',
                    fontFamily: 'inherit',
                    fontSize: '1rem'
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                <label htmlFor="message" style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500' }}>Message</label>
                <textarea id="message" name="message" required placeholder="How can I help you?" rows="5" style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-glass)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'white',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.1rem', cursor: 'pointer' }}>
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

    </main>
  );
};

export default Home;
