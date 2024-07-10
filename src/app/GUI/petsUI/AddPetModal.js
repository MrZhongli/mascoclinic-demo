"use client";
import React, { useState } from "react";
import { fetchCustomersWithPetByCedula, fetchCreatePet } from "../../api/ApiConfig";
import { SelectBreedDropDown, SelectTypeDropDown } from "../../components/SelectDropDown";

const AddPetModalByCedula = ({ onClose }) => {
  const [cedula, setCedula] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [nombre, setNombre] = useState("");
  const [selectedAnimalType, setSelectedAnimalType] = useState(null);
  const [selectedAnimalBreed, setSelectedAnimalBreed] = useState(null);
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSearchCustomer = async (e) => {
    e.preventDefault();
    if (!cedula) {
      setError("Por favor, ingresa la cédula del cliente.");
      return;
    }

    try {
      const customerData = await fetchCustomersWithPetByCedula(cedula);
      if (customerData && customerData.length > 0) {
        const customer = customerData[0];
        setCustomerName(customer.nombre);
        setNombre("");
        setError(null);
      } else {
        setError("No se encontró ningún cliente con esa cédula.");
      }
    } catch (error) {
      console.error("Error searching customer:", error);
      setError("Se produjo un error al buscar el cliente. Por favor, inténtalo de nuevo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const customerData = await fetchCustomersWithPetByCedula(cedula);
      if (customerData && customerData.length > 0) {
        const customerId = customerData[0].id;
        const newPet = {
          customerId,
          nombre,
          tipoAnimal: selectedAnimalType?.tipo || "",
          raza: selectedAnimalBreed || "",
          sexo,
          edad: parseInt(edad),
          creadoEn: new Date().toISOString(),
          actualizadoEn: new Date().toISOString(),
        };

        console.log("Datos de la nueva mascota:", newPet);

        const createdPet = await fetchCreatePet([newPet]);
        console.log("Pet created:", createdPet);
        setSuccessMessage("Mascota agregada exitosamente.");
        onClose();
      } else {
        setError("No se encontró ningún cliente con esa cédula.");
      }
    } catch (error) {
      console.error("Error creating pet:", error);
      setError(error.message || "Hubo un error al agregar la mascota. Por favor, inténtalo de nuevo.");
    }
  };

  const handleSexoChange = (e) => {
    setSexo(e.target.value);
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-1/2 bg-white px-5 py-8 rounded-xl">
        <h2 className="mb-2 font-semibold text-lg text-secondary-600 text-center">
          Registrar Mascota
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div>
          {customerName && (
            <p className="text-indigo-500">Cliente: {customerName}</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-secondary-600 font-medium block mb-3">
              Nombre de la Mascota:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
            />
          </div>
          <div>
            <label className="text-secondary-600 font-medium block mb-3">
              Sexo:
            </label>
            <select
              className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
              value={sexo} // Establecer el valor del select al estado sexo
              onChange={handleSexoChange} // Manejar el cambio de selección
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>
          <div>
            <label className="text-secondary-600 font-medium block mb-3">
              Raza:
            </label>
            <SelectBreedDropDown
              typeId={selectedAnimalType?.id}
              onChange={(breedSelected) => setSelectedAnimalBreed(breedSelected)}
            />
          </div>
          <div>
            <label className="text-secondary-600 font-medium block mb-3">
              Tipo de Animal:
            </label>
            <SelectTypeDropDown
              onChange={(selectedType) => setSelectedAnimalType(selectedType)}
            />
          </div>
          <div>
            <label className="text-secondary-600 font-medium block mb-3">
              Edad:
            </label>
            <input
              type="text"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="text-secondary-600 font-medium block mb-3">
              Cédula del Cliente:
            </label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
            />
            <button
              type="button"
              onClick={handleSearchCustomer}
              className="flex w-46 items-center bg-secondary-400 hover:bg-secondary-600 transition duration-300 rounded mt-3 font-semibold text-white px-5 py-2"
            >
              Confirmar cliente
            </button>
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="flex gap-x-3 items-center bg-secondary-400 hover:bg-secondary-600 transition duration-300 rounded-3xl font-semibold text-white px-5 py-1 mr-3"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400 focus:outline-none transition duration-300 focus:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModalByCedula;
