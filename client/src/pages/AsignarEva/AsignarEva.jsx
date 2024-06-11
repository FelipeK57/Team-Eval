import "./AsignarEva.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Teams from "../../components/Teams";
import Button2 from "../../components/Utilities/Button2";
import DropDown from "../../components/DropDown";
import PropTypes from "prop-types";

function AsignarEva(props) {

    AsignarEva.propTypes = {
        eva: PropTypes.string.isRequired,
        combi: PropTypes.string.isRequired
    }

    return (
        <div className="AsignarEva">
            <div className="michi">
                <NavbarProfesor />
            </div>
            <div className="titus">
                <div className="tienda"><h1>Elija la rubrica de evaluación</h1></div>
                <div className="pichin"><h1>Editar evaluación <br /><b>{props.eva}</b></h1></div>
            </div>
            <div className="desple"><DropDown /></div>
            <div className="titu"><h1>Grupos que van a ser evaluados</h1></div>
            <div className="tables">
                <div className="table-izq">
                    <Teams />
                </div>
                <div className="gorila">
                    <div className="god">
                        <h1>Integrantes</h1>
                    </div>
                    <div className="zilla">
                        <h1>{props.combi}</h1>
                    </div>
                </div>
            </div>
            <div className="bbu">
                <Button2 Boton2="Guardar Cambios" color="rgb(15, 65, 118)" fontColor="white" width="250px" />
            </div>
        </div>
    );
}

export default AsignarEva;