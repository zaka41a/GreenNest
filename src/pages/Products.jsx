import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectCartItems } from '../features/cart/cartSlice'
import { getPlants } from '../features/plants/plantsSlice'
import '../products.css'

export default function Products() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const { plants, isLoading, isError, message } = useSelector((state) => state.plants)
  const { user } = useSelector((state) => state.auth)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    dispatch(getPlants())
  }, [dispatch])

  const filteredPlants = filter
    ? plants.filter((p) => p.category === filter)
    : plants

  // Get unique categories with counts
  const categories = useMemo(() => {
    const categoryMap = {}
    plants.forEach(plant => {
      categoryMap[plant.category] = (categoryMap[plant.category] || 0) + 1
    })
    return categoryMap
  }, [plants])

  if (isLoading) {
    return (
      <div className="products-page">
        <div className="products-loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading our beautiful plants...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="products-page">
        <div className="products-error">
          <div className="error-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 className="error-title">Oops! Something went wrong</h2>
          <p className="error-message">{message}</p>
          <button onClick={() => dispatch(getPlants())} className="retry-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="products-page">
      <div className="products-container">
        {/* Hero Header */}
        <div className="products-hero">
          <div className="products-hero-content">
            <h1 className="products-title">Our Plant Collection</h1>
            <p className="products-subtitle">
              Discover our carefully curated selection of healthy, beautiful plants to transform your space
            </p>
            <div className="products-stats">
              <div className="products-stat">
                <p className="products-stat-value">{plants.length}</p>
                <p className="products-stat-label">Total Plants</p>
              </div>
              <div className="products-stat">
                <p className="products-stat-value">{Object.keys(categories).length}</p>
                <p className="products-stat-label">Categories</p>
              </div>
              <div className="products-stat">
                <p className="products-stat-value">{filteredPlants.length}</p>
                <p className="products-stat-label">{filter ? 'Filtered' : 'Available'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="products-filters">
          <div className="filters-header">
            <div className="filters-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
            </div>
            <h2 className="filters-title">Filter by Category</h2>
          </div>
          <div className="filters-buttons">
            <button
              className={!filter ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              All Plants
              <span className="filter-count">{plants.length}</span>
            </button>
            {Object.entries(categories).map(([category, count]) => (
              <button
                key={category}
                className={filter === category ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setFilter(category)}
              >
                {category}
                <span className="filter-count">{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredPlants.length === 0 ? (
          <div className="products-empty">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h2 className="empty-title">No plants found</h2>
            <p className="empty-description">
              We couldn't find any plants matching your current filter. Try selecting a different category.
            </p>
            <button onClick={() => setFilter('')} className="clear-filter-btn">
              Show All Plants
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredPlants.map((plant) => {
              const inCart = cartItems.find((item) => item.id === plant.id)
              return (
                <div key={plant.id} className="product-card">
                  <div className="product-image-wrapper">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <div className="product-badges">
                      <span className="category-badge">{plant.category}</span>
                      {plant.stock < 5 && plant.stock > 0 && (
                        <span className="stock-badge">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                          </svg>
                          Only {plant.stock} left
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="product-content">
                    <h3 className="product-name">{plant.name}</h3>
                    <p className="product-description">
                      {plant.description}
                    </p>

                    <div className="product-features">
                      <div className="feature-tag">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="5"/>
                          <line x1="12" y1="1" x2="12" y2="3"/>
                          <line x1="12" y1="21" x2="12" y2="23"/>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                          <line x1="1" y1="12" x2="3" y2="12"/>
                          <line x1="21" y1="12" x2="23" y2="12"/>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                        {plant.lightRequirement}
                      </div>
                      <div className="feature-tag">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                        </svg>
                        {plant.wateringFrequency}
                      </div>
                      <div className="feature-tag">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        {plant.careLevel}
                      </div>
                    </div>

                    <div className="product-footer">
                      <p className="product-price">${plant.price.toFixed(2)}</p>
                      {user?.role !== 'admin' && (
                        <button
                          className="add-to-cart-btn"
                          disabled={!!inCart}
                          onClick={() => dispatch(addItem(plant))}
                        >
                          {inCart ? (
                            <>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                              Added to Cart
                            </>
                          ) : (
                            <>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1"/>
                                <circle cx="20" cy="21" r="1"/>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                              </svg>
                              Add to Cart
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
