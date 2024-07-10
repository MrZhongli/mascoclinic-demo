export async function LatestPets({ title }) {
	const { data: petsData } = await getAllPets({ paginate: false });

	const latestPets = petsData.reverse().slice(0, 4);
	return (
		<section className="w-1/2">
			<section className="flex justify-between items-center bg-white rounded-t-3xl rounded-b-md py-2 px-5 mb-2 shadow">
				<div className="flex items-center gap-x-3">
					<BoneIcon />
					<h3 className="text-base font-bold text-secondary-600">{title}</h3>
				</div>
				<Link href="/pets" className="font-semibold text-sm">
					Ver todas
				</Link>
			</section>
			<ul className="flex flex-col gap-2">
				{latestPets.map((pet) => (
					<li key={pet.id}>
						<article className="border border-secondary-400 rounded-lg overflow-hidden shadow">
							<Link href={`/medical-history/${pet.id}`}>
								<div className="bg-white flex justify-between p-2">
									<div className="flex items-center gap-2">
										<ProfileImage className="size-6 text-xs font-semibold">
											{pet.nombre[0]}
										</ProfileImage>

										<h3 className="font-bold">{pet.nombre}</h3>

										<span className=" flex items-center px-3 text-[10px] font-semibold rounded-3xl  text-white bg-primary">
											{pet.tipoAnimal}
										</span>
									</div>
									<span className="font-medium text-sm text-secondary-400">
										<strong className="font-medium text-secondary-600">
											Fecha:
										</strong>{" "}
										{parseDate({
											date: pet.creadoEn,
											format: {
												day: "numeric",
												month: "numeric",
												year: "numeric",
											},
										})}
									</span>
								</div>
								<div className="flex gap-x-2 bg-secondary-400 text-white text-xs p-2">
									<p className="font-semibold">
										{parseAge(pet.edad)} años
										<span className="mx-2">•</span>
										{pet.sexo}
										<span className="mx-2">•</span>
										{pet.raza}
									</p>
								</div>
							</Link>
						</article>
					</li>
				))}
			</ul>
		</section>
	);
}
