import { FaArrowRight, FaChartLine } from "react-icons/fa";
import "./Hero.css";

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-gradient-to-br from-bgLight via-white to-bgLight min-h-screen flex items-center pb-10 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-16 px-6 relative z-10">
        {/* Texto */}
        <div className="flex-1 animate-fade-in hero-text md:ml-20">
          <h1 className="text-5xl md:text-6xl font-bold text-dark mb-6 leading-tight text-center md:text-left">
            Controla tus finanzas desde{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              WhatsApp
            </span>{" "}
            con <span className="text-primary">Fin</span>
          </h1>
          <p className="text-lg text-secondary mb-8 leading-relaxed text-center md:text-left">
            Envía tus gastos e ingresos con un mensaje. Nuestra IA detecta
            automáticamente categorías, importes y fechas. Visualiza todo en un
            dashboard profesional y seguro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#signup"
              className="group bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-lg hover:shadow-xl-glow transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 font-semibold"
            >
              Comenzar Gratis{" "}
              <FaArrowRight className="group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#features"
              className="text-primary border-2 border-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-white transition duration-300 font-semibold flex items-center justify-center"
            >
              Ver Características
            </a>
          </div>

          {/* Contadores */}
          <div className="mt-12 flex flex-row flex-wrap gap-6 justify-center md:justify-start">
            <div className="flex-1 min-w-[120px] flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <FaChartLine className="text-primary text-xl" />
              </div>
              <div className="text-center md:text-left">
                <p className="font-bold text-dark">+2.000</p>
                <p className="text-sm text-secondary">Usuarios activos</p>
              </div>
            </div>

            <div className="flex-1 min-w-[120px] flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <span className="text-accent text-xl font-bold">&#10003;</span>
              </div>
              <div className="text-center md:text-left">
                <p className="font-bold text-dark">Gratis 14 días</p>
                <p className="text-sm text-secondary">Sin tarjeta de crédito</p>
              </div>
            </div>
          </div>
        </div>

        {/* SVG Dashboard Illustration */}
        <div
          className="flex-1 animate-fade-in mt-10 md:mt-0"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-2xl blur-2xl"></div>
            <svg
              viewBox="0 0 560 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative w-full h-auto md:w-[100%] ml-auto rounded-2xl"
            >
              {/* Background */}
              <rect width="560" height="400" rx="16" fill="#F4F7FE" />

              {/* === SIDEBAR === */}
              <rect x="0" y="0" width="130" height="400" rx="16" fill="white" />
              <line x1="130" y1="12" x2="130" y2="388" stroke="#E2E8F0" strokeWidth="0.8" />
              <text x="22" y="30" fill="#4318FF" fontSize="11" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">FinTrack</text>
              {/* Active nav item */}
              <rect x="10" y="54" width="110" height="26" rx="8" fill="#4318FF" opacity="0.08" />
              <rect x="10" y="54" width="3" height="26" rx="1.5" fill="#4318FF" />
              <text x="24" y="67" fill="#4318FF" fontSize="8.5" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Principal</text>
              {/* Nav items */}
              <text x="24" y="97" fill="#8F9BBA" fontSize="8.5" fontFamily="system-ui" dominantBaseline="central">Ingresos</text>
              <text x="24" y="117" fill="#8F9BBA" fontSize="8.5" fontFamily="system-ui" dominantBaseline="central">Gastos</text>
              <text x="24" y="137" fill="#8F9BBA" fontSize="8.5" fontFamily="system-ui" dominantBaseline="central">Balance</text>
              <text x="24" y="157" fill="#8F9BBA" fontSize="8.5" fontFamily="system-ui" dominantBaseline="central">Categorías</text>
              {/* User avatar */}
              <circle cx="30" cy="374" r="12" fill="#F4F7FE" />
              <text x="30" y="374" fill="#4318FF" fontSize="9" fontWeight="600" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">I</text>

              {/* === HEADER === */}
              <text x="148" y="30" fill="#1B2559" fontSize="11" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">Buenos días, Iván</text>
              <text x="148" y="44" fill="#8F9BBA" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">1 de marzo de 2026</text>
              {/* Period filter pills */}
              <rect x="430" y="22" width="36" height="18" rx="6" fill="#4318FF" />
              <text x="448" y="31" fill="white" fontSize="7" fontWeight="600" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Mes</text>
              <rect x="470" y="22" width="36" height="18" rx="6" fill="white" stroke="#E2E8F0" strokeWidth="0.8" />
              <text x="488" y="31" fill="#8F9BBA" fontSize="7" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Año</text>

              {/* === TOP CARDS === */}
              {/* Card: Ingresos */}
              <rect x="148" y="58" width="120" height="62" rx="12" fill="white" />
              <text x="163" y="76" fill="#8F9BBA" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">Ingresos</text>
              <text x="163" y="94" fill="#05CD99" fontSize="13" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">4.200,00 €</text>
              <circle cx="250" cy="85" r="11" fill="#05CD99" opacity="0.12" />
              <path d="M247 87l3-4 3 4" stroke="#05CD99" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Card: Gastos */}
              <rect x="280" y="58" width="120" height="62" rx="12" fill="white" />
              <text x="295" y="76" fill="#8F9BBA" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">Gastos</text>
              <text x="295" y="94" fill="#EE5D50" fontSize="13" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">1.745,00 €</text>
              <circle cx="382" cy="85" r="11" fill="#EE5D50" opacity="0.12" />
              <path d="M379 83l3 4 3-4" stroke="#EE5D50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Card: Balance */}
              <rect x="415" y="58" width="120" height="62" rx="12" fill="white" />
              <text x="430" y="76" fill="#8F9BBA" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">Balance</text>
              <text x="430" y="94" fill="#4318FF" fontSize="13" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">2.455,00 €</text>
              <circle cx="517" cy="85" r="11" fill="#4318FF" opacity="0.12" />
              <path d="M514 87l3-4 3 4" stroke="#4318FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* === LINE CHART === */}
              <rect x="148" y="132" width="260" height="155" rx="12" fill="white" />
              <text x="163" y="150" fill="#1B2559" fontSize="8.5" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Ingresos vs Gastos</text>
              {/* Legend */}
              <circle cx="310" cy="150" r="3" fill="#05CD99" />
              <text x="316" y="150" fill="#8F9BBA" fontSize="6.5" fontFamily="system-ui" dominantBaseline="central">Ingresos</text>
              <circle cx="355" cy="150" r="3" fill="#EE5D50" />
              <text x="361" y="150" fill="#8F9BBA" fontSize="6.5" fontFamily="system-ui" dominantBaseline="central">Gastos</text>
              {/* Y-axis labels (inside card, right-aligned at x=180) */}
              <text x="180" y="172" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">3.000</text>
              <text x="180" y="197" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">2.000</text>
              <text x="180" y="222" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">1.000</text>
              <text x="180" y="247" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">0</text>
              {/* X-axis labels */}
              <text x="200" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Ene</text>
              <text x="234" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Feb</text>
              <text x="268" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Mar</text>
              <text x="302" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Abr</text>
              <text x="336" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">May</text>
              <text x="370" y="262" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">Jun</text>
              {/* Grid lines */}
              <line x1="185" y1="172" x2="395" y2="172" stroke="#F4F7FE" strokeWidth="0.8" />
              <line x1="185" y1="197" x2="395" y2="197" stroke="#F4F7FE" strokeWidth="0.8" />
              <line x1="185" y1="222" x2="395" y2="222" stroke="#F4F7FE" strokeWidth="0.8" />
              <line x1="185" y1="247" x2="395" y2="247" stroke="#E2E8F0" strokeWidth="0.8" />
              {/* Income line (green) */}
              <polyline
                points="200,222 234,197 268,210 302,185 336,192 370,172"
                stroke="#05CD99"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polygon
                points="200,222 234,197 268,210 302,185 336,192 370,172 370,247 200,247"
                fill="#05CD99"
                opacity="0.06"
              />
              {/* Expense line (red) */}
              <polyline
                points="200,235 234,225 268,230 302,220 336,222 370,215"
                stroke="#EE5D50"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data points */}
              <circle cx="200" cy="222" r="2.5" fill="#05CD99" />
              <circle cx="268" cy="210" r="2.5" fill="#05CD99" />
              <circle cx="370" cy="172" r="2.5" fill="#05CD99" />
              <circle cx="234" cy="225" r="2.5" fill="#EE5D50" />
              <circle cx="336" cy="222" r="2.5" fill="#EE5D50" />

              {/* === DONUT CHART === */}
              <rect x="423" y="132" width="112" height="155" rx="12" fill="white" />
              <text x="435" y="150" fill="#1B2559" fontSize="8.5" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Categorías</text>
              <circle cx="477" cy="210" r="32" stroke="#E2E8F0" strokeWidth="7" fill="none" />
              <circle cx="477" cy="210" r="32" stroke="#4318FF" strokeWidth="7" fill="none" strokeDasharray="70 131" strokeDashoffset="0" />
              <circle cx="477" cy="210" r="32" stroke="#05CD99" strokeWidth="7" fill="none" strokeDasharray="40 161" strokeDashoffset="-70" />
              <circle cx="477" cy="210" r="32" stroke="#EE5D50" strokeWidth="7" fill="none" strokeDasharray="30 171" strokeDashoffset="-110" />
              <circle cx="477" cy="210" r="32" stroke="#FFCE20" strokeWidth="7" fill="none" strokeDasharray="20 181" strokeDashoffset="-140" />
              {/* Center text */}
              <text x="477" y="207" fill="#1B2559" fontSize="9" fontWeight="700" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">1.745 €</text>
              <text x="477" y="218" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">total gastos</text>
              {/* Legend */}
              <rect x="435" y="254" width="6" height="6" rx="1.5" fill="#4318FF" />
              <text x="445" y="257" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Súper</text>
              <rect x="472" y="254" width="6" height="6" rx="1.5" fill="#05CD99" />
              <text x="482" y="257" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Ocio</text>
              <rect x="502" y="254" width="6" height="6" rx="1.5" fill="#EE5D50" />
              <text x="512" y="257" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Café</text>
              <rect x="435" y="266" width="6" height="6" rx="1.5" fill="#FFCE20" />
              <text x="445" y="269" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Suscr.</text>

              {/* === TRANSACTIONS LIST === */}
              <rect x="148" y="298" width="387" height="96" rx="12" fill="white" />
              <text x="163" y="313" fill="#1B2559" fontSize="8.5" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Últimos movimientos</text>
              <text x="520" y="313" fill="#4318FF" fontSize="6.5" fontWeight="500" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">Ver todos</text>
              {/* Row 1 */}
              <circle cx="170" cy="331" r="6" fill="#05CD99" opacity="0.15" />
              <path d="M168 333l2-3 2 3" stroke="#05CD99" strokeWidth="1" strokeLinecap="round" fill="none" />
              <text x="182" y="329" fill="#1B2559" fontSize="7" fontWeight="500" fontFamily="system-ui" dominantBaseline="central">Nómina marzo</text>
              <text x="182" y="338" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Salario · 01-03-2026</text>
              <text x="520" y="331" fill="#05CD99" fontSize="7.5" fontWeight="600" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">+2.500,00 €</text>
              <line x1="163" y1="345" x2="520" y2="345" stroke="#F4F7FE" strokeWidth="0.8" />
              {/* Row 2 */}
              <circle cx="170" cy="355" r="6" fill="#EE5D50" opacity="0.15" />
              <path d="M168 353l2 3 2-3" stroke="#EE5D50" strokeWidth="1" strokeLinecap="round" fill="none" />
              <text x="182" y="353" fill="#1B2559" fontSize="7" fontWeight="500" fontFamily="system-ui" dominantBaseline="central">Compra supermercado</text>
              <text x="182" y="362" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Supermercado · 01-03-2026</text>
              <text x="520" y="355" fill="#EE5D50" fontSize="7.5" fontWeight="600" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">-45,00 €</text>
              <line x1="163" y1="369" x2="520" y2="369" stroke="#F4F7FE" strokeWidth="0.8" />
              {/* Row 3 */}
              <circle cx="170" cy="379" r="6" fill="#EE5D50" opacity="0.15" />
              <path d="M168 377l2 3 2-3" stroke="#EE5D50" strokeWidth="1" strokeLinecap="round" fill="none" />
              <text x="182" y="377" fill="#1B2559" fontSize="7" fontWeight="500" fontFamily="system-ui" dominantBaseline="central">Netflix Premium</text>
              <text x="182" y="386" fill="#8F9BBA" fontSize="5.5" fontFamily="system-ui" dominantBaseline="central">Suscripciones · 28-02-2026</text>
              <text x="520" y="379" fill="#EE5D50" fontSize="7.5" fontWeight="600" fontFamily="system-ui" textAnchor="end" dominantBaseline="central">-12,99 €</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
