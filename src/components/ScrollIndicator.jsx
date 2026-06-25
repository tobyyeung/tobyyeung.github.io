import React, { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeout;
    
    const handleScroll = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsIdle(true);
      }, 2000); // 2 seconds of inactivity
    };

    // Initial timeout for when page first loads
    timeout = setTimeout(() => {
      setIsIdle(true);
    }, 2000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const handleNextSection = () => {
    const sections = ['hero', 'experience', 'projects', 'education', 'skills'];
    // We want to find the first section whose top is significantly below our current view
    const currentScroll = window.scrollY + window.innerHeight / 3;
    
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        if (top > currentScroll) {
          const header = document.querySelector('header');
          const headerOffset = header ? header.offsetHeight : 0;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          return;
        }
      }
    }
  };

  return (
    <button
      onClick={handleNextSection}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-glass)',
        color: 'var(--accent-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1000,
        opacity: isIdle ? 1 : 0,
        transform: isIdle ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: isIdle ? 'auto' : 'none',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: 'var(--shadow-lg), 0 0 20px rgba(58, 197, 163, 0.2)',
        backdropFilter: 'blur(10px)'
      }}
      aria-label="Scroll to next section"
    >
      <div className={isIdle ? 'animate-bounce-subtle' : ''} style={{ display: 'flex' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </button>
  );
};

export default ScrollIndicator;
