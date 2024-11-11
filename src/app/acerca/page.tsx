import Link from "next/link";

import { CustomersOpinions } from "@/ui/Components/About/CustomersOpinions";

export default function Page() {
  return (
    <main className="mx-3">
      <div className="flex gap-3 items-end justify-end">
        <Link
          href="/acerca/legal"
          className="flex gap-1 font-bold bg-gradient-to-br from-green-primary/70 to-green-tertiary text-white group px-3 py-2 rounded-lg active:scale-95 transition-transform duration-150 ease-in-out"
        >
          Legal
        </Link>
        <Link
          href="/acerca/multimedia"
          className="flex gap-1 font-bold bg-gradient-to-br from-green-primary/70 to-green-tertiary text-white group px-3 py-2 rounded-lg active:scale-95 transition-transform duration-150 ease-in-out"
        >
          Multimedia
        </Link>
      </div>
      <div className="w-full flex items-center justify-center mt-5">
        <div className="p-6 md:w-3/5 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Quienes somos?
          </h2>
          <p className="text-gray-600 leading-relaxed font-semibold text-lg">
            Nuestra clínica, ubicada en Montevideo, está dedicada a brindar
            atención psicológica especializada a nuestros pacientes. Contamos
            con un equipo de profesionales altamente capacitados que ofrecen una
            amplia gama de servicios terapéuticos, adaptados a las necesidades
            individuales de cada persona. Nos enfocamos en proporcionar un
            entorno seguro y acogedor para ayudar a nuestros pacientes a superar
            sus desafíos emocionales y alcanzar un mayor bienestar mental.
          </p>
        </div>
      </div>
      <CustomersOpinions />
    </main>
  );
}
