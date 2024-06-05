import React from "react";
import NavbarE from "../../components/NavbarE";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SeleccionEvaluacion.css";
import axios from "axios";
import Cookies from "js-cookie";

function SeleccionEvaluacion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { infoCurso } = state || {};
  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      const evaluacionesSinTerminar = [];
      for (const evaluacion of infoCurso.evaluaciones) {
        try {
          const response = await axios.post(
            "http://localhost:8000/obtener_grupo_criterios/",
            {
              codigo: Cookies.get("codigo"),
              id: evaluacion.id,
            }
          );

          if (response.data.estudiantes.length > 0) {
            evaluacionesSinTerminar.push(evaluacion);
          }
        } catch (error) {
          console.error(
            `Error al obtener compañeros sin evaluar para la evaluación ${evaluacion.id}:`,
            error
          );
        }
      }
      setEvaluaciones(evaluacionesSinTerminar);
    };

    fetchEvaluaciones();
  }, [infoCurso]);

  const obtenerEvaluacion = (evaluacion) => {
    const infoEvaluacion = evaluacion.id;
    navigate("/Evaluacion", { state: { infoEvaluacion, infoCurso } });
  };

  return (
    <>
      <NavbarE />
      <div className="container-evaluaciones-main">
        <h1>Evaluaciones por realizar:</h1>
        {evaluaciones.length > 0 ? (
          <div className="container-evaluacion">
            {evaluaciones.map((evaluacion, index) => (
              <div className="container-info-evaluacion" key={index}>
                <h2>{evaluacion.nombre}</h2>
                <hr></hr>
                <button onClick={() => obtenerEvaluacion(evaluacion)}>
                  Realizar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay evaluaciones por realizar.</p>
        )}
      </div>
    </>
  );
}

export default SeleccionEvaluacion;
