import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

/**
 * Provider global de autenticación.
 * Envolver <App /> con <AuthProvider> para exponer:
 *   - user        → objeto del usuario autenticado (o null)
 *   - session     → sesión activa (o null)
 *   - loading     → true mientras carga la sesión inicial
 *   - signUp({ email, password, fullName, whatsapp })
 *   - signIn({ email, password })
 *   - signOut()
 *
 * La sesión se mantiene automáticamente en localStorage por el SDK de
 * Supabase. Este provider solo se suscribe a los cambios y expone el
 * estado a la app.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // 1. Obtener la sesión actual al montar (puede estar en localStorage).
    //    Con try-catch defensivo: si Supabase está caído o las env vars
    //    son inválidas, cerramos el loading y dejamos user=null en lugar
    //    de dejar la app colgada indefinidamente.
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

    // 2. Suscribirse a cambios (login, logout, token refresh...).
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

  // Las funciones se memoizan con useCallback para que useAuth devuelva
  // referencias estables. Esto evita re-renders en cascada en cualquier
  // componente que haga `useEffect(() => {...}, [signOut])` o similar.
  const signUp = useCallback(
    async ({ email, password, fullName, whatsapp }) => {
      // `data` se guarda en auth.users.raw_user_meta_data y se copia al profile
      // vía el trigger definido en el schema SQL.
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
