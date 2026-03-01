import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

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

  return (
    <section id="contact" className="bg-grey py-20 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Contacta con Nosotros
          </h2>
          <p className="text-lg text-secondary max-w-xl mx-auto">
            ¿Tienes preguntas? Nuestro equipo está listo para ayudarte
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6"></div>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-bgLight to-white p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-200 hover:border-primary transition duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10 transition"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10 transition"
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Asunto"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10 transition mb-5"
              required
            />

            <textarea
              name="message"
              placeholder="Tu mensaje"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10 transition mb-5 resize-none"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg-glow transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Enviar Mensaje
            </button>

            {sent && (
              <p className="text-center text-sm text-primary font-medium mt-4">
                Mensaje enviado correctamente. Te responderemos pronto.
              </p>
            )}
          </form>

          {/* Direct email */}
          <div className="flex items-center justify-center gap-2 mt-6 text-gray-500">
            <FaEnvelope className="text-primary" />
            <span className="text-sm">
              También puedes escribirnos directamente a{" "}
              <a
                href="mailto:fintrackagent@gmail.com"
                className="font-semibold text-primary hover:underline"
              >
                fintrackagent@gmail.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
