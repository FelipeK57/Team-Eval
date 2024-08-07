import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import axios from "axios";
import Button from "../../components/Utilities/Button";
import ListItems from "../../components/Utilities/ListItems";
import "./ProfesoresAdmin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import PopUp from "../../components/Utilities/PopUp";
import Search from "@mui/icons-material/Search";
import Field from "../../components/Utilities/Field";

function Profesores() {
  const [profesores, setProfesores] = useState([]);
  const [filteredProfesores, setFilteredProfesores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const [searchProfesores, setSearchProfesores] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const AgregarProfesores = () => {
    navigate("/AgregarP");
  };

  const ProfesoresDeshabilitados = () => {
    navigate("/ProfeDes");
  };

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profesores/");
        setProfesores(response.data.profesores);
        setFilteredProfesores(response.data.profesores);
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      }
    };
    fetchStudentCourses();
  }, []);

  const EditarProfesor = (identificacion, nombre, apellido ,email) => {
    Cookies.set('profesorIdentificacion', identificacion, { expires: 1 });
    Cookies.set('profesorNombre', nombre, { expires: 1 });
    Cookies.set('profesorApellido', apellido, { expires: 1 });
    Cookies.set('profesorEmail', email, { expires: 1 });
    navigate("/ProfeEditar"); 
  };

  const deshabilitarProfesor = async (identificacion) => {
    try {
      await axios.post("http://localhost:8000/editEstado_profesor/", {
        identificacion: identificacion,
        estado: false,
      });
      setAdvice("Profesor deshabilitado con éxito");
      setOpen(true);
    } catch (error) {
      setAdvice(error.response.data.error);
      setOpen(true);
    }
  };

  const popup = (e) => {
    e.preventDefault();
    setOpen(!open);
    window.location.reload();
  };

  const BuscarButton = () => {
    setSearchProfesores(true);
    const searchField = document.querySelector(".SearchFieldProfesores input");
    setTimeout(() => {
      searchField.focus();
    }, 0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredProfesores(profesores);
    } else {
      setFilteredProfesores(profesores.filter(profesor =>
        String(profesor.identificacion).toLowerCase().includes(e.target.value.toLowerCase())
      ));
    }
    setSearchValue(e.target.value);
  };

  const handleSearchBlur = () => {
    if (searchValue === "") {
      setSearchProfesores(false);
    }
  };

  return (
    <div className="ContainerProfesores">
      <div className="NavBar">
        <NoQuieroCrearMasNavbars />
      </div>
      <div className="TitleProfesores">
        <h1>Profesores</h1>
        <div className="SearchProfesores">
          <button className="SearchButtonProfesores" onClick={BuscarButton}>
            <Search sx={{ fontSize: 30, color: "white" }} />
          </button>
          <div className={searchProfesores === true ? "SearchFieldProfesores Active" : "SearchFieldProfesores Inactive"}
          onBlur={handleSearchBlur}>
            <Field
              LineaBoton={false}
              Boton=""
              color="rgb(15, 65, 118)"
              fontColor="white"
              onChange={handleSearchChange}
              value={searchTerm}
            />
          </div>
        </div>
      </div>
      <div className="AgregarListProfesores">
        <Button
          LineaBoton={false}
          Boton="Agregar"
          color="rgb(15, 65, 118)"
          fontColor="white"
          onClick={AgregarProfesores}
        />
      </div>
      <div className="CursosDes">
        <Button
          LineaBoton={false}
          Boton="Profesores deshabilitados"
          color="rgb(15,65,118)"
          fontColor="white"
          onClick={ProfesoresDeshabilitados}
        />
      </div>
      <div className="ListaProfesores">
        {filteredProfesores.map((profesor) => (
          <div key={profesor.id}>
            <ListItems
              Nombre1={profesor.user.first_name}
              Codigo1={profesor.identificacion}
              onClickEdit={() => EditarProfesor(profesor.identificacion, profesor.user.first_name, profesor.user.last_name, profesor.user.email)}
              onClickDelete={() => deshabilitarProfesor(profesor.identificacion)}
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

export default Profesores;
