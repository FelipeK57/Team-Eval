
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


function EstudiantesCurso() {
    const [estudiantes, setEstudiantes] = useState([]);
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

  
  
    return (
      <div className="ContainerEstudiantes">
        <div className="NavBar">
          <NoQuieroCrearMasNavbars/>
        </div>
        <div className="TitleEstudiantes">
          <h1>Listado de Estudiantes del Curso {materia}</h1>
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
                onClickDelete={() => handleClick(estudiante.id)}
                Buttons={true}
                Btn2 ={true}
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