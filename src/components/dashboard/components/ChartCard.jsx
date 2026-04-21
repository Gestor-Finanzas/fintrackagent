export default function ChartCard({ title, children, className, action }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 flex flex-col ${
        className || ""
      }`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-5">
          {title && (
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
