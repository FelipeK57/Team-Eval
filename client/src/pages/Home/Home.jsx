import "./Home.css"
import NavBar from '../../components/NavBar';
import Button from "../../components/Utilities/Button";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const irCalificar = () =>{
        navigate("/Login");
    }

    return (
        <div className="Home">
            <NavBar />
            <div className="container">
                <h1>Bienvenido a <b>T</b>eam <b>E</b>val</h1>
            </div>
            <div className="container2">
                <p>Facilitando la evaluación por pares para mejorar el trabajo en equipo</p>
            </div>
            <div className="container3">
                <Button Boton="Ir a Calificar" color="rgb(15, 65, 118)" fontColor="white" onClick={irCalificar}/>
            </div>
        </div>
    );
}

export default Home