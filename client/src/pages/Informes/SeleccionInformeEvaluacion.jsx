import React from "react";
import NavbarE from "../../components/NavbarE";
import { useLocation, useNavigate } from "react-router-dom";
import "../Informes/seleccioninforme.css";

function SeleccionInformeEvaluacion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { infoCurso } = state || {};
  const evaluaciones = infoCurso.evaluaciones;

  const obtenerEvaluacion = async (evaluacion) => {
    const infoEvaluacion = evaluacion.id;
    const nombreEvaluacion = evaluacion.nombre
    navigate("/InformeIndividual", { state: { infoEvaluacion, infoCurso, nombreEvaluacion } });
  };

  return (
    <>
      <NavbarE />
      <div className="container-evaluaciones-main">
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

export default SeleccionInformeEvaluacion;
