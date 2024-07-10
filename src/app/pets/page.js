// PetsHomePage.js

import React from "react";
import CustomerInfoPets from "../GUI/petsUI/CustomerInfoPets";

const PetsHomePage = () => {
	return (
		<section className="w-full max-h-full p-8">
			<h2 className="text-3xl text-secondary font-bold mb-5">Mascotas</h2>

			<CustomerInfoPets />
		</section>
	);
};

export default PetsHomePage;
