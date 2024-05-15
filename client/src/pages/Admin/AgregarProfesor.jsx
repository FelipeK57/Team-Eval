import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import CardForm from "../../components/CardForm";
import { useState } from "react";
import axios from "axios";

function AgregarProfesor() {

    const  [nombres, setNombres] = useState("");
    const  [apellidos, setApellidos] = useState("");
    const  [documento, setDocumento] = useState("");
    const  [email, setEmail] = useState("");

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

    const handleClick = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:8000/nuevo_profe/", {
            nombre : nombres,
            apellido : apellidos,
            identificacion : documento,
            email : email
        });
        console.log(response.data);
        alert("Profesor agregado");

    } catch (error) {
        console.log(error);
        alert("Error al agregar el Profesor", error);
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
        </div>
    );
}

export default AgregarProfesor