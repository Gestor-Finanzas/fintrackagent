import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Guard de rutas basado en la sesión real de Supabase.
 *
 * - Si aún estamos cargando la sesión inicial, mostramos un loader
 *   (evita parpadeos de redirección mientras `getSession()` resuelve).
 * - Si no hay sesión → redirect a /login, guardando la ruta de origen
 *   en `state.from` para poder volver tras el login.
 * - Si hay sesión → renderiza children normalmente.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

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

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
