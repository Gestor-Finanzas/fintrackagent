import PageLayout from "./PageLayout";
import { FaCookieBite, FaListUl, FaSlidersH, FaLock, FaEnvelope } from "react-icons/fa";

const tipos = [
  {
    label: "Cookies técnicas",
    desc: "Necesarias para el funcionamiento básico de la plataforma (inicio de sesión, navegación, preferencias).",
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Cookies de análisis",
    desc: "Nos permiten medir y analizar cómo utilizas FinTrack para mejorar el servicio (Google Analytics).",
    color: "bg-accent/10 text-accent",
  },
  {
    label: "Cookies de personalización",
    desc: "Adaptan el contenido a tus preferencias de idioma, tema y configuración.",
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Cookies de terceros",
    desc: "Utilizadas por servicios externos integrados en la plataforma.",
    color: "bg-accent/10 text-accent",
  },
];

const navegadores = [
  { name: "Chrome", path: "Configuración → Privacidad y seguridad → Cookies" },
  { name: "Firefox", path: "Preferencias → Privacidad y seguridad" },
  { name: "Safari", path: "Preferencias → Privacidad" },
  { name: "Edge", path: "Configuración → Cookies y permisos del sitio" },
];

export default function LegalCookies() {
  return (
    <PageLayout>
      <section className="bg-gray-50 relative overflow-hidden">
        <div className="absolute top-20 left-0 w-80 h-80 bg-primary opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent opacity-[0.03] rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Política de Cookies
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Información sobre cómo utilizamos las cookies para mejorar tu experiencia.
            </p>
          </div>

          {/* ¿Qué son? */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                <FaCookieBite className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-base font-semibold text-dark">¿Qué son las cookies?</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten mejorar tu experiencia, analizar el tráfico y personalizar el contenido que te mostramos.
            </p>
          </div>

          {/* Tipos */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                <FaListUl className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-base font-semibold text-dark">Tipos de cookies que utilizamos</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tipos.map((t, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50/70 border border-gray-100">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold mb-2 ${t.color}`}>
                    {t.label}
                  </span>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gestión */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                <FaSlidersH className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-base font-semibold text-dark">Gestión de preferencias</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Puedes gestionar o desactivar las cookies desde la configuración de tu navegador:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {navegadores.map((n, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                  <span className="text-sm font-semibold text-dark w-16 shrink-0">{n.name}</span>
                  <span className="text-xs text-gray-500">{n.path}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Ten en cuenta que desactivar ciertas cookies puede afectar al funcionamiento de la plataforma.
            </p>
          </div>

          {/* Protección */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                <FaLock className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-base font-semibold text-dark">Protección de datos</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                Las cookies no contienen información personal sensible.
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                Los datos recopilados se tratan de forma anónima y agregada.
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                Consulta nuestra Política de Privacidad para más detalles.
              </li>
            </ul>
          </div>

          {/* Contacto + Fecha */}
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FaEnvelope className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">¿Dudas sobre cookies?</p>
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
