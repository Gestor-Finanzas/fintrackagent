import React from 'react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold text-secondary mb-12">Planes de Suscripción</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        <div className="p-8 border rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-4">Mensual</h3>
          <p className="text-gray-600 mb-4">Acceso completo al registro de finanzas y dashboard.</p>
          <p className="text-2xl font-bold mb-4">€9,99/mes</p>
          <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">Suscribirse</button>
        </div>
        <div className="p-8 border rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-4">Anual</h3>
          <p className="text-gray-600 mb-4">Mejor precio: 12 meses + 2 meses gratis.</p>
          <p className="text-2xl font-bold mb-4">€99,99/año</p>
          <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">Suscribirse</button>
        </div>
      </div>
    </section>
  );
}
