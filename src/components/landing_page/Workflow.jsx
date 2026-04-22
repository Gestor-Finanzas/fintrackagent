import { useTranslation } from "react-i18next";

export default function Workflow() {
  const { t } = useTranslation();
  const steps = [
    { title: t("workflow.steps.s1Title"), desc: t("workflow.steps.s1Desc") },
    { title: t("workflow.steps.s2Title"), desc: t("workflow.steps.s2Desc") },
    { title: t("workflow.steps.s3Title"), desc: t("workflow.steps.s3Desc") },
    { title: t("workflow.steps.s4Title"), desc: t("workflow.steps.s4Desc") },
    { title: t("workflow.steps.s5Title"), desc: t("workflow.steps.s5Desc") },
    { title: t("workflow.steps.s6Title"), desc: t("workflow.steps.s6Desc") },
  ];

  return (
    <section
      id="workflow"
      className="bg-dark py-14 sm:py-20 md:py-24 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-2xl mb-14" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            {t("workflow.eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {t("workflow.titleStart")}{" "}
            <span className="text-primary">{t("workflow.titleAccent")}</span>.
          </h2>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed">
            {t("workflow.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="flex gap-5"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <span className="text-sm font-mono font-semibold text-primary pt-1 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 border-l border-white/10 pl-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
