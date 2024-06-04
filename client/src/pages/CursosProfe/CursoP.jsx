import "./CursoP.css";
import NavbarProfesor from "../../components/NavbarProfesor";

import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';

function CursosProfe() {

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
            <div className="corsel"><h1>Cursos de <b>Ejemplo</b></h1></div>
            <div className="cardex3">
                <div className="cardex32"><h1>Ejemplo <br />Completado</h1>
                    <button>
                        <GroupsIcon sx={{ fontSize: 43 }} />
                    </button>
                </div>
                <div className="line-horizonte"></div>
            </div>
            <div className="cardex4">
                <div className="cardex42"><h1>Ejemplo por <br />Completar</h1>
                    <button className="button1" onClick={ConfigCursos} >
                        <SettingsIcon sx={{ fontSize: 43 }} />
                    </button>
                    <button className="button2" >
                        <GroupsIcon sx={{ fontSize: 43 }} />
                    </button>
                </div>
                <div className="line-horizonte"></div>
            </div>
        </div>
      
  );
}

export default CursosProfe;
