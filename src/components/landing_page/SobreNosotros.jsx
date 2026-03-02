import PageLayout from "./pages/PageLayout";
import { FaHeart, FaWhatsapp, FaBrain, FaShieldAlt, FaHandshake, FaHeadset, FaBullseye, FaUsers, FaBriefcase } from "react-icons/fa";

const razones = [
  {
    icon: <FaWhatsapp className="w-5 h-5 text-primary" />,
    title: "Simplicidad",
    desc: "Olvídate de hojas de cálculo y apps complejas. Solo necesitas WhatsApp y tu voz o texto.",
  },
  {
    icon: <FaBrain className="w-5 h-5 text-accent" />,
    title: "IA Avanzada",
    desc: "Nuestra inteligencia artificial detecta automáticamente importes, categorías y fechas.",
  },
  {
    icon: <FaShieldAlt className="w-5 h-5 text-primary" />,
    title: "Seguridad y Privacidad",
    desc: "Tus datos están protegidos con cifrado de nivel bancario y nunca se comparten con terceros.",
  },
  {
    icon: <FaHandshake className="w-5 h-5 text-accent" />,
    title: "Transparencia",
    desc: "Sin letra pequeña. Prueba gratis, sin tarjeta, y elige el plan que mejor se adapte a ti.",
  },
  {
    icon: <FaHeadset className="w-5 h-5 text-primary" />,
    title: "Soporte Humano",
    desc: "Nuestro equipo está siempre disponible para ayudarte y escuchar tus sugerencias.",
  },
  {
    icon: <FaBullseye className="w-5 h-5 text-accent" />,
    title: "Precisión",
    desc: "Dashboard profesional con datos organizados para tomar mejores decisiones financieras.",
  },
];

const audiencia = [
  { icon: <FaUsers className="w-5 h-5 text-primary" />, label: "Particulares" },
  { icon: <FaBriefcase className="w-5 h-5 text-accent" />, label: "Autónomos" },
  { icon: <FaBuilding className="w-5 h-5 text-primary" />, label: "Pequeñas empresas" },
];

function FaBuilding(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

export default function SobreNosotros() {
  return (
    <PageLayout>
      <section className="bg-gray-50 relative overflow-hidden">
        {/* Decoración */}
        <div className="absolute top-20 left-0 w-80 h-80 bg-primary opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-0 w-96 h-96 bg-accent opacity-[0.03] rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Conoce al equipo detrás de FinTrack
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              Una plataforma profesional de gestión financiera que te ayuda a tomar el control de tu economía personal y profesional.
            </p>
          </div>

          {/* Misión + Equipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaBullseye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-dark">Nuestra Misión</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Democratizar la gestión financiera, acercando la inteligencia artificial y la automatización a todas las personas y negocios, sin importar su experiencia previa. Queremos que cualquier usuario pueda registrar, analizar y mejorar sus finanzas simplemente enviando un mensaje por WhatsApp.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FaUsers className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-lg font-semibold text-dark">Nuestro Equipo</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                FinTrack está formado por profesionales con experiencia en tecnología, finanzas y atención al cliente. Apostamos por la innovación, la ética y la cercanía con nuestros usuarios.
              </p>
            </div>
          </div>

          {/* ¿Por qué FinTrack? */}
          <div className="mb-10">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-dark mb-2">¿Por qué FinTrack?</h2>
              <p className="text-sm text-gray-500">Lo que nos hace diferentes</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {razones.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-dark">{r.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compromiso + ¿A quién ayudamos? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaShieldAlt className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-dark">Compromiso con la Confianza</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Nos tomamos muy en serio la seguridad y privacidad de tus datos. Aplicamos las mejores prácticas del sector y auditamos nuestros sistemas periódicamente para garantizar la máxima protección.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FaHeart className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-lg font-semibold text-dark">¿A quién ayudamos?</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                FinTrack es ideal para quienes buscan una gestión financiera moderna, sin complicaciones.
              </p>
              <div className="flex flex-wrap gap-2">
                {audiencia.map((a, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-medium text-gray-600"
                  >
                    {a.icon}
                    {a.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA final */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 text-center">
            <p className="text-lg font-bold text-dark mb-1">Gracias por confiar en FinTrack</p>
            <p className="text-sm text-gray-500">Juntos, llevaremos tus finanzas al siguiente nivel</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
