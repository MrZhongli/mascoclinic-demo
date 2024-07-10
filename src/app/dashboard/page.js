import React from "react";
import { CustomersIcon } from "../components/icons/CustomersIcon";
import { PawIcon } from "../components/icons/PawIcon";
import { MedicalSymbolIcon } from "../components/icons/MedicalSymbolIcon";
import { MedicalHistoryIcon } from "../components/icons/MedicalHistoryIcon";
import {
	LastestConsultions,
	LatestPets,
} from "../components/LatestConsultations";
import Link from "next/link";

function DashboardPage() {
	return (
		<section className="w-full h-full text-secondary p-8">
			<h3 className="font-bold text-secondary-600 mb-3">
				¡Bienvenida de vuelta, Emma!
			</h3>
			<h2 className="text-3xl font-bold">Panel de Control</h2>

			<AnalyticsSection />

			<section className="flex gap-8">
				<LastestConsultions title="Últimas Consultas Realizadas" />
				<LatestPets title="Últimas Mascotas Añadidas" />
			</section>
		</section>
	);
}

function AnalyticsSection() {
	// Datos hardcodeados para simular los valores de meta
	const petsMeta = { total: 10 }; // Ejemplo: 10 mascotas
	const customersMeta = { total: 5 }; // Ejemplo: 5 clientes
	const historiesMeta = { total: 7 }; // Ejemplo: 7 historias médicas
	const consultationsMeta = { total: 3 }; // Ejemplo: 3 consultas

	return (
		<section className="w-full flex justify-between my-8">
			<TotalRegistrationsCard
				title="Total de Clientes"
				total={customersMeta.total}
				href="/customers"
			>
				<CustomersIcon />
			</TotalRegistrationsCard>
			<TotalRegistrationsCard
				title="Total de Mascotas"
				total={petsMeta.total}
				href="/pets"
			>
				<PawIcon />
			</TotalRegistrationsCard>
			<TotalRegistrationsCard
				title="Total de Historias"
				total={historiesMeta.total}
				href="/medical-histories"
			>
				<MedicalHistoryIcon />
			</TotalRegistrationsCard>
			<TotalRegistrationsCard
				title="Total de Consultas"
				total={consultationsMeta.total}
				href="/consultations"
			>
				<MedicalSymbolIcon />
			</TotalRegistrationsCard>
		</section>
	);
}

function TotalRegistrationsCard({ title, total, href, children }) {
	return (
		<article className="bg-white shadow-md rounded-3xl hover:scale-105 transition">
			<Link className="flex gap-x-4 px-8 py-6" href={href}>
				<figure className="size-11 flex justify-center items-center bg-secondary-400 rounded-2xl text-white">
					{children}
				</figure>
				<div className="">
					<h4 className="uppercase tracking-wide text-sm text-secondary-600 font-semibold">
						{title}
					</h4>
					<p className="text-4xl text-primary-800 font-semibold">{total}</p>
				</div>
			</Link>
		</article>
	);
}

export default DashboardPage;
