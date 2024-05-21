import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import axios from "axios";
import Button from "../../components/Utilities/Button";
import ListItems from "../../components/Utilities/ListItems";
import "./ProfesoresAdmin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profesores() {
  const [profesores, setProfesores] = useState([]);
  const navigate = useNavigate();

  const AgregarProfesores = () => {
    navigate("/AgregarP");
  };

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/profesor/all/profesor"
        );
        setProfesores(response.data);
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      }
    };
    fetchStudentCourses();
  }, []);

  return (
    <div className="ContainerProfesores">
      <div className="NavBar">
        <NoQuieroCrearMasNavbars />
      </div>
      <div className="TitleProfesores">
        <h1>Profesores</h1>
      </div>
      <div className="Search"></div>
      <div className="AgregarListProfesores">
        <Button
          LineaBoton={false}
          Boton="Agregar"
          color="rgb(15, 65, 118)"
          fontColor="white"
          onClick={AgregarProfesores}
        />
      </div>
      <div className="ListaProfesores">
        {profesores.map((profesor) => (
          <div key={profesor.id}>
            <ListItems
              Nombre1={profesor.user.first_name}  
              Codigo1={profesor.identificacion}
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

export default Profesores;
