import useEscapeKey from "../../../hooks/useEscapeKey";

export default function ModalConfirmDelete({ isOpen, onClose, onConfirm }) {
  useEscapeKey(onClose, isOpen);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-delete-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-sm animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-red-500 mb-2">
            Confirmar acción
          </span>
          <h3 id="modal-delete-title" className="text-xl font-bold text-dark">
            Eliminar movimiento
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Esta acción no se puede deshacer. ¿Estás seguro de que quieres
            eliminar este movimiento?
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
