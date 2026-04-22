import { useState, useMemo, useRef, useCallback } from "react";
import { formatEuro, parseMonto, exportToCSV } from "../../../utils/globalUtils";
import { parseFechaMock } from "../hooks/useDashboardData";
import { getCategoryIcon } from "../../../utils/categoryIcons";
import { coloresCategorias } from "../../../utils/categoriasColors";
import ModalAddTransaction from "./ModalAddTransaction";
import ModalEditTransaction from "./ModalEditTransaction";
import ModalConfirmDelete from "./ModalConfirmDelete";
import { FaPen, FaTrash } from "react-icons/fa";

const POR_PAGINA = 10;

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
  const editable = !!(onAdd || onEdit || onDelete);

  // Cache de colores por categoría LOCAL al componente — evita que dos tablas
  // abiertas al mismo tiempo compartan estado global y se desincronicen.
  const colorCacheRef = useRef({});
  const colorIndexRef = useRef(0);
  const getCategoryColor = useCallback((cat) => {
    if (!(cat in colorCacheRef.current)) {
      colorCacheRef.current[cat] =
        coloresCategorias[colorIndexRef.current % coloresCategorias.length];
      colorIndexRef.current += 1;
    }
    return colorCacheRef.current[cat];
  }, []);

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
      className={`w-3.5 h-3.5 inline-block ml-1 ${sortField === field ? "text-primary" : "text-gray-500"}`}
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

  // visible columns: fecha + (tipo?) + descripcion(hidden sm) + categoria + cantidad + (acciones?)
  const colCount = 3 + (showTypeColumn ? 1 : 0) + (editable ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm mt-2 sm:mt-0">
      {/* Header */}
      <div className="p-4 sm:px-6 sm:pt-4 pb-4 pb-0 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-dark">Movimientos</h3>
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                className="pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-44 transition-colors duration-150"
              />
            </div>
            <button
              onClick={() => exportToCSV(filtered)}
              className="px-3 py-2 rounded-xl text-xs font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors duration-150"
            >
              CSV
            </button>
            {editable && (
              <button
                onClick={() => setModalAdd(true)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-dark hover:bg-primary transition-colors duration-150 flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Añadir
              </button>
            )}
          </div>
        </div>
        {/* Mobile layout */}
        <div className="flex flex-col gap-2 sm:hidden">
          <div className="relative">
            <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
              className="pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full transition-colors duration-150"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCSV(filtered)}
              className="flex-1 px-3 py-2 rounded-xl text-xs font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors duration-150"
            >
              CSV
            </button>
            {editable && (
              <button
                onClick={() => setModalAdd(true)}
                className="flex-1 px-4 py-2 rounded-xl text-xs font-medium text-white bg-dark hover:bg-primary transition-colors duration-150 flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Añadir
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-y border-gray-200">
              <th
                onClick={() => handleSort("fecha")}
                className="w-[28%] sm:w-[20%] py-3 px-2 sm:px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
              >
                Fecha <SortIcon field="fecha" />
              </th>
              {showTypeColumn && (
                <th className="sm:w-[10%] py-3 px-2 sm:px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Tipo
                </th>
              )}
              <th className="sm:w-[20%] py-3 px-2 sm:px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Descripción
              </th>
              <th className="w-[30%] sm:w-[20%] py-3 px-2 sm:px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th
                onClick={() => handleSort("monto")}
                className="w-[28%] sm:w-[20%] py-3 px-2 sm:px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none whitespace-nowrap text-center"
              >
                Cantidad <SortIcon field="monto" />
              </th>
              {editable && (
                <th className="w-[14%] sm:w-[10%] py-3 px-1 sm:px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right sm:text-center">
                  <span className="hidden sm:inline">Acciones</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={colCount} className="py-12 text-center text-sm text-gray-500">
                  No hay movimientos
                </td>
              </tr>
            ) : (
              pageItems.map((m, i) => {
                const catColor = getCategoryColor(m.categoria);
                const rowKey = `${m.fecha}-${m.categoria}-${m.monto}-${m.nombre || ""}-${i}`;
                return (
                  <tr key={rowKey} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-3 px-2 sm:px-4 text-sm text-dark whitespace-nowrap">{m.fecha}</td>
                    {showTypeColumn && (
                      <td className="py-3 px-2 sm:px-4 hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${m.tipo === "ingreso"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-500"
                            }`}
                        >
                          {m.tipo === "ingreso" ? "Ingreso" : "Gasto"}
                        </span>
                      </td>
                    )}
                    <td className="py-3 px-2 sm:px-4 text-sm text-dark hidden sm:table-cell">
                      {m.nombre || m.categoria}
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-6 h-6 rounded-md shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: catColor + "1A", color: catColor }}
                        >
                          {getCategoryIcon(m.categoria, 12)}
                        </span>
                        <span className="text-sm text-gray-500 truncate">{m.categoria}</span>
                      </div>
                    </td>
                    <td
                      className={`py-3 px-2 sm:px-4 text-sm font-semibold whitespace-nowrap text-center ${m.tipo === "ingreso" ? "text-emerald-600" : "text-red-500"
                        }`}
                    >
                      {m.tipo === "ingreso" ? "+" : "-"}{formatEuro(parseMonto(m.monto))}
                    </td>
                    {editable && (
                      <td className="py-3 px-1 sm:px-4 text-right sm:text-center">
                        <div className="inline-flex items-center gap-0 sm:gap-1">
                          <button
                            onClick={() => setModalEdit({ mov: m, idx: originalIndex(m) })}
                            aria-label={`Editar ${m.nombre || m.categoria}`}
                            className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-lg text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors duration-150"
                          >
                            <FaPen className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setModalDelete(originalIndex(m))}
                            aria-label={`Eliminar ${m.nombre || m.categoria}`}
                            className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors duration-150"
                          >
                            <FaTrash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 sm:px-4 py-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPagina(Math.max(1, pagina - 1))}
              disabled={pagina === 1}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPagina(p)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors duration-150 ${pagina === p
                  ? "bg-dark text-white"
                  : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPagina(Math.min(totalPages, pagina + 1))}
              disabled={pagina === totalPages}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {editable && (
        <>
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
        </>
      )}
    </div>
  );
}
