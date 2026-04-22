import { useEffect } from "react";

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
