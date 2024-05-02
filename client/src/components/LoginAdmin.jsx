import Field from "./Utilities/Field";
import Button from "./Utilities/Button";
import TypeWriter from "./Utilities/TypeWriter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import "./LoginAdmin.css";

function LoginAdmin () {

    const navigate = useNavigate();

    const VolverClick = () => {
        navigate("/Login");
    };


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
                      <h1>Administrador</h1>
                    </div>
                  <form
                    className="FormularioAdmin"
                  >
                    <br />
                    <Field
                      onChange={"#"}
                      value={""}
                      Campo="Codigo"
                      Tipo="text"
                    />
                    <Field
                      onChange={"#"}
                      value={""}
                      Campo="Contraseña"
                      Tipo="password"
                    />
                    <a href="/">Olvido su contrasena?</a>
                    <Button
                      onClick={"#"}
                      LineaBoton={true}
                      Boton="Iniciar sesión"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default LoginAdmin;