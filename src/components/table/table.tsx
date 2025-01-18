import {FC} from 'react';
import TableHeader from './tableHeader';
import TableRow from './tableRow';
import { Movement } from '../../types/inventory';

interface TableProps {
  movements: Movement[];
}

const Table: FC<TableProps> = ({ movements }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full border-collapse border text-sm ">
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
