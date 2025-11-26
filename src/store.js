import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import authReducer from './features/auth/authSlice'
import plantsReducer from './features/plants/plantsSlice'
import ordersReducer from './features/orders/ordersSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    plants: plantsReducer,
    orders: ordersReducer,
  },
})