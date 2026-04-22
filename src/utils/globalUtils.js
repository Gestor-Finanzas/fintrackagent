export function exportToCSV(movimientos) {
  const header = ["Fecha", "Tipo", "Nombre", "Categoría", "Cantidad"];
  const escapeCSV = (value) => {
    if (value == null) return '';
    const str = String(value);
    let escaped = str.replace(/"/g, '""');
    if (/[;\n\r"]/.test(escaped)) {
      escaped = '"' + escaped + '"';
    }
    return escaped;
  };
  const rows = movimientos.map(m => [
    escapeCSV(m.fecha),
    escapeCSV(m.tipo),
    escapeCSV(m.nombre || ""),
    escapeCSV(m.categoria),
    escapeCSV(parseMonto(m.monto))
  ]);
  // Excel en español usa `;` como separador de columnas y necesita BOM
  // UTF-8 para leer correctamente tildes y eñes.
  const csvContent = [header, ...rows].map(e => e.join(";")).join("\r\n");
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "movimientos.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function formatearFecha(fechaStr) {
  if (!fechaStr) return "";
  const d = new Date(fechaStr);
  if (isNaN(d)) return fechaStr;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

export function parseMonto(monto) {
  if (typeof monto === 'number') return monto;
  if (typeof monto === 'string') return Number(monto.replace(',', '.'));
  return 0;
}

export function getDateRange(arr) {
  if (!arr.length) return "Sin datos";
  const fechas = arr.map(e => new Date(e.fecha)).sort((a, b) => a - b);
  const inicio = fechas[0];
  const fin = fechas[fechas.length - 1];
  if (inicio.getTime() === fin.getTime()) {
    return inicio.toLocaleDateString();
  }
  return `${inicio.toLocaleDateString()} - ${fin.toLocaleDateString()}`;
}

const CURRENCY_LOCALE = "es-ES";

// `useGrouping: "always"` fuerza el separador de miles también en 4 cifras
// ("1.500 €"). Sin él, es-ES por CLDR lo omite hasta 5+ dígitos.
export function formatEuro(amount) {
  const num = Number(amount) || 0;
  const isWhole = Number.isInteger(num);
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
    useGrouping: "always",
  }).format(num);
}

export function formatNumber(amount) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: "always",
  }).format(num);
}
