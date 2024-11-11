import { ReactNode } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface FooterLinksType {
  direccion?: string;
  nombre: ReactNode | string | StaticImport;
  estilos?: string;
}
