import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currency';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <main style={{ padding: '6rem 0', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <Heart size={36} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.75rem' }}>
            Your Wishlist is Empty
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Save iconic timepieces, ready-to-wear gowns, and artisanal leather pieces to your private registry as you explore.
          </p>
          <Link to="/shop" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
            Discover Atelier Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: '3rem 0 6rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1rem',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1.5rem'
          }}
        >
          <div>
            <span className="section-tag">Curated Registry</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500 }}>
              Your Private Wishlist ({wishlist.length} {wishlist.length === 1 ? 'Piece' : 'Pieces'})
            </h1>
          </div>

          <button
            onClick={clearWishlist}
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid-products">
          {wishlist.map((product) => (
            <article
              key={product.id}
              style={{
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Link
                to={`/product/${product.id}`}
                style={{
                  position: 'relative',
                  paddingTop: '120%',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'block'
                }}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Link>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>
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

                <Link
                  to={`/product/${product.id}`}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.05rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    lineHeight: 1.3
                  }}
                >
                  {product.title}
                </Link>

                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: 'auto', paddingTop: '6px' }}>
                  {formatINR(product.price)}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.75rem', gap: '6px' }}
                  >
                    <ShoppingBag size={14} /> Move to Bag
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="btn-icon"
                    style={{ width: '38px', height: '38px' }}
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};
