import axios from "axios";
import { Dispatch } from "react";

// Definición del tipo User
interface User {
  email: string;
  first_name: string;
  last_name: string;
  sexo?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  telefono?: string;
  fecha_ingreso?: string;
  notas_adicionales?: string;
  edad?: number;
  comentarios?: string;
}

export const validarActualizaciones = async (data: User): Promise<string[]> => {
  const errores: string[] = [];

  if (
    !data.first_name?.trim() ||
    data.first_name.length < 2 ||
    !/^[A-Za-zÀ-ÿ\s]+$/.test(data.first_name)
  ) {
    errores.push(
      "El nombre debe tener al menos 2 caracteres y solo puede contener letras y espacios."
    );
  }

  if (
    !data.last_name?.trim() ||
    data.last_name.length < 2 ||
    !/^[A-Za-zÀ-ÿ\s]+$/.test(data.last_name)
  ) {
    errores.push(
      "Los apellidos deben tener al menos 2 caracteres y solo pueden contener letras y espacios."
    );
  }

  if (data.fecha_nacimiento) {
    const fechaNacimiento = new Date(data.fecha_nacimiento);
    const hoy = new Date();
    if (fechaNacimiento > hoy) {
      errores.push("La fecha de nacimiento no puede ser una fecha futura.");
    }
  }

  if (data.direccion && data.direccion.length < 5) {
    errores.push("La dirección debe tener al menos 5 caracteres.");
  }

  if (!data.telefono?.trim() || !/^[0-9]{7,15}$/.test(data.telefono)) {
    errores.push("El teléfono debe contener entre 7 y 15 números.");
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errores.push("El email tiene un formato inválido.");
  }

  return errores;
};
