import React, { useState } from "react";
import { FaRobot, FaWhatsapp, FaShieldAlt, FaLightbulb } from "react-icons/fa";

export default function Product() {
  const [activeFeature, setActiveFeature] = useState(null);

  const featureImages = {
    ia: "/assets/ia-inteligente.png",
    whatsapp: "/assets/whatsapp-nativo.png",
    seguro: "/assets/100-seguro.png",
    recomendaciones: "/assets/recomendaciones.png",
  };

  return (
    <section
      id="product"
      className="bg-gradient-to-br from-bgLight to-white py-20 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Conoce a tu agente personal{" "}
            <span className="text-primary">Fin</span>
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
            FinTrack es una plataforma revolucionaria de gestión financiera
            personal que funciona a través de{" "}
            <span className="font-semibold text-primary">Fin</span>, tu agente
            financiero inteligente. Conectado a WhatsApp, Fin te permite
            registrar gastos e ingresos con mensajes naturales. Con inteligencia
            artificial avanzada, convertimos cada mensaje en datos estructurados
            y análisis profesionales instantáneos.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div data-aos="fade-right">
            <div className="space-y-6">
              <div
                className="group flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 border border-gray-100 hover:border-primary cursor-pointer"
                onMouseEnter={() => setActiveFeature("ia")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-lg text-white h-fit">
                  <FaRobot size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">
                    IA Inteligente
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Nuestra IA detecta automáticamente importes, categorías y
                    fechas de tus mensajes.
                  </p>
                </div>
              </div>

              <div
                className="group flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 border border-gray-100 hover:border-primary cursor-pointer"
                onMouseEnter={() => setActiveFeature("whatsapp")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="p-3 bg-gradient-to-br from-accent to-primary rounded-lg text-white h-fit">
                  <FaWhatsapp size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">
                    WhatsApp Nativo
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Usa la app que ya tienes. No descargues nada más, solo
                    escribe en WhatsApp.
                  </p>
                </div>
              </div>

              <div
                className="group flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 border border-gray-100 hover:border-primary cursor-pointer"
                onMouseEnter={() => setActiveFeature("seguro")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-lg text-white h-fit">
                  <FaShieldAlt size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">
                    100% Seguro
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Encriptación de nivel bancario. Tus datos son solo tuyos,
                    siempre.
                  </p>
                </div>
              </div>

              <div
                className="group flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 border border-gray-100 hover:border-primary cursor-pointer"
                onMouseEnter={() => setActiveFeature("recomendaciones")}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="p-3 bg-gradient-to-br from-accent to-primary rounded-lg text-white h-fit">
                  <FaLightbulb size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">
                    Recomendaciones
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Recibe insights personalizados sobre tus hábitos de gasto y
                    ahorro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-2xl blur-2xl"></div>
            <img
              src={
                activeFeature === "ia"
                  ? featureImages.ia
                  : activeFeature === "whatsapp"
                    ? featureImages.whatsapp
                    : activeFeature === "seguro"
                      ? featureImages.seguro
                      : activeFeature === "recomendaciones"
                        ? featureImages.recomendaciones
                        : "/assets/dashboard.png"
              }
              alt="Dashboard de FinTrack en tiempo real"
              className="relative w-full h-auto rounded-2xl shadow-2xl border border-primary border-opacity-20 hover:shadow-xl-glow transition duration-300 object-cover"
            />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { number: "+3.000", label: "Usuarios activos" },
            { number: "+70K", label: "Transacciones procesadas" },
            { number: "98%", label: "Precisión en IA" },
            { number: "24/7", label: "Disponibilidad" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-xl shadow-md text-center border border-gray-100 hover:border-primary hover:shadow-lg transition duration-300 transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
