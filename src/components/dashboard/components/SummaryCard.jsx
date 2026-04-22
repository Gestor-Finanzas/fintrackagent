export default function SummaryCard({ label, value, color, hint }) {
  return (
    <div className="bg-gray-100 border border-gray-400 rounded-2xl p-5 sm:p-5">
      <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-gray-500">
        {label}
      </span>
      <p className={`text-2xl sm:text-3xl font-bold mt-2 ${color || "text-dark"}`}>
        {value}
      </p>
      {hint && (
        <p className="text-xs text-gray-500 mt-1">{hint}</p>
      )}
    </div>
  );
}
