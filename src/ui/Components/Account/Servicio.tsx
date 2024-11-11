import { SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

interface ServicioProps {
  id: string; // Agrega un identificador único para cada cita
  servicio: string;
  fecha: Date;
  hora: string;
}

export function Servicio({ id, servicio, fecha, hora }: ServicioProps) {
  const [editMode, setEditMode] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState(servicio);
  const [nuevaFecha, setNuevaFecha] = useState(fecha.toString().split("T")[0]);
  const [horariosDiponibles, setHorariosDisponibles] = useState<String[]>([]);
  const [cambiarHora, setCambiarHora] = useState<Boolean>(false);
  const [nuevaHora, setNuevaHora] =
    useState<SetStateAction<String | string>>(hora);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje de éxito/error
  const [showConfirmation, setShowConfirmation] = useState(false); // Para mostrar el modal de confirmación

  // Función para modificar la cita
  const modificarCita = async () => {
    const datosCita = {
      id_cita: id,
      servicio: nuevoServicio,
      fecha: nuevaFecha,
      hora: nuevaHora,
    };

    setLoading(true);
    const response = await fetch(
      `http://localhost:8000/api/citas/${id}/modificar/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosCita),
      }
    );
    if (response.ok) {
      setMessage("Cita modificada exitosamente");
      setEditMode(false); // Salir del modo edición
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.log("error", response);
      setMessage("Error al modificar la cita");
    }
    setLoading(false);
  };

  // Función para cancelar la cita
  const cancelarCita = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:8000/api/citas/${id}/cancelar/`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setMessage("Cita cancelada exitosamente");
      // Aquí puedes agregar lógica para eliminar la cita del estado o del DOM
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Recarga la página después de mostrar el mensaje
    } else {
      setMessage("Error al cancelar la cita");
    }
    setLoading(false);
  };

  // Función para mostrar la confirmación de cancelación
  const handleCancelClick = () => {
    setShowConfirmation(true);
  };

  // Función para confirmar la cancelación
  const confirmCancel = () => {
    setShowConfirmation(false);
    cancelarCita();
  };

  const onChangeHour = async () => {
    setCambiarHora(true);
    const response = await fetch(
      `http://localhost:8000/api/horarios-disponibles/?fecha=${
        nuevaFecha.toString().split("T")[0]
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

      setHorariosDisponibles(horariosDisponibles);
    } else {
      console.error("Error fetching available times");
    }
  };
  function onSelectedHour(horario: String) {
    if (horariosDiponibles.includes(horario)) {
      setNuevaHora(horario);
      setCambiarHora(false);
    } else {
      setMessage("La hora seleccionada no es válida");
    }
  }
  return (
    <li key={id}>
      <div
        className="
        px-1
        border-b-2
        border-green-primary
        bg-transparent
        rounded-md
        w-full
        outline-none
        flex
        justify-between
        mt-5"
      >
        {editMode ? (
          <div className="justify-between items-center w-full gap-3 flex">
            <div className=" flex flex-col flex-1 text-center gap-3 ">
              <h4 className=" font-semibold">Servicio</h4>
              <p className="py-1 cursor-no-drop">{servicio}</p>
            </div>
            <div className=" flex flex-col flex-1 text-center gap-3">
              <h4 className=" font-semibold">Fecha</h4>
              <input
                type="date"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                className="px-2 py-1 border border-black rounded-md bg-transparent w-full outline-none cursor-pointer"
              />
            </div>
            <div className=" flex flex-col flex-1 text-center gap-3">
              <h4 className=" font-semibold">Hora</h4>
              <motion.div
                className="relative"
                onHoverStart={onChangeHour}
                onHoverEnd={() => setCambiarHora(false)}
              >
                <motion.input
                  type="time"
                  value={nuevaHora.toString()}
                  onClick={(e) => e.preventDefault()}
                  onChange={(e) => setNuevaHora(e.target.value)}
                  className="px-2 py-1 border border-black rounded-md bg-transparent w-full outline-none cursor-pointer "
                />
                {cambiarHora && (
                  <ul className=" flex flex-col border border-black gap-3 bg-gray-200 rounded-md absolute w-full z-50">
                    <span
                      className="absoulte w-full flex items-center justify-center hover:bg-gray-300 rounded-md transition-colors duration-75 ease-in-out pt-1 z-50 hover:cursor-pointer"
                      onClick={() => setCambiarHora(false)}
                    >
                      <ArrowUpIcon className="w-6 h-6" />
                    </span>
                    {horariosDiponibles.length > 0 ? (
                      horariosDiponibles.map((horario) => (
                        <li
                          key={horario.toString()}
                          onClick={() => onSelectedHour(horario)}
                          className="cursor-pointer hover:bg-gray-300 rounded-md transition-colors duration-75 ease-in-out mb-2 z-50"
                        >
                          {horario}
                        </li>
                      ))
                    ) : (
                      <p className=" px-2 py-1 font-semibold tracking-wider">
                        No hay disponibilidad para este día
                      </p>
                    )}
                  </ul>
                )}
              </motion.div>
            </div>
          </div>
        ) : (
          <>
            <div className=" flex flex-col flex-1 text-center gap-3">
              <h4 className=" font-semibold">Servicio</h4>
              <p>{servicio}</p>
            </div>
            <div className=" flex flex-col flex-1 text-center gap-3">
              <h4 className=" font-semibold">Fecha</h4>
              <p>{fecha.toString()}</p>
            </div>
            <div className=" flex flex-col flex-1 text-center gap-3">
              <h4 className=" font-semibold">Hora</h4>
              <p>{hora}</p>
            </div>
          </>
        )}
      </div>

      {/* Mostrar mensaje de éxito o error */}
      {message && (
        <div className="mt-3 text-center text-green-600 font-semibold">
          {message}
        </div>
      )}

      <div className=" flex justify-evenly mt-3">
        {editMode ? (
          <>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-2 rounded-md hover:bg-blue-700"
              onClick={modificarCita}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button
              className="bg-gray-500 text-white font-semibold py-2 px-2 rounded-md hover:bg-gray-700"
              onClick={() => setEditMode(false)}
            >
              Cancelar Modificación
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-green-primary text-white font-semibold py-2 px-2 rounded-md hover:bg-green-800"
              onClick={() => setEditMode(true)}
            >
              Modificar
            </button>
            <button
              className="bg-red-600 text-white font-semibold py-2 px-2 rounded-md hover:bg-red-700"
              onClick={handleCancelClick}
              disabled={loading}
            >
              {loading ? "Cancelando..." : "Cancelar"}
            </button>
          </>
        )}
      </div>

      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed top-0 z-50 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">¿Estás seguro?</h3>
            <p className="mt-2">¿Realmente quieres cancelar esta cita?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={confirmCancel}
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
