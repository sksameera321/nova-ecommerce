import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { getAllProducts } from '../../services/api';
import { formatINR } from '../../utils/currency';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      getAllProducts().then((data) => setAllProducts(data));
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const q = query.toLowerCase().trim();
      const matched = allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
      setResults(matched.slice(0, 6));
      setLoading(false);
    }, 180);

    return () => clearTimeout(timer);
  }, [query, allProducts]);

  if (!isOpen) return null;

  const handleSelectProduct = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  const popularTags = ['Chronograph', 'Silk Gown', 'Leather Tote', 'Extrait Parfumerie', 'Gold Watch'];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-gold)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Search Input Box */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-light)'
          }}
        >
          <Search size={22} color="var(--accent-gold)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search haute couture, timepieces, fragrances..."
            aria-label="Search products"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
              fontFamily: 'inherit'
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{ color: 'var(--text-muted)', padding: '4px' }}
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="btn-icon"
            style={{ width: '32px', height: '32px' }}
          >
            <X size={16} />
          </button>
        </form>

        {/* Results / Suggestions Area */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {query.trim() === '' ? (
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: '0.85rem'
                }}
              >
                Curated Suggestions
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      border: '1px solid var(--border-light)',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-gold)';
                      e.currentTarget.style.color = 'var(--accent-gold)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-light)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: '4px'
                }}
              >
                Matching Atelier Pieces ({results.length})
              </div>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-secondary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-xs)',
                      background: 'var(--bg-secondary)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{product.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {product.brand} &bull; {product.category.replace('-', ' ')}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-gold)', fontSize: '0.95rem' }}>
                    {formatINR(product.price)}
                  </div>
                </div>
              ))}
              <button
                onClick={handleSearchSubmit}
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--accent-gold)',
                  borderTop: '1px solid var(--border-light)'
                }}
              >
                View all results for "{query}" <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
              No pieces found matching "{query}". Try a different term or browse our curated collections.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
