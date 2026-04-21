import PageLayout from "./PageLayout";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaBalanceScale,
  FaUsers,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

const valores = [
  {
    icon: FaBalanceScale,
    title: "Transparencia",
    desc: "Sin costes ocultos ni letra pequeña. Comunicamos con claridad en cada interacción.",
  },
  {
    icon: FaUsers,
    title: "Accesibilidad",
    desc: "Diseñamos herramientas financieras para todos, independientemente de su experiencia previa.",
  },
  {
    icon: FaRocket,
    title: "Innovación",
    desc: "Apostamos por la inteligencia artificial y las tecnologías más avanzadas del sector.",
  },
  {
    icon: FaShieldAlt,
    title: "Seguridad",
    desc: "Aplicamos estándares bancarios para proteger la información que confías en nosotros.",
  },
];

const stats = [
  { value: "2025", label: "Año de fundación" },
  { value: "+2.000", label: "Usuarios activos" },
  { value: "24/7", label: "Disponibilidad" },
  { value: "100%", label: "Equipo europeo" },
];

export default function Empresa() {
  return (
    <PageLayout>
      <section className="bg-white relative overflow-hidden">
        {/* Decoración muy sutil */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-14 sm:py-16 md:py-20 relative z-10">
          {/* Hero editorial */}
          <div className="max-w-2xl mb-12 md:mb-20">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              Sobre nosotros
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
              Construimos la gestión financiera{" "}
              <span className="text-primary">del futuro</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              FinTrack es una fintech española con la misión de acercar la
              gestión financiera personal a todo el mundo, combinando
              inteligencia artificial y simplicidad en una única plataforma.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {stats.map((s, i) => (
              <div key={i} className="bg-gray-100 border border-gray-400 rounded-2xl p-6 md:p-8">
                <p className="text-2xl md:text-3xl font-bold text-dark mb-1">{s.value}</p>
                <p className="text-xs md:text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Quiénes somos + Visión — sin iconos, estilo editorial */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20">
            <div className="border-l-2 border-primary pl-6">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                Quiénes somos
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Un equipo que combina experiencia en inteligencia artificial,
                desarrollo de software y servicios financieros para crear
                herramientas que realmente simplifican la vida de nuestros
                usuarios.
              </p>
            </div>

            <div className="border-l-2 border-gray-200 pl-6">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">
                Nuestra visión
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Creemos que la tecnología debe trabajar para las personas. Por
                eso integramos FinTrack en las herramientas que ya usas a
                diario, como WhatsApp, en lugar de obligarte a aprender una
                nueva aplicación.
              </p>
            </div>
          </div>

          {/* Valores con iconos */}
          <div className="mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-8 sm:mb-10">
              Nuestros valores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {valores.map((v, i) => (
                <div
                  key={i}
                  className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-dark transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center mb-5 group-hover:bg-dark group-hover:border-dark transition-colors">
                    <v.icon className="w-4 h-4 text-dark group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-dark mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sede + Contacto — minimalista */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="w-4 h-4 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-dark mb-1">Sede</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Málaga, España · Equipo distribuido en toda Europa
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="w-4 h-4 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-dark mb-1">
                  Contacto corporativo
                </h3>
                <a
                  href="mailto:fintrackagent@gmail.com"
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  fintrackagent@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
