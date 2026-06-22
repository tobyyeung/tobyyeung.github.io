import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header style={{ padding: '2rem 0', borderBottom: '1px solid var(--border-glass)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}>
          <span className="gradient-text">Toby Yeung</span>
        </Link>
        
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link 
            to="/" 
            style={{ 
              color: location.pathname === '/' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: location.pathname === '/' ? '600' : '400'
            }}
          >
            Portfolio
          </Link>

        </nav>
      </div>
    </header>
  );
};

export default Header;
