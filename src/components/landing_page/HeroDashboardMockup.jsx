/**
 * Ilustración decorativa del dashboard mostrada en el Hero de la landing.
 * SVG inline: sin peticiones adicionales pero mantenido en su propio
 * archivo para no polucionar el JSX principal.
 *
 * Los colores siguen el design system (primary = #0D9668, dark = #1E3A5F,
 * danger suave = #D97366). Las "categorías" usan la paleta secundaria con
 * un amarillo accent (#FFCE20) solo aquí, a efectos ilustrativos.
 */
export default function HeroDashboardMockup({ className = "" }) {
  return (
    <svg
      viewBox="0 0 560 410"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Vista previa del panel de FinTrack"
      className={className}
    >
      {/* Background */}
      <rect width="560" height="410" rx="16" fill="#F4F7FE" />

      {/* === SIDEBAR === */}
      <rect x="0" y="0" width="130" height="410" rx="16" fill="white" />
      <line x1="130" y1="12" x2="130" y2="398" stroke="#E2E8F0" strokeWidth="0.8" />
      <text x="22" y="30" fill="#1E3A5F" fontSize="11" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">FinTrack</text>
      <rect x="10" y="54" width="110" height="26" rx="8" fill="#1E3A5F" opacity="0.08" />
      <rect x="10" y="54" width="3" height="26" rx="1.5" fill="#1E3A5F" />
      <text x="24" y="67" fill="#1E3A5F" fontSize="8.5" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Principal</text>
      <text x="24" y="97" fill="#8F9BBA" fontSize="8.5" fontFamily="system-ui" dominantBaseline="central">Ingresos</text>
      <text x="24" y="117" fill="#8F9BBA" fontSize="8.5" fontFamily="system-ui" dominantBaseline="central">Gastos</text>
      <text x="24" y="137" fill="#8F9BBA" fontSize="8.5" fontFamily="system-ui" dominantBaseline="central">Balance</text>
      <text x="24" y="157" fill="#8F9BBA" fontSize="8.5" fontFamily="system-ui" dominantBaseline="central">Categorías</text>
      <circle cx="30" cy="387" r="12" fill="#F4F7FE" />
      <text x="30" y="387" fill="#1E3A5F" fontSize="9" fontWeight="600" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">J</text>

      {/* === HEADER === */}
      <text x="148" y="30" fill="#1E293B" fontSize="11" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">Buenos días, Juan</text>
      <text x="148" y="44" fill="#8F9BBA" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">1 de marzo de 2026</text>
      <rect x="430" y="22" width="36" height="18" rx="6" fill="#1E3A5F" />
      <text x="448" y="31" fill="white" fontSize="7" fontWeight="600" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Mes</text>
      <rect x="470" y="22" width="36" height="18" rx="6" fill="white" stroke="#E2E8F0" strokeWidth="0.8" />
      <text x="488" y="31" fill="#8F9BBA" fontSize="7" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Año</text>

      {/* === TOP CARDS === */}
      <rect x="148" y="58" width="120" height="62" rx="12" fill="white" />
      <text x="163" y="76" fill="#8F9BBA" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">Ingresos</text>
      <text x="163" y="94" fill="#0D9668" fontSize="13" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">4.200,00 €</text>
      <circle cx="250" cy="85" r="11" fill="#0D9668" opacity="0.12" />
      <path d="M247 87l3-4 3 4" stroke="#0D9668" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      <rect x="280" y="58" width="120" height="62" rx="12" fill="white" />
      <text x="295" y="76" fill="#8F9BBA" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">Gastos</text>
      <text x="295" y="94" fill="#D97366" fontSize="13" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">1.745,00 €</text>
      <circle cx="382" cy="85" r="11" fill="#D97366" opacity="0.12" />
      <path d="M379 83l3 4 3-4" stroke="#D97366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      <rect x="415" y="58" width="120" height="62" rx="12" fill="white" />
      <text x="430" y="76" fill="#8F9BBA" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">Balance</text>
      <text x="430" y="94" fill="#1E3A5F" fontSize="13" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">2.455,00 €</text>
      <circle cx="517" cy="85" r="11" fill="#1E3A5F" opacity="0.12" />
      <path d="M514 87l3-4 3 4" stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* === LINE CHART === */}
      <rect x="148" y="132" width="260" height="155" rx="12" fill="white" />
      <text x="163" y="150" fill="#1E293B" fontSize="8.5" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Ingresos vs Gastos</text>
      <circle cx="310" cy="150" r="3" fill="#0D9668" />
      <text x="316" y="150" fill="#8F9BBA" fontSize="6.5" fontFamily="system-ui" dominantBaseline="central">Ingresos</text>
      <circle cx="355" cy="150" r="3" fill="#D97366" />
      <text x="361" y="150" fill="#8F9BBA" fontSize="6.5" fontFamily="system-ui" dominantBaseline="central">Gastos</text>
      <text x="180" y="172" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">3.000</text>
      <text x="180" y="197" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">2.000</text>
      <text x="180" y="222" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">1.000</text>
      <text x="180" y="247" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">0</text>
      <text x="200" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Ene</text>
      <text x="234" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Feb</text>
      <text x="268" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Mar</text>
      <text x="302" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Abr</text>
      <text x="336" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">May</text>
      <text x="370" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Jun</text>
      <line x1="185" y1="172" x2="395" y2="172" stroke="#F4F7FE" strokeWidth="0.8" />
      <line x1="185" y1="197" x2="395" y2="197" stroke="#F4F7FE" strokeWidth="0.8" />
      <line x1="185" y1="222" x2="395" y2="222" stroke="#F4F7FE" strokeWidth="0.8" />
      <line x1="185" y1="247" x2="395" y2="247" stroke="#E2E8F0" strokeWidth="0.8" />
      <polyline
        points="200,222 234,197 268,210 302,185 336,192 370,172"
        stroke="#0D9668"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points="200,222 234,197 268,210 302,185 336,192 370,172 370,247 200,247"
        fill="#0D9668"
        opacity="0.06"
      />
      <polyline
        points="200,235 234,225 268,230 302,220 336,222 370,215"
        stroke="#D97366"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="200" cy="222" r="2.5" fill="#0D9668" />
      <circle cx="268" cy="210" r="2.5" fill="#0D9668" />
      <circle cx="370" cy="172" r="2.5" fill="#0D9668" />
      <circle cx="234" cy="225" r="2.5" fill="#D97366" />
      <circle cx="336" cy="222" r="2.5" fill="#D97366" />

      {/* === DONUT CHART === */}
      <rect x="423" y="132" width="112" height="155" rx="12" fill="white" />
      <text x="435" y="150" fill="#1E293B" fontSize="8.5" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Categorías</text>
      <circle cx="477" cy="210" r="32" stroke="#E2E8F0" strokeWidth="7" fill="none" />
      <circle cx="477" cy="210" r="32" stroke="#1E3A5F" strokeWidth="7" fill="none" strokeDasharray="70 131" strokeDashoffset="0" />
      <circle cx="477" cy="210" r="32" stroke="#0D9668" strokeWidth="7" fill="none" strokeDasharray="40 161" strokeDashoffset="-70" />
      <circle cx="477" cy="210" r="32" stroke="#D97366" strokeWidth="7" fill="none" strokeDasharray="30 171" strokeDashoffset="-110" />
      <circle cx="477" cy="210" r="32" stroke="#FFCE20" strokeWidth="7" fill="none" strokeDasharray="20 181" strokeDashoffset="-140" />
      <text x="477" y="207" fill="#1E293B" fontSize="9" fontWeight="700" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">1.745 €</text>
      <text x="477" y="218" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">total gastos</text>
      <rect x="435" y="254" width="6" height="6" rx="1.5" fill="#1E3A5F" />
      <text x="445" y="257" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Súper</text>
      <rect x="472" y="254" width="6" height="6" rx="1.5" fill="#0D9668" />
      <text x="482" y="257" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Ocio</text>
      <rect x="502" y="254" width="6" height="6" rx="1.5" fill="#D97366" />
      <text x="512" y="257" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Café</text>
      <rect x="435" y="266" width="6" height="6" rx="1.5" fill="#FFCE20" />
      <text x="445" y="269" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Suscr.</text>

      {/* === TRANSACTIONS LIST === */}
      <rect x="148" y="298" width="387" height="96" rx="12" fill="white" />
      <text x="163" y="313" fill="#1E293B" fontSize="8.5" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Últimos movimientos</text>
      <text x="520" y="313" fill="#1E3A5F" fontSize="6.5" fontWeight="500" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">Ver todos</text>
      <circle cx="170" cy="331" r="6" fill="#0D9668" opacity="0.15" />
      <path d="M168 333l2-3 2 3" stroke="#0D9668" strokeWidth="1" strokeLinecap="round" fill="none" />
      <text x="182" y="329" fill="#1E293B" fontSize="7" fontWeight="500" fontFamily="system-ui" dominantBaseline="central">Nómina marzo</text>
      <text x="182" y="338" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Salario · 01-03-2026</text>
      <text x="520" y="331" fill="#0D9668" fontSize="7.5" fontWeight="600" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">+2.500,00 €</text>
      <line x1="163" y1="345" x2="520" y2="345" stroke="#F4F7FE" strokeWidth="0.8" />
      <circle cx="170" cy="355" r="6" fill="#D97366" opacity="0.15" />
      <path d="M168 353l2 3 2-3" stroke="#D97366" strokeWidth="1" strokeLinecap="round" fill="none" />
      <text x="182" y="353" fill="#1E293B" fontSize="7" fontWeight="500" fontFamily="system-ui" dominantBaseline="central">Compra supermercado</text>
      <text x="182" y="362" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Supermercado · 01-03-2026</text>
      <text x="520" y="355" fill="#D97366" fontSize="7.5" fontWeight="600" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">-45,00 €</text>
      <line x1="163" y1="369" x2="520" y2="369" stroke="#F4F7FE" strokeWidth="0.8" />
      <circle cx="170" cy="379" r="6" fill="#D97366" opacity="0.15" />
      <path d="M168 377l2 3 2-3" stroke="#D97366" strokeWidth="1" strokeLinecap="round" fill="none" />
      <text x="182" y="377" fill="#1E293B" fontSize="7" fontWeight="500" fontFamily="system-ui" dominantBaseline="central">Netflix Premium</text>
      <text x="182" y="386" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Suscripciones · 28-02-2026</text>
      <text x="520" y="379" fill="#D97366" fontSize="7.5" fontWeight="600" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">-12,99 €</text>
    </svg>
  );
}
