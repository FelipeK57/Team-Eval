import React from "react";
import NavbarE from "../../components/NavbarE";
import "./EvaluacionEstudiantes.css";
import TablaEval from "../../components/TablaEval";

function EvaluacionEstudiantes() {
  const nombreAsignatura = "Ciberseguridad";
  const data = [
    { description: "El estudiante es respetuoso" },
    { description: "El estudiante es responsable" },
    { description: "El estudiante tiene iniciativa" },
  ];
  return (
    <div>
      <NavbarE />
      <div className="description-container">
        <h1>Evaluacion</h1>
        <h2>{nombreAsignatura}</h2>
        <h3>
          Califique a los integrantes del equipo, siendo 1 la calificacion menor
          y siendo 4 la calificacion mayor, siguiendo el criterio en la tabla.
        </h3>
        <h3>Seleccione el estudiante que va a evaluar</h3>
        <select>
          <option>Sebastian Hernandez</option>
          <option>Santiago Sanchez</option>
        </select>
      </div>
      <TablaEval data={data} />
    </div>
  );
}

export default EvaluacionEstudiantes;
