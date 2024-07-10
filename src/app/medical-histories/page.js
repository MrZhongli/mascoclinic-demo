// "use client"
import { getAllMedicalHistories } from "../api/ApiConfig";
import { PlusIcon } from "../components/icons/PlusIcon";
import SearchButton from "../components/SearchButton";

export default async function MedicalHistoriesList() {
    // Estado para almacenar los datos de historias médicas
    const historyData = await getAllMedicalHistories();
    const { data } = historyData;

    return (
        <div className="w-full max-h-full p-8">
            <h2 className="text-2xl font-bold text-indigo-400 text-start my-5">
                Historias Clínicas
            </h2>
            <div className="w-full bg-white p-5">
                <div className="flex justify-between mb-4">
                    <SearchButton data={data} />
                    <button className="flex gap-x-3 items-center bg-pink-400 hover:bg-pink-600 transition duration-300 rounded-3xl font-semibold text-sm text-white px-5 py-2 mr-3">
                        <PlusIcon /> Agregar historia
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-indigo-400" style={{ backgroundColor: "#F4F4FB" }}>ID de Mascota</th>
                                <th className="px-4 py-2 text-indigo-400" style={{ backgroundColor: "#F4F4FB" }}>ID de Historia Médica</th>
                                <th className="px-4 py-2 text-indigo-400" style={{ backgroundColor: "#F4F4FB" }}>Antecedentes</th>
                                <th className="px-4 py-2 text-indigo-400" style={{ backgroundColor: "#F4F4FB" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(itemhistory => (
                                <tr key={itemhistory.id}>
                                    <td className="px-4 py-2 text-indigo-600" style={{ backgroundColor: "#FCFAFA" }}>{itemhistory.id}</td>
                                    <td className="px-4 py-2 text-indigo-600" style={{ backgroundColor: "#FCFAFA" }}>{itemhistory.petId}</td>
                                    <td className="px-4 py-2 text-indigo-600" style={{ backgroundColor: "#FCFAFA" }}>{itemhistory.antecedentes}</td>
                                    <td className="px-4 py-2 text-indigo-600" style={{ backgroundColor: "#FCFAFA" }}>
                                        <button
                                            // onClick={() => handleExpandDetails(history.id)}
                                            className="flex gap-x-3 items-center hover:bg-gray-400 transition duration-300 rounded-3xl font-bold text-xl text-indigo-600 px-5 py-1 mr-3">
                                            ...
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
