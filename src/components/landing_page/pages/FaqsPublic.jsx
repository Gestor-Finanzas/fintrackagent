import { useState } from "react";
import PageLayout from "./PageLayout";
import { FaEnvelope } from "react-icons/fa";

const faqs = [
  {
    q: "¿Qué es FinTrack?",
    a: "FinTrack es una plataforma de gestión financiera personal que te permite registrar tus ingresos y gastos a través de WhatsApp. Nuestro agente de IA, Fin, procesa tus mensajes y los convierte en datos organizados que puedes visualizar en un dashboard profesional.",
  },
  {
    q: "¿Cómo funciona el registro por WhatsApp?",
    a: "Simplemente envía un mensaje a nuestro número de WhatsApp con tu gasto o ingreso en lenguaje natural (por ejemplo: 'Gasté 30€ en restaurante'). Nuestra IA detectará automáticamente el importe, la categoría y la fecha.",
  },
  {
    q: "¿Es seguro compartir mis datos financieros?",
    a: "Sí. Utilizamos cifrado SSL/TLS en todas las comunicaciones, almacenamos contraseñas con algoritmos robustos (bcrypt) y cumplimos con la normativa GDPR. Tus datos nunca se comparten con terceros.",
  },
  {
    q: "¿Cuánto cuesta FinTrack?",
    a: "Ofrecemos una prueba gratuita de 14 días sin necesidad de tarjeta de crédito. Después puedes elegir entre el plan Mensual (2,99 €/mes) o Anual (30 €/año, ahorrando un 17%).",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí, puedes cancelar tu suscripción en cualquier momento desde la sección de Facturación en tu dashboard. Mantendrás el acceso hasta el final del período facturado y tus datos se conservarán durante 12 meses.",
  },
  {
    q: "¿Qué categorías están disponibles?",
    a: "FinTrack incluye categorías predefinidas como Salario, Supermercado, Transporte, Restaurantes, Ocio, Suscripciones y más. Además, puedes crear, editar y eliminar categorías personalizadas desde la sección de Categorías.",
  },
  {
    q: "¿Puedo exportar mis datos?",
    a: "Sí, puedes exportar tus movimientos en formato CSV desde cualquier sección del dashboard. Esto te permite analizar tus datos en hojas de cálculo o herramientas externas.",
  },
  {
    q: "¿Funciona en España y otros países?",
    a: "Actualmente FinTrack está optimizado para usuarios en España y la zona euro, pero puede utilizarse desde cualquier país. Los importes se muestran en euros (€).",
  },
];

export default function FaqsPublic() {
  const [open, setOpen] = useState(null);

  return (
    <PageLayout>
      <section className="bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-14 sm:py-16 md:py-20 relative z-10">
          {/* Hero editorial */}
          <div className="max-w-2xl mb-10 md:mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              Preguntas frecuentes
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
              Resolvemos tus <span className="text-primary">dudas</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              Respuestas a las preguntas más comunes sobre FinTrack. Si no
              encuentras lo que buscas, escríbenos directamente.
            </p>
          </div>

          {/* Acordeón */}
          <div className="border-t border-gray-100">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-gray-100">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start gap-5 py-6 text-left group"
                  >
                    <span className="text-sm font-mono font-semibold text-primary/60 pt-0.5 tabular-nums shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-base font-semibold text-dark group-hover:text-primary transition-colors">
                      {faq.q}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 mt-1 shrink-0 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-60" : "max-h-0"
                    }`}
                  >
                    <div className="pl-[3rem] pr-6 pb-6 text-sm text-gray-500 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contacto */}
          <div className="mt-16 flex items-start gap-4 pt-10 border-t border-gray-100">
            <FaEnvelope className="w-4 h-4 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-dark mb-1">
                ¿No encuentras lo que buscas?
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
