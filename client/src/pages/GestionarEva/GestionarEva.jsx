import "./GestionarEva.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Trajet from "../../components/Trajet";
import Tarjet2 from "../../components/Tarjet2";
import PropTypes from "prop-types";
import GroupIcon from '@mui/icons-material/Group';
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


function GestionarEva(props) {
    const { cursoId } = useParams();
    const location = useLocation();
    const materia = location.state?.materia || "Sin materia";
    const [evaluaciones, setEvaluaciones] = useState([]);

    const navigate = useNavigate();
    

    GestionarEva.propTypes = {
        ir: PropTypes.func.isRequired,
        materia: PropTypes.string.isRequired
    }

    useEffect(() => {
        const fetchEvaluaciones= async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/evaluaciones/", 
                    { id: cursoId }    
                );
                setEvaluaciones(response.data.evaluaciones);
            } catch (error) {
                console.error("Error al obtener las evaluaciones  ", error);
            }
        };
        fetchEvaluaciones();
    }, []);
    
    const ConfigCursos = () => {
        navigate(`/Grupos/${cursoId}`, { state: { materia: materia} });
    }

    const crearEva = () => {
        navigate(`/CrearEva/${cursoId}`, { state: { materia: materia} });
    }
    


    return (
        <div className="tinder">
            <NavbarProfesor />
            <div className="tonder"><h1>Gestionar Evaluaciones del curso</h1></div>
            <div className="tinder1">
                <Tarjet2 agregar={crearEva}/>

                {evaluaciones.map((evaluacion) => (
                    <Trajet key={evaluacion.id} Evalu={evaluacion.nombre} onClick={() => navigate(`/AsignarEva/${evaluacion.id}` )} />
                ))} 
            
            </div>
            <div className="m"><h1>Gestionar Grupos</h1></div>
            <div className="merlina">
                <div className="blinblin" >
                    <GroupIcon sx={{ fontSize: 80 }}  onClick={ConfigCursos}/>
                </div>
            </div>
        </div>

    )
}

export default GestionarEva