import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        overflow: 'hidden',
        transition: 'all var(--transition-normal)'
      }}
      className="product-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-gold)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-light)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Product Image Frame */}
      <Link
        to={`/product/${product.id}`}
        style={{
          position: 'relative',
          paddingTop: '125%', // 4:5 fashion aspect ratio
          backgroundColor: 'var(--bg-secondary)',
          overflow: 'hidden',
          display: 'block'
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="product-card__img"
        />

        {/* Badges on Top Left */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 2
          }}
        >
          {product.discountPercentage > 10 && (
            <span className="badge badge-terracotta">
              -{Math.round(product.discountPercentage)}% Off
            </span>
          )}
          {product.isNew && (
            <span className="badge badge-gold">
              New Season
            </span>
          )}
        </div>

        {/* Wishlist Heart on Top Right */}
        <button
          onClick={handleWishlistClick}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-card)',
            color: inWishlist ? 'var(--accent-terracotta)' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
            border: inWishlist ? '1px solid var(--accent-terracotta)' : '1px solid var(--border-light)',
            zIndex: 2,
            transition: 'all var(--transition-fast)'
          }}
        >
          <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add Overlay on Hover */}
        <button
          onClick={handleQuickAdd}
          aria-label="Quick Add to Bag"
          className="btn-quick-add"
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            padding: '10px 14px',
            backgroundColor: 'var(--bg-glass)',
            color: 'var(--text-primary)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            zIndex: 2,
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'all var(--transition-fast)'
          }}
        >
          <ShoppingBag size={14} /> Quick Add to Bag
        </button>
      </Link>

      {/* Product Meta Details */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              fontWeight: 600
            }}
          >
            {product.brand}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <Star size={13} fill="var(--accent-gold)" color="var(--accent-gold)" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <Link
          to={`/product/${product.id}`}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.05rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.35,
            textDecoration: 'none'
          }}
        >
          {product.title}
        </Link>

        {/* Price & Stock */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: 'auto', paddingTop: '6px' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                textDecoration: 'line-through'
              }}
            >
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <style>{`
        .product-card:hover .product-card__img {
          transform: scale(1.06);
        }
        .product-card:hover .btn-quick-add {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </article>
  );
};
