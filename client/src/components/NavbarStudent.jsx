import React from "react";
import "./Utilities/NavbarStudent.css";
import "../../public/Logo.png";
import { Link } from "react-router-dom";

const NavbarStudent = () => {
  return (
    <nav className="navbar">
      <div className="imagen">
        <img src="../../public/Logo.png" alt="logo" />
      </div>
      <h1 href="#" className="navbarh1">
        <b>¡Estudiante!</b>
      </h1>
      <Link to="/MiCuenta" className="navbara">
        <b>Mi Cuenta</b>
      </Link>
      <Link href="#" className="navbarb">
        <b>Informes</b>
      </Link>
    </nav>
  );
};

export default NavbarStudent;
