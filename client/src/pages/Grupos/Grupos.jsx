import "./Grupos.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import PropTypes from "prop-types";
import GruposCard from "../../components/GruposCard";
import GruposCard1 from "../../components/GruposCard1";
import GruposCard3 from "../../components/GruposCard3";
import Button2 from "../../components/Utilities/Button2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Field from "../../components/Utilities/Field";
import AddIcon from '@mui/icons-material/Add';

function Grupos(props) {
    const { evaId } = useParams();
    const { cursoId } = useParams();
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudiantes_sin_grupo, setEstudiantes_sin_grupo] = useState([]);
    const location = useLocation();
    const materia = location.state?.materia || "Sin materia";
    const [grupoIdSeleccionado, setGrupoIdSeleccionado] = useState(null);
    const navigate = useNavigate();

    Grupos.propTypes = {
        materia: PropTypes.string.isRequired
    }


    const handleSelectdTeam = async (id) => {
        setGrupoIdSeleccionado(id);
        try {
            const response = await axios.post(
                "http://localhost:8000/estudiantes_grupos/",
                { id: id }
            );
            setEstudiantes(Array.isArray(response.data.estudiantes) ? response.data.estudiantes : []);
        } catch (error) {
            console.error("Error al obtener los estudiantes  ", error);
        }
    };

    useEffect(() => {
        const fetchestudiantes = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/estudiantes_sin_grupo/",
                    { idEva: evaId,
                    idCurso: cursoId
                     }
                );
                setEstudiantes_sin_grupo(response.data.estudiantes);
            } catch (error) {
                console.error("Error al obtener los estudiantes  ", error);
            }
        };
        fetchestudiantes();
    }, [evaId, cursoId]);

    const eliminarEstudiante = (id) => {
        try {
            const response = axios.post(
                "http://localhost:8000/elimar_estudiante/", {
                estudianteId: id,
                grupoId: grupoIdSeleccionado
            }
            )
            window.location.reload();
        } catch (error) {
            console.error("Error al eliminar el estudiante  ", error);
        }
    }

    const agregarEstudiante = (id) => {
        try {
            const response = axios.post(
                "http://localhost:8000/agregar_estudiante/", {
                estudianteId: id,
                grupoId: grupoIdSeleccionado
            }
            )
            window.location.reload();
        } catch (error) {
            console.error("Error al agregar el estudiante  ", error);
        }
    };

    const GestionarEva = (cursoId, nombre) => {
        navigate(`/GestionarEva/${cursoId}`, { state: { materia: nombre } });
    }

    const eliminarGrupo = (id) => {
        try {
            const response = axios.post(
                "http://localhost:8000/elimar_grupo/", {
                id: id
            }
            )
            window.location.reload();
        } catch (error) {
            console.error("Error al eliminar el grupo  ", error);
        }
    }

    return (
        <div className="Grupos">
            <NavbarProfesor />
            <div className="holi"><h1>Configuración de la evaluacion: <br /><b>{materia}</b></h1></div>
            <div className="holo">
                <GruposCard titulo="Integrantes" estudiantes={estudiantes} eliminar={eliminarEstudiante} />
            </div>
            <div className="holu">
<<<<<<< HEAD
                <GruposCard1 id={evaId} onSelectTeam={handleSelectdTeam} eliminarGrupo={eliminarGrupo}/>
=======
                <GruposCard1 id={evaId} onSelectTeam={handleSelectdTeam} eliminarGrupo=" "/>
                <div className="ButtonAgregarRubricas">
                    <button onClick=" "><AddIcon /></button>
                </div>
>>>>>>> origin/corrigiendo_errorcillos2
            </div>
            <div className="lel">
                <GruposCard3 estudiantes={estudiantes_sin_grupo} agregar={agregarEstudiante} />
            </div>
            <div className="conio">
                <Button2 Boton2="Guardar Cambios" color="rgb(15, 65, 118)" fontColor="white" onClick={() => GestionarEva(cursoId, materia)} />
            </div>
            
            

        </div>
    )
}

export default Grupos