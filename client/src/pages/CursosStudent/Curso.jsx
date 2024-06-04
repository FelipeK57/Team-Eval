import "./Curso.css";
import NavbarStudent from "../../components/NavbarStudent";
import Cookies from "js-cookie";
import CursoModelo from "../../components/CursoModulo";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CursosStudent() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState()

  const obtenerCurso = (curso) => {
    const evaluaciones = curso.evaluaciones
    setCursoSeleccionado(evaluaciones);
    localStorage.setItem("nombre_curso", curso.nombre)
    navigate("/SeleccionEvaluacion", {state : {evaluaciones}})
    
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
            <CursoModelo name={curso.nombre} onClick={() => obtenerCurso(curso)}  state={curso.estado} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CursosStudent;
