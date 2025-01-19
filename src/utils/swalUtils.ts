import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // Importa los estilos de SweetAlert2

export const baseSwal = Swal.mixin({
  customClass: {
    popup: "swal-custom-popup", // Clase personalizada para el fondo
    confirmButton: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700",
    cancelButton: "bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400",
    actions: "swal-custom-actions", // Clase para separar botones
  },
  buttonsStyling: false, // Usar estilos personalizados
});

export const showConfirmation = async (title: string, text: string) => {
  const result = await baseSwal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed; // Devuelve true si se confirma
};

export const showSuccess = (message: string) => {
  baseSwal.fire({
    icon: "success",
    title: "¡Éxito!",
    text: message,
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showError = (message: string) => {
  baseSwal.fire({
    icon: "error",
    title: "¡Error!",
    text: message,
    timer: 3000,
    timerProgressBar: true,
  });
};
