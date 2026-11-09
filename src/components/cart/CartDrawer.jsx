import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';

export const CartDrawer = () => {
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
    isCartOpen,
    setIsCartOpen,
    coupon,
    couponError,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyCoupon(promoInput)) {
      setPromoInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => setIsCartOpen(false)}
      style={{
        justifyContent: 'flex-end',
        padding: 0
      }}
    >
      <div
        className="animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: 'var(--bg-card)',
          boxShadow: 'var(--shadow-drawer)',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid var(--border-light)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)' }}>
              Shopping Bag
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {itemCount} {itemCount === 1 ? 'Piece' : 'Pieces'} Selected
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="btn-icon"
            aria-label="Close bag drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-light)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
            <Sparkles size={14} color="var(--accent-gold)" />
            {amountToFreeShipping > 0 ? (
              <span>
                Add <strong style={{ color: 'var(--accent-gold)' }}>${amountToFreeShipping.toFixed(2)}</strong> for Complimentary Express Delivery
              </span>
            ) : (
              <span style={{ color: 'var(--accent-emerald)' }}>
                Complimentary Express Delivery Unlocked!
              </span>
            )}
          </div>
          <div
            style={{
              width: '100%',
              height: '5px',
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

        {/* Cart Item List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '1rem',
                color: 'var(--text-muted)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)'
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                Your shopping bag is empty
              </div>
              <p style={{ fontSize: '0.875rem', maxWidth: '240px', lineHeight: 1.5 }}>
                Explore our curated runway collections and iconic timepieces.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="btn btn-primary"
                style={{ marginTop: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}
              >
                Discover Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                style={{
                  display: 'flex',
                  gap: '14px',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-light)'
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: '80px',
                    height: '96px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--bg-secondary)'
                  }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4
                        style={{
                          fontSize: '0.925rem',
                          fontFamily: 'var(--font-serif)',
                          lineHeight: 1.3,
                          marginRight: '8px'
                        }}
                      >
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        aria-label="Remove item"
                        style={{ color: 'var(--text-muted)', padding: '2px' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                      {item.selectedVariant !== 'Standard' && <span>Size: {item.selectedVariant} &bull; </span>}
                      <span>{item.selectedColor}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    {/* Stepper */}
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
                        style={{ padding: '4px 8px', color: 'var(--text-primary)' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span
                        style={{
                          padding: '0 8px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          minWidth: '24px',
                          textAlign: 'center'
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        style={{ padding: '4px 8px', color: 'var(--text-primary)' }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Totals and Checkout CTA (Only if items exist) */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (e.g. NOVA10)"
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 30px',
                    fontSize: '0.8rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-medium)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    textTransform: 'uppercase'
                  }}
                />
                <Tag
                  size={14}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.75rem' }}
              >
                Apply
              </button>
            </form>

            {coupon && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  background: 'var(--accent-gold-bg)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-gold-dark)'
                }}
              >
                <span>Active: <strong>{coupon.code}</strong> ({coupon.label})</span>
                <button
                  onClick={removeCoupon}
                  style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                  aria-label="Remove promo code"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {couponError && (
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-terracotta)' }}>
                {couponError}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-gold)' }}>
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Estimated Shipping</span>
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
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '8px',
                  marginTop: '4px'
                }}
              >
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleCheckout}
              className="btn btn-gold"
              style={{ width: '100%', padding: '0.9rem', fontSize: '0.85rem' }}
            >
              Simulate Checkout <ArrowRight size={16} />
            </button>
            <button
              onClick={handleViewCart}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '0.65rem', fontSize: '0.75rem' }}
            >
              View Full Shopping Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
