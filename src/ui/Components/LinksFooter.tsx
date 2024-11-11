"use client";

import Image from "next/image";
import Link from "next/link";
import { FooterLinksType } from "@/types/FooterLinksType";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export const LinksFooter = ({
  direccion,
  nombre,
  estilos,
}: FooterLinksType) => {
  const isString = (value: any): value is string => {
    return typeof value === "string";
  };

  const isStaticImport = (value: any): value is StaticImport => {
    return value && typeof value === "object" && "src" in value;
  };

  const isImagePath = (value: string) => {
    return value.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
  };

  return (
    <Link target={"_blank"} className={estilos} href={direccion || "#"}>
      {isString(nombre) && isImagePath(nombre) ? (
        <Image
          src={nombre}
          alt="Link image"
          width={35}
          height={12}
          className=" min-w-8 sm:w-35 h-auto"
        />
      ) : isStaticImport(nombre) ? (
        <Image
          src={nombre}
          alt="Link image"
          width={35}
          height={12}
          className=" min-w-8 sm:w-35 h-auto"
        />
      ) : (
        nombre
      )}
    </Link>
  );
};
