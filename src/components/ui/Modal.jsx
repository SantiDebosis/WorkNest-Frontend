import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#8ecae6] bg-opacity-50 transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4"
      >
        <div className="flex items-start justify-between p-4 border-b border-[#8ecae6] rounded-t">
          <h3 className="text-xl font-semibold text-[#023047]">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#219ebc] bg-transparent hover:bg-[#8ecae6]/50 hover:text-[#023047] rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-colors duration-150"
          >
            <X size={20} />
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}