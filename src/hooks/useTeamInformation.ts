import { useEffect, useState } from "react";
import axios from "axios";

type EspecialistaType = {
  id_especialista: number;
  nombre: string;
  apellidos: string;
  edad: number;
  profesion: string;
  foto_url: string;
  descripcion: string;
  abr: string;
};

export const useTeamInformation = () => {
  const [teamInformation, setTeamInformation] = useState<EspecialistaType[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/especialistas/"
        );
        setTeamInformation(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  return teamInformation;
};
