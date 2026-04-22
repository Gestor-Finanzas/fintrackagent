import PageLayout from "./PageLayout";
import { useTranslation } from "react-i18next";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaBalanceScale,
  FaUsers,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

export default function Empresa() {
  const { t } = useTranslation();
  const valores = [
    { icon: FaBalanceScale, title: t("company.values.transparencyTitle"), desc: t("company.values.transparencyDesc") },
    { icon: FaUsers, title: t("company.values.accessibilityTitle"), desc: t("company.values.accessibilityDesc") },
    { icon: FaRocket, title: t("company.values.innovationTitle"), desc: t("company.values.innovationDesc") },
    { icon: FaShieldAlt, title: t("company.values.securityTitle"), desc: t("company.values.securityDesc") },
  ];
  const stats = [
    { value: "2025", label: t("company.stats.foundedYear") },
    { value: "+2.000", label: t("company.stats.activeUsers") },
    { value: "24/7", label: t("company.stats.availability") },
    { value: "100%", label: t("company.stats.europeanTeam") },
  ];

  return (
    <PageLayout>
      <section className="bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-14 sm:py-16 md:py-20 relative z-10">
          <div className="max-w-2xl mb-12 md:mb-20">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              {t("company.eyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
              {t("company.titleStart")}{" "}
              <span className="text-primary">{t("company.titleAccent")}</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {t("company.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-20">
            {stats.map((s) => (
              <div key={s.label} className="bg-gray-100 border border-gray-400 rounded-2xl p-6 md:p-8">
                <p className="text-2xl md:text-3xl font-bold text-dark mb-1">{s.value}</p>
                <p className="text-xs md:text-sm text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-12 md:mb-20">
            <div className="border-l-2 border-primary pl-6">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                {t("company.whoEyebrow")}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {t("company.whoText")}
              </p>
            </div>
            <div className="border-l-2 border-gray-200 pl-6">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
                {t("company.visionEyebrow")}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {t("company.visionText")}
              </p>
            </div>
          </div>

          <div className="mb-12 md:mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-8 sm:mb-10">
              {t("company.valuesEyebrow")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {valores.map((v) => (
                <div
                  key={v.title}
                  className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-dark transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center mb-5 group-hover:bg-dark group-hover:border-dark transition-colors">
                    <v.icon className="w-4 h-4 text-dark group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-dark mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="w-4 h-4 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-dark mb-1">
                  {t("company.hq")}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t("company.hqText")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="w-4 h-4 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-dark mb-1">
                  {t("company.corporateContact")}
                </h3>
                <a
                  href="mailto:fintrackagent@gmail.com"
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  fintrackagent@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
