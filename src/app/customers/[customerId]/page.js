import { parseDate } from "../../lib/utils";
import { ProfileImage } from "../../components/ProfileImage";
import { LastUpdatedSection } from "../../components/LastUpdatedSection";
import { BoneIcon } from "../../components/icons/BoneIcon";
import { UserIcon } from "../../components/icons/UserIcon";
import { CreateButton } from "./CreateButton";

import Link from "next/link";
import { notFound } from "next/navigation";
import { AddPetModal } from "./AddPetModal";
import { Fragment } from "react";
import { FemaleIcon } from "../../components/icons/GenderIcons";
import { ArrowRightOutlineIcon } from "../../components/icons/ArrowRightIcon";

// Datos hardcodeados
const customerData = [{
	"id": 1,
	"cedula": "35059844",
	"nombre": "Micaela",
	"apellido": "Ruecker",
	"direccion": "4494 Tanya Curve\nLeuschkefort, HI 61146-0670",
	"telefono": "847-574-0794",
	"creadoEn": "2024-06-26T20:14:16.000000Z",
	"actualizadoEn": "2024-06-26T20:14:16.000000Z",
	"pets": [
		{
			"id": 1,
			"customerId": 1,
			"nombre": "Cloyd",
			"tipoAnimal": "Perro",
			"raza": "Dalmata",
			"sexo": "Hembra",
			"edad": 12,
			"creadoEn": "2024-06-26T20:14:16.000000Z",
			"actualizadoEn": "2024-06-26T20:14:16.000000Z"
		}
	]
},
{
	"id": 2,
	"cedula": "19642823",
	"nombre": "Javier",
	"apellido": "Dach",
	"direccion": "4612 Ellen Dale\nNew Winston, MD 53760",
	"telefono": "1-317-856-1043",
	"creadoEn": "2024-06-26T20:14:16.000000Z",
	"actualizadoEn": "2024-06-26T20:14:16.000000Z",
	"pets": [
		{
			"id": 2,
			"customerId": 2,
			"nombre": "Ayana",
			"tipoAnimal": "Gato",
			"raza": "Bobtail japonés de pelo largo",
			"sexo": "Macho",
			"edad": 11,
			"creadoEn": "2024-06-26T20:14:16.000000Z",
			"actualizadoEn": "2024-06-26T20:14:16.000000Z"
		}
	]
},
{
	"id": 3,
	"cedula": "15190523",
	"nombre": "Odessa",
	"apellido": "Dickens",
	"direccion": "8017 Ottilie Garden Apt. 218\nEwellborough, NC 07704",
	"telefono": "1-820-823-2033",
	"creadoEn": "2024-06-26T20:14:17.000000Z",
	"actualizadoEn": "2024-06-26T20:14:17.000000Z",
	"pets": [
		{
			"id": 3,
			"customerId": 3,
			"nombre": "Darby",
			"tipoAnimal": "Gato",
			"raza": "Bobtail japonés de pelo largo",
			"sexo": "Hembra",
			"edad": 10,
			"creadoEn": "2024-06-26T20:14:17.000000Z",
			"actualizadoEn": "2024-06-26T20:14:17.000000Z"
		}
	]
},
{
	"id": 4,
	"cedula": "37719467",
	"nombre": "Van",
	"apellido": "Hermiston",
	"direccion": "3198 Deckow Vista Suite 519\nSmithmouth, ND 83011-3849",
	"telefono": "401.556.6244",
	"creadoEn": "2024-06-26T20:14:17.000000Z",
	"actualizadoEn": "2024-06-26T20:14:17.000000Z",
	"pets": [
		{
			"id": 4,
			"customerId": 4,
			"nombre": "Darlene",
			"tipoAnimal": "Gato",
			"raza": "Bobtail japonés de pelo corto",
			"sexo": "Macho",
			"edad": 12,
			"creadoEn": "2024-06-26T20:14:17.000000Z",
			"actualizadoEn": "2024-06-26T20:14:17.000000Z"
		}
	]
},
{
	"id": 5,
	"cedula": "12117217",
	"nombre": "Oma",
	"apellido": "Leuschke",
	"direccion": "351 Dibbert Drives\nJaronshire, FL 25634-9031",
	"telefono": "+1-878-251-8640",
	"creadoEn": "2024-06-26T20:14:17.000000Z",
	"actualizadoEn": "2024-06-26T20:14:17.000000Z",
	"pets": [
		{
			"id": 5,
			"customerId": 5,
			"nombre": "Suzanne",
			"tipoAnimal": "Gato",
			"raza": "Americano de pelo duro",
			"sexo": "Macho",
			"edad": 1,
			"creadoEn": "2024-06-26T20:14:17.000000Z",
			"actualizadoEn": "2024-06-26T20:14:17.000000Z"
		}
	]
},
{
	"id": 6,
	"cedula": "3836605",
	"nombre": "Arely",
	"apellido": "Cruickshank",
	"direccion": "877 Roberts Court Apt. 453\nLeochester, SC 77109",
	"telefono": "+1 (913) 525-6492",
	"creadoEn": "2024-06-26T20:14:17.000000Z",
	"actualizadoEn": "2024-06-26T20:14:17.000000Z",
	"pets": [
		{
			"id": 6,
			"customerId": 6,
			"nombre": "Lawrence",
			"tipoAnimal": "Perro",
			"raza": "Chihuahua",
			"sexo": "Macho",
			"edad": 2,
			"creadoEn": "2024-06-26T20:14:17.000000Z",
			"actualizadoEn": "2024-06-26T20:14:17.000000Z"
		}
	]
},
{
	"id": 7,
	"cedula": "7971640",
	"nombre": "Alena",
	"apellido": "Rau",
	"direccion": "257 Beatty Light\nElbertfort, DC 90859-5889",
	"telefono": "1-651-792-0972",
	"creadoEn": "2024-06-26T20:14:17.000000Z",
	"actualizadoEn": "2024-06-26T20:14:17.000000Z",
	"pets": [
		{
			"id": 7,
			"customerId": 7,
			"nombre": "Sylvan",
			"tipoAnimal": "Perro",
			"raza": "Husky",
			"sexo": "Hembra",
			"edad": 8,
			"creadoEn": "2024-06-26T20:14:17.000000Z",
			"actualizadoEn": "2024-06-26T20:14:17.000000Z"
		}
	]
},
{
	"id": 8,
	"cedula": "46734695",
	"nombre": "Marshall",
	"apellido": "Sawayn",
	"direccion": "9491 Mitchell Union\nRutherfordfurt, MO 78424-1094",
	"telefono": "+1-331-504-2314",
	"creadoEn": "2024-06-26T20:14:17.000000Z",
	"actualizadoEn": "2024-06-26T20:14:17.000000Z",
	"pets": [
		{
			"id": 8,
			"customerId": 8,
			"nombre": "Jaden",
			"tipoAnimal": "Gato",
			"raza": "Bobtail japonés de pelo largo",
			"sexo": "Hembra",
			"edad": 9,
			"creadoEn": "2024-06-26T20:14:17.000000Z",
			"actualizadoEn": "2024-06-26T20:14:17.000000Z"
		}
	]
},
{
	"id": 9,
	"cedula": "6410175",
	"nombre": "Destany",
	"apellido": "Cremin",
	"direccion": "43208 Harold Trail\nEast Jamaalberg, NE 82735-1817",
	"telefono": "+14233160498",
	"creadoEn": "2024-06-26T20:14:17.000000Z",
	"actualizadoEn": "2024-06-26T20:14:17.000000Z",
	"pets": [
		{
			"id": 9,
			"customerId": 9,
			"nombre": "Johnny",
			"tipoAnimal": "Perro",
			"raza": "Labrador",
			"sexo": "Hembra",
			"edad": 10,
			"creadoEn": "2024-06-26T20:14:17.000000Z",
			"actualizadoEn": "2024-06-26T20:14:17.000000Z"
		}
	]
},
{
	"id": 10,
	"cedula": "42182020",
	"nombre": "Yolanda",
	"apellido": "Harris",
	"direccion": "8152 Hoeger Junction\nWest Novellabury, WA 65840-0294",
	"telefono": "(458) 544-3132",
	"creadoEn": "2024-06-26T20:14:18.000000Z",
	"actualizadoEn": "2024-06-26T20:14:18.000000Z",
	"pets": [
		{
			"id": 10,
			"customerId": 10,
			"nombre": "Ava",
			"tipoAnimal": "Perro",
			"raza": "Chihuahua",
			"sexo": "Hembra",
			"edad": 10,
			"creadoEn": "2024-06-26T20:14:18.000000Z",
			"actualizadoEn": "2024-06-26T20:14:18.000000Z"
		}
	]
},
{
	"id": 11,
	"cedula": "37255311",
	"nombre": "Virgil",
	"apellido": "Kuphal",
	"direccion": "5455 Emmitt Glen\nTerrancefurt, WI 09863",
	"telefono": "+1 (747) 504-8066",
	"creadoEn": "2024-06-26T20:14:18.000000Z",
	"actualizadoEn": "2024-06-26T20:14:18.000000Z",
	"pets": [
		{
			"id": 11,
			"customerId": 11,
			"nombre": "Deborah",
			"tipoAnimal": "Perro",
			"raza": "Golden Retriever",
			"sexo": "Macho",
			"edad": 12,
			"creadoEn": "2024-06-26T20:14:18.000000Z",
			"actualizadoEn": "2024-06-26T20:14:18.000000Z"
		}
	]
},
{
	"id": 12,
	"cedula": "19159564",
	"nombre": "Shanelle",
	"apellido": "Murazik",
	"direccion": "787 Golden Mountain\nWest Dejahberg, IL 06448",
	"telefono": "(254) 601-6873",
	"creadoEn": "2024-06-26T20:14:18.000000Z",
	"actualizadoEn": "2024-06-26T20:14:18.000000Z",
	"pets": [
		{
			"id": 12,
			"customerId": 12,
			"nombre": "Vivienne",
			"tipoAnimal": "Perro",
			"raza": "Labrador",
			"sexo": "Hembra",
			"edad": 10,
			"creadoEn": "2024-06-26T20:14:18.000000Z",
			"actualizadoEn": "2024-06-26T20:14:18.000000Z"
		}
	]
},
{
	"id": 13,
	"cedula": "11626017",
	"nombre": "Luis",
	"apellido": "Cassin",
	"direccion": "1404 Pearlie Road\nEveside, MS 98633",
	"telefono": "726.958.6929",
	"creadoEn": "2024-06-26T20:14:18.000000Z",
	"actualizadoEn": "2024-06-26T20:14:18.000000Z",
	"pets": [
		{
			"id": 13,
			"customerId": 13,
			"nombre": "Lyla",
			"tipoAnimal": "Perro",
			"raza": "Chihuahua",
			"sexo": "Hembra",
			"edad": 6,
			"creadoEn": "2024-06-26T20:14:18.000000Z",
			"actualizadoEn": "2024-06-26T20:14:18.000000Z"
		}
	]
},
];

export default async function CustomerProfilePage({ params, searchParams }) {
	// Eliminar llamadas a la API y usar datos hardcodeados
	if (!customerData || customerData.length === 0) {
		return notFound();
	}

	const customer = customerData[0]; // Acceder al primer elemento del arreglo
	const pets = customer.pets || []; // Acceder a la propiedad pets del primer elemento

	const openModal = Boolean(searchParams?.openModal) || false;

	const animalTypesData = [
		{
			id: 1,
			nombre: "Perro",
			includeBreeds: true,
		},
		{
			id: 2,
			nombre: "Gato",
			includeBreeds: true,
		},
	];

	const { creadoEn: lastPetCreatedDate, actualizadoEn: lastUpdatedDate } =
		pets.slice(-1)[0];

	return (
		<Fragment>
			<section className="w-full max-h-full overflow-y-auto py-6 px-8">
				<h2 className="text-3xl text-secondary font-bold mb-4">
					Perfil del Cliente
				</h2>

				<section className="bg-white pr-4 shadow-md rounded-xl text-secondary-600">
					<div>
						<div className="mb-2 flex gap-4 border-b-[1px] border-secondary-400">
							<ProfileImage className="size-[130px] m-3 text-6xl">
								<UserIcon className="size-16" />
							</ProfileImage>
							<div className="grow tracking-wide">
								<section className="flex justify-between items-center pt-3 pl-3 pb-4 border-b-[1px] border-secondary-400">
									<div>
										<h3 className="text-2xl font-bold">
											{customer.nombre} {customer.apellido}
										</h3>
									</div>
									<CreateButton />
								</section>
								<section className="flex gap-14 pt-2 pl-3 pb-4 font-medium">
									<article>
										<h4 className="text-secondary-400">Fecha de Registro</h4>
										<p>{parseDate({ date: customer.creadoEn })}</p>
									</article>
									<article>
										<h4 className="text-secondary-400">Identificador</h4>
										<p>{customer.id}</p>
									</article>
								</section>
							</div>
						</div>
						<div className="flex gap-16 py-5 pl-5 font-medium">
							<section className="flex flex-wrap gap-12 gap-y-9">
								<article>
									<h4 className="text-secondary-400">Cédula</h4>
									<p>{customer.cedula}</p>
								</article>
								<article>
									<h4 className="text-secondary-400">
										Última Mascota Registrada
									</h4>
									<p>{parseDate({ date: lastPetCreatedDate })}</p>
								</article>
								<article>
									<h4 className="text-secondary-400">Dirección</h4>
									<p className="max-w-64 text-sm">{customer.direccion}</p>
								</article>
							</section>
						</div>
					</div>
				</section>

				<LastUpdatedSection lastConsultDate={lastUpdatedDate} />

				<section className="w-full bg-white shadow-md rounded-xl text-secondary-600">
					<div className="flex items-center p-4 border-b-2 border-secondary-400 font-bold text-base">
						<BoneIcon /> <h3 className="ml-2">Mascotas</h3>
						<span className="ml-2 bg-secondary-600 rounded-3xl px-3 text-white text-xs">
							{pets.length}
						</span>
					</div>
					<section>
						<ol className="pl-6 pb-4">
							{pets.map((pet) => (
								<PetListItem pet={pet} key={pet.id} />
							))}
						</ol>
					</section>
				</section>
			</section>

			<AddPetModal
				open={openModal}
				animalTypes={animalTypesData}
				ownerId={customer.id}
			/>
		</Fragment>
	);
}

function PetListItem({ pet }) {
	const { id, nombre, tipoAnimal, raza, sexo, edad, actualizadoEn } = pet;

	const date = new Date(actualizadoEn).toLocaleDateString();

	return (
		<li key={id} className="border-b-[1px] border-secondary-400">
			<Link href={`/medical-histories/${id}`}>
				<article className="flex justify-between items-center py-5">
					<section className="flex items-center gap-x-3">
						<ProfileImage className="size-8 text-xs">{nombre[0]}</ProfileImage>
						<div>
							<div className="flex items-center gap-x-2">
								<h4 className="font-bold text-sm text-secondary">{nombre}</h4>
								{/* <AnimalTypeBadge className="text-[10px] h-3" type={tipoAnimal} /> */}
							</div>
							<div className="flex mt-1 font-semibold text-sm text-secondary-400">
								<h4 className="flex">
									2 años
									<span className="text-secondary-400 font-bold mx-3">•</span>
									<span className="flex items-center gap-x-1">
										{sexo} {sexo === "Macho" ? <MaleIcon /> : <FemaleIcon />}
									</span>
									<span className="text-secondary-400 font-bold mx-3">•</span>
									<span className="text-secondary-600 mr-1">Raza: </span>
									{raza}
								</h4>
								<span className="mx-2 font-bold">-</span>
								<span>
									<strong className="font-semibold text-secondary-600">
										Fecha:{" "}
									</strong>{" "}
									{date}
								</span>
							</div>
						</div>
					</section>

					<section className="flex px-7 py-2 items-center border-l border-secondary-400">
						<ArrowRightOutlineIcon className="size-5" />
					</section>
				</article>
			</Link>
		</li>
	);
}
