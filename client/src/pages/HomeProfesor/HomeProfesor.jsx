import "./HomeProfesor.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Button from "../../components/Utilities/Button";
import Button2 from "../../components/Utilities/Button2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function HomeProfesor() {
  const navigate = useNavigate();

  useEffect(() => {
    const verificarSesion = () => {
      const loggedIn = Cookies.get("loggedIn");
      const userId = Cookies.get("identificacion");

      if (loggedIn === "true" && userId) {
        console.log("El usuario ha iniciado sesión. ID de usuario:", userId);
      } else {
        console.log("El usuario no ha iniciado sesión.");
        navigate("/Login");
      }
    };

    verificarSesion();
  }, [navigate]);

  return (
    <div className="Home1">
      <NavbarProfesor />
      <div className="cont">
        <h1>
          Bienvenido a <b>T</b>eam <b>E</b>val
        </h1>
      </div>
      <div className="cont2">
        <p>
          Facilitando la evaluación por pares para mejorar el trabajo en equipo
        </p>
      </div>
      <div className="cont3">
        <Button2
          Boton2="Configurar Cursos"
          color="rgb(15, 65, 118)"
          fontColor="white"
        />
      </div>
    </div>
  );
}

export default HomeProfesor;
