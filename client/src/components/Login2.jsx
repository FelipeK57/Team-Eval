import Field from "./Utilities/Field";
import Button from "./Utilities/Button";
import TypeWriter from "./Utilities/TypeWriter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Login2.css";

function Login2 (props) {

    const navigate = useNavigate();

    const VolverClick = () => {
        navigate(`/${props.NavigateRoute}`);
    };

    Login2.propsTypes = {
      Title: PropTypes.string.isRequired,
      Type1: PropTypes.string.isRequired,
      Type2: PropTypes.string.isRequired,
      Field1: PropTypes.string.isRequired,
      Field2: PropTypes.string.isRequired,
      Button: PropTypes.string.isRequired,
      ForgotPassword: PropTypes.bool.isRequired,
      NavigateRoute: PropTypes.string.isRequired
    }

    return (
        <div className="MainContainerAdmin">
          <div className="ContainerAdmin">
            <div className="BackAdmin">
              <button onClick={VolverClick} className="BackButtonAdmin">
                <ArrowBackIcon sx={{ color: "#0f4175", fontSize: "3rem" }} />
              </button>
            </div>
            <div className="TextContainerAdmin">
              <TypeWriter
                text="TeamEval"
                letterColor="rgb(15, 65, 118)"
                letterToChange1="T"
                letterToChange2="E"
                fontSize="3rem"
              />
              <h2 className="TextAdmin">
                ¡Bienvenido a TeamEval, haz que cada evaluación cuente en tu viaje
                educativo!
              </h2>
            </div>
            <div className="CardContainerAdmin">
              <div className="CardAdmin">
                <div className={`InAdmin EstudianteAdmin`}>
                    <div className="TitleAdmin">
                      <h1>{`${props.Title}`}</h1>
                    </div>
                  <form
                    className="FormularioAdmin"
                  >
                    <br />
                    <Field
                      onChange={"#"}
                      Campo={`${props.Field1}`}
                      Tipo={`${props.Type1}`}
                    />
                    <Field
                      onChange={"#"}
                      Campo={`${props.Field2}`}
                      Tipo={`${props.Type2}`}
                    />
                    {props.ForgotPassword ? <Link to={"/"}>Olvido su contrasena?</Link>: null}
                    <Button
                      onClick={"#"}
                      LineaBoton={true}
                      Boton={`${props.Button}`}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Login2;