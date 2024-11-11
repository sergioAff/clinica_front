import { useMemo } from "react";
import { contactos } from "@/data/Contacts";
import { ContactCard } from "../../ui/Components/Contact/ContactCard";
import { LinksFooter } from "../../ui/Components/LinksFooter";
import { Map } from "@/ui/Components/Contact/Map";

const EXCLUDED_CONTACTS = ["Youtube", "Instagram", "Facebook"];
const EXCLUDED_ICONS = ["Whatsapp", "Email", "Teléfono"];

export default function Page() {
  const filteredContacts = useMemo(() => {
    return contactos.filter(
      (contacto) => !EXCLUDED_CONTACTS.includes(contacto.via.replace(": ", ""))
    );
  }, []);

  const filteredIcons = useMemo(() => {
    return contactos.filter(
      (contacto) => !EXCLUDED_ICONS.includes(contacto.via.replace(": ", ""))
    );
  }, []);

  return (
    <section className="flex flex-col items-center mx-3 mb-10 gap-10">
      {/* Contact Cards Section */}
      <div className="flex flex-col lg:flex-row-reverse lg:justify-end items-center w-full">
        <div className="flex flex-col lg:flex-row items-center lg:justify-start w-full lg:w-4/6">
          {filteredContacts.map((contacto) => (
            <ContactCard
              key={contacto.via}
              via={contacto.via}
              icon={contacto.icon || ""}
              direccion={contacto.direccion}
              enlace={contacto.enlace}
            />
          ))}
        </div>

        {/* Navigation Links Section */}
        <nav className="w-full md:w-1/6">
          <ul className="flex lg:flex-col w-full justify-center lg:pl-10 gap-8 sm:gap-4">
            {filteredIcons.map((contacto) => (
              <li
                key={contacto.via}
                className="transition-transform transform hover:scale-105 bg-gradient-to-br from-gray-600 to-green-tertiary/20 rounded-full p-2 flex items-center justify-center"
              >
                <LinksFooter
                  direccion={contacto.direccion}
                  nombre={contacto.icon}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Map Section */}
      <div className="w-full md:w-3/4 lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0">
        <Map />
      </div>
    </section>
  );
}
