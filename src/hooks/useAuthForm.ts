import { useState, type FormEvent } from "react";
import { auth } from "../services/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

/**
 * Traduce los códigos de error de Firebase a mensajes amigables para el usuario.
 * @param errorCode - El código de error de Firebase (ej. 'auth/user-not-found').
 * @returns Un string con el mensaje de error para mostrar en la UI.
 */
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/user-not-found":
    case "auth/invalid-credential":
      return "Credenciales inválidas. Revisa tu correo y contraseña.";
    case "auth/wrong-password":
      return "La contraseña es incorrecta. Por favor, inténtalo de nuevo.";
    case "auth/email-already-in-use":
      return "Este correo electrónico ya está registrado. Intenta iniciar sesión.";
    case "auth/invalid-email":
      return "El formato del correo electrónico no es válido.";
    case "auth/weak-password":
      return "La contraseña es muy débil. Debe tener al menos 6 caracteres.";
    default:
      return "Ocurrió un error inesperado. Por favor, intenta de nuevo.";
  }
};

/**
 * Hook personalizado para manejar la lógica del formulario de autenticación.
 */
export const useAuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validación de contraseñas para el registro
    if (isRegister && password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setIsLoading(false);
      return;
    }

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        // Aquí podrías agregar lógica para guardar el nombre y apellido en el perfil del usuario
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Si la autenticación es exitosa, redirigir al dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Error de autenticación:", err.code);
      setError(getAuthErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  // Función para alternar entre login y registro
  const toggleFormType = () => {
    setIsRegister((prev) => !prev);
    setError(null); // Limpia los errores al cambiar de formulario
  };

  return {
    isRegister,
    toggleFormType,
    isLoading,
    error,
    fields: { email, password, confirmPassword, firstName, lastName },
    setters: { setEmail, setPassword, setConfirmPassword, setFirstName, setLastName },
    handleSubmit,
  };
};