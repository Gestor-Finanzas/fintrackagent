import React from 'react';

export default function Workflow() {
  const steps = [
    { step: 1, title: 'Envía tu gasto o ingreso', desc: 'Por WhatsApp, texto o voz.' },
    { step: 2, title: 'Procesamiento automático', desc: 'Detección de importe, categoría y fecha con IA.' },
    { step: 3, title: 'Visualiza tus finanzas', desc: 'Dashboard simple con totales y gráficos.' },
  ];

  return (
    <section id="workflow" className="bg-bgLight py-20">
      <h2 className="text-3xl font-bold text-center text-secondary mb-12">Cómo Funciona</h2>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 px-6">
        {steps.map((s) => (
          <div key={s.step} className="flex-1 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition text-center">
            <div className="text-primary text-2xl font-bold mb-4">Paso {s.step}</div>
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
