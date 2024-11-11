import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Obtén el token del localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Verifica el token en el backend para obtener el usuario actual
      fetch("http://localhost:8000/user/", {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.email) {
            setUser({ email: data.email });
          }
        })
        .catch(() => {
          // Maneja errores aquí si es necesario
        });
    }
  }, []);

  return user;
}
