import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const LookbookBanner = () => {
  return (
    <section
      style={{
        padding: '5rem 0',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            overflow: 'hidden'
          }}
        >
          {/* Left: Editorial Image with Aspect Ratio */}
          <div
            style={{
              position: 'relative',
              minHeight: '480px',
              backgroundColor: '#121110',
              overflow: 'hidden'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80"
              alt="NOVA Atelier Editorial Lookbook"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                backgroundColor: 'rgba(18, 17, 16, 0.75)',
                backdropFilter: 'blur(8px)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-xs)',
                color: '#FAF8F5',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
            >
              Shot in St. Moritz &bull; Vol. IV
            </div>
          </div>

          {/* Right: Editorial Storytelling */}
          <div style={{ padding: '2.5rem 2.5rem 2.5rem 1rem' }}>
            <span className="section-tag">
              <Sparkles size={14} color="var(--accent-gold)" /> Atelier Manifesto
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontFamily: 'var(--font-serif)',
                lineHeight: 1.25,
                marginBottom: '1.25rem'
              }}
            >
              The Monolith Edit: <em>Pure Proportion</em>
            </h2>

            <blockquote
              style={{
                borderLeft: '2px solid var(--accent-gold)',
                paddingLeft: '1.25rem',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}
            >
              "We reject ephemeral fast-fashion in favor of structural clarity, mechanical durability, and tactile fibers that gain depth and character across decades."
            </blockquote>

            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              From titanium complications calibrated to fractions of a second to heavy-gauge double-faced cashmere overcoats, each piece in the collection represents a lifelong commitment to craftsmanship.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/lookbook" className="btn btn-primary">
                View Editorial Lookbook <ArrowRight size={16} />
              </Link>
              <Link to="/shop?category=mens-watches" className="btn btn-secondary">
                Explore Horology
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
