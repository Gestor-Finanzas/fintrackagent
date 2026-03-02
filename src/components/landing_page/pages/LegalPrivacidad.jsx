import PageLayout from "./PageLayout";
import { FaShieldAlt, FaDatabase, FaUserShield, FaBalanceScale, FaEnvelope } from "react-icons/fa";

const secciones = [
  {
    icon: <FaDatabase className="w-5 h-5 text-primary" />,
    title: "Información que recopilamos",
    intro: "En FinTrack recopilamos únicamente la información necesaria para ofrecerte el servicio:",
    items: [
      "Datos de registro: nombre, correo electrónico y contraseña.",
      "Datos financieros: ingresos y gastos que registras voluntariamente.",
      "Datos de uso: interacciones con la plataforma para mejorar la experiencia.",
      "Datos técnicos: tipo de navegador, dirección IP y dispositivo (de forma anonimizada).",
    ],
  },
  {
    icon: <FaUserShield className="w-5 h-5 text-accent" />,
    title: "Cómo usamos tu información",
    items: [
      "Proporcionar y mantener el servicio de FinTrack.",
      "Generar análisis y resúmenes financieros personalizados.",
      "Comunicarte novedades, actualizaciones y soporte técnico.",
      "Mejorar la precisión de nuestra inteligencia artificial.",
    ],
  },
  {
    icon: <FaShieldAlt className="w-5 h-5 text-primary" />,
    title: "Protección de datos",
    items: [
      "Cifrado SSL/TLS en todas las comunicaciones.",
      "Contraseñas almacenadas con hash seguro (bcrypt).",
      "Acceso restringido a datos personales dentro del equipo.",
      "Auditorías periódicas de seguridad.",
    ],
  },
  {
    icon: <FaBalanceScale className="w-5 h-5 text-accent" />,
    title: "Tus derechos (GDPR)",
    intro: "Como usuario, tienes derecho a:",
    items: [
      "Acceder a todos los datos que tenemos sobre ti.",
      "Rectificar información incorrecta o incompleta.",
      "Solicitar la eliminación de tus datos personales.",
      "Exportar tus datos en un formato portable.",
      "Revocar tu consentimiento en cualquier momento.",
    ],
  },
];

export default function LegalPrivacidad() {
  return (
    <PageLayout>
      <section className="bg-gray-50 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent opacity-[0.03] rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Política de Privacidad
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Tu privacidad es nuestra prioridad. Aquí explicamos cómo tratamos tu información.
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
                {s.intro && <p className="text-sm text-gray-500 mb-3">{s.intro}</p>}
                <ul className="space-y-2">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
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
                <p className="text-sm font-semibold text-dark">¿Tienes dudas sobre privacidad?</p>
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
