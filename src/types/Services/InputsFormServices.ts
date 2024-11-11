export interface InputsFormServices {
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: {
    first_name?: string;
    last_name?: string;
    sexo?: string;
    fecha_nacimiento?: string;
    direccion?: string;
    telefono?: string;
    email?: string;
    notas_adicionales?: string;
  };
}
