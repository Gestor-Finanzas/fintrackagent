import { useState } from "react";
import icons, { availableIcons, getCategoryIcon } from "../../../utils/categoryIcons";
import { coloresCategorias } from "../../../utils/categoriasColors";

const defaultCategories = [
  { name: "Salario", icon: "Salario", type: "ingreso" },
  { name: "Venta", icon: "Venta", type: "ingreso" },
  { name: "Intereses", icon: "Intereses", type: "ingreso" },
  { name: "Freelance", icon: "Freelance", type: "ingreso" },
  { name: "Regalo", icon: "Regalo", type: "ingreso" },
  { name: "Supermercado", icon: "Supermercado", type: "gasto" },
  { name: "Transporte", icon: "Transporte", type: "gasto" },
  { name: "Restaurantes", icon: "Restaurantes", type: "gasto" },
  { name: "Ocio", icon: "Ocio", type: "gasto" },
  { name: "Suscripciones", icon: "Suscripciones", type: "gasto" },
  { name: "Café", icon: "Café", type: "gasto" },
  { name: "Otro", icon: "Otro", type: "gasto" },
];

export default function Categorias() {
  const [categories, setCategories] = useState(defaultCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [form, setForm] = useState({ name: "", icon: "Otro", type: "gasto" });

  const openAdd = () => {
    setForm({ name: "", icon: "Otro", type: "gasto" });
    setEditIndex(null);
    setModalOpen(true);
  };

  const openEdit = (idx) => {
    const cat = categories[idx];
    setForm({ name: cat.name, icon: cat.icon, type: cat.type });
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editIndex !== null) {
      setCategories((prev) => prev.map((c, i) => i === editIndex ? { ...form } : c));
    } else {
      setCategories((prev) => [...prev, { ...form }]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      setCategories((prev) => prev.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
    }
  };

  const ingresos = categories.filter((c) => c.type === "ingreso");
  const gastos = categories.filter((c) => c.type === "gasto");

  const CategoryList = ({ items, title }) => (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-dash-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <h3 className="text-sm font-semibold text-dash-text">{title}</h3>
        <span className="text-xs text-dash-text-secondary ml-1">({items.length})</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((cat) => {
          const globalIdx = categories.indexOf(cat);
          const color = coloresCategorias[globalIdx % coloresCategorias.length];
          return (
            <div
              key={globalIdx}
              className="flex items-center gap-3 p-3 rounded-xl border border-dash-border hover:border-dash-primary/30 transition-colors duration-150 group"
            >
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: color + "1A", color }}
              >
                {getCategoryIcon(cat.icon, 18)}
              </span>
              <span className="flex-1 text-sm font-medium text-dash-text truncate">
                {cat.name}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <button
                  onClick={() => openEdit(globalIdx)}
                  className="p-1.5 rounded-lg text-dash-text-secondary hover:text-dash-accent hover:bg-dash-accent/5 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => setDeleteIndex(globalIdx)}
                  className="p-1.5 rounded-lg text-dash-text-secondary hover:text-dash-danger hover:bg-red-50 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-dash-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <h1 className="text-2xl font-bold text-dash-text">Categorías</h1>
          </div>
          <p className="text-sm text-dash-text-secondary mt-1">
            Gestiona las categorías de tus ingresos y gastos
          </p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-dash-primary hover:bg-dash-primary-hover transition-colors duration-150 flex items-center gap-1.5 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nueva categoría
        </button>
      </div>

      <CategoryList items={ingresos} title="Categorías de ingresos" />
      <CategoryList items={gastos} title="Categorías de gastos" />

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
            <div className="flex items-center justify-between p-6 pb-0">
              <h3 className="text-lg font-semibold text-dash-text">
                {editIndex !== null ? "Editar categoría" : "Nueva categoría"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg text-dash-text-secondary hover:text-dash-text hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-dash-text-secondary uppercase tracking-wider mb-1.5 block">Nombre</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej: Educación"
                  className="w-full px-3 py-2 rounded-xl border border-dash-border text-sm text-dash-text focus:outline-none focus:ring-2 focus:ring-dash-accent/20 focus:border-dash-accent"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-dash-text-secondary uppercase tracking-wider mb-1.5 block">Tipo</label>
                <div className="flex gap-2">
                  {["ingreso", "gasto"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, type: t })}
                      className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150 ${
                        form.type === t
                          ? t === "ingreso" ? "bg-emerald-50 text-dash-success border border-dash-success/30" : "bg-red-50 text-dash-danger border border-dash-danger/30"
                          : "bg-white text-dash-text-secondary border border-dash-border hover:bg-gray-50"
                      }`}
                    >
                      {t === "ingreso" ? "Ingreso" : "Gasto"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-dash-text-secondary uppercase tracking-wider mb-2 block">Icono</label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {availableIcons.map((iconName) => (
                    <button
                      key={iconName}
                      onClick={() => setForm({ ...form, icon: iconName })}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors duration-150 ${
                        form.icon === iconName
                          ? "bg-dash-accent/10 border border-dash-accent text-dash-accent"
                          : "border border-dash-border text-dash-text-secondary hover:bg-gray-50 hover:border-dash-primary/30"
                      }`}
                      title={iconName}
                    >
                      {icons[iconName](18)}
                      <span className="text-[9px] leading-tight truncate w-full text-center">{iconName}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={!form.name.trim()}
                className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-dash-primary hover:bg-dash-primary-hover disabled:opacity-40 transition-colors duration-150"
              >
                {editIndex !== null ? "Guardar cambios" : "Crear categoría"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm animate-fade-in">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
              <svg className="w-6 h-6 text-dash-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dash-text text-center mb-2">Eliminar categoría</h3>
            <p className="text-sm text-dash-text-secondary text-center mb-6">
              ¿Eliminar <strong>{categories[deleteIndex]?.name}</strong>? Los movimientos existentes con esta categoría no se verán afectados.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteIndex(null)} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-danger hover:bg-red-600 transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
