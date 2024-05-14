import React from 'react';
import './Utilities/NoQuieroCrearMasNavbars.css';
import "../../public/Logo.png";

const NoQuieroCrearMasNavbars = () => {
  return (
    <nav className="no" >
      <div className='mimin'><img src="../../public/Logo.png" alt="logo" /></div>
      <h1 href="#" className="ayuda"><b>¡Administrador!</b></h1>
      <a href="#" className="noquiero"><b>Mi Cuenta</b></a>
    </nav>
  );
};

export default NoQuieroCrearMasNavbars;