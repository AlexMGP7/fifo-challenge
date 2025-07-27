import { type FC, type InputHTMLAttributes } from 'react';

// 1. La interfaz ahora "extiende" todos los atributos de un input.
// Esto nos da acceso a `type`, `placeholder`, `required`, `disabled`, `value`, etc.
interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const FormField: FC<FormFieldProps> = ({ 
  id, 
  label, 
  className, // Podemos sacar className para fusionarlo con nuestras clases
  ...rest  // El resto de las props (type, value, onChange, required, etc.) van aquí
}) => (
  <div className="mb-5">
    <label htmlFor={id} className="block mb-2 text-sm font-medium">
      {label}
    </label>
    <input
      id={id}
      {...rest}
      className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className || ''}`}
    />
  </div>
);

export default FormField;