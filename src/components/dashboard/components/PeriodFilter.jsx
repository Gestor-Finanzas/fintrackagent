import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";

export default function PeriodFilter({
  periodo,
  setPeriodo,
  dateRangeLabel,
  customRange,
  setCustomRange,
}) {
  const { t } = useTranslation();
  const periods = [
    { label: t("dashboard.period.week"), value: "semana" },
    { label: t("dashboard.period.month"), value: "mes" },
    { label: t("dashboard.period.year"), value: "año" },
  ];
  const [showPicker, setShowPicker] = useState(false);
  const [tempStart, setTempStart] = useState(null);
  const [tempEnd, setTempEnd] = useState(null);
  const pickerRef = useRef(null);

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
      // Orden defensivo: si el usuario seleccionó las fechas al revés las
      // reordenamos para no devolver un rango vacío al filtro.
      const [start, end] = tempStart <= tempEnd
        ? [tempStart, tempEnd]
        : [tempEnd, tempStart];
      setCustomRange(start, end);
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
      <div className="flex gap-2 flex-wrap">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriodo(p.value)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-150 h-[38px] ${
              periodo === p.value && !isCustomActive
                ? "bg-dark text-white"
                : "bg-gray-100 text-gray-500 border border-gray-400 hover:text-dark"
            }`}
          >
            {p.label}
          </button>
        ))}
        <div className="relative" ref={pickerRef}>
          <button
            onClick={() => setShowPicker(!showPicker)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-1.5 h-[38px] ${
              isCustomActive
                ? "bg-dark text-white"
                : "bg-gray-100 text-gray-500 border border-gray-400 hover:text-dark"
            }`}
            title={t("dashboard.period.custom")}
            aria-label={t("dashboard.period.custom")}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </button>

          {showPicker && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl border border-gray-200 shadow-lg p-4 z-50 min-w-[280px]">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
                {t("dashboard.period.custom")}
              </p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5 block">
                    {t("dashboard.period.from")}
                  </label>
                  <DatePicker
                    selected={tempStart}
                    onChange={(d) => setTempStart(d)}
                    selectsStart
                    startDate={tempStart}
                    endDate={tempEnd}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/aaaa"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5 block">
                    {t("dashboard.period.to")}
                  </label>
                  <DatePicker
                    selected={tempEnd}
                    onChange={(d) => setTempEnd(d)}
                    selectsEnd
                    startDate={tempStart}
                    endDate={tempEnd}
                    minDate={tempStart}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/aaaa"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleApply}
                    disabled={!tempStart || !tempEnd}
                    className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-dark hover:bg-primary disabled:opacity-40 transition-colors"
                  >
                    {t("dashboard.period.apply")}
                  </button>
                  {isCustomActive && (
                    <button
                      onClick={handleClear}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-gray-500 border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      {t("dashboard.period.clear")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {dateRangeLabel && (
        <span className="text-xs text-gray-500">{dateRangeLabel}</span>
      )}
    </div>
  );
}
