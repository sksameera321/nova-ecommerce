import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Printer, ArrowRight, Package, Clock, ShieldCheck } from 'lucide-react';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const saved = localStorage.getItem('nova_last_order');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.orderId === orderId || !orderId) {
          setOrder(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load order from storage:', e);
    }
  }, [orderId]);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);

  return (
    <main style={{ padding: '4rem 0 7rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        {/* Celebration Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            className="animate-scale-up"
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-gold-bg)',
              color: 'var(--accent-gold)',
              border: '2px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(197, 162, 101, 0.3)'
            }}
          >
            <CheckCircle2 size={44} />
          </div>

          <span className="section-tag" style={{ marginBottom: 0 }}>
            Consignment Confirmed &amp; In Queue
          </span>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}>
            Thank You for Your Patronage
          </h1>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.6 }}>
            Your simulated atelier order <strong>#{orderId || 'NOV-84920'}</strong> has been registered with our private client dispatch. A confirmation memorandum has been logged.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <button
              onClick={() => window.print()}
              className="btn btn-secondary"
              style={{ gap: '8px' }}
            >
              <Printer size={16} /> Print Official Receipt
            </button>
            <Link to="/shop" className="btn btn-primary" style={{ gap: '8px' }}>
              Continue Exploring <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Itemized Order Details Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Top Metadata Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid var(--border-light)',
              marginBottom: '2rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Order Number
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-gold)' }}>
                #{orderId || 'NOV-84920'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Order Date
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Estimated Delivery
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--accent-emerald)' }}>
                {deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Payment Method
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                Simulated Card (•••• 4242)
              </div>
            </div>
          </div>

          {/* Consignment Items */}
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
            Consignment Manifest
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {order?.items && order.items.length > 0 ? (
              order.items.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 0',
                    borderBottom: '1px solid var(--border-light)'
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      width: '56px',
                      height: '68px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--bg-secondary)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                      {item.brand}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Qty: {item.quantity} &bull; {item.selectedVariant} &bull; {item.selectedColor}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Consignment pieces registered with dispatch.
              </div>
            )}
          </div>

          {/* Financial Totals */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '1.5rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.9rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <span>${order?.subtotal?.toFixed(2) || '0.00'}</span>
            </div>
            {order?.discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-gold)', fontWeight: 600 }}>
                <span>Promotion Discount</span>
                <span>-${order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Courier Delivery</span>
              <span>{order?.shippingFee === 0 ? 'Complimentary' : `$${order?.shippingFee?.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Estimated Tax (8%)</span>
              <span>${order?.taxAmount?.toFixed(2) || '0.00'}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '10px',
                marginTop: '4px'
              }}
            >
              <span>Total Paid (Simulated)</span>
              <span>${order?.total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>

          {/* Client Destination Details */}
          {order?.shippingDetails && (
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Consignment Recipient &amp; Destination
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{order.shippingDetails.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{order.shippingDetails.address}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {order.shippingDetails.city}, {order.shippingDetails.country}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '4px' }}>
                {order.shippingDetails.email} &bull; {order.shippingDetails.phone}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
