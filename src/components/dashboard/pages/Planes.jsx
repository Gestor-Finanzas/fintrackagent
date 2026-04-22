import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import mockDatos from "../../../mocks/mockDatosEconomicos.json";
import { formatNumber } from "../../../utils/globalUtils";
import {
  FaCrown, FaTimes, FaShieldAlt, FaLock, FaBolt, FaChartLine, FaHeadset, FaInfinity, FaClock, FaCalendarAlt, FaRedo,
} from "react-icons/fa";

export default function Planes() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const [datos] = useState(mockDatos);
  const [selected, setSelected] = useState("Anual");
  const [modalConfirm, setModalConfirm] = useState(false);

  // Opciones de facturación. Los textos se traducen en tiempo de render para
  // respetar el idioma activo — no declararlos como constantes fuera del componente.
  const BILLING_OPTIONS = [
    {
      id: "Mensual",
      label: t("plans.billingOptions.monthly.label"),
      price: formatNumber(2.99, lang),
      cycle: t("plans.billingOptions.monthly.cycle"),
      detail: t("plans.billingOptions.monthly.detail"),
      popular: false,
      cta: t("plans.billingOptions.monthly.cta"),
    },
    {
      id: "Anual",
      label: t("plans.billingOptions.annual.label"),
      price: formatNumber(29.99, lang),
      cycle: t("plans.billingOptions.annual.cycle"),
      detail: t("plans.billingOptions.annual.detail"),
      savings: t("plans.billingOptions.annual.savings"),
      popular: true,
      cta: t("plans.billingOptions.annual.cta"),
    },
  ];

  const PRO_FEATURES = [
    { icon: FaInfinity, text: t("plans.features.unlimited") },
    { icon: FaChartLine, text: t("plans.features.charts") },
    { icon: FaBolt, text: t("plans.features.aiAssistant") },
    { icon: FaHeadset, text: t("plans.features.prioritySupport") },
  ];

  const TRUST_ITEMS = [
    { icon: FaShieldAlt, text: t("plans.trust.ssl") },
    { icon: FaLock, text: t("plans.trust.privacy") },
    { icon: FaTimes, text: t("plans.trust.cancel") },
  ];

  const FAQS = [
    { q: t("plans.faqs.q1"), a: t("plans.faqs.a1") },
    { q: t("plans.faqs.q2"), a: t("plans.faqs.a2") },
    { q: t("plans.faqs.q3"), a: t("plans.faqs.a3") },
    { q: t("plans.faqs.q4"), a: t("plans.faqs.a4") },
    { q: t("plans.faqs.q5"), a: t("plans.faqs.a5") },
  ];

  const isFree = datos.tarifa === "Gratis";
  const isCurrentBilling = (id) => datos.tarifa === id;

  const daysLeft = isFree
    ? Math.max(0, Math.ceil((new Date(datos.fechaFin) - new Date()) / 86400000))
    : 0;
  const trialDays = Math.min(daysLeft, 14);

  const handleSelect = (id) => {
    if (isCurrentBilling(id)) return;
    setSelected(id);
    setModalConfirm(true);
  };

  const handleConfirm = () => {
    setModalConfirm(false);
    navigate("/dashboard/facturacion");
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      {/* Editorial header */}
      <div>
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
          {t("dashboardPages.planEyebrow")}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
          {t("dashboardPages.planTitle")} <span className="text-primary">{t("dashboardPages.planAccent")}</span>.
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-lg">
          {t("dashboardPages.planSubtitle")}
        </p>
      </div>

      {/* Trial banner (solo si está en plan gratis) */}
      {isFree && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <FaClock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-dark">
                {trialDays > 0
                  ? t("plans.trialEnds", { count: trialDays })
                  : t("plans.trialExpired")}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {trialDays > 0
                  ? t("plans.trialDescActive")
                  : t("plans.trialDescExpired")}
              </p>
            </div>
            {trialDays > 0 && (
              <div className="flex items-center gap-2 w-full sm:w-auto sm:shrink-0">
                <div className="flex-1 sm:flex-none sm:w-24 h-2 rounded-full bg-amber-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${trialDays <= 3 ? "bg-red-500" : trialDays <= 7 ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${(trialDays / 14) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-dark">{trialDays}/14</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* What you get */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-dark mb-4">{t("plans.whatIncludes")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRO_FEATURES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5">
              <Icon className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm font-medium text-dark">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Billing options */}
      <div>
        <h2 className="text-base font-semibold text-dark mb-1 text-center">{t("plans.chooseBilling")}</h2>
        <p className="text-xs text-gray-500 text-center mb-5">{t("plans.sameAccess")}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 pt-3">
          {BILLING_OPTIONS.map((option) => {
            const current = isCurrentBilling(option.id);
            const hasSavings = !!option.savings;
            return (
              <div
                key={option.id}
                className={`relative rounded-2xl shadow-sm border-2 transition-all duration-200 hover:shadow-md hover:scale-[1.03] ${hasSavings
                  ? "border-emerald-500 shadow-emerald-500/10 bg-gradient-to-br from-emerald-50/50 to-white"
                  : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
              >
                {hasSavings && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-sm">
                    {option.savings}
                  </div>
                )}
                <div className="p-6">
                  {/* Icon + title */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${hasSavings ? "bg-emerald-100" : "bg-gray-100"}`}>
                      {hasSavings
                        ? <FaCalendarAlt className="w-4.5 h-4.5 text-emerald-600" />
                        : <FaRedo className="w-4 h-4 text-gray-500" />
                      }
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark">{t("plans.planName", { name: option.label })}</h3>
                      <p className="text-xs text-gray-500">{hasSavings ? t("plans.billingYearOnce") : t("plans.billingMonthly")}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-dark">{option.price}</span>
                    <span className="text-base text-gray-500 font-medium">€/{option.cycle}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{option.detail}</p>

                  {/* CTA */}
                  <button
                    onClick={() => handleSelect(option.id)}
                    disabled={current}
                    className={`w-full mt-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${current
                      ? "bg-gray-100 text-gray-500 cursor-default"
                      : hasSavings
                        ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg"
                        : "bg-dark text-white hover:bg-primary"
                      }`}
                  >
                    {current ? t("plans.currentPlanBtn") : option.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TRUST_ITEMS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-dark font-medium">{text}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-5 pt-5 text-center">
          <p className="text-xs text-gray-500">
            {t("plans.trustBy")} <span className="font-semibold text-dark">Stripe</span>
          </p>
          <div className="flex items-center justify-center gap-3 mt-3 text-gray-500">
            <svg className="h-5" viewBox="0 0 60 25" fill="currentColor"><rect width="60" height="25" rx="4" opacity="0.1" /><text x="30" y="17" textAnchor="middle" fontSize="10" fontWeight="600" fill="currentColor">VISA</text></svg>
            <svg className="h-5" viewBox="0 0 60 25" fill="currentColor"><rect width="60" height="25" rx="4" opacity="0.1" /><text x="30" y="17" textAnchor="middle" fontSize="10" fontWeight="600" fill="currentColor">MC</text></svg>
            <svg className="h-5" viewBox="0 0 60 25" fill="currentColor"><rect width="60" height="25" rx="4" opacity="0.1" /><text x="30" y="17" textAnchor="middle" fontSize="8" fontWeight="600" fill="currentColor">AMEX</text></svg>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-dark mb-4">{t("plans.faqTitle")}</h2>
        <div className="space-y-4">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
              <h3 className="text-sm font-semibold text-dark">{q}</h3>
              <p className="text-sm text-gray-500 mt-1">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back link */}
      <div className="text-center pb-2">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-dark transition-colors"
        >
          &larr; {t("plans.back")}
        </button>
      </div>

      {/* Confirm modal */}
      {modalConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm animate-fade-in">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <FaCrown className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-dark">{t("plans.confirmModal.title")}</h3>
              <p className="text-sm text-gray-500 mt-2">
                {t("plans.confirmModal.bodyStart")}{" "}
                <span className="font-semibold text-dark">Pro {selected}</span>.
                {" "}
                {selected === "Anual"
                  ? t("plans.confirmModal.bodyAnnual")
                  : t("plans.confirmModal.bodyMonthly")}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {t("plans.confirmModal.bodyEnd")}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setModalConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {t("plans.confirmModal.cancel")}
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                {t("plans.confirmModal.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
