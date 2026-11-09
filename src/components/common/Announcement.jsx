import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const Announcement = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside
      className="announcement-bar"
      aria-label="Announcement"
      style={{
        background: '#121110',
        color: '#FAF8F5',
        fontSize: '0.75rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 600,
        padding: '8px 1.5rem',
        borderBottom: '1px solid rgba(197, 162, 101, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 'var(--z-header)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
        <Sparkles size={14} color="#C5A265" />
        <span>
          Complimentary Worldwide Express Delivery on orders over $150 &bull; Use Code{' '}
          <strong style={{ color: '#C5A265', letterSpacing: '0.15em' }}>NOVA10</strong> for 10% off
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close announcement banner"
        style={{
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#8C8780',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px'
        }}
      >
        <X size={14} />
      </button>
    </aside>
  );
};
