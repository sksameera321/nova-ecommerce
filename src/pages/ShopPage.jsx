import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFilteredProducts, CURATED_CATEGORIES } from '../services/api';
import { ProductGrid } from '../components/product/ProductGrid';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { formatINR } from '../utils/currency';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State initialised from URL params
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState(125000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(initialSort);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const q = searchParams.get('search') || '';
    const s = searchParams.get('sort') || 'featured';
    setCategory(cat);
    setSearch(q);
    setSearchInput(q);
    setSortBy(s);
  }, [searchParams]);

  // Update URL params when category or sort changes
  const updateParams = (newCat, newSearch, newSort) => {
    const params = new URLSearchParams();
    if (newCat && newCat !== 'all') params.set('category', newCat);
    if (newSearch) params.set('search', newSearch);
    if (newSort && newSort !== 'featured') params.set('sort', newSort);
    setSearchParams(params);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    updateParams(cat, search, sortBy);
    setIsMobileFilterOpen(false);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    updateParams(category, search, sort);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    updateParams(category, searchInput.trim(), sortBy);
  };

  const handleResetFilters = () => {
    setCategory('all');
    setSearch('');
    setSearchInput('');
    setPriceRange(125000);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams(new URLSearchParams());
  };

  // Fetch products when filters change
  useEffect(() => {
    setLoading(true);
    getFilteredProducts({
      category,
      search,
      minPrice: 0,
      maxPrice: priceRange,
      sortBy,
      inStockOnly
    })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to filter products:', err);
        setLoading(false);
      });
  }, [category, search, priceRange, sortBy, inStockOnly]);

  const activeCategoryObj = useMemo(() => {
    return CURATED_CATEGORIES.find((c) => c.slug === category) || CURATED_CATEGORIES[0];
  }, [category]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (category !== 'all') count++;
    if (search.trim()) count++;
    if (priceRange < 125000) count++;
    if (inStockOnly) count++;
    if (sortBy !== 'featured') count++;
    return count;
  }, [category, search, priceRange, inStockOnly, sortBy]);

  return (
    <main style={{ padding: '3rem 0 6rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              fontWeight: 600,
              marginBottom: '6px'
            }}
          >
            Atelier Catalogue &bull; {activeCategoryObj.name}
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              marginBottom: '0.75rem'
            }}
          >
            {category === 'all' ? 'The Complete Atelier Collection' : activeCategoryObj.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', fontSize: '0.95rem' }}>
            Explore verified pieces assembled from world-renowned ateliers, horological workshops, and couture houses.
          </p>
        </div>

        {/* Search & Mobile Filter Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)'
          }}
        >
          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'var(--bg-card)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-medium)',
              maxWidth: '380px',
              width: '100%'
            }}
          >
            <Search size={18} color="var(--accent-gold)" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search pieces, brands, tags..."
              aria-label="Search collection"
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                width: '100%'
              }}
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  setSearch('');
                  updateParams(category, '', sortBy);
                }}
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </form>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="btn btn-secondary mobile-filter-btn"
            style={{
              padding: '8px 16px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <SlidersHorizontal size={16} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Active Filters:
            </span>
            {category !== 'all' && (
              <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Category: {activeCategoryObj.name}
                <button onClick={() => handleCategoryChange('all')} style={{ cursor: 'pointer', display: 'flex' }}>
                  <X size={12} />
                </button>
              </span>
            )}
            {search.trim() && (
              <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Search: "{search}"
                <button
                  onClick={() => {
                    setSearch('');
                    setSearchInput('');
                    updateParams(category, '', sortBy);
                  }}
                  style={{ cursor: 'pointer', display: 'flex' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {priceRange < 125000 && (
              <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Under {formatINR(priceRange)}
                <button onClick={() => setPriceRange(125000)} style={{ cursor: 'pointer', display: 'flex' }}>
                  <X size={12} />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                In-Stock Only
                <button onClick={() => setInStockOnly(false)} style={{ cursor: 'pointer', display: 'flex' }}>
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginLeft: '8px',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={12} /> Clear All
            </button>
          </div>
        )}

        {/* 2-Column Layout: Sidebar (Desktop) + Products Grid */}
        <div className="shop-layout">
          {/* Desktop Filter Sidebar */}
          <div className="shop-sidebar">
            <div
              style={{
                position: 'sticky',
                top: 'calc(var(--header-height) + 24px)',
                backgroundColor: 'var(--bg-card)',
                padding: '1.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)'
              }}
            >
              <FilterSidebar
                category={category}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                inStockOnly={inStockOnly}
                onInStockToggle={setInStockOnly}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                onReset={handleResetFilters}
                totalResults={products.length}
              />
            </div>
          </div>

          {/* Main Product Grid Container */}
          <div className="shop-products">
            <ProductGrid
              products={products}
              loading={loading}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsMobileFilterOpen(false)}
          style={{ justifyContent: 'flex-start', padding: 0 }}
        >
          <div
            className="animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '85%',
              maxWidth: '360px',
              height: '100%',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-drawer)',
              padding: '2rem 1.5rem',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>Filter Atelier</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn-icon"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>
            <FilterSidebar
              category={category}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              inStockOnly={inStockOnly}
              onInStockToggle={setInStockOnly}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onReset={handleResetFilters}
              totalResults={products.length}
            />
          </div>
        </div>
      )}

      <style>{`
        .shop-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .shop-sidebar {
          display: none;
        }
        @media (min-width: 960px) {
          .shop-layout {
            grid-template-columns: 280px 1fr;
          }
          .shop-sidebar {
            display: block;
          }
          .mobile-filter-btn {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
};
