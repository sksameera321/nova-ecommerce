import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { ValueProps } from '../components/home/ValueProps';
import { CategoryBento } from '../components/home/CategoryBento';
import { LookbookBanner } from '../components/home/LookbookBanner';
import { ProductGrid } from '../components/product/ProductGrid';
import { getTrendingProducts } from '../services/api';
import { ArrowRight, Star, Quote } from 'lucide-react';

export const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTrendingProducts(8)
      .then((data) => {
        setTrending(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load trending products:', err);
        setLoading(false);
      });
  }, []);

  const pressQuotes = [
    {
      publication: 'Vogue Horology',
      quote: 'NOVA Atelier marries brutalist architectural proportion with the timeless precision of classical Geneva watchmaking.'
    },
    {
      publication: 'Architectural Digest',
      quote: 'An uncompromising antidote to ephemeral trends. Every silhouette feels sculpturally intentional and built to endure.'
    },
    {
      publication: 'The Financial Times',
      quote: 'The digital flagship redefines tactile luxury commerce with peerless curation and discreet, white-glove courier fulfillment.'
    }
  ];

  return (
    <main>
      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Core Atelier Value Propositions */}
      <ValueProps />

      {/* 3. Four Core Category Pillars Bento Grid */}
      <CategoryBento />

      {/* 4. Curated Trending Arrivals */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}
          >
            <div>
              <span className="section-tag">Runway &amp; Gallery</span>
              <h2 className="section-title">Trending Atelier Pieces</h2>
              <p className="section-subtitle">
                Acclaimed horological complications and artisanal silhouettes trending across our global boutiques.
              </p>
            </div>
            <Link to="/shop" className="btn btn-secondary" style={{ gap: '8px' }}>
              Explore Complete Collection <ArrowRight size={16} />
            </Link>
          </div>

          <ProductGrid products={trending} loading={loading} />
        </div>
      </section>

      {/* 5. Split-Screen Editorial Lookbook Feature */}
      <LookbookBanner />

      {/* 6. Editorial Press & Client Acclaim */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Client Acclaim &amp; Critical Notice</span>
            <h2 className="section-title">Recognized by the World’s Discerning Editors</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {pressQuotes.map((item) => (
              <div
                key={item.publication}
                style={{
                  padding: '2.5rem 2rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.5rem'
                }}
              >
                <div>
                  <Quote size={28} color="var(--accent-gold)" style={{ opacity: 0.6, marginBottom: '1rem' }} />
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      color: 'var(--text-primary)'
                    }}
                  >
                    "{item.quote}"
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: 'var(--accent-gold)'
                  }}
                >
                  &mdash; {item.publication}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
