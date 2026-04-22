import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Mostrar un loader mientras `loading=true` evita el parpadeo de
// redirección cuando `getSession()` aún no ha resuelto al montar.
// `state.from` preserva la URL original para volver tras el login.
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
