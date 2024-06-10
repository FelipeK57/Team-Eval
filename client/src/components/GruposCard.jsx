import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import './Utilities/GruposCard.css';

const GruposCard = ({ titulo, estudiantes, eliminar }) => {
  return (
    <div className="Ccard">
      <div className="header">
        <h1>{titulo}</h1>
      </div>
      <div className="content">
        {estudiantes.map((estudiante) => (
          <div key={estudiante.user.id} className="estudiante">
            <h1>{estudiante.user.first_name + ' ' + estudiante.user.last_name}</h1>
            {estudiante.user.first_name && (
              <div className="chimichanga">
                <button className="botonsillo" onClick={() => eliminar(estudiante.id)}>
                  <DeleteIcon sx={{ fontSize: 36 }} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

GruposCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  estudiantes: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  eliminar: PropTypes.func.isRequired,
};

export default GruposCard;
