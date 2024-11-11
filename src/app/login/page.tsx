import LoginForm from "@/ui/Components/login/LoginForm";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center p-4 gap-5 ">
      <div className="relative flex flex-col w-full max-w-[400px] space-y-2.5">
        <header className="flex items-center rounded-lg p-3">
          <h1 className="text-2xl font-medium text-center w-full tracking-widest">
            Inicia sesión
          </h1>
        </header>
        <div className=" p-6 rounded-lg shadow-lg bg-white flex flex-col gap-5">
          <LoginForm />
          <Link
            href="/login/crearCuenta"
            className="text-green-tertiary/80 font-medium text-xl hover:text-green-tertiary/50"
          >
            Crear cuenta
          </Link>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-3">
          <Link
            href="#"
            className="text-green-tertiary/80 font-medium text-lg mx-2 hover:text-green-tertiary/50"
          >
            Recuperar contraseña
          </Link>
          <Link
            href="#"
            className="text-green-tertiary/80 font-medium text-lg mx-2 hover:text-green-tertiary/50"
          >
            ¿Olvidaste tu nombre de usuario?
          </Link>
        </div>
      </div>
    </main>
  );
}
