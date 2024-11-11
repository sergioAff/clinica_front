export interface ItemPhotoTeamType {
  id_especialista: string | number;
  name: string;
  apellidos: string;
  edad: number;
  profesion: string;
  abr: string;
  foto: string;
  descripcion: string;
  active: number | null;
  handleToggle: (id: string) => void; // Cambiado de (id: number) a (id: string)
}
