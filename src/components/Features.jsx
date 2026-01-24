import React from 'react';
import { FaWhatsapp, FaChartPie, FaLock } from 'react-icons/fa';

export default function Features() {
  const features = [
    { icon: <FaWhatsapp size={36} className="text-primary"/>, title: 'Registro por WhatsApp', desc: 'Envía tus gastos e ingresos como si escribieras un mensaje.' },
    { icon: <FaChartPie size={36} className="text-primary"/>, title: 'Dashboard intuitivo', desc: 'Visualiza tus totales mensuales, categorías y exporta CSV.' },
    { icon: <FaLock size={36} className="text-primary"/>, title: 'Privacidad total', desc: 'Tus datos financieros permanecen seguros y bajo tu control.' },
  ];

  return (
    <section id="features" className="bg-white py-20">
      <h2 className="text-3xl font-bold text-center text-secondary mb-12">Características</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {features.map((f, idx) => (
          <div key={idx} className="p-8 border rounded-lg shadow-md hover:shadow-lg transition text-center">
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
