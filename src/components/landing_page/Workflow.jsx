export default function Workflow() {
  const steps = [
    {
      title: "Crea tu cuenta",
      desc: "Regístrate con tu correo electrónico y verifica en segundos, sin complicaciones.",
    },
    {
      title: "Vincula WhatsApp",
      desc: "Conecta tu número de WhatsApp. Fin, tu agente financiero, estará disponible 24/7.",
    },
    {
      title: "Registra transacciones",
      desc: 'Envía mensajes naturales como "Comida 15€" o "Nómina 2.000€". También por voz.',
    },
    {
      title: "IA analiza al momento",
      desc: "Nuestro motor detecta monto, categoría, tipo y fecha de forma automática.",
    },
    {
      title: "Visualiza en tiempo real",
      desc: "Dashboard profesional con gráficos, tendencias mensuales y comparativas.",
    },
    {
      title: "Exporta y comparte",
      desc: "Descarga tus datos en CSV para auditoría, análisis avanzado o contabilidad.",
    },
  ];

  return (
    <section
      id="workflow"
      className="bg-dark py-14 sm:py-20 md:py-24 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mb-14" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            Cómo funciona
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            De un mensaje a{" "}
            <span className="text-primary">datos accionables</span>.
          </h2>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed">
            Fin simplifica la gestión financiera en seis pasos, diseñados para
            que controles tus finanzas conversando con naturalidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex gap-5"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <span className="text-sm font-mono font-semibold text-primary pt-1 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 border-l border-white/10 pl-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
