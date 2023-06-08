import { createSlice } from '@reduxjs/toolkit';

const initialCartState = { 
    items:[], 
    totalAmount: 0 
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItem(state, action) {
            const existingCartItemIndex = state.items.findIndex(
              (item) => item.id === action.payload.id
            );
            const existingCartItem = state.items[existingCartItemIndex];
        
            if (existingCartItem) {
                existingCartItem.amount++;
                state.totalAmount += action.payload.price;
            } else {
                state.totalAmount += action.payload.price * action.payload.amount;
                state.items.push(action.payload);
            }
        },
        removeItem(state, action) {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload
              );
              const existingItem = state.items[existingCartItemIndex];
              state.totalAmount -= existingItem.price;
              if (existingItem.amount === 1) {
                state.items.splice(existingCartItemIndex, 1);
              } else {
                existingItem.amount--;
              }
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;