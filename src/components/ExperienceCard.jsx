import React from 'react';

const ExperienceCard = ({
  exp,
  isMobileTimeline,
  renderAsLeft,
  windowWidth,
  hoveredExpId,
  setHoveredExpId,
  topPx,
  xShift,
  dotWidth,
  dotHeight,
  dotOffset,
  accentColor,
  borderGlassColor,
  cardRef
}) => {
  // Format duration string
  const duration = Math.max(1, (exp.endY - exp.startY) * 12 + (exp.endM - exp.startM));
  const yrs = Math.floor(duration / 12);
  const mos = duration % 12;
  let durStr = '';
  if (yrs > 0) durStr += `${yrs} yr${yrs > 1 ? 's' : ''} `;
  if (mos > 0 || yrs === 0) durStr += `${mos} mo${mos > 1 ? 's' : ''}`;

  return (
    <div
      style={{
        position: isMobileTimeline ? 'relative' : 'absolute',
        top: isMobileTimeline ? 'auto' : `${topPx}px`,
        width: isMobileTimeline ? 'calc(100% - 4.5rem)' : 'calc(50% - 2.5rem)',
        ...(isMobileTimeline ? { left: '4.0rem' } : { [renderAsLeft ? 'left' : 'right']: 0 }),
        zIndex: hoveredExpId === exp.id ? 100 : (exp.overlapOffset ? 10 : 20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: renderAsLeft ? 'flex-end' : 'flex-start',
        transition: isMobileTimeline ? 'none' : 'top 0.3s ease-in-out'
      }}
      onMouseEnter={() => setHoveredExpId(exp.id)}
      onMouseLeave={() => setHoveredExpId(null)}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        {/* The Timeline Dot */}
        <div
          style={{
            position: 'absolute',
            top: '1.1rem',
            width: isMobileTimeline ? '0.75rem' : dotWidth,
            height: isMobileTimeline ? '0.75rem' : `${dotHeight}px`,
            borderRadius: '999px',
            background: accentColor,
            border: `2px solid var(--bg-primary)`,
            boxShadow: `0 0 0 2px var(--border-glass)`,
            [renderAsLeft ? 'right' : 'left']: isMobileTimeline ? '-2.75rem' : dotOffset,
            transition: isMobileTimeline ? 'none' : 'top 0.3s ease-in-out, height 0.3s ease-in-out'
          }}
        ></div>

        {/* Timeline Card Container */}
        <div
          ref={cardRef}
          className="glass-panel"
          style={{
            width: '100%',
            padding: '0.85rem 1rem',
            borderRadius: '12px',
            transition: 'transform 0.2s ease',
            textAlign: renderAsLeft ? 'right' : 'left',
            position: 'relative',
            transform: `translateX(${xShift}) ${hoveredExpId === exp.id ? 'translateY(-5px)' : ''}`,
            border: `1px solid ${borderGlassColor}`
          }}
        >
          {/* Card Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: windowWidth < 500 ? '0.25rem' : '0.5rem' }}>
            <div style={{
              display: 'flex',
              flexDirection: windowWidth < 500
                ? 'column'  /* phone: logo stacked on top */
                : (renderAsLeft ? 'row-reverse' : 'row'),
              alignItems: windowWidth < 500 ? (renderAsLeft ? 'flex-end' : 'flex-start') : 'center',
              gap: '0.6rem'
            }}>
              <div style={{ background: '#ffffff', padding: '0.2rem', borderRadius: '6px', width: 'clamp(24px, 4vw, 36px)', height: 'clamp(24px, 4vw, 36px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={exp.logo} alt={`${exp.title} Logo`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: renderAsLeft ? 'flex-end' : 'flex-start', minWidth: 0, width: '100%' }}>
                {/* Mobile: Date to the right of title/role. Desktop: Date on top. */}
                {windowWidth < 650 ? (
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <h3 style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1.05rem)', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0.1rem 0 0', wordBreak: 'break-word' }}>{exp.title}</h3>
                      <h4 style={{ fontSize: 'clamp(0.65rem, 1vw, 0.9rem)', fontWeight: '600', color: 'var(--text-secondary)', margin: 0, wordBreak: 'break-word' }}>{exp.role}</h4>
                    </div>
                    <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right', whiteSpace: 'nowrap', marginTop: '0.2rem', flexShrink: 0 }}>
                      {exp.dateStr}
                    </span>
                  </div>
                ) : (
                  <>
                    <span style={{ fontSize: 'clamp(0.6rem, 0.8vw, 0.75rem)', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {exp.dateStr}{windowWidth >= 850 && ` • ${durStr.trim()}`}
                    </span>
                    <h3 style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1.05rem)', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0.1rem 0 0', wordBreak: 'break-word' }}>{exp.title}</h3>
                    <h4 style={{ fontSize: 'clamp(0.65rem, 1vw, 0.9rem)', fontWeight: '600', color: 'var(--text-secondary)', margin: 0, wordBreak: 'break-word' }}>{exp.role}</h4>
                  </>
                )}
              </div>
            </div>

            {/* Short description — always visible ≥650px, hover-only below */}
            <div style={{
              maxHeight: windowWidth >= 650 || hoveredExpId === exp.id ? '300px' : '0px',
              opacity: windowWidth >= 650 || hoveredExpId === exp.id ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin-top 0.3s ease-in-out',
              marginTop: windowWidth >= 650 || hoveredExpId === exp.id ? '0.2rem' : '0'
            }}>
              <p style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.82rem)', color: 'var(--text-tertiary)', marginBottom: '0', lineHeight: '1.35' }}>
                {exp.shortDesc}
              </p>
            </div>

            {/* Bullet Points — hidden entirely on phone (<500px) */}
            {windowWidth >= 500 && (
              <div style={{
                maxHeight: hoveredExpId === exp.id ? '300px' : '0px',
                opacity: hoveredExpId === exp.id ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin-top 0.3s ease-in-out',
                marginTop: hoveredExpId === exp.id ? '0.6rem' : '0'
              }}>
                <ul style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)',
                  color: 'var(--text-secondary)',
                  listStyleType: 'none',
                  paddingLeft: renderAsLeft ? '0' : '1.25rem',
                  paddingRight: renderAsLeft ? '1.25rem' : '0',
                  textAlign: renderAsLeft ? 'right' : 'left'
                }}>
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} style={{ position: 'relative' }}>
                      {renderAsLeft ? (
                        <>
                          <span style={{ position: 'absolute', right: '-1.25rem', color: accentColor }}>•</span>
                          <span dangerouslySetInnerHTML={{ __html: bullet }} />
                        </>
                      ) : (
                        <>
                          <span style={{ position: 'absolute', left: '-1.25rem', color: accentColor }}>•</span>
                          <span dangerouslySetInnerHTML={{ __html: bullet }} />
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
