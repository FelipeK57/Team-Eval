import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TypeWriter from "./Utilities/TypeWriter";
import Field from "./Utilities/Field";
import Button from "./Utilities/Button";

import "./Aviso.css";

function Aviso(props) {

    const navigate = useNavigate();

    const VolverClick = () => {
        navigate(`/${props.NavigateRoute}`);
    };

    return (
        <div className="MainContainerAviso">
          <div className="ContainerAviso">
            <div className="TextContainerAviso">
              <TypeWriter
                text="TeamEval"
                letterColor="rgb(15, 65, 118)"
                letterToChange1="T"
                letterToChange2="E"
                fontSize="3rem"
              />
              <h2 className="TextAviso">
                ¡Bienvenido a TeamEval, haz que cada evaluación cuente en tu viaje
                educativo!
              </h2>
            </div>
            <div className="CardContainerAviso">
              <div className="CardAviso">
                <div className={`InAviso EstudianteAviso`}>
                    <div className="TitleAviso">
                      <h1>{`${props.Title}`}</h1>
                    </div>
                    <div className="notice">
                      <h2>{`${props.Text}`}</h2>
                    </div>
                    <div>
                    <Button
                      onClick={"#"}
                      LineaBoton={false}
                      Boton={`${props.Button}`}
                    />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
export default Aviso