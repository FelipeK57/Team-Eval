import "./Login.css";
import Field from "./Utilities/Field.jsx";
import Button from "./Utilities/Button.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TypeWriter from "./Utilities/TypeWriter.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Estudiante");
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [identificacion, setIdentificacion] = useState("");

  const handleCodigoChange = (e) => {
    setCodigo(e.target.value);
  };

  const handleContraseñaChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        codigo: codigo,
        password: password,
      });
      Cookies.set("token", response.data.token, { expires: 1 }); // Guarda el token en una cookie que expira en 7 días
      Cookies.set("loggedIn", "true", { expires: 7 }); // Indica que el usuario ha iniciado sesión
      Cookies.set("codigo", response.data.userId);
      navigate("/StudentHome");
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const volverClick = () => {
    navigate("/");
  };

  const handleIdentificacionChange = (e) => {
    setIdentificacion(e.target.value);
  };

  const handleClick2 = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:8000/loginProfesor/",
        {
          identificacion: identificacion,
          password: password,
        }
      );
      Cookies.set("token", response.data.token, { expires: 1 }); // Guarda el token en una cookie que expira en 1 dia
      Cookies.set("loggedIn", "true", { expires: 1 }); // Indica que el usuario ha iniciado sesión
      Cookies.set("identificacion", response.data.userId);
      navigate("/ProfesorHome");
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div className="MainContainer">
      <div className="Container">
        <div className="Back">
          <button onClick={volverClick} className="BackButton">
            <ArrowBackIcon sx={{ color: "#0f4175", fontSize: "3rem" }} />
          </button>
        </div>
        <div className="TextContainer">
          <TypeWriter
            text="TeamEval"
            letterColor="rgb(15, 65, 118)"
            letterToChange1="T"
            letterToChange2="E"
            fontSize="3rem"
          />
          <h2 className="Text">
            ¡Bienvenido a TeamEval, haz que cada evaluación cuente en tu viaje
            educativo!
          </h2>
        </div>
        <div className="CardContainer">
          <div className="CardSwitcher">
            <button
              className={`Left${activeButton === "Estudiante" ? " active" : ""
                }`}
              onClick={() => setActiveButton("Estudiante")}
              style={
                activeButton === "Estudiante"
                  ? { pointerEvents: "none" }
                  : { pointerEvents: "auto" }
              }
            >
              Estudiante
            </button>
            <button
              className={`Right${activeButton === "Profesor" ? " active" : ""}`}
              onClick={() => setActiveButton("Profesor")}
              style={
                activeButton === "Profesor"
                  ? { pointerEvents: "none" }
                  : { pointerEvents: "auto" }
              }
            >
              Profesor
            </button>
          </div>

          <div className="Card">
            <div className={`In Estudiante`}>
              <form
                className={`Formulario${activeButton === "Estudiante" ? " ActiveCard" : " NotActive"
                  }`}
              >
                <br />
                <Field
                  onChange={handleCodigoChange}
                  value={codigo}
                  Campo="Codigo"
                  Tipo="text"
                />
                <Field
                  onChange={handleContraseñaChange}
                  value={password}
                  Campo="Contraseña"
                  Tipo="password"
                />
                <Link to={"/VerificacionCorreo"}>Olvido su contrasena?</Link>
                <Button
                  onClick={handleClick}
                  LineaBoton={true}
                  Boton="Iniciar sesión"
                />
                <div className="AdminContainer">
                  <Link className="Admin" to={"/LoginAdmin"}>
                    Administrador
                  </Link>
                </div>
              </form>
            </div>
            <div className={`In Profesor`}>
              <form
                className={`Formulario${activeButton === "Profesor" ? " ActiveCard" : " NotActive"
                  }`}
              >
                <br />
                <Field
                  Campo="Identificacion"
                  Tipo="Number"
                  onChange={handleIdentificacionChange}
                  value={identificacion}
                />
                <Field
                  Campo="Contrasena"
                  Tipo="password"
                  onChange={handleContraseñaChange}
                  value={password}
                />
                <Link to={"/VerificacionCorreo"}>Olvido su contrasena?</Link>
                <Button
                  LineaBoton={true}
                  Boton="Iniciar sesión"
                  onClick={handleClick2}
                />
                <div className="AdminContainer">
                  <Link className="Admin" to={"/LoginAdmin"}>
                    Administrador
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
