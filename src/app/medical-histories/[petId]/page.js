import React, { Suspense } from "react";
import {
	fetchMedicalHistoryByPetId,
	getCustomerById,
	getPetById,
} from "../../api/ApiConfig";
import { parseAge, parseDate } from "../../lib/utils";

import PlusIcon from "../../../../public/icons/plus.svg";
import { ConsultationIcon } from "../../components/icons/ConsultationIcon";
import EyeIcon from "../../../../public/icons/eye.svg";

import { ProfileImage } from "../../components/ProfileImage";
import { ConsulationItem } from "../../components/ConsultationItem";

async function MedicalHistoriesList({ params }) {
	const petData = await getPetById({
		petId: params.petId,
	});

	console.log(petData);

	const ownerData = await getCustomerById({ customerId: petData.customerId });

	const [historyData] = (await fetchMedicalHistoryByPetId({
		petId: petData.id,
		includeConsultations: true,
	})) ?? [null];

	const { consultations } = historyData ?? { consultations: null };

	const firstConsultation = consultations[0] ?? null;

	const lastConsultDate = consultations?.slice(-1)[0] ?? null;

	return (
		<section className="w-full max-h-full overflow-y-auto py-6 px-8">
			<h2 className="text-3xl text-secondary font-bold mb-4">
				Perfil de la Mascota
			</h2>

			<section className="bg-white pr-4 shadow-md rounded-xl text-secondary-600">
				<Suspense fallback={<p>Cargando...</p>}>
					<div>
						<div className="mb-2 flex gap-4 border-b-[1px] border-secondary-400">
							<ProfileImage className="size-[130px] m-3 text-6xl">
								{petData.nombre[0]}
							</ProfileImage>
							<div className="grow tracking-wide">
								<section className="flex justify-between items-center pt-3 pl-3 pb-4 border-b-[1px] border-secondary-400">
									<div>
										<div className="flex items-center gap-x-4">
											<h3 className="text-xl font-bold">{petData.nombre}</h3>
											<span className="h-4 flex items-center px-3 text-xs font-semibold rounded-3xl  text-white bg-primary">
												{petData.tipoAnimal}
											</span>
										</div>

										<h4 className="text-sm font-semibold mt-1">
											{parseAge(petData.edad)} años, {petData.sexo}
											<span className="text-secondary-400 font-bold mx-3">
												•
											</span>
											<span className="text-secondary-400">Raza: </span>
											{petData.raza}
										</h4>
									</div>
									<button className="flex gap-x-3 items-center bg-secondary-400 hover:bg-secondary-600 transition duration-300 rounded-3xl font-semibold text-sm text-white px-5 py-2 mr-3">
										<PlusIcon /> Nueva Consulta
									</button>
								</section>
								<section className="flex gap-14 pt-2 pl-3 pb-4 font-medium">
									<article>
										<h4 className="text-secondary-400">Última Consulta</h4>
										<p>
											{lastConsultDate
												? parseDate({
														date: lastConsultDate,
												  })
												: "N/A"}
										</p>
									</article>
									<article>
										<h4 className="text-secondary-400">Identificador</h4>
										<p>{petData.id}</p>
									</article>
								</section>
							</div>
						</div>
						<div className="flex gap-16 py-5 pl-5 font-medium">
							<section className="grid grid-cols-2 gap-x-11 gap-y-9">
								<article>
									<h4 className="text-secondary-400">ID de la Historia</h4>
									<p>{historyData?.id ?? "Sin informacion..."}</p>
								</article>
								<article>
									<h4 className="text-secondary-400">Primera Consulta</h4>
									<p>
										{firstConsultation
											? parseDate({
													date: firstConsultation.actualizadoEn,
											  })
											: "N/A"}
									</p>
								</article>
								<article>
									<h4 className="text-secondary-400">Cédula del Dueño</h4>
									<p>{ownerData.cedula}</p>
								</article>
								<article>
									<h4 className="text-secondary-400">Dirección</h4>
									<p className="max-w-64 text-sm">{ownerData.direccion}</p>
								</article>
							</section>

							<article>
								<h4 className="text-secondary-400">Antecedentes</h4>
								<p className="max-w-96 text-sm">
									{historyData?.antecedentes ?? "Sin informacion..."}
								</p>
							</article>
						</div>
					</div>
				</Suspense>
			</section>

			<LastUpdatedSection lastConsultDate={lastConsultDate} />

			<section className="w-full bg-white shadow-md rounded-xl text-secondary-600">
				<div className="flex items-center p-4 border-b-2 border-secondary-400 font-bold text-base">
					<ConsultationIcon /> <h3 className="ml-2">Consultas</h3>
					<span className="ml-2 bg-secondary-600 rounded-3xl px-3 text-white text-xs">
						{consultations.length}
					</span>
				</div>
				<section>
					<ol className="pl-6 pb-4">
						{consultations?.map((consultation) => (
							<ConsulationItem
								key={consultation.id}
								consultation={consultation}
							/>
						))}

						{consultations && (
							<div className="flex justify-center items-center p-5 font-semibold">
								<span>Sin consultas registradas.</span>
							</div>
						)}
					</ol>
				</section>
			</section>
		</section>
	);
}

function LastUpdatedSection({ lastConsultDate }) {
	const lastUpdatedDate = parseDate({
		date: lastConsultDate,
		format: {
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		},
	});

	return (
		<section className="my-6 flex justify-center items-center gap-x-7 after:grow after:h-[2px] after:bg-primary-800 before:grow before:h-[2px] before:bg-primary-800">
			<span className="flex gap-x-2 text-primary-800 font-semibold text-sm">
				<EyeIcon /> Actualizado por última vez el {lastUpdatedDate}
			</span>
		</section>
	);
}

export default MedicalHistoriesList;
