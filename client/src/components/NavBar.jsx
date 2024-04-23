import React from 'react';
import './Utilities/NavBar.css';
import "../../public/carlos.jpeg";

const NavBar = () => {
  return (
    <nav className="navbar" >
      <div className='imagen'><img src="../../public/carlos.jpeg" alt="logo" /></div>
      <a href="#" className="navbara"><b>Iniciar Sesion</b></a>
    </nav>
  );
};

export default NavBar;