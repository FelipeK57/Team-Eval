import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import CardForm from "../../components/CardForm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import PopUp from "../../components/Utilities/PopUp";

function AgregarProfesor() {

    const  [nombres, setNombres] = useState("");
    const  [apellidos, setApellidos] = useState("");
    const  [documento, setDocumento] = useState("");
    const  [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");

    const handleNombresChange = (e) => {
        setNombres(e.target.value);
    }

    const handleApellidosChange = (e) => {
        setApellidos(e.target.value);
    }

    const handleDocumentoChange = (e) => {
        setDocumento(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const popup = (e) => {
        e.preventDefault();
        setOpen(!open);
    };

    useEffect(() => {
        const verificarSesion = () => {
          const user = Cookies.get("user");
          const token = Cookies.get("sessionid");
    
          if ( user &&  token) {
            console.log("El usuario ha iniciado sesión");
          } else {
            console.log("El usuario no ha iniciado sesión.");
            navigate("/login");
          }
        };
    
        verificarSesion();
      }, [navigate]);

    const handleClick = async (e) => {
        if (nombres === "" || apellidos === "" || documento === "" || email === "") {
            return;
        }
        if(documento< 10000000 || documento > 9999999999){
            setAdvice("El documento debe ser de minimo 8 digitos");
            setOpen(true);
            return;
        }
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:8000/nuevo_profe/", {
            nombre : nombres,
            apellido : apellidos,
            identificacion : documento,
            email : email
        });
        console.log(response.data);
        setAdvice("Profesor agregado con exito");
        setOpen(true);
        

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            setAdvice(error.response.data.error);
        } else {
            setAdvice("Error al agregar el profesor");
        }
        setOpen(true);
    }

    }




    return (
        <div className="Contenedor">
            <NoQuieroCrearMasNavbars />
            <CardForm Title="Agregar Profesor"
                Label1="Nombres"
                value1={nombres}
                onChangeField1={handleNombresChange}
                Field1=""
                Label2="Apellidos"
                type2="text"
                value2={apellidos}
                onChangeField2={handleApellidosChange}
                Field2=""
                Label3="Documento"
                type3="text"
                value3={documento}
                onChangeField3={handleDocumentoChange}
                Field3=""
                Label4="Correo"
                type4="email"
                value4={email}
                onChangeField4={handleEmailChange}
                Field4=""
                onClick={handleClick}
            />
            <PopUp open={open}
                SetOpen={setOpen}
                Advice={advice}
                Width={"100%"}
                Button1="volver"
               onClick1={() => navigate(-1)}
                
            />
        </div>
        
    );
}

export default AgregarProfesor