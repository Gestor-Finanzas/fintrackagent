import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Inverso a ProtectedRoute: si ya hay sesión, redirige al dashboard en
// lugar de mostrar el login de nuevo.
export default function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="min-h-screen flex items-center justify-center bg-white"
      >
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="sr-only">Cargando...</span>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
