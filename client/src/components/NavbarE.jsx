import React from "react";
import { Link } from "react-router-dom";
import "./NavbarE.css";

function NavbarE() {
  return (
    <div className="navbar-c">
      <div className="default-nav">
        <Link to="/Student">
          <img src="../../public/flecha_volver.png" alt="flecha_volver" />
        </Link>
        <Link to="/Student">
          <img src="../../public/Logo.png" alt="logo" />
        </Link>
      </div>
      <h1>Estudiante</h1>
      <div className="student-nav">
        <h1>Informes</h1>
        <h1>Mi Cuenta</h1>
      </div>
    </div>
  );
}

export default NavbarE;
