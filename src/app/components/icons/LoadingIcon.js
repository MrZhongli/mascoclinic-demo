export function LoadingIcon({ className }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="80"
			height="80"
			viewBox="0 0 24 24"
		>
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				stroke-width="2"
			>
				<path
					strokeDasharray="60"
					strokeDashoffset="60"
					strokeOpacity=".3"
					d="M12 3c4.9706 0 9 4.02944 9 9 0 4.9706-4.0294 9-9 9-4.97056 0-9-4.0294-9-9 0-4.97056 4.02944-9 9-9Z"
				>
					<animate
						fill="freeze"
						attributeName="stroke-dashoffset"
						dur="1.3s"
						values="60;0"
					/>
				</path>
				<path
					strokeDasharray="15"
					strokeDashoffset="15"
					d="M12 3c4.9706 0 9 4.02944 9 9"
				>
					<animate
						fill="freeze"
						attributeName="stroke-dashoffset"
						dur="0.3s"
						values="15;0"
					/>
					<animateTransform
						attributeName="transform"
						dur="1.5s"
						repeatCount="indefinite"
						type="rotate"
						values="0 12 12;360 12 12"
					/>
				</path>
			</g>
		</svg>
	);
}
