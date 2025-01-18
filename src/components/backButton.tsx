import {FC} from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  label?: string;
}

const BackButton: FC<BackButtonProps> = ({ label = 'Volver' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // Navega a la página anterior
      className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.707-11.707a1 1 0 00-1.414-1.414L6.586 9H14a1 1 0 110 2H6.586l3.707 3.707a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </button>
  );
};

export default BackButton;
