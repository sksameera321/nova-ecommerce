import React from 'react';
import { ProductCard } from './ProductCard';
import { Sparkles, RotateCcw } from 'lucide-react';

export const ProductGrid = ({ products = [], loading = false, onResetFilters }) => {
  if (loading) {
    return (
      <div className="grid-products">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="skeleton" style={{ paddingTop: '125%', width: '100%' }} />
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="skeleton" style={{ height: '12px', width: '35%' }} />
              <div className="skeleton" style={{ height: '18px', width: '85%' }} />
              <div className="skeleton" style={{ height: '16px', width: '40%', marginTop: '6px' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-medium)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          margin: '2rem 0'
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)'
          }}
        >
          <Sparkles size={26} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
          No Matching Atelier Pieces Found
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.6, fontSize: '0.95rem' }}>
          We could not find any pieces matching your current filters or search terms. Try adjusting your price range or exploring another category.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="btn btn-secondary"
            style={{ marginTop: '0.5rem', gap: '8px' }}
          >
            <RotateCcw size={15} /> Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid-products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
