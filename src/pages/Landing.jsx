import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlants } from '../features/plants/plantsSlice'
import { addItem, selectCartItems } from '../features/cart/cartSlice'
import '../landing.css'

export default function Landing() {
  const [scrollY, setScrollY] = useState(0)
  const dispatch = useDispatch()
  const { plants } = useSelector((state) => state.plants)
  const cartItems = useSelector(selectCartItems)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    dispatch(getPlants())
  }, [dispatch])

  // Get featured plants (first 3 plants)
  const featuredPlants = plants.slice(0, 3)

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-particles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <div className="hero-badge">🌱 Premium Plant Shop</div>
          <h1 className="hero-title">
            Bring Nature <span className="gradient-text">Home</span>
          </h1>
          <p className="hero-subtitle">
            Discover our curated collection of air-purifying, low-light, and pet-friendly plants.
            Transform your space into a green sanctuary.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-hero primary">
              <span>Explore Plants</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            {!user && (
              <Link to="/register" className="btn-hero secondary">
                <span>Join Community</span>
              </Link>
            )}
            {user && (
              <Link to="/cart" className="btn-hero secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span>View Cart</span>
              </Link>
            )}
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container-landing">
          <div className="section-header">
            <span className="section-badge">Our Collections</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find the perfect plant for your lifestyle and space</p>
          </div>

          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image">
                <img src="/images/snake-plant.jpg" alt="Air Purifying" />
                <div className="category-overlay">
                  <Link to="/products" className="category-link">View Collection →</Link>
                </div>
              </div>
              <div className="category-info">
                <h3>🌿 Air-Purifying</h3>
                <p>Breathe easier with plants that naturally clean your air</p>
              </div>
            </div>

            <div className="category-card">
              <div className="category-image">
                <img src="/images/zz-plant.jpg" alt="Low Light" />
                <div className="category-overlay">
                  <Link to="/products" className="category-link">View Collection →</Link>
                </div>
              </div>
              <div className="category-info">
                <h3>🌙 Low-Light</h3>
                <p>Perfect for dimly lit spaces and shaded corners</p>
              </div>
            </div>

            <div className="category-card">
              <div className="category-image">
                <img src="/images/calathea.jpg" alt="Pet Friendly" />
                <div className="category-overlay">
                  <Link to="/products" className="category-link">View Collection →</Link>
                </div>
              </div>
              <div className="category-info">
                <h3>🐾 Pet-Friendly</h3>
                <p>Safe and non-toxic for your furry companions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container-landing">
          <div className="section-header">
            <span className="section-badge">Best Sellers</span>
            <h2 className="section-title">Featured Plants</h2>
            <p className="section-subtitle">Hand-picked favorites from our collection</p>
          </div>

          <div className="featured-grid">
            {featuredPlants.map((plant, index) => {
              const inCart = cartItems.find((item) => item.id === plant.id)
              const badges = ['Popular', 'New', 'Sale']
              const badgeClasses = ['', 'new', 'sale']

              return (
                <div key={plant.id} className="featured-card">
                  <div className={`featured-badge ${badgeClasses[index]}`}>
                    {badges[index]}
                  </div>
                  <img src={plant.image} alt={plant.name} />
                  <div className="featured-content">
                    <h3>{plant.name}</h3>
                    <p className="featured-category">{plant.category}</p>
                    <p className="featured-description">{plant.description?.substring(0, 60)}...</p>
                    <div className="featured-features">
                      <span className="feature-pill">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="5"/>
                          <line x1="12" y1="1" x2="12" y2="3"/>
                        </svg>
                        {plant.lightRequirement}
                      </span>
                      <span className="feature-pill">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                        </svg>
                        {plant.wateringFrequency}
                      </span>
                    </div>
                    <div className="featured-footer">
                      <span className="featured-price">${plant.price.toFixed(2)}</span>
                      <button
                        className="featured-btn"
                        disabled={!!inCart}
                        onClick={() => dispatch(addItem(plant))}
                      >
                        {inCart ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            Added
                          </>
                        ) : (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="9" cy="21" r="1"/>
                              <circle cx="20" cy="21" r="1"/>
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                            </svg>
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="featured-cta">
            <Link to="/products" className="btn-view-all">
              <span>View All Plants</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container-landing">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3>Free Shipping</h3>
              <p>On orders over $50. Fast and reliable delivery to your door.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Quality Guaranteed</h3>
              <p>100% healthy plants or your money back. We care about quality.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Expert Care Tips</h3>
              <p>Detailed care guides with every plant to help them thrive.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3>24/7 Support</h3>
              <p>Our plant experts are always here to help you grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container-landing">
          <div className="section-header">
            <span className="section-badge">Testimonials</span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Join thousands of happy plant parents</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "GreenNest transformed my apartment into a green oasis! The quality of the plants is exceptional and the care guides are so helpful."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SH</div>
                <div>
                  <div className="author-name">Sarah Henderson</div>
                  <div className="author-title">Plant Enthusiast</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "As a beginner, I was worried about keeping plants alive. GreenNest made it easy with their low-maintenance options and amazing support!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MC</div>
                <div>
                  <div className="author-name">Michael Chen</div>
                  <div className="author-title">First-time Plant Owner</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "I love that they offer pet-friendly plants! Now my cat and I can both enjoy a beautiful green home safely."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">EJ</div>
                <div>
                  <div className="author-name">Emma Johnson</div>
                  <div className="author-title">Cat Mom & Plant Lover</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Seulement pour les visiteurs non connectés */}
      {!user && (
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Start Your Plant Journey?</h2>
            <p>Join our community and get 15% off your first order!</p>
            <div className="cta-buttons">
              <Link to="/products" className="btn-cta primary">Shop Now</Link>
              <Link to="/register" className="btn-cta secondary">Sign Up Free</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}