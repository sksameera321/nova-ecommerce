import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <main
      style={{
        padding: '8rem 1.5rem',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '480px' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '5rem',
            fontWeight: 700,
            color: 'var(--accent-gold)',
            lineHeight: 1,
            marginBottom: '1rem'
          }}
        >
          404
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>
          Archived Piece Not Found
        </h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          The requested runway allocation or catalogue page does not exist in our current records. Please return to the digital salon.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-secondary">
            Return Home
          </Link>
          <Link to="/shop" className="btn btn-primary" style={{ gap: '8px' }}>
            Browse Collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
};
