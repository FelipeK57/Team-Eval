<<<<<<< HEAD
import "./HomeStudent.css"
import NavbarStudent from '../../components/NavbarStudent';
=======
import "./HomeStudent.css";
import NavbarStudent from "../../components/NavbarStudent";
>>>>>>> origin/cursos_estudiante/fe-be
import Button2 from "../../components/Utilities/Button2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function HomeStudent() {
<<<<<<< HEAD
    const navigate = useNavigate();
    useEffect(() => {

        const verificarSesion = () => {
            const loggedIn = Cookies.get('loggedIn');
            const userId = Cookies.get('codigo');

            if (loggedIn === 'true' && userId) {
                console.log("El usuario ha iniciado sesión. ID de usuario:", userId);
            } else {
                console.log("El usuario no ha iniciado sesión.");
                navigate('/Login');
            }
        };

        verificarSesion();
    }, [navigate]);





    return (
        <div className="Home2">
            <NavbarStudent />
            <div className="conte">
                <h1>Bienvenido a <b>T</b>eam <b>E</b>val</h1>
            </div>
            <div className="conte2">
                <p>Facilitando la evaluación por pares para mejorar el trabajo en equipo</p>
            </div>
            <div className="conte3">
                <Button2 Boton2="Ir a Calificar" color="rgb(15, 65, 118)" fontColor="white" width="200px"/>
            </div>
        </div>
    );
=======
  return (
    <div className="Home2">
      <NavbarStudent />
      <div className="conte">
        <h1>
          Bienvenido a <b>T</b>eam <b>E</b>val
        </h1>
      </div>
      <div className="conte2">
        <p>
          Facilitando la evaluación por pares para mejorar el trabajo en equipo
        </p>
      </div>
      <div className="conte3">
        <Button2
          Boton2="Ir a Calificar"
          color="rgb(15, 65, 118)"
          fontColor="white"
          width="200px"
        />
      </div>
    </div>
  );
>>>>>>> origin/cursos_estudiante/fe-be
}

export default HomeStudent;
