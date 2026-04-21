import PageLayout from "./pages/PageLayout";
import {
  FaEnvelope,
  FaWhatsapp,
  FaBrain,
  FaShieldAlt,
  FaHandshake,
  FaHeadset,
  FaBullseye,
} from "react-icons/fa";

const razones = [
  {
    icon: FaWhatsapp,
    title: "Simplicidad",
    desc: "Olvídate de hojas de cálculo y apps complejas. Solo necesitas WhatsApp y tu voz o texto.",
  },
  {
    icon: FaBrain,
    title: "IA avanzada",
    desc: "Nuestra inteligencia artificial detecta automáticamente importes, categorías y fechas.",
  },
  {
    icon: FaShieldAlt,
    title: "Seguridad y privacidad",
    desc: "Datos protegidos con cifrado de nivel bancario que nunca se comparten con terceros.",
  },
  {
    icon: FaHandshake,
    title: "Transparencia",
    desc: "Sin letra pequeña. Prueba gratis sin tarjeta y elige el plan que mejor se adapte a ti.",
  },
  {
    icon: FaHeadset,
    title: "Soporte humano",
    desc: "Nuestro equipo está disponible para ayudarte y escuchar tus sugerencias.",
  },
  {
    icon: FaBullseye,
    title: "Precisión",
    desc: "Dashboard profesional con datos organizados para tomar mejores decisiones financieras.",
  },
];

const audiencia = ["Particulares", "Autónomos", "Pequeñas empresas"];

export default function SobreNosotros() {
  return (
    <PageLayout>
      <section className="bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-14 sm:py-16 md:py-20 relative z-10">
          {/* Hero editorial */}
          <div className="max-w-2xl mb-16 sm:mb-20">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              Nuestra historia
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
              El equipo detrás de <span className="text-primary">FinTrack</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              Una plataforma profesional de gestión financiera diseñada para que
              tomes el control de tu economía personal y profesional con
              sencillez.
            </p>
          </div>

          {/* Misión + Equipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16 sm:mb-20">
            <div className="border-l-2 border-primary pl-6">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                Nuestra misión
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Democratizar la gestión financiera acercando la inteligencia
                artificial y la automatización a todas las personas y negocios,
                sin importar su experiencia previa. Queremos que cualquier
                usuario pueda registrar, analizar y mejorar sus finanzas
                simplemente enviando un mensaje por WhatsApp.
              </p>
            </div>
            <div className="border-l-2 border-gray-200 pl-6">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">
                Nuestro equipo
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                FinTrack está formado por profesionales con experiencia en
                tecnología, finanzas y atención al cliente. Apostamos por la
                innovación, la ética y la cercanía con nuestros usuarios.
              </p>
            </div>
          </div>

          {/* Por qué FinTrack */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-8 sm:mb-10">
              Por qué FinTrack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {razones.map((r, i) => (
                <div
                  key={i}
                  className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-dark transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center mb-5 group-hover:bg-dark group-hover:border-dark transition-colors">
                    <r.icon className="w-4 h-4 text-dark group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-dark mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* A quién ayudamos */}
          <div className="mb-16 sm:mb-20 border-l-2 border-gray-200 pl-6">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">
              A quién ayudamos
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              FinTrack es ideal para quienes buscan una gestión financiera
              moderna, sin complicaciones.
            </p>
            <div className="flex flex-wrap gap-3">
              {audiencia.map((a, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-gray-100 border border-gray-300 text-sm font-medium text-gray-700"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="flex items-start gap-4 pt-10 border-t border-gray-100">
            <FaEnvelope className="w-4 h-4 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-dark mb-1">
                Gracias por confiar en FinTrack
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
      </section>
    </PageLayout>
  );
}
