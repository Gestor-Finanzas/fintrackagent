/**
 * Exporta un array de movimientos a un archivo CSV descargable
 * @param {Array} movimientos
 */
export function exportToCSV(movimientos) {
  const header = ["Fecha", "Tipo", "Nombre", "Categoría", "Cantidad"];
  // Escapar valores para CSV (comillas dobles, punto y coma, saltos de línea)
  const escapeCSV = (value) => {
    if (value == null) return '';
    const str = String(value);
    // Escapar comillas dobles
    let escaped = str.replace(/"/g, '""');
    // Si contiene punto y coma, salto de línea o comillas, envolver en comillas
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
  // Usar punto y coma como delimitador para compatibilidad con Excel en español
  const csvContent = [header, ...rows].map(e => e.join(";")).join("\r\n");
  // Agregar BOM UTF-8 para que Excel reconozca tildes y caracteres especiales
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

/**
 * Formatea una fecha a DD-MM-YYYY
 * @param {string} fechaStr
 * @returns {string}
 */
export function formatearFecha(fechaStr) {
  if (!fechaStr) return "";
  const d = new Date(fechaStr);
  if (isNaN(d)) return fechaStr;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
/**
 * Convierte un string con coma decimal o número a número JS
 * @param {string|number} monto
 * @returns {number}
 */
export function parseMonto(monto) {
  if (typeof monto === 'number') return monto;
  if (typeof monto === 'string') return Number(monto.replace(',', '.'));
  return 0;
}

/**
 * Devuelve el rango de fechas de un array de objetos con propiedad fecha
 * @param {Array<{fecha:string}>} arr
 * @returns {string}
 */
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
// Utilidades globales para formateo y otras funciones

// Por ahora forzamos formato español en todas las cantidades: punto como
// separador de miles, coma para decimales, y el símbolo "€" al final
// ("1.500,00 €"). Cuando soportemos otras monedas / locales pasaremos el
// idioma real y mapearemos aquí. El segundo argumento `lang` se mantiene por
// compatibilidad con los call-sites pero se ignora.
const CURRENCY_LOCALE = "es-ES";

/**
 * Formatea un número como euro en formato español:
 * - separador de miles con punto — incluido SIEMPRE, incluso en 4 dígitos
 *   ("1.500 €", no "1500 €"). El default de es-ES es "auto"/"min2", que
 *   omite el separador con 4 cifras; con `useGrouping: "always"` lo
 *   forzamos en todos los casos.
 * - decimales con coma
 * - sin decimales si el importe es entero (1.500 € en vez de 1.500,00 €)
 *
 * @param {number|string} amount
 */
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

/**
 * Formatea un número con dos decimales en formato español ("2,99"), SIN
 * símbolo de moneda. Útil cuando el diseño pinta el "€" aparte.
 *
 * @param {number|string} amount
 */
export function formatNumber(amount) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: "always",
  }).format(num);
}
