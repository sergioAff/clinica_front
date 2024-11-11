"use client";

import { CardServiceType } from "@/types/CardServiceType";
import { useState } from "react";
import clsx from "clsx";

const infoSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
);

const closeSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

export const CardService = ({
  title,
  rangoPrecioUYU,
  rangoPrecioUSD,
  rangoPrecioEUR,
  duracionMinutos,
  setSelectedService,
  onSelect,
  descripcion,
}: CardServiceType) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coin, setCoin] = useState<"UYU" | "USD" | "EUR">("UYU");

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleCoinChange = (newCoin: "UYU" | "USD" | "EUR") => {
    if (newCoin !== coin) {
      setCoin(newCoin);
    }
  };

  const handleSelectService = () => {
    if (setSelectedService) {
      setSelectedService({
        title,
        rangoPrecioUYU,
        rangoPrecioUSD,
        rangoPrecioEUR,
        duracionMinutos,
        descripcion,
      });
    }
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <li className="flex justify-between items-center gap-3 bg-white rounded-lg border border-gray-300 shadow-md p-4 w-full md:w-2/3 lg:w-1/2 transition-transform transform md:hover:scale-105">
      <div className="text-sm md:text-lg flex flex-col gap-2">
        <h3 className="font-bold">{title}</h3>
        <div
          className={clsx(
            "flex flex-col gap-1 transition-all duration-200 ease-in-out overflow-hidden",
            {
              "max-h-0": isVisible,
              "max-h-full": !isVisible,
            }
          )}
        >
          <div className="flex items-center">
            <button
              onClick={() => handleCoinChange("UYU")}
              className={clsx("text-sm font-semibold", {
                "text-black": coin === "UYU",
                "text-gray-500": coin !== "UYU",
              })}
            >
              UYU
            </button>
            <span className="px-2">/</span>
            <button
              onClick={() => handleCoinChange("USD")}
              className={clsx("text-sm font-semibold", {
                "text-black": coin === "USD",
                "text-gray-500": coin !== "USD",
              })}
            >
              USD
            </button>
            <span className="px-2">/</span>
            <button
              onClick={() => handleCoinChange("EUR")}
              className={clsx("text-sm font-semibold", {
                "text-black": coin === "EUR",
                "text-gray-500": coin !== "EUR",
              })}
            >
              EUR
            </button>
          </div>
          <p className="inline-block">
            {duracionMinutos} minutos por{" "}
            {coin === "UYU"
              ? `$${rangoPrecioUYU}`
              : coin === "USD"
              ? `$${rangoPrecioUSD} `
              : `€${rangoPrecioEUR}`}
          </p>
        </div>
        <p
          className={clsx("transition-all duration-300 ease-in-out", {
            "max-h-0 overflow-hidden": !isVisible,
            "max-h-screen": isVisible,
          })}
        >
          {descripcion}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={toggleVisibility}
          className="p-1 bg-gray-300 rounded-full text-gray-700 hover:bg-gray-400 transition-colors duration-200"
          aria-label={isVisible ? "Cerrar información" : "Abrir información"}
        >
          {!isVisible ? infoSvg : closeSvg}
        </button>
        <button
          onClick={handleSelectService}
          className="bg-gray-600 font-semibold hover:bg-gray-700 text-white p-2 text-sm md:text-md rounded-md transition-all duration-200 ease-in-out"
        >
          Seleccionar
        </button>
      </div>
    </li>
  );
};
