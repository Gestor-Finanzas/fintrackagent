import { useState } from "react";
import { FaRobot, FaWhatsapp, FaShieldAlt, FaLightbulb } from "react-icons/fa";

export default function Product() {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <section
      id="product"
      className="bg-gradient-to-br from-bgLight to-white py-20 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Conoce a tu agente personal{" "}
            <span className="text-primary">Fin</span>
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
            FinTrack es una plataforma revolucionaria de gestión financiera
            personal que funciona a través de{" "}
            <span className="font-semibold text-primary">Fin</span>, tu agente
            financiero inteligente. Conectado a WhatsApp, Fin te permite
            registrar gastos e ingresos con mensajes naturales. Con inteligencia
            artificial avanzada, convertimos cada mensaje en datos estructurados
            y análisis profesionales instantáneos.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div data-aos="fade-right">
            <div className="space-y-6">
              <div
                className="group flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 border border-gray-100 hover:border-primary cursor-pointer"
                onMouseEnter={() => setActiveFeature("ia")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-lg text-white h-fit">
                  <FaRobot size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">
                    IA Inteligente
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Nuestra IA detecta automáticamente importes, categorías y
                    fechas de tus mensajes.
                  </p>
                </div>
              </div>

              <div
                className="group flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 border border-gray-100 hover:border-primary cursor-pointer"
                onMouseEnter={() => setActiveFeature("whatsapp")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="p-3 bg-gradient-to-br from-accent to-primary rounded-lg text-white h-fit">
                  <FaWhatsapp size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">
                    WhatsApp Nativo
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Usa la app que ya tienes. No descargues nada más, solo
                    escribe en WhatsApp.
                  </p>
                </div>
              </div>

              <div
                className="group flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 border border-gray-100 hover:border-primary cursor-pointer"
                onMouseEnter={() => setActiveFeature("seguro")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-lg text-white h-fit">
                  <FaShieldAlt size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">
                    100% Seguro
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Encriptación de nivel bancario. Tus datos son solo tuyos,
                    siempre.
                  </p>
                </div>
              </div>

              <div
                className="group flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 border border-gray-100 hover:border-primary cursor-pointer"
                onMouseEnter={() => setActiveFeature("recomendaciones")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="p-3 bg-gradient-to-br from-accent to-primary rounded-lg text-white h-fit">
                  <FaLightbulb size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">
                    Recomendaciones
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Recibe insights personalizados sobre tus hábitos de gasto y
                    ahorro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SVG WhatsApp Chat Illustration */}
          <div data-aos="fade-left" className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-2xl blur-2xl"></div>
            <svg
              viewBox="0 0 320 560"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative w-full max-w-xs mx-auto drop-shadow-2xl"
            >
              <defs>
                <clipPath id="screenClip">
                  <rect x="6" y="6" width="308" height="548" rx="34" />
                </clipPath>
                <linearGradient id="whatsappHeader" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#128C7E" />
                  <stop offset="100%" stopColor="#075E54" />
                </linearGradient>
              </defs>

              {/* Phone body */}
              <rect x="0" y="0" width="320" height="560" rx="38" fill="#1a1a2e" />
              <rect x="-2" y="120" width="2.5" height="30" rx="1" fill="#2a2a3e" />
              <rect x="-2" y="160" width="2.5" height="30" rx="1" fill="#2a2a3e" />
              <rect x="319.5" y="150" width="2.5" height="40" rx="1" fill="#2a2a3e" />

              <g clipPath="url(#screenClip)">
                {/* Chat wallpaper */}
                <rect x="6" y="6" width="308" height="548" fill="#E5DDD5" />

                {/* === STATUS BAR (y=6 h=24 center=18) === */}
                <rect x="6" y="6" width="308" height="24" fill="#075E54" />
                <text x="20" y="18" fill="white" fontSize="10" fontFamily="system-ui" fontWeight="500" dominantBaseline="central">9:41</text>
                <g transform="translate(260, 11)">
                  <rect x="0" y="4" width="2.5" height="5" rx="0.5" fill="white" opacity="0.4" />
                  <rect x="3.5" y="2.5" width="2.5" height="6.5" rx="0.5" fill="white" opacity="0.6" />
                  <rect x="7" y="1" width="2.5" height="8" rx="0.5" fill="white" opacity="0.8" />
                  <rect x="10.5" y="0" width="2.5" height="9" rx="0.5" fill="white" />
                  <rect x="18" y="1.5" width="14" height="7" rx="2" stroke="white" strokeWidth="0.8" fill="none" />
                  <rect x="19.5" y="3" width="9.5" height="4" rx="1" fill="#4ADE80" />
                  <rect x="32" y="3" width="1.5" height="3" rx="0.5" fill="white" />
                </g>

                {/* === HEADER (y=30 h=44 center=52) === */}
                <rect x="6" y="30" width="308" height="44" fill="url(#whatsappHeader)" />
                <path d="M18 52l-5-5 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="52" r="14" fill="#25D366" />
                <text x="40" y="52" fill="white" fontSize="14" fontWeight="bold" fontFamily="system-ui" textAnchor="middle" dominantBaseline="central">F</text>
                <text x="60" y="46" fill="white" fontSize="13" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Fin</text>
                <text x="60" y="59" fill="white" fontSize="9" opacity="0.75" fontFamily="system-ui" dominantBaseline="central">en línea</text>
                <circle cx="268" cy="47" r="1.3" fill="white" />
                <circle cx="268" cy="52" r="1.3" fill="white" />
                <circle cx="268" cy="57" r="1.3" fill="white" />

                {/* === DATE CHIP (y=82 h=20 center=92) === */}
                <rect x="122" y="82" width="76" height="20" rx="7" fill="#D1E7DD" opacity="0.85" />
                <text x="160" y="92" fill="#5B7065" fontSize="9" fontFamily="system-ui" fontWeight="500" textAnchor="middle" dominantBaseline="central">HOY</text>

                {/* === MSG 1: USER (y=110 h=34) === */}
                <rect x="116" y="110" width="188" height="34" rx="8" fill="#DCF8C6" />
                <path d="M304 112l6 4-6 2z" fill="#DCF8C6" />
                <text x="128" y="123" fill="#303030" fontSize="11.5" fontFamily="system-ui" dominantBaseline="central">Hoy gasté 45€ en el súper</text>
                <text x="266" y="138" fill="#6B8F71" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:23</text>
                <g transform="translate(289, 135)">
                  <path d="M0 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M3.5 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </g>

                {/* === MSG 2: BOT (y=152 h=62) === */}
                <rect x="14" y="152" width="212" height="62" rx="8" fill="white" />
                <path d="M14 154l-6 4 6 2z" fill="white" />
                <circle cx="32" cy="167" r="8" fill="#25D366" opacity="0.15" />
                <path d="M29 167l2.5 2.5 4-5" stroke="#25D366" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="46" y="167" fill="#303030" fontSize="11" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Gasto registrado</text>
                <text x="28" y="184" fill="#EE5D50" fontSize="12" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">-45,00 €</text>
                <text x="95" y="184" fill="#888" fontSize="9.5" fontFamily="system-ui" dominantBaseline="central">Supermercado</text>
                <text x="28" y="199" fill="#999" fontSize="8" fontFamily="system-ui" dominantBaseline="central">1 mar · Detectado por IA</text>
                <text x="190" y="208" fill="#999" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:23</text>

                {/* === MSG 3: USER (y=222 h=34) === */}
                <rect x="100" y="222" width="204" height="34" rx="8" fill="#DCF8C6" />
                <path d="M304 224l6 4-6 2z" fill="#DCF8C6" />
                <text x="112" y="235" fill="#303030" fontSize="11.5" fontFamily="system-ui" dominantBaseline="central">Me pagaron 2.500€ de nómina</text>
                <text x="266" y="250" fill="#6B8F71" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:25</text>
                <g transform="translate(289, 247)">
                  <path d="M0 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M3.5 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </g>

                {/* === MSG 4: BOT (y=264 h=62) === */}
                <rect x="14" y="264" width="218" height="62" rx="8" fill="white" />
                <path d="M14 266l-6 4 6 2z" fill="white" />
                <circle cx="32" cy="279" r="8" fill="#25D366" opacity="0.15" />
                <path d="M29 279l2.5 2.5 4-5" stroke="#25D366" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="46" y="279" fill="#303030" fontSize="11" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Ingreso registrado</text>
                <text x="28" y="296" fill="#10B981" fontSize="12" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">+2.500,00 €</text>
                <text x="115" y="296" fill="#888" fontSize="9.5" fontFamily="system-ui" dominantBaseline="central">Salario</text>
                <text x="28" y="311" fill="#999" fontSize="8" fontFamily="system-ui" dominantBaseline="central">1 mar · Detectado por IA</text>
                <text x="196" y="320" fill="#999" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:25</text>

                {/* === MSG 5: USER (y=334 h=34) === */}
                <rect x="104" y="334" width="200" height="34" rx="8" fill="#DCF8C6" />
                <path d="M304 336l6 4-6 2z" fill="#DCF8C6" />
                <text x="116" y="347" fill="#303030" fontSize="11.5" fontFamily="system-ui" dominantBaseline="central">¿Cuánto llevo gastado hoy?</text>
                <text x="266" y="362" fill="#6B8F71" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:26</text>
                <g transform="translate(289, 359)">
                  <path d="M0 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M3.5 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </g>

                {/* === MSG 6: BOT SUMMARY (y=376 h=72) === */}
                <rect x="14" y="376" width="232" height="72" rx="8" fill="white" />
                <path d="M14 378l-6 4 6 2z" fill="white" />
                <circle cx="32" cy="391" r="8" fill="#4318FF" opacity="0.12" />
                <path d="M28 395l2.5-3.5 2.5 1.5 3.5-4.5" stroke="#4318FF" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="46" y="391" fill="#303030" fontSize="11" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Resumen de hoy</text>
                <text x="28" y="408" fill="#303030" fontSize="10" fontFamily="system-ui" dominantBaseline="central">Gastos:</text>
                <text x="72" y="408" fill="#EE5D50" fontSize="10.5" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">45,00 €</text>
                <text x="128" y="408" fill="#303030" fontSize="10" fontFamily="system-ui" dominantBaseline="central">Ingresos:</text>
                <text x="182" y="408" fill="#10B981" fontSize="10.5" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">2.500 €</text>
                <rect x="28" y="420" width="192" height="3.5" rx="1.75" fill="#E8E8E8" />
                <rect x="28" y="420" width="175" height="3.5" rx="1.75" fill="#10B981" />
                <text x="28" y="435" fill="#10B981" fontSize="10" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">Balance: +2.455,00 €</text>
                <text x="210" y="442" fill="#999" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:26</text>

                {/* === INPUT BAR (y=460) === */}
                <rect x="6" y="460" width="308" height="94" fill="#F0F0F0" />
                <rect x="16" y="470" width="244" height="36" rx="18" fill="white" />
                {/* Emoji centered at (36, 488) */}
                <circle cx="36" cy="488" r="9" stroke="#9CA3AF" strokeWidth="1.2" fill="none" />
                <circle cx="33" cy="486" r="1" fill="#9CA3AF" />
                <circle cx="39" cy="486" r="1" fill="#9CA3AF" />
                <path d="M33 491a4.5 4.5 0 006 0" stroke="#9CA3AF" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* Placeholder text */}
                <text x="54" y="488" fill="#9CA3AF" fontSize="11" fontFamily="system-ui" dominantBaseline="central">Mensaje</text>
                {/* Clip icon */}
                <g transform="translate(244, 488) rotate(-45)">
                  <path d="M0-7l0 10a3 3 0 006 0l0-12a5 5 0 00-10 0l0 14" stroke="#9CA3AF" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </g>
                {/* Mic button centered at (282, 488) */}
                <circle cx="282" cy="488" r="18" fill="#25D366" />
                <rect x="278.5" y="479" width="7" height="10" rx="3.5" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M276 489a6.5 6.5 0 0013 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <line x1="282" y1="496" x2="282" y2="499" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

                {/* Home indicator */}
                <rect x="126" y="530" width="68" height="4" rx="2" fill="#C8C8C8" />
              </g>

              {/* Dynamic island */}
              <rect x="125" y="8" width="70" height="18" rx="9" fill="#1a1a2e" />
              <circle cx="172" cy="17" r="4" fill="#222240" />
              <circle cx="172" cy="17" r="2.5" fill="#111128" />
            </svg>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { number: "+3.000", label: "Usuarios activos" },
            { number: "+70K", label: "Transacciones procesadas" },
            { number: "98%", label: "Precisión en IA" },
            { number: "24/7", label: "Disponibilidad" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-xl shadow-md text-center border border-gray-100 hover:border-primary hover:shadow-lg transition duration-300 transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
