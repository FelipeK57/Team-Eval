import "./HomeProfesor.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Button2 from "../../components/Utilities/Button2";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "../../components/Utilities/Button";

function HomeProfesor() {
  const navigate = useNavigate();

    const configurarCursos = () => {
        navigate('/CursoP');
    };

    useEffect(() => {
      const verificarSesion = () => {
        const loggedIn = Cookies.get("loggedIn");
        const userId = Cookies.get("sessionid");
  
        if (loggedIn === "true" && userId) {
          console.log("El usuario ha iniciado sesión.");
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
                <h1>Bienvenido a <b>T</b>eam <b>E</b>val</h1>
            </div>
            <div className="cont2">
                <p>Facilitando la evaluación por pares para mejorar el trabajo en equipo</p>
            </div>
            <div className="cont3">
                <Button Boton="Configurar Cursos" color="rgb(15, 65, 118)" fontColor="white" onClick={configurarCursos}/>
            </div>
        </div>
    );
  }

export default HomeProfesor;
