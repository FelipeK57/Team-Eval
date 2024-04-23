import "./Log-in TE.css"
import Field from "../../components/Utilities/Field.jsx"
import Button from "../../components/Utilities/Button.jsx"
import { useState } from "react";
import TypeWriter from "../../components/Utilities/TypeWriter.jsx";

function LogInTE() {

    const [activeButton, setActiveButton] = useState("Estudiante");

    return (
        <div className="MainContainer">
            <div className="Container">
                <div className="TextContainer">
                    <TypeWriter text='TeamEval' letterColor='rgb(15, 65, 118)' letterToChange1='T' letterToChange2='E' fontSize="3rem"/>
                    <h2 className="Text">¡Bienvenido a TeamEval, haz que cada evaluación cuente en tu viaje educativo!</h2>
                </div>
                <div className="CardContainer">
                    <div className="CardSwitcher">
                        <button className={`Left${activeButton === "Estudiante" ? " active" : ""}`}
                            onClick={() => setActiveButton("Estudiante")}
                            style={activeButton === "Estudiante" ? { pointerEvents: "none" } : { pointerEvents: "auto" }}>
                            Estudiante
                        </button>
                        <button className={`Right${activeButton === "Profesor" ? " active" : ""}`}
                            onClick={() => setActiveButton("Profesor")}
                            style={activeButton === "Profesor" ? { pointerEvents: "none" } : { pointerEvents: "auto" }}>
                            Profesor
                        </button>
                    </div>
                    <div className="Card">
                        <div className={`In Estudiante${activeButton === "Estudiante" ? " ActiveCard" : " NotActive"}`} >
                            <form className="Formulario"><br />
                                <Field Campo="Codigo" Tipo="Number" />
                                <Field Campo="Contrasena" Tipo="password" />
                                <a href="/">Olvido su contrasena?</a>
                                <Button LineaBoton={true} Boton="Iniciar sesión" />
                                <a className="Admin" href="#">Administrador</a>
                            </form>
                        </div>
                        <div className={`In Profesor${activeButton === "Profesor" ? " ActiveCard" : " NotActive"}`}>
                            <form className="Formulario"><br />
                                <Field Campo="Identificacion" Tipo="Number" />
                                <Field Campo="Contrasena" Tipo="password" />
                                <a>Olvido su contrasena?</a>
                                <Button LineaBoton={true} Boton="Iniciar sesión" />
                                <a className="Admin" href="/">Administrador</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInTE;