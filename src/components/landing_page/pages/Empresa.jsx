import PageLayout from "./PageLayout";

export default function Empresa() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6 text-center">Empresa</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-10"></div>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-dark mb-3">Quiénes somos</h2>
          <p className="text-gray-600 leading-relaxed">
            FinTrack es una fintech española fundada en 2024 con la misión de hacer accesible la gestión financiera personal a todo el mundo. Nuestro equipo combina experiencia en inteligencia artificial, desarrollo de software y servicios financieros para crear herramientas que realmente simplifican la vida de nuestros usuarios.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-dark mb-3">Nuestra visión</h2>
          <p className="text-gray-600 leading-relaxed">
            Creemos que la tecnología debe trabajar para las personas, no al revés. Por eso diseñamos FinTrack para integrarse en las herramientas que ya usas a diario, como WhatsApp, en lugar de obligarte a aprender una nueva aplicación.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-dark mb-3">Valores</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></span>
              <span><strong className="text-dark">Transparencia:</strong> Sin costes ocultos ni letra pequeña. Comunicamos con claridad.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></span>
              <span><strong className="text-dark">Seguridad:</strong> Tus datos financieros merecen el máximo nivel de protección.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></span>
              <span><strong className="text-dark">Innovación:</strong> Mejoramos constantemente con IA y nuevas tecnologías.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></span>
              <span><strong className="text-dark">Accesibilidad:</strong> Finanzas para todos, independientemente de su experiencia.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-dark mb-3">Sede</h2>
          <p className="text-gray-600 leading-relaxed">
            Nuestra sede principal está en Málaga, España. Trabajamos de forma remota con colaboradores en toda Europa, lo que nos permite atraer el mejor talento y ofrecer un servicio global.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-dark mb-3">Contacto corporativo</h2>
          <p className="text-gray-600">
            Para consultas empresariales o de prensa, escríbenos a{" "}
            <a href="mailto:fintrackagent@gmail.com" className="text-primary font-semibold hover:underline">
              fintrackagent@gmail.com
            </a>
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
