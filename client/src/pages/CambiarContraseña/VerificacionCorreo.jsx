import TypeWriter from "../../components/Utilities/TypeWriter.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "../../components/Utilities/Button";
import { useNavigate } from "react-router-dom";
import "./VerificacionCorreo.css";
import { useState } from "react";
import PopUp from "../../components/Utilities/PopUp.jsx";
import axios from 'axios';
import Cookies from "js-cookie";

function VerificacionCorreo() {

    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [open, setOpen] = useState(false);
    


    const navigate = useNavigate();

    const VolverClick = () => {
        navigate(-1);
    };


    const popup = (e) => {
        e.preventDefault();
        setOpen(!open);
    };

    const handleClick = async (e) => {  
        e.preventDefault();

        try {
           const response =  await axios.post('http://localhost:8000/reset_password/', {
                email: email
            });
            setOpen(false);
            navigate('/CodigoVerificacion');
            Cookies.set("user", response.data.user, { expires: 1 });
            Cookies.set("token", response.data.token, { expires: 1 });
        } catch (error) {
            console.error(error);
            setMensaje("El correo no se encuentra registrado");
            setOpen(true); // Muestra el popup con el mensaje de error
            console.log(error);
        }
        
    };

    return (
        <div className="MainContainerVerificacion">
            <div className="ContainerVerificacion">
                <div className="BackAdmin">
                    <button onClick={VolverClick} className="BackButtonAdmin">
                        <ArrowBackIcon sx={{ color: "#0f4175", fontSize: "3rem" }} />
                    </button>
                </div>
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
                            <form onSubmit={popup}
                                className="FormularioVerificacion"
                            >
                                <br />
                                <h2>Ingrese el correo al cual pertenece la contraseña que desea actualizar</h2>
                                <div className="CampoVerificacion">
                                    <input type="mail" 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        value={email}
                                        />
                                </div>
                                <Button
                                    onClick={handleClick}
                                    LineaBoton={true}
                                    Boton={"Hecho"}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <PopUp open={open}
                SetOpen={setOpen}
                Advice={mensaje}
                Width={"65%"}
                Button1="Aceptar"
                onClick1={popup}
                
            />
        </div>
    );
}
export default VerificacionCorreo;