import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.warn(
      "[supabase] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en .env",
    );
  }
}

// Placeholders si faltan las env vars: así la app no peta al cargar en
// entornos mal configurados; las llamadas simplemente fallarán con 401.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "fintrack_auth",
    },
  },
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
