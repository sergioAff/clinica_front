import Calendar from "react-calendar";
import { CalendarioType } from "@/types/Services/CalendarioTypes";
import "react-calendar/dist/Calendar.css"; // Asegúrate de importar los estilos por defecto

export const Calendario = ({ handleDateChange, date }: CalendarioType) => {
  const today = new Date(); // Obtener la fecha actual

  // Función para deshabilitar los domingos
  const tileDisabled = ({ date }: { date: Date }) => {
    return date.getDay() === 0;
  };

  return (
    <div className="md:w-1/2 flex gap-3 flex-col items-center justify-center p-5 ">
      <h3 className="font-bold text-xl mb-4">Selecciona una fecha</h3>
      <Calendar
        onChange={(value, event) => handleDateChange(value as Date, event)}
        value={date}
        minDate={today} // Establecer la fecha mínima en hoy
        tileDisabled={tileDisabled} // Deshabilitar domingos
        className="min-w-[100%] rounded-md border border-gray-300 hover:shadow-lg transition-shadow duration-200"
        tileClassName={({ date }) => {
          const isSelectable = date >= today && date.getDay() !== 0;
          return isSelectable ? "selectable-tile" : "";
        }}
      />
      <style jsx>{`
        .selectable-tile {
          background-color: #f0f8ff;
          border-radius: 8px;
        }
        .selectable-tile:hover {
          background-color: #add8e6;
        }
      `}</style>
    </div>
  );
};
