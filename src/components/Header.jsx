import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      // If we are not on the home page, we can't scroll to the section.
      window.location.href = '/#/';
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', padding: '0.75rem 0', borderBottom: '1px solid var(--border-glass)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={{ fontSize: '1.35rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', textDecoration: 'none', display: 'flex', alignItems: 'center', lineHeight: 1 }}>
            <span className="gradient-text">Toby Yeung</span>
          </Link>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <a href="https://github.com/tobyyeung" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'rgba(255, 255, 255, 0.7)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'} aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
            </a>
            <a href="https://www.linkedin.com/in/yeung-toby/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'rgba(255, 255, 255, 0.7)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'} aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <button onClick={() => scrollToSection('experience')} style={{ fontFamily: 'var(--font-casual)', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', fontWeight: '700', transition: 'color 0.2s' }}>Experience</button>
          <button onClick={() => scrollToSection('projects')} style={{ fontFamily: 'var(--font-casual)', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', fontWeight: '700', transition: 'color 0.2s' }}>Projects</button>
          <button onClick={() => scrollToSection('education')} style={{ fontFamily: 'var(--font-casual)', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', fontWeight: '700', transition: 'color 0.2s' }}>Education</button>
          <button onClick={() => scrollToSection('skills')} style={{ fontFamily: 'var(--font-casual)', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', fontWeight: '700', transition: 'color 0.2s' }}>Skills</button>
          <a href="mailto:tobycyeung@gmail.com" className="btn btn-primary" style={{ marginLeft: '0', padding: '0.45rem 1rem', fontSize: '1rem' }}>Contact Me</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
