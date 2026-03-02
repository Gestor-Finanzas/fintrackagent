// Script único para forzar todas las fechas del mock a DD-MM-YYYY, detectando y corrigiendo YYYY-MM-DD
const fs = require('fs');
const path = 'src/mocks/mockDashboardData.json';

function toDDMMYYYY(dateStr) {
  if (!dateStr || dateStr.length < 10) return dateStr;
  // Si ya está en DD-MM-YYYY
  if (dateStr[2] === '-' && dateStr[5] === '-') return dateStr;
  // Si está en YYYY-MM-DD
  if (dateStr[4] === '-' && dateStr[7] === '-') {
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
  }
  // Si está en otro formato, intentar detectar y convertir
  const parts = dateStr.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    // Probablemente YYYY-MM-DD
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
}

const data = JSON.parse(fs.readFileSync(path, 'utf8'));
['semana', 'mes', 'año'].forEach(periodo => {
  ['ingresos', 'gastos', 'movimientos'].forEach(tipo => {
    if (data.datos[periodo][tipo]) {
      data.datos[periodo][tipo].forEach(obj => {
        if (obj.fecha) obj.fecha = toDDMMYYYY(obj.fecha);
      });
    }
  });
});
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Fechas forzadas a DD-MM-YYYY (script único)');
