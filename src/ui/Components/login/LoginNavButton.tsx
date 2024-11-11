import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { PowerIcon } from "@heroicons/react/24/outline";
import { handleSignOut } from "../../../lib/actions";
import { ModalLogin } from "@/ui/Components/login/ModalLogin";

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-7 cursor-pointer"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

export function LoginNavButton({ toggleMenu }: { toggleMenu?: () => void }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [textModal, setTextModal] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setIsOpen(!isOpen);
  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const result = await handleSignOut();
      const message = result.message;

      setTextModal(message);
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
        if (result.success) {
          router.push("/login/");
        }
      }, 1500);

      if (toggleMenu) {
        setTimeout(() => {
          toggleMenu();
        }, 1500);
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      if (error instanceof Error) {
        setTextModal(`Ocurrió un error inesperado: ${error.message}`);
      } else {
        setTextModal("Ocurrió un error inesperado");
      }
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isModalOpen && <ModalLogin text={textModal} />}
      <div
        onClick={handleClick}
        className="flex flex-col items-center justify-center"
      >
        <div className="relative px-6 hidden sm:flex" ref={menuRef}>
          <UserIcon />

          {/* Desktop Menu */}
          {isOpen && (
            <div className="hidden sm:flex flex-col absolute -left-12 top-7 pt-2 px-2 mt-2 border-2 rounded-lg border-green-900 bg-white items-start justify-center ">
              <Link
                href="/login/cuenta"
                className="flex w-full justify-end items-center p-1 font-semibold hover:bg-green-tertiary/60 hover:text-white rounded-md"
              >
                <p className="mr-4"> Cuenta</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </Link>
              {/* Llamada correcta al handleSubmit con onClick */}
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 py-2 text-sm font-semibold hover:bg-green-tertiary/60 hover:text-white rounded-md mb-2"
              >
                <p> Cerrar sesión</p>
                <PowerIcon className="w-8" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}

        <div className="flex gap-5 justify-center w-full sm:hidden">
          <button
            onClick={toggleMenu}
            className={clsx(
              "hover:bg-green-tertiary rounded-lg font-semibold shadow-md shadow-gray-primary active:shadow-none w-1/2 hover:bg-transparent hover:ring-4 hover:outline-none hover:ring-green-primary transition-all ease-in duration-75 active:scale-95",
              {
                "bg-opacity-0 ring-2 ring-green-tertiary text-gray-primary":
                  pathname === "/login" || pathname == "/login/cuenta",
                "bg-green-primary text-white-primary hover:text-black":
                  pathname !== "/login" && pathname !== "/login/cuenta",
              }
            )}
          >
            <Link href="/login/cuenta" className="block py-2">
              Cuenta
            </Link>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={clsx(
              " rounded-lg font-semibold shadow-md shadow-gray-primary active:shadow-none w-1/2 min-h-[100%] hover:bg-transparent hover:ring-4 hover:outline-none hover:ring-green-primary hover:text-black transition-all ease-in duration-75 active:scale-95 bg-green-primary text-white-primary"
            )}
          >
            <p>Cerrar sesión</p>
          </button>
        </div>
      </div>
    </>
  );
}
