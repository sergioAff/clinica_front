import { ReactNode } from "react";

export interface BtNavegacionServicesType {
  setCurrentSection: (section: string) => void;
  paginaANavegar: string;
  contenidoDelBoton: ReactNode;
  validate?: () => boolean;
  isError?: boolean;
  ventanaDeError?: ReactNode;
}
