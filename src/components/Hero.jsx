import React from "react";
import { FaArrowRight, FaChartLine } from "react-icons/fa";
import "./Hero.css";

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-gradient-to-br from-bgLight via-white to-bgLight min-h-screen flex items-center pt-20 pb-10 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl"></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-16 px-6 relative z-10">
        {/* Texto */}
        <div className="flex-1 animate-fade-in hero-text md:ml-20">
          <h1 className="text-5xl md:text-6xl font-bold text-dark mb-6 leading-tight text-center md:text-left">
            Controla tus finanzas desde{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              WhatsApp
            </span>{" "}
            con <span className="text-primary">Fin</span>
          </h1>
          <p className="text-lg text-secondary mb-8 leading-relaxed text-center md:text-left">
            Envía tus gastos e ingresos con un mensaje. Nuestra IA detecta
            automáticamente categorías, importes y fechas. Visualiza todo en un
            dashboard profesional y seguro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#signup"
              className="group bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-lg hover:shadow-xl-glow transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 font-semibold"
            >
              Comenzar Gratis{" "}
              <FaArrowRight className="group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#features"
              className="text-primary border-2 border-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-white transition duration-300 font-semibold flex items-center justify-center"
            >
              Ver Características
            </a>
          </div>

          {/* Contadores */}
          <div className="mt-12 flex flex-row flex-wrap gap-6 justify-center md:justify-start">
            {/* Contador 1 */}
            <div className="flex-1 min-w-[120px] flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <FaChartLine className="text-primary text-xl" />
              </div>
              <div className="text-center md:text-left">
                <p className="font-bold text-dark">+2.000</p>
                <p className="text-sm text-secondary">Usuarios activos</p>
              </div>
            </div>

            {/* Contador 2 */}
            <div className="flex-1 min-w-[120px] flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <span className="text-accent text-xl font-bold">✓</span>
              </div>
              <div className="text-center md:text-left">
                <p className="font-bold text-dark">Gratis 14 días</p>
                <p className="text-sm text-secondary">Sin tarjeta de crédito</p>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div
          className="flex-1 animate-fade-in mt-10 md:mt-0"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-2xl blur-2xl"></div>
            <img
              src="/assets/Imagen1.avif"
              alt="Mockup del Dashboard"
              className="relative w-full h-auto md:w-4/5 mx-auto rounded-2xl shadow-2xl border border-primary border-opacity-20 hover:shadow-xl-glow transition duration-300 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
