import data from './data';

export const getPetById = async ({ petId, includeHistory = false }) => {
	try {
		const baseUrl = new URL(`http://127.0.0.1:8000/api/v1/pets/${petId}`);

		if (includeHistory) baseUrl.searchParams.set("includeHistory", "true");

		const response = await fetch(baseUrl, { cache: "no-store" });

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();

		return data.data;
	} catch (error) {
		console.error("Error fetching pet data:", error);
		return null;
	}
};

export const getAllPets = async ({ paginate = true, pageNum = 1 } = {}) => {
	try {
		const baseUrl = new URL("http://127.0.0.1:8000/api/v1/pets");

		if (paginate) {
			baseUrl.searchParams.set("paginate", true);
			baseUrl.searchParams.set("page", pageNum);
		}

		const response = await fetch(baseUrl);

		if (!response.ok) throw new Error("Network response was not ok");

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error fetching pets data:", error.message);
		return null;
	}
};

export const getAllAnimalTypes = async ({
	includeBreeds,
	paginate = false,
	pageNum = 1,
} = {}) => {
	try {
		const baseUrl = new URL("http://127.0.0.1:8000/api/v1/animal-types");

		if (includeBreeds) baseUrl.searchParams.set("includeBreeds", true);

		if (paginate) {
			baseUrl.searchParams.set("paginate", true);
			baseUrl.searchParams.set("page", pageNum);
		}

		const response = await fetch(baseUrl);

		if (!response.ok) throw new Error("Network response was not ok");

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error fetching pets data:", error.message);
		return null;
	}
};

export const createAnimalType = async ({ typeData }) => {
	try {
		const response = await fetch("http://127.0.0.1:8000/api/v1/animal-types", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(typeData),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json();

		// Verificar si la respuesta contiene un mensaje de error
		if (responseData.error) {
			console.error("Error adding type:", responseData.error);
			throw new Error(responseData.error);
		}

		console.log("Type added successfully:", responseData);

		return responseData;
	} catch (error) {
		console.error("Error adding type:", error.message);
		throw new Error(
			"Hubo un error al agregar el tipo. Por favor, inténtalo de nuevo."
		);
	}
};

export const getAllAnimalBreedsByTypeId = async ({
	typeId,
	pageNum = 1,
} = {}) => {
	try {
		const baseUrl = new URL("http://127.0.0.1:8000/api/v1/animal-breeds");

		baseUrl.searchParams.set("animalTypeId[eq]", typeId);

		baseUrl.searchParams.set("page", pageNum);

		const response = await fetch(baseUrl);

		if (!response.ok) throw new Error("Network response was not ok");

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error fetching pets data:", error.message);
		return null;
	}
};

export const createAnimalBreed = async ({ breedData }) => {
	try {
		const response = await fetch("http://127.0.0.1:8000/api/v1/animal-breeds", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(breedData),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json();

		// Verificar si la respuesta contiene un mensaje de error
		if (responseData.error) {
			console.error("Error adding breed:", responseData.error);
			throw new Error(responseData.error);
		}

		console.log("Breed added successfully:", responseData);

		return responseData;
	} catch (error) {
		console.error("Error adding pet:", error.message);
		throw new Error(
			"Hubo un error al agregar la raza. Por favor, inténtalo de nuevo."
		);
	}
};

export const getAllCustomers = async ({
	query = {},
	pageNum = 1,
	lastPage = false,
} = {}) => {
	try {
		const baseUrl = new URL("http://127.0.0.1:8000/api/v1/customers");

		baseUrl.searchParams.set("page", pageNum);

		if (query) {
			const [key] = Object.keys(query);

			baseUrl.searchParams.set(`${key}[eq]`, query[key] ?? "");
		}

		console.log(baseUrl);

		const response = await fetch(baseUrl, { cache: "no-cache" });

		if (!response.ok) throw new Error("Network response was not ok");

		const data = await response.json();

		if (lastPage) return await getAllPets({ pageNum: data.meta.last_page });

		return data;
	} catch (error) {
		console.error("Error fetching customers data:", error.message);
		return null;
	}
};

export const getCustomerById = async ({ customerId, includePets = false }) => {
	try {
		const baseUrl = new URL(
			`http://127.0.0.1:8000/api/v1/customers/${customerId}`
		);

		if (includePets) baseUrl.searchParams.set("includePets", "true");

		const response = await fetch(baseUrl, { cache: "no-cache" });

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();

		return data.data;
	} catch (error) {
		console.error("Error fetching customer data:", error);
		return null;
	}
};

export const deleteCustomer = async (id) => {
	try {
		const response = await fetch(
			`http://localhost:8000/api/v1/customers/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error deleting customer:", error);
	}
};

export const fetchCustomerWithPet = async (page) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/v1/customers?includePets=true&page=${page}`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data.data; // Accedemos a data.data para obtener el array de clientes
	} catch (error) {
		console.error("Error fetching data:", error);
		return []; // Devolvemos un array vacío en caso de error
	}
};

// api/ApiConfig.js
export const fetchDataByCedula = async (cedula) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/v1/customers?cedula[eq]=${cedula}`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data.data; // Accedemos a data.data para obtener el array de clientes
	} catch (error) {
		console.error("Error fetching data:", error);
		return []; // Devolvemos un array vacío en caso de error
	}
};

export const fetchCustomersWithPetByCedula = async (cedula) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/v1/customers?cedula[eq]=${cedula}&includePets=true`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data.data; // Accedemos a data.data para obtener el array de clientes con sus mascotas
	} catch (error) {
		console.error("Error fetching customers by cedula:", error);
		return []; // Devolvemos un array vacío en caso de error
	}
};

// En el archivo ApiConfig.js
export const updateCustomer = async (customerId, customerData) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/v1/customers/${customerId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(customerData),
			}
		);
		if (!response.ok) {
			throw new Error("Failed to update customer");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error updating customer:", error);
		throw error;
	}
};

export const fetchCreatePet = async (petData) => {
	try {
		const response = await fetch("http://127.0.0.1:8000/api/v1/pets", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(petData),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json();

		// Verificar si la respuesta contiene un mensaje de error
		if (responseData.error) {
			console.error("Error adding pet:", responseData.error);
			throw new Error(responseData.error);
		}

		console.log("Pet added successfully:", responseData);
		return responseData;
	} catch (error) {
		console.error("Error adding pet:", error.message);
		throw new Error(
			"Hubo un error al agregar la mascota. Por favor, inténtalo de nuevo."
		);
	}
};

export const createMedicalHistory = async (historyData) => {
	try {
		const response = await fetch(
			"http://127.0.0.1:8000/api/v1/medical-histories",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(historyData),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json();

		// Verificar si la respuesta contiene un mensaje de error
		if (responseData.error) {
			console.error("Error adding history:", responseData.error);
			throw new Error(responseData.error);
		}

		console.log("History added successfully:", responseData);
		return responseData;
	} catch (error) {
		console.error("Error adding history:", error.message);
		throw new Error(
			"Hubo un error al agregar la historia. Por favor, inténtalo de nuevo."
		);
	}
};

//Crear varias pet
export const fetchBulkCreatePet = async (petData) => {
	try {
		const response = await fetch("http://127.0.0.1:8000/api/v1/pets/bulk", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(petData),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json();

		// Verificar si la respuesta contiene un mensaje de error
		if (responseData.error) {
			console.error("Error adding pet:", responseData.error);
			throw new Error(responseData.error);
		}

		console.log("Pet added successfully:", responseData);
		return responseData;
	} catch (error) {
		console.error("Error adding pet:", error.message);
		throw new Error(
			"Hubo un error al agregar la mascota. Por favor, inténtalo de nuevo."
		);
	}
};

// mostrar las mascotas del cliente escogido

// ApiConfig.js
export const fetchMostrarPets = async (customerId) => {
	try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/v1/customers/${customerId}?includePets=true`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json();
		console.log("Mascotas del cliente:", responseData);
		return responseData;
	} catch (error) {
		console.error("Error fetching pets:", error);
		throw new Error(
			"Hubo un error al obtener las mascotas del cliente. Por favor, inténtalo de nuevo."
		);
	}
};

export const fetchMedicalHistoryByPetId = async ({
	petId,
	includeConsultations,
}) => {
	try {
		const baseUrl = `http://127.0.0.1:8000/api/v1/medical-histories?petId[eq]=${petId}`;

		const parsedUrl = includeConsultations
			? baseUrl + "&includeConsultations=true"
			: baseUrl;

		const response = await fetch(parsedUrl);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();

		return data.data; // Accedemos a data.data para obtener el array de historias médicas
	} catch (error) {
		console.error("Error fetching medical histories:", error);
		return []; // Devolvemos un array vacío en caso de error
	}
};

export const getAllMedicalHistories = async ({
	pageNum = 1,
	lastPage = false,
} = {}) => {
	try {
		const baseUrl = new URL("http://127.0.0.1:8000/api/v1/medical-histories");

		baseUrl.searchParams.set("page", pageNum);

		const response = await fetch(baseUrl);

		if (!response.ok) throw new Error("Network response was not ok");

		const data = await response.json();

		if (lastPage) return await getAllPets({ pageNum: data.meta.last_page });

		return data;
	} catch (error) {
		console.error("Error fetching medical histories data:", error.message);
		return null;
	}
};

export const getMedicalHistoryById = async ({ id }) => {
    try {
        const history = data.histories.find(history => history.id === id);
        return history ? history : null;
    } catch (error) {
        console.error("Error fetching medical history data:", error.message);
        return null;
    }
};

export const getAllConsultations = async ({ paginate = true, pageNum = 1 } = {}) => {
    try {
        // Obtener todas las consultas
        const consultations = data.consultations;

        if (!paginate) {
            return consultations;
        }

        // Paginación
        const itemsPerPage = 10;
        const startIndex = (pageNum - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const paginatedConsultations = consultations.slice(startIndex, endIndex);

        return paginatedConsultations;
    } catch (error) {
        console.error("Error fetching consultations data:", error.message);
        return null;
    }
};

export const getConsultationById = async ({ id }) => {
	try {
		const baseUrl = new URL(`http://127.0.0.1:8000/api/v1/consultations/${id}`);

		const response = await fetch(baseUrl);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();

		return data.data;
	} catch (error) {
		console.error("Error fetching consultation data:", error);
		return null;
	}
};

export const deletePet = async (petId) => {
	try {
		const url = `http://localhost:8000/api/v1/pets/${petId}`;
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		console.log("Pet deleted successfully");
		return data;
	} catch (error) {
		console.error("Error deleting pet:", error);
		throw new Error("Error deleting pet");
	}
};
