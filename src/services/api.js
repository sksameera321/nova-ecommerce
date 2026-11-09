/**
 * NOVA Atelier — API Service
 * Curated product catalogue integration using DummyJSON REST API
 * Developer: Sameera Bhanu
 */

const BASE_URL = 'https://dummyjson.com/products';

// Curated luxury & lifestyle categories
export const CURATED_CATEGORIES = [
  { slug: 'all', name: 'All Atelier Pieces', count: 0 },
  { slug: 'womens-dresses', name: 'Ready-to-Wear', count: 5 },
  { slug: 'mens-watches', name: 'Swiss Horology (Men)', count: 6 },
  { slug: 'womens-watches', name: 'Haute Horology (Women)', count: 5 },
  { slug: 'womens-bags', name: 'Artisanal Leather', count: 5 },
  { slug: 'fragrances', name: 'Haute Parfumerie', count: 5 },
  { slug: 'womens-jewellery', name: 'Fine Jewelry', count: 3 },
  { slug: 'sunglasses', name: 'Luxury Eyewear', count: 5 },
  { slug: 'mens-shirts', name: 'Tailored Shirts', count: 5 },
  { slug: 'beauty', name: 'Beauty & Elixirs', count: 5 },
  { slug: 'skin-care', name: 'Botanical Skincare', count: 3 },
  { slug: 'womens-shoes', name: 'Women\'s Footwear', count: 5 },
  { slug: 'mens-shoes', name: 'Men\'s Footwear', count: 5 }
];

export const FASHION_CATEGORY_SLUGS = CURATED_CATEGORIES
  .filter(c => c.slug !== 'all')
  .map(c => c.slug);

// In-memory cache
let cachedProducts = null;

/**
 * Normalizes raw API product into standard NOVA Atelier product object
 */
export const normalizeProduct = (item) => {
  if (!item) return null;

  // Calculate discount price
  const discount = Number(item.discountPercentage) || 0;
  const originalPrice = discount > 0 
    ? Number((item.price / (1 - discount / 100)).toFixed(2))
    : item.price;

  // Curate sizes/variants based on category
  let variants = ['Default'];
  if (item.category.includes('dress') || item.category.includes('shirt') || item.category.includes('top')) {
    variants = ['XS', 'S', 'M', 'L', 'XL'];
  } else if (item.category.includes('shoe')) {
    variants = ['EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43'];
  } else if (item.category.includes('watch') || item.category.includes('jewellery')) {
    variants = ['Yellow Gold', 'Rose Gold', 'Brushed Titanium', 'Platinum'];
  } else if (item.category.includes('fragrance') || item.category.includes('beauty')) {
    variants = ['50ml Extrait', '100ml Eau de Parfum'];
  }

  // Curate colorways
  const colors = [
    { name: 'Obsidian Black', hex: '#161616' },
    { name: 'Warm Champagne', hex: '#D4AF37' },
    { name: 'Alabaster Ivory', hex: '#F3EFE9' }
  ];

  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    price: Number(item.price) || 0,
    originalPrice,
    discountPercentage: discount,
    rating: Number(item.rating) || 4.5,
    reviewCount: Array.isArray(item.reviews) ? item.reviews.length : 12,
    stock: Number(item.stock) || 15,
    brand: item.brand || 'NOVA Atelier',
    sku: item.sku || `NOV-${item.id}`,
    warranty: item.warrantyInformation || '2-Year Atelier Guarantee',
    shipping: item.shippingInformation || 'Complimentary Express Delivery',
    returnPolicy: item.returnPolicy || '30-Day Bespoke Returns',
    images: Array.isArray(item.images) && item.images.length > 0 
      ? item.images 
      : [item.thumbnail || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'],
    thumbnail: item.thumbnail || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    tags: Array.isArray(item.tags) ? item.tags : ['Curated', 'Luxury'],
    reviews: Array.isArray(item.reviews) ? item.reviews : [],
    variants,
    colors,
    isNew: item.id % 3 === 0,
    isBestSeller: Number(item.rating) >= 4.0
  };
};

/**
 * Fetch all curated products
 */
export const getAllProducts = async () => {
  if (cachedProducts && cachedProducts.length > 0) {
    return cachedProducts;
  }

  try {
    const res = await fetch(`${BASE_URL}?limit=0`);
    if (!res.ok) {
      throw new Error(`DummyJSON HTTP Error: ${res.status}`);
    }
    const data = await res.json();
    const all = (data.products || []).map(normalizeProduct);
    
    // Prioritize our curated luxury fashion, horology, accessories
    const curated = all.filter(p => FASHION_CATEGORY_SLUGS.includes(p.category));
    cachedProducts = curated.length >= 20 ? curated : all;
    return cachedProducts;
  } catch (error) {
    console.error('API Error, falling back to local cached dataset:', error);
    if (cachedProducts && cachedProducts.length > 0) return cachedProducts;
    throw error;
  }
};

/**
 * Filter & sort products
 */
export const getFilteredProducts = async ({
  category = 'all',
  search = '',
  minPrice = 0,
  maxPrice = 2000,
  sortBy = 'featured',
  inStockOnly = false
} = {}) => {
  const products = await getAllProducts();

  let filtered = products.filter(p => {
    // Category match
    if (category && category !== 'all' && p.category !== category) {
      return false;
    }

    // Search query match
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const inTitle = p.title.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      const inBrand = p.brand.toLowerCase().includes(q);
      const inCategory = p.category.toLowerCase().includes(q);
      if (!inTitle && !inDesc && !inBrand && !inCategory) return false;
    }

    // Price range
    if (p.price < minPrice || p.price > maxPrice) {
      return false;
    }

    // In stock
    if (inStockOnly && p.stock <= 0) {
      return false;
    }

    return true;
  });

  // Sorting
  switch (sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'discount-desc':
      filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => b.rating - a.rating);
      break;
  }

  return filtered;
};

/**
 * Get product by ID
 */
export const getProductById = async (id) => {
  const products = await getAllProducts();
  const found = products.find(p => String(p.id) === String(id));
  if (found) return found;

  // If not found in cache, fetch directly
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Product not found');
    const data = await res.json();
    return normalizeProduct(data);
  } catch (err) {
    console.error('Error fetching single product:', err);
    return null;
  }
};

/**
 * Get related products (same category, excluding current product)
 */
export const getRelatedProducts = async (currentId, category, limit = 4) => {
  const products = await getAllProducts();
  return products
    .filter(p => p.category === category && String(p.id) !== String(currentId))
    .slice(0, limit);
};

/**
 * Get trending arrivals (featured on homepage)
 */
export const getTrendingProducts = async (limit = 8) => {
  const products = await getAllProducts();
  return products
    .filter(p => p.rating >= 3.8 || p.isNew)
    .slice(0, limit);
};
