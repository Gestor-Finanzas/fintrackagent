/**
 * Colores centralizados para gráficos (Chart.js).
 * Derivados del design system — deben mantenerse sincronizados con
 * tailwind.config.js.
 *
 * Para usar colores con transparencia en Chart.js necesitamos el formato
 * `rgba(...)` porque los callbacks no soportan Tailwind classes.
 */
const brand = {
  primary: "#0D9668", // emerald-ish (design system "primary")
  dark: "#1E3A5F", // navy (design system "dark")
  danger: "#F87171", // red-400
  warning: "#FBBF24", // amber-400
  muted: "#8F9BBA", // slate para textos secundarios de gráfico
  grid: "#F0F2F8", // rejillas suaves
  tooltipBorder: "#E2E8F0", // gray-200
  tooltipBg: "#FFFFFF",
  tooltipText: "#1E3A5F",
};

export const chartColors = {
  income: brand.primary,
  incomeFill: "rgba(13, 150, 104, 0.10)",
  expense: brand.danger,
  expenseFill: "rgba(248, 113, 113, 0.10)",
  balance: brand.dark,
  balanceFill: "rgba(30, 58, 95, 0.08)",
  axisText: brand.muted,
  grid: brand.grid,
  tooltipBg: brand.tooltipBg,
  tooltipBorder: brand.tooltipBorder,
  tooltipText: brand.tooltipText,
};

/**
 * Opciones base reutilizables para gráficos de líneas.
 * Se combina con callbacks específicos en cada página.
 */
export const baseLineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: chartColors.tooltipBg,
      titleColor: chartColors.tooltipText,
      bodyColor: chartColors.tooltipText,
      borderColor: chartColors.tooltipBorder,
      borderWidth: 1,
      padding: 12,
      cornerRadius: 12,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: chartColors.axisText, font: { size: 11 } },
    },
    y: {
      grid: { color: chartColors.grid },
      ticks: { color: chartColors.axisText, font: { size: 11 } },
    },
  },
  animation: { duration: 500 },
};

export const baseDonutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "65%",
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: chartColors.tooltipBg,
      titleColor: chartColors.tooltipText,
      bodyColor: chartColors.tooltipText,
      borderColor: chartColors.tooltipBorder,
      borderWidth: 1,
      padding: 12,
      cornerRadius: 12,
    },
  },
  animation: { duration: 500 },
};
