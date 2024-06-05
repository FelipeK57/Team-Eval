import CardForm from "../../components/CardForm";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import PopUp from "../../components/Utilities/PopUp";

function AgregarCurso() {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [Periodo, setPeriodo] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState("");

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleCodigoChange = (e) => {
    setCodigo(e.target.value);
  };

  const handlesetPeriodo = (e) => {
    setPeriodo(e.target.value);
  };
  const popup = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  useEffect(() => {
    const verificarSesion = () => {
      const user = Cookies.get("user");
      const token = Cookies.get("sessionid");

      if (user && token) {
        console.log("El usuario ha iniciado sesión");
      } else {
        console.log("El usuario no ha iniciado sesión.");
        navigate("/login");
      }
    };

    verificarSesion();
  }, [navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/nuevo_curso/", {
        nombre: nombre,
        codigo: codigo,
        periodo: Periodo,
        profe: Cookies.get("profesor_id"),
      });
      console.log(response.data);
      setAdvice("Curso agregado con exito");
      popup(e);
      Cookies.remove("profesor_id");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAdvice(error.response.data.error);
      } else {
        setAdvice("Error al agregar el curso");
      }
      popup(e);
    }
  };

  return (
    <div className="Contenedor">
      <NoQuieroCrearMasNavbars />
      <CardForm
        Title="Agregar curso"
        Label1="Nombre"
        value1={nombre}
        onChangeField1={handleNombreChange}
        Field1=""
        Label2="codigo"
        type2="numero"
        value2={codigo}
        onChangeField2={handleCodigoChange}
        Field2=""
        Label3="Profesor"
        type3="text"
        value3={Periodo}
        onChangeField3={handlesetPeriodo}
        Field3=""
        onClick={handleClick}
        Combo={true}
        Label4="Periodo"
        type4="text"
        value4={Periodo}
        onChangeField4={handlesetPeriodo}
        Field4=""
      />
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

export default AgregarCurso;
