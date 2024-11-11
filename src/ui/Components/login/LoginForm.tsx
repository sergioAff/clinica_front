"use client";

import { useState } from "react";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { authenticate } from "../../../lib/actions";

export default function LoginForm() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage("");

    try {
      const result = await authenticate({ email, password });
      if (result.success) {
        setIsModalOpen(true);
        setTimeout(() => {
          router.push("/");
          setIsModalOpen(false);
        }, 1000);
      } else {
        setErrorMessage(result.message || "Falló la autenticación.");
      }
    } catch (error) {
      setErrorMessage("Ocurrió un error inesperado.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="space-y-6 " onSubmit={handleSubmit}>
      {isModalOpen && (
        <div className="font-bold flex flex-col items-center justify-center w-full gap-2">
          <h3 className="rounded-lg bg-green-500 text-white py-1.5 text-center w-full">
            Iniciaste sesión con éxito{" "}
            <CheckCircleIcon className="h-5 w-5 inline" />
          </h3>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {/* Campo de Email */}
        <div className="relative">
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="peer block w-full rounded-md border-b-2 border-gray-300 py-3 pl-10 placeholder:text-gray-500 focus:border-green-500 outline-none transition duration-200"
          />
          <AtSymbolIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-green-500 pointer-events-none" />
        </div>

        {/* Campo de Contraseña */}
        <div className="relative">
          <button
            className="absolute right-3 top-1/2  -translate-y-1/2"
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <AtSymbolIcon className=" text-gray-500 h-5 w-5 peer-focus:text-green-500 pointer-events-none" />
          </button>

          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            minLength={6}
            className="peer block w-full rounded-md border-b-2 border-gray-300 py-3 pl-10 placeholder:text-gray-500 focus:border-green-500 outline-none transition duration-200 "
          />
          <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-green-500 pointer-events-none" />
        </div>
      </div>

      {/* Botón de Enviar */}
      <button
        type="submit"
        className="w-full py-2 flex items-center justify-center text-white font-bold bg-green-500 rounded-lg transition duration-200 hover:bg-green-600 disabled:bg-gray-400"
        disabled={isPending}
      >
        <span>Iniciar Sesión</span>
        <ArrowRightIcon className="ml-2 h-5 text-gray-50" />
      </button>

      {/* Mensaje de Error */}
      {errorMessage && (
        <div className="flex items-center space-x-1 text-md text-red-600">
          <ExclamationCircleIcon className="h-5 w-5" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Opciones de Inicio de Sesión con Redes Sociales */}
      <div className="flex flex-col gap-2">
        <p className="text-center font-medium text-lg text-gray-600">
          Iniciar con
        </p>
        <div className="flex justify-center gap-5">
          {/* Botón de Google */}
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-8 h-8"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
          </div>

          {/* Botón de Facebook */}
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-8 h-8"
            >
              <linearGradient
                id="facebook-gradient"
                x1="9.993"
                x2="40.615"
                y1="9.993"
                y2="40.615"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#2aa4f4" />
                <stop offset="1" stopColor="#007ad9" />
              </linearGradient>
              <path
                fill="url(#facebook-gradient)"
                d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
              />
              <path
                fill="#fff"
                d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
              />
            </svg>
          </div>
        </div>
      </div>
    </form>
  );
}
