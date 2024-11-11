export type ServicioType = {
  id_servicios: string;
  nombre_servicio: string;
  precio_UYU: [number, number];
  precio_USD?: [number, number];
  precio_EUR?: [number, number];
  duracion: number;
  descripcion: string;
  item?: any;
};
