import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

import { Announcement } from './components/common/Announcement';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { CartDrawer } from './components/cart/CartDrawer';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { WishlistPage } from './pages/WishlistPage';
import { LookbookPage } from './pages/LookbookPage';
import { NotFoundPage } from './pages/NotFoundPage';

import './styles/variables.css';
import './styles/animations.css';
import './styles/main.css';

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <HashRouter>
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Announcement />
                <Navbar />
                <CartDrawer />
                <ToastContainer />

                <div style={{ flex: 1 }}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                    <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/lookbook" element={<LookbookPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </div>

                <Footer />
              </div>
            </HashRouter>
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
