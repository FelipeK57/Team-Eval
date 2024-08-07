import "./MiCuenta.css";
import Button2 from "../../components/Utilities/Button2";
import Button from "../../components/Utilities/Button";
import "../../../public/219969.png";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function MiCuentaA() {
  const navigate = useNavigate();
  const [adminInfo, setadminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verificarSesion = () => {
      const user = Cookies.get("user");
      const token = Cookies.get("sessionid");

      if ( user &&  token) {
        console.log("El usuario ha iniciado sesión");
      } else {
        console.log("El usuario no ha iniciado sesión.");
        navigate("/login");
      }
    };

    verificarSesion();
  }, [navigate]);

  useEffect(() => {
    const obtenerInformacionProfesor = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/adminProfile/",
          {
            user: Cookies.get("user"),
          },
          {
            headers: {
              Authorization: `Token ${Cookies.get("sessionid")}`,
            },
          }
        );
        setadminInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la información del admin:", error);
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
      Cookies.remove("loggedIn");
      Cookies.remove("sessionid");
      Cookies.remove("user");
      Cookies.remove("codigo");
      Cookies.remove("nombre");
      Cookies.remove("apellido");
      Cookies.remove("email");
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
      <NoQuieroCrearMasNavbars />
      <div className="card">
        <div className="iman">
          <img src="../../../public/Perfil.jpg" alt="usu" />
        </div>
        <div className="card2">
          <h1>{adminInfo.nombre}</h1>
        </div>
        <div className="card3">
          <h1>{adminInfo.apellidos}</h1>
        </div>
        <div className="card4">
          <h1>{adminInfo.email }</h1>
        </div>
      </div>
      <div className="coso">
        <h1>Editar</h1>
      </div>
      <div className="coso2">
        <Link to="/ActualizarcorreoA">
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

export default MiCuentaA;
