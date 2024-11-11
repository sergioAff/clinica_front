import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { HorariosDisponiblesType } from "@/types/Services/HorariosDisponiblesType";

export const HorariosDisponibles = ({
  setSelectedTime,
  selectedTime,
  daySelected,
}: HorariosDisponiblesType) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const fetchAvailableTimes = useCallback(async () => {
    const response = await fetch(
      `http://localhost:8000/api/horarios-disponibles/?fecha=${
        daySelected.toISOString().split("T")[0]
      }`
    );
    if (response.ok) {
      const data = await response.json();
      const horariosDisponibles = data
        .filter((item: { disponible: boolean }) => item.disponible)
        .map((item: { hora: string }) => {
          const [hora, minutos] = item.hora.split(":");
          return `${hora}:${minutos}`;
        });

      setAvailableTimes(horariosDisponibles);
    } else {
      console.error("Error fetching available times");
    }
  }, [daySelected]);

  useEffect(() => {
    fetchAvailableTimes(); // Llama a la función al montar el componente

    const intervalId = setInterval(() => {
      fetchAvailableTimes(); // Llama a la función cada 30 segundos
    }, 3000); // 30000ms = 30 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, [fetchAvailableTimes]);

  return (
    <>
      <h3 className="font-bold text-center text-lg mb-4 py-10">
        Horarios disponibles para el{" "}
        <time
          dateTime={`${daySelected.getDate()} de ${daySelected.toLocaleString(
            "default",
            { month: "long" }
          )}`}
        >
          {daySelected.getDate()} de{" "}
          {daySelected.toLocaleString("default", { month: "long" })}
        </time>
      </h3>

      <ul className="grid grid-cols-2 gap-4 md:gap-8 w-1/2">
        {availableTimes.length > 0 ? (
          availableTimes.map((time) => (
            <li
              key={time}
              onClick={() => setSelectedTime(time)}
              className={clsx(
                "cursor-pointer p-1 rounded-md transition duration-200 border-2 text-center",
                {
                  "bg-white text-gray-secondary border-gray-secondary":
                    selectedTime === time,
                  "bg-gray-secondary text-white hover:bg-white hover:text-black border-transparent hover:border-black":
                    selectedTime !== time,
                }
              )}
            >
              {time}
            </li>
          ))
        ) : (
          <p className="font-bold text-center text-lg col-span-2">
            No hay horarios disponibles para este día
          </p>
        )}
      </ul>
    </>
  );
};
