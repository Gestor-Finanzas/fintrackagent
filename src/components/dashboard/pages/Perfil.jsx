import { useState } from "react";
import mockUser from "../../../mocks/mockUser.json";
import { FaUser, FaEnvelope, FaPhone, FaCity } from "react-icons/fa";

export default function Perfil() {
  const [user, setUser] = useState(mockUser);
  const [form, setForm] = useState(user);
  const [editando, setEditando] = useState(false);
  const [cambiandoPass, setCambiandoPass] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [feedback, setFeedback] = useState("");

  const initials = user.nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGuardar = (e) => {
    e.preventDefault();
    setUser({ ...form });
    setEditando(false);
    setFeedback("Datos actualizados correctamente.");
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleGuardarPass = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setFeedback("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== password2) {
      setFeedback("Las contraseñas no coinciden.");
      return;
    }
    setFeedback("Contraseña cambiada correctamente.");
    setPassword("");
    setPassword2("");
    setCambiandoPass(false);
    setTimeout(() => setFeedback(""), 3000);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-dash-border text-sm text-dash-text focus:outline-none focus:ring-2 focus:ring-dash-accent/20 focus:border-dash-accent transition-colors duration-150";

  const infoFields = [
    { icon: <FaUser />, label: "Nombre", value: user.nombre },
    { icon: <FaEnvelope />, label: "Email", value: user.email },
    { icon: <FaPhone />, label: "Teléfono", value: user.telefono },
    { icon: <FaCity />, label: "Ciudad", value: user.ciudad },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-dash-text mb-6">Mi perfil</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Avatar */}
        <div className="flex flex-col items-center pt-8 pb-4">
          <div className="w-20 h-20 rounded-full bg-dash-primary text-white flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>
          <h2 className="mt-3 text-lg font-semibold text-dash-text">{user.nombre}</h2>
          <p className="text-sm text-dash-text-secondary">{user.email}</p>
        </div>

        <div className="px-6 pb-6">
          {feedback && (
            <div className="mb-4 text-center text-sm font-medium text-dash-success bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
              {feedback}
            </div>
          )}

          {editando ? (
            <form onSubmit={handleGuardar} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">Nombre</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">Teléfono</label>
                <input type="text" name="telefono" value={form.telefono} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">Ciudad</label>
                <input type="text" name="ciudad" value={form.ciudad} onChange={handleChange} className={inputClass} />
              </div>
              <div className="flex gap-3 justify-center mt-2">
                <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-primary hover:bg-dash-primary-hover transition-colors duration-150">
                  Guardar
                </button>
                <button type="button" onClick={() => { setEditando(false); setForm(user); }} className="px-6 py-2.5 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors duration-150">
                  Cancelar
                </button>
              </div>
            </form>
          ) : cambiandoPass ? (
            <form onSubmit={handleGuardarPass} className="flex flex-col gap-4 max-w-sm mx-auto">
              <div>
                <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">Nueva contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-dash-text-secondary mb-1.5 uppercase tracking-wider">Repetir contraseña</label>
                <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} className={inputClass} required />
              </div>
              <div className="flex gap-3 justify-center mt-2">
                <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-primary hover:bg-dash-primary-hover transition-colors duration-150">
                  Guardar contraseña
                </button>
                <button type="button" onClick={() => setCambiandoPass(false)} className="px-6 py-2.5 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors duration-150">
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {infoFields.map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 p-4 rounded-xl border border-dash-border">
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-dash-accent/10 text-dash-accent text-sm">
                      {icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-dash-text-secondary uppercase tracking-wider">{label}</div>
                      <div className="text-sm font-semibold text-dash-text truncate">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setEditando(true)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-primary hover:bg-dash-primary-hover transition-colors duration-150"
                >
                  Editar perfil
                </button>
                <button
                  onClick={() => setCambiandoPass(true)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-dash-text-secondary border border-dash-border hover:bg-gray-50 transition-colors duration-150"
                >
                  Cambiar contraseña
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
