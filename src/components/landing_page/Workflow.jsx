import {
  FaUserPlus,
  FaWhatsapp,
  FaMicrophone,
  FaBrain,
  FaChartBar,
  FaFileCsv,
} from "react-icons/fa";

export default function Workflow() {
  const steps = [
    {
      icon: <FaUserPlus size={40} className="text-white" />,
      step: 1,
      title: "Crea tu Cuenta",
      desc: "Regístrate con tu correo electrónico o sincroniza directamente con WhatsApp. Verificación instantánea sin complicaciones.",
    },
    {
      icon: <FaWhatsapp size={40} className="text-white" />,
      step: 2,
      title: "Vincula WhatsApp",
      desc: "Conecta tu número de WhatsApp con FinTrack en segundos. Fin, tu agente financiero virtual, estará listo para interactuar 24/7.",
    },
    {
      icon: <FaMicrophone size={40} className="text-white" />,
      step: 3,
      title: "Registra Transacciones",
      desc: 'Envía tus gastos e ingresos por texto natural o nota de voz. Ejemplos: "Comida 15€", "Nómina 2000€" o mensaje de voz.',
    },
    {
      icon: <FaBrain size={40} className="text-white" />,
      step: 4,
      title: "IA Analiza",
      desc: "Nuestro motor de IA procesa tu mensaje en tiempo real: detecta monto, categoría, tipo de transacción y fecha automáticamente.",
    },
    {
      icon: <FaChartBar size={40} className="text-white" />,
      step: 5,
      title: "Visualiza en Tiempo Real",
      desc: "Accede al dashboard profesional con gráficos interactivos, tendencias mensuales, análisis por categoría y comparativas.",
    },
    {
      icon: <FaFileCsv size={40} className="text-white" />,
      step: 6,
      title: "Exporta y Comparte",
      desc: "Descarga tus datos en CSV, PDF o Excel para auditoría contable, análisis avanzado o integración con otros sistemas.",
    },
  ];

  return (
    <section
      id="workflow"
      className="bg-gradient-to-br from-dark to-secondary py-24 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cómo Funciona <span className="text-primary">Fin</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-accent">Fin</span> simplifica la
            gestión financiera en 6 pasos intuitivos. Desde el registro hasta la
            obtención de insights personalizados, todo está diseñado para que
            controles tus finanzas de forma eficiente conversando con Fin en
            WhatsApp.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((s) => (
            <div
              key={s.step}
              className="group relative flex flex-col items-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-primary transition-all duration-300 transform hover:scale-105 text-center cursor-pointer overflow-visible"
              data-aos="fade-up"
              data-aos-delay={s.step * 100}
            >
              {/* Efecto de brillo al pasar el mouse */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-10 transition duration-300 rounded-2xl"></div>

              <div className="relative z-10 mb-4 w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center group-hover:shadow-lg-glow transition duration-300">
                {s.icon}
              </div>

              <div className="relative z-10 text-primary text-2xl font-bold mb-3 group-hover:text-accent transition">
                Paso {s.step}
              </div>

              <h3 className="relative z-10 text-xl font-bold text-white mb-3 group-hover:text-primary transition">
                {s.title}
              </h3>
              <p className="relative z-10 text-gray-300 leading-relaxed group-hover:text-gray-200 transition">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Líneas conectoras */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 5 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Línea 1 a 2 */}
          <line
            x1="33%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Línea 2 a 3 */}
          <line
            x1="66%"
            y1="50%"
            x2="83%"
            y2="50%"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Línea de conexión 3 a 4 en forma de S */}
          <path
            d="M 83% 50% Q 90% 50% 90% 65% Q 90% 80% 33% 80% L 33% 80%"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Línea 4 a 5 */}
          <line
            x1="50%"
            y1="80%"
            x2="66%"
            y2="80%"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Línea 5 a 6 */}
          <line
            x1="83%"
            y1="80%"
            x2="100%"
            y2="80%"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
