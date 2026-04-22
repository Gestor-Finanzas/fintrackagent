import { Navigate, useLocation } from "react-router-dom";

/**
 * Guard de rutas.
 *
 * IMPORTANTE: actualmente solo comprueba la presencia de `fintrack_token` en
 * localStorage. Esto es suficiente para el modo demo/mock pero NO para
 * producción.
 *
 * Al conectar el backend real, este componente debe:
 *   1. Validar el token contra el backend (o decodificar JWT y comprobar `exp`)
 *   2. Hacer refresh del token si está próximo a caducar
 *   3. Redirigir a `/login` y limpiar localStorage si la validación falla
 *   4. Mostrar un estado de carga mientras valida
 *
 * Ejemplo futuro con JWT:
 *   const payload = decodeJWT(token);
 *   if (!payload || payload.exp * 1000 < Date.now()) {
 *     localStorage.removeItem("fintrack_token");
 *     return <Navigate to="/login" replace />;
 *   }
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("fintrack_token");
  if (!token) {
    // Guardamos la ruta de origen para poder volver tras login (feature futura)
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
