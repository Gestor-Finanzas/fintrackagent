import PageLayout from "./PageLayout";

export default function LegalPrivacidad() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6 text-center">Política de Privacidad</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-10"></div>

        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Información que recopilamos</h2>
            <p>En FinTrack recopilamos únicamente la información necesaria para ofrecerte el servicio:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Datos de registro: nombre, correo electrónico y contraseña.</li>
              <li>Datos financieros: ingresos y gastos que registras voluntariamente.</li>
              <li>Datos de uso: interacciones con la plataforma para mejorar la experiencia.</li>
              <li>Datos técnicos: tipo de navegador, dirección IP y dispositivo (de forma anonimizada).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Cómo usamos tu información</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proporcionar y mantener el servicio de FinTrack.</li>
              <li>Generar análisis y resúmenes financieros personalizados.</li>
              <li>Comunicarte novedades, actualizaciones y soporte técnico.</li>
              <li>Mejorar la precisión de nuestra inteligencia artificial.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Protección de datos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cifrado SSL/TLS en todas las comunicaciones.</li>
              <li>Contraseñas almacenadas con hash seguro (bcrypt).</li>
              <li>Acceso restringido a datos personales dentro del equipo.</li>
              <li>Auditorías periódicas de seguridad.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Tus derechos (GDPR)</h2>
            <p>Como usuario, tienes derecho a:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Acceder a todos los datos que tenemos sobre ti.</li>
              <li>Rectificar información incorrecta o incompleta.</li>
              <li>Solicitar la eliminación de tus datos personales.</li>
              <li>Exportar tus datos en un formato portable.</li>
              <li>Revocar tu consentimiento en cualquier momento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Contacto</h2>
            <p>
              Para ejercer tus derechos o realizar consultas sobre privacidad, escríbenos a{" "}
              <a href="mailto:fintrackagent@gmail.com" className="text-primary font-semibold hover:underline">
                fintrackagent@gmail.com
              </a>.
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
