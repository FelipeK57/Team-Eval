import React from 'react';
import './Utilities/NavbarStudent.css';
import "../../public/Logo.png";

const NavbarStudent = () => {
  return (
    <nav className="navbar" >
      <div className='imagen'><img src="../../public/Logo.png" alt="logo" /></div>
      <h1 href="#" className="navbarh1"><b>¡Estudiante!</b></h1>
      <a href="#" className="navbara"><b>Mi Cuenta</b></a>
      <a href="#" className="navbarb"><b>Informes</b></a>
    </nav>
  );
};

export default NavbarStudent;