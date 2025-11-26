import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/orders'

// Create order
export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(API_URL, orderData, config)
      return response.data.data
    } catch (error) {
      const message = error.response?.data?.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get my orders
export const getMyOrders = createAsyncThunk(
  'orders/getMyOrders',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(`${API_URL}/my-orders`, config)
      return response.data.data
    } catch (error) {
      const message = error.response?.data?.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all orders (admin)
export const getAllOrders = createAsyncThunk(
  'orders/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(API_URL, config)
      return response.data.data
    } catch (error) {
      const message = error.response?.data?.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update order status (admin)
export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.put(`${API_URL}/${id}/status`, { status }, config)
      return response.data.data
    } catch (error) {
      const message = error.response?.data?.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const initialState = {
  orders: [],
  myOrders: [],
  currentOrder: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentOrder = action.payload
        state.myOrders.unshift(action.payload)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get my orders
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.myOrders = action.payload
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get all orders (admin)
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order._id === action.payload._id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
      })
  }
})

export const { reset } = ordersSlice.actions
export default ordersSlice.reducer
