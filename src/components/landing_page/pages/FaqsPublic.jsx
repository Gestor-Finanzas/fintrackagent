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
      <section className="bg-gray-50 relative overflow-hidden">
        {/* Decoración */}
        <div className="absolute top-20 left-0 w-80 h-80 bg-primary opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent opacity-[0.03] rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto px-6 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Preguntas Frecuentes
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Encuentra respuestas a las dudas más comunes sobre FinTrack.
            </p>
          </div>

          {/* Acordeón */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-colors duration-200 ${isOpen ? "border-primary/30" : "border-gray-100"}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-200 ${isOpen ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}>
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold text-dark">{faq.q}</span>
                    </div>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${isOpen ? "bg-primary/10" : "bg-gray-50"}`}>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60" : "max-h-0"}`}
                  >
                    <div className="px-5 pb-5 pl-[4.25rem] text-sm text-gray-500 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 text-center">
            <p className="text-sm font-semibold text-dark mb-1">¿No encuentras lo que buscas?</p>
            <p className="text-xs text-gray-500 mb-4">Nuestro equipo estará encantado de ayudarte.</p>
            <a
              href="mailto:fintrackagent@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-dark hover:border-primary hover:text-primary transition-colors duration-200"
            >
              <FaEnvelope className="w-3.5 h-3.5" />
              fintrackagent@gmail.com
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
