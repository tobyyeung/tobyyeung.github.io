import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBreakpoints } from '../hooks/useBreakpoints';

const Header = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const { isTablet: isMobile } = useBreakpoints();

  const scrollToSection = (id) => {
    setIsMenuOpen(false); // Close menu when clicking a link

    // Use setTimeout to allow the mobile dropdown to close and the DOM to update
    // before calculating the scroll position, otherwise it scrolls too far down.
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Dynamically calculate the header's exact height
        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 0;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else if (location.pathname !== '/') {
        // If we are not on the home page, we can't scroll to the section.
        window.location.href = '/#/';
      }
    }, 50);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', padding: '0.75rem 0', borderBottom: '1px solid var(--border-glass)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '1.5rem' }}>
            <button 
              onClick={() => scrollToSection('hero')} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.35rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', lineHeight: 1.2, padding: '0.1rem 0' }}
            >
              <span className="moving-gradient-hover">Toby Yeung</span>
            </button>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <a href="https://github.com/tobyyeung" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/yeung-toby/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <button 
                onClick={toggleTheme} 
                style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }} 
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'} 
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} 
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                )}
              </button>
            </div>
          </div>

          {isMobile ? (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem' }}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          ) : (
            <nav style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <button onClick={() => scrollToSection('experience')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Experience</button>
              <button onClick={() => scrollToSection('projects')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Projects</button>
              <button onClick={() => scrollToSection('education')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Education</button>
              <button onClick={() => scrollToSection('skills')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Skills</button>
              <button onClick={() => scrollToSection('contact')} className="btn btn-primary" style={{ marginLeft: '0', padding: '0.45rem 1rem', fontSize: '1rem', fontFamily: 'var(--font-sans)', borderRadius: 'var(--radius-full)' }}>Contact Me</button>
            </nav>
          )}
        </div>

        {/* Mobile Dropdown Nav */}
        {isMobile && isMenuOpen && (
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem', marginTop: '0.5rem', borderTop: '1px solid var(--border-glass)' }}>
            <button onClick={() => scrollToSection('experience')} className="nav-btn" style={{ textAlign: 'left', padding: '0.5rem 0' }}>Experience</button>
            <button onClick={() => scrollToSection('projects')} className="nav-btn" style={{ textAlign: 'left', padding: '0.5rem 0' }}>Projects</button>
            <button onClick={() => scrollToSection('education')} className="nav-btn" style={{ textAlign: 'left', padding: '0.5rem 0' }}>Education</button>
            <button onClick={() => scrollToSection('skills')} className="nav-btn" style={{ textAlign: 'left', padding: '0.5rem 0' }}>Skills</button>
            <button onClick={() => scrollToSection('contact')} className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.6rem 1rem', fontSize: '1rem', textAlign: 'center', fontFamily: 'var(--font-sans)', borderRadius: 'var(--radius-full)' }}>Contact Me</button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
