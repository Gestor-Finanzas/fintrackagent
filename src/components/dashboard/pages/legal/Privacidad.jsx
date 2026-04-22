import Footer from "../../../landing_page/Footer";

export default function Privacidad() {
  return (
    <div>
      <div className="max-w-3xl mx-auto py-2">
        <h1 className="text-2xl font-bold text-dark mb-8">Política de Privacidad</h1>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dark mb-3">Compromiso de FinTrack</h2>
          <p className="text-sm text-gray-500 leading-relaxed">En FinTrack, tu privacidad es una prioridad. Cumplimos con la normativa europea (GDPR) y solo almacenamos los datos imprescindibles para el funcionamiento del servicio. Nunca vendemos ni compartimos tu información personal con terceros sin tu consentimiento expreso.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dark mb-3">Datos Recopilados</h2>
          <ul className="list-disc pl-6 text-sm text-gray-500 space-y-2">
            <li>Datos de registro: nombre, correo electrónico, contraseña.</li>
            <li>Datos financieros: movimientos, categorías, saldos.</li>
            <li>Datos técnicos: dirección IP, dispositivo, navegador.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dark mb-3">Uso de la Información</h2>
          <ul className="list-disc pl-6 text-sm text-gray-500 space-y-2">
            <li>Gestión de la cuenta y movimientos financieros.</li>
            <li>Mejora de la experiencia de usuario y funcionalidades.</li>
            <li>Cumplimiento de obligaciones legales y fiscales.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dark mb-3">Protección y Seguridad</h2>
          <ul className="list-disc pl-6 text-sm text-gray-500 space-y-2">
            <li>Cifrado de extremo a extremo y almacenamiento seguro.</li>
            <li>Acceso restringido solo al usuario.</li>
            <li>Auditorías periódicas y buenas prácticas de seguridad.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dark mb-3">Derechos del Usuario</h2>
          <ul className="list-disc pl-6 text-sm text-gray-500 space-y-2">
            <li>Acceso, rectificación y eliminación de datos personales.</li>
            <li>Portabilidad de datos y derecho a oposición.</li>
            <li>Solicitar la eliminación de la cuenta y datos en cualquier momento.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dark mb-3">Contacto</h2>
          <p className="text-sm text-gray-500">Para cualquier duda sobre privacidad, contacta con nuestro equipo a través del correo <span className="font-semibold">privacidad@fintrack.com</span>.</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
