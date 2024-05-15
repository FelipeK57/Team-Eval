import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CursosAdmin.css";
import axios from "axios";
import Button from "../../components/Utilities/Button";
import ListItems from "../../components/Utilities/ListItems";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  const AgregarCursos = () => {
    navigate("/AgregarC");
  };

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/cursos/all/cursos"
        );
        setCursos(response.data);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };
    fetchStudentCourses();
  }, []);

  return (
    <div className="ContainerCursos">
      <div className="NavBar">
        <NoQuieroCrearMasNavbars />
      </div>
      <div className="TitleCursos">
        <h1>Cursos</h1>
      </div>
      <div className="Search"></div>
      <div className="AgregarListCursos">
        <Button
          LineaBoton={false}
          Boton="Agregar"
          color="rgb(15, 65, 118)"
          fontColor="white"
          onClick={AgregarCursos}
        />
      </div>
      <div className="ListaCursos">
        {cursos.map((curso) => (
          <div key={curso.id}>
            <ListItems
              Nombre1={curso.nombre}
              Codigo1={curso.codigo}
              onClickEdit={"Editar"}
              onClickDelete={"Eliminar"}
              Buttons={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cursos;
