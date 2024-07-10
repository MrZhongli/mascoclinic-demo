"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import PlusIcon from "../../../../public/icons/plus.svg";

export function CreateButton() {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

	const handleClick = () => {
		const params = new URLSearchParams(searchParams);

		params.set("openModal", true);

		replace(`${pathName}?${params}`);
	};

	return (
		<button
			onClick={() => handleClick()}
			className="flex gap-x-3 items-center bg-secondary-400 hover:bg-secondary-600 transition duration-300 rounded-3xl font-semibold text-sm text-white px-5 py-2 mr-3"
		>
			<PlusIcon /> Nueva Mascota
		</button>
	);
}
