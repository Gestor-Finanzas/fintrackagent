export default function ChartCard({ title, children, className }) {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm flex flex-col ${className || ""}`}>
      {title && (
        <h3 className="text-sm font-semibold text-dash-text mb-4">{title}</h3>
      )}
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
}
