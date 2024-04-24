import React from 'react';
import './Utilities/NavBar.css';
import "../../public/Logo.png";

const NavBar = () => {
  return (
    <nav className="navbar" >
      <div className='imagen'><img src="../../public/carlos.jpeg" alt="logo" /></div>
      <a href="#" className="navbara"><b>Iniciar Sesion</b></a>
    </nav>
  );
};

export default NavBar;