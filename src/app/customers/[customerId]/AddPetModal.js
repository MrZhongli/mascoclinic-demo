"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	SelectBreedDropDown,
	SelectTypeDropDown,
} from "../../components/SelectDropDown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchCreatePet, createMedicalHistory } from "../../api/ApiConfig";

export function AddPetModal({ open, ownerId }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const [selectedAnimalType, setSelectedAnimalType] = useState(null);
	const [selectedAnimalBreed, setSelectedAnimalBreed] = useState(null);

	const [success, setSuccess] = useState(false);

	const onSubmit = async (data) => {
		try {
			const { nombre, sexo, edad } = data;

			const petData = {
				customerId: ownerId,
				nombre,
				tipoAnimal: selectedAnimalType.tipo,
				raza: selectedAnimalBreed,
				sexo,
				edad: parseInt(edad),
			};

			const { data: createdPet } = await fetchCreatePet(petData);

			const createdHistory = await createMedicalHistory({
				petId: createdPet.id,
			});

			console.log(createdHistory);

			setSuccess(true);

			reset({
				nombre: "",
				sexo: "Macho",
				edad: "",
			});
		} catch (error) {
			console.log(error);
			setSuccess(false);
		}
	};

	const handleAnimalTypeOnChange = (selectedType) => {
		setSelectedAnimalType(selectedType);
	};

	const handleAnimalBreedOnChange = (breedSelected) => {
		setSelectedAnimalBreed(breedSelected);
	};

	if (open) {
		return (
			<section className="fixed inset-0 bg-black/25 flex justify-center items-center">
				<section className="max-w-[40%] w-1/2 bg-white px-5 py-8 rounded-xl">
					<h2 className="mb-2 font-semibold text-lg text-secondary-600 text-center">
						Añadir Mascota
					</h2>
					<form
						onSubmit={handleSubmit(onSubmit)}
						method="POST"
						className="grid grid-cols-2 gap-6"
					>
						<div className="col-span-2">
							<label className="text-secondary-600 font-medium block mb-3">
								Nombre:{" "}
							</label>
							<input
								placeholder="Eula"
								className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
								{...register("nombre", {
									required: "El nombre es obligatorio",
								})}
							/>
							{errors.nombre && (
								<span className="text-sm font-medium text-primary-800 my-2">
									{errors.nombre.message}
								</span>
							)}
						</div>

						<div>
							<label className="text-secondary-600 font-medium block mb-3">
								Edad (años):{" "}
							</label>
							<input
								type="number"
								placeholder="1"
								className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
								{...register("edad", {
									required: "La edad es obligatoria",
								})}
							/>
							{errors.edad && (
								<span className="text-sm font-medium text-primary-800 my-2">
									{errors.edad.message}
								</span>
							)}
						</div>

						<div>
							<label className="text-secondary-600 font-medium block mb-3">
								Sexo:{" "}
							</label>
							<select
								className="w-full p-2 text-secondary-600 font-medium outline-none focus:border-secondary-600 transition border-2 border-secondary-400 rounded"
								defaultValue="Macho"
								{...register("sexo")}
							>
								<option value="Macho">Macho</option>
								<option value="Hembra">Hembra</option>
							</select>
						</div>

						<div>
							<label className="text-secondary-600 font-medium block mb-3">
								Especie:{" "}
							</label>
							<SelectTypeDropDown onChange={handleAnimalTypeOnChange} />
						</div>

						<div>
							<label className="text-secondary-600 font-medium block mb-3">
								Raza:{" "}
							</label>

							<SelectBreedDropDown
								typeId={selectedAnimalType?.id}
								onChange={handleAnimalBreedOnChange}
							/>
						</div>

						<span
							className={`${
								success ? "opacity-100" : ""
							} w-full col-span-2 p-1 pointer-events-none bg-green-600 font-medium text-white text-sm text-center rounded-md transition opacity-0`}
						>
							Mascota creada correctamente
						</span>

						<div className="mt-5 flex gap-x-4 justify-end col-span-2 text-white font-medium">
							<button className="rounded-full bg-secondary-400 py-2 px-5 hover:bg-secondary-600 transition-colors ">
								Crear
							</button>

							<CloseButton />
						</div>
					</form>
				</section>
			</section>
		);
	}
}

function CloseButton() {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

	const handleCloseOnClick = (e) => {
		e.preventDefault();

		const params = new URLSearchParams(searchParams);

		params.delete("openModal", true);

		replace(`${pathName}${params}`);
	};

	return (
		<button
			onClick={handleCloseOnClick}
			className="rounded-full bg-primary-800 p-2 px-4 hover:bg-primary transition-colors"
		>
			Cancelar
		</button>
	);
}
