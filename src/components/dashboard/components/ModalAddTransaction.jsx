import { useState } from "react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { formatFechaMock } from "../hooks/useDashboardData";

const categorias = {
  ingreso: ["Salario", "Venta", "Intereses", "Freelance", "Regalo", "Otro"],
  gasto: ["Supermercado", "Transporte", "Restaurantes", "Ocio", "Suscripciones", "Café", "Otro"],
};

export default function ModalAddTransaction({ isOpen, onClose, onAdd, defaultType }) {
  const [tipo, setTipo] = useState(defaultType || "ingreso");
  const [categoria, setCategoria] = useState("");
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(new Date());

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
    setFecha(new Date());
    onClose();
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-dash-border text-sm text-dash-text focus:outline-none focus:ring-2 focus:ring-dash-accent/20 focus:border-dash-accent transition-colors duration-150";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-between p-6 pb-0">
          <h3 className="text-lg font-semibold text-dash-text">Nuevo movimiento</h3>
          <button onClick={onClose} className="text-dash-text-secondary hover:text-dash-text transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">Tipo</label>
            <select value={tipo} onChange={(e) => { setTipo(e.target.value); setCategoria(""); }} className={inputClass}>
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">Categoría</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className={inputClass} required>
              <option value="">Seleccionar...</option>
              {categorias[tipo].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">Descripción</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Opcional" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">Cantidad (€)</label>
            <input type="number" step="0.01" min="0.01" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="0,00" className={inputClass} required />
          </div>
          <div>
            <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">Fecha</label>
            <DatePicker
              selected={fecha}
              onChange={(d) => setFecha(d)}
              dateFormat="dd-MM-yyyy"
              locale={es}
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-2.5 rounded-xl text-sm font-medium text-white bg-dash-primary hover:bg-dash-primary-hover transition-colors duration-150"
          >
            Añadir movimiento
          </button>
        </form>
      </div>
    </div>
  );
}
