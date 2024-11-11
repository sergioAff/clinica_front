"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import { PacienteForm } from "@/ui/Services/PacientesForm";
import { CuponButton } from "@/ui/Components/Services/CuponButton";
import { CardService } from "@/ui/Components/Services/CardService";
import { NavBarServices } from "@/ui/Components/Services/NavBarServices";
import { Calendario } from "@/ui/Components/Services/Calendar";
import { HorariosDisponibles } from "@/ui/Components/Services/HorariosDisponibles";
import { BtNavegacionServices } from "@/ui/Components/Services/BtNavegacionServices";
import { PaymentComponent } from "@/ui/Components/Payment/PaymentComponent.";
import { CardServiceType } from "@/types/CardServiceType";
import { ServicioType } from "@/types/Services/ServiciosType";
import { HorarioError } from "@/ui/Errors/Services/HorarioError";

const back = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
);

export default function Page() {
  const [currentSection, setCurrentSection] = useState<string>("Servicio");
  const [servicios, setServicios] = useState<ServicioType[]>([]);
  const [selectedService, setSelectedService] =
    useState<CardServiceType | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/servicios/"
        );
        setServicios(response.data);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };

    fetchServicios();
  }, []);

  const handleDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setDate(value);
      setCurrentSection("Horario");
      setSelectedTime(null);
    }
  };
  const validateHorario = () => {
    if (!selectedTime) {
      setIsError(true);
      return false;
    }
    setIsError(false);
    return true;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col gap-5 px-3 items-start justify-center">
      {currentSection === "Servicio" && <CuponButton />}
      <div className="mt-4 flex flex-col gap-5 items-center justify-center w-full">
        <NavBarServices
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        {currentSection === "Servicio" && (
          <>
            {selectedService && (
              <Calendario handleDateChange={handleDateChange} date={date} />
            )}
            {servicios.map((servicio) => (
              <CardService
                key={servicio.id_servicios}
                title={servicio.nombre_servicio}
                rangoPrecioUYU={servicio.precio_UYU}
                rangoPrecioUSD={servicio.precio_USD || [0, 0]}
                rangoPrecioEUR={servicio.precio_EUR || [0, 0]}
                duracionMinutos={servicio.duracion}
                setSelectedService={setSelectedService}
                onSelect={scrollToTop}
                descripcion={servicio.descripcion}
              />
            ))}
          </>
        )}
        {currentSection === "Horario" && (
          <>
            {date && (
              <>
                <HorariosDisponibles
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  daySelected={date}
                />
                <div className="flex items-end gap-2 justify-end mt-10 w-full">
                  <BtNavegacionServices
                    setCurrentSection={setCurrentSection}
                    paginaANavegar="Servicio"
                    contenidoDelBoton="Volver atrás"
                  />
                  <BtNavegacionServices
                    setCurrentSection={setCurrentSection}
                    paginaANavegar="Confirmación"
                    contenidoDelBoton="Siguiente"
                    validate={validateHorario}
                  />
                </div>
              </>
            )}
          </>
        )}
        {currentSection === "Confirmación" && (
          <div className="flex flex-col items-center gap-4 justify-center mt-10 w-full">
            <div>
              <PaymentComponent setCurrentSection={setCurrentSection} />
            </div>
            <div className=" flex gap-1 justify-end items-end w-full">
              {" "}
              <BtNavegacionServices
                setCurrentSection={setCurrentSection}
                paginaANavegar="Horario"
                contenidoDelBoton="Volver atrás"
              />
            </div>
          </div>
        )}
        {currentSection === "Información" && (
          <>
            <div className="flex items-end gap-2 justify-start mt-10 w-full">
              <BtNavegacionServices
                setCurrentSection={setCurrentSection}
                paginaANavegar="Confirmación"
                contenidoDelBoton={back}
              />
            </div>

            {date && selectedTime && (
              <PacienteForm
                setCurrentSection={setCurrentSection}
                selectedService={selectedService}
                date={date}
                selectedTime={selectedTime}
                setAvailableTimes={setAvailableTimes}
                time={selectedTime}
                setSelectedTime={setSelectedTime}
                daySelected={date}
              />
            )}
          </>
        )}
      </div>
      {isError && <HorarioError handleClose={() => setIsError(false)} />}
    </section>
  );
}
