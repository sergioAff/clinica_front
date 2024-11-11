import clsx from "clsx";
import { ServicioItemType } from "../../types/Services/pages/ServicioItemType";
import React from "react";

export const ServicioItem = ({ currentSection, label }: ServicioItemType) => {
  return (
    <li
      className={clsx(
        "cursor-default font-bold rounded-full text-center px-1 md:px-2 py-3 transition-all duration-200 ease-in-out",
        {
          "text-black bg-white": currentSection === label,
          "text-gray-600": currentSection !== label,
        }
      )}
    >
      {label}
    </li>
  );
};
