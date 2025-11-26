import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import '../orderdetails.css'

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

export default function OrderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
        const response = await axios.get(`http://localhost:5000/api/orders/${id}`, config)
        setOrder(response.data.data)
        setIsLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order')
        setIsLoading(false)
      }
    }

    if (user) {
      fetchOrder()
    }
  }, [id, user])

  if (isLoading) {
    return (
      <div className="order-details-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="order-details-page">
        <div className="error-state">
          <div className="error-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2>Order Not Found</h2>
          <p>{error || 'Unable to load order details'}</p>
          <button onClick={() => navigate(-1)} className="btn-back">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="order-details-page">
      <div className="order-details-container">
        {/* Header */}
        <div className="order-details-header">
          <button onClick={() => navigate(-1)} className="btn-back-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <div className="header-content">
            <h1 className="order-details-title">
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>
            <div className="order-status-badge" style={{ backgroundColor: statusColors[order.status] }}>
              <span>{statusIcons[order.status]}</span>
              <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            </div>
          </div>
          <p className="order-date">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        <div className="order-details-grid">
          {/* Customer Information */}
          <div className="details-section">
            <h2 className="section-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Customer Information
            </h2>
            <div className="info-content">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{order.user?.name || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{order.user?.email || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="details-section">
            <h2 className="section-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Shipping Address
            </h2>
            <div className="info-content">
              {order.shippingAddress ? (
                <>
                  <p className="address-line">{order.shippingAddress.street}</p>
                  <p className="address-line">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p className="address-line">{order.shippingAddress.country}</p>
                </>
              ) : (
                <p>No shipping address provided</p>
              )}
            </div>
          </div>

          {/* Payment & Delivery Info */}
          <div className="details-section">
            <h2 className="section-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              Payment & Delivery
            </h2>
            <div className="info-content">
              <div className="info-row">
                <span className="info-label">Payment Method:</span>
                <span className="info-value">{order.paymentMethod || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Payment Status:</span>
                <span className={`payment-badge ${order.isPaid ? 'paid' : 'unpaid'}`}>
                  {order.isPaid ? '✓ Paid' : '⏳ Pending'}
                </span>
              </div>
              {order.isPaid && order.paidAt && (
                <div className="info-row">
                  <span className="info-label">Paid At:</span>
                  <span className="info-value">
                    {new Date(order.paidAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="info-row">
                <span className="info-label">Delivery Status:</span>
                <span className={`delivery-badge ${order.isDelivered ? 'delivered' : 'pending'}`}>
                  {order.isDelivered ? '✓ Delivered' : '📦 In Transit'}
                </span>
              </div>
              {order.isDelivered && order.deliveredAt && (
                <div className="info-row">
                  <span className="info-label">Delivered At:</span>
                  <span className="info-value">
                    {new Date(order.deliveredAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="details-section items-section">
          <h2 className="section-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
            Order Items ({order.items.length})
          </h2>
          <div className="items-list">
            {order.items.map((item, index) => (
              <div key={index} className="item-card">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary-box">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
