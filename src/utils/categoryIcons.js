import {
  FaMoneyBillWave,
  FaTag,
  FaPercent,
  FaLaptop,
  FaGift,
  FaShoppingCart,
  FaBus,
  FaUtensils,
  FaGamepad,
  FaGlobe,
  FaCoffee,
  FaGlassMartiniAlt,
  FaGraduationCap,
  FaHeartbeat,
  FaHome,
  FaPaw,
  FaPlane,
  FaTshirt,
  FaMobileAlt,
  FaShieldAlt,
  FaFileInvoiceDollar,
  FaPiggyBank,
  FaChartLine,
  FaHandHoldingHeart,
  FaEllipsisH,
} from "react-icons/fa";

// Map category names to react-icons components
const icons = {
  Salario: FaMoneyBillWave,
  Venta: FaTag,
  Intereses: FaPercent,
  Freelance: FaLaptop,
  Regalo: FaGift,
  Supermercado: FaShoppingCart,
  Transporte: FaBus,
  Restaurantes: FaUtensils,
  Ocio: FaGamepad,
  Suscripciones: FaGlobe,
  "Café": FaCoffee,
  Bar: FaGlassMartiniAlt,
  "Educación": FaGraduationCap,
  Salud: FaHeartbeat,
  Hogar: FaHome,
  Mascotas: FaPaw,
  Viajes: FaPlane,
  Ropa: FaTshirt,
  "Tecnología": FaMobileAlt,
  Seguros: FaShieldAlt,
  Impuestos: FaFileInvoiceDollar,
  Ahorro: FaPiggyBank,
  "Inversión": FaChartLine,
  "Donación": FaHandHoldingHeart,
  Otro: FaEllipsisH,
};

// All available icon keys for the icon picker
export const availableIcons = Object.keys(icons);

// Get icon for a category name, fallback to Otro
export function getCategoryIcon(categoryName, size = 16) {
  const IconComponent = icons[categoryName] || icons.Otro;
  return <IconComponent size={size} />;
}

// Get all icons as render functions (s) => JSX for backward compat
export function getAllIcons() {
  const fns = {};
  for (const [key, Component] of Object.entries(icons)) {
    fns[key] = (s = 16) => <Component size={s} />;
  }
  return fns;
}

// Export as render functions for direct usage: icons[name](size)
const iconFns = {};
for (const [key, Component] of Object.entries(icons)) {
  iconFns[key] = (s = 16) => <Component size={s} />;
}

export default iconFns;
