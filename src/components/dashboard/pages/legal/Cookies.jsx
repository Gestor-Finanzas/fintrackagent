import Footer from "../../../landing_page/Footer";

export default function Cookies() {
  return (
    <div>
      <div className="max-w-3xl mx-auto py-2">
        <h1 className="text-2xl font-bold text-dash-text mb-8">Política de Cookies</h1>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">¿Qué son las cookies?</h2>
          <p className="text-sm text-dash-text-secondary leading-relaxed">Las cookies son pequeños archivos que se almacenan en tu dispositivo para mejorar la experiencia de usuario, analizar el tráfico y personalizar el contenido.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Tipos de Cookies Utilizadas</h2>
          <ul className="list-disc pl-6 text-sm text-dash-text-secondary space-y-2">
            <li>Cookies técnicas: necesarias para el funcionamiento básico de la plataforma.</li>
            <li>Cookies de análisis: permiten medir y analizar el uso de la web.</li>
            <li>Cookies de personalización: adaptan el contenido a tus preferencias.</li>
            <li>Cookies de terceros: utilizadas por servicios externos como Google Analytics.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Gestión de Preferencias</h2>
          <ul className="list-disc pl-6 text-sm text-dash-text-secondary space-y-2">
            <li>Puedes gestionar o desactivar las cookies desde la configuración de tu navegador.</li>
            <li>Al continuar navegando, aceptas nuestra política de cookies.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Protección de Datos</h2>
          <ul className="list-disc pl-6 text-sm text-dash-text-secondary space-y-2">
            <li>Las cookies no contienen información personal sensible.</li>
            <li>Consulta nuestra Política de Privacidad para más detalles sobre protección de datos.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Contacto</h2>
          <p className="text-sm text-dash-text-secondary">Para más detalles sobre el uso de cookies, contacta con soporte a través del correo <span className="font-semibold">cookies@fintrack.com</span>.</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
