import React from 'react';
import TableHeader from './tableHeader';
import TableRow from './tableRow';
import { Movement } from '../../types/inventory';

interface TableProps {
  movements: Movement[];
}

const Table: React.FC<TableProps> = ({ movements }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
        <TableHeader />
        <tbody>
          {movements.map((movement) => (
            <TableRow key={movement.id} movement={movement} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
