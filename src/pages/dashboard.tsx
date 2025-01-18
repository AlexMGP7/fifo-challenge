import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="rounded p-4">
      <h2 className="font-bold text-lg">Pendientes</h2>
      <p className="text-3xl">8</p> {/* Número dinámico de tareas pendientes */}
      <p className="text-sm ">Total en la cola FIFO</p>
    </div>

  );
};

export default Dashboard;
