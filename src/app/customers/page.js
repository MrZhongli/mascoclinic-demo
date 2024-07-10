import CustomerList from "../GUI/CustomerList";
import { getAllCustomers } from "../api/ApiConfig";

const customersData =[
	{
		"id": 1,
		"cedula": "18874085",
		"nombre": "Kraig",
		"apellido": "Crist",
		"direccion": "70192 Legros Glen\nThelmamouth, VA 72528-1818",
		"telefono": "+15733123120",
		"creadoEn": "2024-07-02T12:16:35.000000Z",
		"actualizadoEn": "2024-07-02T12:16:35.000000Z"
	},
	{
		"id": 2,
		"cedula": "7775387",
		"nombre": "Bessie",
		"apellido": "Schmeler",
		"direccion": "726 Magnolia Mill Suite 511\nPort Reyesland, RI 68449-2245",
		"telefono": "+1-580-741-4232",
		"creadoEn": "2024-07-02T12:16:35.000000Z",
		"actualizadoEn": "2024-07-02T12:16:35.000000Z"
	},
	{
		"id": 3,
		"cedula": "18131370",
		"nombre": "Madisen",
		"apellido": "Doyle",
		"direccion": "302 Ray Glens\nNew Gene, ME 85403",
		"telefono": "231-789-8444",
		"creadoEn": "2024-07-02T12:16:35.000000Z",
		"actualizadoEn": "2024-07-02T12:16:35.000000Z"
	},
	{
		"id": 4,
		"cedula": "23436688",
		"nombre": "Toney",
		"apellido": "Haley",
		"direccion": "3473 Maryse Throughway\nEthylchester, AL 69515",
		"telefono": "+1.724.527.3838",
		"creadoEn": "2024-07-02T12:16:36.000000Z",
		"actualizadoEn": "2024-07-02T12:16:36.000000Z"
	},
	{
		"id": 5,
		"cedula": "46076019",
		"nombre": "Joshua",
		"apellido": "Schaefer",
		"direccion": "34203 Mraz Loaf Apt. 436\nArdellaton, MS 88677",
		"telefono": "1-559-462-8469",
		"creadoEn": "2024-07-02T12:16:36.000000Z",
		"actualizadoEn": "2024-07-02T12:16:36.000000Z"
	},
	{
		"id": 6,
		"cedula": "2580352",
		"nombre": "Marisa",
		"apellido": "Beahan",
		"direccion": "726 Travon Ports Apt. 463\nSouth Christopton, MA 08735-7023",
		"telefono": "1-908-925-3816",
		"creadoEn": "2024-07-02T12:16:36.000000Z",
		"actualizadoEn": "2024-07-02T12:16:36.000000Z"
	},
	{
		"id": 7,
		"cedula": "5408250",
		"nombre": "Sammie",
		"apellido": "Crist",
		"direccion": "4737 Wilderman Wells\nAlmouth, KS 20175-8706",
		"telefono": "+1-775-586-7365",
		"creadoEn": "2024-07-02T12:16:36.000000Z",
		"actualizadoEn": "2024-07-02T12:16:36.000000Z"
	},
	{
		"id": 8,
		"cedula": "48511690",
		"nombre": "Demario",
		"apellido": "Rippin",
		"direccion": "695 Pfannerstill Lights Suite 861\nSteveshire, OK 88702",
		"telefono": "1-661-799-7590",
		"creadoEn": "2024-07-02T12:16:36.000000Z",
		"actualizadoEn": "2024-07-02T12:16:36.000000Z"
	},
	{
		"id": 9,
		"cedula": "2311952",
		"nombre": "Gerry",
		"apellido": "Dickens",
		"direccion": "14272 Lina Rest\nSophieview, OH 06795-4980",
		"telefono": "+1-865-444-7668",
		"creadoEn": "2024-07-02T12:16:36.000000Z",
		"actualizadoEn": "2024-07-02T12:16:36.000000Z"
	},
	{
		"id": 10,
		"cedula": "20356815",
		"nombre": "Mckenna",
		"apellido": "Howell",
		"direccion": "1968 Muller Shoals\nLouieland, IA 23225",
		"telefono": "580.675.2254",
		"creadoEn": "2024-07-02T12:16:36.000000Z",
		"actualizadoEn": "2024-07-02T12:16:36.000000Z"
	},
]

export default async function CustomerHome({ searchParams }) {
	const filteredCustomers = customersData.data
	// .filter(customer=>(!searchParams?cedula || customer.cedula.includes(searchParams.cedula)))
	// const { customersData } = await getAllCustomers({
	// 	query: { cedula: searchParams?.cedula },
	// 	pageNum: searchParams?.page,
	// });

	return (
		<section className="w-full max-h-full p-8">
			<h2 className="text-3xl text-secondary font-bold mb-5">Clientes</h2>
			<CustomerList customers={customersData} />
		</section>
	);
}