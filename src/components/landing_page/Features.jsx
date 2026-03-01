import { FaWhatsapp, FaChartPie, FaLock, FaBell, FaFileCsv, FaMobileAlt } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaWhatsapp size={40} className="text-white" />,
      title: "Registro por WhatsApp",
      desc: "Envía tus gastos e ingresos con texto o voz de forma rápida y natural.",
    },
    {
      icon: <FaChartPie size={40} className="text-white" />,
      title: "Dashboard intuitivo",
      desc: "Visualiza totales mensuales, categorías y gráficos interactivos claros.",
    },
    {
      icon: <FaLock size={40} className="text-white" />,
      title: "Privacidad total",
      desc: "Tus datos permanecen seguros y bajo tu control absoluto.",
    },
    {
      icon: <FaBell size={40} className="text-white" />,
      title: "Alertas inteligentes",
      desc: "Recibe notificaciones sobre tus gastos importantes y límites.",
    },
    {
      icon: <FaFileCsv size={40} className="text-white" />,
      title: "Exportar CSV",
      desc: "Descarga tu historial financiero fácilmente para análisis profundo.",
    },
    {
      icon: <FaMobileAlt size={40} className="text-white" />,
      title: "Multiplataforma",
      desc: "Disponible desde cualquier dispositivo con navegador actualizado.",
    },
  ];

  return (
    <section id="features" className="bg-white py-20 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Características Poderosas
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Todo lo que necesitas para gestionar tus finanzas de forma
            inteligente
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="group p-8 bg-gradient-to-br from-white to-bgLight rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary transition-all duration-300 transform hover:scale-105 text-center cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gradient-to-br from-primary via-primary to-accent bg-opacity-20 rounded-2xl group-hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
                  <div className="text-3xl">{f.icon}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition">
                {f.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
