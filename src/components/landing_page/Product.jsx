import {
  FaRobot,
  FaWhatsapp,
  FaShieldAlt,
  FaLightbulb,
  FaUsers,
  FaExchangeAlt,
  FaBullseye,
  FaClock,
} from "react-icons/fa";

export default function Product() {
  const features = [
    {
      icon: FaRobot,
      title: "IA inteligente",
      desc: "Detección automática de importes, categorías y fechas en cada mensaje.",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp nativo",
      desc: "Usa la app que ya tienes. No descargues nada más, solo escribe en WhatsApp.",
    },
    {
      icon: FaShieldAlt,
      title: "100% seguro",
      desc: "Encriptación de nivel bancario. Tus datos son solo tuyos, siempre.",
    },
    {
      icon: FaLightbulb,
      title: "Recomendaciones",
      desc: "Insights personalizados sobre tus hábitos de gasto y ahorro.",
    },
  ];

  const stats = [
    { number: "+3.000", label: "Usuarios activos", icon: FaUsers },
    { number: "+70K", label: "Transacciones procesadas", icon: FaExchangeAlt },
    { number: "98%", label: "Precisión en IA", icon: FaBullseye },
    { number: "24/7", label: "Disponibilidad", icon: FaClock },
  ];

  return (
    <section
      id="product"
      className="bg-white py-14 sm:py-16 md:py-20 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mb-8 md:mb-10" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            El producto
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
            Conoce a tu agente <span className="text-primary">Fin</span>.
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Una plataforma de gestión financiera personal que funciona a través
            de Fin, tu agente inteligente. Conectado a WhatsApp, convierte cada
            mensaje natural en datos estructurados y análisis instantáneos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-14 md:mb-24">
          <div data-aos="fade-right">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              Cómo te ayuda Fin
            </h3>
            <div className="flex flex-col gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-dark mb-1.5">
                      {f.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SVG WhatsApp Chat Illustration */}
          <div data-aos="fade-left" className="relative">
            <div className="absolute inset-0 bg-primary opacity-10 rounded-2xl blur-3xl"></div>
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
                <text x="30" y="18" fill="white" fontSize="10" fontFamily="system-ui" fontWeight="500" dominantBaseline="central">9:41</text>
                <g transform="translate(256, 14)">
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
                <path d="M18 57l-5-5 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <clipPath id="avatarClip">
                  <circle cx="40" cy="52" r="17" />
                </clipPath>
                <image href="/assets/logo.png" x="27" y="40" width="24" height="24" clipPath="url(#avatarClip)" />
                <text x="61" y="46" fill="white" fontSize="13" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Fin</text>
                <text x="61" y="59" fill="white" fontSize="9" opacity="0.75" fontFamily="system-ui" dominantBaseline="central">en línea</text>
                <circle cx="300" cy="47" r="1.3" fill="white" />
                <circle cx="300" cy="52" r="1.3" fill="white" />
                <circle cx="300" cy="57" r="1.3" fill="white" />

                {/* === DATE CHIP (y=82 h=20 center=92) === */}
                <rect x="122" y="82" width="76" height="20" rx="7" fill="#D1E7DD" opacity="0.85" />
                <text x="160" y="92" fill="#5B7065" fontSize="9" fontFamily="system-ui" fontWeight="500" textAnchor="middle" dominantBaseline="central">HOY</text>

                {/* === MSG 1: USER (y=110 h=34) === */}
                <rect x="116" y="110" width="188" height="32" rx="8" fill="#DCF8C6" />
                <path d="M304 120l6 4-6 2z" fill="#DCF8C6" />
                <text x="128" y="123" fill="#303030" fontSize="11.5" fontFamily="system-ui" dominantBaseline="central">Hoy gasté 45€ en el súper</text>
                <text x="260" y="134" fill="#6B8F71" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:23</text>
                <g transform="translate(289, 133)">
                  <path d="M0 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M3.5 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </g>

                {/* === MSG 2: BOT (y=152 h=62) === */}
                <rect x="14" y="152" width="212" height="62" rx="8" fill="white" />
                <path d="M14 162l-6 4 6 2z" fill="white" />
                <circle cx="32" cy="167" r="8" fill="#25D366" opacity="0.15" />
                <path d="M29 167l2.5 2.5 4-5" stroke="#25D366" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="46" y="167" fill="#303030" fontSize="11" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Gasto registrado</text>
                <text x="28" y="184" fill="#EE5D50" fontSize="12" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">-45,00 €</text>
                <text x="95" y="184" fill="#888" fontSize="9.5" fontFamily="system-ui" dominantBaseline="central">Supermercado</text>
                <text x="28" y="199" fill="#999" fontSize="8" fontFamily="system-ui" dominantBaseline="central">1 mar · Detectado por IA</text>
                <text x="190" y="207" fill="#999" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:23</text>

                {/* === MSG 3: USER (y=222 h=34) === */}
                <rect x="100" y="222" width="204" height="32" rx="8" fill="#DCF8C6" />
                <path d="M304 232l6 4-6 2z" fill="#DCF8C6" />
                <text x="112" y="235" fill="#303030" fontSize="11.5" fontFamily="system-ui" dominantBaseline="central">Me pagaron 2.500€ de nómina</text>
                <text x="260" y="248" fill="#6B8F71" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:25</text>
                <g transform="translate(289, 247)">
                  <path d="M0 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M3.5 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </g>

                {/* === MSG 4: BOT (y=264 h=62) === */}
                <rect x="14" y="264" width="218" height="62" rx="8" fill="white" />
                <path d="M14 274l-6 4 6 2z" fill="white" />
                <circle cx="32" cy="279" r="8" fill="#25D366" opacity="0.15" />
                <path d="M29 279l2.5 2.5 4-5" stroke="#25D366" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="46" y="279" fill="#303030" fontSize="11" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Ingreso registrado</text>
                <text x="28" y="296" fill="#10B981" fontSize="12" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">+2.500,00 €</text>
                <text x="115" y="296" fill="#888" fontSize="9.5" fontFamily="system-ui" dominantBaseline="central">Salario</text>
                <text x="28" y="311" fill="#999" fontSize="8" fontFamily="system-ui" dominantBaseline="central">1 mar · Detectado por IA</text>
                <text x="196" y="319" fill="#999" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:25</text>

                {/* === MSG 5: USER (y=334 h=34) === */}
                <rect x="104" y="334" width="200" height="32" rx="8" fill="#DCF8C6" />
                <path d="M304 344l6 4-6 2z" fill="#DCF8C6" />
                <text x="116" y="347" fill="#303030" fontSize="11.5" fontFamily="system-ui" dominantBaseline="central">¿Cuánto llevo gastado hoy?</text>
                <text x="260" y="360" fill="#6B8F71" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:26</text>
                <g transform="translate(289, 359)">
                  <path d="M0 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M3.5 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </g>

                {/* === MSG 6: BOT SUMMARY (y=376 h=72) === */}
                <rect x="14" y="376" width="232" height="72" rx="8" fill="white" />
                <path d="M14 386l-6 4 6 2z" fill="white" />
                <circle cx="32" cy="391" r="8" fill="#1E3A5F" opacity="0.12" />
                <path d="M28 395l2.5-3.5 2.5 1.5 3.5-4.5" stroke="#1E3A5F" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="46" y="391" fill="#303030" fontSize="11" fontWeight="600" fontFamily="system-ui" dominantBaseline="central">Resumen de hoy</text>
                <text x="28" y="408" fill="#303030" fontSize="10" fontFamily="system-ui" dominantBaseline="central">Gastos:</text>
                <text x="72" y="408" fill="#EE5D50" fontSize="10.5" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">45,00 €</text>
                <text x="128" y="408" fill="#303030" fontSize="10" fontFamily="system-ui" dominantBaseline="central">Ingresos:</text>
                <text x="182" y="408" fill="#10B981" fontSize="10.5" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">2.500 €</text>
                <rect x="28" y="420" width="192" height="3.5" rx="1.75" fill="#E8E8E8" />
                <rect x="28" y="420" width="175" height="3.5" rx="1.75" fill="#10B981" />
                <text x="28" y="435" fill="#10B981" fontSize="10" fontWeight="700" fontFamily="system-ui" dominantBaseline="central">Balance: +2.455,00 €</text>
                <text x="210" y="441" fill="#999" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:26</text>

                {/* === MSG 7: USER (y=456 h=32) === */}
                <rect x="130" y="456" width="174" height="32" rx="8" fill="#DCF8C6" />
                <path d="M304 466l6 4-6 2z" fill="#DCF8C6" />
                <text x="142" y="468" fill="#303030" fontSize="11.5" fontFamily="system-ui" dominantBaseline="central">Perfecto, muchas gracias Fin!</text>
                <text x="260" y="482" fill="#6B8F71" fontSize="7.5" fontFamily="system-ui" dominantBaseline="central">10:27</text>
                <g transform="translate(289, 481)">
                  <path d="M0 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M3.5 0l-3 3-1.5-1.5" stroke="#53BDEB" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </g>

                {/* === INPUT BAR (y=495 h=64, field center=520) === */}
                <rect x="6" y="494" width="308" height="64" fill="#F0F0F0" />
                <rect x="16" y="502" width="240" height="36" rx="18" fill="white" />
                {/* Emoji centered at (36, 520) */}
                <circle cx="36" cy="520" r="9" stroke="#9CA3AF" strokeWidth="1.2" fill="none" />
                <circle cx="33" cy="517.5" r="1.1" fill="#9CA3AF" />
                <circle cx="39" cy="517.5" r="1.1" fill="#9CA3AF" />
                <path d="M32.5 522.5a4.5 4.5 0 007 0" stroke="#9CA3AF" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* Placeholder text */}
                <text x="54" y="520" fill="#9CA3AF" fontSize="11" fontFamily="system-ui" dominantBaseline="central">Mensaje</text>
                {/* Clip icon centered at (235, 523) */}
                <g transform="translate(235, 523) rotate(-45)">
                  <path d="M0-7l0 10a3 3 0 006 0l0-12a5 5 0 00-10 0l0 14" stroke="#9CA3AF" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </g>
                {/* Mic button centered at (282, 520) */}
                <circle cx="282" cy="520" r="18" fill="#25D366" />
                <rect x="278.5" y="512" width="7" height="11" rx="3.5" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M276 521a6 6 0 0012 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <line x1="282" y1="527" x2="282" y2="530" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

                {/* Home indicator */}
                <rect x="126" y="545" width="68" height="4" rx="2" fill="#C8C8C8" />
              </g>

              {/* Dynamic island */}
              <rect x="125" y="8" width="70" height="18" rx="9" fill="#1a1a2e" />
              <circle cx="172" cy="17" r="4" fill="#222240" />
              <circle cx="172" cy="17" r="2.5" fill="#111128" />
            </svg>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group rounded-2xl p-5 md:p-6 bg-primary/5 border border-primary/20 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={idx * 80}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <stat.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-primary/70">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark mb-1">
                {stat.number}
              </p>
              <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
