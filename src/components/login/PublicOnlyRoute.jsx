import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Guard inverso al ProtectedRoute: rutas solo accesibles SIN sesión.
 * Si el usuario ya está autenticado y visita /login, lo redirigimos
 * directamente al dashboard en vez de mostrarle otra vez el formulario.
 *
 * Mientras cargamos la sesión inicial no renderizamos nada para evitar
 * flash del login antes del redirect.
 */
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
