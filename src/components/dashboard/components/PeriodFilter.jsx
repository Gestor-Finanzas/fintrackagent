import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const periods = [
  { label: "Semana", value: "semana" },
  { label: "Mes", value: "mes" },
  { label: "Año", value: "año" },
];

export default function PeriodFilter({
  periodo,
  setPeriodo,
  dateRangeLabel,
  customRange,
  setCustomRange,
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempStart, setTempStart] = useState(null);
  const [tempEnd, setTempEnd] = useState(null);
  const pickerRef = useRef(null);

  // Close picker on outside click
  useEffect(() => {
    const handler = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    if (showPicker) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPicker]);

  const handleApply = () => {
    if (tempStart && tempEnd) {
      setCustomRange(tempStart, tempEnd);
      setShowPicker(false);
    }
  };

  const handleClear = () => {
    setCustomRange(null, null);
    setTempStart(null);
    setTempEnd(null);
    setShowPicker(false);
  };

  const isCustomActive = !!customRange;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex gap-2">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriodo(p.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150 ${
              periodo === p.value && !isCustomActive
                ? "bg-dash-primary text-white"
                : "bg-white text-dash-text-secondary border border-dash-border hover:border-dash-primary hover:text-dash-primary"
            }`}
          >
            {p.label}
          </button>
        ))}

        {/* Custom date range button */}
        <div className="relative" ref={pickerRef}>
          <button
            onClick={() => setShowPicker(!showPicker)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150 flex items-center gap-1.5 ${
              isCustomActive
                ? "bg-dash-primary text-white"
                : "bg-white text-dash-text-secondary border border-dash-border hover:border-dash-primary hover:text-dash-primary"
            }`}
            title="Rango personalizado"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </button>

          {showPicker && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-lg border border-dash-border p-4 z-50 min-w-[280px]">
              <p className="text-xs font-medium text-dash-text mb-3">Rango personalizado</p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-dash-text-secondary mb-1 block">Desde</label>
                  <DatePicker
                    selected={tempStart}
                    onChange={(d) => setTempStart(d)}
                    selectsStart
                    startDate={tempStart}
                    endDate={tempEnd}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/aaaa"
                    className="w-full px-3 py-2 rounded-xl border border-dash-border text-sm text-dash-text focus:outline-none focus:ring-2 focus:ring-dash-accent/20 focus:border-dash-accent"
                  />
                </div>
                <div>
                  <label className="text-xs text-dash-text-secondary mb-1 block">Hasta</label>
                  <DatePicker
                    selected={tempEnd}
                    onChange={(d) => setTempEnd(d)}
                    selectsEnd
                    startDate={tempStart}
                    endDate={tempEnd}
                    minDate={tempStart}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/aaaa"
                    className="w-full px-3 py-2 rounded-xl border border-dash-border text-sm text-dash-text focus:outline-none focus:ring-2 focus:ring-dash-accent/20 focus:border-dash-accent"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleApply}
                    disabled={!tempStart || !tempEnd}
                    className="flex-1 px-3 py-2 rounded-xl text-xs font-medium text-white bg-dash-primary hover:bg-dash-primary-hover disabled:opacity-40 transition-colors duration-150"
                  >
                    Aplicar
                  </button>
                  {isCustomActive && (
                    <button
                      onClick={handleClear}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors duration-150"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Date range label */}
      {dateRangeLabel && (
        <span className="text-xs text-dash-text-secondary">
          {dateRangeLabel}
        </span>
      )}
    </div>
  );
}
