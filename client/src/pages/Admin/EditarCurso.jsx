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
  const [profesor_id, setProfesorID] = useState(Cookies.get("id"));
  const [profesores, setProfesores] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState(null);
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const navigate = useNavigate();
 

  console.log("id del profesor:", profesor_id)

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profesores/");
        const profesoresData = response.data.profesores.map(profesor => ({
          id: profesor.id,
          name: `${profesor.user.first_name} ${profesor.user.last_name}`
        }));
        setProfesores(profesoresData);

        // Obtener el valor inicial de las cookies
        const profesorId = profesor_id;
        if (profesorId) {
          const selected = profesoresData.find(prof => prof.id === parseInt(profesorId));
          if (selected) {
            setSelectedProfesor(selected);
          }
        }
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      }
    };
    fetchProfesores();
  }, []);

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

  const handlesetPeriodo = (e) => {
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
  
    const currentYear = new Date().getFullYear();
    const validYears = [currentYear, currentYear + 1];
    const formatoValido = /^\d{4}-[1-2]$/.test(periodo);
  
    if (!formatoValido) {
      setAdvice("El formato del periodo debe ser 20XX-semestre (1 o 2)");
      setOpen(true);
      return;
    }
  
    const [year, semester] = periodo.split("-").map(Number);
  
    if (year < currentYear || !validYears.includes(year)) {
      setAdvice("El año ingresado no es válido. No puede ser un año ya finalizado");
      setOpen(true);
      return;
    }

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
        valueField3={selectedProfesor}
        onChangeField3={handlesetPeriodo}
        Field3=""
        onClick={handleClick}
        Combo={true}
        value=""
        Label4="Periodo"
        type4="text"
        valueField4={periodo}
        onChangeField4={handlesetPeriodo}
        Field4=""
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
