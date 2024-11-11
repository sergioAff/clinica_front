import { ElementoAcordeonServiciosType } from "@/types/ElementoAcordeonServicios";
import { useRef } from "react";
import clsx from "clsx";

export const ElementoAcordeonServicios = ({
  item,
  active,
  handleToggle,
}: ElementoAcordeonServiciosType) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <li className="p-3 rounded-lg border border-white/80 shadow-lg shadow-gray-secondary/60 w-full bg-opacity-50 md:bg-green-secondary md:bg-opacity-85 bg-black outline-none border-none transition-transform transform">
      <div>
        <h2
          onClick={() => handleToggle(item.id)}
          className="md:text-2xl text-md font-bold text-white flex justify-between items-center cursor-pointer select-none"
        >
          {item.title}
          <span className=" pr-1 text-2xl">
            {item.id === active ? "−" : "+"}
          </span>
        </h2>
      </div>
      <div
        ref={contentRef}
        className={clsx(
          "text-white overflow-hidden transition-max-height ease-in-out duration-300 tracking-wide",
          {
            "max-h-screen": active === item.id,
            "max-h-0": active !== item.id,
          }
        )}
      >
        <p className="mt-2">{item.content}</p>
      </div>
    </li>
  );
};
