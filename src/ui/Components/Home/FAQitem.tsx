import { useRef } from "react";
import { FAQitemType } from "@/types/FAQitemType";
import clsx from "clsx";

const up = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 18.75 7.5-7.5 7.5 7.5"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 7.5-7.5 7.5 7.5"
    />
  </svg>
);

const down = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
    />
  </svg>
);

export const FAQitem = ({
  pregunta,
  respuesta,
  onClick,
  active,
  id,
}: FAQitemType) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <li className="border-y py-5 border-black">
      <div
        className="cursor-pointer flex w-full justify-between"
        onClick={() => onClick(id)}
      >
        <h4 className="font-medium text-xl">{pregunta}</h4>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita que el click en el botón cierre el FAQ
            onClick(id);
          }}
          className="p-2 md:border border-transparent hover:border-black hover:rounded-full transition-all duration-100 ease-in-out"
        >
          {active === id ? up : down}
        </button>
      </div>
      <p
        ref={contentRef}
        className={clsx(
          "overflow-hidden transition-all ease-in-out duration-200 tracking-wider",
          {
            "max-h-screen": active === id,
            "max-h-0": active !== id,
          }
        )}
      >
        {respuesta}
      </p>
    </li>
  );
};
