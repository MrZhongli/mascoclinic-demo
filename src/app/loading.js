import styles from "./loading.module.css";

export default function LoadingPage() {
	return (
		<section className="w-full h-full flex flex-col justify-center items-center text-secondary-600">
			<img
				className="w-44"
				loading="eager"
				src="https://i.imgur.com/qggBzbN.gif"
				alt="Perro caminando"
			/>

			<figure
				className={`${styles.loadingBar} w-1/2 max-w-80 h-2 my-5 rounded-lg overflow-hidden bg-[rgba(165,166,246,0.3)] after:rounded-lg after:bg-secondary-400`}
			/>

			<span className={`${styles.text} font-semibold text-lg`}>Cargando</span>
		</section>
	);
}
