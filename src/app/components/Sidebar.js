// Importa las librerías y componentes necesarios
"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

// Importa los iconos del sidebar
import DashboardIcon from "../../../public/icons/dashboard.svg";
import CustomersIcon from "../../../public/icons/customers.svg";
import { PawOutlineIcon } from "../components/icons/PawIcon";
import { MedicalHistoryOutlineIcon } from "../components/icons/MedicalHistoryIcon";
import { ConsultationIcon } from "./icons/ConsultationIcon";
import ExitIcon from "../../../public/icons/exit.svg";

// Importa estilos
import styles from "../sidebar.module.css";

export function Sidebar() {
	const pathName = usePathname();

	const isLoginPage = pathName.includes("login");

	return (
		!isLoginPage && (
			<aside className="bg-white w-20 h-full shadow-md flex flex-col">
				<section className="flex flex-col justify-center items-center p-3">
					<img src="/mc-logo.png" alt="Logo de MascoClinic" />
					<h1 className="text-sm text-primary-800 font-bold mt-1 text-center">
						Masco <span className="text-secondary-600">Clinic</span>
					</h1>
				</section>
				<nav className="flex flex-col justify-between grow">
					<ul className="flex flex-col">
						<SidebarLink href="/dashboard">
							<DashboardIcon priority="true" />
						</SidebarLink>

						<SidebarLink href="/customers">
							<CustomersIcon priority="true" />
						</SidebarLink>

						<SidebarLink href="/pets">
							<PawOutlineIcon priority="true" />
						</SidebarLink>

						<SidebarLink href="/medical-histories">
							<MedicalHistoryOutlineIcon priority="true" />
						</SidebarLink>
						<SidebarLink href="/consultations">
							<ConsultationIcon className="size-6" priority="true" />
						</SidebarLink>
					</ul>
					<div className="flex items-center justify-center h-16 px-4">
						<Link href={"/Login"}>
							<button
								onClick={handleSignOut}
								className="text-secondary-400 text-lg font-bold hover:bg-text-[#F178B6]"
							>
								<ExitIcon priority="true" />
							</button>
						</Link>
					</div>
				</nav>
			</aside>
		)
	);
}

// Componente de enlace del Sidebar
function SidebarLink({ href, children }) {
	const pathName = usePathname();

	return (
		<li className="p-2 pl-0 max-h-24">
			<Link
				href={href}
				className={`
          h-16 relative rounded flex justify-center items-center transition-colors duration-200 hover:text-[#F178B6] hover:bg-primary-200
          ${styles.sidebarLink}
          ${
						href === pathName
							? "bg-primary-200 text-primary-800 after:scale-y-100"
							: "text-secondary-400"
					}
        `}
			>
				{children}
			</Link>
		</li>
	);
}

// Función para manejar el logout
const handleSignOut = async () => {
	await signOut({ redirect: false });
};

// Exporta el componente Sidebar
export default Sidebar;
