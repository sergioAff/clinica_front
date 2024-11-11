import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NavLinks } from "@/data/NavLinks";
import { LoginNavButton } from "@/ui/Components/login/LoginNavButton";

export function DesktopNavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex w-full gap-2 md:gap-0">
      <ul className="flex flex-row md:gap-4 lg:gap-8 gap-2 items-center justify-center md:w-4/5 md:justify-end hover:text-gray-600 w-auto">
        {NavLinks.map((link) => (
          <li
            key={link.nombre}
            className={clsx(
              "font-semibold  md:text-lg duration-200  transition-transform ",
              {
                "underline decoration-green-tertiary underline-offset-4 decoration-2 ":
                  pathname === link.enlace,
                "hover:text-gray-secondary hover:scale-105 ":
                  pathname !== link.enlace,
              }
            )}
          >
            <Link href={link.enlace}>{link.nombre}</Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-end md:w-1/2">
        <LoginNavButton />
      </div>
    </div>
  );
}
