import {FC} from 'react';
import ProductForm from '../components/form/productForm';

const AddProduct: FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <ProductForm />
    </div>
  );
};

export default AddProduct;
