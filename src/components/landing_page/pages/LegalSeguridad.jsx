import PageLayout from "./PageLayout";

export default function LegalSeguridad() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6 text-center">Seguridad</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-10"></div>

        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Compromiso con la seguridad</h2>
            <p>
              En FinTrack, la protección de tus datos financieros es nuestra máxima prioridad. Implementamos medidas avanzadas de seguridad para garantizar la confidencialidad, integridad y disponibilidad de tu información en todo momento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Tecnologías y protocolos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cifrado SSL/TLS en todas las comunicaciones entre usuario y servidor.</li>
              <li>Contraseñas almacenadas mediante algoritmos de hash robustos (bcrypt, Argon2).</li>
              <li>Autenticación multifactor (MFA) disponible para mayor protección.</li>
              <li>Monitorización activa 24/7 de accesos y actividades sospechosas.</li>
              <li>Actualizaciones periódicas de software y parches de seguridad.</li>
              <li>Infraestructura alojada en centros de datos certificados ISO 27001.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Auditorías y cumplimiento</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Auditorías internas trimestrales y externas anuales de seguridad.</li>
              <li>Tests de penetración realizados por empresas independientes.</li>
              <li>Cumplimiento con GDPR (Reglamento General de Protección de Datos).</li>
              <li>Políticas estrictas de acceso basadas en el principio de mínimo privilegio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Protección de datos financieros</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Los datos financieros se almacenan cifrados en reposo.</li>
              <li>Nunca compartimos tu información con terceros sin tu consentimiento.</li>
              <li>Los backups se realizan diariamente con cifrado independiente.</li>
              <li>Acceso a datos limitado al personal autorizado con supervisión.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Recomendaciones para usuarios</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utiliza una contraseña única y robusta (mínimo 12 caracteres).</li>
              <li>Activa la autenticación multifactor cuando esté disponible.</li>
              <li>No compartas tus credenciales de acceso con terceros.</li>
              <li>Cierra sesión al utilizar dispositivos compartidos.</li>
              <li>Reporta cualquier actividad sospechosa inmediatamente.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Reporte de vulnerabilidades</h2>
            <p>
              Si detectas una vulnerabilidad o actividad sospechosa, contacta con nuestro equipo de seguridad a{" "}
              <a href="mailto:fintrackagent@gmail.com" className="text-primary font-semibold hover:underline">
                fintrackagent@gmail.com
              </a>.
              Valoramos la divulgación responsable y respondemos en un plazo máximo de 48 horas.
            </p>
          </section>

          <p className="text-sm text-gray-400 pt-4 border-t border-gray-200">
            Última actualización: 1 de marzo de 2026
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
