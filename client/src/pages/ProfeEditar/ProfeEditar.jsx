import "./ProfeEditar.css";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import Button2 from "../../components/Utilities/Button2";
import PropTypes from "prop-types";

function ProfeEditar(props) {

    ProfeEditar.propTypes = {
        profesor: PropTypes.string.isRequired
    }

    return (
        <div className="ProfeEditar">
            <NoQuieroCrearMasNavbars />
            <form>
            <div className="panel">
            <div className="yamba"><h1>{props.profesor}</h1></div>
            <div className="yemba"><h1>Nombre:</h1></div>
            <input type="text" className="label" required />
            <div className="yimba"><h1>Documento:</h1></div>
            <input type="number" className="label1" required />
            <div className="yomba"><h1>Correo:</h1></div>
            <input type="email" className="label2" required/>
            </div>
            <div className="yumba">
                <Button2 Boton2="Guardar" color="rgb(15, 65, 118)" fontColor="white" width="250px"/>
            </div>
            </form>
            </div>
    )
}

export default ProfeEditar;