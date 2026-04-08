import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import './App.css';

function App() {
  // 'landing' | 'products' | 'cart'
  const [currentPage, setCurrentPage] = useState('landing');

  const navigateTo = (page) => setCurrentPage(page);

  if (currentPage === 'products') {
    return <ProductList onNavigate={navigateTo} />;
  }

  if (currentPage === 'cart') {
    return <CartItem onNavigate={navigateTo} />;
  }

  // Landing Page
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="company-name">🌿 Paradise Nursery</h1>
        <p className="company-tagline">Where Every Leaf Tells a Story</p>
        <p className="company-description">
          Discover our hand-curated collection of aromatic, medicinal, and air-purifying
          houseplants. Bring nature's beauty and wellness into your home with plants lovingly
          grown and delivered to your door.
        </p>
        <button
          className="get-started-btn"
          onClick={() => navigateTo('products')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
