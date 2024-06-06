import { useState } from "react";
import axios from "axios";
import CardForm from "../../components/CardForm";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import Cookies from "js-cookie";
import PopUp from "../../components/Utilities/PopUp";
import { useNavigate } from "react-router-dom";

function EditarCurso() {
  const [cursoNombre, setCursoNombre] = useState(Cookies.get("nombreCurso"));
  const [cursoCodigo, setCursoCodigo] = useState(Cookies.get("codigoCurso"));
  const [periodo, setPeriodo] = useState(Cookies.get("periodoCurso"));
  const [profesor, setProfesor] = useState(Cookies.get("profesor"));
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const navigate = useNavigate();

  console.log("profesor del curso:", profesor);

  const importarE = (e) => {
    navigate("/ImportarEstudiantes");
  };

  const handleNombreChange = (e) => {
    setCursoNombre(e.target.value);
  };

  const handleCodigoChange = (e) => {
    setCursoCodigo(e.target.value);
  };

  const handlesetPeriodo = (e) => {
    setPeriodo(e.target.value);
  };

  const popup = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate("/CursosAdmin");

  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/Editar_curso/", {
        codigo: Cookies.get("codigoCurso"),
        nombre: cursoNombre,
        newCodigo: cursoCodigo,
        periodo: periodo,
        profe: Cookies.get("profesor_id"),
      });
      setAdvice("Curso editado con éxito");
      setOpen(true);
      Cookies.remove("nombreCurso");
      Cookies.remove("codigoCurso");
      Cookies.remove("periodoCurso");

    } catch (error) {
      setAdvice(error.response?.data?.error || "Error al editar el curso");
      setOpen(true);
    }
  };

  return (
    <div className="Contenedor">
      <NoQuieroCrearMasNavbars />
      <CardForm
        Title="Editar Curso"
        Label1="Nombre"
        Field1=""
        valueField1={cursoNombre}
        onChangeField1={handleNombreChange}
        Label2="Codigo"
        type2="text"
        valueField2={cursoCodigo}
        onChangeField2={handleCodigoChange}
        Field2=""
        Label3="Profesor"
        type3="text"
        valueField3={profesor}
        onChangeField3={handlesetPeriodo}
        Field3=""
        onClick={handleClick}
        Combo={true}
        value={profesor}
        Label4="Periodo"
        type4="text"
        valueField4={periodo}
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

export default EditarCurso;
