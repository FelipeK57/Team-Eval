import "./MiCuenta.css";
import Button2 from "../../components/Utilities/Button2";
import Button from "../../components/Utilities/Button";
import "../../../public/219969.png";
import NavbarProfesor from "../../components/NavbarProfesor";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function MiCuentaP() {
  const navigate = useNavigate();
  const [profesorInfo, setProfesorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verificarSesion = () => {
      const loggedIn = Cookies.get("loggedIn");
      const userId = Cookies.get("identificacion");

      if (loggedIn === "true" && userId) {
        console.log("El usuario ha iniciado sesión");
      } else {
        console.log("El usuario no ha iniciado sesión.");
        navigate("/Login");
      }
    };

    verificarSesion();
  }, [navigate]);

  useEffect(() => {
    const obtenerInformacionProfesor = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/ProfileProfesor/",
          {
            identificacion: Cookies.get("identificacion"),
          },
          {
            headers: {
              Authorization: `Token ${Cookies.get("sessionid")}`,
            },
          }
        );
        setProfesorInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la información del profesor:", error);
      }
    };

    obtenerInformacionProfesor();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/logout/", null, {
        headers: {
          Authorization: `Token ${Cookies.get("sessionid")}`, 
        },
      });
      Cookies.remove("token");
      Cookies.remove("loggedIn");
      Cookies.remove("identificacion");
      navigate("/Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.response.error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="MiCuenta">
      <NavbarProfesor />
      <div className="card">
        <div className="iman">
          <img src="../../../public/219969.png" alt="usu" />
        </div>
        <div className="card2">
          <h1>{profesorInfo.nombre}</h1>
        </div>
        <div className="card3">
          <h1>{ profesorInfo.apellidos}</h1>
        </div>
        <div className="card4">
          <h1>{profesorInfo.email}</h1>
        </div>
      </div>
      <div className="coso">
        <h1>Editar</h1>
      </div>
      <div className="coso2">
        <Link to="/ActualizacionCorreoP">
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

export default MiCuentaP;
