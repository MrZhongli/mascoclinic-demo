"use client"
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchButton = ({ data }) => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    function handleSearch(term) {
        console.log("Buscar con término:", term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        replace(`${pathName}?${params.toString()}`);

        // Filtrar los datos según el ID ingresado en el input
        const filteredData = data.filter(item => item.id === term);

        // Mostrar el dato filtrado en la consola
        if (filteredData.length > 0) {
            console.log("Dato filtrado:", filteredData[0]);
        } else {
            console.log("ID no encontrado");
        }
    }

    return (
        <div className="flex">
            <input
                type="text"
                id="search"
                name="search"
                placeholder="ID del historial..."
                className="border border-indigo-500/75 text-black p-2 rounded-full focus:outline-none focus:border-blue-500"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <button
                className="flex gap-x-3 items-center bg-secondary-400 hover:bg-secondary-600 transition duration-300 rounded-3xl font-semibold text-sm text-white px-5 py-2 mr-3"
                onClick={() => handleSearch()}
            >
                Buscar
            </button>
        </div>
    );
};

export default SearchButton;
