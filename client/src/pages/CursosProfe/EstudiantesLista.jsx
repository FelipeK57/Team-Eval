import NavbarProfesor from "../../components/NavbarProfesor";
import axios from "axios";
import Button from "../../components/Utilities/Button";
import ListItems from "../../components/Utilities/ListItems";
import "./EstudiantesLista.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    //const navigate = useNavigate();
  
   // const AgregarEstudiantes = () => {
   //   navigate("/AgregarE");
   // };
  
    useEffect(() => {
      const fetchEstudiantes = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/user/estudiantes/estudiantes"
          );
          setEstudiantes(response.data);
        } catch (error) {
          console.error("Error al obtener los Estudiantes:", error);
        }
      };
      fetchEstudiantes();
    }, []);
  
    return (
      <div className="ContainerEstudiantes">
        <div className="NavBar">
          <NavbarProfesor />
        </div>
        <div className="TitleEstudiantes">
          <h1>Estudiantes</h1>
        </div>
        <div className="Search"></div>
        <div className="AgregarListEstudiantes">
        </div>
        <div className="ListaEstudiantes">
          {estudiantes.map((estudiante) => (
            <div key={estudiante.id}>
              <ListIstems
                Nombre1={estudiante.user.first_name}
                Nombre2={estudiante.user.last_name}
                Codigo1={estudiante.codigo}             
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
  
  export default Estudiantes;