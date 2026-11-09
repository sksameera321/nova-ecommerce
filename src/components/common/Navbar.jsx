import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Sun, Moon, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { SearchModal } from './SearchModal';

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Collection', path: '/shop' },
    { label: 'Ready-to-Wear', path: '/shop?category=womens-dresses' },
    { label: 'Swiss Horology', path: '/shop?category=mens-watches' },
    { label: 'Artisanal Leather', path: '/shop?category=womens-bags' },
    { label: 'Parfumerie', path: '/shop?category=fragrances' },
    { label: 'Lookbook', path: '/lookbook' }
  ];

  const handleMobileNav = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-header)',
          backgroundColor: 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-light)',
          transition: 'all var(--transition-normal)'
        }}
      >
        <div
          className="container"
          style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Left: Mobile Menu Toggle & Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Toggle navigation menu"
              className="btn-icon"
              style={{ display: 'inline-flex' }}
            >
              <Menu size={20} />
            </button>

            <nav
              style={{
                display: 'none',
                gap: '1.5rem',
                alignItems: 'center'
              }}
              className="desktop-nav"
            >
              {navLinks.slice(0, 4).map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  style={({ isActive }) => ({
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    transition: 'color var(--transition-fast)'
                  })}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Center: Brand Wordmark */}
          <Link
            to="/"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            <span
              className="font-display"
              style={{
                fontSize: '1.65rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: 'var(--text-primary)',
                lineHeight: 1
              }}
            >
              NOVA
            </span>
            <span
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                fontWeight: 600,
                marginTop: '4px'
              }}
            >
              ATELIER
            </span>
          </Link>

          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search dialog"
              className="btn-icon"
              title="Search (Ctrl + K)"
            >
              <Search size={18} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="btn-icon"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun size={18} color="var(--accent-gold)" /> : <Moon size={18} />}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="btn-icon"
              style={{ position: 'relative' }}
              title="Saved Pieces"
              aria-label={`View Wishlist (${wishlistCount} items)`}
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '18px',
                    height: '18px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--accent-terracotta)',
                    color: '#FFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--bg-card)'
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-icon"
              style={{ position: 'relative' }}
              aria-label={`Shopping Bag (${itemCount} items)`}
              title="Shopping Bag"
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '18px',
                    height: '18px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--accent-gold)',
                    color: '#121110',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--bg-card)'
                  }}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Desktop media query style helper */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ justifyContent: 'flex-start', padding: 0 }}
        >
          <div
            className="animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '85%',
              maxWidth: '360px',
              height: '100%',
              background: 'var(--bg-card)',
              boxShadow: 'var(--shadow-drawer)',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '2rem',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '1rem'
                }}
              >
                <div>
                  <div className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                    NOVA
                  </div>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      color: 'var(--accent-gold)'
                    }}
                  >
                    ATELIER NAVIGATION
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-icon"
                  aria-label="Close mobile navigation"
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleMobileNav(link.path)}
                    style={{
                      textAlign: 'left',
                      fontSize: '1.05rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    {link.label}
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>&rarr;</span>
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                borderTop: '1px solid var(--border-light)',
                paddingTop: '1.5rem'
              }}
            >
              <div><strong>NOVA Atelier</strong> &bull; Curated Luxury</div>
              <div>Designed by Sameera Bhanu (SVECW)</div>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
