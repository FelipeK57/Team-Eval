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

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profesores/");
        const profesoresData = response.data.profesores.map(profesor => ({
          id: profesor.id,
          name: `${profesor.user.first_name} ${profesor.user.last_name}`
        }));
        setProfesores(profesoresData);

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
  }, [profesor_id]);

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

  const handleProfesorChange = (newValue) => {
    if (newValue) {
      setProfesorID(newValue.id);
      setSelectedProfesor(newValue);
    }
  };

  const popup = () => {
    setOpen(true);
  };

  const closePopup = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const gestionarE = (e) => {
    navigate(`/EstudiantesCurso/${cursoCodigo}`, { state: { materia: cursoNombre } });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!cursoNombre || !cursoCodigo || !periodo || !profesor_id) {
      setAdvice("Todos los campos son obligatorios");
      popup();
      return;
    }

    const caracteresEspeciales = /[^a-zA-Z0-9]/.test(cursoCodigo);
    if (caracteresEspeciales) {
      setAdvice("El código no debe contener caracteres especiales.");
      popup();
      return;
    }

    const currentYear = new Date().getFullYear();
    const validYears = [currentYear, currentYear + 1];
    const formatoValido = /^\d{4}-[1-2]$/.test(periodo);

    if (!formatoValido) {
      setAdvice("El formato del periodo debe ser 20XX-semestre (1 o 2)");
      popup();
      return;
    }

    const [year] = periodo.split("-").map(Number);

    if (year < currentYear || !validYears.includes(year)) {
      setAdvice("El año ingresado no es válido. No puede ser un año ya finalizado");
      popup();
      return;
    }

    try {
      await axios.post("http://localhost:8000/Editar_curso/", {
        codigo: Cookies.get("codigoCurso"),
        nombre: cursoNombre,
        newCodigo: cursoCodigo,
        periodo: periodo,
        profe: profesor_id,
      });
      setAdvice("Curso editado con éxito");
      popup();
      Cookies.remove("nombreCurso");
      Cookies.remove("codigoCurso");
      Cookies.remove("periodoCurso");
      Cookies.remove("profesor_id");
    } catch (error) {
      setAdvice(error.response?.data?.error || "Error al editar el curso");
      popup();
    }
  };

  const handlePopupClick = (e) => {
    e.preventDefault();
    setOpen(false);
    if (advice === "Curso editado con éxito") {
      navigate("/CursosAdmin");
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
        onChangeField3={handleProfesorChange}
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
        Btn4={true}
        onClick2={agregarE}
        onClick3={gestionarE}
      />
      <PopUp
        open={open}
        SetOpen={setOpen}
        Advice={advice}
        Width={"100%"}
        Button1="Volver"
        onClick1={handlePopupClick}
      />
    </div>
  );
}

export default EditarCurso;
