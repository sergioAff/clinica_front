import Image from "next/image";

export const HomeSectionLatest = () => {
  return (
    <section className="relative flex flex-col md:flex-row mx-3 mb-10">
      <div
        className={`rounded-md absolute inset-0 md:w-1/2 flex flex-col lg:pt-2 p-4 sm:p-5 sm:pb-12 lg:p-12 bg-black bg-opacity-75 lg:bg-transparent md:static md:bg-opacity-0 z-10 gap-4 md:gap-6 text-white md:text-gray-secondary overflow-auto`}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold pb-4 border-b border-gray-600">
          Abordamos la Causa Principal
        </h2>
        <p className="text-lg lg:text-xl leading-relaxed mb-4">
          En nuestra clínica, nos diferenciamos por nuestro enfoque en tratar
          las causas subyacentes de tu malestar, en lugar de simplemente abordar
          los síntomas. Nuestro objetivo es ofrecerte un plan de cuidado
          personalizado que no solo atienda el problema que experimentas, sino
          que también evalúe tu salud general para restaurar el equilibrio desde
          el interior.
        </p>

        <p className="text-lg lg:text-xl leading-relaxed mb-4">
          Nos consideramos más que una clínica quiropráctica; somos un centro
          integral de bienestar. En nuestra práctica, la salud holística es
          fundamental, por lo que integramos conocimientos sobre nutrición,
          medicina tradicional y bienestar emocional. Creemos que estos aspectos
          son esenciales para tu salud general y que todos están
          interconectados.
        </p>

        <p className="text-lg lg:text-xl leading-relaxed mb-4">
          Nuestro compromiso es crear un ambiente acogedor y de apoyo, donde te
          sientas cómodo al expresar tus preocupaciones. Entendemos que hablar
          abiertamente sobre tus problemas de salud es crucial para recibir un
          tratamiento efectivo.
        </p>

        <p className="text-lg lg:text-xl leading-relaxed">
          Por ello, estamos aquí para apoyarte en cada paso de tu viaje hacia
          una salud duradera y una vitalidad óptima, proporcionándote las
          herramientas y el cuidado necesarios para lograrlo.
        </p>
      </div>

      <div className=" justify-center flex w-full md:w-1/2">
        <Image
          src={"/Home/3.jpg"}
          alt={"Centro de rehabilitacion"}
          title="Centro de rehabilitacion"
          priority
          width={1000}
          height={1000}
          className="w-full relative md:w-1/2 flex h-auto object-cover max-w-full rounded-md lg:max-w-[1000px] lg:h-auto shadow-lg md:shadow-md shadow-gray-primary lg:opacity-90"
        />
      </div>
    </section>
  );
};
