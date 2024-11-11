import { useState, useEffect } from "react";
import { InformacionExito } from "@/ui/Components/Services/InformacionExito";
import { DatosSeleccionados } from "@/ui/Components/Services/DatosSeleccionados";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AddDateType } from "@/types/Services/AddDateType";

export const PacienteForm = ({
  setCurrentSection,
  date,
  selectedService,
  selectedTime,
}: AddDateType) => {
  const [formData, setFormData] = useState({
    email: "",
    fecha: "",
    servicio: "",
    hora: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  // Verificar token al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No has iniciado sesión aún...");
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
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: data.email, // Asumiendo que el backend devuelve el email del usuario
        }));
      } catch (error) {
        setErrorMessage("No has iniciado sesión aún...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Actualizar la fecha seleccionada
  useEffect(() => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        fecha: formattedDate,
      }));
    }
  }, [date]);

  // Actualizar la hora seleccionada
  useEffect(() => {
    if (selectedTime) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        hora: selectedTime,
      }));
    }
  }, [selectedTime]);

  // Actualizar el servicio seleccionado
  useEffect(() => {
    if (selectedService && selectedService.title) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        servicio: selectedService.title?.toString() ?? "",
      }));
    }
  }, [selectedService]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setIsError(false);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reservar-horario/",
        {
          email: formData.email,
          fecha: formData.fecha,
          hora: formData.hora,
          servicio: formData.servicio, // Usar el ID del servicio
        }
      );

      if (response.status === 201) {
        setShowSuccess(true);
        setFormData({
          email: "",
          fecha: "",
          servicio: "",
          hora: "",
        });
      } else {
        setErrorMessage("Error al crear la cita.");
        setIsError(true);
      }
    } catch (error) {
      setErrorMessage(`Error al crear la cita. ${error}`);
      setIsError(true);
      console.error("Error al enviar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showSuccess && (
        <InformacionExito
          onClose={() => setShowSuccess(false)}
          setCurrentSection={setCurrentSection}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto mt-8 p-6 bg-white rounded-lg shadow-md flex flex-col gap-4"
      >
        <h2 className="font-semibold text-xl text-center mb-5">
          Datos del paciente
        </h2>
        <p>
          Email: <span>{formData.email}</span>
        </p>
        <DatosSeleccionados
          date={date}
          selectedService={selectedService}
          setCurrentSection={setCurrentSection}
          handleChange={handleChange}
          selectedTime={selectedTime}
        />
        {isError && <div className="text-red-500">{errorMessage}</div>}
        <button
          type="submit"
          disabled={loading}
          className={`bg-green-500 text-white font-bold py-2 rounded w-full hover:bg-green-600 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </>
  );
};
