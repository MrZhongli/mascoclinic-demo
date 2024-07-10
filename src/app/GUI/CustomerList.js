"use client";
import { Suspense, useEffect, useState } from "react";
import AddCustomerModal from "../customers/addCustomerModal";
import EditCustomerModal from "../customers/editCustomerModal";
import PlusIcon from "../../../public/icons/plus.svg";
import { SearchBar } from "../customers/SearchBar";
import { Table } from "../components/Table";
import { getAllCustomers, updateCustomer } from "../api/ApiConfig";

function CustomerList({ customers }) {
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [showAddModal, setShowAddModal] = useState(false);

	const handleEditCustomer = (customer) => {
		setSelectedCustomer(customer);
		setShowEditModal(true);
	};

	const handleSaveChanges = async (editedCustomer) => {
		try {
			await updateCustomer(editedCustomer.id, editedCustomer);
			const updatedCustomers = customers.map((customer) =>
				customer.id === editedCustomer.id ? editedCustomer : customer
			);
			setShowEditModal(false);
		} catch (error) {
			console.error("Error al actualizar cliente:", error);
		}
	};

	const handleSearch = async () => {
		try {
			const response = await fetch(
				`http://localhost:8000/api/v1/customers?cedula[eq]=${searchTerm}`
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setCustomers(data.data);
		} catch (error) {
			console.error("Error al buscar cliente:", error);
		}
	};

	const handleAddCustomer = () => {
		setShowAddModal(true);
	};

	const handleAddModalClose = () => {
		setShowAddModal(false);
	};

	return (
		<section className="bg-white p-5">
			<div className="flex justify-between mb-4">
				<SearchBar name="cedula" placeholder="Cedula del Cliente..." />

				<button
					className="flex gap-x-3 items-center bg-pink-400 hover:bg-pink-600 transition duration-300 rounded-3xl font-semibold text-sm text-white px-5 py-2 mr-3"
					onClick={handleAddCustomer}
				>
					<PlusIcon />
					Agregar cliente
				</button>
			</div>
			<div className="min-h-28 overflow-hidden">
				<Suspense fallback={<span className="block m-auto">Cargando...</span>}>
					<Table type="customers" data={customers} />
				</Suspense>
			</div>

			{showAddModal && (
				<AddCustomerModal
					onClose={handleAddModalClose}
					onCustomerAdded={() => {
						handleSearch();
						handleAddModalClose();
					}}
				/>
			)}
		</section>
	);
}

export default CustomerList;
