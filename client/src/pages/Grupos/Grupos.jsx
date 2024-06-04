import "./Grupos.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import PropTypes from "prop-types";
import GruposCard from "../../components/GruposCard";
import GruposCard1 from "../../components/GruposCard1";
import GruposCard3 from "../../components/GruposCard3";
import Button2 from "../../components/Utilities/Button2";
import { useNavigate } from "react-router-dom";

function Grupos(props) {

    Grupos.propTypes = {
        materia: PropTypes.string.isRequired
    }

    const navigate = useNavigate();

    const SeleccionarRubrica = () => {
        navigate("/SeleccionarRubrica");
    }

    return (
        <div className="Grupos">
            <NavbarProfesor />  
            <div className="holi"><h1>Configuración del curso<br/><b>{props.materia}</b></h1></div>     
            <div className="hola"><h1>Grupos del Curso</h1></div>  
            <div className="holo"> 
            <GruposCard titulo="Integrantes" NombreEstudiante="" />
            </div>
            <div className="holu"> 
            <GruposCard1 />
            </div>
            <div className="lel"> 
            <GruposCard3 estudiante="Miguel Angulo" />
            </div>
            <div className="conio"> 
            <Button2 Boton2="Guardar Cambios" color="rgb(15, 65, 118)" fontColor="white" onClick={SeleccionarRubrica}  />
            </div>
        </div>
    )
}

export default Grupos