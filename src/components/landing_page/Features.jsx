import {
  FaWhatsapp,
  FaChartPie,
  FaLock,
  FaBell,
  FaFileCsv,
  FaMobileAlt,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();
  const features = [
    { icon: FaWhatsapp, title: t("features.items.whatsappTitle"), desc: t("features.items.whatsappDesc") },
    { icon: FaChartPie, title: t("features.items.dashboardTitle"), desc: t("features.items.dashboardDesc") },
    { icon: FaLock, title: t("features.items.privacyTitle"), desc: t("features.items.privacyDesc") },
    { icon: FaBell, title: t("features.items.alertsTitle"), desc: t("features.items.alertsDesc") },
    { icon: FaFileCsv, title: t("features.items.exportTitle"), desc: t("features.items.exportDesc") },
    { icon: FaMobileAlt, title: t("features.items.multiplatformTitle"), desc: t("features.items.multiplatformDesc") },
  ];

  return (
    <section id="features" className="bg-white py-14 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mb-10 md:mb-12" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            {t("features.eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
            {t("features.titleStart")}{" "}
            <span className="text-primary">{t("features.titleAccent")}</span>.
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-dark transition-colors duration-200"
              data-aos="fade-up"
              data-aos-delay={idx * 60}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:border-primary transition-colors">
                <f.icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base font-semibold text-dark mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
