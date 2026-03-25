import { useState } from "react";

const CATEGORIAS = [
  "Nueva funcionalidad",
  "Mejora de diseño",
  "Rendimiento",
  "Corrección de errores",
  "Otra",
];

export default function Sugerencias() {
  const [form, setForm] = useState({ categoria: "", asunto: "", descripcion: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    // Simular envío
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
      setForm({ categoria: "", asunto: "", descripcion: "" });
    }, 1000);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-dash-border bg-white text-sm text-dash-text focus:outline-none focus:ring-2 focus:ring-dash-accent/30 focus:border-dash-accent transition-colors duration-150";

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-dash-text">Sugerencias</h1>
        </div>
        <p className="text-sm text-dash-text-secondary mt-1">
          Tu opinión nos ayuda a mejorar. Cuéntanos qué te gustaría ver en FinTrack.
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {enviado ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-dash-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-dash-text mb-2">Sugerencia enviada</h2>
            <p className="text-sm text-dash-text-secondary mb-6">
              Gracias por tu feedback. Revisaremos tu sugerencia lo antes posible.
            </p>
            <button
              onClick={() => setEnviado(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium bg-dash-accent text-white hover:bg-dash-accent/90 transition-colors duration-150"
            >
              Enviar otra sugerencia
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-dash-text mb-1.5">Categoría</label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Selecciona una categoría</option>
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dash-text mb-1.5">Asunto</label>
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
              <label className="block text-sm font-medium text-dash-text mb-1.5">Descripción</label>
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
              className="w-full sm:w-auto sm:self-center px-6 py-2.5 rounded-xl text-sm font-medium bg-dash-accent text-white hover:bg-dash-accent/90 disabled:opacity-50 transition-colors duration-150"
            >
              {enviando ? "Enviando..." : "Enviar sugerencia"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
