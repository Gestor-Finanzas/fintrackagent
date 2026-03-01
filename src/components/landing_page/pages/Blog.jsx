import PageLayout from "./PageLayout";

const posts = [
  {
    title: "Cómo ahorrar un 20% más cada mes con FinTrack",
    excerpt: "Descubre las estrategias que nuestros usuarios aplican para mejorar su ahorro mensual utilizando las herramientas de análisis de FinTrack.",
    date: "25 febrero 2026",
    category: "Consejos",
    readTime: "5 min",
  },
  {
    title: "Novedades de marzo: categorías personalizadas y más",
    excerpt: "Hemos lanzado la gestión de categorías personalizadas, un selector de rango de fechas y mejoras en los gráficos del dashboard.",
    date: "1 marzo 2026",
    category: "Producto",
    readTime: "3 min",
  },
  {
    title: "5 hábitos financieros que cambiarán tu vida",
    excerpt: "La educación financiera es clave para alcanzar tus metas. Te compartimos los hábitos más efectivos recomendados por expertos.",
    date: "18 febrero 2026",
    category: "Educación",
    readTime: "7 min",
  },
  {
    title: "Seguridad en FinTrack: cómo protegemos tus datos",
    excerpt: "Te explicamos en detalle las medidas de seguridad que implementamos para garantizar la protección de tu información financiera.",
    date: "10 febrero 2026",
    category: "Seguridad",
    readTime: "4 min",
  },
  {
    title: "Guía completa: registrar gastos por WhatsApp",
    excerpt: "Aprende a sacar el máximo partido a Fin, nuestro agente de IA en WhatsApp, con esta guía paso a paso para nuevos usuarios.",
    date: "3 febrero 2026",
    category: "Guías",
    readTime: "6 min",
  },
  {
    title: "FinTrack vs hojas de cálculo: ¿por qué cambiar?",
    excerpt: "Comparamos la gestión financiera tradicional con Excel frente a la automatización inteligente de FinTrack.",
    date: "28 enero 2026",
    category: "Comparativas",
    readTime: "5 min",
  },
];

const categoryColors = {
  Consejos: "bg-blue-50 text-blue-600",
  Producto: "bg-emerald-50 text-emerald-600",
  "Educación": "bg-purple-50 text-purple-600",
  Seguridad: "bg-amber-50 text-amber-600",
  "Guías": "bg-indigo-50 text-indigo-600",
  Comparativas: "bg-rose-50 text-rose-600",
};

export default function Blog() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6 text-center">Blog</h1>
        <p className="text-lg text-gray-500 text-center max-w-xl mx-auto mb-4">
          Consejos, novedades y guías para mejorar tu gestión financiera
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <article
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary hover:shadow-md transition duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.readTime} lectura</span>
              </div>
              <h2 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                {post.excerpt}
              </p>
              <p className="text-xs text-gray-400">{post.date}</p>
            </article>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
