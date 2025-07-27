"use client";

import { type FC } from "react";
import FormField from "../components/form/formField";
import Spinner from "../components/ui/Spinner";
import { useAuthForm } from "../hooks/useAuthForm";

const Login: FC = () => {
  const {
    isRegister,
    toggleFormType,
    isLoading,
    error,
    fields,
    setters,
    handleSubmit,
  } = useAuthForm();

  return (
    // 1. Contenedor principal
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4">
      
      {/* 2. Tarjeta principal */}
      <div className="w-full max-w-4xl flex flex-row bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-75 duration-500">
        
        {/* --- COLUMNA IZQUIERDA: FORMULARIO --- */}
        {/* MODIFICADO: Se añaden clases condicionales para el ancho y la transición */}
        <div 
          className={`
            w-full p-8 sm:p-12
            ${isRegister ? 'lg:w-full' : 'lg:w-1/2'}
            transition-all duration-700 ease-in-out
          `}
        >
          {/* Header del formulario */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <img
                alt="FIFO System"
                src="/img/box.png"
                className="h-10 w-10 filter brightness-0 invert"
              />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isRegister ? 'Crea tu cuenta' : 'Bienvenido de vuelta al sistema FIFO'}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {isRegister ? 'Únete para empezar a organizar' : 'Inicia sesión en tu cuenta'}
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField id="firstName" label="Nombre" value={fields.firstName} onChange={(e) => setters.setFirstName(e.target.value)} disabled={isLoading} />
                <FormField id="lastName" label="Apellido" value={fields.lastName} onChange={(e) => setters.setLastName(e.target.value)} disabled={isLoading} />
              </div>
            )}
            
            <FormField id="email" label="Correo electrónico" type="email" value={fields.email} onChange={(e) => setters.setEmail(e.target.value)} required disabled={isLoading} />
            <FormField id="password" label="Contraseña" type="password" value={fields.password} onChange={(e) => setters.setPassword(e.target.value)} required disabled={isLoading} />
            
            {isRegister && (
              <FormField id="confirmPassword" label="Confirmar contraseña" type="password" value={fields.confirmPassword} onChange={(e) => setters.setConfirmPassword(e.target.value)} required disabled={isLoading} />
            )}

            <div>
              <button type="submit" className="group w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
                {isLoading ? <Spinner /> : (isRegister ? 'Crear cuenta' : 'Iniciar sesión')}
              </button>
            </div>
          </form>

          {/* Mensaje de error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Botón para alternar entre login y registro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {isRegister ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta?'}
              <button onClick={toggleFormType} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50" disabled={isLoading}>
                {isRegister ? ' Inicia sesión' : ' Regístrate ahora'}
              </button>
            </p>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: IMAGEN --- */}
        {/* MODIFICADO: Se quita 'hidden' y se añaden clases condicionales para el ancho y la transición */}
        <div 
          className={`
            lg:flex w-1/2 items-center justify-center bg-blue-500
            ${isRegister ? 'lg:w-0' : 'lg:w-1/2'}
            transition-all duration-700 ease-in-out
          `}
        >
          {/* El `overflow-hidden` en el contenedor padre evita que la imagen se vea mientras el div se encoge */}
          <img 
            src="/img/fifo.jpg"
            alt="Imagen decorativa del login" 
            className="w-full h-full object-cover"
          />
        </div>
        
      </div>
    </div>
  );
};

export default Login;