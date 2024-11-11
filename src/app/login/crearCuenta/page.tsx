import CrearCuenta from "@/ui/Components/login/CrearCuenta";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center p-4 gap-5 ">
      <div className="relative flex flex-col w-full max-w-[400px] space-y-2.5">
        <header className="flex items-center rounded-lg p-3">
          <h1 className="text-2xl font-medium text-center w-full tracking-widest">
            Crear Cuenta
          </h1>
        </header>
        <div className=" p-6 rounded-lg shadow-lg bg-white flex flex-col gap-5">
          <CrearCuenta />
          <Link
            href="/login/"
            className="text-green-tertiary/80 font-medium text-xl hover:text-green-tertiary/50"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </main>
  );
}
