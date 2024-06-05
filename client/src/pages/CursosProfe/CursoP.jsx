import "./CursoP.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect, useState } from "react";  
import axios from "axios";
import Cookies from "js-cookie";

function CursosProfe() {
    const [profesor, setProfesor] = useState({});
    const [cursos, setCursos] = useState([]);

    const navigate = useNavigate();

    const Rubricas = () => {
        navigate("/Rubricas");
    }

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
                console.error("Error al obtener la rubrica", error);
            }
        };
        fetchRubrica();
    }, []);

    const ConfigCursos = () => {
        navigate("/Grupos");
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
                <button>
                    <AddIcon sx={{ fontSize: 50 }} />
                </button>
            </div>
            <div className="linea-horizontal"></div>
            {profesor.user && (
                <div className="corsel">
                    <h1>Cursos de <b>{profesor.user.first_name}</b></h1>
                </div>
            )}
            <div className="cardex3">
                <div className="cardex32">
                    <h1>Ejemplo <br />Completado</h1>
                    <button>
                        <GroupsIcon sx={{ fontSize: 43 }} />
                    </button>
                </div>
                <div className="line-horizonte"></div>
            </div>
            <div className="cardex4">
                {cursos.map((curso) => (
                    <div key={curso.id} className="cardex42">
                        <h1>{curso.nombre}</h1>
                        <p>Código: {curso.codigo}</p>
                        <p>Periodo Académico: {curso.periodoAcademico}</p>
                        <button className="button1" onClick={ConfigCursos}>
                            <SettingsIcon sx={{ fontSize: 43 }} />
                        </button>
                        <button className="button2">
                            <GroupsIcon sx={{ fontSize: 43 }} />
                        </button>
                    </div>
                ))}
                <div className="line-horizonte"></div>
            </div>
            </div>
        
    );
}

export default CursosProfe;

