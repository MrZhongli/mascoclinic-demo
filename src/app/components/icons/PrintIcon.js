export function PrintIcon({ className }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 512 512"
		>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="30"
				d="M384 368h24a40 40 0 0 0 40-40V168a40 40 0 0 0-40-40H104a40 40 0 0 0-40 40v160a40 40 0 0 0 40 40h24"
			/>
			<rect
				width="256"
				height="208"
				x="128"
				y="240"
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="30"
				rx="24.3"
				ry="24.3"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="30"
				d="M384 128v-24a40 40 0 0 0-40-40H168a40 40 0 0 0-40 40v24"
			/>
			<circle cx="392" cy="184" r="24" fill="currentColor" />
		</svg>
	);
}
