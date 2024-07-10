import React from "react";

const TableListItem = ({ history }) => {
  const keys = Object.keys(history);

  return (
    <tr>
      {keys.map((key) => (
        <td
          key={key}
          className="px-4 py-2 text-indigo-600"
          style={{ backgroundColor: "#FCFAFA" }}
        >
          {history[key]}
        </td>
      ))}
      <td className="px-4 py-2 text-indigo-600" style={{ backgroundColor: "#FCFAFA" }}>
        <button
          onClick={() => handleExpandDetails(history.id)}
          className="flex gap-x-3 items-center  hover:bg-gray-400  transition duration-300 rounded-3xl font-bold text-xl text-indigo-600 px-5 py-1 mr-3"
        >
          ...
        </button>
      </td>
    </tr>
  );
};

export default TableListItem;
