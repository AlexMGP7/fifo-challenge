import useTheme from '../hooks/useTheme';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { getAuth, signOut } from 'firebase/auth';
import { FC } from 'react';

const navigation = [
  { name: 'Principal', href: '/dashboard', current: true },
  { name: 'Historial', href: '/history', current: false },
];

const getNavLinkClasses = (current: boolean) =>
  `${current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
   block rounded-md px-3 py-2 text-base font-medium`;

const NavigationLinks: FC = () => (
  <>
    {navigation.map((item) => (
      <a key={item.name} href={item.href} className={getNavLinkClasses(item.current)}>
        {item.name}
      </a>
    ))}
  </>
);

export default function Navbar() {
  const { theme, toggleTheme } = useTheme(); // Usar el hook personalizado para el tema

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (error) {
      alert('Error al cerrar sesión. Inténtalo de nuevo.');
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Menú responsive */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <Bars3Icon className="block h-6 w-6" />
            </DisclosureButton>
          </div>

          {/* Navegación principal */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="hidden sm:flex items-center">
              <img
                className="h-8 w-auto sm:h-10"
                src="/img/box.png"
                alt="FIFO System"
              />
            </div>


            {/* Links de navegación */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavigationLinks />
              </div>
            </div>
          </div>

          {/* Controles a la derecha */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {/* Alternar tema */}
            <button
              onClick={toggleTheme}
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
            >
              <span className="sr-only">Alternar tema</span>
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>

            {/* Cerrar sesión */}
            <button onClick={handleSignOut} className="ml-4 flex items-center">
              <span className="sr-only">Cerrar sesión</span>
              {/* Ícono desde /public/img/logout.svg */}
              <img
                src="/img/logout.svg"
                alt="Cerrar sesión"
                className="h-8 w-8"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Panel móvil */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavigationLinks />
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
