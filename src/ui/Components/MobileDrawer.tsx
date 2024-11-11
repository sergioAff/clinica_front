import Link from "next/link";
import { MobileMenuButtonType } from "@/types/MobileButtonType";
import clsx from "clsx";
import { NavLinks } from "@/data/NavLinks";
import { LoginNavButton } from "@/ui/Components/login/LoginNavButton";
import { usePathname } from "next/navigation";

export const MobileDrawer: React.FC<MobileMenuButtonType> = ({
  isOpen,
  toggleMenu,
}) => {
  const pathname = usePathname();
  return (
    <div
      className={clsx(
        "fixed flex flex-col justify-center items-center z-30 top-0 right-0 h-full w-full bg-white-primary text-gray-secondary transition-transform duration-0 transform",
        {
          "translate-x-0": isOpen,
          "translate-x-full": !isOpen,
        }
      )}
    >
      <ul
        className={clsx(
          "flex flex-col justify-center items-center gap-8 transition-all h-full duration-300 w-full",
          { "translate-x-0": isOpen, "translate-x-full": !isOpen }
        )}
      >
        {NavLinks.map((link) => (
          <li
            key={link.nombre}
            className="text-2xl font-semibold active:scale-95 duration-100"
          >
            <Link
              href={link.enlace}
              className={clsx({
                "underline decoration-green-tertiary underline-offset-4 decoration-2 ":
                  pathname === link.enlace,
              })}
              onClick={toggleMenu}
            >
              {link.nombre}
            </Link>
          </li>
        ))}
      </ul>
      <div
        className={clsx(
          "mb-7 w-full px-5 cursor-pointer transition-all duration-300",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
      >
        <LoginNavButton toggleMenu={toggleMenu} />
      </div>
    </div>
  );
};
