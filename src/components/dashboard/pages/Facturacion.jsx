import { useState } from "react";
import mockFacturas from "../../../mocks/mockFacturas.json";
import mockDatos from "../../../mocks/mockDatosEconomicos.json";
import { formatEuro, formatearFecha } from "../../../utils/globalUtils";

export default function Facturacion() {
  const [datos, setDatos] = useState(mockDatos);
  const [facturas] = useState(mockFacturas);
  const [modalGestion, setModalGestion] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const [nuevaTarifa, setNuevaTarifa] = useState(datos.tarifa);

  const handleCambiarPlan = () => {
    setDatos({ ...datos, tarifa: nuevaTarifa });
    setModalConfirm(false);
    setModalGestion(false);
  };

  const handleCancelar = () => {
    setDatos({ ...datos, estadoCuenta: "Cancelada" });
    setModalCancel(false);
    setModalGestion(false);
  };

  const planPrice = datos.tarifa === "Mensual" ? "9,99" : "99,99";
  const planCycle = datos.tarifa === "Mensual" ? "mes" : "año";

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-dash-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h1 className="text-2xl font-bold text-dash-text">Facturación</h1>
        </div>
        <p className="text-sm text-dash-text-secondary mt-1">Gestiona tu suscripción y facturas</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-dash-primary to-dash-accent p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider opacity-80">Plan actual</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  datos.estadoCuenta === "Activa" ? "bg-white/20 text-white" : "bg-red-400/30 text-white"
                }`}>
                  {datos.estadoCuenta}
                </span>
              </div>
              <h2 className="text-3xl font-bold">{datos.tarifa}</h2>
              <p className="text-white/70 text-sm mt-1">
                {planPrice} €/{planCycle}
              </p>
            </div>
            <button
              onClick={() => setModalGestion(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium bg-white text-dash-primary hover:bg-white/90 transition-colors duration-150 shrink-0"
            >
              Gestionar plan
            </button>
          </div>
        </div>

        {/* Subscription Timeline */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-dash-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-dash-text-secondary">Fecha de inicio</p>
                <p className="text-sm font-semibold text-dash-text">{formatearFecha(datos.fechaInicio)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-dash-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-dash-text-secondary">Próximo cobro</p>
                <p className="text-sm font-semibold text-dash-text">{formatearFecha(datos.proximaFechaCobro)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-dash-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-dash-text-secondary">Fin del período</p>
                <p className="text-sm font-semibold text-dash-text">{formatearFecha(datos.fechaFin)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 pb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-dash-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-sm font-semibold text-dash-text">Historial de facturas</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-dash-border">
                <th className="py-3 px-3 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider hidden md:table-cell">Nº Factura</th>
                <th className="py-3 px-3 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">Fecha</th>
                <th className="py-3 px-3 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider hidden md:table-cell">Concepto</th>
                <th className="py-3 px-3 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider text-right">Importe</th>
                <th className="py-3 px-3 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">Estado</th>
                <th className="py-3 px-3 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider text-center hidden md:table-cell">Descargar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dash-border">
              {facturas.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-3 px-3 sm:px-6 hidden md:table-cell">
                    <span className="text-sm font-medium text-dash-text">{f.numero}</span>
                  </td>
                  <td className="py-3 px-3 sm:px-6 text-sm text-dash-text">{formatearFecha(f.fecha)}</td>
                  <td className="py-3 px-3 sm:px-6 text-sm text-dash-text-secondary hidden md:table-cell">{f.concepto}</td>
                  <td className="py-3 px-3 sm:px-6 text-sm font-semibold text-dash-text text-right">{formatEuro(f.importe)}</td>
                  <td className="py-3 px-3 sm:px-6">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      f.estado === "Pagada"
                        ? "bg-emerald-50 text-dash-success"
                        : "bg-amber-50 text-dash-warning"
                    }`}>
                      {f.estado === "Pagada" ? (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                        </svg>
                      )}
                      {f.estado}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-6 text-center hidden md:table-cell">
                    <button className="p-2 rounded-lg text-dash-text-secondary hover:text-dash-accent hover:bg-dash-accent/5 transition-colors duration-150">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Subscription Modal */}
      {modalGestion && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
            <div className="flex items-center justify-between p-6 pb-0">
              <h3 className="text-lg font-semibold text-dash-text">Gestionar suscripción</h3>
              <button onClick={() => setModalGestion(false)} className="p-2 rounded-lg text-dash-text-secondary hover:text-dash-text hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <p className="text-sm text-dash-text-secondary">Selecciona el plan que mejor se adapte a ti:</p>
              {[
                { plan: "Mensual", price: "9,99 €/mes", desc: "Flexibilidad total, cancela cuando quieras" },
                { plan: "Anual", price: "99,99 €/año", desc: "Ahorra un 17% respecto al plan mensual" },
              ].map(({ plan, price, desc }) => (
                <label
                  key={plan}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors duration-150 ${
                    nuevaTarifa === plan ? "border-dash-accent bg-dash-accent/5" : "border-dash-border hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={plan}
                    checked={nuevaTarifa === plan}
                    onChange={(e) => setNuevaTarifa(e.target.value)}
                    className="accent-dash-accent mt-0.5"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-dash-text">{plan}</span>
                      {plan === "Anual" && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-dash-success/10 text-dash-success uppercase">Ahorra 17%</span>
                      )}
                    </div>
                    <p className="text-xs text-dash-text-secondary mt-0.5">{desc}</p>
                    <p className="text-sm font-bold text-dash-text mt-1">{price}</p>
                  </div>
                </label>
              ))}
              <button
                onClick={() => {
                  if (nuevaTarifa !== datos.tarifa) setModalConfirm(true);
                  else setModalGestion(false);
                }}
                className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-dash-primary hover:bg-dash-primary-hover transition-colors duration-150"
              >
                Guardar cambios
              </button>
              <button
                onClick={() => setModalCancel(true)}
                className="w-full py-2.5 rounded-xl text-sm font-medium text-dash-danger border border-dash-border hover:bg-red-50 transition-colors duration-150"
              >
                Cancelar suscripción
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Plan Change Modal */}
      {modalConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm animate-fade-in">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 mx-auto mb-4">
              <svg className="w-6 h-6 text-dash-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dash-text text-center mb-2">Confirmar cambio de plan</h3>
            <p className="text-sm text-dash-text-secondary text-center mb-6">
              ¿Deseas cambiar de <strong>{datos.tarifa}</strong> a <strong>{nuevaTarifa}</strong>? El cambio se aplicará en tu próximo ciclo de facturación.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setModalConfirm(false)} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={handleCambiarPlan} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-primary hover:bg-dash-primary-hover transition-colors">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Subscription Modal */}
      {modalCancel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm animate-fade-in">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
              <svg className="w-6 h-6 text-dash-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dash-text text-center mb-2">Cancelar suscripción</h3>
            <p className="text-sm text-dash-text-secondary text-center mb-6">
              Perderás el acceso a todas las funciones premium al finalizar tu período actual. Tus datos se conservarán durante 12 meses.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setModalCancel(false)} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors">
                Volver
              </button>
              <button onClick={handleCancelar} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-danger hover:bg-red-600 transition-colors">
                Cancelar plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
