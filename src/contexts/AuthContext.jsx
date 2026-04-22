import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Try-catch defensivo: si Supabase está caído o las env vars son
    // inválidas, cerramos `loading` en lugar de dejar la app colgada.
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setLoading(false);
      })
      .catch((err) => {
        if (import.meta.env.DEV) {
          console.error("[AuthContext] getSession falló:", err);
        }
        if (mounted) setLoading(false);
      });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!mounted) return;
        setSession(newSession);
        setUser(newSession?.user ?? null);
      },
    );

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  // useCallback mantiene referencias estables; sin él, cualquier useEffect
  // con `signOut` en sus deps se dispararía en cada render.
  const signUp = useCallback(
    async ({ email, password, fullName, whatsapp }) => {
      // `data` va a auth.users.raw_user_meta_data y el trigger SQL
      // handle_new_user() lo copia al profile al insertar.
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            whatsapp,
          },
        },
      });
      return { data, error };
    },
    [],
  );

  const signIn = useCallback(async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  }, []);

  const value = useMemo(
    () => ({ user, session, loading, signUp, signIn, signOut }),
    [user, session, loading, signUp, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return ctx;
}
