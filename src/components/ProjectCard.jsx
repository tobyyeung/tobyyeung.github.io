import React from 'react';

const ProjectCard = ({ project, index }) => {
  const isReverse = index % 2 !== 0;

  return (
    <div className={`glass-panel project-row ${isReverse ? 'reverse' : ''}`} style={{ marginBottom: '2rem', padding: '2rem', gap: '3rem', alignItems: 'center' }}>
      
      {/* Image Side (30%) */}
      <div className="project-image-container" style={{ flex: '3', border: 'none' }}>
        <img 
          src={project.imageUrl || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&sig=${index}`} 
          alt={project.title} 
          style={{ borderRadius: 'var(--radius-md)' }}
        />
      </div>

      {/* Content Side (70%) */}
      <div className="project-content" style={{ flex: '7', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', padding: '0' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '2rem' }}>{project.title}</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.7' }}>
          {project.description}
        </p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {project.technologies.map(tech => (
              <span key={tech} style={{ 
                fontSize: '0.85rem', 
                padding: '0.35rem 0.85rem', 
                borderRadius: 'var(--radius-full)', 
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-glass)',
                color: 'var(--accent-secondary)',
                fontWeight: '500'
              }}>
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Source Code
            </a>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProjectCard;
