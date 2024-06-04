import React from "react";
import "./MiCuenta.css";
import NavbarStudent from "../../components/NavbarStudent";
import Button2 from "../../components/Utilities/Button2";
import Button from "../../components/Utilities/Button";
import "../../../public/219969.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function MiCuenta() {
  const navigate = useNavigate();



  const handleClick = async (e) => {
    e.preventDefault();
    try {
      
            const response = await axios.post('http://localhost:8000/logout/', null, {
            headers: {
                'Authorization': `Token ${Cookies.get('sessionid')}`, 
                'X-CSRFToken': Cookies.get('csrftoken'), // Incluir el token CSRF en los encabezados
            },
            withCredentials: true,
        });

      // Eliminar cookies locales
      console.log('Respuesta de logout:', response.data);
      Cookies.remove("sessionid");
      Cookies.remove("csrftoken");
      Cookies.remove("loggedIn");
      Cookies.remove("nombre");
      Cookies.remove("apellido");
      Cookies.remove("email");
      Cookies.remove("codigo");
      Cookies.remove("user");

      // Navegar a la página de login
      navigate("/Login");
    } catch (error) {
        console.error("Error al cerrar sesión:", error.response?.data || error.message);
    }
};

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
        <Link to="/CambioContraAdmin">
          <Button2
            Boton2="Contraseña"
            color="rgb(15, 65, 118)"
            fontColor="white"
            width="200px"
          />
        </Link>
      </div>
      <div className="coso4">
        <Button
          onClick={handleClick}
          Boton="Cerrar Sesión"
          color="Brown"
          fontColor="white"
          width="200px"
        />
      </div>
    </div>
  );
}

export default MiCuenta;
