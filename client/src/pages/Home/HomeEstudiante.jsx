import "./Home.css"
import NavBar from '../../components/Utilities/NavBar';
import Button2 from "../../components/Utilities/Button2";

function HomeEstudiante() {
    return (
        <div className="Home">
            <NavBar informes = "Informes" sesion = "mi cuenta" Estudiante ='Estudiante!'/>
            <div className="container">
                <h1>Bienvenido a <b>T</b>eam <b>E</b>val</h1>
            </div>
            <div className="container2">
                <p>Facilitando la evaluación por pares para mejorar el trabajo en equipo</p>
            </div>
            <div className="container3">
                <Button2 Boton2="Ir a Calificar" color="rgb(15, 65, 118)" fontColor="white"/>
            </div>
        </div>
    );
}

export default HomeEstudiante;