import { AcordeonServicos } from "@/ui/Components/Home/AcordeonServicios";
import Image from "next/image";

export const HomeSectionServicios = () => {
  return (
    <section className="relative bg-white bg-opacity-80 text-gray-secondary flex md:flex-row-reverse md:justify-evenly px-3 mb-5 py-5">
      <div className=" rounded-md absolute inset-0 md:w-2/3 flex flex-col justify-evenly lg:pt-2 items-start p-4 sm:p-5 sm:pb-12 lg:p-12 bg-black mx-3 my-5 bg-opacity-50 lg:bg-transparent md:static md:bg-opacity-0 z-10 gap-3 md:gap-5 text-white md:text-gray-secondary">
        <h3 className="text-center pt-3 text-2xl sm:text-4xl font-bold w-full">
          Nuestros servicios
        </h3>
        <div className="overflow-y-auto rounded-md md:px-3 md:pb-10">
          <AcordeonServicos />
        </div>
      </div>
      <Image
        src={"/Home/2.jpg"}
        alt="Una persona recibiendo un servicio de psicoterapia"
        title="Una persona recibiendo un servicio de psicoterapia"
        priority
        width={1000}
        height={1000}
        className="w-full relative md:w-1/3 flex justify-center h-auto object-cover max-w-full rounded-md lg:max-w-[1000px] lg:h-auto shadow-lg md:shadow-md shadow-gray-primary lg:opacity-90"
      />
    </section>
  );
};
