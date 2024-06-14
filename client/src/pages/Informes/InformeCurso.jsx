import React, { useEffect, useState } from "react";
import axios from "axios";
import "./InformeProfesor.css";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarProfesor from "../../components/NavbarProfesor.jsx";

function InformeCurso() {
  const [criterios, setCriterios] = useState([]);
  const [informe, setInforme] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { infoEvaluacion, infoCurso, nombreEvaluacion } = state || {};

  useEffect(() => {
    const fetchCriterios = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/obtener_informe_curso/",
          {
            id: infoEvaluacion,
          }
        );
        setCriterios(response.data.criterios);
        setInforme(response.data.promedios_estudiantes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCriterios();
  }, [infoEvaluacion]);

  const back = () => {
    navigate(-1);
  };

  return (
    <>
      <NavbarProfesor />
      <div className="container-informe-curso">
        <h1>Curso: {infoCurso.nombre}</h1>
        <h1>Informe de: {nombreEvaluacion}</h1>
        <div className="tabla-informe-curso">
          {informe && Object.keys(informe).length > 0 ? (
            <table className="table-evaluation-curso">
              <thead>
                <tr>
                  <th>
                    Codigo Estudiante
                  </th>
                  {criterios.map((criterio) => (
                    <th key={criterio.id}>{criterio.descripcion}</th>
                  ))}
                  <th>Promedio total</th>
                  <th>Comentarios</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(informe).map(([id, estudiante]) => (
                  <tr key={id}>
                    <td className="value-informe">{id}</td>
                    {criterios.map((criterio) => (
                      <td className="value-informe" key={criterio.id}>
                        {estudiante.promedios[criterio.descripcion] ?? "N/A"}
                      </td>
                    ))}
                    <td className="value-informe">
                      {estudiante.total_promedio}
                    </td>
                    <td>{estudiante.comentarios.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2>Aún no hay calificaciones</h2>
          )}
        </div>
        <button onClick={back} className="back-to-inf-ev">
          Volver
        </button>
      </div>
    </>
  );
}

export default InformeCurso;
