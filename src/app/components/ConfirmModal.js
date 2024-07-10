import React from "react";

const ConfirmModal = ({ showModal, handleCloseModal, handleConfirm, message }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 shadow-md rounded">
        <h2 className="text-lg font-bold mb-4 text-black">{message}</h2>
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            className="bg-primary-800 text-white px-4 py-2 rounded hover:bg-primary-900 focus:outline-none focus:bg-primary-900 mr-2"
          >
            Confirmar
          </button>
          <button
            onClick={handleCloseModal}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
