import { Nav } from "@/ui/Components/Nav";
import { LogoLink } from "@/ui/Components/LogoLink";

export const Header = () => {
  return (
    <header
      className={`animationTopToBottom flex gap-10 md:gap-0 items-center justify-between pt-1 px-5 `}
    >
      <figure className="w-1/2 md:w-1/4 lg:w-1/5 z-40">
        <LogoLink />
      </figure>
      <div className="w-4/5 flex justify-end items-center z-30">
        <Nav />
      </div>
    </header>
  );
};
