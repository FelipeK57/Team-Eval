import React from "react";
import NavbarE from "../../components/NavbarE";
import { useLocation, useNavigate } from "react-router-dom";

function SeleccionEvaluacion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { evaluaciones } = state || {};

  const obtenerEvaluacion = (evaluacion) => {
    const infoEvaluacion = evaluacion.id;
    navigate("/Evaluacion", { state: { infoEvaluacion } });
  };

  return (
    <>
      <NavbarE />
      <h1>Evaluaciones Seleccionadas:</h1>
      {evaluaciones && evaluaciones.length > 0 ? (
        <ul>
          {evaluaciones.map((evaluacion, index) => (
            <li key={index}>
              <h1>{evaluacion.id}</h1>
              <h2>{evaluacion.nombre}</h2>
              <p>{evaluacion.fecha}</p>
              <button onClick={() => obtenerEvaluacion(evaluacion)}>
                Realizar evaluacion
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay evaluaciones seleccionadas.</p>
      )}
    </>
  );
}

export default SeleccionEvaluacion;
