import PageLayout from "./PageLayout";

export default function LegalTerminos() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6 text-center">Términos y Condiciones</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-10"></div>

        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Aceptación del servicio</h2>
            <p>
              Al crear una cuenta en FinTrack o utilizar nuestros servicios, aceptas estos términos y condiciones en su totalidad. El servicio está destinado a uso personal y no nos responsabilizamos de decisiones financieras tomadas a partir de la información mostrada.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Descripción del servicio</h2>
            <p>FinTrack proporciona:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Registro de ingresos y gastos a través de WhatsApp e interfaz web.</li>
              <li>Procesamiento automático mediante inteligencia artificial.</li>
              <li>Dashboard de visualización y análisis financiero.</li>
              <li>Exportación de datos en formato CSV.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Responsabilidad del usuario</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>El usuario es responsable de la veracidad de los datos introducidos.</li>
              <li>Debe mantener la confidencialidad de sus credenciales de acceso.</li>
              <li>Se compromete a utilizar el servicio de forma lícita y respetuosa.</li>
              <li>No debe intentar acceder a datos de otros usuarios.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Pagos y suscripciones</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>FinTrack ofrece una prueba gratuita de 14 días sin compromiso.</li>
              <li>Los pagos se procesan de forma segura a través de proveedores certificados.</li>
              <li>Puedes cambiar o cancelar tu plan en cualquier momento.</li>
              <li>No se realizan reembolsos por períodos parciales ya consumidos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Modificaciones</h2>
            <p>
              FinTrack puede actualizar estos términos en cualquier momento. Los cambios relevantes se notificarán por correo electrónico o mediante aviso en la plataforma con al menos 30 días de antelación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Suspensión y cancelación</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>El uso indebido del servicio puede conllevar la suspensión de la cuenta.</li>
              <li>FinTrack se reserva el derecho de cancelar cuentas por incumplimiento.</li>
              <li>Tras la cancelación, los datos se conservan durante 12 meses.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Jurisdicción</h2>
            <p>
              Estos términos se rigen por la legislación española y europea. En caso de conflicto, se buscará una solución amistosa antes de acudir a los tribunales competentes de Málaga, España.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">Contacto legal</h2>
            <p>
              Para consultas legales, escríbenos a{" "}
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
