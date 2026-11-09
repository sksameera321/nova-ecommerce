import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';
import { formatINR } from '../utils/currency';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  ChevronRight,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // User selections
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState('description');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getProductById(id)
      .then((data) => {
        if (!data) {
          navigate('/shop');
          return;
        }
        setProduct(data);
        setSelectedVariant(data.variants ? data.variants[0] : 'Standard');
        setSelectedColor(data.colors ? data.colors[0].name : 'Obsidian Black');
        setActiveImageIndex(0);
        setQuantity(1);

        // Fetch related pieces
        getRelatedProducts(data.id, data.category, 4).then(setRelated);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product details:', err);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', minHeight: '80vh' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          <div className="skeleton" style={{ paddingTop: '100%', borderRadius: 'var(--radius-sm)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="skeleton" style={{ height: '24px', width: '30%' }} />
            <div className="skeleton" style={{ height: '40px', width: '80%' }} />
            <div className="skeleton" style={{ height: '30px', width: '40%' }} />
            <div className="skeleton" style={{ height: '120px', width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant, selectedColor);
  };

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <main style={{ padding: '2.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}
        >
          <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" style={{ color: 'var(--text-secondary)' }}>Atelier Collection</Link>
          <ChevronRight size={14} />
          <Link to={`/shop?category=${product.category}`} style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{product.title}</span>
        </nav>

        {/* 2-Column Product Detail Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3.5rem',
            marginBottom: '6rem'
          }}
        >
          {/* Left Column: Image Gallery */}
          <div>
            {/* Main Stage Image */}
            <div
              style={{
                position: 'relative',
                paddingTop: '115%',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                marginBottom: '1rem'
              }}
            >
              <img
                src={images[activeImageIndex] || product.thumbnail}
                alt={product.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {product.discountPercentage > 10 && (
                <span
                  className="badge badge-terracotta"
                  style={{ position: 'absolute', top: '16px', left: '16px' }}
                >
                  -{Math.round(product.discountPercentage)}% Off
                </span>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '72px',
                      height: '84px',
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      border: idx === activeImageIndex ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                      backgroundColor: 'var(--bg-secondary)',
                      flexShrink: 0,
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.title} view ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Pricing, Variants, Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div>
              <span
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  fontWeight: 700
                }}
              >
                {product.brand}
              </span>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  marginTop: '6px',
                  marginBottom: '12px'
                }}
              >
                {product.title}
              </h1>

              {/* Reviews & Stock Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                        color="currentColor"
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {product.rating.toFixed(1)} ({product.reviewCount} Client Reviews)
                  </span>
                </div>

                <span style={{ color: 'var(--border-medium)' }}>&bull;</span>

                <span
                  style={{
                    fontSize: '0.8rem',
                    color: product.stock < 5 ? 'var(--accent-terracotta)' : 'var(--accent-emerald)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: product.stock < 5 ? 'var(--accent-terracotta)' : 'var(--accent-emerald)',
                      display: 'inline-block'
                    }}
                  />
                  {product.stock < 5
                    ? `Only ${product.stock} pieces remaining in atelier`
                    : 'In Stock & Ready for Courier Dispatch'}
                </span>
              </div>
            </div>

            {/* Price Tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                padding: '1.25rem 0',
                borderTop: '1px solid var(--border-light)',
                borderBottom: '1px solid var(--border-light)'
              }}
            >
              <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {formatINR(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span style={{ fontSize: '1.15rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    {formatINR(product.originalPrice)}
                  </span>
                  <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                    Save {formatINR(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Variant / Size Selector */}
            {product.variants && product.variants.length > 1 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="form-label">Select Size / Specification</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', cursor: 'pointer' }}>
                    Size Guide
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant === v;
                    return (
                      <button
                        key={v}
                        onClick={() => setSelectedVariant(v)}
                        style={{
                          padding: '10px 18px',
                          borderRadius: 'var(--radius-xs)',
                          border: isSelected ? '1px solid #141312' : '1px solid var(--border-medium)',
                          background: isSelected
                            ? 'linear-gradient(180deg, #2B2927 0%, #151413 100%)'
                            : 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
                          color: isSelected ? '#FAF8F5' : 'var(--text-primary)',
                          boxShadow: isSelected
                            ? 'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.85)'
                            : '0 2px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 120ms ease'
                        }}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Colorway Swatches */}
            {product.colors && (
              <div>
                <span className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
                  Atelier Finish: <strong>{selectedColor}</strong>
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: c.hex,
                          border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-medium)',
                          boxShadow: isSelected
                            ? '0 0 0 3px var(--accent-gold-bg), 0 3px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)'
                            : '0 2px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 120ms ease'
                        }}
                        title={c.name}
                      >
                        {isSelected && <Check size={14} color={c.hex === '#F3EFE9' ? '#000' : '#FFF'} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Bag Actions */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {/* Stepper */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  height: '52px',
                  backgroundColor: 'var(--bg-secondary)',
                  boxShadow: 'var(--skeuo-debossed)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    padding: '0 16px',
                    height: '100%',
                    color: 'var(--text-primary)',
                    background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-tertiary) 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.85)'
                  }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span
                  style={{
                    padding: '0 14px',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    minWidth: '38px',
                    textAlign: 'center',
                    background: 'var(--bg-card)',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{
                    padding: '0 16px',
                    height: '100%',
                    color: 'var(--text-primary)',
                    background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-tertiary) 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.85)'
                  }}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="btn btn-gold"
                style={{ flex: 1, minWidth: '220px', height: '52px', fontSize: '0.9rem' }}
              >
                <ShoppingBag size={18} /> Add to Shopping Bag
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className="btn-icon"
                style={{
                  width: '52px',
                  height: '52px',
                  color: inWishlist ? 'var(--accent-terracotta)' : 'var(--text-primary)',
                  borderColor: inWishlist ? 'var(--accent-terracotta)' : 'var(--border-medium)'
                }}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                title={inWishlist ? 'In your wishlist' : 'Add to wishlist'}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Value Highlights Under Button */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                padding: '1.25rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={16} color="var(--accent-gold)" />
                <span>Complimentary Delivery &gt;₹5,000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--accent-gold)" />
                <span>Verified Provenance</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RotateCcw size={16} color="var(--accent-gold)" />
                <span>30-Day Bespoke Returns</span>
              </div>
            </div>

            {/* Accordion Group */}
            <div style={{ borderTop: '1px solid var(--border-light)', marginTop: '1rem' }}>
              {/* Accordion 1: Description */}
              <div style={{ borderBottom: '1px solid var(--border-light)' }}>
                <button
                  onClick={() => setOpenAccordion((cur) => (cur === 'description' ? '' : 'description'))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '1.2rem 0',
                    textAlign: 'left',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  Description &amp; Provenance
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openAccordion === 'description' ? 'rotate(180deg)' : 'none',
                      transition: 'transform var(--transition-fast)'
                    }}
                  />
                </button>
                {openAccordion === 'description' && (
                  <div style={{ paddingBottom: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.925rem' }}>
                    <p>{product.description}</p>
                    <p style={{ marginTop: '0.75rem' }}>
                      Assembled under the supervision of master artisans adhering to the European Luxury Standard. Each unit is stamped with a unique Atelier registry number for lifelong provenance tracking.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Specs */}
              <div style={{ borderBottom: '1px solid var(--border-light)' }}>
                <button
                  onClick={() => setOpenAccordion((cur) => (cur === 'specs' ? '' : 'specs'))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '1.2rem 0',
                    textAlign: 'left',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  Specifications &amp; Dimensions
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openAccordion === 'specs' ? 'rotate(180deg)' : 'none',
                      transition: 'transform var(--transition-fast)'
                    }}
                  />
                </button>
                {openAccordion === 'specs' && (
                  <div style={{ paddingBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '8px 0', fontWeight: 600 }}>SKU</td>
                          <td style={{ padding: '8px 0', textAlign: 'right' }}>{product.sku}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '8px 0', fontWeight: 600 }}>Atelier Category</td>
                          <td style={{ padding: '8px 0', textAlign: 'right', textTransform: 'capitalize' }}>
                            {product.category.replace('-', ' ')}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '8px 0', fontWeight: 600 }}>Warranty</td>
                          <td style={{ padding: '8px 0', textAlign: 'right' }}>{product.warranty}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 0', fontWeight: 600 }}>Shipping Method</td>
                          <td style={{ padding: '8px 0', textAlign: 'right' }}>{product.shipping}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div style={{ borderBottom: '1px solid var(--border-light)' }}>
                <button
                  onClick={() => setOpenAccordion((cur) => (cur === 'shipping' ? '' : 'shipping'))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '1.2rem 0',
                    textAlign: 'left',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  Courier &amp; Bespoke Returns
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openAccordion === 'shipping' ? 'rotate(180deg)' : 'none',
                      transition: 'transform var(--transition-fast)'
                    }}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div style={{ paddingBottom: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    {product.returnPolicy}. All shipments are insured and require a direct signature upon receipt. For return collection, simply contact our client concierge for complimentary courier retrieval.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Real Customer Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <section style={{ marginBottom: '6rem' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <span className="section-tag">Client Impressions</span>
              <h2 className="section-title">Verified Patron Acclaim</h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {product.reviews.map((rev, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.75rem',
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          fill={i < rev.rating ? 'currentColor' : 'none'}
                          color="currentColor"
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(rev.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    "{rev.comment}"
                  </p>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-gold-dark)', marginTop: 'auto' }}>
                    &mdash; {rev.reviewerName}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Frequently Styled With (Related Products) */}
        {related.length > 0 && (
          <section>
            <div style={{ marginBottom: '2.5rem' }}>
              <span className="section-tag">Curated Pairings</span>
              <h2 className="section-title">Frequently Styled With</h2>
            </div>
            <div className="grid-products">
              {related.map((relItem) => (
                <ProductCard key={relItem.id} product={relItem} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};
