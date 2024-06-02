import "./Button2.css"
import PropTypes from "prop-types"
function Button2(props) {

    Button2.propTypes = {
        Boton2: PropTypes.string.isRequired
    }

    return (
        <div className="Boton2">
            <button style={{backgroundColor: props.color, color: props.fontColor, width: props.width, height: props.altura ? props.altura : "50px", fontSize: props.tamañoLetra ? props.tamañoLetra : "1.4rem" }}>{props.Boton2}</button>
        </div>
    )
}

export default Button2