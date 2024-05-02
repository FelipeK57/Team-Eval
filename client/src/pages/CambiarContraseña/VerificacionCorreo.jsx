import TypeWriter from "../../components/Utilities/TypeWriter.jsx";
import Button from "../../components/Utilities/Button";
import "./VerificacionCorreo.css";

function VerificacionCorreo() {
    return (
        <div className="MainContainerVerificacion">
            <div className="ContainerVerificacion">
                <div className="TextContainerVerificacion">
                    <TypeWriter
                        text="TeamEval"
                        letterColor="rgb(15, 65, 118)"
                        letterToChange1="T"
                        letterToChange2="E"
                        fontSize="3rem"
                    />
                    <h2 className="TextVerificacion">
                        ¡Bienvenido a TeamEval, haz que cada evaluación cuente en tu viaje
                        educativo!
                    </h2>
                </div>
                <div className="CardContainerVerificacion">
                    <div className="CardVerificacion">
                        <div className={`InVerificacion EstudianteVerificacion`}>
                            <div className="TitleVerificacion">
                                <h1>Verificacion de correo</h1>
                            </div>
                            <form
                                className="FormularioVerificacion"
                            >
                                <br />
                                <h2>Ingrese el correo al cual pertenece la contraseña que desea actualizar</h2>
                                <div className="CampoVerificacion">
                                    <input type="mail" />
                                </div>
                                <Button
                                    onClick={"#"}
                                    LineaBoton={true}
                                    Boton={"Hecho"}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default VerificacionCorreo;