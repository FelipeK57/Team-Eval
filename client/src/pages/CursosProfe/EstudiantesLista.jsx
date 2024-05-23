import NavbarProfesor from "../../components/NavbarProfesor";
import axios from "axios";
import Button from "../../components/Utilities/Button";
import ListItems from "../../components/Utilities/ListItems";
import "./EstudiantesLista.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/Utilities/PopUp";

function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");
    //const navigate = useNavigate();
   // const AgregarEstudiantes = () => {
   //   navigate("/AgregarE");
   // };
  
    useEffect(() => {
      const fetchEstudiantes = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/estudiantes/"
          );
          setEstudiantes(response.data.estudiantes);
        } catch (error) {
          console.error("Error al obtener los Estudiantes:", error);
        }
      };
      fetchEstudiantes();
    }, []);

    const handleClick = async (codigo) => { 
      try {
        const response = await axios.post("http://localhost:8000/editar_estado_estudiante/", {
          codigo: codigo,
          estado: false  // Cambia a 'false' para deshabilitar al estudiante
        });
        setAdvice("Estudiante deshabilitado con exito");
        setOpen(true);  
      } catch (error) {
        console.error("Error al deshabilitar el estudiante", error);
        alert("Error al deshabilitar el estudiante", error);
      }
    }

    const popup = (e) => {
      e.preventDefault();
      setOpen(!open);
      window.location.reload();
  };
  
  
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
              <ListItems
                Nombre1={estudiante.user.first_name}
                Nombre2={estudiante.user.last_name}
                Codigo1={estudiante.codigo}             
                onClickEdit={"Editar"}
                onClickDelete={() => handleClick(estudiante.codigo)}
                Buttons={true}
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
  
  export default Estudiantes;