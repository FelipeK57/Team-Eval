import { useState, useEffect } from "react";
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
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const navigate = useNavigate();
 

  const importarE = (e) => {
    navigate("/ImportarEstudiantes/");
  };

  const agregarE = (e) => {
    navigate(`/EstudiantesLista/${cursoCodigo}`);
  };

  const handleNombreChange = (e) => {
    setCursoNombre(e.target.value);
  };

  const handleCodigoChange = (e) => {
    setCursoCodigo(e.target.value);
  };

  const handlePeriodoChange = (e) => {
    setPeriodo(e.target.value);
  };

  const popup = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate("/CursosAdmin");
    
  };

  const gestionarE = (e) => {
    navigate(`/EstudiantesCurso/${cursoCodigo}`, { state: { materia: cursoNombre } });
  };  



  const handleClick = async (e) => {
    e.preventDefault();

    if (!cursoNombre || !cursoCodigo || !periodo) {
      setAdvice("Todos los campos son obligatorios"); 
      setOpen(true);
      return;
    } 
    try {
      await axios.post("http://localhost:8000/Editar_curso/", {
        codigo: Cookies.get("codigoCurso"),
        nombre: cursoNombre,
        newCodigo: cursoCodigo,
        periodo: periodo,
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
        Title="Editar curso"
        Label1="Nombre"
        Field1=""
        valueField1={cursoNombre}
        onChangeField1={handleNombreChange}
        Label2="Codigo"
        type2="text"
        Field2=""
        valueField2={cursoCodigo}
        onChangeField2={handleCodigoChange}
        Label3="Periodo"
        type3="text"
        Field3=""
        valueField3={periodo}
        onChangeField3={handlePeriodoChange}
        onClick={handleClick}
        redirect={importarE}
        Btn2={true}
        Btn3={true}
        Btn4= {true}
        onClick2={agregarE}
        onClick3={gestionarE}
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
