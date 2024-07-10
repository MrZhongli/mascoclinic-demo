"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { DotsIcon } from "./icons/DotsIcon";
import { OpenIcon } from "./icons/OpenIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { deleteCustomer } from "../api/ApiConfig";

export function TableOptions({ type, itemId }) {
	const { refresh } = useRouter();

	const [expandedItemId, setExpandedItemId] = useState(null);

	const modalRef = useRef(null);

	const handleExpandDetails = (id) => {
		setExpandedItemId(expandedItemId === id ? null : id);
	};

	const [customerToDelete, setCustomerToDelete] = useState(null);

	const handleConfirmDelete = (id) => {
		setCustomerToDelete(id);
		modalRef.current.showModal();
		setExpandedItemId(null);
		refresh();
	};

	const handleDeleteCustomer = (id) => {
		deleteCustomer(id);
		modalRef.current.close();
	};

	return (
		<>
			<td className="px-3 py-2">
				<button
					onClick={() => handleExpandDetails(itemId)}
					className="flex gap-x-3 items-center  hover:bg-gray-400/10  transition duration-300 rounded-3xl font-bold text-xl text-secondary-400 px-5 py-1 mr-3"
				>
					<DotsIcon />
				</button>
			</td>

			{expandedItemId === itemId && (
				<td
					colSpan="6"
					className="rounded shadow absolute z-10 top-3 right-[8%] px-4 py-2 font-medium text-sm text-secondary-400"
					style={{ backgroundColor: "#F9F9F9" }}
				>
					<Link
						className="flex gap-x-2 items-center py-1 px-4 hover:text-secondary-600"
						href={`/${type}/${itemId}`}
					>
						<OpenIcon /> Detalles
					</Link>

					<button className="flex gap-x-2 items-center py-1 px-4 hover:text-secondary-600">
						<EditIcon /> Editar
					</button>

					<button
						onClick={() => handleConfirmDelete(itemId)}
						className="flex gap-x-2 items-center  py-1 px-4 text-primary-800 hover:text-primary"
					>
						<DeleteIcon /> Eliminar
					</button>
				</td>
			)}

			{/* {showEditModal && (
				<EditCustomerModal
					customer={selectedCustomer}
					isOpen={showEditModal}
					onClose={() => setShowEditModal(false)}
					onSave={handleSaveChanges}
				/>
			)} */}

			<dialog
				ref={modalRef}
				className="fixed z-20 inset-0 p-4 bg-white backdrop:bg-black/25"
			>
				<h2 className="text-lg font-bold mb-4 text-black">
					¿Estás seguro de eliminar este cliente?
				</h2>
				<div className="flex justify-end">
					<button
						onClick={() => {
							handleDeleteCustomer(customerToDelete);
						}}
						className="bg-primary-800 text-white px-4 py-2 rounded hover:bg-primary-900 focus:outline-none focus:bg-primary-900 mr-2"
					>
						Confirmar
					</button>
					<button
						onClick={() => modalRef.current.close()}
						className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
					>
						Cancelar
					</button>
				</div>
			</dialog>
		</>
	);
}
