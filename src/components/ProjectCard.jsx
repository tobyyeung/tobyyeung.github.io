import React from 'react';

const ProjectCard = ({ project, onClick }) => {
  return (
    <button 
      onClick={onClick}
      style={{
        width: '100%',
        padding: '2rem',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-glass)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        minHeight: '220px',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg), 0 0 25px rgba(99, 102, 241, 0.15)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        const icon = e.currentTarget.querySelector('.project-card-icon');
        if (icon) {
          icon.style.color = 'var(--accent-primary)';
          icon.style.opacity = '1';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.background = 'var(--bg-glass)';
        const icon = e.currentTarget.querySelector('.project-card-icon');
        if (icon) {
          icon.style.color = 'var(--text-tertiary)';
          icon.style.opacity = '0.6';
        }
      }}
    >
      {/* Icon indicating clickability */}
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-tertiary)', opacity: 0.6, transition: 'color 0.2s, opacity 0.2s' }} className="project-card-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6"></path>
          <path d="M10 14L21 3"></path>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        </svg>
      </div>
      
      <div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.5' }}>
          {project.shortDescription}
        </p>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
        {project.technologies && project.technologies.map((tech, idx) => (
          <span 
            key={idx} 
            style={{
              background: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--accent-primary)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </button>
  );
};

export default ProjectCard;
