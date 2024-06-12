import CardForm from "../../components/CardForm";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PopUp from "../../components/Utilities/PopUp";

function AgregarCurso() {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [Periodo, setPeriodo] = useState("");
  const [profe, setProfe] = useState(Cookies.get("profesor_id") || ""); // Asegurarse de que el profesor esté disponible
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

  const popup = () => {
    setOpen(true);
  };

  const closePopupAndNavigate = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate("/CursosAdmin");
  };

  const closePopup = (e) => {
    e.preventDefault();
    setOpen(false);
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
    
    // Limpiar mensaje de advice antes de realizar verificaciones
    setAdvice("");

    if (!nombre || !codigo || !Periodo) {
      setAdvice("Todos los campos son obligatorios");
      popup();
      return;
    }

    const currentYear = new Date().getFullYear();
    const validYears = [currentYear, currentYear + 1];
    const formatoValido = /^\d{4}-[1-2]$/.test(Periodo);

    const caracteresEspeciales = /[^a-zA-Z0-9]/.test(codigo);
    if (caracteresEspeciales) {
      setAdvice("El código no debe contener caracteres especiales.");
      popup();
      return;
    }

    if (!formatoValido) {
      setAdvice("El formato del periodo debe ser 20XX-semestre (1 o 2)");
      popup();
      return;
    }

    const [year] = Periodo.split("-").map(Number);

    if (year < currentYear || !validYears.includes(year)) {
      setAdvice("El año ingresado no es válido. No puede ser un año ya finalizado");
      popup();
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/nuevo_curso/", {
        nombre: nombre,
        codigo: codigo,
        periodo: Periodo,
        profe: profe,
      });
      console.log(response.data);
      setAdvice("Curso agregado con éxito (Puede verlo en el listado de Cursos y editarlo para agregar estudiantes)");
      setOpen(true);
      Cookies.remove("profesor_id");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAdvice(error.response.data.error);
      } else {
        setAdvice("Error al agregar el curso");
      }
      popup();
    }
  };

  const handlePopupClick = (e) => {
    e.preventDefault();
    setOpen(false);
    if (advice.includes("Curso agregado con éxito")) {
      navigate("/CursosAdmin");
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
        Label2="Código"
        type2="text"
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
        Button1="Volver"
        onClick1={handlePopupClick}
      />
    </div>
  );
}

export default AgregarCurso;
