import "./EditarStudent.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Button from "../../components/Utilities/Button";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/Utilities/PopUp";

function EditarStudent(props) {
    const [nombre, setNombre] = useState(Cookies.get("StudentNombre"));
    const [documento, setDocumento] = useState(Cookies.get("StudentCodigo"));
    const [correo, setCorreo] = useState(Cookies.get("StudentEmail"));
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const verificarSesion = () => {
            const user = Cookies.get("user");
            const token = Cookies.get("token");

            if (user && token) {
                console.log("El usuario ha iniciado sesión. username:", user);
            } else {
                console.log("El usuario no ha iniciado sesión.");
                navigate("/login");
            }
        };

        verificarSesion();
    }, [navigate]);

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    const handleCodigoChange = (e) => {
        setDocumento(e.target.value);
    };

    const handleEmailChange = (e) => {
        setCorreo(e.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            
                await axios.post("http://localhost:8000/Editar_estudiantes/", {
                codigo: Cookies.get("StudentCodigo"),
                nombre: nombre,
                newcodigo: documento,
                email: correo
            });
            setAdvice("Estudiante editado con éxito");
            setOpen(true);
            Cookies.remove("StudentCodigo");
            Cookies.remove("StudentNombre");
            Cookies.remove("StudentEmail");
        } catch (error) {
            setAdvice(error.response?.data?.error || "Error al editar el estudiante");
            setOpen(true);
        }
    };

    const popup = (e) => {
        e.preventDefault();
        setOpen(false);
        window.location.reload();
    };

    EditarStudent.propTypes = {
        profesor: PropTypes.string.isRequired
    };

    return (
        <div className="ProfeEditar">
            <NavbarProfesor />
            <form className="form">
                <div className="panel">
                    <div className="yamba"><h1>{Cookies.get("StudentNombre")}</h1></div>
                    <div className="yemba"><h1>Nombre:</h1></div>
                    <input type="text" className="label" required onChange={handleNombreChange} value={nombre} />
                    <div className="yimba"><h1>Codigo:</h1></div>
                    <input type="number" className="label1" required onChange={handleCodigoChange} value={documento} />
                    <div className="yomba"><h1>Correo:</h1></div>
                    <input type="email" className="label2" required onChange={handleEmailChange} value={correo} />
                </div>
                <div className="yumba">
                    <Button Boton="Guardar" color="rgb(15, 65, 118)" fontColor="white" width="300px" onClick={handleClick} />
                </div>
            </form>
            <PopUp
                open={open}
                SetOpen={setOpen}
                Advice={advice}
                Width={"100%"}
                Button1="volver"
                onClick1={popup}
            />
        </div>
    );
}

export default EditarStudent;
