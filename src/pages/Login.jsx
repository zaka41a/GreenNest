import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import '../auth.css'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess && user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isSuccess, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData))
  }

  return (
    <div className="auth-page">
      {/* Left Side - Visual Panel */}
      <div className="auth-visual">
        <div className="auth-visual-overlay"></div>
        <div className="auth-visual-pattern"></div>

        <div className="auth-visual-content">
          <div className="visual-logo">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>

          <h1 className="visual-title">GreenNest</h1>
          <p className="visual-subtitle">
            Welcome back to your plant paradise. Sign in to continue your green journey.
          </p>

          <div className="visual-features">
            <div className="visual-feature">
              <div className="visual-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className="visual-feature-content">
                <h3>100% Healthy Plants</h3>
                <p>Every plant is hand-selected and health-checked before shipping</p>
              </div>
            </div>

            <div className="visual-feature">
              <div className="visual-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="visual-feature-content">
                <h3>Secure Shopping</h3>
                <p>Your data is protected with enterprise-grade security</p>
              </div>
            </div>

            <div className="visual-feature">
              <div className="visual-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="visual-feature-content">
                <h3>Fast Delivery</h3>
                <p>Free shipping on orders over $50 with tracking</p>
              </div>
            </div>
          </div>
        </div>

        <div className="visual-decoration">
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
        </div>
      </div>

      {/* Right Side - Form Panel */}
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your GreenNest account</p>
          </div>

          {isError && (
            <div className="alert alert-error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="you@example.com"
                className="form-input"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  placeholder="••••••••"
                  className="form-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-footer">
            <p>Don't have an account?</p>
            <Link to="/register" className="link-secondary">
              Create an account
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>

          <div className="demo-credentials">
            <div className="demo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <p className="demo-title">Demo Account</p>
              <p className="demo-info">
                <strong>Admin:</strong> admin@greennest.com / admin123
              </p>
            </div>
          </div>

          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <span className="trust-badge-text">Secure Login</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span className="trust-badge-text">Protected Data</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span className="trust-badge-text">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
