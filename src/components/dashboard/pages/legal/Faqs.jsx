import Footer from "../../../landing_page/Footer";

export default function Faqs() {
  const sections = [
    {
      title: "Sobre FinTrack",
      items: [
        { q: "¿Qué es FinTrack?", a: "FinTrack es una herramienta de gestión financiera personal conectada a WhatsApp. Te permite registrar ingresos, gastos y visualizar tu situación económica desde cualquier dispositivo." },
        { q: "¿Es gratuito?", a: "FinTrack ofrece un plan gratuito con funciones básicas y planes de pago con características avanzadas como exportación de datos y análisis detallados." },
      ],
    },
    {
      title: "Gestión de movimientos",
      items: [
        { q: "¿Cómo registro un movimiento?", a: "Puedes registrar movimientos directamente desde WhatsApp enviando un mensaje con el importe y la categoría, o desde el panel de control web." },
        { q: "¿Puedo editar o eliminar movimientos?", a: "Sí, desde el panel de control puedes editar o eliminar cualquier movimiento registrado." },
        { q: "¿Qué categorías están disponibles?", a: "Disponemos de categorías predefinidas como Salario, Supermercado, Transporte, Ocio, etc. También puedes crear categorías personalizadas." },
      ],
    },
    {
      title: "Cuenta y seguridad",
      items: [
        { q: "¿Cómo cambio mi contraseña?", a: "Accede a tu perfil desde el menú de usuario y selecciona 'Cambiar contraseña'." },
        { q: "¿Mis datos están seguros?", a: "Sí, utilizamos cifrado SSL/TLS y almacenamos las contraseñas con algoritmos de hash robustos. Consulta nuestra página de Seguridad para más detalles." },
      ],
    },
    {
      title: "Facturación y suscripciones",
      items: [
        { q: "¿Cómo cambio mi plan?", a: "Desde la sección Facturación puedes gestionar tu suscripción y cambiar entre el plan mensual y anual." },
        { q: "¿Puedo cancelar en cualquier momento?", a: "Sí, puedes cancelar tu suscripción en cualquier momento. Mantendrás el acceso hasta el final del período pagado." },
      ],
    },
    {
      title: "Soporte",
      items: [
        { q: "¿Cómo contacto con soporte?", a: "Puedes escribirnos a soporte@fintrack.com o utilizar el chat de la plataforma." },
      ],
    },
  ];

  return (
    <div>
      <div className="max-w-3xl mx-auto py-2">
        <h1 className="text-2xl font-bold text-dash-text mb-8">Preguntas Frecuentes</h1>
        {sections.map((section) => (
          <section key={section.title} className="mb-8">
            <h2 className="text-lg font-semibold text-dash-text mb-4">{section.title}</h2>
            <div className="flex flex-col gap-3">
              {section.items.map((item) => (
                <div key={item.q} className="bg-white rounded-xl border border-dash-border p-4">
                  <h3 className="text-sm font-semibold text-dash-text mb-1">{item.q}</h3>
                  <p className="text-sm text-dash-text-secondary">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </div>
  );
}
