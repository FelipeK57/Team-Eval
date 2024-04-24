import "./Login.css";
import Field from "./Utilities/Field.jsx";
import Button from "./Utilities/Button.jsx";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import TypeWriter from "./Utilities/TypeWriter.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Login() {
  const navigate = useNavigate(); 
  const [activeButton, setActiveButton] = useState("Estudiante");
  const [codigo, setCodigo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleCodigoChange = (e) => {
    setCodigo(e.target.value);
  };

  const handleContraseñaChange = (e) => {
    setContraseña(e.target.value);
  };

  const handleClick = (e) => {
    console.log(e)
  };

  const volverClick = (e) => {
    navigate('/')
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
              className={`Left${
                activeButton === "Estudiante" ? " active" : ""
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
                className={`Formulario${
                  activeButton === "Estudiante" ? " ActiveCard" : " NotActive"
                }`}
              >
                <br />
                <Field
                  onChange={handleCodigoChange}
                  value={codigo}
                  Campo="Codigo"
                  Tipo="Number"
                />
                <Field
                  onChange={handleContraseñaChange}
                  value={contraseña}
                  Campo="Contrasena"
                  Tipo="password"
                />
                <a href="/">Olvido su contrasena?</a>
                <Button
                  onClick={handleClick}
                  LineaBoton={true}
                  Boton="Iniciar sesión"
                />
                <a className="Admin" href="/">
                  Administrador
                </a>
              </form>
            </div>
            <div className={`In Profesor`}>
              <form
                className={`Formulario${
                  activeButton === "Profesor" ? " ActiveCard" : " NotActive"
                }`}
              >
                <br />
                <Field Campo="Identificacion" Tipo="Number" />
                <Field Campo="Contrasena" Tipo="password" />
                <a href="/">Olvido su contrasena?</a>
                <Button LineaBoton={true} Boton="Iniciar sesión" />
                <a className="Admin" href="/">
                  Administrador
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
