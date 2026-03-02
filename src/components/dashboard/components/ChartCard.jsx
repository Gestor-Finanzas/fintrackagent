export default function ChartCard({ title, children, className }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm flex flex-col ${className || ""}`}>
      {title && (
        <h3 className="text-sm font-semibold text-dash-text">{title}</h3>
      )}
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
}
