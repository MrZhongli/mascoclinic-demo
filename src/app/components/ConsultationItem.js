import Link from "next/link";
import { ArrowRightOutlineIcon } from "./icons/ArrowRightIcon";

export function ConsulationItem({ key, consultation }) {
	const { id, medicalHistoryId, motivo, descripcion, actualizadoEn } =
		consultation;

	const date = new Date(actualizadoEn).toLocaleDateString();

	return (
		<li key={key} className="border-b-[1px] border-secondary-400">
			<Link href={`/consultations/${id}?historyId=${medicalHistoryId}`}>
				<article className="flex justify-between py-5">
					<section>
						<h4 className="font-bold text-sm text-secondary">{motivo}</h4>
						<div className="flex font-medium text-sm text-secondary-400">
							<p className="max-w-[50ch] truncate">{descripcion}</p>
							<span className="mx-2 font-bold">-</span>
							<span>
								<strong className="font-medium text-secondary-600">
									Fecha:{" "}
								</strong>{" "}
								{date}
							</span>
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
