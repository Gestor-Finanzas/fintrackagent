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

/**
 * Formatea un número como euro con separador de miles y decimales en español.
 * @param {number} amount
 * @returns {string}
 */
export function formatEuro(amount) {
  // Utilidades globales para formateo y otras funciones
  const num = Number(amount) || 0;
  // Separar parte entera y decimal
  let [ent, dec] = num.toFixed(2).split('.');
  ent = ent.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // Si los decimales son 00, no mostrar
  if (dec === '00') {
    return ent + ' €';
  }
  // Si solo hay un decimal (ej: 20,5), mostrar como 20,50
  if (dec[1] === '0' && dec[0] !== '0') {
    dec = dec[0] + '0';
  }
  // Si los decimales terminan en 0, quitar el 0 (excepto el caso anterior)
  else if (dec[1] === '0') {
    dec = dec[0];
  }
  return ent + ',' + dec + ' €';
}
