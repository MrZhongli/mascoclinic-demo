"use client";
import React, { useState } from "react";

function AddCustomerModal({ onClose, onCustomerAdded }) {
	const [customerData, setCustomerData] = useState({
		nombre: "",
		apellido: "",
		cedula: "",
		direccion: "",
		telefono: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCustomerData({ ...customerData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:8000/api/v1/customers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(customerData),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			// Actualizar la lista de clientes después de agregar uno
			onCustomerAdded();
			onClose();
		} catch (error) {
			console.error("Error al agregar cliente:", error);
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/25">
			<div className="w-1/2 bg-white px-5 py-8 rounded-xl">
				<h2 className="mb-2 font-semibold text-lg text-secondary-600 text-center">
					Registrar clientes{" "}
				</h2>
				<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
					<div className="mb-4 col-span-2">
						<label
							htmlFor="nombre"
							className="text-secondary-600 font-medium block mb-3"
						>
							Nombre
						</label>
						<input
							type="text"
							id="nombre"
							name="nombre"
							value={customerData.nombre}
							onChange={handleInputChange}
							required
							className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
						/>
					</div>
					<div className="mb-4 col-span-2">
						<label
							htmlFor="apellido"
							className="text-secondary-600 font-medium block mb-3"
						>
							Apellido
						</label>
						<input
							type="text"
							id="apellido"
							name="apellido"
							value={customerData.apellido}
							onChange={handleInputChange}
							required
							className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="cedula"
							className="text-secondary-600 font-medium block mb-3"
						>
							Cédula
						</label>
						<input
							type="text"
							id="cedula"
							name="cedula"
							value={customerData.cedula}
							onChange={handleInputChange}
							required
							className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="telefono"
							className="text-secondary-600 font-medium block mb-3"
						>
							Teléfono
						</label>
						<input
							type="text"
							id="telefono"
							name="telefono"
							value={customerData.telefono}
							onChange={handleInputChange}
							required
							className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
						/>
					</div>
					<div className="mb-4 col-span-2">
						<label
							htmlFor="direccion"
							className="text-secondary-600 font-medium block mb-3"
						>
							Dirección
						</label>
						<textarea
							type="text"
							id="direccion"
							name="direccion"
							value={customerData.direccion}
							onChange={handleInputChange}
							required
							className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
						/>
					</div>

					<div className="flex justify-end col-span-2">
						<button
							type="submit"
							className="rounded-full bg-secondary-400 py-2 px-5 hover:bg-secondary-600 transition-colors text-white"
						>
							Agregar
						</button>
						<button
							type="button"
							onClick={onClose}
							className="ml-2 rounded-full bg-primary-800 text-white px-4 py-2 hover:bg-primary transition-colors focus:outline-none focus:bg-primary"
						>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddCustomerModal;
