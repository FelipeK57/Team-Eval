import React from 'react';
import './Utilities/GruposCard.css';
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';

const GruposCard = (props) => {

  GruposCard.propTypes = {
    titulo: PropTypes.string.isRequired,
    estudiante: PropTypes.string.isRequired
  }

  return (
    <div className="Ccard">
      <div className="header">
        <h1>{props.titulo}</h1>
      </div>
      <div className="content">
        <h1>{props.NombreEstudiante}</h1>
        {props.NombreEstudiante ? <div className="chimichanga"><button className="botonsillo" onClick={props.eliminar}><DeleteIcon sx={{ fontSize: 36 }} /></button></div> : null}
      </div>
    </div>
  );
};

export default GruposCard;