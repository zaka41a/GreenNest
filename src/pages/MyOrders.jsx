import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getMyOrders } from '../features/orders/ordersSlice'
import '../myorders.css'

const statusColors = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444'
}

const statusIcons = {
  pending: '⏳',
  processing: '🔄',
  shipped: '🚚',
  delivered: '✅',
  cancelled: '❌'
}

export default function MyOrders() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { myOrders, isLoading } = useSelector((state) => state.orders)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      dispatch(getMyOrders())
    }
  }, [dispatch, user])

  if (isLoading) {
    return (
      <div className="myorders-page">
        <div className="myorders-loading">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="myorders-page">
      <div className="myorders-container">
        <div className="myorders-header">
          <h1 className="myorders-title">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
            My Orders
          </h1>
          <p className="myorders-subtitle">Track and manage your plant orders</p>
        </div>

        {myOrders.length === 0 ? (
          <div className="myorders-empty">
            <div className="empty-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <h2>No orders yet</h2>
            <p>Start shopping and your orders will appear here</p>
            <Link to="/products" className="btn-shop-now">
              Browse Plants
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {myOrders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-header-left">
                    <h3 className="order-id">Order #{order._id.slice(-8).toUpperCase()}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="order-status" style={{ backgroundColor: statusColors[order.status] }}>
                    <span>{statusIcons[order.status]}</span>
                    <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="order-item-info">
                        <p className="order-item-name">{item.name}</p>
                        <p className="order-item-qty">Quantity: {item.quantity}</p>
                      </div>
                      <p className="order-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Total Amount:</span>
                    <span className="total-amount">${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="order-payment">
                    <span className={`payment-status ${order.isPaid ? 'paid' : 'unpaid'}`}>
                      {order.isPaid ? '✓ Paid' : '⏳ Payment Pending'}
                    </span>
                  </div>
                  <button
                    className="btn-view-details"
                    onClick={() => navigate(`/orders/${order._id}`)}
                  >
                    View Details
                  </button>
                </div>

                {order.shippingAddress && (
                  <div className="order-shipping">
                    <h4>Shipping Address</h4>
                    <p>
                      {order.shippingAddress.street}, {order.shippingAddress.city},<br />
                      {order.shippingAddress.state} {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
