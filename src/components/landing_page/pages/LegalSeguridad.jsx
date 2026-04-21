import PageLayout from "./PageLayout";
import { FaEnvelope } from "react-icons/fa";

const secciones = [
  {
    title: "Compromiso con la seguridad",
    text: "En FinTrack, la protección de tus datos financieros es nuestra máxima prioridad. Implementamos medidas avanzadas de seguridad para garantizar la confidencialidad, integridad y disponibilidad de tu información en todo momento.",
  },
  {
    title: "Tecnologías y protocolos",
    items: [
      "Cifrado SSL/TLS en todas las comunicaciones entre usuario y servidor.",
      "Contraseñas almacenadas mediante algoritmos de hash robustos (bcrypt, Argon2).",
      "Autenticación multifactor (MFA) disponible para mayor protección.",
      "Monitorización activa 24/7 de accesos y actividades sospechosas.",
      "Actualizaciones periódicas de software y parches de seguridad.",
      "Infraestructura alojada en centros de datos certificados ISO 27001.",
    ],
  },
  {
    title: "Auditorías y cumplimiento",
    items: [
      "Auditorías internas trimestrales y externas anuales de seguridad.",
      "Tests de penetración realizados por empresas independientes.",
      "Cumplimiento con GDPR (Reglamento General de Protección de Datos).",
      "Políticas estrictas de acceso basadas en el principio de mínimo privilegio.",
    ],
  },
  {
    title: "Protección de datos financieros",
    items: [
      "Los datos financieros se almacenan cifrados en reposo.",
      "Nunca compartimos tu información con terceros sin tu consentimiento.",
      "Los backups se realizan diariamente con cifrado independiente.",
      "Acceso a datos limitado al personal autorizado con supervisión.",
    ],
  },
  {
    title: "Recomendaciones para usuarios",
    items: [
      "Utiliza una contraseña única y robusta (mínimo 12 caracteres).",
      "Activa la autenticación multifactor cuando esté disponible.",
      "No compartas tus credenciales de acceso con terceros.",
      "Cierra sesión al utilizar dispositivos compartidos.",
      "Reporta cualquier actividad sospechosa inmediatamente.",
    ],
  },
];

export default function LegalSeguridad() {
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
              Seguridad en <span className="text-primary">FinTrack</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              Conoce las medidas técnicas y organizativas que implementamos para
              proteger tus datos financieros, con estándares equivalentes a los
              del sector bancario.
            </p>
          </div>

          {/* Secciones — lista numerada */}
          <div className="mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-10">
              Nuestras medidas
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
                    {s.text && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {s.text}
                      </p>
                    )}
                    {s.items && (
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
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reporte de vulnerabilidades */}
          <div className="border-l-2 border-gray-200 pl-6 mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">
              Reporte de vulnerabilidades
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Si detectas una vulnerabilidad o actividad sospechosa, contacta
              con nuestro equipo de seguridad. Valoramos la divulgación
              responsable y respondemos en un plazo máximo de 48 horas.
            </p>
          </div>

          {/* Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-start gap-4">
              <FaEnvelope className="w-4 h-4 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-dark mb-1">
                  Equipo de seguridad
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
