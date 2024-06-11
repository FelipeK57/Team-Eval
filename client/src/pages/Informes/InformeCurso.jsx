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
        console.log(criterios);
        setInforme(response.data.promedios_estudiantes);
        console.log(informe);
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
                  <th>Codigo</th>
                  <th>Nombre</th>
                  {criterios.map((criterio) => (
                    <th key={criterio.id}>{criterio.descripcion}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(informe).map(([id, estudiante]) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{estudiante.nombre}</td>
                    {criterios.map((criterio) => (
                      <td key={criterio.id} className="value-informe">
                        {estudiante.promedios[criterio.descripcion] ?? "N/A"}
                      </td>
                    ))}
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
