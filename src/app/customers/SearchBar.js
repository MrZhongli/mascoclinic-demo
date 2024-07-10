"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { SearchIcon } from "../components/icons/SearchIcon";

export function SearchBar({ placeholder = "", name = "" }) {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

	const handleOnSubmit = (event) => {
		event.preventDefault();

		const fields = Object.fromEntries(new FormData(event.target));

		const params = new URLSearchParams(searchParams);

		params.set(name, fields[name]);

		if (fields[name] === "") params.delete(name);

		replace(`${pathName}?${params}`);
	};

	return (
		<form
			onSubmit={handleOnSubmit}
			className="flex overflow-hidden border-2 rounded-3xl border-secondary-400"
		>
			<input
				name={name}
				placeholder={placeholder}
				className="text-sm text-secondary-400 font-medium px-4 py-2 h-full focus:outline-none focus:border-blue-500"
				defaultValue={searchParams.get("cedula")}
			/>
			<div className="p-[2px]">
				<button className="rounded-full bg-[#F4F4FB] hover:bg-[#ebebf2] transition duration-300 text-secondary-400 px-5 py-2">
					<SearchIcon />
				</button>
			</div>
		</form>
	);
}
