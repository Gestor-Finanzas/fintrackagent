import React from 'react';

export default function Hero() {
  return (
    <section className="bg-bgLight min-h-screen flex items-center pt-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Controla tus finanzas desde WhatsApp
          </h1>
          <p className="text-lg text-secondary mb-8">
            Envía tus gastos e ingresos con un mensaje y visualiza todo en un dashboard claro y seguro.
          </p>
          <div className="flex gap-4">
            <a href="#signup" className="bg-primary text-white px-8 py-4 rounded-md hover:bg-blue-700 transition">Comenzar</a>
            <a href="#features" className="text-primary border border-primary px-8 py-4 rounded-md hover:bg-primary hover:text-white transition">Ver Características</a>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full h-80 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
            <p className="text-gray-500">Aquí irá la imagen del mockup</p>
          </div>
        </div>
      </div>
    </section>
  );
}
