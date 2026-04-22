import { useState } from "react";
import { useTranslation } from "react-i18next";

const CATEGORIAS = [
  "Nueva funcionalidad",
  "Mejora de diseño",
  "Rendimiento",
  "Corrección de errores",
  "Otra",
];

export default function Sugerencias() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ categoria: "", asunto: "", descripcion: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
      setForm({ categoria: "", asunto: "", descripcion: "" });
    }, 1000);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8">
      {/* Editorial header */}
      <div>
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
          {t("dashboardPages.suggestionsEyebrow")}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
          {t("dashboardPages.suggestionsTitle")}
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          {t("dashboardPages.suggestionsSubtitle")}
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
        {enviado ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-emerald-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-dark mb-2">Sugerencia enviada</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              Gracias por tu feedback. Revisaremos tu sugerencia lo antes posible.
            </p>
            <button
              onClick={() => setEnviado(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-dark text-white hover:bg-primary transition-colors"
            >
              Enviar otra sugerencia
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">
                Categoría
              </label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Selecciona una categoría</option>
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">
                Asunto
              </label>
              <input
                type="text"
                name="asunto"
                value={form.asunto}
                onChange={handleChange}
                placeholder="Resumen breve de tu sugerencia"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Describe tu sugerencia con el mayor detalle posible..."
                rows={5}
                className={`${inputClass} resize-none`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full sm:w-auto sm:self-end px-6 py-3 rounded-xl text-sm font-semibold bg-dark text-white hover:bg-primary disabled:opacity-50 transition-colors"
            >
              {enviando ? "Enviando..." : "Enviar sugerencia"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
