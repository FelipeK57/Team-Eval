import React from 'react';
import './Utilities/GruposCard3.css';
import PropTypes from "prop-types";
import Button2 from "./Utilities/Button2";

const GruposCard3 = (props) => {

  GruposCard3.propTypes = {
    estudiantesSinGrupo: PropTypes.array.isRequired
  }

  const { estudiantesSinGrupo } = props;

  const handleAgregarEstudiante = (estudiante) => {
    console.log('Agregando estudiante:', estudiante);
};


  if (!estudiantesSinGrupo || estudiantesSinGrupo.length === 0) {
    return (
      <div className="Posillo">
        <div className="Vaso">
          <h1>Integrantes sin equipo</h1>
        </div>
        <div className="Plato">
          <ul className="estudiantes-list">
            <li>
              <div>No hay estudiantes sin grupo</div>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Posillo">
        <div className="Vaso">
          <h1>Integrantes sin equipo</h1>
        </div>
        <div className="Plato">
          <ul className="estudiantes-list">
            {estudiantesSinGrupo.map(estudiante => (
              <li key={estudiante.id}>
                <span>{estudiante.user.first_name} {estudiante.user.last_name}</span>
                <Button2 Boton2="Agregar" color="rgb(15, 65, 118)" fontColor="white" width="120px" altura="40px" tamañoLetra="1.2rem" onClick={() => handleAgregarEstudiante(estudiante)}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default GruposCard3;
