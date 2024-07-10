import { getAllCustomers, getAllPets } from "../api/ApiConfig";

export const KEYS = {
	customers: {
		keys: [
			"id",
			"cedula",
			"nombre",
			"apellido",
			"direccion",
			"telefono",
			"creadoEn",
			"actualizadoEn",
		],

		keysToParse: {
			cedula: "CI",
		},
	},

	pets: {
		keys: [
			"id",
			"customerId",
			"nombre",
			"tipoAnimal",
			"raza",
			"sexo",
			"edad",
			"creadoEn",
			"actualizadoEn",
		],

		keysToParse: {
			customerId: "CI Dueño",
			tipoAnimal: "especie",
		},
	},

	histories: {
		keys: ["id", "petId", "antecedentes", "creadoEn", "actualizadoEn"],

		keysToParse: {
			petId: "Mascota ID #",
		},
	},
};
