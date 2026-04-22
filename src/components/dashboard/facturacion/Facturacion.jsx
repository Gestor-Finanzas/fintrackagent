import { useState, useEffect } from "react";
import { FaCheckCircle, FaClock, FaArrowLeft, FaCheck } from "react-icons/fa";
import mockFacturas from "../../../mocks/mockFacturas.json";
import { useNavigate } from "react-router-dom";
import { formatEuro, formatearFecha } from "../../../utils/globalUtils";
import datosEconomicos from "../../../mocks/mockDatosEconomicos.json";
import { FaExclamationTriangle } from "react-icons/fa";
import DashboardNavbar from "../DashboardNavbar";

export default function Facturacion() {
    const [facturas] = useState(mockFacturas);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [nuevoMetodo, setNuevoMetodo] = useState(datosEconomicos.tarifa);

    // Sincroniza el método de pago seleccionado con el mock cada vez que se abre el modal
    useEffect(() => {
        if (modalOpen) {
            setNuevoMetodo(datosEconomicos.tarifa);
        }
    }, [modalOpen]);
    const [showConfirmMetodo, setShowConfirmMetodo] = useState(false);
    const [mensajeAviso, setMensajeAviso] = useState("");
    const [showCancelModal, setShowCancelModal] = useState(false);

    return (
        <div className="min-h-screen bg-bgLight flex flex-col relative">
            <DashboardNavbar />
            <div className="w-full flex mb-2">
                <button
                    className="flex items-center gap-2 bg-white/80 text-primary font-medium ml-8 px-3 py-1 rounded-full text-base border border-primary/30 shadow-sm hover:bg-primary/10 hover:text-primary transition-all duration-150 ml-4 group transform hover:scale-110"
                    style={{ alignSelf: 'flex-start' }}
                    onClick={() => navigate("/dashboard")}
                >
                    <FaArrowLeft className="text-primary/70 group-hover:-translate-x-1 transition-transform duration-150" />
                    <span className="tracking-wide">Volver</span>
                </button>
            </div>
            <div className="mx-auto mt-1 max-w-5xl w-full flex flex-col gap-6">
                {/* Card de información económica */}
                <div className="relative rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-primary/80 via-accent/60 to-bgLight/80 p-0">
                    <div className="flex flex-col md:flex-row gap-8 justify-between items-center bg-white/90 rounded-2xl p-6 border border-primary/20">
                        <div className="flex flex-col items-center min-w-[140px]">
                            <span className="text-sm text-gray-500 font-medium">Estado de la cuenta</span>
                            <span className={`font-bold text-xl mt-1 ${datosEconomicos.estadoCuenta === 'Activa' ? 'text-green-500' : 'text-red-600'}`}>{datosEconomicos.estadoCuenta}</span>
                        </div>
                        <div className="flex flex-col items-center min-w-[140px]">
                            <span className="text-sm text-gray-500 font-medium">Tarifa actual</span>
                            <span className="font-semibold text-lg mt-1 text-primary">{datosEconomicos.tarifa === 'Mensual' ? 'Pago mensual' : 'Pago anual'}</span>
                        </div>
                        <div className="flex flex-col items-center min-w-[140px]">
                            <span className="text-sm text-gray-500 font-medium">Fecha de inicio</span>
                            <span className="font-semibold text-lg mt-1 text-secondary">{formatearFecha(datosEconomicos.fechaInicio)}</span>
                        </div>
                        <div className="flex flex-col items-center min-w-[140px]">
                            <span className="text-sm text-gray-500 font-medium">Fecha de finalización</span>
                            <span className="font-semibold text-lg mt-1 text-secondary">{formatearFecha(datosEconomicos.fechaFin)}</span>
                        </div>
                        <div className="flex flex-col items-center min-w-[140px]">
                            <span className="text-sm text-gray-500 font-medium">Próxima fecha de cobro</span>
                            <span className="font-semibold text-lg mt-1 text-accent">{formatearFecha(datosEconomicos.proximaFechaCobro)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-primary text-white px-4 py-1 rounded-full font-semibold shadow hover:bg-accent transition text-sm"
                        onClick={() => setModalOpen(true)}
                    >
                        Gestionar suscripción
                    </button>
                </div>
                {/* Modal de método de pago */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
                            <button
                                className="absolute top-3 right-4 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none"
                                onClick={() => setModalOpen(false)}
                                aria-label="Cerrar"
                            >
                                ×
                            </button>
                            <h2 className="text-xl font-bold text-primary mb-6 text-center">Gestionar suscripción</h2>
                            <div className="flex flex-col gap-4 mb-6">
                                <label className={`flex items-center gap-3 cursor-pointer rounded-lg p-3 border-2 transition relative ${nuevoMetodo === "Mensual" ? "border-primary bg-primary/10" : "border-gray-200 bg-white"}`}>
                                    <input
                                        type="radio"
                                        name="metodoPago"
                                        value="Mensual"
                                        checked={nuevoMetodo === "Mensual"}
                                        onChange={() => setNuevoMetodo("Mensual")}
                                        className="accent-primary w-5 h-5 hidden"
                                    />
                                    {nuevoMetodo === "Mensual" && (
                                        <span className="absolute top-2 right-2 text-primary">
                                            <FaCheck className="text-xl" />
                                        </span>
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-base font-semibold">Pago Mensual</span>
                                        <span className="text-sm text-gray-500">{datosEconomicos.precioMensual ? datosEconomicos.precioMensual : "2,99 € / mes"}</span>
                                        <span className="text-xs text-gray-400 mt-1">Próxima fecha de cobro: {formatearFecha(datosEconomicos.proximaFechaCobro)}</span>
                                    </div>
                                </label>
                                <label className={`flex items-center gap-3 cursor-pointer rounded-lg p-3 border-2 transition relative ${nuevoMetodo === "Anual" ? "border-primary bg-primary/10" : "border-gray-200 bg-white"}`}>
                                    <input
                                        type="radio"
                                        name="metodoPago"
                                        value="Anual"
                                        checked={nuevoMetodo === "Anual"}
                                        onChange={() => setNuevoMetodo("Anual")}
                                        className="accent-primary w-5 h-5 hidden"
                                    />
                                    {nuevoMetodo === "Anual" && (
                                        <span className="absolute top-2 right-2 text-primary">
                                            <FaCheck className="text-xl" />
                                        </span>
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-base font-semibold">Pago Anual</span>
                                        <span className="text-sm text-gray-500">{datosEconomicos.precioAnual ? datosEconomicos.precioAnual : "30 € / año"}</span>
                                        <span className="text-xs text-gray-400 mt-1">Válido hasta: {formatearFecha(datosEconomicos.fechaFin)}</span>
                                        <span className="text-xs text-gray-500">Próxima fecha de cobro: {formatearFecha(datosEconomicos.fechaFin)}</span>
                                    </div>
                                </label>
                            </div>
                            <div className="flex flex-col gap-3 mt-2">
                                <button
                                    className="w-full bg-primary text-white py-2 rounded-full font-semibold hover:bg-accent transition"
                                    onClick={() => {
                                        if (nuevoMetodo === datosEconomicos.tarifa) {
                                            setMensajeAviso(`Ya estás usando el método de pago "${nuevoMetodo}".`);
                                        } else {
                                            setShowConfirmMetodo(true);
                                        }
                                    }}
                                >
                                    Guardar cambios
                                </button>
                                {mensajeAviso && (
                                    <div className="w-full bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg px-4 py-2 mt-1 text-center text-sm font-medium flex items-center justify-center gap-2">
                                        <FaExclamationTriangle className="inline mr-1 text-lg" />
                                        {mensajeAviso}
                                    </div>
                                )}
                                {/* Modal de confirmación de cambio de método de pago */}
                                {showConfirmMetodo && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                                        <div className="relative bg-white rounded-3xl shadow-2xl p-0 w-full max-w-md animate-fade-in border border-primary/20">
                                            <div className="flex flex-col items-center px-8 pt-8 pb-6">
                                                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 border-2 border-primary/20">
                                                    <FaExclamationTriangle className="text-primary text-3xl" />
                                                </span>
                                                <h2 className="text-2xl font-bold text-primary mb-2 text-center">¿Confirmar cambio de método de pago?</h2>
                                                <p className="text-secondary text-center mb-4 text-base leading-relaxed">
                                                    Vas a cambiar la forma de pago de <span className="font-semibold text-primary">{datosEconomicos.tarifa}</span> a <span className="font-semibold text-primary">{nuevoMetodo}</span>.<br />
                                                    {nuevoMetodo === "Anual"
                                                        ? <>El próximo pago será anual y se realizará el <span className="font-semibold">{formatearFecha(datosEconomicos.fechaFin)}</span>.</>
                                                        : <>El próximo pago será mensual y se realizará el <span className="font-semibold">{formatearFecha(datosEconomicos.proximaFechaCobro)}</span>.</>
                                                    }
                                                </p>
                                                <div className="flex gap-3 w-full mt-2">
                                                    <button
                                                        className="flex-1 bg-gray-50 text-secondary py-2 rounded-full font-semibold border border-gray-200 hover:bg-gray-100 transition"
                                                        onClick={() => setShowConfirmMetodo(false)}
                                                    >
                                                        No, volver
                                                    </button>
                                                    <button
                                                        className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-2 rounded-full font-semibold shadow hover:from-primary/80 hover:to-accent/80 transition border-0"
                                                        onClick={() => {
                                                            setShowConfirmMetodo(false);
                                                            setModalOpen(false);
                                                            // Aquí iría la lógica real de guardar el cambio
                                                        }}
                                                    >
                                                        Sí, cambiar
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                className="absolute top-3 right-4 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none"
                                                onClick={() => setShowConfirmMetodo(false)}
                                                aria-label="Cerrar"
                                                style={{ lineHeight: 1 }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <button
                                    className="w-full bg-red-100 text-red-600 py-2 rounded-full font-semibold hover:bg-red-200 transition"
                                    onClick={() => { setShowCancelModal(true); }}
                                >
                                    Cancelar suscripción
                                </button>
                                {/* Modal de confirmación de cancelación */}
                                {showCancelModal && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                                        <div className="relative bg-white rounded-3xl shadow-2xl p-0 w-full max-w-md animate-fade-in border border-red-100">
                                            <div className="flex flex-col items-center px-8 pt-8 pb-6">
                                                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4 border-2 border-red-100">
                                                    <FaExclamationTriangle className="text-red-500 text-3xl" />
                                                </span>
                                                <h2 className="text-2xl font-bold text-red-600 mb-2 text-center">¿Cancelar suscripción?</h2>
                                                <p className="text-secondary text-center mb-4 text-base leading-relaxed">
                                                    Si confirmas, <span className="font-semibold text-red-600">perderás el acceso al chatbot Fin y a los datos del dashboard el día <span className="underline underline-offset-2">{formatearFecha(datosEconomicos.fechaFin)}</span></span>.<br />
                                                    <span className="text-gray-500">Tus datos históricos se guardarán durante <span className="font-semibold">12 meses</span> por si decides volver a suscribirte.</span>
                                                </p>
                                                <div className="flex gap-3 w-full mt-2">
                                                    <button
                                                        className="flex-1 bg-gray-50 text-secondary py-2 rounded-full font-semibold border border-gray-200 hover:bg-gray-100 transition"
                                                        onClick={() => setShowCancelModal(false)}
                                                    >
                                                        No, volver
                                                    </button>
                                                    <button
                                                        className="flex-1 bg-gradient-to-r from-red-500 to-red-400 text-white py-2 rounded-full font-semibold shadow hover:from-red-600 hover:to-red-500 transition border-0"
                                                        onClick={() => { setShowCancelModal(false); setModalOpen(false); /* Aquí lógica real de cancelar */ }}
                                                    >
                                                        Sí, cancelar
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                className="absolute top-3 right-4 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none"
                                                onClick={() => setShowCancelModal(false)}
                                                aria-label="Cerrar"
                                                style={{ lineHeight: 1 }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {/* Tabla de facturas */}
                <div className="relative rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-primary/90 via-accent/80 to-bgLight/80 p-0 mb-8">
                    <div className="h-20 w-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg tracking-wide z-10">Facturas</h3>
                    </div>
                    <div className="px-8 pb-8 pt-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left table-fixed rounded-xl overflow-hidden shadow bg-white/90">
                                <thead>
                                    <tr className="text-secondary bg-bgLight border-b">
                                        <th className="py-3 px-4 font-semibold tracking-wide text-center">N° Factura</th>
                                        <th className="py-3 px-4 font-semibold tracking-wide text-center">Fecha</th>
                                        <th className="py-3 px-4 font-semibold tracking-wide text-center">Cantidad</th>
                                        <th className="py-3 px-4 font-semibold tracking-wide text-center">Estado de pago</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facturas.map(f => (
                                        <tr key={f.id} className="border-b last:border-b-0 hover:bg-primary/10 transition">
                                            <td className="py-3 px-4 text-center whitespace-nowrap">{f.numero}</td>
                                            <td className="py-3 px-4 text-center whitespace-nowrap">{formatearFecha(f.fecha)}</td>
                                            <td className="py-3 px-4 text-center whitespace-nowrap">{formatEuro(f.importe)}</td>
                                            <td className="py-3 px-4 text-center">
                                                {f.estado === "Pagada" ? (
                                                    <span className="flex items-center justify-center text-green-600 font-semibold"><FaCheckCircle className="mr-1" /> Pagada</span>
                                                ) : (
                                                    <span className="flex items-center justify-center text-yellow-600 font-semibold"><FaClock className="mr-1" /> Pendiente</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
