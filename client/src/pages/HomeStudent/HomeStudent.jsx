import "./HomeStudent.css"
import NavbarStudent from '../../components/NavbarStudent';
import Button2 from "../../components/Utilities/Button2";

function HomeStudent() {
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
}

export default HomeStudent