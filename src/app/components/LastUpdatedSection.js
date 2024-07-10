import { parseDate } from "../lib/utils";
import EyeIcon from "./icons/eye.svg";

export function LastUpdatedSection({ lastConsultDate }) {
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
