import { CardServiceType } from "@/types/CardServiceType";

export const DatosSeleccionados = ({
  date,
  selectedService,
  setCurrentSection,
  selectedTime,
  handleChange,
}: {
  date: Date | null;
  selectedService: CardServiceType | null;
  setCurrentSection: (section: string) => void;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  selectedTime: string | null;
}) => {
  return (
    <div className=" w-full flex flex-col">
      <p className="w-full">
        Fecha:
        <input
          name="fecha"
          value={date ? date.toISOString().split("T")[0] : ""}
          onChange={handleChange}
          onClick={() => setCurrentSection("Servicio")}
          className="text-green-tertiary hover:text-green-tertiary/60 flex flex-col items-start gap-4 cursor-pointer border-none outline-none"
        />
      </p>
      <p className="w-full">
        Hora:
        <input
          name="hora"
          value={selectedTime ? selectedTime : ""}
          className="text-green-tertiary hover:text-green-tertiary/60 flex flex-col items-start gap-4 cursor-pointer border-none outline-none"
          onChange={handleChange}
          onClick={() => setCurrentSection("Horario")}
        />
      </p>
      <p className="w-full">
        Servicio:
        <input
          name="servicio"
          value={selectedService?.title || ""}
          className="text-green-tertiary w-full hover:text-green-tertiary/60 flex flex-col items-start gap-4 cursor-pointer border-none outline-none"
          onChange={handleChange}
          onClick={() => setCurrentSection("Servicio")}
        />
      </p>
    </div>
  );
};
