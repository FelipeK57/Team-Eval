import "./CursosDes.css";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import { useEffect, useState } from "react";
import axios from "axios";
import ListEstDes from "../../components/EstudiantesDes/ListEstDes";
import PopUp from "../../components/Utilities/PopUp";


function CursosDes() {

    
    const [cursosDes, setcursosDes] = useState([]);
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");
    

    
    useEffect(() => {
    const fetchprofeCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/cursos_deshabilitado/"
        );
        setcursosDes(response.data.Cursos);
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      }
    };
    fetchprofeCourses();
  }, []);

  const habilitarCurso =  async ( codigo) => {
    try {
        await axios.post("http://localhost:8000/Estadocursos/", {
          codigo: codigo,
          estado: true,
        });
        setAdvice("Curso habilitado con exito");  
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
        <div className="ContainerEstDes">
      <div className="NavBar">
        <NoQuieroCrearMasNavbars />
      </div>
      <div className="TitleEstDes">
        <h1>Cursos Deshabilitados</h1>
      </div>
      <div className="ListaEstDes">
        {cursosDes.length === 0 ? (
          <p>No hay cursos deshabilitados.</p>
        ) : (
          cursosDes.map((curso, index) => (
            <div key={index}>
              <ListEstDes
                Nombre1={curso.nombre}
                Codigo1={curso.codigo}
                onClickRestored={() => habilitarCurso(curso.codigo)}
                Buttons={true}
              />
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


export default CursosDes;