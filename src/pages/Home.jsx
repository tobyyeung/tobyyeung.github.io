import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../data/projects';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [hoveredExpId, setHoveredExpId] = useState(null);

  const uiucCourses = [
    "CS 374: Introduction to Algorithms & Models of Computation",
    "CS 340: Computer Systems",
    "ECON 302: Intermediate Microeconomic Theory",
    "MATH 257: Linear Algebra with Computational Applications",
    "MATH 231: Calculus II",
    "CS 225: Data Structures",
    "CS 222: Software Design Lab",
    "ECON 203: Economic Statistics II",
    "CS 173: Discrete Structures",
    "CS 128: Intro to Computer Science II",
    "CS 124: Intro to Computer Science I",
    "ECON 103: Macroeconomic Principles",
    "ECON 102: Microeconomic Principles"
  ];
  
  const displayedCourses = showAllCourses ? uiucCourses : uiucCourses.slice(0, 3);

  const ucsdCourses = [
    "Deep Neural Networks",
    "Machine Learning Algorithms",
    "Python & Math for Machine Learning"
  ];

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const PIXELS_PER_MONTH = 15;
  const END_YEAR = 2026;
  const END_MONTH = 8;
  const START_YEAR = 2022;
  const START_MONTH = 6;
  const totalMonths = (END_YEAR - START_YEAR) * 12 + (END_MONTH - START_MONTH);
  const TIMELINE_HEIGHT = totalMonths * PIXELS_PER_MONTH + 40;

  const experiences = [
    {
      id: 'invite', title: 'INVITE AI Institute', role: 'AI Researcher', dateStr: 'Jun 2026 - Present',
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
      startM: 5, startY: 2024, endM: 8, endY: 2024, side: 'right', overlapOffset: 1,
      shortDesc: 'Led robotics and coding classes of 20+ students, ensuring individualized instruction in Python and Roblox.',
      bullets: [
        'Mentored 250+ students in robotics and coding using Scratch, Roblox, and Minecraft.',
        'Managed classroom dynamics and taught fundamental computer science concepts.'
      ]
    },
    {
      id: 'thecoderschool', title: 'theCoderSchool', role: 'Code Coach', dateStr: 'Aug 2023 - Jan 2024',
      startM: 8, startY: 2023, endM: 1, endY: 2024, side: 'left', overlapOffset: 1,
      shortDesc: 'Mentored students in foundational computer science logic through custom game development in Python and Scratch.',
      bullets: [
        'Coached 30+ students (ages 8–12) in Scratch, Python, and PixelPad.',
        'Guided students in building games and solving coding challenges.'
      ]
    },
    {
      id: 'techknowhow_asst', title: 'TechKnowHow Franchises', role: 'Assistant Lead Instructor', dateStr: 'May 2023 - Aug 2023',
      startM: 5, startY: 2023, endM: 8, endY: 2023, side: 'right',
      shortDesc: 'Guided young learners through engaging robotics and coding camps, fostering early technical interest.',
      bullets: [
        'Assisted in mentoring students (ages 5–12) in introductory robotics and block-based coding.',
        'Supported lead instructors in executing lesson plans and facilitating hands-on STEM activities.'
      ]
    },
    {
      id: 'kesselworks', title: 'KesselWorks, LLC', role: 'Software Developer & UI/UX Intern', dateStr: 'Jun 2022 - Aug 2024',
      startM: 6, startY: 2022, endM: 8, endY: 2024, side: 'left',
      shortDesc: 'Engineered full-stack organizational tools, optimized cloud infrastructure, and redesigned mission-critical user interfaces.',
      bullets: [
        'Engineered a cloud-based calendar system using React and JavaScript, enabling internal teams to track project timelines and coordinate contractor availability.',
        'Optimized MySQL database queries and refactored AWS-hosted REST APIs, reducing page load latency and improving system throughput.',
        'Deployed and managed containerized microservices via Docker and Kubernetes on AWS, establishing CI/CD workflows and cloud infrastructure best practices.'
      ]
    }
  ];

  const yearMarkers = [2026, 2025, 2024, 2023, 2022];

  return (
    <main className="animate-fade-in" style={{ paddingBottom: '0' }}>
      {/* Hero Section */}
      <section style={{ padding: '6rem 0 4rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Hi, I'm <span className="gradient-text">Toby Yeung</span>
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2.5rem' }}>
            A passionate software engineer building scalable web applications and intelligent data systems.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="mailto:tobycyeung@gmail.com" className="btn btn-primary">Get in Touch</a>
            <a href="https://github.com/tobyyeung" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub</a>
            <a href="https://www.linkedin.com/in/yeung-toby/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">LinkedIn</a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Experience</h2>
          
          <div className="timeline-abs-container" style={{ height: `${TIMELINE_HEIGHT + 150}px`, marginTop: '4rem' }}>
            <div className="timeline-abs-line"></div>
            
            {yearMarkers.map(year => {
              const monthsFromEnd = (END_YEAR - year) * 12 + (END_MONTH - 1);
              const topPx = monthsFromEnd * PIXELS_PER_MONTH;

              return (
                <div key={year} className="timeline-year-marker" style={{ top: `${topPx}px` }}>
                  {year}
                </div>
              );
            })}

            {experiences.map(exp => {
              const monthsFromEnd = (END_YEAR - exp.endY) * 12 + (END_MONTH - exp.endM);
              const duration = (exp.endY - exp.startY) * 12 + (exp.endM - exp.startM);
              const topPx = monthsFromEnd * PIXELS_PER_MONTH;
              const heightPx = Math.max(duration * PIXELS_PER_MONTH, 160);
              
              // Ensure higher priority (closer to timeline) naturally sits on top of lower priority (offset) ones
              const zIndex = hoveredExpId === exp.id ? 200 : (exp.overlapOffset ? 10 : 100);

              // Apply horizontal cascade if it has an overlapOffset
              const isRight = exp.side === 'right';
              const xShift = exp.overlapOffset ? (isRight ? `${exp.overlapOffset * 3}rem` : `-${exp.overlapOffset * 3}rem`) : '0';

              return (
                <div 
                  key={exp.id} 
                  className={`timeline-item-abs ${exp.side}`} 
                  style={{ top: `${topPx}px`, height: `${heightPx}px`, zIndex }}
                  onMouseEnter={() => setHoveredExpId(exp.id)}
                  onMouseLeave={() => setHoveredExpId(null)}
                >
                  <div className="timeline-dot-abs"></div>
                  <div className="glass-panel" style={{ transform: `translateX(${xShift})`, transition: 'transform 0.4s ease' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{exp.title}</h3>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: '500', fontSize: '0.9rem' }}>{exp.dateStr}</span>
                    </div>
                    <h4 style={{ color: 'var(--text-secondary)', fontWeight: '400', marginBottom: '1rem', fontSize: '1rem' }}>{exp.role}</h4>
                    
                    <p className="short-desc">{exp.shortDesc}</p>
                    
                    <div className="full-desc">
                      <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
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
              <p style={{ color: 'var(--text-secondary)' }}>A selection of my recent work</p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '6rem',
            paddingTop: '2rem'
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

      {/* Education & Skills Section */}
      <section id="education-skills" style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
            
            {/* Education */}
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Education</h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>University of Illinois Urbana-Champaign</h3>
                <p style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontWeight: '500' }}>B.S. in Computer Science and Economics (Expected May 2028)</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>GPA: 4.0/4.0 (Dean's List)</p>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  <strong>Courses:</strong>
                  <ul style={{ paddingLeft: '1.5rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {displayedCourses.map(course => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setShowAllCourses(!showAllCourses)} 
                    style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: 0, marginTop: '0.5rem', fontWeight: '500', fontSize: '0.9rem', textDecoration: 'underline' }}
                  >
                    {showAllCourses ? 'Show less' : `Show ${uiucCourses.length - 3} more...`}
                  </button>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>UC San Diego Extended Studies</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>GPA: 4.0/4.0</p>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                  <strong>Courses:</strong>
                  <ul style={{ paddingLeft: '1.5rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {ucsdCourses.map(course => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Honors & Awards */}
              <div style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Honors & Awards</h2>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>The Coder Games 2020 Typed Bracket Winner</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>theCoderSchool (Apr 2020)</p>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>8th Place, 2022-23 CalChess Super States Championship</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>BayAreaChess</p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>AP Test Scores</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Calculus AB (5), Chinese (5)</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Skills</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Languages</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>C++, Python, Java, SQL, JavaScript, HTML/CSS, Lua, Markdown, LaTeX</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>AI/ML</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Local LLMs (Ollama Gemma), RAG, Semantic Search, Embeddings, Structured Outputs, LangChain, OpenCV</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Backend & Web</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>FastAPI, React, Next.js, Flask, REST APIs, OAuth, Uvicorn, Pydantic, Pandas, NumPy</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Data & Cloud</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>AWS, Docker, Kubernetes, Vercel, Supabase, PostgreSQL, DuckDB, ChromaDB, MySQL, SQLite</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Tools & OS</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Git, Conda, Pytest, Linux (Ubuntu), Bash, VS Code, MATLAB, R</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get In Touch</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:tobycyeung@gmail.com" className="btn btn-primary">tobycyeung@gmail.com</a>
            <a href="https://github.com/tobyyeung" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub</a>
            <a href="https://www.linkedin.com/in/yeung-toby/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">LinkedIn</a>
            <a href="tel:6692121472" className="btn btn-secondary">(669) 212-1472</a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
