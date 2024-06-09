import "./GestionarEva.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Trajet from "../../components/Trajet";
import Tarjet2 from "../../components/Tarjet2";
import PropTypes from "prop-types";
import GroupIcon from '@mui/icons-material/Group';

function GestionarEva(props) {

    GestionarEva.propTypes = {
        ir: PropTypes.func.isRequired
    }

    return (
        <div className="tinder">
            <NavbarProfesor />
            <div className="tonder"><h1>Gestionar Evaluaciones</h1></div>
            <div className="tinder1">
                <Tarjet2 />
                <Trajet Evalu="Insertar Evaluación" />

            
            </div>
            <div className="m"><h1>Gestionar Grupos</h1></div>
            <div className="merlina">
                <div className="blinblin" onClick={props.ir}>
                    <GroupIcon sx={{ fontSize: 80 }} />
                </div>
            </div>
        </div>

    )
}

export default GestionarEva