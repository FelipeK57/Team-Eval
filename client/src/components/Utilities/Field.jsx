import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from "prop-types";
import "./Field.css"

function Field(props) {

    const [showPasswordC1, setShowPasswordC1] = useState(false);

    const verContrasenaC1 = () => {
        setShowPasswordC1(!showPasswordC1);
      };

    Field.propTypes = {
        Campo: PropTypes.string,
        Tipo: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        value: PropTypes.string,
        Style: PropTypes.object,
        CampoColor: PropTypes.string
    };

    return(
        <div className="InputContenedor">
                  <input style={props.Style ? props.Style : null} onChange={props.onChange} value={props.value} type={props.Tipo === "password" ? `${showPasswordC1 ? "text" : "password"}` : `${props.Tipo}`} name="username" required autoComplete="off" inputMode={props.Tipo === "Number" ? `numeric` : null}/>
                  <label htmlFor="username" style={{color: props.CampoColor}}>{props.Campo}</label>
                  {props.Tipo === "password" ? <button className="btn" type="button" onClick={verContrasenaC1}>
                    {showPasswordC1 ? <VisibilityOff /> : <Visibility />}</button> : null}
        </div>
    )
}

export default Field;