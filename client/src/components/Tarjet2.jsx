import "./Utilities/Tarjet2.css";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PropTypes from "prop-types";


function Tarjet2(props) {

    Tarjet2.propTypes = {
        agregar: PropTypes.func.isRequired
    }

    return (
        <div className="Tarjet2">
            <div className="nose"><h1>Crear Evaluación</h1></div>
            <button className="illo" onClick={props.agregar}>
                <AddCircleIcon sx={{ fontSize: 60 }} />
            </button>
        </div>
    )
}


export default Tarjet2