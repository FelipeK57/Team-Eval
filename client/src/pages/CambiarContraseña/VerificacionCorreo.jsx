import TypeWriter from "../../components/Utilities/TypeWriter.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "../../components/Utilities/Button";
import { useNavigate } from "react-router-dom";
import "./VerificacionCorreo.css";
import { useState } from "react";
import PopUp from "../../components/Utilities/PopUp.jsx";
import axios from 'axios';

function VerificacionCorreo() {

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            await axios.post('http://localhost:8000/reset_password/', {
                email: email
            });
            
           
        } catch (error) {
            console.error(error);
            alert('Ha ocurrido un error.');
            console.log(error);
        }
    };


    const navigate = useNavigate();

    const VolverClick = () => {
        navigate(-1);
    };

    const [open, setOpen] = useState(false);

    const popup = (e) => {
        e.preventDefault();
        setOpen(!open);
    };

    const handleClick = async (e) => {  
        e.preventDefault();
        await handleSubmit(e);  // Asegúrate de esperar a que el submit se complete
        popup();  // Luego activa el popup
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
                            <form onSubmit={handleSubmit}
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
                                    OnClick={handleClick}
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
                Advice={"Esta seguro que digito el correo correctamente?"}
                Width={"65%"}
                Button1="Aceptar"
                Button2="Cancelar"
            />
        </div>
    );
}
export default VerificacionCorreo;