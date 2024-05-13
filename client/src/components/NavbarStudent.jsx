import React from "react";
import "./Utilities/NavbarStudent.css";
import "../../public/Logo.png";
import { Link } from "react-router-dom";

const NavbarStudent = () => {
  return (
    <nav className="navbar">
      <a href="/Student" className='imagef'>
        <img src ="../../public/flecha_volver.png" alt ="flecha_volver" />
      </a>
      <a href="/Student" className="image">
        <img src="../../public/Logo.png" alt="logo" />
      </a>
      <h1 href="#" className="navbarh1">
        <b>¡Estudiante!</b>
      </h1>
      <Link to="/MiCuenta" className="nava">
        <b>Mi Cuenta</b>
      </Link>
      <Link to="/" className="naveb">
        <b>Informes</b>
      </Link>
    </nav>
  );
};

export default NavbarStudent;
