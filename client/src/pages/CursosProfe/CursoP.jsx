import "./CursoP.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Button2 from "../../components/Utilities/Button2";
import SettingsIcon from '@mui/icons-material/Settings';

function CursosProfe() {

    return (
        <div className="CursosProfe">
            <NavbarProfesor />
            <div className="cursed"><h1>Editar Rubricas <br />Predeterminadas</h1></div>
            <div className="cardex">
                <button>
                    <SettingsIcon />
                </button>
            </div>
            <div className="linea-vertical"></div>
            <div className="cursed2"><h1>Crear Rubrica</h1></div>
            <div className="cardex2"></div>
            <div className="linea-horizontal"></div>
            <div className="corsel"><h1>Cursos de <b>Ejemplo</b></h1></div>
            <div className="cardex3">
            <div className="cardex32"><h1>Ejemplo <br />Completado</h1></div>  
            <div className="line-horizonte"></div>
            </div>
            <div className="cardex4">
            <div className="cardex42"><h1>Ejemplo por <br />Completar</h1></div>  
            <div className="line-horizonte"></div>
            </div>
        </div>
    )
}

export default CursosProfe