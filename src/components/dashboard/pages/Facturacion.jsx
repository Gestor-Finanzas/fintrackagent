import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaCrown, FaCalendarAlt, FaClock, FaFileInvoiceDollar,
  FaCheck, FaExclamationCircle, FaDownload, FaCreditCard,
  FaExchangeAlt, FaTimesCircle,
} from "react-icons/fa";
import mockFacturas from "../../../mocks/mockFacturas.json";
import mockDatos from "../../../mocks/mockDatosEconomicos.json";
import { formatEuro, formatNumber, formatearFecha } from "../../../utils/globalUtils";

export default function Facturacion() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const [datos] = useState(mockDatos);
  const [facturas] = useState(mockFacturas);
  const [modalCancel, setModalCancel] = useState(false);

  useEffect(() => {
    if (datos.tarifa === "Gratis") navigate("/dashboard/planes", { replace: true });
  }, [datos.tarifa, navigate]);

  const planPriceNum = datos.tarifa === "Mensual" ? 2.99 : datos.tarifa === "Anual" ? 29.99 : 0;
  const planPrice = formatNumber(planPriceNum, lang);
  const planCycle = datos.tarifa === "Mensual"
    ? t("billing.cyclePerMonth")
    : datos.tarifa === "Anual"
      ? t("billing.cyclePerYear")
      : "";

  const totalFacturado = facturas.reduce((sum, f) => sum + f.importe, 0);
  const totalPagado = facturas.filter((f) => f.estado === "Pagada").reduce((sum, f) => sum + f.importe, 0);
  const totalPendiente = totalFacturado - totalPagado;

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      {/* Editorial header */}
      <div>
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
          {t("dashboardPages.billingEyebrow")}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
          {t("dashboardPages.billingTitle")}
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          {t("dashboardPages.billingSubtitle")}
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FaCrown className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                  {t("billing.currentPlan")}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${datos.estadoCuenta === "Activa" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                  {datos.estadoCuenta === "Activa"
                    ? t("billing.statusActive")
                    : t("billing.statusInactive")}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-dark">{t("billing.planPro", { tier: datos.tarifa })}</h2>
              {datos.tarifa !== "Gratis" && (
                <p className="text-sm text-gray-500 mt-1">{planPrice} €/{planCycle}</p>
              )}
            </div>
            <button
              onClick={() => navigate("/dashboard/planes")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-dark text-white hover:bg-primary transition-colors shrink-0"
            >
              <FaExchangeAlt className="w-3 h-3" />
              {t("billing.changePlan")}
            </button>
          </div>
        </div>

        {/* Subscription Timeline */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <FaCalendarAlt className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{t("billing.startDate")}</p>
                <p className="text-sm font-semibold text-dark">{formatearFecha(datos.fechaInicio)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <FaClock className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{t("billing.nextCharge")}</p>
                <p className="text-sm font-semibold text-dark">{formatearFecha(datos.proximaFechaCobro)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <FaCalendarAlt className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{t("billing.endDate")}</p>
                <p className="text-sm font-semibold text-dark">{formatearFecha(datos.fechaFin)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment method + Cancel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-dark">{t("billing.paymentMethod")}</h3>
            <button className="text-xs text-primary font-medium hover:underline">{t("billing.changeBtn")}</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
              <FaCreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-dark">•••• •••• •••• 4242</p>
              <p className="text-xs text-gray-500">{t("billing.expires", { date: "12/28" })}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-dark mb-2">{t("billing.cancelTitle")}</h3>
          <p className="text-xs text-gray-500 mb-4">
            {t("billing.cancelDesc")}
          </p>
          <button
            onClick={() => setModalCancel(true)}
            className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            {t("billing.cancelCta")}
          </button>
        </div>
      </div>

      {/* Invoice Summary */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 text-center">
          <p className="text-[10px] sm:text-xs text-gray-500 mb-1 leading-tight">{t("billing.totalBilled")}</p>
          <p className="text-sm sm:text-lg font-bold text-dark break-words whitespace-normal leading-tight">{formatEuro(totalFacturado, lang)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 text-center">
          <p className="text-[10px] sm:text-xs text-gray-500 mb-1 leading-tight">{t("billing.totalPaid")}</p>
          <p className="text-sm sm:text-lg font-bold text-emerald-500 break-words whitespace-normal leading-tight">{formatEuro(totalPagado, lang)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 text-center">
          <p className="text-[10px] sm:text-xs text-gray-500 mb-1 leading-tight">{t("billing.totalPending")}</p>
          <p className="text-sm sm:text-lg font-bold text-amber-500 break-words whitespace-normal leading-tight">{formatEuro(totalPendiente, lang)}</p>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaFileInvoiceDollar className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-dark">{t("billing.historyTitle")}</h3>
            <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {facturas.length}
            </span>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-gray-200">
                <th className="py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">{t("billing.table.number")}</th>
                <th className="py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">{t("billing.table.date")}</th>
                <th className="py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">{t("billing.table.concept")}</th>
                <th className="py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">{t("billing.table.amount")}</th>
                <th className="py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">{t("billing.table.status")}</th>
                <th className="py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">{t("billing.table.pdf")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {facturas.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                  <td className="py-3.5 px-6">
                    <span className="text-sm font-medium text-dark">{f.numero}</span>
                  </td>
                  <td className="py-3.5 px-6 text-sm text-gray-500">{formatearFecha(f.fecha)}</td>
                  <td className="py-3.5 px-6 text-sm text-gray-500">{f.concepto}</td>
                  <td className="py-3.5 px-6 text-sm font-semibold text-dark text-right">{formatEuro(f.importe, lang)}</td>
                  <td className="py-3.5 px-6">
                    <div className="flex justify-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${f.estado === "Pagada"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                        }`}>
                        {f.estado === "Pagada"
                          ? <FaCheck className="w-2.5 h-2.5" />
                          : <FaExclamationCircle className="w-2.5 h-2.5" />
                        }
                        {f.estado === "Pagada"
                          ? t("billing.statusPaid")
                          : t("billing.statusPending")}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="flex justify-center">
                      <button className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors duration-150">
                        <FaDownload className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {facturas.map((f) => (
            <div key={f.id} className="p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${f.estado === "Pagada" ? "bg-emerald-50" : "bg-amber-50"}`}>
                {f.estado === "Pagada"
                  ? <FaCheck className="w-3.5 h-3.5 text-emerald-500" />
                  : <FaExclamationCircle className="w-3.5 h-3.5 text-amber-500" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-dark truncate">{f.concepto}</p>
                  <p className="text-sm font-bold text-dark shrink-0 ml-2">{formatEuro(f.importe, lang)}</p>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs text-gray-500">{f.numero} · {formatearFecha(f.fecha)}</p>
                  <span className={`text-[11px] font-semibold ${f.estado === "Pagada" ? "text-emerald-500" : "text-amber-500"}`}>
                    {f.estado === "Pagada"
                      ? t("billing.statusPaid")
                      : t("billing.statusPending")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel modal */}
      {modalCancel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm animate-fade-in">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                <FaTimesCircle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-dark">{t("billing.cancelModal.title")}</h3>
              <p className="text-sm text-gray-500 mt-2">
                {t("billing.cancelModal.body", { date: formatearFecha(datos.fechaFin) })}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setModalCancel(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {t("billing.cancelModal.keep")}
              </button>
              <button
                onClick={() => setModalCancel(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                {t("billing.cancelModal.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
