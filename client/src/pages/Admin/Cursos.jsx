import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CursosAdmin.css";
import axios from "axios";
import Button from "../../components/Utilities/Button";
import ListItems from "../../components/Utilities/ListItems";
import Cookies from 'js-cookie';
import PopUp from "../../components/Utilities/PopUp";
import Search from "@mui/icons-material/Search";
import Field from "../../components/Utilities/Field";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const [searchCursos, setSearchCursos] = useState(false);
  const [filteredCursos, setFilteredCursos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const AgregarCursos = () => {
    navigate("/AgregarC");
  };

  const CursosDeshabilitados = () => {
    navigate("/CursosDes");
  };

  const popup = (e) => {
    e.preventDefault();
    setOpen(false);
    window.location.reload(); // Actualiza la página después de cerrar el popup
  };

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cursos/");
        setCursos(response.data.Cursos);
        setFilteredCursos(response.data.Cursos); // Inicialmente, los cursos filtrados son todos los cursos
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };
    fetchStudentCourses();
  }, []);

  const EditarCursos = (nombre, codigo, periodo, id_profesor) => {
    Cookies.set("nombreCurso", nombre, { expires: 1 });
    Cookies.set("codigoCurso", codigo, { expires: 1 });
    Cookies.set("periodoCurso", periodo, { expires: 1 });
    Cookies.set("id", id_profesor, { expires: 1 });

    navigate("/EditarCurso");
  };

  const handleClick = async (codigo) => {
    try {
      const response = await axios.post("http://localhost:8000/Estadocursos/", {
        codigo: codigo,
        estado: false
      });
      console.log(response.data);
      setAdvice("Curso deshabilitado con éxito");
      setOpen(true);
    } catch (error) {
      console.error("Error al editar el curso:", error);
    }
  };

  const BuscarButton = () => {
    setSearchCursos(true);
    const searchField = document.querySelector(".SearchFieldCursos input");
    setTimeout(() => {
      searchField.focus();
    }, 0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredCursos(cursos);
    } else {
      setFilteredCursos(cursos.filter(curso => 
        String(curso.codigo).toLowerCase().includes(e.target.value.toLowerCase())
      ));
    }
  };

  return (
    <div className="ContainerCursos">
      <div className="NavBar">
        <NoQuieroCrearMasNavbars />
      </div>
      <div className="TitleCursos">
        <h1>Cursos</h1>
        <div className="SearchCursos">
          <button className="SearchButtonCursos" onClick={BuscarButton}>
            <Search sx={{ fontSize: 30, color: "white" }} />
          </button>
          <div className={searchCursos === true ? "SearchFieldCursos Active" : "SearchFieldCursos Inactive"}>
            <Field
              LineaBoton={false}
              Boton=""
              color="rgb(15, 65, 118)"
              fontColor="white"
              onChange={handleSearchChange}
              placeholder="Buscar Cursos"
              value={searchTerm}
            />
          </div>
        </div>
      </div>
      <div className="AgregarListCursos">
        <Button
          LineaBoton={false}
          Boton="Agregar"
          color="rgb(15, 65, 118)"
          fontColor="white"
          onClick={AgregarCursos}
        />
      </div>
      <div className="CursosDes">
        <Button
          LineaBoton={false}
          Boton="Cursos deshabilitados"
          color="rgb(15,65,118)"
          fontColor="white"
          onClick={CursosDeshabilitados}
        />
      </div>
      <div className="ListaCursos">
        {filteredCursos.map((curso) => (
          <div key={curso.id}>
            <ListItems
              Nombre1={curso.nombre}
              Codigo1={curso.codigo}
              onClickEdit={() => EditarCursos(curso.nombre, curso.codigo, curso.periodoAcademico, curso.profesor.id)}
              onClickDelete={() => handleClick(curso.codigo)}
              Buttons={true}
              Btn1={true}
              Btn2={true}
              
            />
          </div>
        ))}
      </div>
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

export default Cursos;

