import "./CursoP.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PropTypes from "prop-types";
import CursosProfeComponent from "../../components/CursosProfeComponent.jsx";

function CursosProfe(props) {

    CursosProfe.propTypes = {
        nombreProfe: PropTypes.string
    }

    const navigate = useNavigate();
    const Rubricas = () => {
        navigate("/Rubricas");
    }

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
            <div className="corsel"><h1>Cursos de <b>{props.nombreProfe}</b></h1></div>
            <div className="ListaCursosHomeProfe">
                <CursosProfeComponent Estado={true}
                    nombreCurso="Desarrollo de software 1"
                    configurarCursos={ConfigCursos} />
                <CursosProfeComponent Estado={false}
                    nombreCurso="Simulacion y computacion numerica"
                    configurarCursos={ConfigCursos} />
            </div>
        </div>
    );
}

export default CursosProfe;
