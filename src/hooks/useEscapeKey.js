import { useEffect } from "react";

/**
 * Ejecuta `onEscape` cuando el usuario pulsa la tecla Escape.
 *
 * @param {() => void} onEscape - Callback a ejecutar al pulsar ESC.
 * @param {boolean} enabled - Si es false, no se registra el listener.
 *   Útil para evitar listeners activos en modales cerrados.
 */
export default function useEscapeKey(onEscape, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;
    const handler = (e) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onEscape, enabled]);
}
