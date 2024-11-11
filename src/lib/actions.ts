export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const result = await response.json();
      return {
        success: false,
        message: result.message || "Autenticación fallida",
      };
    }

    const result = await response.json();
    localStorage.setItem("token", result.token);
    return {
      success: true,
      message: result.message || "Autenticación exitosa",
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return { success: false, message: "Ha ocurrido un error inesperado" };
  }
}

export async function createAccount({
  first_name,
  last_name,
  email,
  password,
}: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  try {
    const response = await fetch("http://localhost:8000/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
      }),
    });

    if (!response.ok) {
      // Si la respuesta no es OK, procesa el error
      const errorData = await response.json();
      console.table(errorData);
      return errorData;
      // throw new Error(errorData.detail);
    } else {
      // Si la respuesta es OK, devuelve los datos
      const data = await response.json();
      return {
        success: true,
        message: "Cuenta creada exitosamente",
        data: data,
      };
    }
  } catch (error) {
    console.error("Error en createAccount:", error);
    throw error;
  }
}

export async function handleSignOut() {
  try {
    const response = await fetch("http://localhost:8000/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Aunque no envías datos en el cuerpo, esta cabecera es estándar
      },
      credentials: "include", // Incluye cookies con la solicitud
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.removeItem("token"); // Elimina el token del localStorage

      return {
        success: true,
        message: result.message || "Sesión cerrada exitosamente.",
      };
    } else {
      return {
        success: false,
        message: result.message || "Error al cerrar sesión.",
      };
    }
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return { success: false, message: "Ha ocurrido un error inesperado." };
  }
}
