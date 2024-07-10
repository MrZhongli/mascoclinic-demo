// CustomerForm.js
"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const CustomerForm = () => {
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleOnSubmit = async (data) => {
    try {
      console.log(data)
      const response = await fetch('http://127.0.0.1:8000/api/v1/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Customer added successfully');
    } catch (error) {
      console.error('Error adding customer:', error);
      setError('Hubo un error al agregar el cliente. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="w-2/5 m-10 bg-white p-4 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-black">Crear Cliente</h1>

      <div className="flex flex-col mb-4">
        <label htmlFor="nombre" className="text-sm font-medium mb-1" style={{ color: 'black' }}>Nombre</label>
        <input type="text" name="nombre" {...register('nombre', { required: true })} className={`border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} text-black p-2 rounded focus:outline-none focus:border-blue-500`} />
        {errors.nombre && <p className="text-red-500 text-sm mt-1">El nombre es obligatorio</p>}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="apellido" className="text-sm font-medium mb-1" style={{ color: 'black' }}>Apellido</label>
        <input type="text" name="apellido" {...register('apellido', { required: true })} className={`border ${errors.apellido ? 'border-red-500' : 'border-gray-300'} text-black p-2 rounded focus:outline-none focus:border-blue-500`} />
        {errors.apellido && <p className="text-red-500 text-sm mt-1">El apellido es obligatorio</p>}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="cedula" className="text-sm font-medium mb-1" style={{ color: 'black' }}>Cédula</label>
        <input type="text" name="cedula" {...register('cedula', { required: true })} className={`border ${errors.cedula ? 'border-red-500' : 'border-gray-300'} text-black p-2 rounded focus:outline-none focus:border-blue-500`} />
        {errors.cedula && <p className="text-red-500 text-sm mt-1">La cédula es obligatoria</p>}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="direccion" className="text-sm font-medium mb-1" style={{ color: 'black' }}>Dirección</label>
        <input type="text" name="direccion" {...register('direccion', { required: true })} className={`border ${errors.direccion ? 'border-red-500' : 'border-gray-300'} text-black p-2 rounded focus:outline-none focus:border-blue-500`} />
        {errors.direccion && <p className="text-red-500 text-sm mt-1">La dirección es obligatoria</p>}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="telefono" className="text-sm font-medium mb-1" style={{ color: 'black' }}>Teléfono</label>
        <input type="text" name="telefono" {...register('telefono', { required: true })} className={`border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} text-black p-2 rounded focus:outline-none focus:border-blue-500`} />
        {errors.telefono && <p className="text-red-500 text-sm mt-1">El teléfono es obligatorio</p>}
      </div>

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Crear Cliente</button>
    </form>
  );
};

export default CustomerForm;
