const BASE_URL = "http://localhost:8080/Proyecto_Dylan_ReVibe/api";

export async function loginUsuario(usuario) {
    try {
        const response = await fetch(`${BASE_URL}/usuarios/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        const resultado = await response.json();

        // Validar errores devueltos por el backend
        if (!response.ok) {
            throw new Error(resultado.error || "Error al iniciar sesión.");
        }

        if (resultado.idUsuario) {
            // Limpiar posibles datos anteriores
            localStorage.removeItem("usuarioId");
            localStorage.removeItem("usuario");

            // Guardar el ID del usuario logueado
            localStorage.setItem("usuarioId", resultado.idUsuario);

            // Guardar el usuario completo como string (puedes usar esto para otras validaciones)
            localStorage.setItem("usuario", JSON.stringify(resultado));

            // Mostrar el localStorage actualizado
            const allLocalStorage = {
                usuarioId: localStorage.getItem("usuarioId"),
                usuario: localStorage.getItem("usuario")
            };
            console.log("Usuario guardado correctamente en localStorage:\n", allLocalStorage);

            return resultado; // Objeto del usuario
        } else {
            throw new Error("No se pudo obtener el ID del usuario.");
        }
    } catch (error) {
        console.error("Error en loginUsuario:", error);
        throw error;
    }
}

// Función asincrónica que obtiene la lista de usuarios desde el servidor
export const obtenerUsuarios = async () => {
  try {
    // Se hace una solicitud GET al endpoint de usuarios
    const response = await fetch(`${BASE_URL}/usuarios`, {
      method: "GET", // Tipo de solicitud
      headers: {
        "Content-Type": "application/json" // Tipo de contenido esperado
      }
    });

    // Si la respuesta no es exitosa, lanza un error personalizado
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.status);
    }

    // Convierte la respuesta a formato JSON
    const data = await response.json();

    return data;

  } catch (error) {
    // Captura y muestra cualquier error ocurrido durante la solicitud
    console.error('Hubo un problema con la operación fetch:', error);
  }
};

// Función exportada que permite crear un nuevo usuario
export const crearUsuario = async (nuevoUsuario) => {
  try {
    // Realiza una solicitud POST al servidor para crear un nuevo usuario
    const response = await fetch(`${BASE_URL}/usuarios`, {
      method: "POST", // Tipo de solicitud: enviar datos
      headers: {
        "Content-Type": "application/json" // El contenido que se envía es JSON
      },
      body: JSON.stringify(nuevoUsuario) // Convierte el objeto usuario a formato JSON para enviarlo
    });
    // Si la respuesta no es exitosa, lanza un error personalizado
    if (!response.ok) {
      throw new Error("No se pudo crear el usuario. Intenta más tarde.");
    }
    // if (!response.ok) {
    //   const errorText = await response.text();
    //   console.error("Detalles del error:", errorText);
    //   throw new Error("No se pudo crear el usuario. " + errorText);
    // }
    // Si la creación es exitosa, retornar los datos del usuario
    const data = await response.json();
    alert("Usuario creado exitosamente");
    return data;
  } catch (error) {
    // Captura el error lanzado en el "throw" y muestra un mensaje detallado
    console.error("Error al crear usuario:", error);
    throw new Error(error.message || "Error desconocido al crear usuario");
  }
};
// Función exportada que permite actualiza los datos del usuario
export const actualizarUsuario = async (usuario) => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/${usuario.idUsuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    });

    if (!response.ok) {
      throw new Error('No se pudo actualizar el usuario');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en actualizarUsuario:', error);
    throw error;
  }
};

export const correoYaExiste = async (correo) => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios`);
    if (!response.ok) throw new Error('No se pudo obtener la lista de usuarios.');

    const usuarios = await response.json();
    return usuarios.some(usuario => usuario.correoElectronico === correo);
  } catch (error) {
    console.error("Error verificando correo:", error);
    return false; // Por defecto no bloqueamos si hay error (opcional)
  }
};



// Obtener la lista de ciudades
export const obtenerCiudades = async () => {
  try {
    const response = await fetch(`${BASE_URL}/ciudades`);
    if (!response.ok) {
      throw new Error("Error al obtener ciudades");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener ciudades:", error);
    return []; // Retorna arreglo vacío si falla
  }
};

// Obtener la lista de roles
export const obtenerRoles = async () => {
  try {
    const response = await fetch(`${BASE_URL}/roles`);
    if (!response.ok) {
      throw new Error("Error al obtener roles");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    return [];
  }
};

// Función exportada que permite crear una imagen
export const crearImagen = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/fotos/articulo/imagenes`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data.error || 'Error al crear el artículo con imagen';
      throw new Error(error);
    }

    return data;

  } catch (error) {
    console.error("Error al subir imagen y crear artículo:", error);
    throw new Error(error.message || "Error desconocido al crear artículo");
  }
};

// Obtener la lista de roles
export const obtenerCategorias = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categorias`);
    if (!response.ok) {
      throw new Error("Error al obtener roles");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    return [];
  }
};

// Obtener la lista de productos y renderizarlos
export const cargarArticulos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/articulos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Error al cargar los productos");
    }

    const productos = await response.json();
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};