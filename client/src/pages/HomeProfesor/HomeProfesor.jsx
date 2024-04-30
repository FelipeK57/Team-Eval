import "./HomeProfesor.css"
import NavbarProfesor from '../../components/NavbarProfesor';
import Button from '../../components/Utilities/Button';
import Button2 from "../../components/Utilities/Button2";

function HomeProfesor() {
    return (
        <div className="Home">
            <NavbarProfesor />
            <div className="container">
                <h1>Bienvenido a <b>T</b>eam <b>E</b>val</h1>
            </div>
            <div className="container2">
                <p>Facilitando la evaluación por pares para mejorar el trabajo en equipo</p>
            </div>
            <div className="container3">
                <Button2 Boton2="Configurar Cursos" color="rgb(15, 65, 118)" fontColor="white" width="250px"/>
            </div>
        </div>
    );
}

export default HomeProfesor