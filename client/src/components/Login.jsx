import "./Login.css";
import Field from "./Utilities/Field.jsx";
import Button from "./Utilities/Button.jsx";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import TypeWriter from "./Utilities/TypeWriter.jsx";
<<<<<<< HEAD
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
=======
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
>>>>>>> eebfe50ff1c4f902daceb1732fa504fa33ec2bb6

function Login() {
  const navigate = useNavigate(); 
  const [activeButton, setActiveButton] = useState("Estudiante");
<<<<<<< HEAD
  const [codigo, setCodigo] = useState("");  // Estado para el código del estudiante
  const [password, setPassword] = useState("");  // Estado para la contraseña
  const [error, setError] = useState("");  // Estado para almacenar errores de autenticación

  // Esta función maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevenir la acción por defecto del formulario

    try {
      // Enviar solicitud POST al endpoint de autenticación
      const response = await axios.post("http://localhost:8000/api/token/", {
        username: codigo,  // Ajusta el campo según tu modelo
        password,
      });

      // Almacenar el token y redirigir al usuario si la autenticación es exitosa
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Redirigir al usuario a la página principal o a donde quieras
      window.location.href = "http://localhost:5173/home";
    } catch (err) {
      // Si hay un error, mostrar un mensaje de error
      setError("Nombre de usuario o contraseña incorrectos");
    }
  };
=======
  const [codigo, setCodigo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleCodigoChange = (e) => {
    setCodigo(e.target.value);
  };

  const handleContraseñaChange = (e) => {
    setContraseña(e.target.value);
  };

  const handleClick = () => {
    if(codigo.length != 0 && contraseña.length){
      navigate("/loginIniciado"); 
    }
    console.log(codigo)
  };

  const volverClick = () => {
    navigate('/')
  };

>>>>>>> eebfe50ff1c4f902daceb1732fa504fa33ec2bb6

  return (
    <div className="MainContainer">
      <div className="Container">
        <div className="Back">
<<<<<<< HEAD
          <button className="BackButton"><ArrowBackIcon /></button>
=======
          <button onClick={volverClick} className="BackButton">
            <ArrowBackIcon sx={{ color: "#0f4175", fontSize: "3rem" }} />
          </button>
>>>>>>> eebfe50ff1c4f902daceb1732fa504fa33ec2bb6
        </div>
        <div className="TextContainer">
          <TypeWriter
            text="TeamEval"
            fontSize="3rem"
          />
          <h2 className="Text">
            ¡Bienvenido a TeamEval!
          </h2>
        </div>
        <div className="CardContainer">
          <div class="CardSwitcher">
            <button
              className={`Left${activeButton === "Estudiante" ? " active" : ""}`}
              onClick={() => setActiveButton("Estudiante")}
            >
              Estudiante
            </button>
            <button
              className={`Right${activeButton === "Profesor" ? " active" : ""}`}
              onClick={() => setActiveButton("Profesor")}
            >
              Profesor
            </button>
          </div>

          <div className="Card">
<<<<<<< HEAD
            <form
              className={`Formulario${activeButton === "Estudiante" ? " ActiveCard" : ""}`}
              onSubmit={handleSubmit}  // Aquí vinculamos el envío del formulario con la función
            >
              <br />
              <Field
                Campo="Código"
                Tipo="Number"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}  // Capturar el valor del código
              />
              <Field
                Campo="Contraseña"
                Tipo="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // Capturar el valor de la contraseña
              />
              <a href="/">¿Olvidó su contraseña?</a>
              <Button
                Boton="Iniciar sesión"
                onClick={handleSubmit}  // Llamar a la función de manejo del formulario
              />
              {error && <p className="error-message">{error}</p>} 
              <a className="Admin" href="/">Administrador</a>
            </form>
=======
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
>>>>>>> eebfe50ff1c4f902daceb1732fa504fa33ec2bb6
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
