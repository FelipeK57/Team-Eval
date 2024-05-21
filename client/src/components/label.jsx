import "./Utilities/label.css";
import PropTypes from "prop-types";
import ReplayIcon from '@mui/icons-material/Replay';


function Label(props) {

    Label.propTypes = {
        Nombre: PropTypes.string.isRequired,
        Correo: PropTypes.string.isRequired,
        restaurar: PropTypes.func.isRequired
    }

    return (
        <div className="Label">
            <div className="panal">
                <div className="label-left">
                    <div className="cosito"><h1>{props.Nombre}</h1></div>
                    <div className="cosito2"><h1>{props.Codigo}</h1></div>
                </div>
                <div className="label-right">
                    <button className="boton-label" onClick={props.restaurar}>
                        <ReplayIcon sx={{ fontSize: 36 }}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Label;