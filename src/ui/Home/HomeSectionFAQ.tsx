import Link from "next/link";
import { Faq } from "@/ui/Components/Home/FAQ";
import Image from "next/image";

export const HomeSectionFAQ = () => {
  return (
    <section className="relative flex flex-col gap-10 md:flex-row md:justify-around bg-white bg-opacity-95 text-gray-700 p-6 mb-6 md:py-10">
      <Image
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: 'url("/Backgrounds/1.svg")' }}
        aria-hidden="true"
        src={""}
        alt={""}
      />
      <div className="relative z-20 flex flex-col gap-6 md:w-3/4 lg:w-1/2 mx-auto px-6 py-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          ¡Aprovecha nuestras ofertas exclusivas para nuevos pacientes!
        </h3>
        <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4">
          ¿Es tu primera visita con nosotros? ¡Disfruta de una tarifa especial!
          <Link
            href="/servicios"
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Selecciona el día y la hora que te convengan en nuestro calendario
          </Link>{" "}
          y permítenos asistirte para que te sientas en óptimas condiciones.
        </p>
        <h4 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-4">
          ¿Qué esperar en tu primera consulta?
        </h4>
        <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4">
          Durante tu primera cita, nuestro quiropráctico dedicará entre 30 y 60
          minutos para:
        </p>
        <ul className="list-disc list-inside text-base md:text-lg text-gray-700 mb-4 pl-5">
          <li>Conocer tus objetivos de salud.</li>
          <li>Evaluar cualquier dolor actual.</li>
          <li>Revisar traumas pasados.</li>
          <li>Analizar tu nivel de actividad.</li>
          <li>Realizar radiografías de tu columna vertebral.</li>
        </ul>
        <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4">
          Posteriormente, tendrás una segunda cita para revisar detalladamente
          las radiografías y discutir tu plan de atención con el especialista.
          Tu tratamiento quiropráctico será personalizado para adaptarse a tus
          necesidades específicas.
        </p>
        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
          Si tienes preguntas sobre tarifas o horarios, no dudes en{" "}
          <Link
            href="/contactos"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            contactarnos
          </Link>{" "}
          durante el horario comercial.
        </p>
      </div>

      <div className="md:w-1/2 z-20">
        <Faq />
      </div>
    </section>
  );
};
