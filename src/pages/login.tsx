import { FC, FormEvent, useState } from 'react';
import { auth } from '../services/firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import FormField from '../components/form/formField'; // Asegúrate de que la ruta sea correcta

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isRegister && password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registro exitoso:', { firstName, lastName });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Inicio de sesión exitoso');
      }
      window.location.href = '/dashboard';
    } catch (err: any) {
      console.error('Error:', err.message);
      setError('Ocurrió un error al procesar tu solicitud');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="FIFO System"
          src="/img/box.png"
          className="mx-auto h-12 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight">
          {isRegister ? 'Crea tu cuenta' : 'Inicia sesión en tu cuenta'}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <>
              <FormField
                id="firstName"
                label="Nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormField
                id="lastName"
                label="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <FormField
            id="email"
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            id="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegister && (
            <FormField
              id="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isRegister ? 'Registrar' : 'Iniciar sesión'}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-2 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          {isRegister ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate ahora'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
