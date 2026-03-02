import Footer from "../../../landing_page/Footer";

export default function Seguridad() {
  return (
    <div>
      <div className="max-w-3xl mx-auto py-2">
        <h1 className="text-2xl font-bold text-dash-text mb-8">Seguridad</h1>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Compromiso con la Seguridad</h2>
          <p className="text-sm text-dash-text-secondary leading-relaxed">En FinTrack, la protección de tus datos es fundamental. Implementamos medidas avanzadas para garantizar la confidencialidad, integridad y disponibilidad de tu información financiera.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Tecnologías y Protocolos</h2>
          <ul className="list-disc pl-6 text-sm text-dash-text-secondary space-y-2">
            <li>Cifrado SSL/TLS en todas las comunicaciones entre usuario y servidor.</li>
            <li>Contraseñas almacenadas mediante algoritmos de hash robustos (bcrypt, Argon2).</li>
            <li>Autenticación multifactor (MFA) disponible para mayor protección.</li>
            <li>Monitorización activa de accesos y actividades sospechosas.</li>
            <li>Actualizaciones periódicas de software y parches de seguridad.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Auditorías y Cumplimiento</h2>
          <ul className="list-disc pl-6 text-sm text-dash-text-secondary space-y-2">
            <li>Auditorías internas y externas para detectar vulnerabilidades.</li>
            <li>Cumplimiento con normativas internacionales (GDPR, ISO 27001).</li>
            <li>Políticas estrictas de acceso y gestión de datos.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Educación y Prevención</h2>
          <ul className="list-disc pl-6 text-sm text-dash-text-secondary space-y-2">
            <li>Capacitación continua del equipo en buenas prácticas de ciberseguridad.</li>
            <li>Recomendaciones para usuarios sobre creación de contraseñas seguras.</li>
            <li>Alertas ante intentos de acceso no autorizados.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Contacto</h2>
          <p className="text-sm text-dash-text-secondary">Si tienes preguntas sobre la seguridad de tu cuenta o detectaste una actividad sospechosa, contacta con nuestro equipo a través del correo <span className="font-semibold">soporte@fintrack.com</span>.</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
