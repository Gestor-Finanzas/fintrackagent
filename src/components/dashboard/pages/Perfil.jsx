import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import mockDatos from "../../../mocks/mockDatosEconomicos.json";
import {
  FaExclamationTriangle, FaCrown, FaPen, FaLock,
  FaShieldAlt, FaCalendarAlt, FaCheck, FaTimes,
  FaEye, FaEyeSlash,
} from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";
import { useProfile } from "../../../contexts/ProfileContext";
import { supabase } from "../../../lib/supabase";

const EMPTY_FORM = {
  nombre: "",
  apellidos: "",
  email: "",
  telefono: "",
  ciudad: "",
  direccion: "",
  sexo: "",
  fecha_nacimiento: "",
  whatsapp: "",
};

export default function Perfil() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const {
    profile, loading, displayName, initials, email, updateProfile,
  } = useProfile();

  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [editando, setEditando] = useState(false);
  const [cambiandoPass, setCambiandoPass] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", msg: "" });
  const [modalEliminar, setModalEliminar] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    if (!profile) return;
    setForm({
      nombre: profile.nombre || "",
      apellidos: profile.apellidos || "",
      email: profile.email || email || "",
      telefono: profile.telefono || "",
      ciudad: profile.ciudad || "",
      direccion: profile.direccion || "",
      sexo: profile.sexo || "",
      fecha_nacimiento: profile.fecha_nacimiento || "",
      whatsapp: profile.whatsapp || "",
    });
  }, [profile, email]);

  const handleDeleteAccount = async () => {
    try {
      const { error } = await supabase.rpc("delete_my_account");
      if (error) throw error;
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("[Perfil] delete_my_account falló:", err);
      }
    } finally {
      await signOut();
      navigate("/login", { replace: true });
    }
  };

  const locale = i18n.language?.startsWith("en") ? "en-US" : "es-ES";
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString(locale, { month: "long", year: "numeric" })
    : "—";

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(mockDatos.fechaFin) - new Date()) / (1000 * 60 * 60 * 24))
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const showFeedback = (type, msg) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback({ type: "", msg: "" }), 3500);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setSaving(true);
    // El producto opera por WhatsApp, así que whatsapp y telefono son el
    // mismo número para nuestros usuarios.
    const telefono = form.telefono || null;
    const { error } = await updateProfile({
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      telefono,
      whatsapp: telefono,
      ciudad: form.ciudad || null,
      direccion: form.direccion || null,
      sexo: form.sexo || null,
      fecha_nacimiento: form.fecha_nacimiento || null,
    });
    setSaving(false);
    if (error) {
      showFeedback("error", t("profile.feedback.saveError"));
      return;
    }
    setEditando(false);
    showFeedback("success", t("profile.feedback.saved"));
  };

  const handleCancelarEdit = () => {
    setEditando(false);
    if (profile) {
      setForm({
        nombre: profile.nombre || "",
        apellidos: profile.apellidos || "",
        email: profile.email || email || "",
        telefono: profile.telefono || "",
        ciudad: profile.ciudad || "",
        direccion: profile.direccion || "",
        sexo: profile.sexo || "",
        fecha_nacimiento: profile.fecha_nacimiento || "",
        whatsapp: profile.whatsapp || "",
      });
    }
  };

  const resetPasswordModal = () => {
    setCurrentPassword("");
    setPassword("");
    setPassword2("");
    setShowCurrent(false);
    setShowPass(false);
    setShowPass2(false);
    setCambiandoPass(false);
  };

  const handleGuardarPass = async (e) => {
    e.preventDefault();
    if (!currentPassword) {
      showFeedback("error", t("profile.feedback.currentPasswordRequired"));
      return;
    }
    if (password.length < 8) {
      showFeedback("error", t("profile.feedback.passwordTooShort"));
      return;
    }
    if (password !== password2) {
      showFeedback("error", t("profile.feedback.passwordMismatch"));
      return;
    }
    if (password === currentPassword) {
      showFeedback("error", t("profile.feedback.samePassword"));
      return;
    }
    setSaving(true);
    // Supabase no tiene un "check password" puro — hacemos un signIn con
    // la contraseña actual para validarla antes de permitir el cambio.
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: currentPassword,
    });
    if (verifyError) {
      setSaving(false);
      showFeedback("error", t("profile.feedback.currentPasswordWrong"));
      return;
    }
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (updateError) {
      showFeedback("error", updateError.message || t("profile.feedback.passwordChangeError"));
      return;
    }
    showFeedback("success", t("profile.feedback.passwordChanged"));
    resetPasswordModal();
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-150";

  const mainFields = [
    { label: t("profile.fields.name"), value: profile?.nombre },
    { label: t("profile.fields.lastName"), value: profile?.apellidos },
    { label: t("profile.fields.email"), value: form.email },
    { label: t("profile.fields.phone"), value: profile?.telefono },
  ];

  const genderOptions = [
    { value: "hombre", label: t("profile.gender.male") },
    { value: "mujer", label: t("profile.gender.female") },
    { value: "otro", label: t("profile.gender.other") },
    { value: "prefiero_no_decir", label: t("profile.gender.preferNot") },
  ];

  const genderLabel = genderOptions.find((o) => o.value === profile?.sexo)?.label || "";
  const birthdateLabel = profile?.fecha_nacimiento
    ? new Date(profile.fecha_nacimiento).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })
    : "";
  const moreFields = [
    { label: t("profile.fields.city"), value: profile?.ciudad },
    { label: t("profile.fields.address"), value: profile?.direccion },
    { label: t("profile.fields.gender"), value: genderLabel },
    { label: t("profile.fields.birthdate"), value: birthdateLabel },
  ];

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center py-20" role="status" aria-live="polite">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="sr-only">{t("profile.feedback.loadingProfile")}</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      {/* Editorial header */}
      <div>
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
          {t("dashboardPages.profileEyebrow")}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
          {t("dashboardPages.profileTitle")}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {t("dashboardPages.profileSubtitle")}
        </p>
      </div>

      {/* Feedback toast */}
      {feedback.msg && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border animate-fade-in ${feedback.type === "success"
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

      {/* Profile identity card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="relative px-6 sm:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-dark flex items-center justify-center text-xl sm:text-2xl font-bold text-white shrink-0 w-16 h-16 sm:w-20 sm:h-20">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-dark truncate">
                {displayName || "—"}
              </h2>
              <p className="text-sm text-gray-500 truncate">{form.email}</p>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-500">
                <FaCalendarAlt className="w-3 h-3 shrink-0" />
                <span>{t("profile.memberSince", { date: memberSince })}</span>
              </div>
            </div>
            {!editando && (
              <button
                onClick={() => setEditando(true)}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-dark border border-gray-300 hover:border-dark hover:bg-gray-50 transition-colors shrink-0"
              >
                <FaPen className="w-3 h-3" />
                <span className="hidden sm:inline">{t("profile.editButton")}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Form / read-view */}
      {editando ? (
        <form onSubmit={handleGuardar} className="flex flex-col gap-6">
          {/* Datos principales */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                {t("profile.sections.main")}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{t("profile.sections.mainSubtitle")}</p>
            </div>
            <div className="px-6 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                  {t("profile.fields.name")}
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder={t("profile.placeholders.name")}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                  {t("profile.fields.lastName")}
                </label>
                <input
                  type="text"
                  name="apellidos"
                  value={form.apellidos}
                  onChange={handleChange}
                  placeholder={t("profile.placeholders.lastName")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                  {t("profile.fields.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  readOnly
                  title={t("profile.emailReadOnly")}
                  className={`${inputClass} bg-gray-50 cursor-not-allowed text-gray-500`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                  {t("profile.fields.phone")}
                </label>
                <input
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder={t("profile.placeholders.phone")}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Más datos */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                {t("profile.sections.more")}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{t("profile.sections.moreSubtitle")}</p>
            </div>
            <div className="px-6 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                  {t("profile.fields.city")}
                </label>
                <input
                  type="text"
                  name="ciudad"
                  value={form.ciudad}
                  onChange={handleChange}
                  placeholder={t("profile.placeholders.city")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                  {t("profile.fields.address")}
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder={t("profile.placeholders.address")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                  {t("profile.fields.gender")}
                </label>
                <select
                  name="sexo"
                  value={form.sexo}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">{t("profile.placeholders.gender")}</option>
                  {genderOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-[0.15em]">
                  {t("profile.fields.birthdate")}
                </label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={form.fecha_nacimiento}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleCancelarEdit}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {t("profile.actions.cancel")}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-dark hover:bg-primary disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? t("profile.actions.saving") : t("profile.actions.saveChanges")}
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Datos principales */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                {t("profile.sections.main")}
              </h3>
            </div>
            <div className="px-6 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {mainFields.map(({ label, value }) => (
                <div key={label} className="border-l-2 border-gray-100 pl-5 min-w-0">
                  <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500">
                    {label}
                  </div>
                  <div className="text-sm font-semibold text-dark truncate mt-1">
                    {value || "—"}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Más datos */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                {t("profile.sections.more")}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{t("profile.sections.moreSubtitle")}</p>
            </div>
            <div className="px-6 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {moreFields.map(({ label, value }) => (
                <div key={label} className="border-l-2 border-gray-100 pl-5 min-w-0">
                  <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500">
                    {label}
                  </div>
                  <div className="text-sm font-semibold text-dark truncate mt-1">
                    {value || "—"}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Plan card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center gap-2">
          <FaCrown className="w-3.5 h-3.5 text-primary" />
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
            {t("profile.myPlan")}
          </h3>
        </div>
        <div className="p-6 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-lg font-bold text-dark">
                {mockDatos.tarifa === "Gratis"
                  ? t("profile.planFree")
                  : t("profile.planNamed", { name: mockDatos.tarifa })}
              </p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${mockDatos.estadoCuenta === "Activa"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
                }`}>
                {mockDatos.estadoCuenta === "Activa"
                  ? t("profile.accountActive")
                  : t("profile.accountInactive")}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {mockDatos.tarifa === "Gratis"
                ? t("profile.trialDaysLeft", { days: daysLeft })
                : t("profile.nextCharge", {
                  date: new Date(mockDatos.proximaFechaCobro).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" }),
                })}
            </p>
            {mockDatos.tarifa === "Gratis" && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
                  <span>{t("profile.daysRemaining", { days: daysLeft })}</span>
                  <span>{t("profile.consumed", { pct: Math.round((1 - daysLeft / 14) * 100) })}</span>
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
            {mockDatos.tarifa === "Gratis" ? t("profile.pickPlan") : t("profile.managePlan")}
          </button>
        </div>
      </div>

      {/* Security section */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center gap-2">
          <FaShieldAlt className="w-3.5 h-3.5 text-primary" />
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
            {t("profile.securityHeader")}
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <FaLock className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-dark">{t("profile.password")}</p>
                <p className="text-xs text-gray-500">{t("profile.passwordDesc")}</p>
              </div>
            </div>
            <button
              onClick={() => setCambiandoPass(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-dark border border-gray-300 hover:border-dark hover:bg-gray-50 transition-colors self-start sm:self-auto"
            >
              {t("profile.changeBtn")}
            </button>
          </div>
          <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-600">{t("profile.deleteAccount")}</p>
                <p className="text-xs text-gray-500">{t("profile.deleteAccountDesc")}</p>
              </div>
            </div>
            <button
              onClick={() => setModalEliminar(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors self-start sm:self-auto"
            >
              {t("profile.deleteBtn")}
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
                  {t("profile.passwordModal.eyebrow")}
                </span>
                <h3 className="text-xl font-bold text-dark">{t("profile.passwordModal.title")}</h3>
                <p className="text-xs text-gray-500 mt-1">{t("profile.passwordModal.description")}</p>
              </div>
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">
                  {t("profile.passwordModal.currentLabel")}
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder={t("profile.passwordModal.currentPlaceholder")}
                    className={`${inputClass} pr-10`}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    aria-label={showCurrent ? t("auth.hidePassword") : t("auth.showPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                  >
                    {showCurrent ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">
                  {t("profile.passwordModal.newLabel")}
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("profile.passwordModal.newPlaceholder")}
                    className={`${inputClass} pr-10`}
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    aria-label={showPass ? t("auth.hidePassword") : t("auth.showPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                  >
                    {showPass ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
                {password && password.length < 8 && (
                  <p className="text-xs text-red-500 mt-1.5">{t("profile.feedback.passwordTooShort")}</p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5">
                  {t("profile.passwordModal.repeatLabel")}
                </label>
                <div className="relative">
                  <input
                    type={showPass2 ? "text" : "password"}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder={t("profile.passwordModal.repeatPlaceholder")}
                    className={`${inputClass} pr-10`}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass2(!showPass2)}
                    aria-label={showPass2 ? t("auth.hidePassword") : t("auth.showPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                  >
                    {showPass2 ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
                {password2 && password !== password2 && (
                  <p className="text-xs text-red-500 mt-1.5">{t("profile.passwordModal.mismatch")}</p>
                )}
              </div>
              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={resetPasswordModal}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {t("profile.actions.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-dark hover:bg-primary disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? t("profile.actions.saving") : t("profile.actions.save")}
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
                {t("profile.deleteModal.eyebrow")}
              </span>
              <h2 className="text-xl font-bold text-dark">{t("profile.deleteModal.title")}</h2>
              <p className="text-sm text-gray-500 mt-2">
                {t("profile.deleteModal.intro")}{" "}
                <span className="font-semibold text-red-500">{t("profile.deleteModal.introAccent")}</span>
                {t("profile.deleteModal.introEnd")}
              </p>
            </div>

            <ul className="text-sm text-gray-600 space-y-2 mb-5">
              {[
                t("profile.deleteModal.item1"),
                t("profile.deleteModal.item2"),
                t("profile.deleteModal.item3"),
                t("profile.deleteModal.item4"),
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-red-500 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mb-5">
              <label className="block text-xs font-medium text-dark mb-1.5">
                {t("profile.deleteModal.confirmLabel")}{" "}
                <span className="font-bold text-red-500">{t("profile.deleteModal.confirmLabelAccent")}</span>{" "}
                {t("profile.deleteModal.confirmLabelEnd")}
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={t("profile.deleteModal.confirmPlaceholder")}
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
                {t("profile.deleteModal.cancelBtn")}
              </button>
              <button
                disabled={confirmText !== t("profile.deleteModal.confirmLabelAccent")}
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {t("profile.deleteModal.deleteBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
