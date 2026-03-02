export default function SummaryCard({ label, value, icon, iconBg, color }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-dash-text-secondary uppercase tracking-wider">
          {label}
        </span>
        <span
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg || "bg-dash-accent/10"}`}
        >
          {icon}
        </span>
      </div>
      <span className={`text-2xl font-bold ${color || "text-dash-text"}`}>{value}</span>
    </div>
  );
}
