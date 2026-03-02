import { useState } from "react";
import { FaEnvelope, FaUser, FaPaperPlane, FaCommentDots, FaHeadset, FaClock, FaShieldAlt, FaComments } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all duration-200";

  const features = [
    {
      icon: <FaHeadset className="w-5 h-5 text-primary" />,
      title: "Soporte dedicado",
      desc: "Respuesta en menos de 24h",
    },
    {
      icon: <FaClock className="w-5 h-5 text-accent" />,
      title: "Disponible 24/7",
      desc: "Estamos siempre para ti",
    },
    {
      icon: <FaShieldAlt className="w-5 h-5 text-primary" />,
      title: "Datos seguros",
      desc: "Tu información protegida",
    },
    {
      icon: <FaComments className="w-5 h-5 text-accent" />,
      title: "Respuesta personalizada",
      desc: "Cada consulta es atendida individualmente",
    },
  ];

  return (
    <section id="contact" className="bg-gray-50 py-20 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-primary opacity-[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent opacity-[0.03] rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Nuestro equipo está listo para ayudarte. Escríbenos y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Info lateral */}
          <div className="lg:col-span-2 flex flex-col gap-6" data-aos="fade-up" data-aos-delay="50">
            {/* Features */}
            <div className="flex flex-col gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-dark">{f.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Email directo */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FaEnvelope className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email directo</p>
                  <a
                    href="mailto:fintrackagent@gmail.com"
                    className="text-sm font-semibold text-dark hover:text-primary transition-colors"
                  >
                    fintrackagent@gmail.com
                  </a>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                También puedes escribirnos directamente por correo electrónico.
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-dark mb-1">Envíanos un mensaje</h3>
              <p className="text-sm text-gray-400 mb-6">Rellena el formulario y te contestaremos pronto.</p>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputBase}
                    />
                  </div>
                  {/* Email */}
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Tu email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Asunto */}
                <div className="relative">
                  <FaCommentDots className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Asunto"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={inputBase}
                  />
                </div>

                {/* Mensaje */}
                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Escribe tu mensaje aquí..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-3.5 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="w-3.5 h-3.5" />
                  Enviar Mensaje
                </button>

                {sent && (
                  <div className="flex items-center gap-2 justify-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-primary font-medium">
                      Mensaje enviado correctamente. Te responderemos pronto.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
