import React, { useState, useEffect } from "react";
import NavbarE from "../../components/NavbarE";
import "./Informes.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Informe() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { infoEvaluacion, infoCurso, nombreEvaluacion } = state || {};
  const [informe, setInforme] = useState([]);

  useEffect(() => {
    const fetchInforme = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/obtener_informe/",
          {
            codigo: Cookies.get("codigo"),
            id: infoEvaluacion,
          }
        );
        setInforme(response.data.promedios);
      } catch (error) {
        console.error("Error al obtener el informe: ", error);
      }
    };
    fetchInforme();
  }, [infoEvaluacion]);

  const back = () => {
    navigate(-1);
  };

  return (
    <>
      <NavbarE />
      <div className="main-container-informes">
        <h1>Curso: {infoCurso.nombre}</h1>
        <h1>Informe de: {nombreEvaluacion}</h1>
        {informe && Object.keys(informe).length > 0 ? (
          <table className="table-evaluation">
            <thead>
              <tr>
                <th>Criterio</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(informe).map(([criterio, valor]) => (
                <tr key={criterio}>
                  <td>{criterio}</td>
                  <td className="value-informe">{valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>Aún no te han calificado</h2>
        )}
        <button onClick={back} className="back-to-inf-ev">
          Volver
        </button>
      </div>
    </>
  );
}

export default Informe;
