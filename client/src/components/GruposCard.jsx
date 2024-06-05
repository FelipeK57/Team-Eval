import React from 'react';
import './Utilities/GruposCard.css';
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';

const GruposCard = (props) => {
  GruposCard.propTypes = {
    titulo: PropTypes.string.isRequired,
    estudiantes: PropTypes.array.isRequired,
    eliminar: PropTypes.func.isRequired
  };

  const { estudiantes, titulo, eliminar } = props;

  return (
    <div className="Ccard">
      <div className="header">
        <h1>{titulo}</h1>
      </div>
      <div className="content">
        {estudiantes.length > 0 ? (
          estudiantes.map((estudiante) => (
            <ul key={estudiante} className="student">
              <h1>{estudiante}</h1>
              <div className="chimichanga">
                <button className="botonsillo" onClick={() => eliminar(estudiante)}>
                  <DeleteIcon sx={{ fontSize: 36 }} />
                </button>
              </div>
            </ul>
          ))
        ) : (
          <h1>No hay estudiantes en este grupo</h1>
        )}
      </div>
    </div>
  );
};

export default GruposCard;
