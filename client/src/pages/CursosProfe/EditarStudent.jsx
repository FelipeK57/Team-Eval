import "./EditarStudent.css";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import Button from "../../components/Utilities/Button";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/Utilities/PopUp";
import CardForm from "../../components/CardForm";

function EditarStudent(props) {
    const [nombre, setNombre] = useState(Cookies.get("StudentNombre"));
    const [apellido, setApellidos] = useState(Cookies.get("StudentApellido"));
    const [documento, setDocumento] = useState(Cookies.get("StudentCodigo"));
    const [correo, setCorreo] = useState(Cookies.get("StudentEmail"));
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const verificarSesion = () => {
            const user = Cookies.get("user");
            const token = Cookies.get("sessionid");

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

    const handleApellidosChange = (e) => {
        setApellidos(e.target.value);
    }

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
                apellido: apellido,
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

        <div className="Contenedor">
            <NoQuieroCrearMasNavbars />
            <CardForm Title={Cookies.get("StudentNombre")}
                Label1="Nombres"
                Type1="text"
                valueField1={nombre}
                onChangeField1={handleNombreChange}
                Field1=""
                Label2="Apellidos"
                type2="text"
                valueField2={apellido}
                onChangeField2={handleApellidosChange}
                Field2=""
                Label3="Documento"
                type3="text"
                valueField3={documento}
                onChangeField3={handleCodigoChange}
                Field3=""
                Label4="Correo"
                type4="email"
                valueField4={correo}
                onChangeField4={handleEmailChange}
                Field4=""
                onClick={handleClick}
            />
            <PopUp open={open}
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
