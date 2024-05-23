import "./ProfeDes.css";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import { useEffect, useState } from "react";
import axios from "axios";
import ListEstDes from "../../components/EstudiantesDes/ListEstDes";
import PopUp from "../../components/Utilities/PopUp";



function ProfeDes() {

    const [profesoresDes, setProfesoresDes] = useState([]);
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");
    

    
  useEffect(() => {
    const fetchprofeCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/profe_deshabilitado/"
        );
        setProfesoresDes(response.data.profesores_deshabilitados);
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      }
    };
    fetchprofeCourses();
  }, []);

  const habilitarProfesor =  async ( identificacion) => {
    try {
        await axios.post("http://localhost:8000/editEstado_profesor/", {
          identificacion: identificacion,
          estado: true,
        });
        setAdvice("Profesor habilitado con exito");  
        setOpen(true);   
         
    } catch (error) {
      console.error(error);
    } 
    
  }

  const popup = (e) => {
    e.preventDefault();
    setOpen(!open);
    window.location.reload();
};


    return (
<<<<<<< HEAD
        <div className="ContainerEstDes">
      <div className="NavBar">
        <NoQuieroCrearMasNavbars />
      </div>
      <div className="TitleEstDes">
        <h1>Profesores Deshabilitados</h1>
      </div>
      <div className="ListaEstDes">
        {profesoresDes.length === 0 ? (
          <p>No hay profesores deshabilitados.</p>
        ) : (
          profesoresDes.map((profesor, index) => (
            <div key={index}>
              <ListEstDes
                Nombre1={profesor.user.first_name}
                Apellido1={profesor.user.last_name}
                Codigo1={profesor.identificacion}
                onClickRestored={() => habilitarProfesor(profesor.identificacion)}
                Buttons={true}
              />
=======
        <div className="ProfeDes">
            <NoQuieroCrearMasNavbars />
            <div className="cali"><h1>Profesores Deshabilitados</h1></div>
            <div className="corinto">
                <Label Nombre="Nombre" Codigo="C.C" />
>>>>>>> origin/Home2
            </div>
          ))
        )}
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

export default ProfeDes;