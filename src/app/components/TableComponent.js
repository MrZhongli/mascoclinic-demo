import React from "react";

const TableComponent = ({
  data,
  columns,
  // searchTerm,
  // handleSearch,
  // handleExpandDetails,
}) => {
  // Función para convertir una cadena en un objeto si es posible
  const parseIfString = (value) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  };

  let filteredData = data;

  // Verificar si data es un array
  if (!Array.isArray(data)) {
    filteredData = [];
  }

  // if (searchTerm) {
  //   filteredData = data.filter((item) =>
  //     item.id.toString() === searchTerm.toString()
  //   );
  // }

  // const handleExpandDetails = (id) => {
  //   setExpandedHistoryId(expandedHistoryId === id ? null : id);
  // };

  return (
    <div className="m-12 bg-white p-5">
      <div className="flex justify-between mb-4">
        <div className="flex">
          {/* <input
            type="text"
            id="search"
            name="search"
            placeholder="Buscar por ID..."
            className="border border-indigo-500/75 text-black p-2 rounded-full focus:outline-none focus:border-blue-500"
            // value={searchTerm}
            // onChange={(e) => handleSearch(e.target.value)}
          /> */}
          {/* <button
            className="flex gap-x-3 items-center bg-secondary-400 hover:bg-secondary-600 transition duration-300 rounded-3xl font-semibold text-sm text-white px-5 py-2 mr-3"
            // onClick={handleSearch}
          >
            Buscar
          </button> */}
        </div>
        <button
          className="flex gap-x-3 items-center bg-secondary-400 hover:bg-secondary-600 transition duration-300 rounded-3xl font-semibold text-sm text-white px-5 py-2 mr-3"
        //   onClick={handleAdd}
        >
          Agregar
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2  border-gray-500 text-indigo-600"
                  style={{ backgroundColor: "#F4F4FB" }}
                >
                  {column.title}
                </th>
              ))}
              <th className="px-4 py-2  border-gray-500" style={{ backgroundColor: "#F4F4FB" }}>

              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-2 text-indigo-400"
                    style={{ backgroundColor: "#F9F9F9" }}
                  >
                    {parseIfString(item[column.key])}
                  </td>
                ))}
                <td className="px-4 py-2 bg-white text-black" style={{ backgroundColor: "#F9F9F9" }}>
                  {/* <Link href=`medical-histories/`${data.id}" "> */}
                  <button
                    // onClick={() => handleEdit(item)}
                    className="flex gap-x-3 items-center bg-secondary-400 hover:bg-secondary-600 transition duration-300 rounded-3xl font-semibold  text-white px-5 py-1 mr-3"
                  >
                    Ver detalles
                  </button>
                  {/* </Link> */}
                  <button
                    // onClick={() => handleDelete(item.id)}
                    className="flex items-center py-1 px-3 rounded-3xl bg-primary-800 hover:bg-primary transition duration-300 font-medium  text-white"
                  >
                    Eliminar
                  </button>
                  <button
                    // onClick={() => handleExpandDetails(data.id)}
                    className="flex gap-x-3 items-center  hover:bg-gray-400  transition duration-300 rounded-3xl font-bold text-xl text-black px-5 py-1 mr-3"
                  >
                    ...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modales y otros componentes de confirmación aquí */}
    </div>
  );
};

export default TableComponent;
