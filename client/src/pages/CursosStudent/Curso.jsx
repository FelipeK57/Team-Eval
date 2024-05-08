import "./Curso.css";
import NavbarStudent from "../../components/NavbarStudent";
import Cookies from "js-cookie";
import CursoModelo from "../../components/CursoModulo";
import React, { useState, useEffect } from "react";
import axios from "axios";
function CursosStudent() {
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
    <div className="Curso">
      <NavbarStudent />
      <div className="cursi">
        <h1>
          Cursos de <b>{Cookies.get("nombre")}</b>
        </h1>
      </div>
      <div className="cardi">
        {cursos.map((curso) => (
          <div key={curso.id}>
            <CursoModelo name={curso.nombre} state={curso.estado} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CursosStudent;
