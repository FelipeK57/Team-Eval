import "./Utilities/Tarjet.css";
import PropTypes from "prop-types";
import Button2 from "./Utilities/Button2";


function Trajet(props) {

  
    Trajet.propTypes = {
        Evalu: PropTypes.string.isRequired
    }
    return (
        <div className="Tarjet">
            <div className="torero"><h1>{props.Evalu}</h1></div> 
            <div className="tilin">
                <Button2 Boton2="Ir" color="white" fontColor="black" width="150px" onClick={props.onClick}/>
            </div>
        </div>
    )
}

export default Trajet