import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarE.css";

function NavbarE() {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  return (
    <div className="navbar-c">
      <div className="default-nav">
        <img onClick={back} src="../../public/flecha_volver.png" alt="flecha_volver" />
        <Link to="/Student">
          <img src="../../public/Logo.png" alt="logo" />
        </Link>
      </div>
      <h1 className="user-sign">¡Estudiante!</h1>
      <div className="student-nav">
        <Link to="/InformesEstudiante">
          <h1>Informes</h1>
        </Link>
        <Link to="/MiCuenta">
          <h1>Mi Cuenta</h1>
        </Link>
      </div>
    </div>
  );
}

export default NavbarE;
