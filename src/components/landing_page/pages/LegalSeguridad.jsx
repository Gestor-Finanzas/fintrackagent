import PageLayout from "./PageLayout";
import { FaShieldAlt, FaServer, FaClipboardCheck, FaDatabase, FaUserLock, FaBug, FaEnvelope } from "react-icons/fa";

const secciones = [
  {
    icon: <FaShieldAlt className="w-5 h-5 text-primary" />,
    title: "Compromiso con la seguridad",
    text: "En FinTrack, la protección de tus datos financieros es nuestra máxima prioridad. Implementamos medidas avanzadas de seguridad para garantizar la confidencialidad, integridad y disponibilidad de tu información en todo momento.",
  },
  {
    icon: <FaServer className="w-5 h-5 text-accent" />,
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
    icon: <FaClipboardCheck className="w-5 h-5 text-primary" />,
    title: "Auditorías y cumplimiento",
    items: [
      "Auditorías internas trimestrales y externas anuales de seguridad.",
      "Tests de penetración realizados por empresas independientes.",
      "Cumplimiento con GDPR (Reglamento General de Protección de Datos).",
      "Políticas estrictas de acceso basadas en el principio de mínimo privilegio.",
    ],
  },
  {
    icon: <FaDatabase className="w-5 h-5 text-accent" />,
    title: "Protección de datos financieros",
    items: [
      "Los datos financieros se almacenan cifrados en reposo.",
      "Nunca compartimos tu información con terceros sin tu consentimiento.",
      "Los backups se realizan diariamente con cifrado independiente.",
      "Acceso a datos limitado al personal autorizado con supervisión.",
    ],
  },
  {
    icon: <FaUserLock className="w-5 h-5 text-primary" />,
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
      <section className="bg-gray-50 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-accent opacity-[0.03] rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Seguridad en FinTrack
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Conoce las medidas que implementamos para proteger tus datos financieros.
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

          {/* Reporte de vulnerabilidades */}
          <div className="mt-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                <FaBug className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-base font-semibold text-dark">Reporte de vulnerabilidades</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Si detectas una vulnerabilidad o actividad sospechosa, contacta con nuestro equipo de seguridad. Valoramos la divulgación responsable y respondemos en un plazo máximo de 48 horas.
            </p>
          </div>

          {/* Contacto + Fecha */}
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FaEnvelope className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">Equipo de seguridad</p>
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
