import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
  };

  return (
    <section id="contact" className="bg-grey py-20 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Contacta con Nosotros
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            ¿Tienes preguntas? Nuestro equipo está listo para ayudarte
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Columna de información */}
          <div className="space-y-8" data-aos="fade-right">
            <div className="group">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-lg text-white group-hover:shadow-lg-glow transition duration-300">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2">Email</h3>
                  <p className="text-gray-600">support@fintrack.com</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Respuesta en 24 horas
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-lg text-white group-hover:shadow-lg-glow transition duration-300">
                  <FaPhone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2">Teléfono</h3>
                  <p className="text-gray-600">+34 XXX XX XX XX</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Lun - Vie 9:00 - 18:00
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-lg text-white group-hover:shadow-lg-glow transition duration-300">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2">
                    Ubicación
                  </h3>
                  <p className="text-gray-600">Madrid, España</p>
                  <p className="text-sm text-gray-500 mt-1">Oficina central</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2" data-aos="fade-left">
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-bgLight to-white p-10 rounded-2xl shadow-lg border border-gray-200 hover:border-primary transition duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10 transition mb-6"
                required
              />

              <textarea
                name="message"
                placeholder="Tu mensaje"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10 transition mb-6 resize-none"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg-glow transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
