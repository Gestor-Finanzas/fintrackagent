import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext(null);

const capitalize = (s) => {
  if (!s || typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Fallback para DBs anteriores a la migración que separa full_name:
// derivamos nombre/apellidos partiendo `full_name` por el primer espacio.
function deriveNombreApellidos(raw) {
  if (!raw) return { nombre: "", apellidos: "" };
  const nombre = raw.nombre || "";
  const apellidos = raw.apellidos || "";
  if (nombre || apellidos) return { nombre, apellidos };
  const full = (raw.full_name || "").trim();
  if (!full) return { nombre: "", apellidos: "" };
  const parts = full.split(/\s+/);
  return {
    nombre: parts[0] || "",
    apellidos: parts.slice(1).join(" "),
  };
}

export function ProfileProvider({ children }) {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!authUser) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    // select("*") tolera que la DB aún no tenga las columnas nuevas
    // (nombre, apellidos, direccion, sexo, fecha_nacimiento).
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();
    if (error) {
      if (import.meta.env.DEV) {
        console.error("[ProfileContext] fetch failed:", error);
      }
      setProfile(null);
    } else {
      const { nombre, apellidos } = deriveNombreApellidos(data);
      setProfile({ ...data, nombre, apellidos });
    }
    setLoading(false);
  }, [authUser]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const updateProfile = useCallback(async (patch) => {
    if (!authUser) return { data: null, error: new Error("not authenticated") };
    const payload = { ...patch };
    // Mantener full_name sincronizado con nombre+apellidos para no romper
    // consumidores que aún leen el campo legacy.
    if ("nombre" in patch || "apellidos" in patch) {
      const nombre = patch.nombre ?? profile?.nombre ?? "";
      const apellidos = patch.apellidos ?? profile?.apellidos ?? "";
      payload.full_name = `${nombre} ${apellidos}`.trim();
    }
    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", authUser.id)
      .select("*")
      .single();
    if (!error && data) {
      const { nombre, apellidos } = deriveNombreApellidos(data);
      setProfile({ ...data, nombre, apellidos });
    }
    return { data, error };
  }, [authUser, profile]);

  const displayName = useMemo(() => {
    if (profile) {
      const nombre = profile.nombre || profile.full_name?.split(" ")?.[0] || "";
      const apellidos = profile.apellidos
        || (profile.full_name?.includes(" ") ? profile.full_name.split(" ").slice(1).join(" ") : "");
      const full = `${capitalize(nombre)} ${capitalize(apellidos)}`.trim();
      if (full) return full;
    }
    return capitalize(authUser?.email?.split("@")[0] || "");
  }, [profile, authUser]);

  const firstName = useMemo(() => {
    if (profile) {
      const nombre = profile.nombre || profile.full_name?.split(" ")?.[0] || "";
      if (nombre) return capitalize(nombre);
    }
    return capitalize(authUser?.email?.split("@")[0] || "");
  }, [profile, authUser]);

  const initials = useMemo(() => {
    const source = displayName || authUser?.email || "U";
    return source
      .split(/[\s@]+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [displayName, authUser]);

  const value = useMemo(() => ({
    profile,
    loading,
    displayName,
    firstName,
    initials,
    email: authUser?.email || "",
    updateProfile,
    refresh: fetchProfile,
  }), [profile, loading, displayName, firstName, initials, authUser, updateProfile, fetchProfile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile debe usarse dentro de <ProfileProvider>");
  }
  return ctx;
}
