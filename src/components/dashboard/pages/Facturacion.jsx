import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCrown, FaCalendarAlt, FaClock, FaFileInvoiceDollar,
  FaCheck, FaExclamationCircle, FaDownload, FaCreditCard,
  FaExchangeAlt, FaTimesCircle,
} from "react-icons/fa";
import mockFacturas from "../../../mocks/mockFacturas.json";
import mockDatos from "../../../mocks/mockDatosEconomicos.json";
import { formatEuro, formatearFecha } from "../../../utils/globalUtils";

export default function Facturacion() {
  const navigate = useNavigate();
  const [datos] = useState(mockDatos);
  const [facturas] = useState(mockFacturas);
  const [modalCancel, setModalCancel] = useState(false);

  useEffect(() => {
    if (datos.tarifa === "Gratis") navigate("/dashboard/planes", { replace: true });
  }, [datos.tarifa, navigate]);

  const planPrice = datos.tarifa === "Mensual" ? "2,99" : datos.tarifa === "Anual" ? "29,99" : "0";
  const planCycle = datos.tarifa === "Mensual" ? "mes" : datos.tarifa === "Anual" ? "año" : "";

  const totalFacturado = facturas.reduce((sum, f) => sum + f.importe, 0);
  const totalPagado = facturas.filter((f) => f.estado === "Pagada").reduce((sum, f) => sum + f.importe, 0);
  const totalPendiente = totalFacturado - totalPagado;

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-dash-text">Facturación</h1>
        <p className="text-sm text-dash-text-secondary mt-1">Gestiona tu suscripción, método de pago y facturas</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-dash-primary to-dash-accent p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaCrown className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-medium uppercase tracking-wider text-white/70">Plan actual</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${datos.estadoCuenta === "Activa" ? "bg-emerald-400/20 text-emerald-200" : "bg-red-400/20 text-red-200"}`}>
                  {datos.estadoCuenta}
                </span>
              </div>
              <h2 className="text-2xl font-bold">Plan Pro — {datos.tarifa}</h2>
              {datos.tarifa !== "Gratis" && (
                <p className="text-white/60 text-sm mt-1">{planPrice} €/{planCycle}</p>
              )}
            </div>
            <button
              onClick={() => navigate("/dashboard/planes")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white/15 text-white backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-colors duration-150 shrink-0"
            >
              <FaExchangeAlt className="w-3 h-3" />
              Cambiar plan
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
                <p className="text-xs text-dash-text-secondary">Fecha de inicio</p>
                <p className="text-sm font-semibold text-dash-text">{formatearFecha(datos.fechaInicio)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <FaClock className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs text-dash-text-secondary">Próximo cobro</p>
                <p className="text-sm font-semibold text-dash-text">{formatearFecha(datos.proximaFechaCobro)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <FaCalendarAlt className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-dash-text-secondary">Fin del período</p>
                <p className="text-sm font-semibold text-dash-text">{formatearFecha(datos.fechaFin)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment method + Cancel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-dash-text">Método de pago</h3>
            <button className="text-xs text-dash-accent font-medium hover:underline">Cambiar</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
              <FaCreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-dash-text">•••• •••• •••• 4242</p>
              <p className="text-xs text-dash-text-secondary">Expira 12/28</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-dash-text mb-2">Cancelar suscripción</h3>
          <p className="text-xs text-dash-text-secondary mb-4">
            Mantendrás el acceso hasta el fin del período actual.
          </p>
          <button
            onClick={() => setModalCancel(true)}
            className="text-xs font-medium text-dash-danger hover:text-red-700 transition-colors"
          >
            Cancelar suscripción
          </button>
        </div>
      </div>

      {/* Invoice Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <p className="text-xs text-dash-text-secondary mb-1">Total facturado</p>
          <p className="text-lg font-bold text-dash-text">{formatEuro(totalFacturado)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <p className="text-xs text-dash-text-secondary mb-1">Pagado</p>
          <p className="text-lg font-bold text-emerald-500">{formatEuro(totalPagado)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <p className="text-xs text-dash-text-secondary mb-1">Pendiente</p>
          <p className="text-lg font-bold text-amber-500">{formatEuro(totalPendiente)}</p>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaFileInvoiceDollar className="w-4 h-4 text-dash-text-secondary" />
            <h3 className="text-sm font-semibold text-dash-text">Historial de facturas</h3>
            <span className="text-[11px] font-medium text-dash-text-secondary bg-gray-100 px-2 py-0.5 rounded-full">
              {facturas.length}
            </span>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-dash-border">
                <th className="py-3 px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">Nº Factura</th>
                <th className="py-3 px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">Fecha</th>
                <th className="py-3 px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">Concepto</th>
                <th className="py-3 px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider text-right">Importe</th>
                <th className="py-3 px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">Estado</th>
                <th className="py-3 px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider text-center">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dash-border">
              {facturas.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                  <td className="py-3.5 px-6">
                    <span className="text-sm font-medium text-dash-text">{f.numero}</span>
                  </td>
                  <td className="py-3.5 px-6 text-sm text-dash-text-secondary">{formatearFecha(f.fecha)}</td>
                  <td className="py-3.5 px-6 text-sm text-dash-text-secondary">{f.concepto}</td>
                  <td className="py-3.5 px-6 text-sm font-semibold text-dash-text text-right">{formatEuro(f.importe)}</td>
                  <td className="py-3.5 px-6">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${f.estado === "Pagada"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                      }`}>
                      {f.estado === "Pagada"
                        ? <FaCheck className="w-2.5 h-2.5" />
                        : <FaExclamationCircle className="w-2.5 h-2.5" />
                      }
                      {f.estado}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <button className="p-2 rounded-lg text-dash-text-secondary hover:text-dash-accent hover:bg-dash-accent/5 transition-colors duration-150">
                      <FaDownload className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-dash-border">
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
                  <p className="text-sm font-medium text-dash-text truncate">{f.concepto}</p>
                  <p className="text-sm font-bold text-dash-text shrink-0 ml-2">{formatEuro(f.importe)}</p>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs text-dash-text-secondary">{f.numero} · {formatearFecha(f.fecha)}</p>
                  <span className={`text-[11px] font-semibold ${f.estado === "Pagada" ? "text-emerald-500" : "text-amber-500"}`}>
                    {f.estado}
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
                <FaTimesCircle className="w-5 h-5 text-dash-danger" />
              </div>
              <h3 className="text-lg font-bold text-dash-text">Cancelar suscripción</h3>
              <p className="text-sm text-dash-text-secondary mt-2">
                ¿Estás seguro? Mantendrás el acceso hasta el <span className="font-semibold text-dash-text">{formatearFecha(datos.fechaFin)}</span>. Después se bloqueará el dashboard y el asistente IA.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setModalCancel(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors"
              >
                Mantener plan
              </button>
              <button
                onClick={() => setModalCancel(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-danger hover:bg-red-600 transition-colors"
              >
                Cancelar plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
