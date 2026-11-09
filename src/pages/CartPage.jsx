import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag, X } from 'lucide-react';

export const CartPage = () => {
  const {
    cart,
    itemCount,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    total,
    freeShippingProgress,
    amountToFreeShipping,
    coupon,
    couponError,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    if (applyCoupon(promoCode)) {
      setPromoCode('');
    }
  };

  if (cart.length === 0) {
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
            <ShoppingBag size={36} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.75rem' }}>
            Your Shopping Bag is Empty
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Discover our curated catalogue of Swiss horological complications, ready-to-wear gowns, and artisanal leather pieces.
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
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">Atelier Consignment</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500 }}>
            Your Shopping Bag ({itemCount} {itemCount === 1 ? 'Piece' : 'Pieces'})
          </h1>
        </div>

        {/* Free Delivery Meter */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            marginBottom: '2.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>
            <Sparkles size={16} color="var(--accent-gold)" />
            {amountToFreeShipping > 0 ? (
              <span>
                Add <strong style={{ color: 'var(--accent-gold)' }}>${amountToFreeShipping.toFixed(2)}</strong> more for Complimentary Global Express Delivery
              </span>
            ) : (
              <span style={{ color: 'var(--accent-emerald)' }}>
                Complimentary Global Express Delivery Unlocked!
              </span>
            )}
          </div>
          <div
            style={{
              width: '100%',
              height: '6px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${freeShippingProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%)',
                transition: 'width var(--transition-normal)'
              }}
            />
          </div>
        </div>

        {/* Main 2-Column Cart Layout */}
        <div className="cart-grid">
          {/* Left Column: Cart Items Table */}
          <div>
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 1fr 1fr 1fr auto',
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid var(--border-light)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)'
                }}
                className="cart-table-header"
              >
                <div>Piece Details</div>
                <div>Price</div>
                <div style={{ textAlign: 'center' }}>Quantity</div>
                <div style={{ textAlign: 'right' }}>Total</div>
                <div></div>
              </div>

              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '3fr 1fr 1fr 1fr auto',
                    alignItems: 'center',
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--border-light)',
                    gap: '1rem'
                  }}
                  className="cart-table-row"
                >
                  {/* Item info */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        width: '72px',
                        height: '88px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'var(--bg-secondary)'
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                        {item.brand}
                      </div>
                      <Link
                        to={`/product/${item.id}`}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.05rem',
                          fontWeight: 500,
                          lineHeight: 1.3
                        }}
                      >
                        {item.title}
                      </Link>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {item.selectedVariant !== 'Standard' && <span>Size: {item.selectedVariant} &bull; </span>}
                        <span>{item.selectedColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Unit price */}
                  <div style={{ fontWeight: 600 }}>
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Stepper */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-xs)',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        style={{ padding: '6px 10px', color: 'var(--text-primary)' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span
                        style={{
                          padding: '0 8px',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          minWidth: '24px',
                          textAlign: 'center'
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        style={{ padding: '6px 10px', color: 'var(--text-primary)' }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div style={{ textAlign: 'right', fontWeight: 700, color: 'var(--accent-gold)' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Delete Button */}
                  <div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      aria-label="Remove item"
                      style={{ color: 'var(--text-muted)', padding: '6px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/shop" style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                  &larr; Continue Exploring Atelier
                </Link>
                <button
                  onClick={clearCart}
                  style={{ fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  Empty Shopping Bag
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div>
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'sticky',
                top: 'calc(var(--header-height) + 24px)'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 500 }}>
                Order Summary
              </h3>

              {/* Promo Code Input */}
              <form onSubmit={handleApply} style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="PROMO CODE (NOVA10)"
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 34px',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      textTransform: 'uppercase'
                    }}
                  />
                  <Tag
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
                <button type="submit" className="btn btn-secondary" style={{ padding: '10px 18px' }}>
                  Apply
                </button>
              </form>

              {coupon && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'var(--accent-gold-bg)',
                    border: '1px solid var(--border-gold)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.8rem',
                    color: 'var(--accent-gold-dark)'
                  }}
                >
                  <span>Active: <strong>{coupon.code}</strong> ({coupon.label})</span>
                  <button onClick={removeCoupon} style={{ color: 'var(--text-muted)' }}>
                    <X size={14} />
                  </button>
                </div>
              )}

              {couponError && (
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-terracotta)' }}>
                  {couponError}
                </div>
              )}

              {/* Calculations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-gold)', fontWeight: 600 }}>
                    <span>Promotion Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Estimated Global Courier</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Estimated Tax (8%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '12px',
                    marginTop: '6px'
                  }}
                >
                  <span>Total Amount</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-gold"
                style={{ width: '100%', padding: '1rem', fontSize: '0.9rem' }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 960px) {
          .cart-grid {
            grid-template-columns: 1fr 380px;
          }
        }
        @media (max-width: 680px) {
          .cart-table-header {
            display: none !important;
          }
          .cart-table-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </main>
  );
};
