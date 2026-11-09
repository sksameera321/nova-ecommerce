import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currency';
import { ShieldCheck, Lock, CreditCard, Truck, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export const CheckoutPage = () => {
  const { cart, subtotal, discountAmount, shippingFee, taxAmount, total, clearCart } = useCart();
  const navigate = useNavigate();

  // Multi-step: 1 = Shipping, 2 = Delivery, 3 = Payment
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    firstName: 'Sameera',
    lastName: 'Bhanu',
    email: 'sameera.bhanu@svecw.edu.in',
    phone: '+91 98765 43210',
    address: 'Atelier Residence, Silicon Corridor',
    apartment: 'Suite 404',
    city: 'Bhimavaram',
    state: 'Andhra Pradesh',
    postalCode: '534202',
    country: 'India',
    deliveryMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    cardName: 'SAMEERA BHANU'
  });

  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <main style={{ padding: '6rem 0', minHeight: '70vh', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '480px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>
            No Active Order in Bag
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Please select at least one piece from our collection before proceeding to checkout.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  const validateStep1 = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    const orderId = `NOV-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderPayload = {
      orderId,
      date: new Date().toISOString(),
      items: cart,
      subtotal,
      discountAmount,
      shippingFee,
      taxAmount,
      total,
      shippingDetails: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.apartment}`,
        city: `${formData.city}, ${formData.state} ${formData.postalCode}`,
        country: formData.country
      },
      deliveryMethod: formData.deliveryMethod,
      paymentMethod: formData.paymentMethod
    };

    try {
      localStorage.setItem('nova_last_order', JSON.stringify(orderPayload));
    } catch (err) {
      console.error('Failed to save order to localStorage:', err);
    }

    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <main style={{ padding: '3rem 0 6rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Header with Secure Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <span className="section-tag">Encrypted Checkout</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 500 }}>
              Atelier Consignment Checkout
            </h1>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              backgroundColor: 'var(--accent-gold-bg)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--accent-gold-dark)',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            <Lock size={14} /> 256-Bit SSL Encrypted
          </div>
        </div>

        {/* Checkout Progress Stepper */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '3rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-light)'
          }}
        >
          {[
            { num: 1, label: 'Shipping Details' },
            { num: 2, label: 'Delivery Method' },
            { num: 3, label: 'Simulated Payment' }
          ].map((s, idx) => (
            <React.Fragment key={s.num}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: step >= s.num ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                    color: step >= s.num ? '#121110' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  {step > s.num ? <Check size={16} /> : s.num}
                </span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: step === s.num ? 700 : 500,
                    color: step === s.num ? 'var(--text-primary)' : 'var(--text-muted)'
                  }}
                >
                  {s.label}
                </span>
              </div>
              {idx < 2 && (
                <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--border-medium)' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 2-Column Layout */}
        <div className="checkout-grid">
          {/* Left Column: Multi-Step Forms */}
          <div>
            {/* STEP 1: Shipping Address Form */}
            {step === 1 && (
              <div
                className="animate-fade-in"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  padding: '2.5rem'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>
                  1. Client Consignment &amp; Delivery Address
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                    {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Client Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Direct Phone *</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  {errors.address && <span className="form-error">{errors.address}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Apartment, Villa, or Suite</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">State / Province</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postal Code *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    />
                    {errors.postalCode && <span className="form-error">{errors.postalCode}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Destination Country</label>
                  <select
                    className="form-select"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="France">France</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button onClick={handleNextStep} className="btn btn-gold" style={{ padding: '0.9rem 2rem' }}>
                    Continue to Delivery Method <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Delivery Method Form */}
            {step === 2 && (
              <div
                className="animate-fade-in"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  padding: '2.5rem'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>
                  2. Select Delivery Experience
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    {
                      id: 'standard',
                      title: 'Standard Climate-Controlled Courier',
                      time: '3–5 Business Days',
                      price: shippingFee === 0 ? 'Complimentary (₹0)' : formatINR(shippingFee),
                      desc: 'Discreet luxury packaging with signature required upon handover.'
                    },
                    {
                      id: 'express',
                      title: 'Priority Atelier Air Courier',
                      time: '1–2 Business Days',
                      price: '+₹1,500',
                      desc: 'Express flight routing with priority dispatch from Milan boutique.'
                    },
                    {
                      id: 'white-glove',
                      title: 'White-Glove Private Courier',
                      time: 'Direct Scheduled Appointment',
                      price: '+₹3,500',
                      desc: 'Hand-delivered by an authorized NOVA Atelier representative.'
                    }
                  ].map((option) => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-xs)',
                        border: formData.deliveryMethod === option.id ? '2px solid var(--accent-gold)' : '1px solid var(--border-medium)',
                        backgroundColor: formData.deliveryMethod === option.id ? 'var(--accent-gold-bg)' : 'var(--bg-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value={option.id}
                          checked={formData.deliveryMethod === option.id}
                          onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                        />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{option.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {option.time} &bull; {option.desc}
                          </div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-gold-dark)', fontSize: '0.9rem' }}>
                        {option.price}
                      </div>
                    </label>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                  <button onClick={() => setStep(1)} className="btn btn-secondary">
                    <ArrowLeft size={16} /> Back to Address
                  </button>
                  <button onClick={handleNextStep} className="btn btn-gold" style={{ padding: '0.9rem 2rem' }}>
                    Continue to Payment <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Method Simulation */}
            {step === 3 && (
              <div
                className="animate-fade-in"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  padding: '2.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                    3. Simulated Payment Method
                  </h3>
                  <span className="badge badge-gold">Test Mode Only</span>
                </div>

                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.825rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.5rem',
                    border: '1px dashed var(--border-gold)'
                  }}
                >
                  <strong>Academic Simulation Notice:</strong> No real payment card will be charged. You may use the pre-filled test card or select any simulation mode.
                </div>

                {/* Card Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Cardholder Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Simulated Card Number</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      />
                      <CreditCard
                        size={18}
                        color="var(--accent-gold)"
                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Expiration Date</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVC / Security Code</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button onClick={() => setStep(2)} className="btn btn-secondary">
                    <ArrowLeft size={16} /> Back to Delivery
                  </button>
                  <button onClick={handleCompleteOrder} className="btn btn-gold" style={{ padding: '1rem 2.5rem' }}>
                    Authorize Simulated Order ({formatINR(total)}) &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div>
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                padding: '2rem',
                position: 'sticky',
                top: 'calc(var(--header-height) + 24px)'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                Your Order ({cart.length} {cart.length === 1 ? 'Piece' : 'Pieces'})
              </h3>

              {/* Items List */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  paddingRight: '6px',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '1.25rem'
                }}
              >
                {cart.map((item) => (
                  <div key={item.cartItemId} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        width: '48px',
                        height: '56px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'var(--bg-secondary)'
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Qty: {item.quantity} &bull; {item.selectedVariant}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                      {formatINR(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-gold)' }}>
                    <span>Promotion Discount</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Courier Delivery</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : formatINR(shippingFee)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Estimated Tax (18% GST)</span>
                  <span>{formatINR(taxAmount)}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '10px',
                    marginTop: '4px'
                  }}
                >
                  <span>Grand Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 960px) {
          .checkout-grid {
            grid-template-columns: 1fr 380px;
          }
        }
      `}</style>
    </main>
  );
};
