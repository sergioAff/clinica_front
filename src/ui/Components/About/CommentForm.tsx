import { useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface Comment {
  email: string;
  comentario: string;
}

export const CommentForm: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const user = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      setModalMessage("Por favor, inicie sesión para enviar un comentario.");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
      return;
    }

    const comentario = textareaRef.current?.value;
    if (comentario) {
      try {
        const response = commentToEdit
          ? await fetch("http://localhost:8000/api/update-comentario/", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                email: user.email,
                comentario,
              }),
            })
          : await fetch("http://localhost:8000/api/comentarios/add/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                email: user.email,
                comentario,
              }),
            });

        const result = await response.json();
        if (response.ok) {
          setModalMessage(
            commentToEdit
              ? "Comentario actualizado exitosamente."
              : "Comentario enviado exitosamente."
          );
          setShowSuccessModal(true);
          textareaRef.current!.value = "";
          setCommentToEdit(null);
          if (onSuccess) onSuccess();
          setTimeout(() => {
            setShowSuccessModal(false);
            window.location.reload();
          }, 1500);
        } else {
          setModalMessage(result.message || "Error al procesar comentario.");
          setShowModal(true);
        }
      } catch (error) {
        console.error("Error al procesar comentario:", error);
        setModalMessage("Ha ocurrido un error inesperado.");
        setShowModal(true);
      }
    }
  };

  const handleDelete = async () => {
    if (user && commentToEdit) {
      try {
        const response = await fetch(
          "http://localhost:8000/api/comentarios/delete/",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              email: user.email,
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          setModalMessage("Comentario eliminado exitosamente.");
          setShowSuccessModal(true);
          setCommentToEdit(null);
          if (onSuccess) onSuccess();
          setTimeout(() => {
            setShowSuccessModal(false);
            window.location.reload();
          }, 1500);
        } else {
          setModalMessage(result.message || "Error al eliminar comentario.");
          setShowModal(true);
        }
      } catch (error) {
        console.error("Error al eliminar comentario:", error);
        setModalMessage("Ha ocurrido un error inesperado.");
        setShowModal(true);
      }
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 flex items-start flex-col gap-5"
      >
        <textarea
          name="comentario"
          id="comentario"
          ref={textareaRef}
          className="rounded-lg w-full sm:w-2/3 md:w-1/2 font-mono bg-gray-50 p-3 focus:border-green-tertiary outline-none resize-none border border-black bg-white/80 shadow shadow-black"
          placeholder="Cuéntenos su experiencia..."
          required
        />
        <input
          type="submit"
          className="rounded-lg px-3 py-1 text-lg text-white bg-gradient-to-br from-green-primary/70 to-green-tertiary hover:from-white hover:to-transparent border-2 hover:border-green-primary transition-all duration-150 hover:text-black active:scale-95 cursor-pointer ease-in-out"
          value={commentToEdit ? "Modificar Comentario" : "Enviar Comentario"}
        />
        {commentToEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg px-2 py-1 text-lg text-white bg-gradient-to-br from-red-400/70 to-red-600 hover:from-red-300 hover:to-red-500 border-2 border-red-600 transition-all duration-150 hover:border-red-700 transform shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
          >
            Eliminar Comentario
          </button>
        )}
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-5 shadow-lg">
            <p className="text-lg font-semibold">{modalMessage}</p>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-5 shadow-lg">
            <p className="text-lg font-semibold">{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};
