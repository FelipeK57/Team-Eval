import "./Grupos.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import PropTypes from "prop-types";
import GruposCard from "../../components/GruposCard";
import GruposCard1 from "../../components/GruposCard1";
import GruposCard3 from "../../components/GruposCard3";
import Button2 from "../../components/Utilities/Button2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

function Grupos(props) {
    const { evaId, cursoId } = useParams();
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudiantesSinGrupo, setEstudiantesSinGrupo] = useState([]);
    const location = useLocation();
    const materia = location.state?.materia || "Sin materia";
    const [grupoIdSeleccionado, setGrupoIdSeleccionado] = useState(null);
    const navigate = useNavigate();

    const fetchEstudiantes = async () => {
        try {
            const response = await axios.post("http://localhost:8000/estudiantes_sin_grupo/", {
                idEva: evaId,
                idCurso: cursoId
            });
            setEstudiantesSinGrupo(response.data.estudiantes);
        } catch (error) {
            console.error("Error al obtener los estudiantes sin grupo", error);
        }
    };

    const fetchEstudiantesGrupo = async (id) => {
        try {
            const response = await axios.post("http://localhost:8000/estudiantes_grupos/", { id });
            setEstudiantes(response.data.estudiantes);
        } catch (error) {
            console.error("Error al obtener los estudiantes del grupo", error);
        }
    };

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    useEffect(() => {
        if (grupoIdSeleccionado !== null) {
            fetchEstudiantesGrupo(grupoIdSeleccionado);
        }
    }, [grupoIdSeleccionado]);

    const handleSelectdTeam = (id) => {
        setGrupoIdSeleccionado(id);
    };

    const eliminarEstudiante = async (id) => {
        try {
            await axios.post("http://localhost:8000/elimar_estudiante/", {
                estudianteId: id,
                grupoId: grupoIdSeleccionado
            });
            fetchEstudiantes();
            fetchEstudiantesGrupo(grupoIdSeleccionado);
        } catch (error) {
            console.error("Error al eliminar el estudiante", error);
        }
    };

    const agregarEstudiante = async (id) => {
        try {
            await axios.post("http://localhost:8000/agregar_estudiante/", {
                estudianteId: id,
                grupoId: grupoIdSeleccionado
            });
            fetchEstudiantes();
            fetchEstudiantesGrupo(grupoIdSeleccionado);
        } catch (error) {
            console.error("Error al agregar el estudiante", error);
        }
    };

    const eliminarGrupo = async (id) => {
        try {
            await axios.post("http://localhost:8000/elimar_grupo/", { id });
            setGrupoIdSeleccionado(null);
            fetchEstudiantes();
        } catch (error) {
            console.error("Error al eliminar el grupo", error);
        }
    };

    const añadirGrupo = async () => {
        try {
            await axios.post("http://localhost:8000/agregar_grupo/", { id: evaId });
            fetchEstudiantes();
        } catch (error) {
            console.error("Error al añadir el grupo", error);
        }
    };


    return (
        <div className="Grupos">
            <NavbarProfesor />
            <div className="holi"><h1>Configuración de la evaluación: <br /><b>{materia}</b></h1></div>
            <div className="holo">
                <GruposCard titulo="Integrantes" estudiantes={estudiantes} eliminar={eliminarEstudiante} />
            </div>
            <div className="holu">
                <GruposCard1 id={evaId} onSelectTeam={handleSelectdTeam} eliminarGrupo={eliminarGrupo} />
                <div className="ButtonAgregarRubricas">
                    <button onClick={añadirGrupo}><AddIcon /></button>
                </div>
            </div>
            <div className="lel">
                <GruposCard3 estudiantes={estudiantesSinGrupo} agregar={agregarEstudiante} />
            </div>
            <div className="conio">
                <Button2 Boton2="Guardar Cambios" color="rgb(15, 65, 118)" fontColor="white" onClick={() =>navigate(-1)} />
            </div>
        </div>
    );
}

Grupos.propTypes = {
    materia: PropTypes.string.isRequired
};

export default Grupos;


