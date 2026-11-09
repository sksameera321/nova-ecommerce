import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Camera } from 'lucide-react';

export const LookbookPage = () => {
  const editorialSpreads = [
    {
      act: 'ACT I',
      title: 'Monolithic Structure & Heavy Cashmere',
      subtitle: 'Subtle proportions sculptured against alpine silhouettes.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=85',
      category: 'womens-dresses',
      quote: 'Fabrication is not merely surface—it is architectural volume worn against the spine.'
    },
    {
      act: 'ACT II',
      title: 'Titanium Calibers & Swiss Complications',
      subtitle: 'Micro-mechanical instruments engineered for lifelong precision.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&q=85',
      category: 'mens-watches',
      quote: 'Time measured not in fleeting seconds, but in the indelible patina of brushed titanium.'
    },
    {
      act: 'ACT III',
      title: 'Tuscan Tanned Hide & Brass Hardware',
      subtitle: 'Unlined leather bags crafted by third-generation Florentine artisans.',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1400&q=85',
      category: 'womens-bags',
      quote: 'Every mark and grain tells the story of an uncompromising origin.'
    }
  ];

  return (
    <main style={{ padding: '3rem 0 6rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Editorial Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 5rem auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              fontWeight: 700,
              marginBottom: '1rem'
            }}
          >
            <Camera size={14} /> Autumn / Winter 2026 Lookbook
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.15,
              marginBottom: '1.5rem'
            }}
          >
            The St. Moritz <em>Retrospective</em>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Captured under high-altitude diffuse light, the Autumn/Winter editorial captures the union between alpine austerity and Parisian tailoring.
          </p>
        </div>

        {/* Editorial Spreads */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {editorialSpreads.map((spread, idx) => (
            <article
              key={spread.act}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '3.5rem',
                alignItems: 'center',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  minHeight: '520px',
                  backgroundColor: 'var(--bg-secondary)',
                  order: idx % 2 === 1 ? 2 : 1
                }}
              >
                <img
                  src={spread.image}
                  alt={spread.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <div style={{ padding: '3rem', order: idx % 2 === 1 ? 1 : 2 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.2em',
                    color: 'var(--accent-gold)',
                    fontWeight: 700
                  }}
                >
                  {spread.act}
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    lineHeight: 1.25,
                    marginTop: '8px',
                    marginBottom: '1rem'
                  }}
                >
                  {spread.title}
                </h2>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {spread.subtitle}
                </p>

                <blockquote
                  style={{
                    borderLeft: '2px solid var(--accent-gold)',
                    paddingLeft: '1.25rem',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '1.05rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '2rem'
                  }}
                >
                  "{spread.quote}"
                </blockquote>

                <Link
                  to={`/shop?category=${spread.category}`}
                  className="btn btn-primary"
                  style={{ gap: '8px' }}
                >
                  Shop Featured Pieces <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};
