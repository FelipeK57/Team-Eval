import CardForm from "../../components/CardForm";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import axios from "axios";

function AgregarCurso() {

    const  [nombre, setNombre] = useState("");
    const  [codigo, setCodigo] = useState("");
    const  [Periodo, setPeriodo] = useState("");
  

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    }

    const handleCodigoChange = (e) => {
        setCodigo(e.target.value);
    }

    const handlesetPeriodo = (e) => {
        setPeriodo(e.target.value);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:8000/nuevo_curso/", {
            nombre : nombre,
            codigo : codigo,
            periodo: Periodo,
        });
        console.log(response.data);
        alert("Curso agregado");

    } catch (error) {
        console.log(error);
        alert("Error al agregar el Curso", error);
    }

    }




    return (
        <div className="Contenedor">
        <NavBar />
        <CardForm Title="Agregar Curso"
            Label1="Nombre"
            value1={nombre}
            onChangeField1={handleNombreChange}
            Field1=""
            Label2="codigo"
            type2="numero"
            value2={codigo}
            onChangeField2={handleCodigoChange}
            Field2=""
            Label3="periodo"
            type3="text"
            value3={Periodo}
            onChangeField3={handlesetPeriodo}
            Field3=""
            onClick={handleClick}
        />
    </div>
        
    );
}

export default AgregarCurso;