import { KEYS } from "../lib/consts";
import { TableOptions } from "./TableOptions";

export async function Table({ type, data }) {
	const transformKeys = (type) => {
		const { keys, keysToParse } = type;

		const parseKeys = {
			id: "ID #",
			...keysToParse,
			creadoEn: "registrado",
			actualizadoEn: "actualizado",
		};

		return keys.map((key) => parseKeys[key] ?? key);
	};

	const headTitles = transformKeys(KEYS[type]);

	return (
		<table className="table-auto border-collapse border-spacing-0 w-full">
			<thead>
				<tr className="text-secondary-400 text-left text-sm">
					{headTitles?.map((title) => (
						<th
							key={title}
							className="bg-secondary-200 first:rounded-tl-xl first:rounded-bl-lg  capitalize px-4 py-2"
						>
							{title}
						</th>
					))}

					<th className="bg-secondary-200 rounded-tr-xl rounded-br-lg px-5 py-2"></th>
				</tr>
			</thead>
			<tbody className="border-t-4 border-white font-medium">
				{data?.map((item) => (
					<>
						<tr key={item.id} className="relative">
							{Object.keys(item).map(
								(key, index) =>
									index <= headTitles.length - 3 && (
										<td
											className={`px-4 py-2 text-secondary ${
												key === "direccion" ? "text-sm" : ""
											}`}
										>
											{item[key]}
										</td>
									)
							)}

							<td className="px-4 py-2 text-secondary">
								{new Date(item.creadoEn).toLocaleDateString()}
							</td>
							<td className="px-4 py-2 text-secondary">
								{new Date(item.actualizadoEn).toLocaleDateString()}
							</td>

							<TableOptions type={type} itemId={item.id} />
						</tr>
					</>
				))}
			</tbody>
		</table>
	);
}
