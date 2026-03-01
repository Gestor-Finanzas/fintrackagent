export default function ModalConfirmDelete({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm animate-fade-in">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
          <svg className="w-6 h-6 text-dash-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-dash-text text-center mb-2">
          Eliminar movimiento
        </h3>
        <p className="text-sm text-dash-text-secondary text-center mb-6">
          Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar este movimiento?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-dash-text border border-dash-border hover:bg-gray-50 transition-colors duration-150"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-dash-danger hover:bg-red-600 transition-colors duration-150"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
