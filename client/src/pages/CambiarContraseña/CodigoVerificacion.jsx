import Button from "../../components/Utilities/Button";
import TypeWriter from "../../components/Utilities/TypeWriter";
import "./CodigoVerificacion.css";

function CodigoVerificacion() {

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
                                <h1>Codigo de verificacion</h1>
                            </div>
                            <form
                                className="FormularioVerificacion"
                            >
                                <br />
                                <h2>Se ha enviado un codigo de verificacion al correo que ingreso anteriormente por favor digitelo a continuacion</h2>
                                <div className="CamposVerificacion">
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <hr className="MidLine" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
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
export default CodigoVerificacion;