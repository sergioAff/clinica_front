import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
interface InformacionExitoProps {
  onClose?: () => void;
  setCurrentSection: (section: string) => void;
}

export const InformacionExito: React.FC<InformacionExitoProps> = ({
  onClose,
  setCurrentSection,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (onClose) onClose();
    setCurrentSection("Servicio");
  }, [onClose, setCurrentSection]);

  useEffect(() => {
    const timer = setTimeout(handleClose, 2000);
    return () => clearTimeout(timer);
  }, [handleClose]);

  return (
    <>
      {isOpen && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-50 transition-opacity duration-300 ease-in-out"
        >
          <div className="relative w-11/12 max-w-md max-h-full md:w-1/3 transform transition-transform duration-300 ease-in-out scale-100 opacity-100">
            <motion.div
              className="relative p-6 rounded-lg shadow-lg bg-gray-200 flex flex-col gap-10 border border-black"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <h3 className="mb-4 text-lg font-semibold text-green-tertiary flex items-center justify-center tracking-wide">
                  Cita Agendada
                </h3>

                <button
                  type="button"
                  className="py-2 px-4 text-sm font-medium text-white bg-green-tertiary rounded-lg hover:scale-95 transition-transform duration-200 ease-in-out"
                  onClick={handleClose}
                >
                  Aceptar
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};
