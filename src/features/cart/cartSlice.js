import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // tableau d'articles : { id, name, price, image, qty }
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const p = action.payload
      const existing = state.items.find(i => i.id === p.id)
      if (!existing) {
        state.items.push({ ...p, qty: 1 })
      }
    },
    increment: (state, action) => {
      const id = action.payload
      const item = state.items.find(i => i.id === id)
      if (item) item.qty += 1
    },
    decrement: (state, action) => {
      const id = action.payload
      const item = state.items.find(i => i.id === id)
      if (!item) return
      if (item.qty > 1) item.qty -= 1
      else state.items = state.items.filter(i => i.id !== id)
    },
    removeItem: (state, action) => {
      const id = action.payload
      state.items = state.items.filter(i => i.id !== id)
    },
    clear: (state) => {
      state.items = []
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addItem, increment, decrement, removeItem, clear, clearCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectTotalQty = (state) => state.cart.items.reduce((s, i) => s + i.qty, 0)
export const selectTotalPrice = (state) => state.cart.items
  .reduce((s, i) => s + i.qty * i.price, 0)

export default cartSlice.reducer
