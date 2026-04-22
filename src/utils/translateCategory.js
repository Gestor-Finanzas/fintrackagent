/**
 * Traduce el nombre de una categoría usando las claves bajo
 * `dashboard.categories.*` del bundle de i18next.
 *
 * Si la clave no existe (p. ej. el usuario creó su propia categoría), se
 * devuelve el nombre original sin modificar — así no se pierden las
 * categorías personalizadas cuando se cambia de idioma.
 *
 * Uso:
 *   const label = translateCategory(name, t);
 *
 * @param {string} name - Nombre de la categoría tal como está en la BD.
 * @param {Function} t - Función `t` de `useTranslation()`.
 * @returns {string}
 */
export function translateCategory(name, t) {
  if (!name) return "";
  return t(`dashboard.categories.${name}`, { defaultValue: name });
}
