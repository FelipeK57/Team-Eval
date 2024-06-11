import "./CursoP.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PropTypes from "prop-types";
import CursosProfeComponent from "../../components/CursosProfeComponent.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function CursosProfe(props) {

    CursosProfe.propTypes = {
        nombreProfe: PropTypes.string
    }

    const [cursos, setCursos] = useState([]);   
    const [profesor, setProfesor] = useState(null);

    useEffect(() => {
        const fetchRubrica = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/cursosProfesor/", 
                    { identificacion: Cookies.get("identificacion") }
                );
                setProfesor(response.data.profesor);
                setCursos(response.data.cursos);
            } catch (error) {
                console.error("Error al obtener los cursos  ", error);
            }
        };
        fetchRubrica();
    }, []);

    const navigate = useNavigate();

    const Rubricas = () => {
        navigate("/Rubricas");
    }

    const NuevaRubrica = () => {
        navigate("/NuevaRubrica");
    }


    const GestionarEva = (cursoId, nombre) => {
        navigate(`/GestionarEva/${cursoId}`, { state: { materia: nombre } });
    }

    const estudiantes = (cursoId) => {
        navigate(`/EstudiantesCursoProfe/${cursoId}`);
    }

    return (
        <div className="CursosProfe">
            <NavbarProfesor />
            <div className="cursed"><h1>Editar Rubricas <br />Predeterminadas</h1></div>
            <div className="cardex">
                <button onClick={Rubricas}>
                    <EditNoteIcon sx={{ fontSize: 50 }} />
                </button>
            </div>
            <div className="linea-vertical"></div>
            <div className="cursed2"><h1>Crear Rubrica</h1></div>
            <div className="cardex2">
                <button onClick={NuevaRubrica}>
                    <AddIcon sx={{ fontSize: 50 }} />
                    
                </button>
            </div>
            <div className="linea-horizontal"></div>
            {profesor && (
                <div className="corsel">
                    <h1>Cursos de <b>{profesor.user?.first_name}</b></h1>
                </div>
            )}
            <div className="ListaCursosHomeProfe">
                {cursos.map((curso) => (
                    <CursosProfeComponent
                        key={curso.id}
                        Estado={curso.estado}
                        nombreCurso={curso.nombre}
                        configurarCursos={() => GestionarEva(curso.id, curso.nombre)}
                        onClick= {() => estudiantes(curso.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CursosProfe;


