import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);
const STORAGE_KEY = 'nova_cart_items';
const COUPON_STORAGE_KEY = 'nova_applied_coupon';
const FREE_SHIPPING_THRESHOLD = 150.0;
const STANDARD_SHIPPING_FEE = 15.0;
const ESTIMATED_TAX_RATE = 0.08;

// Available promotional coupons
const PROMO_CODES = {
  NOVA10: { code: 'NOVA10', type: 'percentage', value: 10, label: '10% Atelier Welcome Discount' },
  VIP20: { code: 'VIP20', type: 'percentage', value: 20, minSubtotal: 200, label: '20% VIP Atelier Discount' },
  FREESHIP: { code: 'FREESHIP', type: 'shipping', value: 100, label: 'Complimentary Express Delivery' }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [couponError, setCouponError] = useState('');

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save coupon to localStorage:', e);
    }
  }, [coupon]);

  /**
   * Add to Cart
   */
  const addToCart = (product, quantity = 1, selectedVariant = null, selectedColor = null) => {
    if (!product) return;

    const variant = selectedVariant || (product.variants && product.variants[0]) || 'Standard';
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Obsidian';
    const cartItemId = `${product.id}_${variant}_${color}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            id: product.id,
            title: product.title,
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            discountPercentage: product.discountPercentage || 0,
            thumbnail: product.thumbnail || (product.images && product.images[0]),
            category: product.category,
            brand: product.brand,
            quantity,
            selectedVariant: variant,
            selectedColor: color
          }
        ];
      }
    });

    showToast(`Added ${quantity}× "${product.title}" to bag`, 'success');
    setIsCartOpen(true);
  };

  /**
   * Remove item
   */
  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from shopping bag', 'info');
  };

  /**
   * Update quantity
   */
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /**
   * Clear entire cart
   */
  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  /**
   * Apply Coupon Code
   */
  const applyCoupon = (codeStr) => {
    setCouponError('');
    if (!codeStr || !codeStr.trim()) {
      setCouponError('Please enter a promotion code.');
      return false;
    }

    const clean = codeStr.trim().toUpperCase();
    const promo = PROMO_CODES[clean];

    if (!promo) {
      setCouponError('Invalid promotion code. Try "NOVA10" or "FREESHIP".');
      showToast('Invalid promotion code', 'error');
      return false;
    }

    if (promo.minSubtotal && subtotal < promo.minSubtotal) {
      setCouponError(`Code requires a minimum subtotal of $${promo.minSubtotal}.`);
      showToast(`Requires minimum subtotal of $${promo.minSubtotal}`, 'error');
      return false;
    }

    setCoupon(promo);
    setCouponError('');
    showToast(`Promo applied: ${promo.label}`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponError('');
    showToast('Promotion code removed', 'info');
  };

  /**
   * Calculations
   */
  const itemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.type === 'percentage') {
      return (subtotal * coupon.value) / 100;
    }
    return 0;
  }, [subtotal, coupon]);

  const freeShippingProgress = useMemo(() => {
    return Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  }, [subtotal]);

  const amountToFreeShipping = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  }, [subtotal]);

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (subtotal >= FREE_SHIPPING_THRESHOLD || coupon?.type === 'shipping') return 0;
    return STANDARD_SHIPPING_FEE;
  }, [subtotal, coupon]);

  const taxAmount = useMemo(() => {
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    return taxableAmount * ESTIMATED_TAX_RATE;
  }, [subtotal, discountAmount]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);
  }, [subtotal, discountAmount, shippingFee, taxAmount]);

  return (
    <CartContext.Provider
      value={{
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
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
