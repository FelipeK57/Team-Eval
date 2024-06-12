
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import axios from "axios";
import Button from "../../components/Utilities/Button";
import ListItems from "../../components/Utilities/ListItems";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/Utilities/PopUp";
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import "../CursosProfe/EstudiantesLista.css";
import Search from "@mui/icons-material/Search";
import Field from "../../components/Utilities/Field";

function EstudiantesCurso() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filteredEstudiantes, setFilteredEstudiantes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchEstudiantess, setSearchEstudiantess] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const navigate = useNavigate();
  const { cursoCodigo } = useParams();
  const location = useLocation();
  const materia = location.state?.materia || "Sin materia";


  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/estudiantes_curso/",
          {
            codigo: cursoCodigo
          }
        );
        setEstudiantes(response.data.estudiantes);
        setFilteredEstudiantes(response.data.estudiantes)
      } catch (error) {
        console.error("Error al obtener los Estudiantes:", error);
      }
    };
    fetchEstudiantes();
  }, []);

  const handleClick = async (id) => {
    try {
      const response = await axios.post("http://localhost:8000/eliminar_estudiante_curso/", {
        estudianteId: id,
        cursoCodigo: cursoCodigo
      });
      setAdvice(response.data.message);
      setOpen(true);
    } catch (error) {
      setAdvice(error.data.error);
      setOpen(true);
    }
  }

  const popup = (e) => {
    e.preventDefault();
    setOpen(!open);
    window.location.reload();
  };

  const handleSearchBlur = () => {
    if (searchValue === "") {
      setSearchEstudiantess(false);
    }
  };

  const BuscarButton = () => {
    setSearchEstudiantess(true);
    const searchField = document.querySelector(".SearchFieldEstudiantes input");
    setTimeout(() => {
      searchField.focus();
    }, 0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredEstudiantes(estudiantes);
    } else {
      setFilteredEstudiantes(estudiantes.filter(estudiante =>
        String(estudiante.codigo).toLowerCase().includes(e.target.value.toLowerCase())
      ));
    }
    setSearchValue(e.target.value);
  };



  return (
    <div className="ContainerEstudiantes">
      <div className="NavBar">
        <NoQuieroCrearMasNavbars />
      </div>
      <div className="TitleEstudiantes">
        <h1>Listado de Estudiantes del Curso: <br />{materia}</h1>
        <div className="SearchEstudiantes">
          <button className="SearchButtonEstudiantes" onClick={BuscarButton}>
            <Search sx={{ fontSize: 30, color: "white" }} />
          </button>
          <div className={searchEstudiantess === true ? "SearchFieldEstudiantes ActiveE" : "SearchFieldEstudiantes Inactive"} onBlur={handleSearchBlur}>
            <Field
              LineaBoton={false}
              Boton=""
              color="rgb(15, 65, 118)"
              fontColor="white"
              onChange={handleSearchChange}
              placeholder="Buscar Estudiantes"
              value={searchTerm}
            />
          </div>
        </div>
      </div>
      <div className="AgregarListEstudiantes">
      </div>
      <div className="ListaEstudiantes">
        {filteredEstudiantes.map((estudiante) => (
          <div key={estudiante.id}>
            <ListItems
              Nombre1={estudiante.user.first_name}
              Nombre2={estudiante.user.last_name}
              Codigo1={estudiante.codigo}
              onClickDelete={() => handleClick(estudiante.id)}
              Buttons={true}
              Btn2={true}
            />
          </div>
        ))}
      </div>
      <PopUp open={open}
        SetOpen={setOpen}
        Advice={advice}
        Width={"100%"}
        Button1="volver"
        onClick1={popup}

      />
    </div>
  );
}

export default EstudiantesCurso;