import "./Button.css"
import PropTypes from "prop-types"
function Button(props) {

    Button.propTypes = {
        LineaBoton: PropTypes.bool.isRequired,
        Boton: PropTypes.string.isRequired
    }

    return (
        <div className="Boton">
            {props.LineaBoton ? <hr /> : null}
            <button style={{backgroundColor: props.color, color: props.fontColor}}>{props.Boton}</button>
        </div>
    )
}

export default Button