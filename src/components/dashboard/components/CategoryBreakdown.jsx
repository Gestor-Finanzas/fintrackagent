import { useTranslation } from "react-i18next";
import { formatEuro } from "../../../utils/globalUtils";
import { coloresCategorias } from "../../../utils/categoriasColors";
import { getCategoryIcon } from "../../../utils/categoryIcons";

export default function CategoryBreakdown({ items, total }) {
  const { i18n } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const pct = total > 0 ? (item.monto / total) * 100 : 0;
        const color = coloresCategorias[i % coloresCategorias.length];
        return (
          <div key={item.categoria} className="flex items-center gap-3">
            <span
              className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center"
              style={{ backgroundColor: color + "1A", color }}
            >
              {getCategoryIcon(item.categoria, 14)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-dark truncate">
                  {item.categoria}
                </span>
                <span className="text-sm font-semibold text-dark ml-2 shrink-0">
                  {formatEuro(item.monto, i18n.language)}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
