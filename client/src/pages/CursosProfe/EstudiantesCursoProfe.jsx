import "./EstudiantesCursoProfe.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Search from '@mui/icons-material/Search';
import Field from "../../components/Utilities/Field";
import { useState, useEffect } from "react";
import ListItems from "../../components/Utilities/ListItems";
import { useParams } from "react-router-dom";
import axios from "axios";

function EstudiantesCursoProfe() {
    const [searchCursos, setSearchCursos] = useState(false);
    const [estudiantes, setEstudiantes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
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
      }, [cursoId]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        setSearchCursos(true);
    };

    const handleBlur = () => {
        setSearchCursos(false);
    };

    const filteredEstudiantes = estudiantes.filter((estudiante) =>
        `${estudiante.user.first_name} ${estudiante.user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="EstudiantesCursoProfeContainer">
            <div className="NavBar">
                <NavbarProfesor />
            </div>
            <div className="EstudiantesCursoTitle">
                <h1>Estudiantes</h1>

                <div className="SearchEstudiantes">
                    <button className="SearchButtonEstudiantes" onClick={handleSearchClick}>
                        <Search sx={{ fontSize: 30, color: "white" }} />
                    </button>
                    <div className={searchCursos ? "SearchFieldEstudiantes Active" : "SearchFieldEstudiantes Inactive"} onBlur={handleBlur}>
                        <Field
                            LineaBoton={false}
                            Boton=""
                            color="rgb(15, 65, 118)"
                            fontColor="white"
                            onChange={handleSearchChange}
                            value={searchTerm}
                        />
                    </div>
                </div>
            </div>
            <div className="ListaEstudiantesProfe">
                {filteredEstudiantes.map((estudiante) => (
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
