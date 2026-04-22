import { useState } from "react";
import DatePicker from "react-datepicker";
import { es, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";
import { formatFechaMock } from "../hooks/useDashboardData";
import { categoriasByTipo as categorias } from "../../../config/categories";
import useEscapeKey from "../../../hooks/useEscapeKey";

const todayMidnight = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export default function ModalAddTransaction({ isOpen, onClose, onAdd, defaultType }) {
  const { t, i18n } = useTranslation();
  const dateLocale = i18n.language?.startsWith("en") ? enUS : es;
  const [tipo, setTipo] = useState(defaultType || "ingreso");
  const [categoria, setCategoria] = useState("");
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(todayMidnight);

  useEscapeKey(onClose, isOpen);
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoria || !monto || !fecha) return;
    onAdd({
      tipo,
      categoria,
      nombre: nombre || categoria,
      monto: String(parseFloat(monto).toFixed(2)),
      fecha: formatFechaMock(fecha),
    });
    setCategoria("");
    setNombre("");
    setMonto("");
    setFecha(todayMidnight());
    onClose();
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-add-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 w-full max-w-md animate-fade-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-1">
              {t("dashboard.transactions.registryEyebrow")}
            </span>
            <h3 id="modal-add-title" className="text-xl font-bold text-dark">{t("dashboard.transactions.new")}</h3>
          </div>
          <button onClick={onClose} aria-label={t("common.close")} className="text-gray-400 hover:text-dark transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">{t("common.type")}</label>
            <select value={tipo} onChange={(e) => { setTipo(e.target.value); setCategoria(""); }} className={inputClass}>
              <option value="ingreso">{t("common.income")}</option>
              <option value="gasto">{t("common.expense")}</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">{t("common.category")}</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className={inputClass} required>
              <option value="">{t("dashboard.transactions.selectPlaceholder")}</option>
              {categorias[tipo].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">{t("common.description")}</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={t("dashboard.transactions.optional")} className={inputClass} />
          </div>
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">{t("dashboard.transactions.amountLabel")}</label>
            <input type="number" step="0.01" min="0.01" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="0,00" className={inputClass} required />
          </div>
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">{t("common.date")}</label>
            <DatePicker
              selected={fecha}
              onChange={(d) => setFecha(d)}
              dateFormat="dd-MM-yyyy"
              locale={dateLocale}
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-dark hover:bg-primary transition-colors"
          >
            {t("dashboard.transactions.addCta")}
          </button>
        </form>
      </div>
    </div>
  );
}
