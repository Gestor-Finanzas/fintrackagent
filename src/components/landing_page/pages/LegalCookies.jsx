import PageLayout from "./PageLayout";

export default function LegalCookies() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6 text-center">Política de Cookies</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-10"></div>

        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-bold text-dark mb-3">¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten mejorar tu experiencia, analizar el tráfico y personalizar el contenido que te mostramos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Tipos de cookies que utilizamos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-dark">Cookies técnicas:</strong> necesarias para el funcionamiento básico de la plataforma (inicio de sesión, navegación, preferencias).</li>
              <li><strong className="text-dark">Cookies de análisis:</strong> nos permiten medir y analizar cómo utilizas FinTrack para mejorar el servicio (Google Analytics).</li>
              <li><strong className="text-dark">Cookies de personalización:</strong> adaptan el contenido a tus preferencias de idioma, tema y configuración.</li>
              <li><strong className="text-dark">Cookies de terceros:</strong> utilizadas por servicios externos integrados en la plataforma.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Gestión de preferencias</h2>
            <p>Puedes gestionar o desactivar las cookies en cualquier momento desde la configuración de tu navegador:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
              <li>Firefox: Preferencias → Privacidad y seguridad</li>
              <li>Safari: Preferencias → Privacidad</li>
              <li>Edge: Configuración → Cookies y permisos del sitio</li>
            </ul>
            <p className="mt-3">
              Ten en cuenta que desactivar ciertas cookies puede afectar al funcionamiento de la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Protección de datos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Las cookies no contienen información personal sensible.</li>
              <li>Los datos recopilados se tratan de forma anónima y agregada.</li>
              <li>Consulta nuestra Política de Privacidad para más detalles.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Contacto</h2>
            <p>
              Para más detalles sobre el uso de cookies, escríbenos a{" "}
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
