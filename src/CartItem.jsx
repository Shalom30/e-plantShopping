import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  removeItem,
  deleteItem,
  selectCartItems,
  selectTotalQuantity,
  selectTotalCost,
} from './CartSlice';
import './App.css';

// ─────────────────────────────────────────────
// Navbar (same as ProductList)
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
          <div className="cart-icon-wrapper" title="View Cart">
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
// Single cart item card
// ─────────────────────────────────────────────
function CartItemCard({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item-card">
      {/* Thumbnail */}
      <img src={item.image} alt={item.name} />

      {/* Info */}
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p className="cart-item-unit-cost">Unit price: ${item.cost.toFixed(2)}</p>
        <p className="cart-item-total-cost">
          Subtotal: ${item.totalCost.toFixed(2)}
        </p>

        {/* Quantity controls */}
        <div className="quantity-controls">
          <button
            className="qty-btn"
            onClick={() => dispatch(removeItem(item.id))}
            title="Decrease quantity"
          >
            −
          </button>
          <span className="qty-display">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={() => dispatch(addItem(item))}
            title="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Delete */}
      <button
        className="delete-btn"
        onClick={() => dispatch(deleteItem(item.id))}
        title="Remove from cart"
      >
        🗑 Delete
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main CartItem page
// ─────────────────────────────────────────────
function CartItem({ onNavigate }) {
  const cartItems = useSelector(selectCartItems);
  const totalCost = useSelector(selectTotalCost);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const handleCheckout = () => {
    setCheckoutMessage('🎉 Coming Soon! Checkout functionality will be available shortly.');
  };

  return (
    <div style={{ background: '#f0f7f0', minHeight: '100vh' }}>
      <Navbar onNavigate={onNavigate} />

      <div className="cart-page">
        <h1>🛒 Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>🌱 Your cart is empty.</p>
            <p style={{ marginTop: 12, fontSize: '1rem' }}>
              <button
                className="continue-shopping-btn"
                style={{ marginTop: 16 }}
                onClick={() => onNavigate('products')}
              >
                Browse Plants
              </button>
            </p>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}

            {/* Summary */}
            <div className="cart-summary">
              <p className="cart-total-label">Total Amount</p>
              <p className="cart-total-amount">${totalCost.toFixed(2)}</p>

              {checkoutMessage && (
                <div
                  style={{
                    background: '#e8f5e9',
                    border: '1px solid #a5d6a7',
                    color: '#1b5e20',
                    borderRadius: 10,
                    padding: '14px 20px',
                    marginBottom: 20,
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  {checkoutMessage}
                </div>
              )}

              <div className="cart-actions">
                <button
                  className="continue-shopping-btn"
                  onClick={() => onNavigate('products')}
                >
                  ← Continue Shopping
                </button>
                <button
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  Checkout →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
