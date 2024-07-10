export function AnimalTypeBadge({ className, type }) {
	return (
		<span
			className={`${className} flex items-center px-3 font-semibold rounded-3xl text-white bg-primary`}
		>
			{type}
		</span>
	);
}
