import {
  FaWhatsapp,
  FaChartPie,
  FaLock,
  FaBell,
  FaFileCsv,
  FaMobileAlt,
} from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: FaWhatsapp,
      title: "Registro por WhatsApp",
      desc: "Envía tus gastos e ingresos con texto o voz de forma rápida y natural.",
    },
    {
      icon: FaChartPie,
      title: "Dashboard intuitivo",
      desc: "Visualiza totales mensuales, categorías y gráficos interactivos claros.",
    },
    {
      icon: FaLock,
      title: "Privacidad total",
      desc: "Tus datos permanecen seguros y bajo tu control absoluto.",
    },
    {
      icon: FaBell,
      title: "Alertas inteligentes",
      desc: "Recibe notificaciones sobre tus gastos importantes y límites.",
    },
    {
      icon: FaFileCsv,
      title: "Exportar CSV",
      desc: "Descarga tu historial financiero fácilmente para análisis profundo.",
    },
    {
      icon: FaMobileAlt,
      title: "Multiplataforma",
      desc: "Disponible desde cualquier dispositivo con navegador actualizado.",
    },
  ];

  return (
    <section id="features" className="bg-white py-14 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mb-10 md:mb-12" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            Características
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
            Todo lo que necesitas para gestionar tus{" "}
            <span className="text-primary">finanzas</span>.
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Herramientas pensadas para ofrecer control, claridad y sencillez. Un
            producto que se adapta a tu ritmo, no al revés.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-dark transition-colors duration-200"
              data-aos="fade-up"
              data-aos-delay={idx * 60}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:border-primary transition-colors">
                <f.icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base font-semibold text-dark mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
