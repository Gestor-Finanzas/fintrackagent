import { useState } from "react";
import { FaCheck, FaGift } from "react-icons/fa";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const monthlyPrice = "2,99€";
  const annualPrice = "36€";

  const features = [
    "Transacciones ilimitadas",
    "Dashboard avanzado con gráficos",
    "Alertas inteligentes personalizadas",
    "Exportar en CSV, PDF, Excel",
    "Análisis profundo de gastos",
    "Soporte por email prioritario",
    "Acceso completo a Fin 24/7",
  ];

  return (
    <section
      id="pricing"
      className="bg-gradient-to-br from-bgLight to-white py-20 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Planes de Suscripción
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto mb-6">
            Comienza gratis y sin compromisos. Prueba{" "}
            <span className="font-semibold text-accent">Fin</span> durante 14
            días con acceso completo, sin tarjeta de crédito. Cuando estés
            listo, elige el plan perfecto para ti.
          </p>
          <div className="inline-block bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-2 border-primary/40 rounded-xl p-0.5 mb-8 hover:border-primary/60 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 px-8 py-4 rounded-lg flex items-center gap-3 justify-center">
              <FaGift className="text-primary text-2xl animate-pulse-soft mr-1" />
              <p className="text-dark font-bold text-lg">
                Acceso Total Gratuito: Primeros 14 días
              </p>
            </div>
          </div>

          {/* Toggle Mensual / Anual */}
          <div className="flex justify-center mt-5">
            <div className="relative bg-gray-200 rounded-full p-1 flex">
              {/* Fondo animado */}
              <div
                className="absolute top-1 bottom-1 left-1 w-32 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg-glow transition-transform duration-500 ease-in-out"
                style={{
                  transform:
                    billingPeriod === "monthly"
                      ? "translateX(0)"
                      : "translateX(100%)",
                }}
              />
              {/* Mensual */}
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`relative z-10 w-32 py-2 text-center font-semibold rounded-full transition-colors duration-300 ${billingPeriod === "monthly"
                  ? "text-white"
                  : "text-secondary hover:text-dark"
                  }`}
              >
                Mensual
              </button>
              {/* Anual */}
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`relative z-10 w-32 py-2 text-center font-semibold rounded-full transition-colors duration-300 ${billingPeriod === "annual"
                  ? "text-white"
                  : "text-secondary hover:text-dark"
                  }`}
              >
                Anual
              </button>
            </div>
          </div>
        </div>

        {/* Single Plan Card */}
        <div className="flex justify-center mb-12 mt-0" data-aos="fade-up">
          <div className="relative group rounded-2xl transition-all duration-300 transform hover:scale-105 bg-white text-dark shadow-lg border border-gray-200 hover:border-primary max-w-xl w-full">
            {billingPeriod === "annual" && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-bold">
                ¡Ahorras 17%!
              </div>
            )}

            <div className="p-10">
              <h3 className="text-3xl font-bold mb-3 text-dark">
                {billingPeriod === "monthly" ? "Plan Mensual" : "Plan Anual"}
              </h3>
              <p className="text-gray-600 mb-6">
                {billingPeriod === "monthly"
                  ? "Flexibilidad de mes a mes"
                  : "El mejor valor - Acceso durante un año"}
              </p>

              <div className="mb-5">
                <span className="text-6xl font-bold text-primary from-primary to-accent bg-clip-text">
                  {billingPeriod === "monthly" ? monthlyPrice : annualPrice}
                </span>
                <span className="text-gray-600 ml-2">
                  {billingPeriod === "monthly" ? "/mes" : "/año"}
                </span>
                {billingPeriod === "annual" && (
                  <p className="text-gray-600 text-sm mt-2 font-semibold">
                    Equivalente a 2,5€ /mes
                  </p>
                )}
              </div>
              <div className="space-y-4 border-t border-gray-200 pt-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FaCheck className="text-primary flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg-glow transition duration-300 transform hover:scale-105 mb-4 mt-10 text-lg">
                Comenzar Ahora
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-secondary mt-12" data-aos="fade-up">
          Todos los planes incluyen acceso completo a Fin, tu agente financiero
          en WhatsApp
        </p>
        <p className="text-center text-secondary" data-aos="fade-up">
          Cancela cuando quieras, sin compromisos.
        </p>
      </div>
    </section>
  );
}
