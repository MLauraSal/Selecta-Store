// src/services/api.js

const API_BASE = "/data/products.json";

// Obtener productos (Solo lectura inicial)
export const getAllProducts = async () => {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("No se pudo cargar el archivo JSON");
    return await res.json();
  } catch (error) {
    console.error("Error al leer JSON:", error);
    return []; // Retornar vacío si falla
  }
};

// Simulación: Crear producto (Devuelve el objeto listo para usar)
export const createProduct = async (data) => {
  // Simulamos un retraso de red (opcional, para realismo)
  await new Promise((resolve) => setTimeout(resolve, 500)); 
  const newProduct = {
    id: Date.now(), // Generamos un ID único temporal
    ...data,
  };
  return newProduct;
};

// Simulación: Actualizar producto
export const updateProductApi = async (id, data) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { id, ...data };
};

// Simulación: Borrar producto
export const deleteProductApi = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return id;
};