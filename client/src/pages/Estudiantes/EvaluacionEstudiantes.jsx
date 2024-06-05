import React, { useState } from "react";
import NavbarE from "../../components/NavbarE";
import "./EvaluacionEstudiantes.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function EvaluacionEstudiantes() {
  const navigate = useNavigate();
  const nombreAsignatura = localStorage.getItem("nombre_curso");
  const location = useLocation();
  const { state } = location;
  const { infoEvaluacion, infoCurso } = state || {};
  const [dataCr, setDataCr] = useState([]);
  const [dataEs, setDataEs] = useState([]);
  const [selectedEst, setSelectedEst] = useState("");
  const [selectedValues, setSelectedValues] = useState({});
  const [comentarios, setComentarios] = useState("");
  const [refresh, setRefresh] = useState(false);

  const asignarValores = (item, index, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
    item.valor = value;
    console.log(dataCr);
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/obtener_grupo_criterios/",
          {
            codigo: Cookies.get("codigo"),
            id: infoEvaluacion,
          }
        );
        setDataCr(response.data.criterios);
        setDataEs(response.data.estudiantes);
        console.log(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchInfo();
  }, [refresh]);

  const obtener_comentario = (e) => {
    setComentarios(e.target.value);
    console.log(comentarios);
  };

  const estudiante_calificado = (e) => {
    const selected = e.target.value;
    setSelectedEst(selected);
    console.log(selectedEst);
  };

  const realizar_calificacion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/realizar_calificacion/",
        {
          codigo_evaluador: Cookies.get("codigo"),
          id: infoEvaluacion,
          codigo_evaluado: selectedEst,
          comentarios: comentarios,
          criterios: dataCr,
        }
      );
      alert("evaluacion guardada exitosamente");
      setSelectedEst("");
      setRefresh(!refresh);
      setSelectedValues({});
      setComentarios("");
      console.log(response.data);
    } catch (error) {
      alert("ya ha evaluado a este estudiante antes");
    }
  };

  const terminar_calificacion = () => {
    navigate("/SeleccionEvaluacion", {state: {infoCurso}});
  };

  return (
    <>
      <NavbarE />
      <div className="description-container">
        <h1>Evaluacion</h1>
        <h2>{nombreAsignatura}</h2>
        <h3>
          Califique a los integrantes del equipo, siendo 1 la calificacion menor
          y siendo 4 la calificacion mayor, siguiendo el criterio en la tabla.
        </h3>
        <h3>Seleccione el estudiante que va a evaluar</h3>
        <select value={selectedEst} onChange={estudiante_calificado}>
          <option>Seleccione un estudiante</option>
          {dataEs.map((item) => (
            <option key={item.id} value={item.codigo}>
              {item.user.username}
            </option>
          ))}
        </select>
      </div>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Criterios</th>
              <th colSpan="4">Escala</th>
            </tr>
          </thead>
          <tbody>
            {dataCr.map((item, index) => (
              <tr key={index}>
                <td>{item.descripcion}</td>
                {[1, 2, 3, 4].map((value) => (
                  <td key={value} className="scale">
                    <button
                      onClick={() => asignarValores(item, index, value)}
                      style={{
                        backgroundColor:
                          selectedValues[index] === value ? "#0F4176" : "white",
                        color:
                          selectedValues[index] === value ? "white" : "black",
                      }}
                    >
                      {value}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ev-bt-c">
        <textarea
          value={comentarios}
          onChange={obtener_comentario}
          placeholder="Escriba algun comentario (opcional)"
        ></textarea>
        <button onClick={realizar_calificacion} className="enviar-calificacion">
          Guardar calificacion de compañero actual
        </button>
        <div className="container-boton-fc">
          <button onClick={terminar_calificacion} className="enviar-calificacion">
            Terminar calificacion
          </button>
        </div>
      </div>
    </>
  );
}

export default EvaluacionEstudiantes;
