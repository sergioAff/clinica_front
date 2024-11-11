"use client";

import { ServicioItemType } from "@/types/Services/pages/ServicioItemType";
import { ServicioItem } from "@/ui/Services/ServicioItemNav";

export const NavBarServices = ({
  setCurrentSection,
  currentSection,
}: ServicioItemType) => {
  return (
    <div className="flex items-center justify-center w-full">
      <nav className="list-none flex items-center justify-center rounded-full gap-1 text-sm md:gap-10 border-b-2 border-gray-400">
        <ServicioItem
          currentSection={currentSection}
          label="Servicio"
          onClick={() => setCurrentSection?.("Selecciona el servicio")}
        />
        <ServicioItem currentSection={currentSection} label="Horario" />
        <ServicioItem currentSection={currentSection} label="Confirmación" />
        <ServicioItem currentSection={currentSection} label="Información" />
      </nav>
    </div>
  );
};
