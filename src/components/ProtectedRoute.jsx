import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user } = useSelector((state) => state.auth)

  // Si pas d'utilisateur connecté, rediriger vers login sans afficher de message
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Si admin est requis et l'utilisateur n'est pas admin, rediriger vers home
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  // Si l'utilisateur est connecté (et admin si requis), afficher le contenu
  return children
}
