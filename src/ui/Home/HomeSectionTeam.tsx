import { PhotoList } from "@/ui/Components/Home/PhotoList";

export function HomeSectionTeam() {
  return (
    <section className=" relative flex flex-col mx-3 gap-10 mb-10">
      <h3 className="text-xl text-center sm:text-3xl md:text-4xl font-bold underline underline-offset-4">
        Parte de nuestro equipo
      </h3>
      <PhotoList />
    </section>
  );
}
