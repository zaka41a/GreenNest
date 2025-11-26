import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder, reset } from '../features/orders/ordersSlice'
import { clearCart, selectCartItems, selectTotalPrice } from '../features/cart/cartSlice'
import '../checkout.css'

export default function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)
  const totalPrice = useSelector(selectTotalPrice)
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message, currentOrder } = useSelector((state) => state.orders)

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'cash'
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (cartItems.length === 0 && !isSuccess) {
      navigate('/cart')
    }

    if (isSuccess && currentOrder) {
      dispatch(clearCart())
      dispatch(reset())
      navigate(`/orders/${currentOrder._id}`)
    }
  }, [user, cartItems, isSuccess, currentOrder, navigate, dispatch])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const orderData = {
      items: cartItems.map(item => ({
        plant: item.id,
        quantity: item.qty
      })),
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      paymentMethod: formData.paymentMethod
    }

    dispatch(createOrder(orderData))
  }

  if (isLoading) {
    return (
      <div className="checkout-page">
        <div className="checkout-loading">
          <div className="loading-spinner"></div>
          <p>Processing your order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">Complete your order</p>
        </div>

        {isError && (
          <div className="checkout-error">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {message}
          </div>
        )}

        <div className="checkout-grid">
          {/* Shipping Form */}
          <div className="checkout-form-section">
            <h2 className="section-title">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  placeholder="123 Main St"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="New York"
                  />
                </div>

                <div className="form-group">
                  <label>State/Province *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="NY"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>ZIP/Postal Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    placeholder="10001"
                  />
                </div>

                <div className="form-group">
                  <label>Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    placeholder="United States"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="cash">Cash on Delivery</option>
                </select>
              </div>

              <button type="submit" className="btn-checkout" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2 className="section-title">Order Summary</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="summary-item-info">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-qty">Qty: {item.qty}</p>
                  </div>
                  <p className="summary-item-price">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${(totalPrice + 5).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
