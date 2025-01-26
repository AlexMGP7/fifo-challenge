import { FC } from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="pagination-controls flex justify-between items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <p>
        Página {currentPage} de {totalPages}
      </p>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginationControls;
