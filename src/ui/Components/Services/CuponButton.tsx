"use client";
import { useState } from "react";
import axios from "axios";

export const CuponButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentInput, setContentInput] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = async () => {
    if (isVisible) {
      if (contentInput.trim().length > 4) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/codigo-promocional/`,
            {
              params: { codigo: contentInput },
            }
          );

          if (response.status === 200) {
            setModalMessage(
              `Recibirá un descuento del ${response.data.descuento}% !`
            );
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            setModalMessage("Código inválido");
          } else {
            setModalMessage("Error al verificar el código");
          }
        }
        setIsModalOpen(true);
        setIsVisible((prev) => !prev);
        setContentInput("");
      } else {
        setModalMessage("El código debe tener más de 4 dígitos");
        setIsModalOpen(true);
      }
    } else {
      setIsVisible((prev) => !prev);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <button
          onClick={handleClick}
          className="bg-gray-secondary font-semibold hover:bg-white hover:text-black text-white p-2 text-sm md:text-md rounded-md ring-offset-2 border-2 border-transparent hover:border-black active:ring-2 ring-gray-secondary transition-all duration-200 ease-in-out"
          aria-expanded={isVisible}
          aria-controls="promo-code-input"
        >
          {isVisible ? "Aplicar" : "Código Promocional"}
        </button>
        <input
          id="promo-code-input"
          type="text"
          value={contentInput}
          onChange={(e) => setContentInput(e.target.value)}
          placeholder="Código Promocional"
          className={`bg-white p-2 rounded-md border border-gray-300 placeholder:font-bold font-bold outline-none text-sm md:text-md focus:border-transparent focus:ring-2 ring-offset-2 focus:ring-gray-secondary ${
            !isVisible && "hidden"
          }`}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg shadow-black max-w-sm w-full flex flex-col gap-5 items-center justify-center">
            <p className="text-green-tertiary font-semibold text-lg text-center">
              {modalMessage}
            </p>
            <button
              onClick={closeModal}
              className="bg-gray-secondary text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all duration-200 ease-in-out"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
