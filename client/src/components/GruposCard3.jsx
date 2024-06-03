import React from 'react';
import './Utilities/GruposCard3.css';
import PropTypes from "prop-types";
import Button2 from "./Utilities/Button2";

const GruposCard3 = (props) => {

  GruposCard3.propTypes = {
    estudiante: PropTypes.string.isRequired
  }
    
  return (
    <div className="Posillo">
      <div className="Vaso">
        <h1>Integrantes sin equipo</h1>
      </div>
      <div className="Plato">
        <h1>{props.estudiante}</h1>
        {props.estudiante ? <div className='beba'><Button2 Boton2="Agregar" color="rgb(15, 65, 118)" fontColor="white"  altura="40px" tamañoLetra="1.2rem"/></div>  : null} 
      </div>
    </div>
  );
};

export default GruposCard3;