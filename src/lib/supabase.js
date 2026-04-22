import { createClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase para toda la app.
 *
 * Requiere dos variables de entorno (ver `.env.example`):
 *   VITE_SUPABASE_URL        — URL del proyecto (Settings → API → Project URL)
 *   VITE_SUPABASE_ANON_KEY   — clave pública anon (Settings → API → anon public)
 *
 * La clave anon es segura de exponer en frontend: las políticas RLS
 * del backend controlan qué datos puede leer cada usuario.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Aviso en desarrollo; en producción estas variables son obligatorias.
  if (import.meta.env.DEV) {
    console.warn(
      "[supabase] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en .env",
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
