import PageLayout from "./pages/PageLayout";
import { useTranslation } from "react-i18next";
import {
  FaEnvelope,
  FaWhatsapp,
  FaBrain,
  FaShieldAlt,
  FaHandshake,
  FaHeadset,
  FaBullseye,
} from "react-icons/fa";

export default function SobreNosotros() {
  const { t } = useTranslation();
  const razones = [
    { icon: FaWhatsapp, title: t("about.reasons.simplicityTitle"), desc: t("about.reasons.simplicityDesc") },
    { icon: FaBrain, title: t("about.reasons.aiTitle"), desc: t("about.reasons.aiDesc") },
    { icon: FaShieldAlt, title: t("about.reasons.securityTitle"), desc: t("about.reasons.securityDesc") },
    { icon: FaHandshake, title: t("about.reasons.transparencyTitle"), desc: t("about.reasons.transparencyDesc") },
    { icon: FaHeadset, title: t("about.reasons.supportTitle"), desc: t("about.reasons.supportDesc") },
    { icon: FaBullseye, title: t("about.reasons.precisionTitle"), desc: t("about.reasons.precisionDesc") },
  ];
  const audiencia = [
    t("about.audience.individuals"),
    t("about.audience.selfEmployed"),
    t("about.audience.smallBusiness"),
  ];

  return (
    <PageLayout>
      <section className="bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-14 sm:py-16 md:py-20 relative z-10">
          <div className="max-w-2xl mb-12 md:mb-20">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              {t("about.eyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
              {t("about.titleStart")} <span className="text-primary">{t("about.titleAccent")}</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {t("about.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-12 md:mb-20">
            <div className="border-l-2 border-primary pl-6">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                {t("about.missionEyebrow")}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {t("about.missionText")}
              </p>
            </div>
            <div className="border-l-2 border-gray-200 pl-6">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
                {t("about.teamEyebrow")}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {t("about.teamText")}
              </p>
            </div>
          </div>

          <div className="mb-12 md:mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-8 sm:mb-10">
              {t("about.whyEyebrow")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {razones.map((r) => (
                <div
                  key={r.title}
                  className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-dark transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center mb-5 group-hover:bg-dark group-hover:border-dark transition-colors">
                    <r.icon className="w-4 h-4 text-dark group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-dark mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 md:mb-20 border-l-2 border-gray-200 pl-6">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
              {t("about.audienceEyebrow")}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              {t("about.audienceText")}
            </p>
            <div className="flex flex-wrap gap-3">
              {audiencia.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-gray-100 border border-gray-300 text-sm font-medium text-gray-700"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-4 pt-10 border-t border-gray-100">
            <FaEnvelope className="w-4 h-4 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-dark mb-1">
                {t("about.thanksTitle")}
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
      </section>
    </PageLayout>
  );
}
