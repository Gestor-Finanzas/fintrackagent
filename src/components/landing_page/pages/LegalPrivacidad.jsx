import PageLayout from "./PageLayout";
import { FaEnvelope } from "react-icons/fa";

const secciones = [
  {
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
    title: "Cómo usamos tu información",
    items: [
      "Proporcionar y mantener el servicio de FinTrack.",
      "Generar análisis y resúmenes financieros personalizados.",
      "Comunicarte novedades, actualizaciones y soporte técnico.",
      "Mejorar la precisión de nuestra inteligencia artificial.",
    ],
  },
  {
    title: "Protección de datos",
    items: [
      "Cifrado SSL/TLS en todas las comunicaciones.",
      "Contraseñas almacenadas con hash seguro (bcrypt).",
      "Acceso restringido a datos personales dentro del equipo.",
      "Auditorías periódicas de seguridad.",
    ],
  },
  {
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
      <section className="bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-5 sm:px-6 py-14 sm:py-16 md:py-20 relative z-10">
          {/* Hero editorial */}
          <div className="max-w-2xl mb-12 md:mb-20">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              Información legal
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
              Política de <span className="text-primary">privacidad</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              Tu privacidad es nuestra prioridad. Aquí explicamos con claridad
              qué información recopilamos, cómo la utilizamos y qué derechos
              tienes sobre tus datos.
            </p>
          </div>

          {/* Secciones — lista numerada */}
          <div className="mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-10">
              Contenido
            </h2>
            <div className="flex flex-col gap-14">
              {secciones.map((s, i) => (
                <div key={i} className="flex gap-5 md:gap-8">
                  <span className="text-sm font-mono font-semibold text-primary/60 pt-1 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 border-l border-gray-100 pl-5 md:pl-8">
                    <h3 className="text-lg font-semibold text-dark mb-3">
                      {s.title}
                    </h3>
                    {s.intro && (
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {s.intro}
                      </p>
                    )}
                    <ul className="space-y-2.5">
                      {s.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-start gap-4">
              <FaEnvelope className="w-4 h-4 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-dark mb-1">
                  ¿Tienes dudas sobre privacidad?
                </h3>
                <a
                  href="mailto:fintrackagent@gmail.com"
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  fintrackagent@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start md:justify-end">
              <span className="text-xs text-gray-400">
                Última actualización: 1 de marzo de 2026
              </span>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
