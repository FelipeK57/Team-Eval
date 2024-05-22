import "./Button2.css"
import PropTypes from "prop-types"
function Button2(props) {

    Button2.propTypes = {
<<<<<<< HEAD
        LineaBoton2: PropTypes.bool.isRequired,
=======
>>>>>>> origin/Home2
        Boton2: PropTypes.string.isRequired
    }

    return (
        <div className="Boton2">
            <button style={{backgroundColor: props.color, color: props.fontColor, width: props.width}}>{props.Boton2}</button>
        </div>
    )
}

export default Button2