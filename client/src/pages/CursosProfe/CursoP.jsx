import "./CursoP.css";
import NavbarProfesor from "../../components/NavbarProfesor";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function CursosProfe() {
  return (
    <div className="CursosProfe">
      <NavbarProfesor />
      <div className="cursed">
        <h1>
          Editar Rubricas <br />
          Predeterminadas
        </h1>
      </div>
      <div className="cardex">
        <div className="cadex-conf">
          <Link to="/">
            <img
              style={{ width: "48px", height: "48px" }}
              src="../../../public/settings.png"
            ></img>
          </Link>
=======

import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';

function CursosProfe() {

    return (
        <div className="CursosProfe">
            <NavbarProfesor />
            <div className="cursed"><h1>Editar Rubricas <br />Predeterminadas</h1></div>
            <div className="cardex">
                <button>
                    <SettingsIcon sx={{ fontSize: 50 }} />
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
                    <button className="button1">
                        <SettingsIcon sx={{ fontSize: 43 }} />
                    </button>
                    <button className="button2">
                        <GroupsIcon sx={{ fontSize: 43 }} />
                    </button>
                </div>
                <div className="line-horizonte"></div>
            </div>
>>>>>>> origin/Cursos_profesor
        </div>
      </div>
      <div className="linea-vertical"></div>
      <div className="cursed2">
        <h1>Crear Rubrica</h1>
      </div>
      <div className="cardex2">
        <div className="cadex-conf">
          <Link to="/">
            <img
              style={{ width: "48px", height: "48px" }}
              src="../../../public/plus.png"
            ></img>
          </Link>
        </div>
      </div>
      <div className="linea-horizontal"></div>
      <div className="corsel">
        <h1>
          Cursos de <b>{Cookies.get("nombre")}</b>
        </h1>
      </div>
      <div className="cardex3">
        <div className="cardex32">
          <h1>
            Ejemplo <br />
            Completado
          </h1>
        </div>
        <div className="line-horizonte"></div>
      </div>
      <div className="cardex4">
        <div className="cardex42">
          <h1>
            Ejemplo por <br />
            Completar
          </h1>
        </div>
        <div className="line-horizonte"></div>
      </div>
    </div>
  );
}

export default CursosProfe;
