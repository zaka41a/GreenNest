import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectTotalQty } from '../features/cart/cartSlice'
import { logout } from '../features/auth/authSlice'
import '../header.css'

export default function Header() {
  const totalQty = useSelector(selectTotalQty)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Main leaf shape with gradient */}
              <defs>
                <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
                  <stop offset="50%" style={{stopColor: '#059669', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#047857', stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#059669', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#047857', stopOpacity: 1}} />
                </linearGradient>
              </defs>

              {/* Nest/Circle base */}
              <circle cx="24" cy="24" r="22" fill="url(#leafGradient)" opacity="0.1"/>

              {/* Main leaf */}
              <path
                d="M24 8 C24 8, 16 12, 14 20 C12 28, 16 36, 24 40 C32 36, 36 28, 34 20 C32 12, 24 8, 24 8 Z"
                fill="url(#leafGradient)"
                stroke="#047857"
                strokeWidth="1"
              />

              {/* Leaf vein/stem */}
              <path
                d="M24 10 L24 38"
                stroke="url(#stemGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Secondary veins */}
              <path
                d="M24 16 Q20 18, 16 22"
                stroke="#047857"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M24 16 Q28 18, 32 22"
                stroke="#047857"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M24 24 Q20 26, 17 30"
                stroke="#047857"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M24 24 Q28 26, 31 30"
                stroke="#047857"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Highlight for glossy effect */}
              <ellipse
                cx="20"
                cy="18"
                rx="6"
                ry="8"
                fill="white"
                opacity="0.2"
              />
            </svg>
          </div>
          <span className="brand-name">
            Green<span className="brand-highlight">Nest</span>
          </span>
        </Link>

        <nav className="navbar-nav">
          <NavLink
            to="/products"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
            <span>Products</span>
          </NavLink>

          {user?.role === 'admin' ? (
            <>
              <NavLink
                to="/admin"
                className={({ isActive }) => isActive ? 'nav-link active admin-link' : 'nav-link admin-link'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                <span>Plants</span>
              </NavLink>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) => isActive ? 'nav-link active admin-link' : 'nav-link admin-link'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
                <span>Orders</span>
              </NavLink>
            </>
          ) : user && (
            <NavLink
              to="/my-orders"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              <span>My Orders</span>
            </NavLink>
          )}

          {user?.role !== 'admin' && (
            <NavLink
              to="/cart"
              className={({ isActive }) => isActive ? 'nav-link active cart-link' : 'nav-link cart-link'}
            >
              <div className="cart-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
              </div>
              <span>Cart</span>
            </NavLink>
          )}
        </nav>

        <div className="navbar-actions">
          {user ? (
            <>
              <div className="user-info">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
                {user.role === 'admin' && (
                  <span className="user-badge">Admin</span>
                )}
              </div>
              <button onClick={handleLogout} className="btn-logout">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn-auth login">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                <span>Login</span>
              </NavLink>
              <NavLink to="/register" className="btn-auth register">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
                <span>Register</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
