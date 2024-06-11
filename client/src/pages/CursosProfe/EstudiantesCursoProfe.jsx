import "./EstudiantesCursoProfe.css"
import NavbarProfesor from "../../components/NavbarProfesor";
import Search from '@mui/icons-material/Search';
import Field from "../../components/Utilities/Field";
import { useState } from "react";
import ListItems from "../../components/Utilities/ListItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function EstudiantesCursoProfe() {
    const [searchCursos, setSearchCursos] = useState(false);
    const [estudiantes, setEstudiantes] = useState([]);
    const { cursoId } = useParams();



    useEffect(() => {
        const fetchEstudiantes = async () => {
          try {
            const response = await axios.post(
              "http://localhost:8000/estudiantes_curso/",
              {
                  id: cursoId
              }
            );
            setEstudiantes(response.data.estudiantes);
          } catch (error) {
            console.error("Error al obtener los Estudiantes:", error);
          }
        };
        fetchEstudiantes();
      }, []);
    return (
        <div className="EstudiantesCursoProfeContainer">
            <div className="NavBar">
                <NavbarProfesor />
            </div>
            <div className="EstudiantesCursoTitle">
                <h1>Estudiantes</h1>

                <div className="SearchEstudiantes">
                    <button className="SearchButtonEstudiantes" onClick={""}>
                        <Search sx={{ fontSize: 30, color: "white" }} />
                    </button>
                    <div className={searchCursos === true ? "SearchFieldEstudiantes Active" : "SearchFieldEstudiantes Inactive"} onBlur={""}>
                        <Field
                            LineaBoton={false}
                            Boton=""
                            color="rgb(15, 65, 118)"
                            fontColor="white"
                            onChange={""}

                            value={""}
                        />
                    </div>
                </div>
            </div>
            <div className="ListaEstudiantesProfe">
          {estudiantes.map((estudiante) => (
            <div key={estudiante.id}>
              <ListItems
                Nombre1={estudiante.user.first_name}
                Nombre2={estudiante.user.last_name}
                Codigo1={estudiante.codigo}             
              />
            </div>
          ))}
        </div>

        </div>
    );
}

export default EstudiantesCursoProfe;