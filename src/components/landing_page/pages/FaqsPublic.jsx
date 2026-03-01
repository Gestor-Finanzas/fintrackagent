import { useState } from "react";
import PageLayout from "./PageLayout";

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
    a: "Ofrecemos una prueba gratuita de 14 días sin necesidad de tarjeta de crédito. Después puedes elegir entre el plan Mensual (9,99 €/mes) o Anual (99,99 €/año, ahorrando un 17%).",
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
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6 text-center">Preguntas Frecuentes</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-10"></div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
              >
                <span className="text-sm font-semibold text-dark pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            ¿No encuentras lo que buscas? Escríbenos a{" "}
            <a href="mailto:fintrackagent@gmail.com" className="text-primary font-semibold hover:underline">
              fintrackagent@gmail.com
            </a>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
