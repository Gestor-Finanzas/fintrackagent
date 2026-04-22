/**
 * Traduce el nombre de una categoría vía la key `dashboard.categories.<name>`.
 * Si no hay traducción (p. ej. categoría creada por el usuario), devuelve
 * el nombre original — así las categorías personalizadas no se pierden
 * al cambiar de idioma.
 */
export function translateCategory(name, t) {
  if (!name) return "";
  return t(`dashboard.categories.${name}`, { defaultValue: name });
}
