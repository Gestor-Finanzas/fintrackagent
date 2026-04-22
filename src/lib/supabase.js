import { createClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase para toda la app.
 *
 * Requiere dos variables de entorno (ver `.env.example`):
 *   REACT_APP_SUPABASE_URL        — URL del proyecto (Settings → API → Project URL)
 *   REACT_APP_SUPABASE_ANON_KEY   — clave pública anon (Settings → API → anon public)
 *
 * La clave anon es segura de exponer en frontend: las políticas RLS
 * del backend controlan qué datos puede leer cada usuario.
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Aviso en desarrollo; en producción estas variables son obligatorias.
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(
      "[supabase] Faltan REACT_APP_SUPABASE_URL o REACT_APP_SUPABASE_ANON_KEY en .env",
    );
  }
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      // Persistir sesión en localStorage (por defecto, pero lo hacemos explícito)
      persistSession: true,
      // Refrescar el token automáticamente antes de caducar
      autoRefreshToken: true,
      // Detectar la sesión tras el callback OAuth/magic link
      detectSessionInUrl: true,
      // Clave personalizada en localStorage
      storageKey: "fintrack_auth",
    },
  },
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
