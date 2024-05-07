import React from 'react';
import './Utilities/NavbarStudent.css';
import "../../public/Logo.png";

const NavbarStudent = () => {
  return (
    <nav className="nav" >
      <div className='image'><img src="../../public/Logo.png" alt="logo" /></div>
      <h1 href="#" className="navh1"><b>¡Estudiante!</b></h1>
      <a href="#" className="nava"><b>Mi Cuenta</b></a>
      <a href="#" className="naveb"><b>Informes</b></a>
    </nav>
  );
};

export default NavbarStudent;