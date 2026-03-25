import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockDatos from "../../../mocks/mockDatosEconomicos.json";
import {
  FaCrown, FaTimes, FaShieldAlt, FaLock, FaBolt, FaChartLine, FaHeadset, FaInfinity, FaClock, FaCalendarAlt, FaRedo,
} from "react-icons/fa";

const BILLING_OPTIONS = [
  {
    id: "Mensual",
    label: "Mensual",
    price: "2,99",
    cycle: "mes",
    detail: "35,88 €/año en total",
    popular: false,
    cta: "Suscribirse mensual",
  },
  {
    id: "Anual",
    label: "Anual",
    price: "29,99",
    cycle: "año",
    detail: "Equivale a 2,50 €/mes",
    savings: "Ahorras un 17%",
    popular: true,
    cta: "Suscribirse anual",
  },
];

const PRO_FEATURES = [
  { icon: FaInfinity, text: "Transacciones ilimitadas" },
  { icon: FaChartLine, text: "Gráficos y reportes avanzados" },
  { icon: FaBolt, text: "Asistente IA financiero" },
  { icon: FaHeadset, text: "Soporte prioritario" },
];

const TRUST_ITEMS = [
  { icon: FaShieldAlt, text: "Pagos seguros con cifrado SSL" },
  { icon: FaLock, text: "Tus datos nunca se comparten" },
  { icon: FaTimes, text: "Cancela cuando quieras" },
];

export default function Planes() {
  const navigate = useNavigate();
  const [datos] = useState(mockDatos);
  const [selected, setSelected] = useState("Anual");
  const [modalConfirm, setModalConfirm] = useState(false);

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
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-dash-text mt-2">
          Un solo plan, acceso completo
        </h1>
        <p className="text-sm text-dash-text-secondary mt-2 max-w-lg mx-auto">
          Elige cómo prefieres pagar. Sin sorpresas, sin letras pequeñas.
        </p>
        <p className="text-sm text-dash-text-secondary max-w-lg mx-auto">
          Cancela cuando quieras.
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
              <h3 className="text-sm font-bold text-dash-text">
                {trialDays > 0
                  ? `Tu prueba gratuita termina en ${trialDays} día${trialDays !== 1 ? "s" : ""}`
                  : "Tu prueba gratuita ha expirado"}
              </h3>
              <p className="text-xs text-dash-text-secondary mt-0.5">
                {trialDays > 0
                  ? "Cuando termine, se bloqueará el acceso al dashboard y al asistente IA hasta que elijas un plan."
                  : "El acceso al dashboard y al asistente IA está bloqueado. Elige un plan para continuar."}
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
                <span className="text-xs font-semibold text-dash-text">{trialDays}/14</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* What you get */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-base font-semibold text-dash-text mb-4">Todo lo que incluye</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRO_FEATURES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 p-3 rounded-xl bg-dash-accent/5">
              <Icon className="w-4 h-4 text-dash-accent shrink-0" />
              <span className="text-sm font-medium text-dash-text">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Billing options */}
      <div>
        <h2 className="text-base font-semibold text-dash-text mb-1 text-center">Elige tu forma de pago</h2>
        <p className="text-xs text-dash-text-secondary text-center mb-5">Mismo acceso, distinta frecuencia de cobro</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 pt-3">
          {BILLING_OPTIONS.map((option) => {
            const current = isCurrentBilling(option.id);
            const hasSavings = !!option.savings;
            return (
              <div
                key={option.id}
                className={`relative rounded-2xl shadow-sm border-2 transition-all duration-200 hover:shadow-md hover:scale-[1.03] ${hasSavings
                  ? "border-emerald-500 shadow-emerald-500/10 bg-gradient-to-br from-emerald-50/50 to-white"
                  : "border-dash-border hover:border-gray-300 bg-white"
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
                      <h3 className="text-lg font-bold text-dash-text">Plan {option.label}</h3>
                      <p className="text-xs text-dash-text-secondary">{hasSavings ? "Un solo pago al año" : "Cobro cada mes"}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-dash-text">{option.price}</span>
                    <span className="text-base text-dash-text-secondary font-medium">€/{option.cycle}</span>
                  </div>
                  <p className="text-sm text-dash-text-secondary mt-1">{option.detail}</p>

                  {/* CTA */}
                  <button
                    onClick={() => handleSelect(option.id)}
                    disabled={current}
                    className={`w-full mt-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${current
                      ? "bg-gray-100 text-dash-text-secondary cursor-default"
                      : hasSavings
                        ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg"
                        : "bg-dash-primary text-white hover:bg-dash-primary-hover"
                      }`}
                  >
                    {current ? "Plan actual" : option.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TRUST_ITEMS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-dash-accent/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-dash-accent" />
              </div>
              <p className="text-sm text-dash-text font-medium">{text}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-dash-border mt-5 pt-5 text-center">
          <p className="text-xs text-dash-text-secondary">
            Pagos procesados de forma segura por <span className="font-semibold text-dash-text">Stripe</span>
          </p>
          <div className="flex items-center justify-center gap-3 mt-3 text-dash-text-secondary">
            <svg className="h-5" viewBox="0 0 60 25" fill="currentColor"><rect width="60" height="25" rx="4" opacity="0.1" /><text x="30" y="17" textAnchor="middle" fontSize="10" fontWeight="600" fill="currentColor">VISA</text></svg>
            <svg className="h-5" viewBox="0 0 60 25" fill="currentColor"><rect width="60" height="25" rx="4" opacity="0.1" /><text x="30" y="17" textAnchor="middle" fontSize="10" fontWeight="600" fill="currentColor">MC</text></svg>
            <svg className="h-5" viewBox="0 0 60 25" fill="currentColor"><rect width="60" height="25" rx="4" opacity="0.1" /><text x="30" y="17" textAnchor="middle" fontSize="8" fontWeight="600" fill="currentColor">AMEX</text></svg>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-base font-semibold text-dash-text mb-4">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {[
            {
              q: "¿Qué pasa cuando terminan los 14 días de prueba?",
              a: "Se bloquea el acceso al dashboard y al asistente IA. Tus datos se conservan y podrás acceder a todo de nuevo en cuanto elijas un plan de pago.",
            },
            {
              q: "¿Los dos planes dan el mismo acceso?",
              a: "Sí, ambas opciones desbloquean exactamente las mismas funcionalidades. La única diferencia es la frecuencia de cobro: mensual o anual con descuento.",
            },
            {
              q: "¿Puedo cancelar en cualquier momento?",
              a: "Sí, puedes cancelar tu suscripción cuando quieras desde la sección de facturación. Seguirás teniendo acceso hasta que termine tu período de facturación actual.",
            },
            {
              q: "¿Puedo cambiar entre mensual y anual?",
              a: "Por supuesto. Puedes cambiar tu forma de pago en cualquier momento. El cambio se aplica en tu próximo ciclo de facturación.",
            },
            {
              q: "¿Es seguro el pago?",
              a: "Todos los pagos se procesan a través de Stripe, la plataforma de pagos líder mundial. Nunca almacenamos los datos de tu tarjeta.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-dash-border pb-4 last:border-0 last:pb-0">
              <h3 className="text-sm font-semibold text-dash-text">{q}</h3>
              <p className="text-sm text-dash-text-secondary mt-1">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back link */}
      <div className="text-center pb-2">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-dash-text-secondary hover:text-dash-text transition-colors"
        >
          &larr; Volver
        </button>
      </div>

      {/* Confirm modal */}
      {modalConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm animate-fade-in">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-dash-accent/10 flex items-center justify-center mx-auto mb-3">
                <FaCrown className="w-5 h-5 text-dash-accent" />
              </div>
              <h3 className="text-lg font-bold text-dash-text">Confirmar suscripción</h3>
              <p className="text-sm text-dash-text-secondary mt-2">
                Vas a suscribirte al plan <span className="font-semibold text-dash-text">Pro {selected}</span>.
                {selected === "Anual" ? " Se te cobrarán 29,99 €/año." : " Se te cobrarán 2,99 €/mes."}
              </p>
              <p className="text-xs text-dash-text-secondary mt-2">
                Tendrás acceso completo a todas las funcionalidades de FinTrack.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setModalConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-accent hover:bg-dash-accent/90 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
