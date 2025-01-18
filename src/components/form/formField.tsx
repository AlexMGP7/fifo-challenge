import {ChangeEvent,FC } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const FormField: FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
}) => (
  <div className="mb-5">
    <label htmlFor={id} className="block mb-2 text-sm font-medium">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value !== undefined ? value : ''}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required
    />
  </div>
);

export default FormField;
