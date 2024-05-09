import "./ButtonCancel.css";
import PropTypes from "prop-types";
function ButtonCancel(props) {
  ButtonCancel.propTypes = {
    LineaBoton: PropTypes.bool.isRequired,
    Boton: PropTypes.string.isRequired,
    fontColor: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
  };

  return (
    <div className="BotonCancel">
      {props.LineaBoton ? <hr /> : null}
      <button
        onClick={props.onClick}
        style={{
          backgroundColor: props.color,
          color: props.fontColor,
        }}
      >
        {props.Boton}
      </button>
    </div>
  );
}

export default ButtonCancel;