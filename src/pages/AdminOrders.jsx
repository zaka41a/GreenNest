import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllOrders, updateOrderStatus } from '../features/orders/ordersSlice'
import '../adminorders.css'

const statusColors = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444'
}

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

export default function AdminOrders() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orders, isLoading } = useSelector((state) => state.orders)
  const [filterStatus, setFilterStatus] = useState('all')
  const [editingOrder, setEditingOrder] = useState(null)

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  const handleStatusUpdate = async (orderId, newStatus) => {
    await dispatch(updateOrderStatus({ id: orderId, status: newStatus }))
    setEditingOrder(null)
    dispatch(getAllOrders())
  }

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus)

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + o.totalAmount, 0)
  }

  if (isLoading) {
    return (
      <div className="admin-orders-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-container">
        {/* Header */}
        <div className="admin-orders-header">
          <h1 className="admin-orders-title">
            <div className="admin-title-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
            </div>
            Orders Management
          </h1>
          <p className="admin-orders-subtitle">Monitor and manage customer orders</p>
        </div>

        {/* Statistics */}
        <div className="orders-stats">
          <div className="stat-card">
            <div className="stat-icon primary">📦</div>
            <div>
              <p className="stat-value">{stats.total}</p>
              <p className="stat-label">Total Orders</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon warning">⏳</div>
            <div>
              <p className="stat-value">{stats.pending}</p>
              <p className="stat-label">Pending</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon info">🔄</div>
            <div>
              <p className="stat-value">{stats.processing}</p>
              <p className="stat-label">Processing</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon success">✅</div>
            <div>
              <p className="stat-value">{stats.delivered}</p>
              <p className="stat-label">Delivered</p>
            </div>
          </div>

          <div className="stat-card revenue">
            <div className="stat-icon success">💰</div>
            <div>
              <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
              <p className="stat-label">Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="orders-filters">
          <button
            className={filterStatus === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilterStatus('all')}
          >
            All Orders ({orders.length})
          </button>
          {statusOptions.map(status => (
            <button
              key={status}
              className={filterStatus === status ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilterStatus(status)}
              style={{ borderColor: filterStatus === status ? statusColors[status] : undefined }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({orders.filter(o => o.status === status).length})
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="orders-table-container">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <h3 className="empty-title">No orders found</h3>
              <p className="empty-description">
                {filterStatus === 'all'
                  ? 'No orders have been placed yet'
                  : `No ${filterStatus} orders at the moment`}
              </p>
            </div>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-id-cell">
                      <span className="order-id-badge">#{order._id.slice(-8).toUpperCase()}</span>
                    </td>
                    <td>
                      <div className="customer-info">
                        <p className="customer-name">{order.user?.name || 'N/A'}</p>
                        <p className="customer-email">{order.user?.email || 'N/A'}</p>
                      </div>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.items.length} item(s)</td>
                    <td className="amount-cell">${order.totalAmount.toFixed(2)}</td>
                    <td>
                      {editingOrder === order._id ? (
                        <select
                          className="status-select"
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          onBlur={() => setEditingOrder(null)}
                          autoFocus
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className="status-badge"
                          style={{ backgroundColor: statusColors[order.status] }}
                          onClick={() => setEditingOrder(order._id)}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn-action view"
                          title="View Details"
                          onClick={() => navigate(`/orders/${order._id}`)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button
                          className="btn-action edit"
                          title="Update Status"
                          onClick={() => setEditingOrder(order._id)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
