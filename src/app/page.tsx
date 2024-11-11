import { HomeSectionPresentation } from "@/ui/Home/HomeSectionPresentation";
import { HomeSectionServicios } from "@/ui/Home/HomeSectionServicios";
import { HomeSectionTeam } from "@/ui/Home/HomeSectionTeam";
import { HomeSectionFAQ } from "@/ui/Home/HomeSectionFAQ";
import { HomeSectionLatest } from "@/ui/Home/HomeSectionLatest";

export default function Home() {
  return (
    <section className="flex flex-col h-auto">
      <HomeSectionPresentation />
      <HomeSectionServicios />
      <HomeSectionTeam />
      <HomeSectionFAQ />
      <HomeSectionLatest />
    </section>
  );
}
