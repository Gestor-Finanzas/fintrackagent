import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { parseMonto } from "../../../utils/globalUtils";
import { useAuth } from "../../../contexts/AuthContext";
import { supabase } from "../../../lib/supabase";

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

// ==================================================================
// Helpers de fechas
// ==================================================================

/**
 * Parsea una fecha en formato "dd-mm-yyyy" o ISO ("yyyy-mm-dd") a un Date local
 * (sin desfase de zona horaria). Todas las fechas en UI usan dd-mm-yyyy.
 */
export function parseFechaMock(fechaStr) {
  if (!fechaStr) return new Date();
  const parts = fechaStr.split("-");
  if (parts.length === 3) {
    // dd-mm-yyyy: primer bloque de 1-2 dígitos
    if (parts[0].length <= 2) {
      const d = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      if (!isNaN(d.getTime())) return d;
    }
    // yyyy-mm-dd (ISO date sin hora) → crear como local, no UTC, para evitar
    // que "2026-04-22" se interprete como UTC midnight y baje un día al render.
    if (parts[0].length === 4) {
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      if (!isNaN(d.getTime())) return d;
    }
  }
  const fallback = new Date(fechaStr);
  return isNaN(fallback.getTime()) ? new Date() : fallback;
}

/** Formatea un Date a "dd-mm-yyyy" para la UI y el almacenamiento interno. */
export function formatFechaMock(date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

/** Formatea un Date a "2 de marzo de 2026" (para el label de rangos custom). */
export function formatFechaLarga(date) {
  const d = date.getDate();
  const m = MESES_ES[date.getMonth()];
  const y = date.getFullYear();
  return `${d} de ${m} de ${y}`;
}

/** Formato corto tipo "2 feb — 8 feb 2026". */
function formatFechaCorta(date) {
  return `${date.getDate()} ${MESES_ES[date.getMonth()].slice(0, 3)}`;
}

/**
 * Calcula el rango real (start, end) del periodo seleccionado basado en la fecha
 * actual del usuario. La semana empieza en lunes (ISO), no en domingo.
 */
function getPeriodRange(periodo, today = new Date()) {
  const base = new Date(today);
  base.setHours(0, 0, 0, 0);

  if (periodo === "semana") {
    const day = base.getDay(); // 0=dom, 1=lun, ..., 6=sáb
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const start = new Date(base);
    start.setDate(base.getDate() + diffToMonday);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  if (periodo === "mes") {
    const start = new Date(base.getFullYear(), base.getMonth(), 1);
    const end = new Date(base.getFullYear(), base.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  if (periodo === "año" || periodo === "ano") {
    const start = new Date(base.getFullYear(), 0, 1);
    const end = new Date(base.getFullYear(), 11, 31);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  // Fallback: hoy
  const end = new Date(base);
  end.setHours(23, 59, 59, 999);
  return { start: base, end };
}

// ==================================================================
// Normalización de movimientos entre Supabase (ISO + numeric) y UI
// ==================================================================

function normalizeFromSupabase(row) {
  return {
    id: row.id,
    tipo: row.tipo,
    categoria: row.categoria,
    nombre: row.nombre || "",
    monto: typeof row.monto === "number"
      ? row.monto.toFixed(2)
      : String(row.monto ?? "0"),
    fecha: formatFechaMock(parseFechaMock(row.fecha)),
  };
}

function toSupabasePayload(mov, userId) {
  const d = parseFechaMock(mov.fecha);
  const isoFecha = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return {
    user_id: userId,
    tipo: mov.tipo,
    categoria: mov.categoria,
    nombre: mov.nombre || null,
    monto: parseMonto(mov.monto),
    fecha: isoFecha,
  };
}

// ==================================================================
// Context
// ==================================================================

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const { user: authUser } = useAuth();
  const [periodo, setPeriodo] = useState("mes");
  const [allMovimientos, setAllMovimientos] = useState([]);
  const [customRange, setCustomRange] = useState(null);
  const [loadingMovimientos, setLoadingMovimientos] = useState(false);

  // --- Cargar movimientos del usuario desde Supabase ---
  useEffect(() => {
    if (!authUser) {
      setAllMovimientos([]);
      return undefined;
    }
    let mounted = true;
    setLoadingMovimientos(true);
    (async () => {
      const { data, error } = await supabase
        .from("movimientos")
        .select("id, tipo, categoria, nombre, monto, fecha")
        .eq("user_id", authUser.id)
        .order("fecha", { ascending: false });
      if (!mounted) return;
      if (error) {
        if (import.meta.env.DEV) {
          console.error("[Dashboard] Error cargando movimientos:", error);
        }
        setAllMovimientos([]);
      } else {
        setAllMovimientos((data || []).map(normalizeFromSupabase));
      }
      setLoadingMovimientos(false);
    })();
    return () => { mounted = false; };
  }, [authUser]);

  // --- Rango activo (custom tiene prioridad sobre periodo) ---
  const activeRange = useMemo(
    () => customRange || getPeriodRange(periodo),
    [customRange, periodo],
  );

  // --- Filtrar movimientos por rango ---
  const movimientos = useMemo(() => {
    return allMovimientos.filter((m) => {
      const d = parseFechaMock(m.fecha);
      return d >= activeRange.start && d <= activeRange.end;
    });
  }, [allMovimientos, activeRange]);

  const ingresos = useMemo(
    () => movimientos.filter((m) => m.tipo === "ingreso"),
    [movimientos],
  );
  const gastos = useMemo(
    () => movimientos.filter((m) => m.tipo === "gasto"),
    [movimientos],
  );

  const totalIngresos = useMemo(
    () => ingresos.reduce((acc, i) => acc + parseMonto(i.monto), 0),
    [ingresos],
  );
  const totalGastos = useMemo(
    () => gastos.reduce((acc, g) => acc + parseMonto(g.monto), 0),
    [gastos],
  );
  const balance = totalIngresos - totalGastos;

  const dateRangeLabel = useMemo(() => {
    const { start, end } = activeRange;
    return `${formatFechaCorta(start)} — ${formatFechaCorta(end)} ${end.getFullYear()}`;
  }, [activeRange]);

  // --- Acciones ---
  const handleSetPeriodo = useCallback((p) => {
    setPeriodo(p);
    setCustomRange(null);
  }, []);

  const handleSetCustomRange = useCallback((start, end) => {
    if (start && end) {
      const s = new Date(start);
      s.setHours(0, 0, 0, 0);
      const e = new Date(end);
      e.setHours(23, 59, 59, 999);
      setCustomRange({ start: s, end: e });
    } else {
      setCustomRange(null);
    }
  }, []);

  // --- CRUD persistido en Supabase ---
  const addMovimiento = useCallback(async (mov) => {
    if (!authUser) return;
    const { data, error } = await supabase
      .from("movimientos")
      .insert(toSupabasePayload(mov, authUser.id))
      .select("id, tipo, categoria, nombre, monto, fecha")
      .single();
    if (error) {
      if (import.meta.env.DEV) {
        console.error("[Dashboard] addMovimiento:", error);
      }
      return;
    }
    setAllMovimientos((prev) => [normalizeFromSupabase(data), ...prev]);
  }, [authUser]);

  const editMovimiento = useCallback(async (index, updated) => {
    if (!authUser) return;
    // `index` es el índice dentro del array filtrado que ve el componente.
    // Usamos el id de ese item para evitar colisiones tras un re-render.
    const target = movimientos[index];
    if (!target?.id) return;
    const payload = toSupabasePayload(updated, authUser.id);
    // user_id no se actualiza
    delete payload.user_id;
    const { data, error } = await supabase
      .from("movimientos")
      .update(payload)
      .eq("id", target.id)
      .select("id, tipo, categoria, nombre, monto, fecha")
      .single();
    if (error) {
      if (import.meta.env.DEV) {
        console.error("[Dashboard] editMovimiento:", error);
      }
      return;
    }
    const normalized = normalizeFromSupabase(data);
    setAllMovimientos((prev) => prev.map((m) => (m.id === target.id ? normalized : m)));
  }, [authUser, movimientos]);

  const deleteMovimiento = useCallback(async (index) => {
    if (!authUser) return;
    const target = movimientos[index];
    if (!target?.id) return;
    const { error } = await supabase
      .from("movimientos")
      .delete()
      .eq("id", target.id);
    if (error) {
      if (import.meta.env.DEV) {
        console.error("[Dashboard] deleteMovimiento:", error);
      }
      return;
    }
    setAllMovimientos((prev) => prev.filter((m) => m.id !== target.id));
  }, [authUser, movimientos]);

  const value = useMemo(() => ({
    periodo,
    setPeriodo: handleSetPeriodo,
    customRange,
    setCustomRange: handleSetCustomRange,
    dateRangeLabel,
    ingresos,
    gastos,
    movimientos,
    totalIngresos,
    totalGastos,
    balance,
    loading: loadingMovimientos,
    addMovimiento,
    editMovimiento,
    deleteMovimiento,
  }), [
    periodo, handleSetPeriodo, customRange, handleSetCustomRange, dateRangeLabel,
    ingresos, gastos, movimientos, totalIngresos, totalGastos, balance,
    loadingMovimientos, addMovimiento, editMovimiento, deleteMovimiento,
  ]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export default function useDashboardData() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboardData must be used inside <DashboardProvider>");
  }
  return ctx;
}
