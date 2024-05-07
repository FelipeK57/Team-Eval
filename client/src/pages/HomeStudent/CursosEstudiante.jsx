import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function CursosEstudiante() {
  const [cursos, setCursos] = useState([]);

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
    <div>
      <h1>Cursos Inscritos de {Cookies.get("nombre")}</h1>
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            Nombre del curso {curso.nombre} - Codigo {curso.codigo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CursosEstudiante;
