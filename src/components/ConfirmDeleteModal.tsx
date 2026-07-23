export function ConfirmDeleteModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isDeleting = false
}: {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-regal-navy/60 backdrop-blur-sm transition-opacity"
        onClick={!isDeleting ? onCancel : undefined}
      />
      
      {/* Modal */}
      <div className="relative bg-white border border-metallic-gold/30 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="border-b border-gray-100 p-6 flex justify-between items-start">
          <div className="flex items-center gap-3 text-red-600">
            <span className="material-symbols-outlined text-3xl">warning</span>
            <h3 className="font-headline-md text-xl font-bold text-regal-navy">{title}</h3>
          </div>
          <button 
            onClick={onCancel}
            disabled={isDeleting}
            className="text-gray-400 hover:text-regal-navy transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="font-body-md text-gray-600 leading-relaxed">
            {message}
          </p>
          <p className="font-label-md text-xs uppercase tracking-widest text-red-500 font-bold mt-6">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 flex gap-4 justify-end border-t border-gray-100">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-6 py-3 font-label-md text-xs uppercase tracking-widest text-regal-navy hover:bg-gray-200 transition-colors disabled:opacity-50 font-bold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-8 py-3 bg-red-600 text-white font-label-md text-xs uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-lg shadow-red-600/20 font-bold"
          >
            {isDeleting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                Deleting...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">delete</span>
                Yes, Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
