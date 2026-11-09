# NOVA Atelier — Modern E-Commerce Experience
### PROJECT ASSIGNMENT 04 | B.Tech Computer Science & Engineering
**Developer:** Sameera Bhanu  
**Institution:** Shri Vishnu Engineering College for Women (SVECW), Bhimavaram  
**Duration:** 14 Days (Weeks 4–5) | **Level:** Intermediate  
**Live Application:** [https://sksameera321.github.io/nova-ecommerce/](https://sksameera321.github.io/nova-ecommerce/)  
**GitHub Repository:** [https://github.com/sksameera321/nova-ecommerce](https://github.com/sksameera321/nova-ecommerce)  
**Technology Stack:** React 19, Vite, React Router, Context API, Vanilla CSS3, DummyJSON REST API, LocalStorage  

---

## 1. Project Overview & Objective

**NOVA Atelier** is a modern, responsive luxury e-commerce web application engineered with **React 19**, **Vite**, and **React Router**. It delivers a high-fashion digital salon experience where discerning patrons can discover curated runway ready-to-wear, precision Swiss horological complications, and artisanal Tuscan leather accessories.

The primary objective of this project is to demonstrate deep frontend engineering fundamentals in scalable, component-based architectures:
- Multi-context global state management (`CartContext`, `WishlistContext`, `ToastContext`, `ThemeContext`).
- Client-side routing with `react-router-dom` and URL synchronization (`?category=...&search=...&sort=...`).
- Real REST API data ingestion, sanitization, and in-memory caching via DummyJSON Products API.
- End-to-end shopping experience: Live instant search, multi-faceted filtering, dynamic variant and color selection, slide-over cart drawer with real-time free shipping meter, promotional coupon validation, multi-step simulated checkout, and printable order confirmation.

---

## 2. Creative Direction & Brand Identity

### Brand Concept: Haute Horology & Architectural Ready-to-Wear
NOVA Atelier is modeled as an independent Milanese and Genevan luxury house. In direct contrast to generic, overcrowded marketplace templates, NOVA embraces spacious editorial typography, tactile material finishes, and high-altitude St. Moritz editorial photography.

- **Brand Wordmark:** `N O V A` set in high-contrast `Cinzel` serif with a `A T E L I E R` brushed gold subscript.
- **Color Palette:**
  - **Canvas Base:** Warm Alabaster Ivory (`#FAF8F5`) in light mode; Charcoal Obsidian (`#0F0E0D`) in dark mode.
  - **Cards & Surfaces:** Crisp Chalk White (`#FFFFFF`) with subtle 1px border drops (`var(--border-light)`).
  - **Primary Accent:** Brushed Champagne Gold (`#C5A265`) and Gold Glow (`rgba(197, 162, 101, 0.15)`).
  - **Semantic Accents:** Terracotta Coral (`#C25E47`) for discount badges and wishlist hearts; Emerald Pine (`#2E6F52`) for stock availability.
- **Typography:**
  - **Display Titles:** `Playfair Display` (High-contrast editorial serif with italic emphasis).
  - **Brand Emblems:** `Cinzel` (Classical Roman proportions).
  - **Body & Controls:** `Plus Jakarta Sans` (Clean geometric sans-serif for high legibility).
- **Photography Direction:** Authentic high-fashion editorial imagery (St. Moritz alpine winter, titanium mechanical complications, tanned leather hides).

---

## 3. Component Architecture & State Management

The application is architected around modular, reusable components and decoupled services:

```
nova-ecommerce/
├── public/
│   └── favicon.svg              # Custom gold monogram emblem
├── src/
│   ├── services/
│   │   └── api.js               # DummyJSON REST API client, normalizer, and cache
│   ├── context/
│   │   ├── CartContext.jsx      # Shopping cart, calculations, promo engine & LocalStorage
│   │   ├── WishlistContext.jsx  # Saved pieces collection & LocalStorage
│   │   ├── ToastContext.jsx     # Floating notification alert queue
│   │   └── ThemeContext.jsx     # Editorial Light / Charcoal Dark mode toggle
│   ├── components/
│   │   ├── common/
│   │   │   ├── Announcement.jsx # Global promotional ticker banner
│   │   │   ├── Navbar.jsx       # Frosted glass header, search & bag badges, mobile drawer
│   │   │   ├── SearchModal.jsx  # Instant keyboard-driven live search (Cmd/Ctrl + K)
│   │   │   ├── ToastContainer.jsx # Smooth spring toast notifications
│   │   │   └── Footer.jsx       # Brand manifesto, client relations, newsletter
│   │   ├── cart/
│   │   │   └── CartDrawer.jsx   # Slide-over cart with free shipping meter & promo codes
│   │   ├── product/
│   │   │   ├── ProductCard.jsx  # Hover zoom, discount pills, quick add to bag
│   │   │   ├── ProductGrid.jsx  # Responsive grid with shimmer skeleton loaders
│   │   │   └── FilterSidebar.jsx # Category pills, price ceiling slider, stock toggle
│   │   └── home/
│   │       ├── HeroSection.jsx  # Cinematic full-width editorial hero
│   │       ├── ValueProps.jsx   # 4 luxury pillars (Provenance, Courier, Returns, Concierge)
│   │       ├── CategoryBento.jsx # 4-pillar magazine bento grid
│   │       └── LookbookBanner.jsx # St. Moritz editorial split-screen feature
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing salon with trending pieces & press acclaim
│   │   ├── ShopPage.jsx         # Full catalog with multi-filters, URL search params & sort
│   │   ├── ProductDetailPage.jsx# Multi-image gallery, sizes, colorways, reviews, accordions
│   │   ├── CartPage.jsx         # Full shopping bag page with itemized breakdown
│   │   ├── CheckoutPage.jsx     # 3-step simulated checkout with address validation
│   │   ├── OrderConfirmationPage.jsx # Order celebration, unique Order ID & print receipt
│   │   ├── WishlistPage.jsx     # Saved pieces registry with move-to-bag actions
│   │   ├── LookbookPage.jsx     # Three-act editorial photography spread
│   │   └── NotFoundPage.jsx     # Curated 404 archive error page
│   ├── styles/
│   │   ├── variables.css        # Design tokens, color system, and layout variables
│   │   ├── animations.css       # Keyframes, shimmer loaders, and drawer transitions
│   │   └── main.css             # Base reset, typography, buttons, and responsive grid
│   ├── App.jsx                  # Route definitions, context providers, layout wrapper
│   └── main.jsx                 # React root DOM mount
├── server.js                    # Zero-dependency local Node.js static preview server
├── vite.config.js               # Vite configuration with relative asset bases
└── package.json                 # Project dependencies (React 19, Lucide, Router)
```

---

## 4. Key Functional Features

### A. Dynamic Product Discovery & Catalog
- **REST API Integration:** Fetches verified product data from the live DummyJSON Products API.
- **Instant Search Modal:** Triggered via header icon or global keyboard shortcut (`Cmd/Ctrl + K`), featuring debounced queries and instant thumbnail suggestions.
- **Multi-Faceted Filtering:** Real-time combination of category filters, price range slider (₹500 to ₹1,25,000), in-stock only toggle, and sorting algorithms (Price Low/High, Rating, Greatest Discount, Alphabetical).
- **URL Synchronization:** Category and search queries persist into browser history and shareable URL query parameters (`/#/shop?category=mens-watches`).

### B. Interactive Product Details Page
- **Multi-Image Stage:** Primary image stage with interactive thumbnail gallery switcher.
- **Variant & Color Selection:** Dynamic sizing pills (XS–XL or Titanium/Gold) and active visual color swatches.
- **Stock Urgency:** Real-time inventory tracking ("Only 3 pieces remaining in atelier").
- **Accordion Specifications:** Collapsible panels for Description & Provenance, Technical Dimensions, and Courier Policies.
- **Verified Client Reviews:** Dynamic customer review cards populated directly from API responses.
- **Frequently Styled With:** Automatically queries related pieces in the same category.

### C. Shopping Bag & Promotional Engine
- **Slide-Over Bag Drawer & Dedicated Page:** Patrons can manage their cart from anywhere in the application.
- **Free Shipping Meter:** Dynamic progress bar calculating remaining amount needed to reach complimentary express shipping (₹5,000 threshold).
- **Promo Code Engine:** Real-time validation supporting:
  - `NOVA10`: 10% off entire order
  - `VIP20`: 20% off orders over ₹15,000
  - `FREESHIP`: 100% off standard shipping
- **Financial Calculations:** Deterministic calculation of subtotal, discounts, shipping fees, estimated luxury tax (18% GST), and grand total.
- **LocalStorage Persistence:** Bag contents survive page refreshes and browser restarts.

### D. 3-Step Simulated Checkout
- **Step 1 – Consignment Address:** Full customer address form with real-time field validation.
- **Step 2 – Delivery Method:** Choice of Standard Climate-Controlled Courier, Priority Air Courier, or White-Glove Hand Courier.
- **Step 3 – Simulated Payment:** Simulated credit card entry with test card hints, Apple Pay simulation, and cash on delivery.
- **Order Generation:** Creates an authentic Order ID (`#NOV-XXXXX`), records order details in `localStorage`, clears the bag, and routes to the confirmation screen.

### E. Order Confirmation & Print Receipt
- Animated celebration checkmark with champagne gold radial glow.
- Itemized consignment manifest with thumbnail images, chosen sizes, and unit prices.
- Recipient address details and estimated delivery countdown.
- Integrated `window.print()` button formatted specifically for paper receipts.

---

## 5. Technical Challenges & Solutions

| Challenge | Problem | Engineering Solution |
|:---|:---|:---|
| **1. Complex Variant Normalization** | Raw API products from DummyJSON have varying categories without standardized sizes or colorways. | Engineered an API normalization pipeline (`src/services/api.js`) that dynamically attaches curated apparel sizes (XS–XL), shoe European sizes (EU 38–43), horological metals (Titanium, Rose Gold), and color swatches based on category. |
| **2. Multi-Faceted Filter State** | Applying category pills, price range, stock status, text search, and sort order concurrently without redundant API calls. | Cached full API responses in-memory and applied a unified, single-pass filtering predicate in `getFilteredProducts()`, ensuring instantaneous sub-16ms UI updates without layout jank. |
| **3. GitHub Pages SPA Routing** | Static hosting on GitHub Pages typically returns 404 when navigating directly to deep client-side routes like `/shop` or `/product/1`. | Implemented `HashRouter` from `react-router-dom` combined with `base: './'` in `vite.config.js`. Deep links (`/#/product/93`, `/#/shop?category=mens-watches`) resolve cleanly on both local servers and GitHub Pages. |
| **4. Free Delivery Meter Precision** | Calculating progress percentage and remaining amounts dynamically while factoring in percentage-based coupons. | Leveraged React's `useMemo` hooks within `CartContext` to establish a reactive calculation pipeline (`subtotal` &rarr; `discount` &rarr; `freeShippingProgress` &rarr; `tax` &rarr; `total`), guaranteeing zero state desynchronization between drawer and full cart page. |
| **5. Dual Visual Themes Without Flashing** | Switching between Editorial Alabaster Light and Charcoal Obsidian Dark mode across components. | Utilized CSS custom property variables scoped to `[data-theme="dark"]` controlled by `ThemeContext`. The active theme is synchronized immediately to `document.documentElement` and persisted in `localStorage`. |

---

## 6. How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Launch
1. Clone the repository:
   ```bash
   git clone https://github.com/sksameera321/nova-ecommerce.git
   cd nova-ecommerce
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Or build and serve the production preview with the zero-dependency local server:
   ```bash
   npm run build
   node server.js
   ```
5. Open your browser at `http://localhost:3001` or the port displayed in your terminal.

---

**Developer:** Sameera Bhanu  
**Institution:** Shri Vishnu Engineering College for Women (SVECW), Bhimavaram  
**Portfolio:** [https://sksameera321.github.io/interactive-resume-portfolio/](https://sksameera321.github.io/interactive-resume-portfolio/)
