import React, { useState } from "react";
import NavbarE from "../../components/NavbarE";
import "./EvaluacionEstudiantes.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PopUp from "../../components/Utilities/PopUp.jsx";

function EvaluacionEstudiantes() {
  const navigate = useNavigate();
  const nombreAsignatura = localStorage.getItem("nombre_curso");
  const location = useLocation();
  const { state } = location;
  const { infoEvaluacion, infoCurso, escala } = state || {};
  const [dataCr, setDataCr] = useState([]);
  const [dataEs, setDataEs] = useState([]);
  const [selectedEst, setSelectedEst] = useState("");
  const [selectedValues, setSelectedValues] = useState({});
  const [comentarios, setComentarios] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState("");

  const popup = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

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

  const realizar_calificacion = async (e) => {
    if (selectedEst.trim() === "") {
      setAdvice("Debe seleccionar un estudiante.");
      popup(e);
      return;
    }

    if (Object.keys(selectedValues).length < dataCr.length) {
      setAdvice("Debe calificar todos los criterios.");
      popup(e);
      return;
    }

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
      setAdvice("Evaluación guardada exitosamente.");
      popup(e);
      setSelectedEst(null);
      setRefresh(!refresh);
      setSelectedValues({});
      setComentarios("");
      console.log(response.data);
    } catch (error) {
      alert("ya ha evaluado a este estudiante antes");
    }
  };

  return (
    <>
      <NavbarE />
      <div className="description-container">
        <h1>Evaluacion</h1>
        <h2>{nombreAsignatura}</h2>
        <h3>
          Califique a los integrantes del equipo, siendo 1 la calificacion menor
          y siendo {escala} la calificacion mayor, siguiendo el criterio en la
          tabla.
        </h3>
        <h3>Seleccione el estudiante que va a evaluar</h3>
        <div className="select-save">
          <select value={selectedEst} onChange={estudiante_calificado}>
            <option value={null}>Seleccione un estudiante</option>
            {dataEs.map((item) => (
              <option key={item.id} value={item.codigo}>
                {item.user.first_name} {item.user.last_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="table-container">
        <table className="table-evaluation">
          <thead>
            <tr>
              <th>Criterios</th>
              <th colSpan={escala}>Escala</th>
            </tr>
          </thead>
          <tbody>
            {dataCr.map((item, index) => (
              <tr key={index}>
                <td>{item.descripcion}</td>
                {Array.from({ length: escala }, (_, value) => value + 1).map(
                  (value) => (
                    <td key={value} className="scale">
                      <button
                        onClick={() => asignarValores(item, index, value)}
                        style={{
                          backgroundColor:
                            selectedValues[index] === value
                              ? "#0F4176"
                              : "white",
                          color:
                            selectedValues[index] === value ? "white" : "black",
                        }}
                      >
                        {value}
                      </button>
                    </td>
                  )
                )}
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
        <div className="container-boton-fc">
          <button
            onClick={realizar_calificacion}
            className="enviar-calificacion"
          >
            Guardar esta calificación
          </button>
        </div>
      </div>
      <PopUp
        open={open}
        SetOpen={setOpen}
        Advice={advice}
        Width={"100%"}
        Button1="Volver"
        onClick1={popup}
      />
    </>
  );
}

export default EvaluacionEstudiantes;
