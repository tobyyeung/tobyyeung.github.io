import React from 'react';

const ProjectCard = ({ project, index }) => {
  const isReverse = index % 2 !== 0;

  return (
    <div className={`glass-panel`} style={{ marginBottom: '2rem', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title and Technologies Header */}
      <div style={{ textAlign: isReverse ? 'right' : 'left', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{project.title}</h3>
        
        {project.technologies && project.technologies.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: isReverse ? 'flex-end' : 'flex-start' }}>
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
      </div>

      {/* Row for Image and Description */}
      <div style={{ display: 'flex', flexDirection: isReverse ? 'row-reverse' : 'row', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* Image Side (50%) */}
        <div style={{ flex: '1 1 300px' }}>
          <img 
            src={project.imageUrl || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&sig=${index}`} 
            alt={project.title} 
            style={{ borderRadius: 'var(--radius-md)', width: '100%', height: 'auto', objectFit: 'cover', boxShadow: 'var(--shadow-sm)' }}
          />
        </div>

        {/* Content Side (50%) */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.7', textAlign: isReverse ? 'right' : 'left' }}>
            {project.description}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: isReverse ? 'flex-end' : 'flex-start' }}>
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

    </div>
  );
};

export default ProjectCard;
