export function ProfileImage({ className, children }) {
	return (
		<figure
			className={`${className} bg-secondary-400 text-white font-semibold flex justify-center items-center rounded-full`}
		>
			{children}
		</figure>
	);
}
