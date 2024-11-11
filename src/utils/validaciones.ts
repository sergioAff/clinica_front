import { PacientesFormType } from "@/types/Services/PacientesFormType";
import axios from "axios";

export const validarFormulario = async (
  data: PacientesFormType,
  time: string,
  setSelectedTime: (time: string) => void,
  daySelected: Date,
  setAvailableTimes: React.Dispatch<React.SetStateAction<string[]>>,
  setIsError: (isError: boolean) => void
): Promise<string[]> => {
  const errores: string[] = [];

  if (!data.fecha || !data.servicio || !data.hora) {
    errores.push("Fecha, Servicio y Hora son campos obligatorios.");
  }

  if (
    !data.first_name.trim() ||
    data.last_name.length < 2 ||
    !/^[A-Za-zÀ-ÿ\s]+$/.test(data.first_name)
  ) {
    errores.push(
      "El nombre debe tener al menos 2 caracteres y solo puede contener letras y espacios."
    );
  }

  if (
    !data.last_name.trim() ||
    data.last_name.length < 2 ||
    !/^[A-Za-zÀ-ÿ\s]+$/.test(data.last_name)
  ) {
    errores.push(
      "Los apellidos deben tener al menos 2 caracteres y solo pueden contener letras y espacios."
    );
  }

  if (!data.sexo || !["Masculino", "Femenino"].includes(data.sexo)) {
    errores.push("El sexo debe ser 'Masculino' o 'Femenino'.");
  }

  if (!data.fecha_nacimiento) {
    errores.push("La fecha de nacimiento es requerida.");
  } else {
    const fechaNacimiento = new Date(data.fecha_nacimiento);
    const hoy = new Date();
    if (fechaNacimiento > hoy) {
      errores.push("La fecha de nacimiento no puede ser una fecha futura.");
    }
  }

  if (data.direccion && data.direccion.length < 5) {
    errores.push("La dirección debe tener al menos 5 caracteres.");
  }

  if (!data.telefono.trim() || !/^[0-9]{7,15}$/.test(data.telefono)) {
    errores.push("El teléfono debe contener entre 7 y 15 números.");
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errores.push("El email tiene un formato inválido.");
  }

  if (errores.length <= 0) {
    try {
      const response = await fetch(
        "http://localhost:8000/api/reservar-horario/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fecha: daySelected.toISOString().split("T")[0],
            hora: time,
          }),
        }
      );

      if (!response.ok) {
        setIsError(true);
        errores.push(
          "Ya la hora para este día está ocupada. Por favor seleccione otra"
        );
      } else {
        // Enviar horario
        setSelectedTime(time);
        // Actualizar la lista de horarios disponibles después de la reserva
        setAvailableTimes((prev) => prev.filter((t) => t !== time));
      }
    } catch (error) {
      setIsError(true);
      errores.push("Error de conexión al intentar reservar la hora.");
    }
  }

  return errores;
};
