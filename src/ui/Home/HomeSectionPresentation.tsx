import Image from "next/image";
import Link from "next/link";

export const HomeSectionPresentation = () => {
  return (
    <section className="relative flex flex-col md:flex-row mx-3 mb-10">
      <div
        className={` rounded-md absolute inset-0 md:w-1/2 flex flex-col justify-end lg:justify-start lg:pt-2 items-start p-4 sm:p-5 sm:pb-12 lg:p-12 bg-black bg-opacity-50 lg:bg-transparent md:static md:bg-opacity-0 z-10 gap-3 md:gap-5 text-white md:text-gray-secondary`}
      >
        <h2 className=" text-xl sm:text-3xl md:text-4xl font-bold">
          Tu camino hacia el bienestar
        </h2>
        <p className="text-sm sm:text-lg md:text-xl md:mb-2 lg:hidden">
          Ofrecemos servicios de terapia psicológica profesional para ayudarte a
          alcanzar un equilibrio emocional y mental.
        </p>

        <p className="text-sm sm:text-lg md:text-xl md:mb-2 lg:text-2xl lg:mb-4 hidden lg:block">
          Ofrecemos servicios de terapia psicológica profesional para ayudarte a
          alcanzar un equilibrio emocional y mental. Nuestro enfoque está
          diseñado para proporcionar el apoyo necesario en cada etapa de tu
          proceso de desarrollo personal.
        </p>

        <Link
          href="/servicios"
          className="relative p-px font-semibold tracking-wider text-white md:bg-green-tertiary sm:shadow-2xl cursor-pointer group rounded-xl sm:shadow-gray-secondary active:scale-95 transition-all duration-100"
        >
          <span className="absolute inset-0 rounded-xl">
            <span className="absolute inset-0 rounded-xl md:group-hover:bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(144,238,144,0.6)_0%,rgba(144,238,144,0)_100%)] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
          </span>
          <div className="relative flex items-center md:px-6 py-3 px-4 rounded-xl md:group-hover:bg-gray-primary/5 ring-white/80 ring-2 md:ring-0 ">
            <span className=" text-sm">Comienza aquí</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="md:w-6 md:h-6 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </Link>
      </div>
      <Image
        src="/Home/1.jpg"
        alt="Una persona recibiendo un servicio de psicoterapia"
        title="Una persona recibiendo un servicio de psicoterapia"
        priority
        width={1000}
        height={1000}
        className="w-full relative md:w-1/2 flex justify-center h-auto object-cover max-w-full rounded-md lg:max-w-[1000px] lg:h-auto shadow-lg md:shadow-md shadow-gray-primary lg:opacity-90"
      />
    </section>
  );
};
