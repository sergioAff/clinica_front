"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleSignOut } from "../../../lib/actions";
import { validarActualizaciones } from "@/utils/validarActualizaciones";
import { Servicio } from "@/ui/Components/Account/Servicio";

interface User {
  email: string;
  first_name: string;
  last_name: string;
  sexo?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  telefono?: string;
  fecha_ingreso?: string;
  notas_adicionales?: string;
  cedula?: string;
  edad?: number;
  comentarios?: string;
}

interface Cita {
  id_cita: string;
  idservicio: string;
  fecha: Date;
  hora: string;
}

const UserPanel = () => {
  const [user, setUser] = useState<User>({
    email: "",
    first_name: "",
    last_name: "",
    sexo: "",
    fecha_nacimiento: "",
    direccion: "",
    telefono: "",
    fecha_ingreso: "",
    notas_adicionales: "",
    edad: undefined,
    comentarios: "",
  });
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [citas, setCitas] = useState<Cita[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFeedbackMessage("No has iniciado sesión aun...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al cargar los datos.");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setFeedbackMessage("No has iniciado sesión aun...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSaveChanges = async () => {
    setSaving(true);
    const errores = await validarActualizaciones(user);
    if (errores.length > 0) {
      setFeedbackMessage(errores.join(", "));
      setSaving(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setFeedbackMessage("No hay sesión activa.");
      setSaving(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/user/update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setFeedbackMessage("Cambios guardados exitosamente.");
        setTimeout(() => setFeedbackMessage(null), 3000);
      } else {
        const data = await response.json();
        setFeedbackMessage(
          `Error: ${data.message || data.errors || "Error desconocido"}`
        );
      }
    } catch (error) {
      setFeedbackMessage("Error al actualizar los datos del usuario.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const result = await handleSignOut();
      const message = result.message;

      setFeedbackMessage(message);
      setTimeout(() => {
        if (result.success) {
          router.push("/login/");
        }
      }, 1500);
    } catch (error) {
      console.error("Error inesperado:", error);
      setFeedbackMessage("Ocurrió un error inesperado");
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFeedbackMessage("No hay sesión activa.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/user/delete/", {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        setFeedbackMessage("Tu cuenta ha sido eliminada.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        const data = await response.json();
        setFeedbackMessage(`Error: ${data.message || data.errors}`);
      }
    } catch (error) {
      setFeedbackMessage("Error al eliminar la cuenta.");
    }
  };

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/obtener-citas/?email=${user.email}`, // Envía el email en la query string
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCitas(data.citas); // Guarda el array de citas en el estado
        } else {
          const data = await response.json();
          setFeedbackMessage(`Error: ${data.message || data.errors}`);
        }
      } catch (error) {
        setFeedbackMessage("Error al obtener las citas.");
        console.error("Error fetching citas:", error);
      }
    };

    fetchUserAppointments();
  }, [router, user.email]);

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    handleDeleteAccount();
    closeDeleteModal();
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-green-primary"></div>
        <p className="text-center text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="user-panel p-6 max-w-2xl lg:max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-extrabold mb-6 text-gray-800">
        Panel de Usuario
      </h1>

      {user.email && (
        <div className=" flex flex-col gap-32 mt-10 lg:flex-row lg:justify-between w-full">
          <div className="flex-1">
            <div className="user-info grid grid-cols-1 gap-6 mb-6">
              {/* Nombre */}
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Nombre:
                </label>
                <input
                  type="text"
                  value={user.first_name}
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.target.value })
                  }
                  className="px-1 border-b-2 border-green-primary bg-transparent rounded-md w-full outline-none"
                  required
                />
              </div>

              {/* Apellido */}
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Apellido:
                </label>
                <input
                  type="text"
                  value={user.last_name}
                  onChange={(e) =>
                    setUser({ ...user, last_name: e.target.value })
                  }
                  className="px-1 border-b-2 border-green-primary bg-transparent rounded-md w-full outline-none"
                  required
                />
              </div>

              {/* Sexo */}
              <label className="text-lg font-semibold">Sexo:</label>
              <select
                value={user.sexo || ""}
                onChange={(e) => setUser({ ...user, sexo: e.target.value })}
                className="px-1 border-b-2 border-green-primary bg-transparent rounded-md w-full outline-none"
              >
                <option value="">Selecciona una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>

              {/* Fecha de nacimiento */}
              <label className="text-lg font-semibold">
                Fecha de Nacimiento:
              </label>
              <input
                type="date"
                value={user.fecha_nacimiento}
                onChange={(e) =>
                  setUser({ ...user, fecha_nacimiento: e.target.value })
                }
                className="px-1 border-b-2 border-green-primary bg-transparent rounded-md w-full outline-none"
              />

              {/* Dirección */}
              <label className="text-lg font-semibold">Dirección:</label>
              <input
                type="text"
                value={user.direccion || ""}
                onChange={(e) =>
                  setUser({ ...user, direccion: e.target.value })
                }
                className="px-1 border-b-2 border-green-primary bg-transparent rounded-md w-full outline-none"
              />

              {/* Teléfono */}
              <label className="text-lg font-semibold">Teléfono:</label>
              <input
                type="text"
                value={user.telefono || ""}
                onChange={(e) => setUser({ ...user, telefono: e.target.value })}
                className="px-1 border-b-2 border-green-primary bg-transparent rounded-md w-full outline-none"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-between items-center gap-5">
              <button
                onClick={handleSaveChanges}
                className={`bg-green-primary text-white font-semibold py-2 px-2 rounded-md hover:bg-green-800 ${
                  saving ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold py-2 px-2 rounded-md hover:bg-red-700"
              >
                Cerrar sesión
              </button>

              {/* Botón para abrir el modal de eliminar cuenta */}
              <button
                onClick={openDeleteModal}
                className="bg-gray-600 text-white font-semibold py-2 px-2 rounded-md hover:bg-gray-700"
              >
                Eliminar cuenta
              </button>
            </div>

            {/* Modal de confirmación para eliminar cuenta */}
            {showDeleteModal && (
              <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="modal-content bg-white p-6 rounded-md shadow-md max-w-md w-full">
                  <h2 className="text-xl font-bold mb-4">¿Estás seguro?</h2>
                  <p className="mb-6">
                    Esta acción no se puede deshacer. Se eliminarán todos los
                    datos asociados con tu cuenta.
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={confirmDelete}
                      className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 mr-2"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={closeDeleteModal}
                      className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className=" flex-1">
            <h3 className=" font-semibold text-lg text-center">
              Próximas citas
            </h3>
            <ul className=" flex flex-col gap-5">
              {citas.length > 0 ? (
                citas.map((cita) => (
                  <Servicio
                    id={cita.id_cita}
                    key={cita.id_cita}
                    servicio={cita.idservicio}
                    fecha={cita.fecha}
                    hora={cita.hora}
                  />
                ))
              ) : (
                <p>No tienes próximas citas.</p>
              )}
            </ul>
            {/* Mensaje de retroalimentación */}
            {feedbackMessage && (
              <p className="text-center mt-8 font-semibold tracking-wide bg-white p-2 rounded-md text-black">
                {feedbackMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserPanel;
