import { useNavigate } from "react-router-dom";
import TypeWriter from "./Utilities/TypeWriter";
import Button from "./Utilities/Button";
import PropTypes from "prop-types";

import "./Aviso.css";

function Aviso(props) {

  const navigate = useNavigate();

  const ButtonClick = () => {
    navigate(`/${props.NavigateRoute}`);
  };

  Aviso.propTypes = {
    Title: PropTypes.string.isRequired,
    Text: PropTypes.string.isRequired,
    Button: PropTypes.string.isRequired,
    NavigateRoute: PropTypes.string.isRequired,
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
                      onClick={ButtonClick}
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