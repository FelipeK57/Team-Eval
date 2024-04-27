import "./Home.css"
import NavBar from '../../components/Utilities/NavBar.jsx';
import Button2 from "../../components/Utilities/Button2";

function Home() {
    return (
        <div className="Home">
            <NavBar sesion="Iniciar sesion" />
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

export default Home