import { FC } from "react";
import TableHeader from "./tableHeader";
import TableRow from "./tableRow";
import { Product } from "../../types/inventory";

interface TableProps {
  products: Product[];
}

const Table: FC<TableProps> = ({ products }) => {
  return (
    <div className="tables relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full border-collapse text-sm">
        <TableHeader />
        <tbody>
          {products.map((product) => (
            <TableRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
