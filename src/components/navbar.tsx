import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { getAuth, signOut } from 'firebase/auth';

// Secciones de la navegación
const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'FIFO Tasks', href: '/tasks', current: false },
  { name: 'History', href: '/history', current: false },
];

// Función para combinar clases de Tailwind
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cargar preferencia de tema desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  // Alternar modo oscuro
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  // Cerrar sesión
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('Logout exitoso');
      window.location.href = '/login'; // Redirigir al login tras cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Menú responsive (icono hamburguesa) */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <Bars3Icon className="block h-6 w-6" />
            </DisclosureButton>
          </div>

          {/* Logo + Navegación */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/src/assets/img/box.png"
                alt="FIFO System"
              />
            </div>
            {/* Items de menú (versión desktop) */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sección derecha (modo oscuro y cerrar sesión) */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {/* Botón para alternar modo oscuro */}
            <button
              onClick={toggleDarkMode}
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
            >
              <span className="sr-only">Toggle Dark Mode</span>
              {isDarkMode ? '🌙' : '☀️'}
            </button>

            {/* Botón de cerrar sesión */}
            <button
              onClick={handleSignOut}
              className="ml-4 rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Menú responsive (versión mobile) */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
