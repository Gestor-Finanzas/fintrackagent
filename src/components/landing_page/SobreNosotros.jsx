import { useEffect, useState } from "react";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SobreNosotros() {
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        setIsLogged(!!localStorage.getItem("fintrack_token"));
    }, []);
    return (
        <div className="min-h-screen flex flex-col bg-bgLight">
            {isLogged ? <DashboardNavbar onLogout={() => { localStorage.removeItem("fintrack_token"); window.location.href = "/"; }} /> : <Navbar />}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
                <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-10 border border-gray-200">
                    <div className="flex flex-col items-center mb-8">
                        <img src="/assets/logo.png" alt="Logo FinTrackAgent" className="w-16 h-16 mb-4 object-contain" />
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-800 text-center">Sobre Nosotros</h1>
                    </div>
                    <p className="text-lg text-gray-700 mb-6 text-center">
                        <span className="font-bold text-gray-800">FinTrackAgent</span> es una plataforma profesional de gestión financiera que te ayuda a tomar el control de tu economía personal y profesional, de forma sencilla, segura y desde cualquier lugar.
                    </p>
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">Nuestra Misión</h2>
                        <p className="text-base text-gray-600 text-center">
                            Democratizar la gestión financiera, acercando la inteligencia artificial y la automatización a todas las personas y negocios, sin importar su experiencia previa. Queremos que cualquier usuario pueda registrar, analizar y mejorar sus finanzas simplemente enviando un mensaje por WhatsApp.
                        </p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">¿Por qué FinTrackAgent?</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><span className="font-semibold text-gray-800">Simplicidad:</span> Olvídate de hojas de cálculo y apps complejas. Solo necesitas WhatsApp y tu voz o texto.</li>
                            <li><span className="font-semibold text-gray-800">IA Avanzada:</span> Nuestra inteligencia artificial detecta automáticamente importes, categorías y fechas, y te muestra todo en un dashboard profesional.</li>
                            <li><span className="font-semibold text-gray-800">Seguridad y Privacidad:</span> Tus datos están protegidos con cifrado de nivel bancario y nunca se comparten con terceros.</li>
                            <li><span className="font-semibold text-gray-800">Transparencia:</span> Sin letra pequeña. Prueba gratis, sin tarjeta, y elige el plan que mejor se adapte a ti.</li>
                            <li><span className="font-semibold text-gray-800">Soporte Humano:</span> Nuestro equipo está siempre disponible para ayudarte y escuchar tus sugerencias.</li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">Nuestro Equipo</h2>
                        <p className="text-base text-gray-600 text-center">
                            FinTrackAgent está formado por profesionales con experiencia en tecnología, finanzas y atención al cliente. Apostamos por la innovación, la ética y la cercanía con nuestros usuarios.
                        </p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">Compromiso con la Confianza</h2>
                        <p className="text-base text-gray-600 text-center">
                            Nos tomamos muy en serio la seguridad y privacidad de tus datos. Aplicamos las mejores prácticas del sector y auditamos nuestros sistemas periódicamente para garantizar la máxima protección.
                        </p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">¿A quién ayudamos?</h2>
                        <p className="text-base text-gray-600 text-center">
                            FinTrackAgent es ideal para particulares, autónomos y pequeñas empresas que buscan una gestión financiera moderna, sin complicaciones y con el respaldo de la tecnología más avanzada.
                        </p>
                    </div>
                    <div className="text-center mt-10">
                        <p className="text-lg text-gray-800 font-semibold mb-2">Gracias por confiar en FinTrackAgent.</p>
                        <p className="text-base text-gray-600">Juntos, llevaremos tus finanzas al siguiente nivel.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
