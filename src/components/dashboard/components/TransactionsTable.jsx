import { useState, useMemo } from "react";
import { formatEuro, parseMonto, exportToCSV } from "../../../utils/globalUtils";
import { parseFechaMock } from "../hooks/useDashboardData";
import { getCategoryIcon } from "../../../utils/categoryIcons";
import { coloresCategorias } from "../../../utils/categoriasColors";
import ModalAddTransaction from "./ModalAddTransaction";
import ModalEditTransaction from "./ModalEditTransaction";
import ModalConfirmDelete from "./ModalConfirmDelete";
import { FaPen, FaTrash } from "react-icons/fa";

const POR_PAGINA = 10;

// Map category names to stable color indices
const categoryColorCache = {};
let colorIndex = 0;
function getCategoryColor(cat) {
  if (!(cat in categoryColorCache)) {
    categoryColorCache[cat] = coloresCategorias[colorIndex % coloresCategorias.length];
    colorIndex++;
  }
  return categoryColorCache[cat];
}

export default function TransactionsTable({
  movimientos,
  filterType,
  onAdd,
  onEdit,
  onDelete,
  showTypeColumn = true,
}) {
  const [busqueda, setBusqueda] = useState("");
  const [sortField, setSortField] = useState("fecha");
  const [sortDesc, setSortDesc] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(null);
  const [modalDelete, setModalDelete] = useState(null);

  const filtered = useMemo(() => {
    let list = [...movimientos];
    if (filterType) list = list.filter((m) => m.tipo === filterType);
    if (busqueda) {
      const q = busqueda.toLowerCase();
      list = list.filter(
        (m) =>
          (m.nombre || "").toLowerCase().includes(q) ||
          m.categoria.toLowerCase().includes(q) ||
          m.fecha.includes(q)
      );
    }
    list.sort((a, b) => {
      if (sortField === "fecha") {
        const da = parseFechaMock(a.fecha).getTime();
        const db = parseFechaMock(b.fecha).getTime();
        return sortDesc ? db - da : da - db;
      }
      const ma = parseMonto(a.monto);
      const mb = parseMonto(b.monto);
      return sortDesc ? mb - ma : ma - mb;
    });
    return list;
  }, [movimientos, filterType, busqueda, sortField, sortDesc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POR_PAGINA));
  const pageItems = filtered.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const handleSort = (field) => {
    if (sortField === field) setSortDesc(!sortDesc);
    else {
      setSortField(field);
      setSortDesc(true);
    }
    setPagina(1);
  };

  const SortIcon = ({ field }) => (
    <svg
      className={`w-3.5 h-3.5 inline-block ml-1 ${sortField === field ? "text-dash-accent" : "text-dash-text-secondary"}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
    >
      {sortField === field && !sortDesc ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      )}
    </svg>
  );

  const originalIndex = (item) => movimientos.indexOf(item);

  return (
    <div className="bg-white rounded-2xl shadow-sm">
      {/* Header */}
      <div className="p-4 sm:p-6 pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-sm font-semibold text-dash-text">Movimientos</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <svg className="w-4 h-4 text-dash-text-secondary absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
              className="pl-9 pr-3 py-2 rounded-xl border border-dash-border text-sm text-dash-text focus:outline-none focus:ring-2 focus:ring-dash-accent/20 focus:border-dash-accent w-44 transition-colors duration-150"
            />
          </div>
          <button
            onClick={() => exportToCSV(filtered)}
            className="px-3 py-2 rounded-xl text-xs font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors duration-150"
          >
            CSV
          </button>
          <button
            onClick={() => setModalAdd(true)}
            className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-dash-primary hover:bg-dash-primary-hover transition-colors duration-150 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Añadir
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-y border-dash-border">
              <th
                onClick={() => handleSort("fecha")}
                className="py-3 px-4 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider cursor-pointer select-none"
              >
                Fecha <SortIcon field="fecha" />
              </th>
              {showTypeColumn && (
                <th className="py-3 px-4 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">
                  Tipo
                </th>
              )}
              <th className="py-3 px-4 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">
                Descripción
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider">
                Categoría
              </th>
              <th
                onClick={() => handleSort("monto")}
                className="py-3 px-4 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider cursor-pointer select-none text-right"
              >
                Cantidad <SortIcon field="monto" />
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs font-medium text-dash-text-secondary uppercase tracking-wider text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dash-border">
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={showTypeColumn ? 6 : 5} className="py-12 text-center text-sm text-dash-text-secondary">
                  No hay movimientos
                </td>
              </tr>
            ) : (
              pageItems.map((m, i) => {
                const catColor = getCategoryColor(m.categoria);
                return (
                  <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-3 px-4 sm:px-6 text-sm text-dash-text">{m.fecha}</td>
                    {showTypeColumn && (
                      <td className="py-3 px-4 sm:px-6">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                            m.tipo === "ingreso"
                              ? "bg-emerald-50 text-dash-success"
                              : "bg-red-50 text-dash-danger"
                          }`}
                        >
                          {m.tipo === "ingreso" ? "Ingreso" : "Gasto"}
                        </span>
                      </td>
                    )}
                    <td className="py-3 px-4 sm:px-6 text-sm text-dash-text">
                      {m.nombre || m.categoria}
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-6 h-6 rounded-md shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: catColor + "1A", color: catColor }}
                        >
                          {getCategoryIcon(m.categoria, 12)}
                        </span>
                        <span className="text-sm text-dash-text-secondary">{m.categoria}</span>
                      </div>
                    </td>
                    <td
                      className={`py-3 px-4 sm:px-6 text-sm font-semibold text-right ${
                        m.tipo === "ingreso" ? "text-dash-success" : "text-dash-danger"
                      }`}
                    >
                      {m.tipo === "ingreso" ? "+" : "-"}{formatEuro(parseMonto(m.monto))}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setModalEdit({ mov: m, idx: originalIndex(m) })}
                          className="p-2 rounded-lg text-dash-text-secondary hover:text-dash-accent hover:bg-dash-accent/5 transition-colors duration-150"
                        >
                          <FaPen className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setModalDelete(originalIndex(m))}
                          className="p-2 rounded-lg text-dash-text-secondary hover:text-dash-danger hover:bg-red-50 transition-colors duration-150"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-dash-border">
          <span className="text-xs text-dash-text-secondary">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPagina(Math.max(1, pagina - 1))}
              disabled={pagina === 1}
              className="p-2 rounded-lg text-dash-text-secondary hover:bg-gray-50 disabled:opacity-30 transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPagina(p)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors duration-150 ${
                  pagina === p
                    ? "bg-dash-primary text-white"
                    : "text-dash-text-secondary hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPagina(Math.min(totalPages, pagina + 1))}
              disabled={pagina === totalPages}
              className="p-2 rounded-lg text-dash-text-secondary hover:bg-gray-50 disabled:opacity-30 transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <ModalAddTransaction
        isOpen={modalAdd}
        onClose={() => setModalAdd(false)}
        onAdd={onAdd}
        defaultType={filterType || "ingreso"}
      />
      <ModalEditTransaction
        isOpen={!!modalEdit}
        onClose={() => setModalEdit(null)}
        onSave={(updated) => {
          if (modalEdit) onEdit(modalEdit.idx, updated);
          setModalEdit(null);
        }}
        movimiento={modalEdit?.mov}
      />
      <ModalConfirmDelete
        isOpen={modalDelete !== null}
        onClose={() => setModalDelete(null)}
        onConfirm={() => {
          if (modalDelete !== null) onDelete(modalDelete);
          setModalDelete(null);
        }}
      />
    </div>
  );
}
