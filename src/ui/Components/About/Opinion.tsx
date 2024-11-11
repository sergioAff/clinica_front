import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

export interface CustomerOpinionType {
  email: string;
  comentario: string;
}

const Modal = ({
  isOpen,
  onClose,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-80 flex flex-col items-center justify-center">
        <p className=" text-center">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-tertiary text-white rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export const Opinion = ({ email, comentario }: CustomerOpinionType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/user/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserEmail(data.email);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error al obtener el usuario autenticado:", error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/comentarios/delete/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setModalMessage("Comentario eliminado exitosamente.");
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setModalMessage(result.message || "Error al eliminar comentario.");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      setModalMessage("Ha ocurrido un error inesperado.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="border border-black bg-white/80 mb-5 p-4 flex flex-col gap-2 shadow shadow-black rounded-lg font-mono">
      <p className="font-bold tracking-widest overflow-hidden">{email}</p>
      <p>{`"${comentario}"`}</p>
      <div className="flex gap-1 pt-2 w-full justify-end">
        {userEmail === email && (
          <button
            onClick={handleDelete}
            className="rounded-lg px-2 py-1 text-gray-800 bg-gradient-to-br group from-red-400/80 to-red-600 hover:from-red-300 hover:to-red-500 border-red-600 transition-all duration-150 hover:border-red-700 transform shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
          >
            <TrashIcon className="w-6 h-8 group-hover:-translate-y-1 transition-transform duration-150 ease-in-out" />
          </button>
        )}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={modalMessage}
        />
      )}
    </div>
  );
};
