"use client";
import { useState, useEffect } from "react";
import { ElementoAcordeonServicios } from "@/ui/Components/Home/ElementoAcordeon";
import { ServicioType } from "@/types/Services/ServiciosType";
import axios from "axios";

export const AcordeonServicos = () => {
  const [active, setActive] = useState<number | null>(null);
  const [serviciosOfrecidos, setServiciosOfrecidos] = useState<ServicioType[]>(
    []
  );

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/servicios/"
        );
        setServiciosOfrecidos(response.data);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };
    fetchServicios();
  }, []);

  function handleToggle(id: number) {
    if (active === id) {
      return setActive(null);
    }
    setActive(id);
  }

  return (
    <ul className="flex flex-col gap-4 md:gap-5 items-center justify-center w-full scroll">
      {serviciosOfrecidos &&
        serviciosOfrecidos.map((servicio, index) => (
          <ElementoAcordeonServicios
            key={servicio.id_servicios}
            item={{
              id: index,
              title: servicio.nombre_servicio,
              content: servicio.descripcion,
            }}
            active={active}
            handleToggle={handleToggle}
          />
        ))}
    </ul>
  );
};
