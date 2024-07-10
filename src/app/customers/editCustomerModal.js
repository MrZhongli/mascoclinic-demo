"use client"
import React, { useState } from 'react';

function EditCustomerModal({ customer, isOpen, onClose, onSave }) {
  const [editedCustomer, setEditedCustomer] = useState(customer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer({ ...editedCustomer, [name]: value });
  };

  const handleSaveChanges = () => {
    onSave(editedCustomer);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center`}>
      <div className="modal-content bg-white w-96 p-6 rounded-lg">
        <span className="close absolute top-0 right-0 p-2 cursor-pointer text-gray-500" onClick={onClose}>&times;</span>
        <h2 className="text-2xl font-bold mb-4 text-secondary-600">Editar Cliente</h2>
        <div className="mb-4">
          <label className="text-secondary-600 font-medium block mb-3">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={editedCustomer.nombre}
            onChange={handleInputChange}
            className=" border-secondary-400 text-secondary-600 p-2 rounded w-full outline-none focus:border-secondary-600 transition border-2"
            placeholder="Nombre"
          />
        </div>
        <div className="mb-4">
          <label className="text-secondary-600 font-medium block mb-3">Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={editedCustomer.apellido}
            onChange={handleInputChange}
            className=" border-secondary-400 text-secondary-600 p-2 rounded w-full outline-none focus:border-secondary-600 transition border-2"
            placeholder="Apellido"
          />
        </div>
        <div className="mb-4">
          <label className="text-secondary-600 font-medium block mb-3">Cédula:</label>
          <input
            type="text"
            name="cedula"
            value={editedCustomer.cedula}
            onChange={handleInputChange}
            className=" border-secondary-400 text-secondary-600 p-2 rounded w-full outline-none focus:border-secondary-600 transition border-2"
            placeholder="Cédula"
          />
        </div>
        <div className="mb-4">
          <label className="text-secondary-600 font-medium block mb-3">Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={editedCustomer.direccion}
            onChange={handleInputChange}
            className=" border-secondary-400 text-secondary-600 p-2 rounded w-full outline-none focus:border-secondary-600 transition border-2"
            placeholder="Dirección"
          />
        </div>
        <div className="mb-4">
          <label className="text-secondary-600 font-medium block mb-3">Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={editedCustomer.telefono}
            onChange={handleInputChange}
            className=" border-secondary-400 text-secondary-600 p-2 rounded w-full outline-none focus:border-secondary-600 transition border-2"
            placeholder="Teléfono"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="bg-secondary-400 text-white py-2 px-5 rounded-full hover:bg-secondary-600 transition-colors focus:outline-none"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-primary-800 text-white p-2 px-4 rounded-full hover:bg-primary transition-colors focus:outline-none ml-4"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCustomerModal;
