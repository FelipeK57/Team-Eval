import React from 'react';
import './Utilities/GruposCard3.css';
import PropTypes from "prop-types";
import Button2 from "./Utilities/Button2";

const GruposCard3 = ({ estudiantes, agregar }) => {
  return (
    <div className="Posillo">
      <div className="Vaso">
        <h1>Integrantes sin equipo</h1>
      </div>
      <div className="Plato">
        {Array.isArray(estudiantes) && estudiantes.map((estudiante) => (
          <div key={estudiante.id} className="Estudiante">
            <h1>{estudiante.user.first_name}</h1>
            <div className='beba'>
              <Button2
                Boton2="+"
                color="rgb(15, 65, 118)"
                fontColor="white"
                altura="40px"
                tamañoLetra="1.2rem"
                onClick={() => agregar(estudiante.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

GruposCard3.propTypes = {
  estudiantes: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  agregar: PropTypes.func.isRequired,
};

export default GruposCard3;

