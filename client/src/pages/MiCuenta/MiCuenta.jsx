
import React from "react";
import "./MiCuenta.css";
import NavbarStudent from "../../components/NavbarStudent";
import Button2 from "../../components/Utilities/Button2";
import "../../../public/219969.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function MiCuenta() {
  return (
    <div className="MiCuenta">
      <NavbarStudent />
      <div className="card">
        <div className="iman">
          <img src="../../../public/219969.png" alt="usu" />
        </div>
        <div className="card2">
          <h1>{Cookies.get("nombre")}</h1>
        </div>
        <div className="card3">
          <h1>{Cookies.get("apellido")}</h1>
        </div>
        <div className="card4">
          <h1>{Cookies.get("email")}</h1>
        </div>
      </div>
      <div className="coso">
        <h1>Editar</h1>
      </div>
      <div className="coso2">
        <Link to="/ActualizacionCorreo">
          <Button2
            Boton2="Correo"
            color="rgb(15, 65, 118)"
            fontColor="white"
            width="200px"
          />
        </Link>
      </div>
      <div className="coso3">
        <Button2
          Boton2="Contraseña"
          color="rgb(15, 65, 118)"
          fontColor="white"
          width="200px"
        />
      </div>
      <div className="coso4">
        <Button2
          Boton2="Cerrar Sesión"
          color="Brown"
          fontColor="white"
          width="200px"
        />
      </div>
    </div>
  );
}

export default MiCuenta;
