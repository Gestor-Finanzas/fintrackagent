import { useState } from "react";
import { FaCheck, FaGift, FaBan, FaInfinity, FaPiggyBank } from "react-icons/fa";

export default function Pricing({ onAuthClick }) {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const monthlyPrice = "2,99€";
  const annualPrice = "30€";

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
    <section id="pricing" className="bg-white py-14 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mb-10 md:mb-12" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            Precios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
            Un plan, todas las{" "}
            <span className="text-primary">funcionalidades</span>.
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Comienza gratis y sin compromisos. Prueba Fin durante 14 días con
            acceso completo, sin tarjeta de crédito. Elige después el formato
            que mejor se adapte a ti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Izquierda: trial highlight */}
          <div className="lg:col-span-2" data-aos="fade-up">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-8">
              Prueba gratuita
            </h3>
            <div className="flex flex-col gap-7">
              {[
                {
                  icon: FaGift,
                  title: "14 días gratis",
                  desc: "Acceso total a la plataforma. Sin tarjeta de crédito ni compromisos.",
                },
                {
                  icon: FaBan,
                  title: "Cancela cuando quieras",
                  desc: "Flexibilidad total. Sin penalizaciones ni letra pequeña.",
                },
                {
                  icon: FaInfinity,
                  title: "Todas las funcionalidades",
                  desc: "Un único plan con acceso completo a todas las herramientas.",
                },
              ].map((b, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <b.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-dark mb-1.5">
                      {b.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Derecha: card del plan */}
          <div className="lg:col-span-3" data-aos="fade-up" data-aos-delay="100">
            {/* Toggle con efecto deslizante */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative inline-flex bg-gray-100 rounded-xl p-1">
                <div
                  className="absolute top-1 bottom-1 w-24 rounded-lg bg-dark transition-transform duration-300 ease-out"
                  style={{
                    transform:
                      billingPeriod === "annual"
                        ? "translateX(6rem)"
                        : "translateX(0)",
                  }}
                />
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={`relative z-10 w-24 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    billingPeriod === "monthly"
                      ? "text-white"
                      : "text-gray-500 hover:text-dark"
                  }`}
                >
                  Mensual
                </button>
                <button
                  onClick={() => setBillingPeriod("annual")}
                  className={`relative z-10 w-24 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    billingPeriod === "annual"
                      ? "text-white"
                      : "text-gray-500 hover:text-dark"
                  }`}
                >
                  Anual
                </button>
              </div>
              {billingPeriod === "annual" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-primary animate-fade-in">
                  <FaPiggyBank className="w-3.5 h-3.5" />
                  Ahorra un 17% con el plan anual
                </span>
              )}
            </div>

            <div className="bg-gray-100 border border-gray-400 rounded-2xl p-6 sm:p-10">
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                  {billingPeriod === "monthly" ? "Plan mensual" : "Plan anual"}
                </h3>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-dark">
                    {billingPeriod === "monthly" ? monthlyPrice : annualPrice}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {billingPeriod === "monthly" ? "/mes" : "/año"}
                  </span>
                </div>
                {billingPeriod === "annual" && (
                  <p className="text-sm text-gray-500 mt-2">
                    Equivalente a 2,50€ al mes
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-8 pt-6 border-t border-gray-300">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FaCheck className="text-primary flex-shrink-0 w-3.5 h-3.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onAuthClick}
                className="w-full bg-primary text-white py-3.5 px-6 rounded-xl font-semibold text-sm hover:bg-dark transition-colors duration-200"
              >
                Comenzar ahora
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                Incluye acceso completo a Fin en WhatsApp. Sin compromisos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
