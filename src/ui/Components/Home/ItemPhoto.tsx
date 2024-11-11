import { ItemPhotoTeamType } from "@/types/ItemPhotoTeam";
import Image from "next/image";
import clsx from "clsx";

export const ItemPhoto = ({
  id_especialista,
  name,
  apellidos,
  profesion,
  foto,
  descripcion,
  active,
  handleToggle,
}: ItemPhotoTeamType) => {
  return (
    <div
      data-id={id_especialista}
      className={clsx(
        `relative cursor-pointer transition-all duration-500 ease-in-out`,
        {
          "w-full": active === id_especialista,
          "w-[60%] md:w-[70%]": active !== id_especialista,
        }
      )}
      onClick={() => handleToggle(id_especialista.toString())}
    >
      <Image
        src={foto}
        width={1000}
        height={1000}
        alt={`${profesion} ${name} ${apellidos}`}
        title={`${profesion} ${name} ${apellidos}`}
        priority
        className="absolute inset-0 object-cover w-full h-full rounded-md "
      />
      <div
        className={clsx(
          `absolute inset-0 bg-black bg-opacity-60 rounded-md flex items-end p-4 transition-opacity duration-300 ease-in-out`,
          {
            "opacity-100": active === id_especialista,
            "opacity-50": active !== id_especialista,
          }
        )}
      >
        <h4
          className={clsx("text-white text-lg tracking-wider font-bold", {
            "opacity-10": active === id_especialista,
            "opacity-100": active !== id_especialista,
          })}
        >
          {`${name} ${apellidos}`}
        </h4>
      </div>
      {active === id_especialista && (
        <div className="text-white overflow-auto text-center font-semiboldbold absolute inset-0 flex items-center tracking-normal md:tracking-wide justify-center p-4">
          <p>{descripcion}</p>
        </div>
      )}
    </div>
  );
};
