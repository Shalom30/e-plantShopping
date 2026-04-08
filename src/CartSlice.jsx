import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],          // Array of cart items
  totalQuantity: 0,   // Total number of items in cart
  totalCost: 0,       // Total cost of all items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add an item to the cart (or increment if already exists)
    addItem: (state, action) => {
      const incomingItem = action.payload;
      const existingItem = state.items.find((item) => item.id === incomingItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalCost = parseFloat((existingItem.quantity * existingItem.cost).toFixed(2));
      } else {
        state.items.push({
          ...incomingItem,
          quantity: 1,
          totalCost: incomingItem.cost,
        });
      }

      state.totalQuantity += 1;
      state.totalCost = parseFloat(
        state.items.reduce((sum, item) => sum + item.totalCost, 0).toFixed(2)
      );
    },

    // Remove one unit of an item from the cart
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalCost = parseFloat((existingItem.quantity * existingItem.cost).toFixed(2));
      }

      state.totalQuantity = Math.max(0, state.totalQuantity - 1);
      state.totalCost = parseFloat(
        state.items.reduce((sum, item) => sum + item.totalCost, 0).toFixed(2)
      );
    },

    // Delete all units of an item from the cart
    deleteItem: (state, action) => {
      const id = action.payload;
      const itemToDelete = state.items.find((item) => item.id === id);

      if (!itemToDelete) return;

      state.totalQuantity = Math.max(0, state.totalQuantity - itemToDelete.quantity);
      state.items = state.items.filter((item) => item.id !== id);
      state.totalCost = parseFloat(
        state.items.reduce((sum, item) => sum + item.totalCost, 0).toFixed(2)
      );
    },

    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalCost = 0;
    },
  },
});

export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalCost = (state) => state.cart.totalCost;
export const selectIsItemInCart = (id) => (state) =>
  state.cart.items.some((item) => item.id === id);

export default cartSlice.reducer;
