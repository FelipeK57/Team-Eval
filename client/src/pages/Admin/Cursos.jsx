import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../../components/Utilities/Button"
import ListItems from "../../components/Utilities/ListItems";

function Cursos() {
  const [cursos, setCursos] = useState([]);

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
    <div className="Container">
      <div className="NavBar">
        <NoQuieroCrearMasNavbars />
      </div>
      <div className="Title">
        <h1>Cursos</h1>
      </div>
      <div className="Search"></div>
      <div className="AgregarList">
        <Button
          LineaBoton={false}
          Boton="Agregar"
          color="rgb(15, 65, 118)"
          fontColor="white"
        />
      </div>
      <div className="Lista">
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
