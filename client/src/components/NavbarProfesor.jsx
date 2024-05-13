import React from 'react';
import './Utilities/NavbarProfesor.css';
import "../../public/Logo.png";


const NavbarProfesor = () => {
  return (
    <nav className="navb" >
      <div className='ima'><img src="../../public/Logo.png" alt="logo" /></div>
      <h1 href="#" className="navbh1"><b>¡Profesor!</b></h1>
      <a href="MiCuentaP" className="navba"><b>Mi Cuenta</b></a>
      <a href="#" className="navbb"><b>Informes</b></a>
    </nav>
  );
};

export default NavbarProfesor;