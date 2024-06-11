import Cookies from "js-cookie";
import CursoModelo from "../../components/CursoModulo";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarProfesor from "../../components/NavbarProfesor";

function InformesProfesor() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState();

  const obtenerCurso = (curso) => {
    const infoCurso = curso;
    setCursoSeleccionado(infoCurso);
    localStorage.setItem("nombre_curso", curso.nombre);
    navigate("/SeleccionInformeEvaluacionProfesor", { state: { infoCurso } });
  };

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/teacher_courses/",
          {
            identificacion: Cookies.get("identificacion"),
          }
        );
        setCursos(response.data.cursos);
      } catch (error) {
        console.error("Error al obtener los cursos del estudiante:", error);
      }
    };
    fetchStudentCourses();
  }, []);

  return (
    <div className="Contenedor">
      <NavbarProfesor />
      <div className="cursi">
        <h1>Informes de cursos</h1>
      </div>
      <div className="cardi">
        {cursos.map((curso) => (
          <div key={curso.id}>
            <CursoModelo
              name={curso.nombre}
              onClick={() => obtenerCurso(curso)}
              state={curso.estado}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InformesProfesor;
