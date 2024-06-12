import Cookies from "js-cookie";
import CursoModelo from "../../components/CursoModulo";
import { useState, useEffect } from "react";
import NavbarE from "../../components/NavbarE";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InformesEstudiantes() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState();

  const obtenerCurso = (curso) => {
    const infoCurso = curso;
    setCursoSeleccionado(infoCurso);
    localStorage.setItem("nombre_curso", curso.nombre);
    navigate("/SeleccionInformeEvaluacion", { state: { infoCurso } });
  };

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/student_courses/",
          {
            codigo: Cookies.get("codigo"),
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
      <NavbarE />
      <div className="cursi">
        <h1>
          Informes de <b>{Cookies.get("nombre")}</b>
        </h1>
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

export default InformesEstudiantes;
