"use client";
import React, { useState, useEffect } from "react";
import {
  fetchCustomerWithPet,
  fetchCustomersWithPetByCedula,
  deletePet,
} from "../../api/ApiConfig";
import AddPetModalByCedula from "./AddPetModal";
import PlusIcon from "../../../../public/icons/plus.svg";
import ConfirmModal from "../../components/ConfirmModal";
import Link from "next/link";
import PaginationComponent from "../../components/PaginationComponent";

const CustomerInfoPets = () => {
  const [customers, setCustomers] = useState([]);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [expandedCustomerId, setExpandedCustomerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10; // Número de elementos por página

  useEffect(() => {
    fetchCustomersData();
  }, [currentPage]); // Se dispara cada vez que currentPage cambia

  const fetchCustomersData = async () => {
    try {
      const customersData = await fetchCustomerWithPet();
      setCustomers(customersData);
      setFilteredCustomers(customersData);
      setError(null);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
      setFilteredCustomers([]);
      setError(
        "Hubo un error al obtener los clientes. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleAddPet = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleSearch = async () => {
    try {
      const customerData = await fetchCustomersWithPetByCedula(searchTerm);
      if (customerData && customerData.length > 0) {
        setFilteredCustomers(customerData);
        setError(null);
      } else {
        setFilteredCustomers([]);
        setError("No se encontró ningún cliente con esa cédula.");
      }
    } catch (error) {
      console.error("Error al buscar cliente:", error);
      setFilteredCustomers([]);
      setError(
        "Se produjo un error al buscar el cliente. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  const handleConfirmDelete = (petId) => {
    setSelectedPetId(petId);
    setShowConfirmModal(true);
  };

  const handleDeletePet = async () => {
    try {
      await deletePet(selectedPetId);
      const updatedPets = pets.filter((pet) => pet.id !== selectedPetId);
      setPets(updatedPets);
      console.log("Pet deleted successfully");
      setSelectedPetId(null);
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error deleting pet:", error);
      setError(
        "Hubo un error al eliminar la mascota. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleExpandDetails = (id) => {
    setExpandedCustomerId(expandedCustomerId === id ? null : id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Paginación de clientes
  const indexOfLastCustomer = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCustomer = indexOfLastCustomer - ITEMS_PER_PAGE;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  return (
    <div className="w-full bg-white p-5">
      <div className="flex justify-between mb-4">
        <div className="flex">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Cédula del cliente..."
            className="border  border-indigo-500/75 text-black p-2 rounded-full focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="flex gap-x-3 items-center bg-secondary-400 hover:bg-secondary-600 transition duration-300 rounded-3xl font-semibold text-sm text-white px-5 py-2 mr-3"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
        <button
          className="flex gap-x-3 items-center bg-pink-400 hover:bg-pink-600 transition duration-300 rounded-3xl font-semibold text-sm text-white px-5 py-2 mr-3"
          onClick={handleAddPet}
        >
          <PlusIcon /> Agregar mascota
        </button>
      </div>
      <table className="table-auto w-full border-collapse mt-2">
        <thead>
          <tr>
            <th
              className="px-4 py-2  text-indigo-400"
              style={{ backgroundColor: "#F4F4FB" }}
            >
              #ID
            </th>
            <th
              className="px-4 py-2  text-indigo-400"
              style={{ backgroundColor: "#F4F4FB" }}
            >
              CI del cliente
            </th>
            <th
              className="px-4 py-2  text-indigo-400"
              style={{ backgroundColor: "#F4F4FB" }}
            >
              Nombre
            </th>
            <th
              className="px-4 py-2  text-indigo-400"
              style={{ backgroundColor: "#F4F4FB" }}
            >
              Tipo de Animal
            </th>
            <th
              className="px-4 py-2  text-indigo-400"
              style={{ backgroundColor: "#F4F4FB" }}
            >
              Raza
            </th>
            <th
              className="px-4 py-2  text-indigo-400"
              style={{ backgroundColor: "#F4F4FB" }}
            >
              Sexo
            </th>
            <th
              className="px-4 py-2  text-indigo-400"
              style={{ backgroundColor: "#F4F4FB" }}
            >
              Edad
            </th>
            <th
              className="px-4 py-2  text-indigo-400"
              style={{ backgroundColor: "#F4F4FB" }}
            >
              Registrado
            </th>
            <th
              className="px-4 py-2  text-indigo-400"
              style={{ backgroundColor: "#F4F4FB" }}
            >
              Actualizado
            </th>
            <th
              className="px-4 py-2 text-indigo-400"
              style={{ backgroundColor: "#F4F4FB" }}
            ></th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map(
            (customer) =>
              customer.pets &&
              customer.pets.map((pet) => (
                <tr key={pet.id}>
                  <td
                    className="px-4 py-2 text-indigo-600"
                    style={{ backgroundColor: "#FCFAFA" }}
                  >
                    {customer.id}
                  </td>
                  <td
                    className="px-4 py-2 text-indigo-600"
                    style={{ backgroundColor: "#FCFAFA" }}
                  >
                    {customer.cedula}
                  </td>
                  <td
                    className="px-4 py-2 text-indigo-600"
                    style={{ backgroundColor: "#FCFAFA" }}
                  >
                    {pet.nombre}
                  </td>
                  <td
                    className="px-4 py-2 text-indigo-600"
                    style={{backgroundColor: "#FCFAFA" }}
                  >
                    {pet.tipoAnimal}
                  </td>
                  <td
                    className="px-4 py-2 text-indigo-600"
                    style={{ backgroundColor: "#FCFAFA" }}
                  >
                    {pet.raza}
                  </td>
                  <td
                    className="px-4 py-2 text-indigo-600"
                    style={{ backgroundColor: "#FCFAFA" }}
                  >
                    {pet.sexo}
                  </td>
                  <td
                    className="px-4 py-2 text-indigo-600"
                    style={{ backgroundColor: "#FCFAFA" }}
                  >
                    {pet.edad}
                  </td>
                  <td
                    className="px-4 py-2 text-indigo-600"
                    style={{ backgroundColor: "#FCFAFA" }}
                  >
                    {pet.creadoEn
                      ? new Date(pet.creadoEn)
                          .toISOString()
                          .slice(0, 10)
                      : "N/A"}
                  </td>
                  <td
                    className="px-4 py-2 text-indigo-600"
                    style={{ backgroundColor: "#FCFAFA" }}
                  >
                    {pet.actualizadoEn
                      ? new Date(pet.actualizadoEn)
                          .toISOString()
                          .slice(0, 10)
                      : "N/A"}
                  </td>
                  <td
                    className="px-4 py-2 text-indigo-600"
                    style={{ backgroundColor: "#FCFAFA" }}
                  >
                    <button
                      onClick={() => handleExpandDetails(customer.id)}
                      className="flex gap-x-3 items-center  hover:bg-gray-400  transition duration-300 rounded-3xl font-bold text-xl text-black px-5 py-1 mr-3"
                    >
                      ...
                    </button>
                  </td>
                  {expandedCustomerId === customer.id && (
                    <tr>
                      <td
                        colSpan="6"
                        className="fixed left-3/4 ms-16 px-4 py-2 text-black"
                        style={{ backgroundColor: "#F9F9F9" }}
                      >
                        <Link
                          className="block py-1 px-4 text-sm text-gray-700 hover:text-gray-900"
                          href={`/customer/${customer.id}`}
                        >
                          Detalles
                        </Link>
                        <button
                          onClick={() => handleConfirmDelete(customer.id)}
                          className="block py-1 px-4 text-sm text-red-600 hover:text-red-800"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  )}
                </tr>
              ))
          )}
        </tbody>
      </table>

      {showModal && (
        <AddPetModalByCedula
          customer={selectedCustomer}
          showModal={showModal}
          onClose={handleCloseModal}
          setPets={setPets}
          setError={setError}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal
          showModal={showConfirmModal}
          handleCloseModal={() => setShowConfirmModal(false)}
          handleConfirm={handleDeletePet}
          message="¿Estás seguro que deseas eliminar esta mascota?"
        />
      )}

      <div className="flex gap-x-3">
        <PaginationComponent
          currentPage={currentPage}
          totalItems={filteredCustomers.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CustomerInfoPets;
