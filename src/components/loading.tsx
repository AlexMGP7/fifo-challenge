import {FC} from 'react';

const Loading: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
      <p className="text-blue-500 dark:text-blue-400 text-lg font-semibold">Loading...</p>
    </div>
  );
};
export default Loading;
