import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockUser from "../../../mocks/mockUser.json";
import mockDatos from "../../../mocks/mockDatosEconomicos.json";
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaExclamationTriangle, FaCrown, FaPen, FaLock,
  FaShieldAlt, FaCalendarAlt, FaCheck, FaTimes,
  FaEye, FaEyeSlash,
} from "react-icons/fa";

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(mockUser);
  const [form, setForm] = useState(user);
  const [editando, setEditando] = useState(false);
  const [cambiandoPass, setCambiandoPass] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", msg: "" });
  const [modalEliminar, setModalEliminar] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const initials = user.nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const memberSince = new Date(mockDatos.fechaInicio).toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(mockDatos.fechaFin) - new Date()) / (1000 * 60 * 60 * 24))
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const showFeedback = (type, msg) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback({ type: "", msg: "" }), 3500);
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    setUser({ ...form });
    setEditando(false);
    showFeedback("success", "Datos actualizados correctamente.");
  };

  const handleCancelarEdit = () => {
    setEditando(false);
    setForm(user);
  };

  const handleGuardarPass = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      showFeedback("error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== password2) {
      showFeedback("error", "Las contraseñas no coinciden.");
      return;
    }
    showFeedback("success", "Contraseña cambiada correctamente.");
    setPassword("");
    setPassword2("");
    setShowPass(false);
    setShowPass2(false);
    setCambiandoPass(false);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-150";

  const infoFields = [
    { icon: FaUser, label: "Nombre completo", value: user.nombre },
    { icon: FaEnvelope, label: "Correo electrónico", value: user.email },
    { icon: FaPhone, label: "Teléfono", value: user.telefono },
    { icon: FaMapMarkerAlt, label: "Ciudad", value: user.ciudad },
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      {/* Editorial header */}
      <div>
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
          Configuración
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
          Mi perfil
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Gestiona tu información personal y preferencias de cuenta.
        </p>
      </div>

      {/* Feedback toast */}
      {feedback.msg && (
        <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border animate-fade-in ${feedback.type === "success"
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-red-50 text-red-600 border-red-200"
          }`}>
          {feedback.type === "success"
            ? <FaCheck className="w-3.5 h-3.5 shrink-0" />
            : <FaTimes className="w-3.5 h-3.5 shrink-0" />
          }
          {feedback.msg}
        </div>
      )}

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="relative px-6 sm:px-8 pt-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-dark flex items-center justify-center text-xl sm:text-2xl font-bold text-white shrink-0 w-16 h-16 sm:w-20 sm:h-20">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-dark truncate">{user.nombre}</h2>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400">
                <FaCalendarAlt className="w-3 h-3 shrink-0" />
                <span>Miembro desde {memberSince}</span>
              </div>
            </div>
            {!editando && (
              <button
                onClick={() => setEditando(true)}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-dark border border-gray-300 hover:border-dark hover:bg-gray-50 transition-colors shrink-0"
              >
                <FaPen className="w-3 h-3" />
                <span className="hidden sm:inline">Editar</span>
              </button>
            )}
          </div>
        </div>

        {/* Content area */}
        <div className="px-6 sm:px-8 py-6">
          {editando ? (
            <form onSubmit={handleGuardar} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+34 600 000 000"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    placeholder="Tu ciudad"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={handleCancelarEdit}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-dark hover:bg-primary transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {infoFields.map(({ label, value }) => (
                <div key={label} className="border-l-2 border-gray-100 pl-5 min-w-0">
                  <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500">
                    {label}
                  </div>
                  <div className="text-sm font-semibold text-dark truncate mt-1">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Plan card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center gap-2">
          <FaCrown className="w-3.5 h-3.5 text-primary" />
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
            Mi plan
          </h3>
        </div>
        <div className="p-6 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-lg font-bold text-dark">
                {mockDatos.tarifa === "Gratis" ? "Plan Gratis" : `Plan ${mockDatos.tarifa}`}
              </p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${mockDatos.estadoCuenta === "Activa"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
                }`}>
                {mockDatos.estadoCuenta}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {mockDatos.tarifa === "Gratis"
                ? `Te quedan ${daysLeft} días de prueba gratuita.`
                : `Próximo cobro: ${new Date(mockDatos.proximaFechaCobro).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}`}
            </p>
            {mockDatos.tarifa === "Gratis" && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
                  <span>{daysLeft} días restantes</span>
                  <span>{Math.round((1 - daysLeft / 14) * 100)}% consumido</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${daysLeft <= 3 ? "bg-red-500" : daysLeft <= 7 ? "bg-amber-500" : "bg-primary"}`}
                    style={{ width: `${Math.max(2, (daysLeft / 14) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate(mockDatos.tarifa === "Gratis" ? "/dashboard/planes" : "/dashboard/facturacion")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-dark hover:bg-primary transition-colors w-full sm:w-auto shrink-0"
          >
            {mockDatos.tarifa === "Gratis" ? "Escoger plan" : "Gestionar plan"}
          </button>
        </div>
      </div>

      {/* Security section */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center gap-2">
          <FaShieldAlt className="w-3.5 h-3.5 text-primary" />
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
            Seguridad y cuenta
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {/* Password row */}
          <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <FaLock className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-dark">Contraseña</p>
                <p className="text-xs text-gray-500">Cambia tu contraseña de acceso</p>
              </div>
            </div>
            <button
              onClick={() => setCambiandoPass(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-dark border border-gray-300 hover:border-dark hover:bg-gray-50 transition-colors self-start sm:self-auto"
            >
              Cambiar
            </button>
          </div>
          {/* Delete row */}
          <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-600">Eliminar cuenta</p>
                <p className="text-xs text-gray-500">Acción permanente e irreversible</p>
              </div>
            </div>
            <button
              onClick={() => setModalEliminar(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors self-start sm:self-auto"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Change password modal */}
      {cambiandoPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl border border-gray-200 max-w-sm w-full p-6 animate-fade-in">
            <form onSubmit={handleGuardarPass} className="flex flex-col gap-4">
              <div className="mb-2">
                <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
                  Seguridad
                </span>
                <h3 className="text-xl font-bold text-dark">Cambiar contraseña</h3>
                <p className="text-xs text-gray-500 mt-1">Introduce tu nueva contraseña (mínimo 6 caracteres).</p>
              </div>
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className={`${inputClass} pr-10`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                  >
                    {showPass ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">
                  Repetir contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPass2 ? "text" : "password"}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Repite la contraseña"
                    className={`${inputClass} pr-10`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass2(!showPass2)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                  >
                    {showPass2 ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
                {password2 && password !== password2 && (
                  <p className="text-xs text-red-500 mt-1.5">Las contraseñas no coinciden</p>
                )}
              </div>
              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setCambiandoPass(false);
                    setPassword("");
                    setPassword2("");
                    setShowPass(false);
                    setShowPass2(false);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-dark hover:bg-primary transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {modalEliminar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl border border-gray-200 max-w-md w-full p-6 animate-fade-in">
            <div className="mb-5">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-red-500 mb-2">
                Acción irreversible
              </span>
              <h2 className="text-xl font-bold text-dark">Eliminar cuenta</h2>
              <p className="text-sm text-gray-500 mt-2">
                Esta acción <span className="font-semibold text-red-500">no se puede deshacer</span>.
                Se eliminarán permanentemente:
              </p>
            </div>

            <ul className="text-sm text-gray-600 space-y-2 mb-5">
              {[
                "Todos tus datos personales",
                "Historial de transacciones e ingresos",
                "Categorías personalizadas",
                "Suscripción y datos de facturación",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-red-500 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mb-5">
              <label className="block text-xs font-medium text-dark mb-1.5">
                Escribe <span className="font-bold text-red-500">ELIMINAR</span> para confirmar
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="ELIMINAR"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-colors"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setModalEliminar(false);
                  setConfirmText("");
                }}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                disabled={confirmText !== "ELIMINAR"}
                onClick={() => {
                  localStorage.removeItem("fintrack_token");
                  window.location.href = "/";
                }}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Eliminar cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
