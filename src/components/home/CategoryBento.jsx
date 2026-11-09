import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const CategoryBento = () => {
  const categories = [
    {
      title: 'Swiss Horology',
      tagline: 'Mechanical Precision & Complications',
      slug: 'mens-watches',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1000&q=80',
      span: 'bento-large'
    },
    {
      title: 'Ready-to-Wear',
      tagline: 'Sculptural Silhouettes & Silk Gowns',
      slug: 'womens-dresses',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=80',
      span: 'bento-tall'
    },
    {
      title: 'Artisanal Leather',
      tagline: 'Italian Tuscan Tanned Leather Goods',
      slug: 'womens-bags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
      span: 'bento-small'
    },
    {
      title: 'Haute Parfumerie',
      tagline: 'Botanical Elixirs & Rare Extraits',
      slug: 'fragrances',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
      span: 'bento-small'
    }
  ];

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Curated Collections</span>
          <h2 className="section-title">The Four Pillars of NOVA Atelier</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Each collection is assembled through meticulous provenance, uncompromising materials, and modern architectural vision.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={`/shop?category=${cat.slug}`}
              className={`bento-card ${cat.span}`}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                minHeight: '340px',
                textDecoration: 'none',
                color: '#FAF8F5'
              }}
            >
              {/* Background Image with Vignette */}
              <div
                className="bento-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `linear-gradient(to top, rgba(18, 17, 16, 0.9) 0%, rgba(18, 17, 16, 0.25) 60%, rgba(18, 17, 16, 0.1) 100%), url('${cat.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />

              {/* Top Link Icon */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FAF8F5',
                  zIndex: 2,
                  transition: 'all var(--transition-fast)'
                }}
                className="bento-arrow"
              >
                <ArrowUpRight size={18} />
              </div>

              {/* Bottom Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold-light)',
                    fontWeight: 600,
                    marginBottom: '4px',
                    display: 'block'
                  }}
                >
                  {cat.tagline}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.8rem',
                    fontWeight: 500,
                    color: '#FAF8F5'
                  }}
                >
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-large {
            grid-column: span 2;
            min-height: 420px !important;
          }
        }
        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .bento-large {
            grid-column: span 2;
            grid-row: span 1;
            min-height: 380px !important;
          }
          .bento-tall {
            grid-column: span 1;
            grid-row: span 2;
            min-height: 100% !important;
          }
        }
        .bento-card:hover .bento-bg {
          transform: scale(1.06);
        }
        .bento-card:hover .bento-arrow {
          background-color: var(--accent-gold) !important;
          color: #121110 !important;
          transform: translate(2px, -2px);
        }
      `}</style>
    </section>
  );
};
