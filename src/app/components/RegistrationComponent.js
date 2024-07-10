import React from 'react';
// import { IconContext } from 'react-icons';
// import { BsFillPersonFill } from 'react-icons/bs'; // Ejemplo de icono, puedes cambiarlo por el que necesites

const RegistrationComponent = ({ title, count }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-5">
      <h2 className="text-center text-lg font-bold text text-indigo-500">{title}</h2>
      <div className="flex items-center justify-center mt-4">
        <span className="text-red-500 text-4xl font-bold mr-2">{count}</span>
        {/* {Icon && (
          <IconContext.Provider value={{ className: 'text-red-500 text-4xl' }}>
            <div>{<Icon />}</div>
          </IconContext.Provider>
        )} */}
        <p className='text-black'>AQUI VA EL ICONO</p>
      </div>
    </div>
  );
};

export default RegistrationComponent;