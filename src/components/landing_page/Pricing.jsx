import { useState } from "react";
import { FaCheck, FaGift, FaBan, FaInfinity, FaPiggyBank } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const BILLING_STORAGE_KEY = "fintrack_billing_preference";

export default function Pricing({ onAuthClick }) {
  const { t } = useTranslation();
  const [billingPeriod, setBillingPeriod] = useState(() => {
    try {
      const saved = localStorage.getItem(BILLING_STORAGE_KEY);
      return saved === "annual" || saved === "monthly" ? saved : "monthly";
    } catch {
      return "monthly";
    }
  });

  const updateBillingPeriod = (value) => {
    setBillingPeriod(value);
    try {
      localStorage.setItem(BILLING_STORAGE_KEY, value);
    } catch {
      /* modo incógnito u otro bloqueo: silenciar */
    }
  };

  const monthlyPrice = "2,99€";
  const annualPrice = "30€";

  const features = [
    t("pricing.features.unlimited"),
    t("pricing.features.advancedDashboard"),
    t("pricing.features.alerts"),
    t("pricing.features.export"),
    t("pricing.features.analysis"),
    t("pricing.features.support"),
    t("pricing.features.access247"),
  ];

  const benefits = [
    { icon: FaGift, title: t("pricing.benefit1Title"), desc: t("pricing.benefit1Desc") },
    { icon: FaBan, title: t("pricing.benefit2Title"), desc: t("pricing.benefit2Desc") },
    { icon: FaInfinity, title: t("pricing.benefit3Title"), desc: t("pricing.benefit3Desc") },
  ];

  return (
    <section id="pricing" className="bg-white py-14 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mb-10 md:mb-12" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            {t("pricing.eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
            {t("pricing.titleStart")}{" "}
            <span className="text-primary">{t("pricing.titleAccent")}</span>.
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-10 lg:gap-16 items-start">
          {/* Izquierda: trial highlight */}
          <div className="md:col-span-2" data-aos="fade-up">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-8">
              {t("pricing.trialTitle")}
            </h3>
            <div className="flex flex-col gap-7">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-4">
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
          <div className="md:col-span-3" data-aos="fade-up" data-aos-delay="100">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
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
                  onClick={() => updateBillingPeriod("monthly")}
                  className={`relative z-10 w-24 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    billingPeriod === "monthly"
                      ? "text-white"
                      : "text-gray-500 hover:text-dark"
                  }`}
                >
                  {t("pricing.monthly")}
                </button>
                <button
                  onClick={() => updateBillingPeriod("annual")}
                  className={`relative z-10 w-24 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    billingPeriod === "annual"
                      ? "text-white"
                      : "text-gray-500 hover:text-dark"
                  }`}
                >
                  {t("pricing.annual")}
                </button>
              </div>
              {billingPeriod === "annual" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-primary animate-fade-in">
                  <FaPiggyBank className="w-3.5 h-3.5" />
                  {t("pricing.savings")}
                </span>
              )}
            </div>

            <div className="bg-gray-100 border border-gray-400 rounded-2xl p-6 sm:p-10">
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                  {billingPeriod === "monthly" ? t("pricing.planMonthly") : t("pricing.planAnnual")}
                </h3>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-dark">
                    {billingPeriod === "monthly" ? monthlyPrice : annualPrice}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {billingPeriod === "monthly" ? t("pricing.perMonth") : t("pricing.perYear")}
                  </span>
                </div>
                {billingPeriod === "annual" && (
                  <p className="text-sm text-gray-500 mt-2">
                    {t("pricing.equivalentTo")}
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-8 pt-6 border-t border-gray-300">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <FaCheck className="text-primary flex-shrink-0 w-3.5 h-3.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onAuthClick}
                className="w-full bg-primary text-white py-3.5 px-6 rounded-xl font-semibold text-sm hover:bg-dark transition-colors duration-200"
              >
                {t("pricing.cta")}
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                {t("pricing.ctaNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
