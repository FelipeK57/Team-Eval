import "./Button2.css"
import PropTypes from "prop-types"
function Button2(props) {

    Button2.propTypes = {
        LineaBoton: PropTypes.bool.isRequired,
        Boton2: PropTypes.string.isRequired
    }

    return (
        <div className="Boton2">
            {props.LineaBoton2 ? <hr /> : null}
            <button style={{backgroundColor: props.color, color: props.fontColor}}>{props.Boton2}</button>
        </div>
    )
}

export default Button2