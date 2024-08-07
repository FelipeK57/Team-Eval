import Button2 from "../../components/Utilities/Button";
import TypeWriter from "../../components/Utilities/TypeWriter";
import "./CodigoVerificacion.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CodigoVerificacion() {

    const navigate = useNavigate();
    const [numero1, setNumero1] = useState("");
    const [numero2, setNumero2] = useState("");
    const [numero3, setNumero3] = useState("");
    const [numero4, setNumero4] = useState("");
    const [numero5, setNumero5] = useState("");
    const [numero6, setNumero6] = useState("");


    const handleClick = async (e) => {
        e.preventDefault();

        const code = numero1 + numero2 + numero3 + numero4 + numero5 + numero6;

        try {
            const response = await axios.post('http://localhost:8000/reset_passwordConfirm/', {
                token: Cookies.get("sessionid"),
                code: code
            });
            navigate("/CambioContraAdmin");

        } catch (error) {
            console.log(error);
            alert("El Codigo de verificacion es incorrecto");
        }
    };

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
                                    <input
                                        id="input1"
                                        type="Number"
                                        maxLength="1"
                                        onChange={(e) => {
                                            if (!/^\d$/.test(e.target.value)) {
                                                e.target.value = "";
                                            } else {
                                                setNumero1(e.target.value);
                                                if (e.target.value.length === 1) {
                                                    document.getElementById("input2").focus();
                                                }
                                            }
                                        }}
                                    />
                                    <input
                                        id="input2"
                                        type="Number"
                                        maxLength="1"
                                        onChange={(e) => {
                                            if (!/^\d$/.test(e.target.value)) {
                                                e.target.value = "";
                                            } else {
                                                setNumero2(e.target.value);
                                                if (e.target.value.length === 1) {
                                                    document.getElementById("input3").focus();
                                                }
                                            }
                                        }}
                                    />
                                    <input
                                        id="input3"
                                        type="Number"
                                        maxLength="1"
                                        onChange={(e) => {
                                            if (!/^\d$/.test(e.target.value)) {
                                                e.target.value = "";
                                            } else {
                                                setNumero3(e.target.value);
                                                if (e.target.value.length === 1) {
                                                    document.getElementById("input4").focus();
                                                }
                                            }
                                        }}
                                    />
                                    <hr className="MidLine" />
                                    <input
                                        id="input4"
                                        type="Number"
                                        maxLength="1"
                                        onChange={(e) => {
                                            if (!/^\d$/.test(e.target.value)) {
                                                e.target.value = "";
                                            } else {
                                                setNumero4(e.target.value);
                                                if (e.target.value.length === 1) {
                                                    document.getElementById("input5").focus();
                                                }
                                            }
                                        }}
                                    />
                                    <input
                                        id="input5"
                                        type="Number"
                                        maxLength="1"
                                        onChange={(e) => {
                                            if (!/^\d$/.test(e.target.value)) {
                                                e.target.value = "";
                                            } else {
                                                setNumero5(e.target.value);
                                                if (e.target.value.length === 1) {
                                                    document.getElementById("input6").focus();
                                                }
                                            }
                                        }}
                                    />
                                    <input
                                        id="input6"
                                        type="Number"
                                        maxLength="1"
                                        onChange={(e) => {
                                            if (!/^\d$/.test(e.target.value)) {
                                                e.target.value = "";
                                            } else {
                                                setNumero6(e.target.value);
                                            }
                                        }}
                                    />
                                </div>
                                <Button2
                                    onClick={handleClick}
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