
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import axios from "axios";
import Button from "../../components/Utilities/Button";
import ListItems from "../../components/Utilities/ListItems";
import "./EstudiantesLista.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/Utilities/PopUp";
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';


function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");
    const navigate = useNavigate(); 
    const { cursoCodigo } = useParams();
 
  
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

    const handleClick2 = async (id) => { 
      try {
        const response = await axios.post("http://localhost:8000/agregar_estudiante_curso/", {
          cursoCodigo: cursoCodigo,
          estudianteId: id
        });
        setAdvice(response.data.message);
        setOpen(true);  
      } catch (error) {
        setAdvice(error.data.err);
        setOpen(true);  
      }
    }

    const BuscarButton = () => {
      setSearchProfesores(true);
      const searchField = document.querySelector(".SearchFieldProfesores input");
      setTimeout(() => {
        searchField.focus();
      }, 0);
    };

    const popup = (e) => {
      e.preventDefault();
      setOpen(!open);
      window.location.reload();
  };

  const EditarStuden = (codigo, nombre, apellido, email ) => {
    Cookies.set('StudentCodigo', codigo, { expires: 1 });
    Cookies.set('StudentNombre', nombre, { expires: 1 });
    Cookies.set('StudentApellido', apellido, { expires: 1 });
    Cookies.set('StudentEmail', email, { expires: 1 });
    navigate("/EditarStudent");
  };
  
  
    return (
      <div className="ContainerEstudiantes">
        <div className="NavBar">
          <NoQuieroCrearMasNavbars/>
        </div>
        <div className="TitleEstudiantes">
          <h1>Listado de Estudiantes</h1>
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
                onClickEdit={() => EditarStuden(estudiante.codigo,estudiante.user.first_name, estudiante.user.last_name, estudiante.user.email)}
                onClickDelete={() => handleClick(estudiante.codigo)}
                onClickAdd={() => handleClick2(estudiante.id)}
                Buttons={true}
                Btn3 ={true}
                Btn1 = {true}
                Btn2 = {true}
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