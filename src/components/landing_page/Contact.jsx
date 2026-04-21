import { useState } from "react";
import {
  FaEnvelope,
  FaUser,
  FaPaperPlane,
  FaCommentDots,
  FaHeadset,
  FaClock,
  FaShieldAlt,
  FaComments,
} from "react-icons/fa";

const features = [
  {
    icon: FaHeadset,
    title: "Soporte dedicado",
    desc: "Respuesta garantizada en menos de 24 horas laborables.",
  },
  {
    icon: FaClock,
    title: "Disponibilidad 24/7",
    desc: "Nuestra plataforma y canales de contacto están siempre activos.",
  },
  {
    icon: FaShieldAlt,
    title: "Datos seguros",
    desc: "Tu información se trata con cifrado y privacidad de nivel bancario.",
  },
  {
    icon: FaComments,
    title: "Atención personalizada",
    desc: "Cada consulta la revisa y responde una persona de nuestro equipo.",
  },
];

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
    "w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200";

  return (
    <section id="contact" className="bg-white py-14 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
        {/* Hero editorial */}
        <div className="max-w-2xl mb-10 md:mb-16" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
            ¿Tienes alguna <span className="text-primary">pregunta</span>?
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Nuestro equipo está listo para ayudarte. Escríbenos y te
            responderemos en un tiempo récord.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Columna izquierda — features numeradas */}
          <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="50">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-8">
              Por qué escribirnos
            </h3>
            <div className="flex flex-col gap-6 mb-10">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-dark mb-1">
                      {f.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Email directo */}
            <div className="flex items-start gap-4 pt-8 border-t border-gray-100">
              <FaEnvelope className="w-4 h-4 text-primary mt-1 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-dark mb-1">
                  Email directo
                </p>
                <a
                  href="mailto:fintrackagent@gmail.com"
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  fintrackagent@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Columna derecha — formulario */}
          <div className="lg:col-span-3" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
                Envíanos un mensaje
              </h3>
              <p className="text-sm text-gray-500 mb-8">
                Rellena el formulario y te contestaremos lo antes posible.
              </p>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Escribe tu mensaje aquí..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-dark text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-primary transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="w-3.5 h-3.5" />
                  Enviar mensaje
                </button>

                {sent && (
                  <div className="flex items-center gap-2 justify-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
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
