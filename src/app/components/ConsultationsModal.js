import React from 'react';

const ConsultationsModal = ({ medicalHistory, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h2 className="text-lg font-bold mb-4">Consultas - Historia Médica ID: {medicalHistory.id}</h2>
        {medicalHistory.consultations.map((consultation) => (
          <div key={consultation.id} className="border border-gray-300 p-3 mb-2">
            <h3 className="text-md font-bold">Consulta ID: {consultation.id}</h3>
            <p className="text-gray-600">Descripción: {consultation.descripcion}</p>
            <p className="text-gray-600">Receta: {consultation.receta}</p>
            <p className="text-gray-600">Tratamiento: {consultation.tratamiento}</p>
          </div>
        ))}
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Cerrar Consultas
        </button>
      </div>
    </div>
  );
};

export default ConsultationsModal;
