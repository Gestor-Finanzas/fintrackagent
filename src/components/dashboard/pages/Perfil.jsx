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
    "w-full px-4 py-2.5 rounded-xl border border-dash-border bg-white text-sm text-dash-text placeholder:text-dash-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-dash-accent/20 focus:border-dash-accent transition-colors duration-150";

  const infoFields = [
    { icon: FaUser, label: "Nombre completo", value: user.nombre },
    { icon: FaEnvelope, label: "Correo electrónico", value: user.email },
    { icon: FaPhone, label: "Teléfono", value: user.telefono },
    { icon: FaMapMarkerAlt, label: "Ciudad", value: user.ciudad },
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-dash-text">Mi perfil</h1>
        <p className="text-sm text-dash-text-secondary mt-1">
          Gestiona tu información personal y preferencias de cuenta
        </p>
      </div>

      {/* Feedback toast */}
      {feedback.msg && (
        <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border animate-fade-in ${feedback.type === "success"
          ? "bg-emerald-50 text-dash-success border-emerald-200"
          : "bg-red-50 text-dash-danger border-red-200"
          }`}>
          {feedback.type === "success"
            ? <FaCheck className="w-3.5 h-3.5 shrink-0" />
            : <FaTimes className="w-3.5 h-3.5 shrink-0" />
          }
          {feedback.msg}
        </div>
      )}

      {/* Profile card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Gradient banner with avatar + identity */}
        <div className="bg-gradient-to-br from-dash-primary via-dash-primary to-dash-accent relative px-6 sm:px-8 pt-6 pb-6">
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
              <circle cx="370" cy="10" r="90" fill="white" />
              <circle cx="30" cy="140" r="70" fill="white" />
            </svg>
          </div>
          {/* Edit button - top right corner on mobile, inline on desktop */}
          {!editando && (
            <button
              onClick={() => setEditando(true)}
              className="sm:hidden absolute top-3 right-3 z-10 p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-150"
            >
              <FaPen className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="relative flex items-center gap-4">
            <div className="rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl sm:text-3xl font-bold text-white border-2 border-white/30 shrink-0 w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">{user.nombre}</h2>
              <p className="text-sm text-white/70 truncate">{user.email}</p>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-white/50">
                <FaCalendarAlt className="w-3 h-3 shrink-0" />
                <span>Miembro desde {memberSince}</span>
              </div>
            </div>
            {!editando && (
              <button
                onClick={() => setEditando(true)}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-dash-primary bg-white hover:bg-white/90 transition-colors duration-150 shrink-0"
              >
                <FaPen className="w-3 h-3" />
                Editar
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
                  <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">
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
                  <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">
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
                  <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">
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
                  <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">
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
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-primary hover:bg-dash-primary-hover transition-colors duration-150"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {infoFields.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-4 rounded-xl border border-dash-border hover:border-dash-accent/30 transition-colors duration-150"
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-dash-accent/10 text-dash-accent text-sm shrink-0">
                    <Icon />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-dash-text-secondary uppercase tracking-wider">
                      {label}
                    </div>
                    <div className="text-sm font-semibold text-dash-text truncate">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Plan card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 px-6 sm:px-8 py-4 flex items-center gap-3">
          <FaCrown className="w-5 h-5 text-white" />
          <h3 className="text-base font-semibold text-white">Mi plan</h3>
        </div>
        <div className="p-6 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <p className="text-lg font-bold text-dash-text">
                {mockDatos.tarifa === "Gratis" ? "Plan Gratis" : `Plan ${mockDatos.tarifa}`}
              </p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${mockDatos.estadoCuenta === "Activa"
                ? "bg-emerald-50 text-dash-success"
                : "bg-red-50 text-dash-danger"
                }`}>
                {mockDatos.estadoCuenta}
              </span>
            </div>
            <p className="text-sm text-dash-text-secondary mt-1">
              {mockDatos.tarifa === "Gratis"
                ? `Estás en el plan gratuito — te quedan ${daysLeft} días de prueba.`
                : `Próximo cobro: ${new Date(mockDatos.proximaFechaCobro).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}`}
            </p>
            {mockDatos.tarifa === "Gratis" && (
              <div className="mt-2.5">
                <div className="flex items-center justify-between text-[11px] text-dash-text-secondary mb-1">
                  <span>{daysLeft} días restantes</span>
                  <span>{Math.round((1 - daysLeft / 14) * 100)}% consumido</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${daysLeft <= 3 ? "bg-dash-danger" : daysLeft <= 7 ? "bg-dash-warning" : "bg-dash-success"}`}
                    style={{ width: `${Math.max(2, (daysLeft / 14) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate(mockDatos.tarifa === "Gratis" ? "/dashboard/planes" : "/dashboard/facturacion")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-amber-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 w-full sm:w-auto shrink-0"
          >
            {mockDatos.tarifa === "Gratis" ? "Escoger plan" : "Gestionar plan"}
          </button>
        </div>
      </div>

      {/* Security section */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 sm:px-8 py-4 border-b border-dash-border">
          <div className="flex items-center gap-2">
            <FaShieldAlt className="w-4 h-4 text-dash-text-secondary" />
            <h3 className="text-sm font-semibold text-dash-text">Seguridad y cuenta</h3>
          </div>
        </div>
        <div className="divide-y divide-dash-border">
          {/* Password row */}
          <div className="px-6 sm:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-dash-accent/10 flex items-center justify-center shrink-0">
                <FaLock className="w-3.5 h-3.5 text-dash-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-dash-text">Contraseña</p>
                <p className="text-xs text-dash-text-secondary">Cambia tu contraseña de acceso</p>
              </div>
            </div>
            <button
              onClick={() => setCambiandoPass(true)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors duration-150"
            >
              Cambiar
            </button>
          </div>
          {/* Delete row */}
          <div className="px-6 sm:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                <FaExclamationTriangle className="w-3.5 h-3.5 text-dash-danger" />
              </div>
              <div>
                <p className="text-sm font-medium text-dash-danger">Eliminar cuenta</p>
                <p className="text-xs text-dash-text-secondary">Acción permanente e irreversible</p>
              </div>
            </div>
            <button
              onClick={() => setModalEliminar(true)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-dash-danger hover:bg-red-500 transition-colors duration-150"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Change password modal */}
      {cambiandoPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-fade-in">
            <form onSubmit={handleGuardarPass} className="flex flex-col gap-4">
              <div className="text-center mb-1">
                <div className="w-12 h-12 rounded-full bg-dash-accent/10 flex items-center justify-center mx-auto mb-3">
                  <FaLock className="w-5 h-5 text-dash-accent" />
                </div>
                <h3 className="text-lg font-bold text-dash-text">Cambiar contraseña</h3>
                <p className="text-xs text-dash-text-secondary mt-1">Introduce tu nueva contraseña (mínimo 6 caracteres)</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dash-text-secondary hover:text-dash-text transition-colors"
                  >
                    {showPass ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dash-text-secondary hover:text-dash-text transition-colors"
                  >
                    {showPass2 ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
                {password2 && password !== password2 && (
                  <p className="text-xs text-dash-danger mt-1.5">Las contraseñas no coinciden</p>
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
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-primary hover:bg-dash-primary-hover transition-colors duration-150"
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
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex flex-col items-center text-center mb-5">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <FaExclamationTriangle className="w-7 h-7 text-dash-danger" />
              </div>
              <h2 className="text-lg font-bold text-dash-text">Eliminar cuenta</h2>
              <p className="text-sm text-dash-text-secondary mt-2">
                Esta acción <span className="font-semibold text-dash-danger">no se puede deshacer</span>.
                Se eliminarán permanentemente:
              </p>
            </div>

            <ul className="text-sm text-dash-text-secondary space-y-2 mb-5">
              {[
                "Todos tus datos personales",
                "Historial de transacciones e ingresos",
                "Categorías personalizadas",
                "Suscripción y datos de facturación",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 pl-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-dash-danger mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mb-5">
              <label className="block text-sm font-medium text-dash-text mb-1.5">
                Escribe <span className="font-bold text-dash-danger">ELIMINAR</span> para confirmar
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="ELIMINAR"
                className="w-full px-4 py-2.5 rounded-xl border border-dash-border text-sm text-dash-text focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-dash-danger transition-colors duration-150"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setModalEliminar(false);
                  setConfirmText("");
                }}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors duration-150"
              >
                Cancelar
              </button>
              <button
                disabled={confirmText !== "ELIMINAR"}
                onClick={() => {
                  localStorage.removeItem("fintrack_token");
                  window.location.href = "/";
                }}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-danger hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
              >
                Eliminar mi cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
