import { contactos } from "@/data/Contacts";
import { LinksFooter } from "./Components/LinksFooter";
import Link from "next/link";
import { MapLink } from "@/ui/Components/MapLink";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="relative text-gray-secondary py-2 bg-white ">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sección de Contactos */}
          <nav className="flex flex-col">
            <h3 className={`text-lg font-bold text-center mb-2`}>Contactos</h3>
            <ul className="flex flex-col items-center gap-1">
              {contactos.map((contacto) => {
                if (
                  contacto.via.replace(": ", "") === "Youtube" ||
                  contacto.via.replace(": ", "") === "Instagram" ||
                  contacto.via.replace(": ", "") === "Facebook" ||
                  contacto.via.replace(": ", "") === "Teléfono"
                ) {
                  return null;
                } else {
                  return (
                    <li key={contacto.via}>
                      <LinksFooter
                        direccion={contacto.direccion}
                        nombre={contacto.enlace}
                        estilos="underline underline-offset-4"
                      />
                    </li>
                  );
                }
              })}
            </ul>
          </nav>

          {/* Sección de Redes Sociales */}
          <nav className="flex flex-col">
            <h3 className={` text-lg font-bold text-center mb-4 sm:mb-2`}>
              Redes Sociales
            </h3>
            <ul className="flex justify-center gap-8 sm:gap-4">
              {contactos.map((contacto) => {
                if (
                  contacto.via.replace(": ", "") === "Whatsapp" ||
                  contacto.via.replace(": ", "") === "Email" ||
                  contacto.via.replace(": ", "") === "Teléfono"
                ) {
                  return null;
                } else {
                  return (
                    <li key={contacto.via}>
                      <LinksFooter
                        direccion={contacto.direccion}
                        nombre={contacto.icon}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          </nav>

          {/* Sección de Dirección */}
          <div className="flex flex-col">
            <h3 className={` text-lg font-bold text-center mb-1`}>Dirección</h3>
            <MapLink />
          </div>
        </div>

        {/* Sección Legal y Derechos de Autor */}
        <div className="flex flex-col items-center justify-center mt-4">
          <h3 className={`text-lg font-bold`}>Legal</h3>
          <nav>
            <ul>
              <li className="underline underline-offset-2">
                <Link href={"/acerca/legal"}>Política de privacidad</Link>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col sm:flex-row items-center justify-center mt-2">
            <p>©{currentYear}. Todos los derechos reservados</p>
          </div>
        </div>
      </div>
      {/* SVG Background */}
      <div className="absolute inset-0 overflow-hidden rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Calque_1"
          viewBox="0 0 1300 550"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <style type="text/css">
            {`.st1{opacity:0.6;fill:#D8E8D8;enable-background:new;}`}
          </style>
          <path
            className="st1"
            d="M 0 250 C 600 450 650 100 1300 250 L 1300 550 L 0 550 L 0 250"
          >
            <animate
              attributeName="d"
              dur="5s"
              begin="1s"
              values="M 0 250 C 600 450 650 100 1300 250 L 1300 550 L 0 550 L 0 250;
                  M 0 250 C 600 100 650 450 1300 250 L 1300 550 L 0 550 L 0 250;
                  M 0 250 C 600 450 650 100 1300 250 L 1300 550 L 0 550 L 0 250"
              repeatCount="indefinite"
            />
          </path>
          <path
            className="st1"
            d="M 0 250 C 600 100 650 450 1300 250 L 1300 550 L 0 550 L 0 250"
          >
            <animate
              attributeName="d"
              dur="5s"
              values="M 0 250 C 600 100 650 450 1300 250 L 1300 550 L 0 550 L 0 250;
                  M 0 250 C 600 450 650 100 1300 250 L 1300 550 L 0 550 L 0 250;
                  M 0 250 C 600 100 650 450 1300 250 L 1300 550 L 0 550 L 0 250"
              repeatCount="indefinite"
            />
          </path>
          <path
            className="st1"
            d="M 0 250 C 950 350 950 150 1300 250 L 1300 550 L 0 550 L 0 250"
          >
            <animate
              attributeName="d"
              dur="5s"
              begin="2s"
              values="M 0 250 C 950 350 950 150 1300 250 L 1300 550 L 0 550 L 0 250;
                  M 0 250 C 350 150 350 350 1300 250 L 1300 550 L 0 550 L 0 250;
                  M 0 250 C 950 350 950 150 1300 250 L 1300 550 L 0 550 L 0 250"
              repeatCount="indefinite"
            />
          </path>
          <path
            className="st1"
            d="M 0 250 C 350 150 350 350 1300 250 L 1300 550 L 0 550 L 0 250"
          >
            <animate
              attributeName="d"
              dur="5s"
              values="M 0 250 C 350 150 350 350 1300 250 L 1300 550 L 0 550 L 0 250;
                  M 0 250 C 950 350 950 150 1300 250 L 1300 550 L 0 550 L 0 250;
                  M 0 250 C 350 150 350 350 1300 250 L 1300 550 L 0 550 L 0 250"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    </footer>
  );
};
