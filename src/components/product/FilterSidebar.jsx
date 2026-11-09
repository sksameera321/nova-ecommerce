import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { CURATED_CATEGORIES } from '../../services/api';
import { formatINR } from '../../utils/currency';

export const FilterSidebar = ({
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockToggle,
  sortBy,
  onSortChange,
  onReset,
  totalResults
}) => {
  return (
    <aside
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}
    >
      {/* Top Filter Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SlidersHorizontal size={18} color="var(--accent-gold)" />
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
            Filter Atelier
          </h3>
        </div>
        <button
          onClick={onReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
          title="Reset filters"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Sort By Dropdown */}
      <div>
        <label className="form-label" htmlFor="sort-select">
          Sort Collection
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="form-select"
          style={{ marginTop: '4px', fontSize: '0.875rem' }}
        >
          <option value="featured">Featured Curations</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="discount-desc">Greatest Atelier Discount</option>
          <option value="name-asc">Alphabetical (A &ndash; Z)</option>
        </select>
      </div>

      {/* Categories List */}
      <div>
        <span className="form-label">
          Categories
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            marginTop: '8px'
          }}
        >
          {CURATED_CATEGORIES.map((cat) => {
            const isActive = category === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onCategoryChange(cat.slug)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--accent-gold)' : '3px solid transparent',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span>{cat.name}</span>
                {isActive && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)' }}>&bull;</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="form-label">Price Ceiling</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
            {formatINR(priceRange)}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="125000"
          step="500"
          value={priceRange}
          onChange={(e) => onPriceRangeChange(Number(e.target.value))}
          style={{
            width: '100%',
            marginTop: '10px',
            accentColor: 'var(--accent-gold)',
            cursor: 'pointer'
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginTop: '4px'
          }}
        >
          <span>₹500</span>
          <span>₹60,000</span>
          <span>₹1,25,000+</span>
        </div>
      </div>

      {/* In-Stock Only Toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          borderTop: '1px solid var(--border-light)',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>In-Stock Only</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Exclude backordered pieces
          </div>
        </div>
        <label
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '42px',
            height: '24px',
            cursor: 'pointer'
          }}
        >
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockToggle(e.target.checked)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: inStockOnly ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-full)',
              transition: 'background-color var(--transition-fast)'
            }}
          >
            <span
              style={{
                position: 'absolute',
                content: "''",
                height: '18px',
                width: '18px',
                left: inStockOnly ? '20px' : '3px',
                bottom: '3px',
                backgroundColor: 'white',
                borderRadius: '50%',
                transition: 'left var(--transition-fast)'
              }}
            />
          </span>
        </label>
      </div>

      {/* Total Count Badge */}
      <div
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          letterSpacing: '0.05em'
        }}
      >
        Showing <strong>{totalResults}</strong> curated items
      </div>
    </aside>
  );
};
