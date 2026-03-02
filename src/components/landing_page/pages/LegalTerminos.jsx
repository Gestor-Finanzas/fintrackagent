import PageLayout from "./PageLayout";
import { FaFileContract, FaClipboardList, FaUserCheck, FaCreditCard, FaSyncAlt, FaBan, FaGavel, FaEnvelope } from "react-icons/fa";

const secciones = [
  {
    icon: <FaClipboardList className="w-5 h-5 text-primary" />,
    title: "Aceptación del servicio",
    text: "Al crear una cuenta en FinTrack o utilizar nuestros servicios, aceptas estos términos y condiciones en su totalidad. El servicio está destinado a uso personal y no nos responsabilizamos de decisiones financieras tomadas a partir de la información mostrada.",
  },
  {
    icon: <FaFileContract className="w-5 h-5 text-accent" />,
    title: "Descripción del servicio",
    intro: "FinTrack proporciona:",
    items: [
      "Registro de ingresos y gastos a través de WhatsApp e interfaz web.",
      "Procesamiento automático mediante inteligencia artificial.",
      "Dashboard de visualización y análisis financiero.",
      "Exportación de datos en formato CSV.",
    ],
  },
  {
    icon: <FaUserCheck className="w-5 h-5 text-primary" />,
    title: "Responsabilidad del usuario",
    items: [
      "El usuario es responsable de la veracidad de los datos introducidos.",
      "Debe mantener la confidencialidad de sus credenciales de acceso.",
      "Se compromete a utilizar el servicio de forma lícita y respetuosa.",
      "No debe intentar acceder a datos de otros usuarios.",
    ],
  },
  {
    icon: <FaCreditCard className="w-5 h-5 text-accent" />,
    title: "Pagos y suscripciones",
    items: [
      "FinTrack ofrece una prueba gratuita de 14 días sin compromiso.",
      "Los pagos se procesan de forma segura a través de proveedores certificados.",
      "Puedes cambiar o cancelar tu plan en cualquier momento.",
      "No se realizan reembolsos por períodos parciales ya consumidos.",
    ],
  },
  {
    icon: <FaSyncAlt className="w-5 h-5 text-primary" />,
    title: "Modificaciones",
    text: "FinTrack puede actualizar estos términos en cualquier momento. Los cambios relevantes se notificarán por correo electrónico o mediante aviso en la plataforma con al menos 30 días de antelación.",
  },
  {
    icon: <FaBan className="w-5 h-5 text-accent" />,
    title: "Suspensión y cancelación",
    items: [
      "El uso indebido del servicio puede conllevar la suspensión de la cuenta.",
      "FinTrack se reserva el derecho de cancelar cuentas por incumplimiento.",
      "Tras la cancelación, los datos se conservan durante 12 meses.",
    ],
  },
  {
    icon: <FaGavel className="w-5 h-5 text-primary" />,
    title: "Jurisdicción",
    text: "Estos términos se rigen por la legislación española y europea. En caso de conflicto, se buscará una solución amistosa antes de acudir a los tribunales competentes de Málaga, España.",
  },
];

export default function LegalTerminos() {
  return (
    <PageLayout>
      <section className="bg-gray-50 relative overflow-hidden">
        <div className="absolute top-20 left-0 w-80 h-80 bg-primary opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-0 w-96 h-96 bg-accent opacity-[0.03] rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Las condiciones que regulan el uso de FinTrack y nuestros servicios.
            </p>
          </div>

          {/* Secciones */}
          <div className="flex flex-col gap-5">
            {secciones.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <h2 className="text-base font-semibold text-dark">{s.title}</h2>
                </div>
                {s.text && <p className="text-sm text-gray-500 leading-relaxed">{s.text}</p>}
                {s.intro && <p className="text-sm text-gray-500 mb-3">{s.intro}</p>}
                {s.items && (
                  <ul className="space-y-2">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Contacto + Fecha */}
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FaEnvelope className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">Consultas legales</p>
                <a href="mailto:fintrackagent@gmail.com" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                  fintrackagent@gmail.com
                </a>
              </div>
            </div>
            <span className="text-xs text-gray-400">Última actualización: 1 de marzo de 2026</span>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
