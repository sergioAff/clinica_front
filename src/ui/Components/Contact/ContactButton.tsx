import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

export function ContactButton({ toggleMenu }: { toggleMenu?: () => void }) {
  const pathname = usePathname();
  return (
    <div>
      <div className="hidden sm:flex">
        <button
          className={clsx(
            "hover:bg-green-tertiary rounded-lg font-semibold shadow-md shadow-gray-primary active:shadow-none w-full sm:w-auto hover:bg-transparent hover:ring-4 hover:outline-none hover:ring-green-primary transition-all ease-in duration-75 hover:text-gray-secondary active:scale-95",
            {
              "bg-opacity-0 ring-2 ring-green-tertiary text-gray-primary":
                pathname === "/contactos",
              "bg-green-primary text-white-primary": pathname !== "/contactos",
            }
          )}
        >
          <Link
            href="/contactos"
            className="w-full h-full block py-1 sm:px-3 sm:py-2"
          >
            Contactarnos
          </Link>
        </button>
      </div>
      <div className="block sm:hidden">
        <button
          onClick={toggleMenu}
          className={clsx(
            "hover:bg-green-tertiary rounded-lg font-semibold shadow-md shadow-gray-primary active:shadow-none w-full sm:w-auto hover:bg-transparent hover:ring-4 hover:outline-none hover:ring-green-primary transition-all ease-in duration-75 hover:text-gray-secondary active:scale-95",
            {
              "bg-opacity-0 ring-2 ring-green-tertiary text-gray-primary":
                pathname === "/contactos",
              "bg-green-primary text-white-primary": pathname !== "/contactos",
            }
          )}
        >
          <Link
            href="/contactos"
            className="w-full h-full block py-1 sm:px-3 sm:py-2"
          >
            Contactarnos
          </Link>
        </button>
      </div>
    </div>
  );
}
