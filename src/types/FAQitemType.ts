export interface FAQdataType {
  id: number;
  pregunta: string;
  respuesta: string;
}

export interface FAQitemType {
  id: number;
  pregunta: string;
  respuesta: string;
  onClick: (id: number) => void;
  active: number | null;
}
