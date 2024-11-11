import { motion } from "framer-motion";

const info = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-14"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
);

export const HorarioError = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
    >
      <div className="relative p-4 w-full max-w-md max-h-full transform transition-transform duration-300 ease-in-out scale-100 opacity-100">
        <motion.div
          className="relative rounded-lg shadow-lg bg-gray-secondary"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 text-center">
            <h3 className="mb-4 text-lg font-semibold text-white-primary flex items-center justify-center">
              {info}
            </h3>
            <p className="mb-5 text-base text-gray-600 dark:text-gray-300">
              Selecciona un horario para continuar.
            </p>
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
              onClick={handleClose}
            >
              Ok
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
