export default function ChartCard({ title, children, className }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${className || ""}`}>
      {title && (
        <h3 className="text-sm font-semibold text-dash-text mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}
