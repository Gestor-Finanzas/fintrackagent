import PageLayout from "./PageLayout";
import { FaEnvelope } from "react-icons/fa";

const tipos = [
  {
    label: "Cookies técnicas",
    desc: "Necesarias para el funcionamiento básico de la plataforma: inicio de sesión, navegación y preferencias.",
  },
  {
    label: "Cookies de análisis",
    desc: "Nos permiten medir y analizar cómo utilizas FinTrack para mejorar el servicio (Google Analytics).",
  },
  {
    label: "Cookies de personalización",
    desc: "Adaptan el contenido a tus preferencias de idioma, tema y configuración.",
  },
  {
    label: "Cookies de terceros",
    desc: "Utilizadas por servicios externos integrados en la plataforma.",
  },
];

const navegadores = [
  { name: "Chrome", path: "Configuración → Privacidad y seguridad → Cookies" },
  { name: "Firefox", path: "Preferencias → Privacidad y seguridad" },
  { name: "Safari", path: "Preferencias → Privacidad" },
  { name: "Edge", path: "Configuración → Cookies y permisos del sitio" },
];

const protecciones = [
  "Las cookies no contienen información personal sensible.",
  "Los datos recopilados se tratan de forma anónima y agregada.",
  "Consulta nuestra Política de Privacidad para más detalles.",
];

export default function LegalCookies() {
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
              Política de <span className="text-primary">cookies</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              Explicamos con claridad cómo utilizamos las cookies para mejorar
              tu experiencia, qué tipos empleamos y cómo puedes gestionarlas en
              todo momento.
            </p>
          </div>

          {/* ¿Qué son? */}
          <div className="border-l-2 border-primary pl-6 mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              ¿Qué son las cookies?
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Las cookies son pequeños archivos de texto que se almacenan en tu
              dispositivo cuando visitas un sitio web. Nos permiten mejorar tu
              experiencia, analizar el tráfico y personalizar el contenido que
              te mostramos.
            </p>
          </div>

          {/* Tipos de cookies — lista numerada */}
          <div className="mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-10">
              Tipos de cookies que utilizamos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {tipos.map((t, i) => (
                <div key={i} className="flex gap-5">
                  <span className="text-sm font-mono font-semibold text-primary/60 pt-1 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 border-l border-gray-100 pl-5">
                    <h3 className="text-base font-semibold text-dark mb-2">
                      {t.label}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gestión de preferencias */}
          <div className="mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Gestión de preferencias
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              Puedes gestionar o desactivar las cookies desde la configuración
              de tu navegador:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {navegadores.map((n, i) => (
                <div key={i} className="bg-gray-100 border border-gray-400 rounded-2xl p-5">
                  <p className="text-sm font-semibold text-dark mb-1">{n.name}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{n.path}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Ten en cuenta que desactivar ciertas cookies puede afectar al
              funcionamiento de la plataforma.
            </p>
          </div>

          {/* Protección de datos */}
          <div className="border-l-2 border-gray-200 pl-6 mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">
              Protección de datos
            </h2>
            <ul className="space-y-3">
              {protecciones.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-gray-600 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-start gap-4">
              <FaEnvelope className="w-4 h-4 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-dark mb-1">
                  ¿Dudas sobre cookies?
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
