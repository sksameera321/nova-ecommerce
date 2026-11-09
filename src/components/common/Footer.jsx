import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Heart } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#121110',
        color: '#FAF8F5',
        padding: '5rem 0 2rem 0',
        borderTop: '1px solid rgba(197, 162, 101, 0.25)'
      }}
    >
      <div className="container">
        {/* Top Newsletter Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            alignItems: 'center'
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                color: '#C5A265',
                textTransform: 'uppercase'
              }}
            >
              Atelier Private Access
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                color: '#FAF8F5',
                marginTop: '6px',
                marginBottom: '8px'
              }}
            >
              Receive Private Invitations &amp; Runway Edits
            </h3>
            <p style={{ color: '#8C8780', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Join our discerning global clientele for priority previews of limited-run horological allocations and runway drops.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '1rem',
                  backgroundColor: 'rgba(197, 162, 101, 0.15)',
                  border: '1px solid #C5A265',
                  borderRadius: 'var(--radius-xs)',
                  color: '#C5A265'
                }}
              >
                <Check size={18} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  Welcome to the NOVA Atelier Client Registry.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  aria-label="Email address for private access"
                  style={{
                    flex: 1,
                    padding: '0.9rem 1.25rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-xs)',
                    color: '#FAF8F5',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{ padding: '0.9rem 1.5rem', flexShrink: 0 }}
                >
                  Join <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem 2rem',
            padding: '4rem 0'
          }}
        >
          {/* Col 1: Brand & Identity */}
          <div>
            <div className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FAF8F5' }}>
              NOVA
            </div>
            <div
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                color: '#C5A265',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              ATELIER
            </div>
            <p style={{ color: '#8C8780', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Haute fashion, Swiss horological precision, and artisanal leather accessories curated with architectural discipline.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#8C8780' }}>
              Studio: Via Montenapoleone, Milan
            </div>
          </div>

          {/* Col 2: Collections */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FAF8F5',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                marginBottom: '1.25rem'
              }}
            >
              Atelier Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <li>
                <Link to="/shop?category=mens-watches" style={{ color: '#8C8780' }}>Swiss Complications</Link>
              </li>
              <li>
                <Link to="/shop?category=womens-dresses" style={{ color: '#8C8780' }}>Ready-to-Wear Gowns</Link>
              </li>
              <li>
                <Link to="/shop?category=womens-bags" style={{ color: '#8C8780' }}>Artisanal Leather Totes</Link>
              </li>
              <li>
                <Link to="/shop?category=fragrances" style={{ color: '#8C8780' }}>Haute Parfumerie</Link>
              </li>
              <li>
                <Link to="/lookbook" style={{ color: '#C5A265' }}>The 2026 Lookbook &rarr;</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Care */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FAF8F5',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                marginBottom: '1.25rem'
              }}
            >
              Client Relations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: '#8C8780' }}>
              <li>Complimentary Global Shipping</li>
              <li>30-Day Doorstep Returns</li>
              <li>Digital Authenticity Certificate</li>
              <li>Bespoke Sizing Consultation</li>
              <li>Care &amp; Preservation Guide</li>
            </ul>
          </div>

          {/* Col 4: Engineering & Developer Credit */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FAF8F5',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                marginBottom: '1.25rem'
              }}
            >
              Engineering &amp; Provenance
            </h4>
            <div style={{ fontSize: '0.85rem', color: '#8C8780', lineHeight: 1.7 }}>
              <div><strong>Project:</strong> Assignment 04 – Modern E-Commerce</div>
              <div><strong>Developer:</strong> Sameera Bhanu</div>
              <div><strong>College:</strong> SVECW, Bhimavaram</div>
              <div><strong>Architecture:</strong> React 19, Vite, Hooks, Context API</div>
              <div style={{ marginTop: '8px' }}>
                <a
                  href="https://github.com/sksameera321/nova-ecommerce"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#C5A265', fontWeight: 600 }}
                >
                  GitHub Source Code &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.8rem',
            color: '#8C8780'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} NOVA Atelier. All rights reserved. Designed &amp; Engineered by{' '}
            <strong style={{ color: '#FAF8F5' }}>Sameera Bhanu</strong>.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span>Curated with DummyJSON REST API</span>
            <span>&bull;</span>
            <span style={{ color: '#C5A265', fontWeight: 600 }}>INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
