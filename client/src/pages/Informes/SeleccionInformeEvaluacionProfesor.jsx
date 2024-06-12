import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Informes/SeleccionInformeEvaluacionProfesor.css";
import NavbarProfesor from "../../components/NavbarProfesor";

function SeleccionInformeEvaluacionProfesor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { infoCurso } = state || {};
  const evaluaciones = infoCurso.evaluaciones;

  const obtenerEvaluacion = async (evaluacion) => {
    const infoEvaluacion = evaluacion.id;
    const nombreEvaluacion = evaluacion.nombre;
    navigate("/InformeEvaluacion", {
      state: { infoEvaluacion, infoCurso, nombreEvaluacion },
    });
  };

  return (
    <>
      <NavbarProfesor />
      <div className="container-evaluaciones-profesor">
        <h1>Informes de evaluaciones</h1>
        {evaluaciones.length > 0 ? (
          <div className="container-evaluacion">
            {infoCurso.evaluaciones.map((evaluacion, index) => (
              <div className="container-info-evaluacion" key={index}>
                <h2>{evaluacion.nombre}</h2>
                <hr></hr>
                <button onClick={() => obtenerEvaluacion(evaluacion)}>
                  Informe
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h3>No hay informes de evaluaciones.</h3>
        )}
      </div>
    </>
  );
}

export default SeleccionInformeEvaluacionProfesor;
