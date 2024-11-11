"use client";
import { useEffect, useState, useRef } from "react";
import { Opinion } from "@/ui/Components/About/Opinion";
import { CustomerOpinionType } from "@/types/multimedia/CustomerOpinionType";
import { CommentForm } from "@/ui/Components/About/CommentForm";

export const CustomersOpinions = () => {
  const [opinions, setOpinions] = useState<CustomerOpinionType[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/comentarios-pacientes/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Imprime los datos para verificar

        setOpinions(
          data.map((item: any) => ({
            email: item.email, // Cambiado a email
            nombre_paciente: `${item.nombre} ${item.apellidos}`,
            comentario: item.comentarios,
            fecha: item.fecha_ingreso,
          }))
        );
      } catch (error) {
        console.error("Error fetching opinions:", error);
      }
    };

    fetchOpinions();
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      const adjustHeight = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

      adjustHeight();

      textarea.addEventListener("input", adjustHeight);

      return () => {
        textarea.removeEventListener("input", adjustHeight);
      };
    }
  }, []);

  return (
    <div className="flex flex-col min-h-[40dvh]">
      <h1 className="py-5 text-xl text-center font-semibold tracking-wide">
        Reseñas de nuestros pacientes
      </h1>

      <div className="md:grid grid-cols-2 lg:grid-cols-3 gap-x-8 px-2">
        {opinions.map(
          (opinion) =>
            opinion.comentario && (
              <Opinion
                key={opinion.email}
                email={opinion.email}
                comentario={opinion.comentario}
              />
            )
        )}
      </div>
      <div className="flex flex-col gap-2 justify-center items-start mt-5">
        <CommentForm />
      </div>
    </div>
  );
};
