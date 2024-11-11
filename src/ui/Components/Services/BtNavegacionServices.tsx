import clsx from "clsx";
import { BtNavegacionServicesType } from "@/types/Services/BtNavegacionServicesType";

export const BtNavegacionServices = ({
  setCurrentSection,
  paginaANavegar,
  contenidoDelBoton,
  validate,
  isError,
  ventanaDeError,
}: BtNavegacionServicesType) => {
  const handleClick = () => {
    if (validate && !validate()) {
      return;
    }
    setCurrentSection(paginaANavegar);
  };

  return (
    <>
      <div
        className={clsx("", { "max-h-0": isError, "max-h-screen": !isError })}
      >
        {ventanaDeError}
      </div>
      <button
        onClick={handleClick}
        className="bg-gray-secondary text-white font-semibold py-1 px-2 rounded-md transition-all duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-black active:ring-2 ring-gray-secondary"
      >
        {contenidoDelBoton}
      </button>
    </>
  );
};
