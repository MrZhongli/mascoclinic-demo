import Link from "next/link";
import React from "react";
import {
	getAllConsultations,
	getAllPets,
	getMedicalHistoryById,
	getPetById,
} from "../api/ApiConfig";
import { parseDate, parseAge } from "../lib/utils";
import { ProfileImage } from "./ProfileImage";
import { AnimalTypeBadge } from "./AnimalTypeBadge";
import { ConsultationIcon } from "./icons/ConsultationIcon";
import { BoneIcon } from "./icons/BoneIcon";
import { ArrowRightIcon } from "./icons/ArrowRightIcon";
import { MaleIcon, FemaleIcon } from "./icons/GenderIcons";
import "../latestListItem.css";

const data = {
	consultations: [
		{
			id: 1,
			motivo: "Check-up",
			descripcion: "General health check-up",
			creadoEn: "2024-06-20",
			medicalHistoryId: 1,
			petData: {
				nombre: "Max",
				tipoAnimal: "Dog",
				raza: "Labrador",
			},
			
		},
		{
			id: 2,
			motivo: "Vaccination",
			descripcion: "Annual vaccination",
			creadoEn: "2024-06-18",
			medicalHistoryId: 2,
			petData: {
				nombre: "Bella",
				tipoAnimal: "Cat",
				raza: "Siamese",
			},
		},
		{
			id: 3,
			motivo: "Dental Check",
			descripcion: "Dental cleaning and check-up",
			creadoEn: "2024-06-15",
			medicalHistoryId: 3,
			petData: {
				nombre: "Rocky",
				tipoAnimal: "Dog",
				raza: "Bulldog",
			},
		},
		{
			id: 4,
			motivo: "Surgery Follow-up",
			descripcion: "Post-surgery recovery check",
			creadoEn: "2024-06-12",
			medicalHistoryId: 4,
			petData: {
				nombre: "Coco",
				tipoAnimal: "Bird",
				raza: "Parrot",
			},
		},
		{
			id: 5,
			motivo: "Skin Allergy",
			descripcion: "Treatment for skin allergy",
			creadoEn: "2024-06-10",
			medicalHistoryId: 5,
			petData: {
				nombre: "Luna",
				tipoAnimal: "Dog",
				raza: "Poodle",
			},
		},
		// Otros datos de consultas...
	],
	pets: [
		{
			id: 1,
			nombre: "Bella",
			tipoAnimal: "Cat",
			raza: "Siamese",
			sexo: "Hembra",
			edad: 3,
			creadoEn: "2024-05-15",
		},
		{
			id: 2,
			nombre: "Max",
			tipoAnimal: "Dog",
			raza: "Labrador",
			sexo: "Macho",
			edad: 5,
			creadoEn: "2024-05-10",
		},
		{
			id: 3,
			nombre: "Rocky",
			tipoAnimal: "Dog",
			raza: "Bulldog",
			sexo: "Macho",
			edad: 4,
			creadoEn: "2024-05-12",
		},
		{
			id: 4,
			nombre: "Coco",
			tipoAnimal: "Bird",
			raza: "Parrot",
			sexo: "Hembra",
			edad: 2,
			creadoEn: "2024-05-20",
		},
		{
			id: 5,
			nombre: "Luna",
			tipoAnimal: "Dog",
			raza: "Poodle",
			sexo: "Hembra",
			edad: 3,
			creadoEn: "2024-05-18",
		},
	],

};

export function LastestConsultions({ title }) {
	const consultationsData = data.consultations;

	const latestConsultations = consultationsData.map((consultation) => {
		const pet = data.pets.find((pet) => pet.id === consultation.petData.id);

		if (pet) {
			consultation.petData = {
				nombre: pet.nombre,
				tipoAnimal: pet.tipoAnimal,
				raza: pet.raza,
			};
		} else {
			// Handle the case where pet data is not found
			consultation.petData = {
				nombre: 'Unknown',
				tipoAnimal: 'Unknown',
				raza: 'Unknown',
			};
		}

		return consultation;
	});

	return (
		<section className="w-1/2">
			<LatestListHeader
				icon={<ConsultationIcon />}
				href="/consultations"
				title={title}
			/>
			<ul className="flex flex-col gap-3">
				{latestConsultations.map((consultation) => (
					<li key={consultation.id}>
						<ConsultationListItem consultation={consultation} />
					</li>
				))}
			</ul>
		</section>
	);
}


export async function LatestPets({ title }) {
	

	const latestPets = data.pets.reverse().slice(0, 5);
	return (
		<section className="w-1/2">
			<LatestListHeader icon={<BoneIcon />} href="/pets" title={title} />
			<ul className="flex flex-col gap-3">
				{latestPets.map((pet) => (
					<li key={pet.id}>
						<PetListItem pet={pet} />
					</li>
				))}
			</ul>
		</section>
	);
}

function LatestListHeader({ href, icon, title }) {
	return (
		<header className="flex justify-between items-center bg-white rounded-t-3xl rounded-b-md py-2 px-5 mb-3 shadow">
			<div className="flex items-center gap-x-3">
				{icon}
				<h3 className="text-base font-bold text-secondary-600">{title}</h3>
			</div>
			<Link
				href={href}
				className="font-semibold text-sm transition text-secondary-600 border-b-2 border-transparent hover:border-secondary-600"
			>
				Ver todas
			</Link>
		</header>
	);
}

export function ConsultationListItem({ consultation }) {
	const { id, motivo, descripcion, creadoEn, petData } = consultation;

	return (
		<article className="item transition hover:translate-x-2 border border-secondary-400 rounded-lg overflow-hidden shadow">
			<Link href={`/consultations/${id}`}>
				<div className="bg-white flex justify-between p-2">
					<h3 className="font-bold">{motivo}</h3>
					<span className="font-medium text-sm text-secondary-400">
						<strong className="font-medium text-secondary-600">Fecha:</strong>{" "}
						{parseDate({
							date: creadoEn,
							format: {
								day: "numeric",
								month: "numeric",
								year: "numeric",
							},
						})}
					</span>
				</div>
				<div className="info-container flex gap-x-2 bg-secondary-400 transition duration-200 text-white text-xs p-2">
					<p className="w-[40ch] font-medium truncate">{descripcion}</p>
					<span className="font-bold">-</span>
					<p className="font-semibold">
						{petData.nombre}
						<span className="mx-2">•</span>
						<span className="bg-primary text-xs rounded-3xl px-3">
							{petData.tipoAnimal}
						</span>
						<span className="mx-2">•</span>
						{petData.raza}
					</p>

					<ArrowRightIcon className="open-icon transition-opacity ml-auto" />
				</div>
			</Link>
		</article>
	);
}

export function PetListItem({ pet }) {
	const { id, nombre, tipoAnimal, raza, sexo, edad, creadoEn } = pet;

	return (
		<article className="item transition hover:translate-x-2 border border-secondary-400 rounded-lg overflow-hidden shadow">
			<Link href={`/medical-history/${id}`}>
				<div className="bg-white flex justify-between p-2">
					<div className="flex items-center gap-2">
						<ProfileImage className="size-6 text-xs font-semibold">
							{nombre[0]}
						</ProfileImage>

						<h3 className="font-bold">{nombre}</h3>

						<AnimalTypeBadge type={tipoAnimal} className="text-[10px]" />
					</div>
					<span className="font-medium text-sm text-secondary-400">
						<strong className="font-medium text-secondary-600">Fecha:</strong>{" "}
						{parseDate({
							date: creadoEn,
							format: {
								day: "numeric",
								month: "numeric",
								year: "numeric",
							},
						})}
					</span>
				</div>
				<div className="info-container flex justify-between gap-x-2 bg-secondary-400 transition duration-200 text-white text-xs p-2">
					<p className="flex font-semibold">
						{parseAge(edad)} años
						<span className="mx-2">•</span>
						<span className="flex gap-x-1 items-center">
							{sexo} {sexo === "Macho" ? <MaleIcon /> : <FemaleIcon />}
						</span>
						<span className="mx-2">•</span>
						{raza}
					</p>

					<ArrowRightIcon className="open-icon transition-opacity ml-auto" />
				</div>
			</Link>
		</article>
	);
}
