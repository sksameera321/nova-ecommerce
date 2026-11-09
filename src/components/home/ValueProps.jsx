import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

export const ValueProps = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Atelier Provenance',
      description: 'Every timepiece and ready-to-wear piece is authenticated with digital certification.'
    },
    {
      icon: Truck,
      title: 'Complimentary Global Courier',
      description: 'Dispatched in discreet, climate-controlled packaging within 24 hours on orders over ₹5,000.'
    },
    {
      icon: RotateCcw,
      title: '30-Day Bespoke Returns',
      description: 'Enjoy effortless door-to-door courier collection if an item does not suit your aesthetic.'
    },
    {
      icon: Sparkles,
      title: 'Private Client Concierge',
      description: 'Dedicated personal stylists available via direct appointment for bespoke sizing guidance.'
    }
  ];

  return (
    <section
      style={{
        padding: '3.5rem 0',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-light)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem 2rem'
          }}
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--accent-gold)'
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      marginBottom: '6px'
                    }}
                  >
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
