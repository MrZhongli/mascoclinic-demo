"use client";

import { useEffect, useState } from "react";
import { ArrowDownIcon } from "./icons/ArrowDownIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { PlusIcon } from "./icons/PlusIcon";

import styles from "../dropdown.module.css";
import {
	createAnimalBreed,
	createAnimalType,
	getAllAnimalBreedsByTypeId,
	getAllAnimalTypes,
} from "../api/ApiConfig";

export function SelectBreedDropDown({ typeId, onChange }) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [message, setMessage] = useState("");
	const [created, setCreated] = useState(false);
	const [breeds, setBreeds] = useState(null);
	const [filteredBreeds, setFilteredBreeds] = useState(breeds);
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		const fetchBreeds = async () => {
			const { data } = await getAllAnimalBreedsByTypeId({ typeId });

			setBreeds(data);
			setFilteredBreeds(data);
		};

		fetchBreeds();
	}, [typeId, created]);

	const handleOpenOnClick = (e) => {
		e.preventDefault();

		const checkIsOpen = open === false ? true : false;

		setOpen(checkIsOpen);
	};

	const handleItemOnClick = (item) => {
		setSelectedItem(item);
		onChange(item);
		setOpen(false);
	};

	const handleAddOnClick = async (e) => {
		e.preventDefault();

		if (search === "") setMessage("Escribe una raza, en el campo de texto");

		try {
			const breedData = { animalTypeId: typeId, raza: search };

			await createAnimalBreed({ breedData });

			setCreated(false);
			setCreated(true);

			setSearch("");
		} catch (error) {
			setMessage("Ha ocurrido un error, intente de nuevo");
			setCreated(false);
		}
	};

	const handleSearch = (search) => {
		setSearch(search);
	};

	useEffect(() => {
		const results = breeds?.filter(({ raza }) =>
			raza.toLowerCase().startsWith(search.toLowerCase())
		);

		if (message !== "") setMessage("");

		if (results?.length <= 0) setMessage("No se han encontrado resultados");

		setFilteredBreeds(results);
	}, [search, breeds]);

	return (
		<article className="relative">
			<button
				onClick={handleOpenOnClick}
				className="w-full bg-white flex justify-between items-center font-medium p-2 mb-2 rounded border-2 border-secondary-400"
			>
				<span>{selectedItem ? selectedItem : "Selecciona una raza"}</span>{" "}
				<ArrowDownIcon
					className={`${open ? "rotate-180" : ""} transition-transform`}
				/>
			</button>

			{open && (
				<section className="absolute z-10 w-full bg-white shadow p-3 rounded">
					<section className="flex gap-x-2">
						<div className="[&:has(input:focus)]:border-2 grow flex items-center gap-x-2 px-2 rounded border border-secondary-400 focus:border-secondary-600 focus:border-2">
							<SearchIcon className="pointer-events-none" />
							<input
								onChange={(e) => handleSearch(e.target.value)}
								className="w-full h-8 text-sm font-medium"
								placeholder="Buscar raza"
								value={search}
							/>
						</div>

						<button
							onClick={handleAddOnClick}
							className="rounded border border-secondary-400 py-1 px-3 hover:bg-secondary-400 hover:text-white transition-colors"
						>
							<PlusIcon />
						</button>
					</section>
					<ul
						className={`overflow-y-auto max-h-36 mt-2 text-sm font-medium ${styles.list}`}
					>
						{message ? (
							<span className="block p-1 font-medium text-primary-800 text-center">
								{message}
							</span>
						) : (
							filteredBreeds?.map(({ id, raza }) => (
								<li
									onClick={() => handleItemOnClick(raza)}
									key={id}
									className="text-secondary-600 rounded p-2 cursor-pointer hover:bg-black/5 transition-colors"
								>
									{raza}
								</li>
							))
						)}
					</ul>
				</section>
			)}

			{created && (
				<span
					className={`"w-full z-[8] absolute left-0 right-0 p-1 pointer-events-none bg-green-600 font-medium text-white text-sm text-center rounded-md ${styles.message}`}
				>
					Raza creada correctamente
				</span>
			)}
		</article>
	);
}

export function SelectTypeDropDown({ onChange }) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [message, setMessage] = useState("");
	const [created, setCreated] = useState(false);
	const [types, setTypes] = useState(null);
	const [filteredTypes, setFilteredTypes] = useState(types);
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		const fetchBreeds = async () => {
			const { data } = await getAllAnimalTypes();
			setTypes(data);
			setFilteredTypes(data);
		};

		fetchBreeds();
	}, [created]);

	const handleOpenOnClick = (e) => {
		e.preventDefault();

		const checkIsOpen = open === false ? true : false;

		setOpen(checkIsOpen);
	};

	const handleItemOnClick = (item) => {
		setSelectedItem(item.tipo);
		onChange(item);
		setOpen(false);
	};

	const handleAddOnClick = async (e) => {
		e.preventDefault();

		if (search === "") setMessage("Escribe un tipo, en el campo de texto");

		try {
			const typeData = { tipo: search };

			await createAnimalType({ typeData });

			setCreated(false);
			setCreated(true);

			setSearch("");
		} catch (error) {
			setMessage("Ha ocurrido un error, intente de nuevo");
			setCreated(false);
		}
	};

	const handleSearch = (search) => {
		setSearch(search);
	};

	useEffect(() => {
		const results = types?.filter(({ tipo }) =>
			tipo.toLowerCase().startsWith(search.toLowerCase())
		);

		if (message !== "") setMessage("");

		if (results?.length <= 0) setMessage("No se han encontrado resultados");

		setFilteredTypes(results);
	}, [search, types]);

	return (
		<article className="relative">
			<button
				onClick={handleOpenOnClick}
				className="w-full bg-white flex justify-between items-center font-medium p-2 mb-2 rounded border-2 border-secondary-400"
			>
				<span>{selectedItem ? selectedItem : "Selecciona una especie"}</span>{" "}
				<ArrowDownIcon
					className={`${open ? "rotate-180" : ""} transition-transform`}
				/>
			</button>

			{open && (
				<section className="absolute z-10 w-full bg-white shadow p-3 rounded">
					<section className="flex gap-x-2">
						<div className="[&:has(input:focus)]:border-2 grow flex items-center gap-x-2 px-2 rounded border border-secondary-400 focus:border-secondary-600 focus:border-2">
							<SearchIcon className="pointer-events-none" />
							<input
								onChange={(e) => handleSearch(e.target.value)}
								className="w-full h-8 text-sm font-medium"
								placeholder="Buscar especie"
								value={search}
							/>
						</div>

						<button
							onClick={handleAddOnClick}
							className="rounded border border-secondary-400 py-1 px-3 hover:bg-secondary-400 hover:text-white transition-colors"
						>
							<PlusIcon />
						</button>
					</section>
					<ul
						className={`overflow-y-auto max-h-36 mt-2 text-sm font-medium ${styles.list}`}
					>
						{message ? (
							<span className="block p-1 text-center">{message}</span>
						) : (
							filteredTypes?.map(({ id, tipo }) => (
								<li
									onClick={() => handleItemOnClick({ id, tipo })}
									key={id}
									className="text-secondary-600 rounded p-2 cursor-pointer hover:bg-black/5 transition-colors"
								>
									{tipo}
								</li>
							))
						)}
					</ul>
				</section>
			)}

			{created && (
				<span
					className={`"w-full z-[8] absolute left-0 right-0 p-1 pointer-events-none bg-green-600 font-medium text-white text-sm text-center rounded-md ${styles.message}`}
				>
					Tipo creado correctamente
				</span>
			)}
		</article>
	);
}
