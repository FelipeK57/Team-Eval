import React from 'react';
import './Utilities/NavbarProfesor.css';
import "../../public/Logo.png";

const NavbarProfesor = () => {
  return (
    <nav className="navbar" >
      <div className='imagen'><img src="../../public/Logo.png" alt="logo" /></div>
      <h1 href="#" className="navbarh1"><b>¡Profesor!</b></h1>
      <a href="#" className="navbara"><b>Mi Cuenta</b></a>
      <a href="#" className="navbarb"><b>Informes</b></a>
    </nav>
  );
};

export default NavbarProfesor;