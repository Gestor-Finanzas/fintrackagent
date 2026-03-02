import Footer from "../../../landing_page/Footer";

export default function Terminos() {
  return (
    <div>
      <div className="max-w-3xl mx-auto py-2">
        <h1 className="text-2xl font-bold text-dash-text mb-8">Términos y Condiciones</h1>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Aceptación del Servicio</h2>
          <p className="text-sm text-dash-text-secondary leading-relaxed">El uso de FinTrack implica la aceptación de estos términos y condiciones. El servicio está destinado a uso personal y no nos responsabilizamos de decisiones financieras tomadas a partir de la información mostrada.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Responsabilidad del Usuario</h2>
          <ul className="list-disc pl-6 text-sm text-dash-text-secondary space-y-2">
            <li>El usuario es responsable de la veracidad de los datos introducidos.</li>
            <li>El usuario debe mantener la confidencialidad de sus credenciales.</li>
            <li>El usuario se compromete a utilizar el servicio de forma lícita y respetuosa.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Modificaciones y Actualizaciones</h2>
          <ul className="list-disc pl-6 text-sm text-dash-text-secondary space-y-2">
            <li>FinTrack puede actualizar los términos en cualquier momento, notificando los cambios relevantes.</li>
            <li>El usuario será informado de cambios importantes por correo o notificación en la plataforma.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Suspensión y Cancelación</h2>
          <ul className="list-disc pl-6 text-sm text-dash-text-secondary space-y-2">
            <li>El uso indebido del servicio puede conllevar la suspensión o cancelación de la cuenta.</li>
            <li>FinTrack se reserva el derecho de cancelar cuentas por incumplimiento de los términos.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Jurisdicción y Legislación</h2>
          <ul className="list-disc pl-6 text-sm text-dash-text-secondary space-y-2">
            <li>Estos términos se rigen por la legislación española y europea.</li>
            <li>En caso de conflicto, se buscará una solución amistosa antes de acudir a tribunales.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-dash-text mb-3">Contacto Legal</h2>
          <p className="text-sm text-dash-text-secondary">Para más información, contacta con nuestro equipo legal a través del correo <span className="font-semibold">legal@fintrack.com</span>.</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
