import "./HomeProfesor.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Button2 from "../../components/Utilities/Button2";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

function HomeProfesor() {
  const navigate = useNavigate();

<<<<<<< HEAD
  useEffect(() => {
    const verificarSesion = () => {
      const loggedIn = Cookies.get("loggedIn");
      const userId = Cookies.get("identificacion");
=======
    const configurarCursos = () => {
        navigate('/CursoP');
    };

    useEffect(() => {
>>>>>>> origin/Cursos_profesor

      if (loggedIn === "true" && userId) {
        console.log("El usuario ha iniciado sesión. ID de usuario:", userId);
      } else {
        console.log("El usuario no ha iniciado sesión.");
        navigate("/Login");
      }
    };

    verificarSesion();
  }, [navigate]);

<<<<<<< HEAD
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
        <Link to="/cursop">
          <Button2
            Boton2="Configurar Cursos"
            color="rgb(15, 65, 118)"
            fontColor="white"
          />
        </Link>
      </div>
    </div>
  );
=======
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
>>>>>>> origin/Cursos_profesor
}

export default HomeProfesor;
