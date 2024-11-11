"use client";

import { useRef, useState, useEffect } from "react";
import { useTeamInformation } from "@/hooks/useTeamInformation";
import { ItemPhoto } from "@/ui/Components/Home/ItemPhoto";
import { ScrollButton } from "@/ui/Components/Home/ScrollButton";
import "@/style/photohList.css";

export const PhotoList: React.FC = () => {
  const teamInformation = useTeamInformation();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] =
    useState<boolean>(true);
  const [isRightButtonDisabled, setIsRightButtonDisabled] =
    useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (id: string) => {
    const index = teamInformation.findIndex(
      (persona) => persona.id_especialista.toString() === id
    );
    if (index !== -1) {
      setActiveIndex(index);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    const totalItems = teamInformation.length;

    if (container) {
      let newIndex = activeIndex;

      if (direction === "left") {
        newIndex = (activeIndex - 1 + totalItems) % totalItems;
      } else {
        newIndex = (activeIndex + 1) % totalItems;
      }

      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalItems = teamInformation.length;
    if (totalItems === 0) return;

    const activeItem = container.querySelector(
      `[data-id="${teamInformation[activeIndex].id_especialista}"]`
    ) as HTMLElement;

    if (activeItem) {
      const itemWidth = activeItem.clientWidth;
      const containerWidth = container.clientWidth;

      container.scrollTo({
        left: activeItem.offsetLeft - containerWidth / 2 + itemWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeIndex, teamInformation]);

  useEffect(() => {
    const totalItems = teamInformation.length;
    setIsLeftButtonDisabled(activeIndex === 0);
    setIsRightButtonDisabled(activeIndex === totalItems - 1);
  }, [activeIndex, teamInformation]);

  return (
    <div className="flex flex-col gap-10 rounded-md">
      <div className="relative flex items-center">
        <div className="flex overflow-x-auto scrollbar-hide" ref={containerRef}>
          <ul className="flex gap-1.5 h-[65dvh] md:h-[50dvh] min-w-[220dvw] md:min-w-[110dvw]">
            {teamInformation.map((persona, index) => (
              <ItemPhoto
                key={persona.nombre}
                id_especialista={persona.id_especialista}
                name={persona.nombre}
                apellidos={persona.apellidos}
                edad={persona.edad}
                profesion={persona.profesion}
                foto={persona.foto_url}
                descripcion={persona.descripcion}
                abr={persona.abr}
                active={index === activeIndex ? persona.id_especialista : null}
                handleToggle={handleToggle}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-full justify-center gap-5">
        <ScrollButton
          direction="left"
          onClick={() => handleScroll("left")}
          ariaLabel="Scroll left"
          disabled={isLeftButtonDisabled}
        />
        <ScrollButton
          direction="right"
          onClick={() => handleScroll("right")}
          ariaLabel="Scroll right"
          disabled={isRightButtonDisabled}
        />
      </div>
    </div>
  );
};
