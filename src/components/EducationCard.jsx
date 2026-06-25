import React, { useState } from 'react';

const EducationCard = ({ institution, url, degree, gpa, courses, initialShowCount = 3, logoUrl, animationIndex, isVisible }) => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const displayedCourses = showAllCourses ? courses : courses.slice(0, initialShowCount);
  const hasMoreCourses = courses.length > initialShowCount;

  return (
    <div 
      className={`glass-panel ${isVisible ? 'animate-education' : ''}`} 
      style={{ 
        display: 'flex', 
        flexWrap: 'wrap-reverse', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '2rem', 
        gap: '2rem',
        opacity: isVisible ? undefined : 0,
        animationDelay: isVisible ? `${animationIndex * 150}ms` : '0ms'
      }}
    >
      <div style={{ flex: '1 1 300px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            {institution}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem', opacity: 0.6 }}>
              <path d="M15 3h6v6"></path>
              <path d="M10 14L21 3"></path>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            </svg>
          </a>
        </h3>
        {degree && <p style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontWeight: '500' }}>{degree}</p>}
        {gpa && <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{gpa}</p>}
        <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Courses:</strong>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {courses.slice(0, initialShowCount).map(course => (
              <li key={course}>{course}</li>
            ))}
          </ul>
          
          {hasMoreCourses && (
            <div style={{
              display: 'grid',
              gridTemplateRows: showAllCourses ? '1fr' : '0fr',
              transition: 'grid-template-rows 0.4s ease-out'
            }}>
              <div style={{ overflow: 'hidden' }}>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', paddingTop: '0.3rem' }}>
                  {courses.slice(initialShowCount).map(course => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {hasMoreCourses && (
            <button
              onClick={() => setShowAllCourses(!showAllCourses)}
              style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: 0, marginTop: '0.75rem', fontWeight: '500', fontSize: '0.9rem', textDecoration: 'underline' }}
            >
              {showAllCourses ? 'Show less' : `Show ${courses.length - initialShowCount} more...`}
            </button>
          )}
        </div>
      </div>
      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', width: '220px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <img src={logoUrl} alt={`${institution} Logo`} style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} />
      </div>
    </div>
  );
};

export default EducationCard;
