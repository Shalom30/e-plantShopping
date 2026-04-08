import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, selectTotalQuantity, selectIsItemInCart } from './CartSlice';
import './App.css';

// ─────────────────────────────────────────────
// Plant data — 3 categories × 6 plants = 18 plants
// Images from Unsplash (free, no auth needed)
// ─────────────────────────────────────────────
const plantCategories = [
  {
    id: 'aromatic',
    name: 'Aromatic Plants',
    description:
      'Fill your home with natural fragrance. These plants release calming scents that reduce stress and improve sleep.',
    plants: [
      {
        id: 'lavender',
        name: 'Lavender',
        cost: 12.99,
        description: 'Known for its calming scent. Ideal for bedrooms and relaxation spaces.',
        image: 'https://images.unsplash.com/photo-1499744937866-d7e566a20a61?w=400&q=80',
      },
      {
        id: 'jasmine',
        name: 'Jasmine',
        cost: 14.99,
        description: 'Sweet, exotic fragrance. Blooms beautifully in indirect sunlight.',
        image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400&q=80',
      },
      {
        id: 'rosemary',
        name: 'Rosemary',
        cost: 9.99,
        description: 'Aromatic herb with needle-like leaves. Great for cooking and aromatherapy.',
        image: 'https://images.unsplash.com/photo-1515586838455-8b8d08d57ead?w=400&q=80',
      },
      {
        id: 'mint',
        name: 'Peppermint',
        cost: 7.99,
        description: 'Refreshing cool scent. Grows vigorously and deters pests naturally.',
        image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&q=80',
      },
      {
        id: 'lemon-balm',
        name: 'Lemon Balm',
        cost: 8.99,
        description: 'Gentle citrus fragrance that lifts mood and reduces anxiety.',
        image: 'https://images.unsplash.com/photo-1601985705806-5b9a291f5f9c?w=400&q=80',
      },
      {
        id: 'eucalyptus',
        name: 'Eucalyptus',
        cost: 16.99,
        description: 'Fresh, minty aroma. Excellent for clearing the air and easing breathing.',
        image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400&q=80',
      },
    ],
  },
  {
    id: 'medicinal',
    name: 'Medicinal Plants',
    description:
      'Nature's pharmacy at your fingertips. These plants have been used for centuries for their healing properties.',
    plants: [
      {
        id: 'aloe-vera',
        name: 'Aloe Vera',
        cost: 10.99,
        description: 'Soothes burns and skin irritation. Nearly indestructible and easy to care for.',
        image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400&q=80',
      },
      {
        id: 'chamomile',
        name: 'Chamomile',
        cost: 9.49,
        description: 'Calming and anti-inflammatory. Harvest blooms to make soothing herbal tea.',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
      },
      {
        id: 'turmeric',
        name: 'Turmeric',
        cost: 13.99,
        description: 'Powerful anti-inflammatory root. Striking tropical foliage indoors.',
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80',
      },
      {
        id: 'ginger',
        name: 'Ginger',
        cost: 11.99,
        description: 'Aids digestion and relieves nausea. Exotic foliage makes a bold statement.',
        image: 'https://images.unsplash.com/photo-1608537523494-76e5f30dd8c6?w=400&q=80',
      },
      {
        id: 'echinacea',
        name: 'Echinacea',
        cost: 12.49,
        description: 'Boosts the immune system. Beautiful purple coneflowers bloom all summer.',
        image: 'https://images.unsplash.com/photo-1591985666643-9970684cf228?w=400&q=80',
      },
      {
        id: 'calendula',
        name: 'Calendula',
        cost: 8.49,
        description: 'Heals skin conditions. Bright orange flowers bloom from spring to fall.',
        image: 'https://images.unsplash.com/photo-1530092376999-2431865aa8df?w=400&q=80',
      },
    ],
  },
  {
    id: 'air-purifying',
    name: 'Air-Purifying Plants',
    description:
      'Let nature clean your air. These NASA-recommended plants filter toxins and increase oxygen levels in your home.',
    plants: [
      {
        id: 'snake-plant',
        name: 'Snake Plant',
        cost: 18.99,
        description: 'Removes toxins even at night. Thrives on neglect — perfect for beginners.',
        image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&q=80',
      },
      {
        id: 'peace-lily',
        name: 'Peace Lily',
        cost: 15.99,
        description: 'Filters benzene and formaldehyde. Elegant white blooms in low light.',
        image: 'https://images.unsplash.com/photo-1616690710400-a16d146927c5?w=400&q=80',
      },
      {
        id: 'spider-plant',
        name: 'Spider Plant',
        cost: 9.99,
        description: 'Removes carbon monoxide and xylene. Fast-growing with cascading babies.',
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&q=80',
      },
      {
        id: 'pothos',
        name: 'Golden Pothos',
        cost: 8.99,
        description: 'Filters multiple VOCs. Nearly indestructible trailing vine for any room.',
        image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=400&q=80',
      },
      {
        id: 'boston-fern',
        name: 'Boston Fern',
        cost: 14.49,
        description: 'Acts as a natural humidifier while removing formaldehyde and xylene.',
        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&q=80',
      },
      {
        id: 'rubber-plant',
        name: 'Rubber Plant',
        cost: 22.99,
        description: 'Absorbs airborne toxins through its large waxy leaves. Dramatic focal point.',
        image: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=400&q=80',
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Individual plant card
// ─────────────────────────────────────────────
function PlantCard({ plant }) {
  const dispatch = useDispatch();
  const isInCart = useSelector(selectIsItemInCart(plant.id));

  const handleAddToCart = () => {
    dispatch(addItem(plant));
  };

  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <div className="plant-card-body">
        <h3 className="plant-name">{plant.name}</h3>
        <p className="plant-description">{plant.description}</p>
        <p className="plant-price">${plant.cost.toFixed(2)}</p>
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
function Navbar({ onNavigate }) {
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <nav className="navbar">
      <span
        className="navbar-brand"
        style={{ cursor: 'pointer' }}
        onClick={() => onNavigate('landing')}
      >
        🌿 Paradise Nursery
      </span>
      <ul className="navbar-links">
        <li>
          <a href="#!" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>
            Home
          </a>
        </li>
        <li>
          <a href="#!" onClick={(e) => { e.preventDefault(); onNavigate('products'); }}>
            Plants
          </a>
        </li>
        <li>
          <div
            className="cart-icon-wrapper"
            onClick={() => onNavigate('cart')}
            title="View Cart"
          >
            <span className="cart-icon">🛒</span>
            {totalQuantity > 0 && (
              <span className="cart-count">{totalQuantity}</span>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}

// ─────────────────────────────────────────────
// Main ProductList page
// ─────────────────────────────────────────────
function ProductList({ onNavigate }) {
  return (
    <div className="product-list-page">
      <Navbar onNavigate={onNavigate} />

      {plantCategories.map((category) => (
        <div key={category.id} className="category-section">
          <h2 className="category-title">{category.name}</h2>
          <p className="category-description">{category.description}</p>
          <div className="plants-grid">
            {category.plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
