import PageLayout from "./PageLayout";
import { FaBuilding, FaLightbulb, FaMapMarkerAlt, FaEnvelope, FaShieldAlt, FaUsers, FaRocket, FaEye } from "react-icons/fa";

const valores = [
  {
    icon: <FaShieldAlt className="w-5 h-5 text-primary" />,
    title: "Transparencia",
    desc: "Sin costes ocultos ni letra pequeña. Comunicamos con claridad.",
  },
  {
    icon: <FaUsers className="w-5 h-5 text-accent" />,
    title: "Accesibilidad",
    desc: "Finanzas para todos, independientemente de su experiencia.",
  },
  {
    icon: <FaRocket className="w-5 h-5 text-primary" />,
    title: "Innovación",
    desc: "Mejoramos constantemente con IA y nuevas tecnologías.",
  },
  {
    icon: <FaShieldAlt className="w-5 h-5 text-accent" />,
    title: "Seguridad",
    desc: "Tus datos financieros merecen el máximo nivel de protección.",
  },
];

export default function Empresa() {
  return (
    <PageLayout>
      <section className="bg-gray-50 relative overflow-hidden">
        {/* Decoración */}
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-accent opacity-[0.03] rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Conoce FinTrack
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Una fintech española con la misión de hacer accesible la gestión financiera personal a todo el mundo.
            </p>
          </div>

          {/* Quiénes somos + Visión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaUsers className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-dark">Quiénes somos</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                FinTrack es una fintech española fundada en 2024. Nuestro equipo combina experiencia en inteligencia artificial, desarrollo de software y servicios financieros para crear herramientas que realmente simplifican la vida de nuestros usuarios.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FaEye className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-lg font-semibold text-dark">Nuestra visión</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Creemos que la tecnología debe trabajar para las personas, no al revés. Por eso diseñamos FinTrack para integrarse en las herramientas que ya usas a diario, como WhatsApp, en lugar de obligarte a aprender una nueva aplicación.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FaLightbulb className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-dark">Nuestros valores</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {valores.map((v, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-dark">{v.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sede + Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaMapMarkerAlt className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-dark">Sede</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Nuestra sede principal está en Málaga, España. Trabajamos de forma remota con colaboradores en toda Europa, lo que nos permite atraer el mejor talento y ofrecer un servicio global.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaEnvelope className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-dark">Contacto corporativo</h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Para consultas empresariales o de prensa, escríbenos directamente.
              </p>
              <a
                href="mailto:fintrackagent@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-dark hover:border-primary hover:text-primary transition-colors duration-200"
              >
                <FaEnvelope className="w-3.5 h-3.5" />
                fintrackagent@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
