import "./Button.css";
import PropTypes from "prop-types";
function Button(props) {
  Button.propTypes = {
    LineaBoton: PropTypes.bool.isRequired,
    Boton: PropTypes.string.isRequired,
    fontColor: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
  };

  return (
    <div className="Boton">
      {props.LineaBoton ? <hr /> : null}
      <button
        onClick={props.onClick}style={{backgroundColor: `${props.color ? props.color : "white" }`, color: `${props.fontColor? props.fontColor : "black"}`}}
      >
        {props.Boton} {props.icon ? props.icon : null}
      </button>
    </div>
  );
}

export default Button;
