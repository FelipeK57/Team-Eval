import "./Login.css";
import Field from "./Utilities/Field.jsx";
import Button from "./Utilities/Button.jsx";
import { useState } from "react";
import TypeWriter from "./Utilities/TypeWriter.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

function Login() {
  const [activeButton, setActiveButton] = useState("Estudiante");
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

  return (
    <div className="MainContainer">
      <div className="Container">
        <div className="Back">
          <button className="BackButton"><ArrowBackIcon /></button>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
