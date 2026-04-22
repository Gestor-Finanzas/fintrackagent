import PageLayout from "./PageLayout";
import { useTranslation } from "react-i18next";
import { FaEnvelope } from "react-icons/fa";

const secciones = [
  {
    title: "Aceptación del servicio",
    text: "Al crear una cuenta en FinTrack o utilizar nuestros servicios, aceptas estos términos y condiciones en su totalidad. El servicio está destinado a uso personal y no nos responsabilizamos de decisiones financieras tomadas a partir de la información mostrada.",
  },
  {
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
    title: "Responsabilidad del usuario",
    items: [
      "El usuario es responsable de la veracidad de los datos introducidos.",
      "Debe mantener la confidencialidad de sus credenciales de acceso.",
      "Se compromete a utilizar el servicio de forma lícita y respetuosa.",
      "No debe intentar acceder a datos de otros usuarios.",
    ],
  },
  {
    title: "Pagos y suscripciones",
    items: [
      "FinTrack ofrece una prueba gratuita de 14 días sin compromiso.",
      "Los pagos se procesan de forma segura a través de proveedores certificados.",
      "Puedes cambiar o cancelar tu plan en cualquier momento.",
      "No se realizan reembolsos por períodos parciales ya consumidos.",
    ],
  },
  {
    title: "Modificaciones",
    text: "FinTrack puede actualizar estos términos en cualquier momento. Los cambios relevantes se notificarán por correo electrónico o mediante aviso en la plataforma con al menos 30 días de antelación.",
  },
  {
    title: "Suspensión y cancelación",
    items: [
      "El uso indebido del servicio puede conllevar la suspensión de la cuenta.",
      "FinTrack se reserva el derecho de cancelar cuentas por incumplimiento.",
      "Tras la cancelación, los datos se conservan durante 12 meses.",
    ],
  },
  {
    title: "Jurisdicción",
    text: "Estos términos se rigen por la legislación española y europea. En caso de conflicto, se buscará una solución amistosa antes de acudir a los tribunales competentes de Málaga, España.",
  },
];

export default function LegalTerminos() {
  const { t } = useTranslation();
  return (
    <PageLayout>
      <section className="bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-5 sm:px-6 py-14 sm:py-16 md:py-20 relative z-10">
          {/* Hero editorial */}
          <div className="max-w-2xl mb-12 md:mb-20">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              {t("legal.eyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
              Términos y <span className="text-primary">condiciones</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              Las condiciones que regulan el uso de FinTrack y nuestros
              servicios. Aquí explicamos con claridad los derechos y
              obligaciones de ambas partes.
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
                    {s.text && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {s.text}
                      </p>
                    )}
                    {s.intro && (
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {s.intro}
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

          {/* Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-start gap-4">
              <FaEnvelope className="w-4 h-4 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-dark mb-1">
                  {t("legal.legalContactTitle")}
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
              <span className="text-xs text-gray-500">
                {t("legal.lastUpdated")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
