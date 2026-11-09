import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Shield, Award } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '82vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        color: '#FAF8F5',
        backgroundColor: '#121110'
      }}
    >
      {/* Background Editorial Image with Luxury Gradient Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(18, 17, 16, 0.92) 0%, rgba(18, 17, 16, 0.65) 50%, rgba(18, 17, 16, 0.85) 100%),
            linear-gradient(to bottom, rgba(18, 17, 16, 0.3) 0%, rgba(18, 17, 16, 0.85) 100%),
            url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=85&auto=format&fit=crop')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center 25%',
          transform: 'scale(1.02)',
          transition: 'transform 8s ease'
        }}
      />

      {/* Subtle Grain Texture Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(197, 162, 101, 0.15) 0%, transparent 60%)',
          pointerEvents: 'none'
        }}
      />

      {/* Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '720px' }}>
          <div
            className="animate-slide-up"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(197, 162, 101, 0.18)',
              border: '1px solid rgba(197, 162, 101, 0.4)',
              color: 'var(--accent-gold-light)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem'
            }}
          >
            <Compass size={14} color="#C5A265" />
            Autumn / Winter 2026 Collection
          </div>

          <h1
            className="display-title animate-slide-up"
            style={{
              color: '#FAF8F5',
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}
          >
            Sculpted Silhouettes &amp; <em>Timeless Horology</em>
          </h1>

          <p
            className="animate-slide-up"
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: '#D4CEBF',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '580px'
            }}
          >
            Curated ready-to-wear garments, precision Swiss complications, and artisanal leather goods crafted with uncompromising materiality.
          </p>

          <div
            className="animate-slide-up"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <Link to="/shop" className="btn btn-gold" style={{ padding: '1rem 2.25rem' }}>
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link
              to="/lookbook"
              className="btn"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FAF8F5',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(8px)',
                padding: '1rem 2rem'
              }}
            >
              The 2026 Lookbook
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: '#C5A265' }}>
                62+
              </div>
              <div style={{ fontSize: '0.75rem', color: '#A19C91', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Artisanal Pieces
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: '#C5A265' }}>
                100%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#A19C91', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Verified Provenance
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: '#C5A265' }}>
                ₹0
              </div>
              <div style={{ fontSize: '0.75rem', color: '#A19C91', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Express Delivery &gt;₹5,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
